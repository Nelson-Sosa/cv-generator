const PDFDocument = require("pdfkit");

function generatePDF({ cvData }, res) {
  const doc = new PDFDocument();
  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));

  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=CV.pdf",
        "Content-Length": pdfData.length,
      })
      .end(pdfData);
  });

  doc.fontSize(20).text(cvData.name || "Nombre");
  doc.moveDown();
  doc.fontSize(12).text(`Email: ${cvData.email}`);
  doc.moveDown();
  doc.text(`Resumen: ${cvData.summary}`);
  doc.moveDown();
  doc.text(`Experiencia: ${cvData.experience}`);
  doc.moveDown();
  doc.text(`Educación: ${cvData.education}`);
  doc.moveDown();
  doc.text(`Habilidades: ${cvData.skills}`);

  doc.end();
}

module.exports = generatePDF;