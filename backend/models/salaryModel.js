// backend/models/salaryModel.js

const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Other"],
    required: true
  },
  ethnicity: String,
  salary: {
    type: Number,
    required: true
  },
  yearsExperience: Number,
  education: String,
  industry: String,
  trend: Number,       // optional
  genderGap: Number,   // optional
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Salary", SalarySchema);
