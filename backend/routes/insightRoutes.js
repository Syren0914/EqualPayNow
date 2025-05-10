const express = require("express")
const { getInsightSummary } = require("../controllers/insightController")
const router = express.Router()

router.get("/summary", getInsightSummary)

module.exports = router
