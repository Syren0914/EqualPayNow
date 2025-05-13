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
    if (location) {
      // Case-insensitive partial match for location
      match.location = { $regex: location, $options: "i" };
    }

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
            count: { $sum: 1 },
            medianSalary: { $avg: "$salary" }, // placeholder
            salaryRange: {
              $push: "$salary" // we'll sort and compute range manually if needed
            },
            genderGap: { $avg: "$genderGap" }, // optional field, must exist
            trend: { $avg: "$trend" } // optional
          }
        }
      ]);
      const result = average[0];

      if (!result) return res.json([]);

      // Manual salary range fallback
      const salaries = result.salaryRange.sort((a, b) => a - b);
      const salaryRange = [salaries[0], salaries[salaries.length - 1]];

      return res.json([{
        averageSalary: result.averageSalary,
        medianSalary: result.medianSalary,
        salaryRange,
        genderGap: result.genderGap || 0,
        trend: result.trend || 0,
        count: result.count
      }]);
    }
  } catch (err) {
    console.error("Error in getSalaryStats:", err);
    res.status(500).json({ error: "Server error" });
  }
}


module.exports = { submitSalary, getSalaryStats }
