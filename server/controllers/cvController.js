const generatePDF = require("../utils/generatePDF");
const { generarTexto } = require("../services/geminiService"); // activar después si quieres IA

exports.generateCV = async (req, res) => {
  try {
    const { cvData, template } = req.body;

    // 👉 PRIMERO probamos sin IA
    // Si quieres IA luego:
    cvData.summary = await generarTexto(cvData.summary);

    generatePDF({ cvData, template }, res);

  } catch (error) {
    console.error("Error en generateCV:", error);
    res.status(500).json({ error: "Error generando el PDF" });
  }
};