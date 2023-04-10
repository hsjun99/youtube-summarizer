var express = require("express")
var router = express.Router()

const transcript = require("../utils/transcript")
const bulletSummary = require("../utils/bulletSummary")
const wholeSummary = require("../utils/wholeSummary")

/* GET home page. */
router.post("/bulletpoint", async (req, res) => {
    const { url } = req.body
    const ts = await transcript(url)
    const bs = await bulletSummary(ts)
    console.log(bs)
    res.send(bs)
})

router.post("/full", async (req, res) => {
    const { bulletpoint } = req.body
    const wh = await wholeSummary(bulletpoint)
    console.log(wh)
    res.send(wh)
})

router.get("/whole", function (req, res) {})

module.exports = router
