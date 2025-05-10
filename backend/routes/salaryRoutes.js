const express = require("express")
const router = express.Router()
const {
  submitSalary,
  getSalaryStats
} = require("../controllers/salaryController")

router.post("/", submitSalary)
router.get("/", getSalaryStats)

module.exports = router