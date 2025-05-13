const SalaryEntry = require("../models/SalaryEntry")

const submitSalary = async (req, res) => {
  try {
    const salary = await SalaryEntry.create(req.body)
    res.status(201).json({ message: "Submission saved", id: salary._id })
  } catch (err) {
    res.status(500).json({ error: "Failed to submit salary" })
  }
}

const getSalaryStats = async (req, res) => {
  try {
    const { job, location, groupBy } = req.query

    const match = {}
    if (job) match.jobTitle = job
    if (location) match.location = location

    if (groupBy) {
      const pipeline = [
        { $match: match },
        {
          $group: {
            _id: `$${groupBy}`,
            averageSalary: { $avg: "$salary" },
            count: { $sum: 1 }
          }
        },
        { $sort: { averageSalary: -1 } }
      ]

      const results = await Salary.aggregate(pipeline)
      return res.json(results)
    } else {
      // Return general stats
      const average = await Salary.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            averageSalary: { $avg: "$salary" },
            count: { $sum: 1 }
          }
        }
      ])
      return res.json(average[0] || { averageSalary: 0, count: 0 })
    }
  } catch (err) {
    console.error("Error in getSalaryStats:", err)
    res.status(500).json({ error: "Server error" })
  }
}


module.exports = { submitSalary, getSalaryStats }
