const Salary = require("../models/SalaryEntry");

// POST /api/salaries
const submitSalary = async (req, res) => {
  try {
    const salary = await Salary.create(req.body);
    res.status(201).json({ message: "Submission saved", id: salary._id });
  } catch (err) {
    console.error("Error submitting salary:", err);
    res.status(500).json({ error: "Failed to submit salary" });
  }
};

// GET /api/salaries
const getSalaryStats = async (req, res) => {
  try {
    const { job, location, groupBy } = req.query;

    const match = {};
    if (job) match.jobTitle = job;
    if (location) match.location = { $regex: location, $options: "i" };

    if (groupBy) {
      // Grouped aggregation response
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
      ];

      const results = await Salary.aggregate(pipeline);
      return res.json(results);
    } else {
      // General stats response (single summary object)
      const aggregation = await Salary.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            averageSalary: { $avg: "$salary" },
            count: { $sum: 1 },
            medianSalary: { $avg: "$salary" }, // placeholder
            salaryRange: {
              $push: "$salary" // we'll sort it below
            },
            genderGap: { $avg: "$genderGap" }, // optional
            trend: { $avg: "$trend" } // optional
          }
        }
      ]);

      const result = aggregation[0];

      if (!result || !Array.isArray(result.salaryRange) || result.salaryRange.length === 0) {
        return res.json([{
          averageSalary: 0,
          medianSalary: 0,
          salaryRange: [0, 0],
          genderGap: 0,
          trend: 0,
          count: 0
        }]);
      }

      // Compute sorted salary range
      const sorted = result.salaryRange.sort((a, b) => a - b);
      const salaryRange = [sorted[0], sorted[sorted.length - 1]];

      return res.json([{
        averageSalary: result.averageSalary ?? 0,
        medianSalary: result.medianSalary ?? 0,
        salaryRange,
        genderGap: result.genderGap ?? 0,
        trend: result.trend ?? 0,
        count: result.count ?? 0
      }]);
    }
  } catch (err) {
    console.error("Error in getSalaryStats:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { submitSalary, getSalaryStats };
