const router = require("express").Router();
const employeeController = require("../controllers/employee");

router.get("/test", employeeController.testBackend);
router.post("/create", employeeController.createEmployee);
router.put("/update/:eid", employeeController.updateEmployee);
router.get("/get", employeeController.getEmployeesByFiltering);
router.get("/get/count", employeeController.getFilteredEmployeesCount);
router.put("/update/:eid/:action", employeeController.employeeStatusUpdate);

module.exports = router;
