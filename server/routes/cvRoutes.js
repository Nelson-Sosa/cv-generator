const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cvController");

router.post("/generate", cvController.generateCV);

module.exports = router;