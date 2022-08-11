const { catchAsync } = require("../util/catchAsync");
const EmployeeModel = require("../models/employee");
const { keepOnlyWantedKeys } = require("../util/functions");

const testBackend = catchAsync(async (req, res, next) => {
  res.send("Hello World");
});

const createEmployee = catchAsync(async (req, res, next) => {
  const employee = await EmployeeModel.create({
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    data: employee,
  });
});

const updateEmployee = catchAsync(async (req, res, next) => {
  const { eid } = req.params;
  if (!eid) {
    return next(new AppError("Employee ID is required!", 404));
  }
  let employee = EmployeeModel.findById({ eid });

  if (!employee) {
    return next(new AppError("Not Employee found with this ID!", 404));
  }

  let updatedEmployee = await EmployeeModel.findByIdAndUpdate(
    eid,
    {
      ...keepOnlyWantedKeys(req.body, [
        "firstName",
        "lastName",
        "salary",
        "gender",
        "designation",
        "location",
        "state",
        "country",
        "department",
        "reportingManager",
      ]),
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    data: updatedEmployee,
  });
});

const getEmployeesByFiltering = catchAsync(async (req, res, next) => {
  const filters = req.query;
  const allEmployees = await EmployeeModel.find();
  const filteredEmployees = allEmployees.filter((employee) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, employee[key], filters[key]);
      isValid = isValid && employee[key] == filters[key];
    }
    return isValid;
  });

  res.status(201).json({
    status: "success",
    data: filteredEmployees,
  });
});

const getFilteredEmployeesCount = catchAsync(async (req, res, next) => {
  const filters = req.query;
  const allEmployees = await EmployeeModel.find();
  const filteredEmployees = allEmployees.filter((employee) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, employee[key], filters[key]);
      isValid = isValid && employee[key] == filters[key];
    }
    return isValid;
  });

  res.status(201).json({
    status: "success",
    data: filteredEmployees.length,
  });
});

const employeeStatusUpdate = catchAsync(async (req, res, next) => {
  const { eid, action } = req.params;
  if (!eid || !action) {
    return next(new AppError("Employee ID and action are required!", 404));
  }
  let targetedEmployee = EmployeeModel.findById({ eid });

  if (!targetedEmployee) {
    return next(new AppError("Not Employee found with this ID!", 404));
  }

  if (action == "activate") {
    targetedEmployee = await EmployeeModel.findByIdAndUpdate(
      eid,
      {
        deletedAt: null,
      },
      {
        new: true,
      }
    );
  } else {
    targetedEmployee = await EmployeeModel.findByIdAndUpdate(
      eid,
      {
        deletedAt: Date.now(),
      },
      {
        new: true,
      }
    );
  }

  res.status(201).json({
    status: `Success! Employee with Code Number ${targetedEmployee.employeeCode} has been ${action}d!`,
    data: targetedEmployee,
  });
});

module.exports = {
  createEmployee,
  testBackend,
  updateEmployee,
  getEmployeesByFiltering,
  getFilteredEmployeesCount,
  employeeStatusUpdate,
};
