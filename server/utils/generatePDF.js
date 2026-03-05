const PDFDocument = require("pdfkit");

function generatePDF({ cvData, template }, res) {
  const doc = new PDFDocument({ margin: 0, autoFirstPage: false });
  doc.addPage({ margin: 0, size: 'A4' });

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

// ── Helper: dibujar foto circular ─────────────────────────
function drawPhoto(doc, base64, x, y, size) {
  if (!base64) return;
  try {
    const data = base64.split(";base64,")[1];
    const buffer = Buffer.from(data, "base64");
    doc.save();
    doc.circle(x + size / 2, y + size / 2, size / 2).clip();
    doc.image(buffer, x, y, { width: size, height: size });
    doc.restore();
  } catch (e) {
    // Si falla la foto, continúa sin ella
  }
}

// ── Plantilla 1: Moderna Azul ──────────────────────────────
function renderModernaAzul(doc, cv) {
  const sidebarWidth = 200;
  const pageHeight = 842;
  const primaryColor = "#4f46e5";
  const accentColor = "#7c3aed";

  doc.rect(0, 0, sidebarWidth, pageHeight).fill(primaryColor);

  let sidebarY = 30;

  // Foto en sidebar (opcional)
  if (cv.photo) {
    drawPhoto(doc, cv.photo, 55, sidebarY, 90);
    sidebarY += 100;
  }

  doc.fillColor("white").fontSize(20).font("Helvetica-Bold")
    .text(cv.name || "", 15, sidebarY, { width: sidebarWidth - 30 });
  sidebarY = doc.y + 6;

  doc.fontSize(11).font("Helvetica").fillColor("rgba(255,255,255,0.7)")
    .text(cv.email || "", 15, sidebarY, { width: sidebarWidth - 30 });
  sidebarY = doc.y + 8;

  // Redes en sidebar
  if (cv.linkedin || cv.github || cv.portfolio) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor("rgba(255,255,255,0.5)")
      .text("CONTACTO", 15, sidebarY, { width: sidebarWidth - 30 });
    sidebarY = doc.y + 4;
    if (cv.linkedin) {
      doc.fontSize(9).font("Helvetica").fillColor("white")
        .text(`in  ${cv.linkedin}`, 15, sidebarY, { width: sidebarWidth - 30 });
      sidebarY = doc.y + 2;
    }
    if (cv.github) {
      doc.fontSize(9).font("Helvetica").fillColor("white")
        .text(`gh  ${cv.github}`, 15, sidebarY, { width: sidebarWidth - 30 });
      sidebarY = doc.y + 2;
    }
    if (cv.portfolio) {
      doc.fontSize(9).font("Helvetica").fillColor("white")
        .text(`web  ${cv.portfolio}`, 15, sidebarY, { width: sidebarWidth - 30 });
      sidebarY = doc.y + 2;
    }
    sidebarY += 8;
  }

  if (cv.skills) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor("rgba(255,255,255,0.5)")
      .text("HABILIDADES", 15, sidebarY, { width: sidebarWidth - 30 });
    sidebarY = doc.y + 4;
    const skillsList = cv.skills.split(",").map(s => s.trim()).filter(Boolean);
    skillsList.forEach(skill => {
      doc.fontSize(11).font("Helvetica").fillColor("white")
        .text(`• ${skill}`, 15, sidebarY, { width: sidebarWidth - 30 });
      sidebarY = doc.y;
    });
  }

  const mainX = sidebarWidth + 24;
  const mainWidth = 595 - sidebarWidth - 48;
  let y = 40;

  if (cv.summary) {
    doc.fontSize(9).font("Helvetica-Bold").fillColor(primaryColor)
      .text("PERFIL PROFESIONAL", mainX, y);
    y += 16;
    doc.fontSize(11).font("Helvetica").fillColor("#374151")
      .text(cv.summary, mainX, y, { width: mainWidth });
    y = doc.y + 18;
    doc.moveTo(mainX, y).lineTo(mainX + mainWidth, y).stroke("#e5e7eb");
    y += 14;
  }

  if (cv.experience?.length > 0) {
    doc.fontSize(9).font("Helvetica-Bold").fillColor(primaryColor)
      .text("EXPERIENCIA", mainX, y);
    y += 16;
    cv.experience.forEach(exp => {
      doc.fontSize(13).font("Helvetica-Bold").fillColor("#111827")
        .text(exp.position || "", mainX, y, { width: mainWidth });
      y = doc.y + 2;
      doc.fontSize(11).font("Helvetica").fillColor(accentColor)
        .text(`${exp.company}  |  ${exp.startDate} — ${exp.endDate}`, mainX, y);
      y = doc.y + 6;
      if (exp.description) {
        doc.fontSize(11).font("Helvetica").fillColor("#6b7280")
          .text(exp.description, mainX, y, { width: mainWidth });
        y = doc.y + 12;
      }
    });
    y += 6;
    doc.moveTo(mainX, y).lineTo(mainX + mainWidth, y).stroke("#e5e7eb");
    y += 14;
  }

  if (cv.education?.length > 0) {
    doc.fontSize(9).font("Helvetica-Bold").fillColor(primaryColor)
      .text("EDUCACIÓN", mainX, y);
    y += 16;
    cv.education.forEach(edu => {
      doc.fontSize(13).font("Helvetica-Bold").fillColor("#111827")
        .text(edu.degree || "", mainX, y, { width: mainWidth });
      y = doc.y + 2;
      doc.fontSize(11).font("Helvetica").fillColor(accentColor)
        .text(`${edu.school}  |  ${edu.startDate} — ${edu.endDate}`, mainX, y);
      y = doc.y + 6;
      if (edu.description) {
        doc.fontSize(11).font("Helvetica").fillColor("#6b7280")
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

  // Foto a la derecha del nombre (opcional)
  if (cv.photo) {
    drawPhoto(doc, cv.photo, 595 - margin - 70, y, 70);
  }

  doc.fontSize(28).font("Helvetica-Bold").fillColor("#111827")
    .text(cv.name || "", margin, y, { width: cv.photo ? width - 80 : width });
  y = doc.y + 4;

  doc.fontSize(12).font("Helvetica").fillColor("#6b7280")
    .text(cv.email || "", margin, y);
  y = doc.y + 4;

  if (cv.linkedin || cv.github || cv.portfolio) {
    const parts = [];
    if (cv.linkedin) parts.push(`in: ${cv.linkedin}`);
    if (cv.github) parts.push(`gh: ${cv.github}`);
    if (cv.portfolio) parts.push(`web: ${cv.portfolio}`);
    doc.fontSize(10).font("Helvetica").fillColor("#9ca3af")
      .text(parts.join("   "), margin, y, { width });
    y = doc.y + 4;
  }

  y += 12;
  doc.moveTo(margin, y).lineTo(margin + width, y).lineWidth(2).stroke("#111827");
  y += 20;

  if (cv.summary) {
    doc.fontSize(12).font("Helvetica").fillColor("#374151")
      .text(cv.summary, margin, y, { width, lineGap: 4 });
    y = doc.y + 24;
  }

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

  doc.rect(0, 0, 595, 90).fill(green);

  // Foto en header (opcional)
  if (cv.photo) {
    drawPhoto(doc, cv.photo, 595 - margin - 60, 15, 60);
  }

  doc.fontSize(26).font("Helvetica-Bold").fillColor("white")
    .text(cv.name || "", margin, 20, { width: cv.photo ? width - 70 : width, lineBreak: false });
  doc.fontSize(12).font("Helvetica").fillColor("rgba(255,255,255,0.85)")
    .text(cv.email || "", margin, 52, { width, lineBreak: false });

  if (cv.linkedin || cv.github || cv.portfolio) {
    const parts = [];
    if (cv.linkedin) parts.push(`in: ${cv.linkedin}`);
    if (cv.github) parts.push(`gh: ${cv.github}`);
    if (cv.portfolio) parts.push(`web: ${cv.portfolio}`);
    doc.fontSize(9).font("Helvetica").fillColor("rgba(255,255,255,0.65)")
      .text(parts.join("   "), margin, 68, { width, lineBreak: false });
  }

  let y = 106;

  if (cv.summary) {
    const cleanSummary = cv.summary.replace(/^[-*•\s]+/, "").trim();
    doc.fontSize(10).font("Helvetica-Bold").fillColor(green)
      .text("PERFIL", margin, y, { lineBreak: false });
    y += 18;
    doc.fontSize(12).font("Helvetica").fillColor("#374151")
      .text(cleanSummary, margin, y, { width, lineGap: 4 });
    y = doc.y + 14;
    doc.moveTo(margin, y).lineTo(margin + width, y).lineWidth(1).stroke("#d1fae5");
    y += 14;
  }

  if (cv.experience?.length > 0) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor(green)
      .text("EXPERIENCIA", margin, y, { lineBreak: false });
    y += 18;
    cv.experience.forEach(exp => {
      doc.fontSize(14).font("Helvetica-Bold").fillColor("#111827")
        .text(exp.position || "", margin, y, { width });
      y = doc.y + 2;
      doc.fontSize(12).font("Helvetica").fillColor(lightGreen)
        .text(`${exp.company} · ${exp.startDate} — ${exp.endDate}`, margin, y, { width });
      y = doc.y + 6;
      if (exp.description) {
        const cleanDesc = exp.description.replace(/^[-*•\s]+/, "").trim();
        doc.fontSize(12).font("Helvetica").fillColor("#6b7280")
          .text(cleanDesc, margin, y, { width, lineGap: 3 });
        y = doc.y + 12;
      }
    });
    y += 4;
    doc.moveTo(margin, y).lineTo(margin + width, y).lineWidth(1).stroke("#d1fae5");
    y += 14;
  }

  if (cv.education?.length > 0) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor(green)
      .text("EDUCACIÓN", margin, y, { lineBreak: false });
    y += 18;
    cv.education.forEach(edu => {
      doc.fontSize(14).font("Helvetica-Bold").fillColor("#111827")
        .text(edu.degree || "", margin, y, { width });
      y = doc.y + 2;
      doc.fontSize(12).font("Helvetica").fillColor(lightGreen)
        .text(`${edu.school} · ${edu.startDate} — ${edu.endDate}`, margin, y, { width });
      y = doc.y + 6;
      if (edu.description) {
        const cleanDesc = edu.description.replace(/^[-*•\s]+/, "").trim();
        doc.fontSize(12).font("Helvetica").fillColor("#6b7280")
          .text(cleanDesc, margin, y, { width, lineGap: 3 });
        y = doc.y + 12;
      }
    });
    y += 4;
  }

  if (cv.skills) {
    doc.fontSize(10).font("Helvetica-Bold").fillColor(green)
      .text("HABILIDADES", margin, y, { lineBreak: false });
    y += 18;
    const skillsList = cv.skills.split(",").map(s => s.trim()).filter(Boolean);
    doc.fontSize(12).font("Helvetica").fillColor("#374151")
      .text(skillsList.join(", "), margin, y, { width });
  }
}

module.exports = generatePDF;
```

El commit:
```
feat: add optional profile photo to form, preview and PDF templates