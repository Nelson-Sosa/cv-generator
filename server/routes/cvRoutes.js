const express = require("express")
const router = express.Router()
const AIController = require("./controllers/ai.controller");

router.post("/generar-cv", AIController.generarCV);