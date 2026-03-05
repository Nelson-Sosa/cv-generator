const PDFDocument = require("pdfkit");

function generatePDF({ cvData, template }, res) {
  const doc = new PDFDocument({ margin: 0 });
  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", () => {
    const pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=CV.pdf",
      "Content-Length": pdfData.length,
    }).end(pdfData);
  });

  if (template === "plantilla2") {
    renderMinimalista(doc, cvData);
  } else if (template === "plantilla3") {
    renderEjecutivaVerde(doc, cvData);
  } else {
    renderModernaAzul(doc, cvData);
  }

  doc.end();
}

// ── Plantilla 1: Moderna Azul ──────────────────────────────
function renderModernaAzul(doc, cv) {
  const sidebarWidth = 200;  // ✅ más ancho (era 180)
  const pageHeight = 842;
  const primaryColor = "#4f46e5";
  const accentColor = "#7c3aed";

  doc.rect(0, 0, sidebarWidth, pageHeight).fill(primaryColor);

  // Nombre
  doc.fillColor("white").fontSize(20).font("Helvetica-Bold")  // ✅ era 16
    .text(cv.name || "", 15, 40, { width: sidebarWidth - 30 });

  // Email
  doc.fontSize(11).font("Helvetica").fillColor("rgba(255,255,255,0.7)")  // ✅ era 9
    .text(cv.email || "", 15, doc.y + 8, { width: sidebarWidth - 30 });

  // Habilidades en sidebar
  if (cv.skills) {
    doc.moveDown(2);
    doc.fontSize(10).font("Helvetica-Bold").fillColor("rgba(255,255,255,0.5)")  // ✅ era 8
      .text("HABILIDADES", 15, doc.y, { width: sidebarWidth - 30 });
    doc.moveDown(0.5);

    // ✅ Filtra skills vacíos
    const skillsList = cv.skills.split(",").map(s => s.trim()).filter(Boolean);
    skillsList.forEach(skill => {
      doc.fontSize(11).font("Helvetica").fillColor("white")  // ✅ era 9
        .text(`• ${skill}`, 15, doc.y, { width: sidebarWidth - 30 });
    });
  }

  const mainX = sidebarWidth + 24;
  const mainWidth = 595 - sidebarWidth - 48;
  let y = 40;

  // Resumen
  if (cv.summary) {
    doc.fontSize(9).font("Helvetica-Bold").fillColor(primaryColor)  // ✅ era 8
      .text("PERFIL PROFESIONAL", mainX, y);
    y += 16;
    doc.fontSize(11).font("Helvetica").fillColor("#374151")  // ✅ era 10
      .text(cv.summary, mainX, y, { width: mainWidth });
    y = doc.y + 18;
    doc.moveTo(mainX, y).lineTo(mainX + mainWidth, y).stroke("#e5e7eb");
    y += 14;
  }

  // Experiencia
  if (cv.experience?.length > 0) {
    doc.fontSize(9).font("Helvetica-Bold").fillColor(primaryColor)
      .text("EXPERIENCIA", mainX, y);
    y += 16;
    cv.experience.forEach(exp => {
      doc.fontSize(13).font("Helvetica-Bold").fillColor("#111827")  // ✅ era 11
        .text(exp.position || "", mainX, y, { width: mainWidth });
      y = doc.y + 2;
      doc.fontSize(11).font("Helvetica").fillColor(accentColor)  // ✅ era 9
        .text(`${exp.company}  |  ${exp.startDate} — ${exp.endDate}`, mainX, y);
      y = doc.y + 6;
      if (exp.description) {
        doc.fontSize(11).font("Helvetica").fillColor("#6b7280")  // ✅ era 9
          .text(exp.description, mainX, y, { width: mainWidth });
        y = doc.y + 12;
      }
    });
    y += 6;
    doc.moveTo(mainX, y).lineTo(mainX + mainWidth, y).stroke("#e5e7eb");
    y += 14;
  }

  // Educación
  if (cv.education?.length > 0) {
    doc.fontSize(9).font("Helvetica-Bold").fillColor(primaryColor)
      .text("EDUCACIÓN", mainX, y);
    y += 16;
    cv.education.forEach(edu => {
      doc.fontSize(13).font("Helvetica-Bold").fillColor("#111827")  // ✅ era 11
        .text(edu.degree || "", mainX, y, { width: mainWidth });
      y = doc.y + 2;
      doc.fontSize(11).font("Helvetica").fillColor(accentColor)  // ✅ era 9
        .text(`${edu.school}  |  ${edu.startDate} — ${edu.endDate}`, mainX, y);
      y = doc.y + 6;
      if (edu.description) {
        doc.fontSize(11).font("Helvetica").fillColor("#6b7280")  // ✅ era 9
          .text(edu.description, mainX, y, { width: mainWidth });
        y = doc.y + 12;
      }
    });
  }
}

// ── Plantilla 2: Minimalista ───────────────────────────────
function renderMinimalista(doc, cv) {
  const margin = 50;
  const width = 595 - margin * 2;
  let y = 50;

  // Nombre
  doc.fontSize(28).font("Helvetica-Bold").fillColor("#111827")
    .text(cv.name || "", margin, y);
  y = doc.y + 6;

  // Email
  doc.fontSize(12).font("Helvetica").fillColor("#6b7280")
    .text(cv.email || "", margin, y);
  y = doc.y + 20;

  // Línea separadora
  doc.moveTo(margin, y).lineTo(margin + width, y).lineWidth(2).stroke("#111827");
  y += 20;

  // Resumen
  if (cv.summary) {
    doc.fontSize(12).font("Helvetica").fillColor("#374151")
      .text(cv.summary, margin, y, { width, lineGap: 4 });
    y = doc.y + 24;
  }

  // Experiencia
  if (cv.experience?.length > 0) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor("#111827")
      .text("EXPERIENCIA", margin, y);
    y = doc.y + 10;
    cv.experience.forEach(exp => {
      doc.fontSize(14).font("Helvetica-Bold").fillColor("#111827")
        .text(exp.position || "", margin, y);
      y = doc.y + 2;
      doc.fontSize(12).font("Helvetica").fillColor("#6b7280")
        .text(`${exp.company} · ${exp.startDate} — ${exp.endDate}`, margin, y);
      y = doc.y + 6;
      if (exp.description) {
        doc.fontSize(12).font("Helvetica").fillColor("#374151")
          .text(exp.description, margin, y, { width, lineGap: 3 });
        y = doc.y + 14;
      }
    });
    y += 6;
  }

  // Educación
  if (cv.education?.length > 0) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor("#111827")
      .text("EDUCACIÓN", margin, y);
    y = doc.y + 10;
    cv.education.forEach(edu => {
      doc.fontSize(14).font("Helvetica-Bold").fillColor("#111827")
        .text(edu.degree || "", margin, y);
      y = doc.y + 2;
      doc.fontSize(12).font("Helvetica").fillColor("#6b7280")
        .text(`${edu.school} · ${edu.startDate} — ${edu.endDate}`, margin, y);
      y = doc.y + 6;
      if (edu.description) {
        doc.fontSize(12).font("Helvetica").fillColor("#374151")
          .text(edu.description, margin, y, { width, lineGap: 3 });
        y = doc.y + 14;
      }
    });
    y += 6;
  }

  // Habilidades
  if (cv.skills) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor("#111827")
      .text("HABILIDADES", margin, y);
    y = doc.y + 8;
    doc.fontSize(12).font("Helvetica").fillColor("#374151")
      .text(cv.skills, margin, y, { width });
  }
}

// ── Plantilla 3: Ejecutiva Verde ───────────────────────────
function renderEjecutivaVerde(doc, cv) {
  const margin = 50;
  const width = 595 - margin * 2;
  const green = "#166534";
  const lightGreen = "#16a34a";
  const headerHeight = 100; // ✅ altura fija, sin cálculo dinámico

  // ✅ Primero dibuja el rect
  doc.rect(0, 0, 595, headerHeight).fill(green);

  // ✅ Luego escribe el texto encima
  doc.fontSize(26).font("Helvetica-Bold").fillColor("white")
    .text(cv.name || "", margin, 28, { width });

  doc.fontSize(12).font("Helvetica").fillColor("rgba(255,255,255,0.85)")
    .text(cv.email || "", margin, 68, { width }); // ✅ posición Y fija

  let y = headerHeight + 24;

  // Resumen
  if (cv.summary) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor(green)
      .text("PERFIL", margin, y);
    y = doc.y + 8;
    doc.fontSize(12).font("Helvetica").fillColor("#374151")
      .text(cv.summary, margin, y, { width, lineGap: 4 });
    y = doc.y + 18;
    doc.moveTo(margin, y).lineTo(margin + width, y).lineWidth(1).stroke("#d1fae5");
    y += 16;
  }

  // Experiencia
  if (cv.experience?.length > 0) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor(green)
      .text("EXPERIENCIA", margin, y);
    y = doc.y + 10;
    cv.experience.forEach(exp => {
      doc.fontSize(14).font("Helvetica-Bold").fillColor("#111827")
        .text(exp.position || "", margin, y);
      y = doc.y + 2;
      doc.fontSize(12).font("Helvetica").fillColor(lightGreen)
        .text(`${exp.company} · ${exp.startDate} — ${exp.endDate}`, margin, y);
      y = doc.y + 6;
      if (exp.description) {
        doc.fontSize(12).font("Helvetica").fillColor("#6b7280")
          .text(exp.description, margin, y, { width, lineGap: 3 });
        y = doc.y + 14;
      }
    });
    y += 6;
    doc.moveTo(margin, y).lineTo(margin + width, y).lineWidth(1).stroke("#d1fae5");
    y += 16;
  }

  // Educación
  if (cv.education?.length > 0) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor(green)
      .text("EDUCACIÓN", margin, y);
    y = doc.y + 10;
    cv.education.forEach(edu => {
      doc.fontSize(14).font("Helvetica-Bold").fillColor("#111827")
        .text(edu.degree || "", margin, y);
      y = doc.y + 2;
      doc.fontSize(12).font("Helvetica").fillColor(lightGreen)
        .text(`${edu.school} · ${edu.startDate} — ${edu.endDate}`, margin, y);
      y = doc.y + 6;
      if (edu.description) {
        doc.fontSize(12).font("Helvetica").fillColor("#6b7280")
          .text(edu.description, margin, y, { width, lineGap: 3 });
        y = doc.y + 14;
      }
    });
    y += 6;
  }

  // Habilidades
  if (cv.skills) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor(green)
      .text("HABILIDADES", margin, y);
    y = doc.y + 8;
    const skillsList = cv.skills.split(",").map(s => s.trim()).filter(Boolean);
    doc.fontSize(12).font("Helvetica").fillColor("#374151")
      .text(skillsList.join(", "), margin, y, { width });
  }
} 

module.exports = generatePDF;