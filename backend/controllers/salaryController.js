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
  const { job, location, groupBy = "gender" } = req.query

  const match = {}
  if (job) match.jobTitle = job
  if (location) match.location = location

  try {
    const stats = await SalaryEntry.aggregate([
      { $match: match },
      {
        $group: {
          _id: `$${groupBy}`,
          averageSalary: { $avg: "$salary" },
          count: { $sum: 1 }
        }
      },
      { $sort: { averageSalary: -1 } }
    ])
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch salary stats" })
  }
}


module.exports = { submitSalary, getSalaryStats }
