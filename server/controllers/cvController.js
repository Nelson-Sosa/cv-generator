// controllers/ai.controller.js
const { generarTexto } = require("../services/geminiService");

exports.generarCV = async (req, res) => {
  try {
    const { datos } = req.body;

    const prompt = `
    Genera un CV profesional con estos datos:
    ${datos}
    `;

    const texto = await generarTexto(prompt);

    res.json({ resultado: texto });

  } catch (error) {
    res.status(500).json({ error: "Error generando contenido" });
  }
};