const generatePDF = require("../utils/generatePDF");
const { generarTexto } = require("../services/geminiService");

exports.generateCV = async (req, res) => {
  try {
    const { cvData, template, preview } = req.body;

    // Validar experiencia y educación como arrays
    cvData.experience = Array.isArray(cvData.experience) ? cvData.experience : [];
    cvData.education = Array.isArray(cvData.education) ? cvData.education : [];

    let improvedCV = { ...cvData }; // copia para mejoras

    let anyImprovement = false;

    // Mejorar resumen
if (cvData.summary) {
  const improvedSummary = await generarTexto(
    `Eres un redactor profesional de CVs. Mejora este resumen profesional para un CV. 
    Devuelve SOLO el texto mejorado, sin explicaciones, sin títulos, sin formato markdown.
    Debe ser conciso (máximo 4 oraciones), en primera persona y destacar habilidades clave.
    Resumen original: "${cvData.summary}"`
  );
  if (improvedSummary && improvedSummary !== cvData.summary) {
    improvedCV.summary = improvedSummary;
    anyImprovement = true;
  }
}

// Mejorar experiencia
if (cvData.experience.length > 0) {
  const improvedExp = [];
  for (let exp of cvData.experience) {
    const improvedText = await generarTexto(
      `Eres un redactor profesional de CVs. Mejora esta descripción de experiencia laboral para un CV.
      Devuelve SOLO la descripción mejorada, sin explicaciones, sin títulos, sin formato markdown.
      Debe usar verbos de acción, ser concisa (máximo 3 oraciones) y resaltar logros concretos.
      Puesto: "${exp.position}" en "${exp.company}"
      Descripción original: "${exp.description}"`
    );
    improvedExp.push({ ...exp, description: improvedText || exp.description });
    if (improvedText && improvedText !== exp.description) anyImprovement = true;
  }
  improvedCV.experience = improvedExp;
}

// Mejorar educación
if (cvData.education.length > 0) {
  const improvedEdu = [];
  for (let edu of cvData.education) {
    const improvedText = await generarTexto(
      `Eres un redactor profesional de CVs. Mejora esta descripción de educación para un CV.
      Devuelve SOLO la descripción mejorada, sin explicaciones, sin títulos, sin formato markdown.
      Debe ser concisa (máximo 2 oraciones) y destacar habilidades o conocimientos relevantes adquiridos.
      Título: "${edu.degree}" en "${edu.school}"
      Descripción original: "${edu.description}"`
    );
    improvedEdu.push({ ...edu, description: improvedText || edu.description });
    if (improvedText && improvedText !== edu.description) anyImprovement = true;
  }
  improvedCV.education = improvedEdu;
} // Preview solo si la IA hizo mejoras
    if (preview) {
      if (!anyImprovement) {
  return res.status(200).json({ cvData: improvedCV }); // devuelve el CV igual, sin mejoras
}
      return res.json({ cvData: improvedCV });
    }

    // Generar PDF final
    generatePDF({ cvData: improvedCV, template }, res);

  } catch (error) {
    console.error("Error en generateCV:", error.message);
    res.status(500).json({ error: "Error generando el CV" });
  }
};