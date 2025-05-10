const mongoose = require("mongoose")

const SalaryEntrySchema = new mongoose.Schema({
  jobTitle: String,
  location: String,
  gender: String,
  ethnicity: String,
  salary: Number,
  yearsExperience: Number,
  education: String,
    industry: String,
  uid: String,
  timestamp: { type: Date, default: Date.now }
})

const SalaryEntry = mongoose.model("SalaryEntry", SalaryEntrySchema)
module.exports = SalaryEntry
