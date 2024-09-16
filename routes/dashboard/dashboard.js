const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboardController");

router.get("/crypto-data", dashboardController.getCryptoData);
module.exports = router;
