const mongoose = require("mongoose");
const { isEmail } = require("validator").default;

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, minlength: 2, maxlength: 255 },
    lastName: { type: String, minlength: 2, maxlength: 255 },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Invalid email"],
    },
    mobile: {
      type: String,
      minlength: 10,
      maxlength: 10,
      unique: true,
    },
    gender: { type: String, enum: ["Male", "Female"] },
    designation: { type: String, minlength: 2, maxlength: 255 },
    dateOfJoining: { type: Date, default: Date.now() },
    reportingManager: {
      type: String,
      minlength: 2,
      maxlength: 255,
    },
    salary: { type: Number },
    employeeCode: { type: Number, unique: true },
    location: { type: String, minlength: 2, maxlength: 255 },
    state: { type: String, minlength: 2, maxlength: 255 },
    country: { type: String, minlength: 2, maxlength: 255 },
    department: { type: String, minlength: 2, maxlength: 255 },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Lean version of the document
    collection: "employee",
    toObject: { getters: true },
    optimisticConcurrency: true,
  }
);

module.exports = mongoose.model("employee", EmployeeSchema);
