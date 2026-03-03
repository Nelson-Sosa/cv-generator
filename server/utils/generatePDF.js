const PDFDocument = require("pdfkit")

function generatePDF({ cvData, template }, res) {
  const doc = new PDFDocument()
  res.setHeader("Content-Type", "application/pdf")
  res.setHeader("Content-Disposition", "attachment; filename=cv.pdf")

  doc.pipe(res)

  doc.fontSize(22).text(cvData.name || "Nombre Apellido")
  doc.fontSize(14).text(cvData.email || "correo@ejemplo.com")
  doc.moveDown()
  doc.fontSize(12).text("Resumen:")
  doc.text(cvData.summary || "Resumen profesional")
  doc.moveDown()
  doc.text("Experiencia:")
  doc.text(cvData.experience || "Experiencia laboral")
  doc.moveDown()
  doc.text("Educación:")
  doc.text(cvData.education || "Educación")
  doc.moveDown()
  doc.text("Habilidades:")
  doc.text(cvData.skills || "Habilidades clave")

  doc.end()
}

module.exports = generatePDF