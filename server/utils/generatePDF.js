// server/utils/generatePDF.js
const PDFDocument = require("pdfkit");

function generatePDF({ cvData, template }, res) {
  const doc = new PDFDocument();

  // Configurar headers para descargar PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=CV.pdf");

  doc.pipe(res);

  // Fondo según plantilla
  if (template === "moderno") {
    doc.fillColor("#333").fontSize(20).text(cvData.name, { underline: true });
  } else {
    doc.fillColor("#000").fontSize(18).text(cvData.name);
  }

  doc.moveDown();
  doc.fontSize(12).fillColor("#000");
  doc.text(`Email: ${cvData.email}`);
  doc.text(`Resumen: ${cvData.summary}`);
  doc.text(`Experiencia: ${cvData.experience}`);
  doc.text(`Educación: ${cvData.education}`);
  doc.text(`Habilidades: ${cvData.skills}`);

  doc.end();
}

module.exports = generatePDF;