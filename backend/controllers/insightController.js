const SalaryEntry = require("../models/SalaryEntry")

const getInsightSummary = async (req, res) => {
  try {
    const totalEntries = await SalaryEntry.countDocuments()

    const avgSalaryResult = await SalaryEntry.aggregate([
      { $group: { _id: null, avgSalary: { $avg: "$salary" } } }
    ])
    const avgSalary = avgSalaryResult[0]?.avgSalary || 0

    const genderStats = await SalaryEntry.aggregate([
      { $group: { _id: "$gender", avg: { $avg: "$salary" } } },
      { $sort: { avg: -1 } }
    ])

    const topTwoGenders = genderStats.slice(0, 2)
    const genderGap =
      topTwoGenders.length === 2
        ? (topTwoGenders[0].avg - topTwoGenders[1].avg) / topTwoGenders[1].avg
        : null

    const topGender = topTwoGenders[0]?._id || null
    const secondGender = topTwoGenders[1]?._id || null

    const ethnicityStats = await SalaryEntry.aggregate([
      { $group: { _id: "$ethnicity", avg: { $avg: "$salary" } } },
      { $sort: { avg: -1 } }
    ])
    const topEthnicity = ethnicityStats[0]?._id || null

    const industryStats = await SalaryEntry.aggregate([
      { $group: { _id: "$industry", avg: { $avg: "$salary" } } },
      { $sort: { avg: -1 } }
    ])
    const topIndustry = industryStats[0]?._id || null

    const topRoles = await SalaryEntry.aggregate([
      { $group: { _id: "$jobTitle", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ])

    res.json({
      totalEntries,
      avgSalary: Math.round(avgSalary),
      genderGap: typeof genderGap === "number" ? genderGap.toFixed(2) : "N/A",
      topRoles: topRoles.map((r) => r._id),
      topGender,
      secondGender,
      topEthnicity,
      topIndustry
    })
  } catch (err) {
    console.error("Insight summary failed:", err)
    res.status(500).json({ error: "Failed to fetch insights" })
  }
}

module.exports = { getInsightSummary }
