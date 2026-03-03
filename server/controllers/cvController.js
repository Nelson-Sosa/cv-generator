const generatePDF = require("../utils/generatePDF");
const improveCV = require("../utils/improveCV");

exports.generateCV = async (req, res) => {
  let { cvData, template } = req.body;

  // Mejorar cada campo de texto con IA
  if (cvData.summary) cvData.summary = await improveCV(cvData.summary);
  if (cvData.experience) cvData.experience = await improveCV(cvData.experience);
  if (cvData.skills) cvData.skills = await improveCV(cvData.skills);

  // Generar PDF con los textos mejorados
  generatePDF({ cvData, template }, res);
};