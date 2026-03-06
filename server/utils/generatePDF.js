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

// ── Plantilla 1: Moderna Azul — fiel al PDF ────────────────
function PreviewPlantilla1({ data }) {
  const initials = data.name?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl flex">

      {/* Sidebar violeta — ancho fijo como en el PDF */}
      <div className="bg-violet-700 flex flex-col items-center py-4 gap-2 flex-shrink-0" style={{ width: "33%" }}>

        {/* Foto o iniciales */}
        {data.photo ? (
          <img src={data.photo} alt="Foto"
            className="w-16 h-16 rounded-full object-cover border-2 border-violet-300" />
        ) : (
          <div className="w-16 h-16 rounded-full border-2 border-violet-300 flex items-center justify-center bg-white/20">
            <span className="text-lg font-bold text-white">{initials}</span>
          </div>
        )}

        {/* Nombre y email */}
        <p className="text-xs font-bold text-white text-center px-2 leading-tight">{data.name}</p>
        <p className="text-xs text-violet-200 text-center px-2 leading-tight break-all">{data.email}</p>

        {/* Contacto */}
        {(data.linkedin || data.github || data.portfolio) && (
          <div className="w-full px-2 mt-1">
            <p className="text-xs font-bold text-violet-300 uppercase tracking-wide mb-1">Contacto</p>
            {data.linkedin && (
              <p className="text-xs text-white leading-tight mb-0.5 overflow-hidden" style={{ fontSize: "9px" }}>
                in {data.linkedin}
              </p>
            )}
            {data.github && (
              <p className="text-xs text-white leading-tight mb-0.5 overflow-hidden" style={{ fontSize: "9px" }}>
                gh {data.github}
              </p>
            )}
            {data.portfolio && (
              <p className="text-xs text-white leading-tight mb-0.5 overflow-hidden" style={{ fontSize: "9px" }}>
                web {data.portfolio}
              </p>
            )}
          </div>
        )}

        {/* Habilidades */}
        {data.skills && (
          <div className="w-full px-2 mt-1">
            <p className="text-xs font-bold text-violet-300 uppercase tracking-wide mb-1">Habilidades</p>
            {data.skills.split(",").map((s, i) => (
              <p key={i} className="text-white leading-tight" style={{ fontSize: "9px" }}>• {s.trim()}</p>
            ))}
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-3 py-4 flex flex-col gap-3 overflow-hidden">

        {data.summary && (
          <div>
            <p className="font-bold text-violet-700 uppercase tracking-wide mb-1" style={{ fontSize: "8px" }}>
              Perfil Profesional
            </p>
            <p className="text-gray-600 leading-relaxed" style={{ fontSize: "9px" }}>{data.summary}</p>
            <div className="mt-2 border-t border-gray-200" />
          </div>
        )}

        {data.experience?.length > 0 && (
          <div>
            <p className="font-bold text-violet-700 uppercase tracking-wide mb-1" style={{ fontSize: "8px" }}>
              Experiencia
            </p>
            <div className="flex flex-col gap-2">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>{exp.position}</p>
                  <p className="text-violet-600 leading-tight" style={{ fontSize: "9px" }}>
                    {exp.company} | {exp.startDate} — {exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-gray-500 leading-relaxed mt-0.5" style={{ fontSize: "9px" }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 border-t border-gray-200" />
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <p className="font-bold text-violet-700 uppercase tracking-wide mb-1" style={{ fontSize: "8px" }}>
              Educación
            </p>
            <div className="flex flex-col gap-2">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-bold text-gray-900 leading-tight" style={{ fontSize: "11px" }}>{edu.degree}</p>
                  <p className="text-violet-600 leading-tight" style={{ fontSize: "9px" }}>
                    {edu.school} | {edu.startDate} — {edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-gray-500 leading-relaxed mt-0.5" style={{ fontSize: "9px" }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
// ── Plantilla 2: Ejecutiva Oscura ─────────────────────────
function renderMinimalista(doc, cv) {
  const margin = 50;
  const width = 595 - margin * 2;
  const darkGray = "#1f2937";
  const medGray = "#6b7280";
  const lightGray = "#f3f4f6";
  const accentColor = "#2563eb";

  // ── Header con fondo oscuro ──
  doc.rect(0, 0, 595, 130).fill(darkGray);

  // Foto a la izquierda en el header
  const photoSize = 80;
  let textX = margin;
  let textWidth = width;

  if (cv.photo) {
    const photoY = (130 - photoSize) / 2;
    drawPhoto(doc, cv.photo, margin, photoY, photoSize);
    textX = margin + photoSize + 16;
    textWidth = width - photoSize - 16;
  }

  // Nombre
  doc.fontSize(24).font("Helvetica-Bold").fillColor("white")
    .text(cv.name || "", textX, 28, { width: textWidth, lineBreak: false });

  // Email
  doc.fontSize(11).font("Helvetica").fillColor("#9ca3af")
    .text(cv.email || "", textX, 58, { width: textWidth, lineBreak: false });

  // Redes en una línea
  if (cv.linkedin || cv.github || cv.portfolio) {
    const parts = [];
    if (cv.linkedin) parts.push(`in: ${cv.linkedin}`);
    if (cv.github) parts.push(`gh: ${cv.github}`);
    if (cv.portfolio) parts.push(`web: ${cv.portfolio}`);
    doc.fontSize(9).font("Helvetica").fillColor("#6b7280")
      .text(parts.join("   "), textX, 78, { width: textWidth, lineBreak: false });
  }

  // Franja de acento azul
  doc.rect(0, 130, 595, 4).fill(accentColor);

  let y = 150;

  // ── Resumen ──
  if (cv.summary) {
    doc.rect(margin, y, 4, 14).fill(accentColor); // barra lateral azul
    doc.fontSize(11).font("Helvetica-Bold").fillColor(darkGray)
      .text("PERFIL PROFESIONAL", margin + 12, y, { lineBreak: false });
    y += 22;
    doc.fontSize(11).font("Helvetica").fillColor("#374151")
      .text(cv.summary.replace(/^[-*•\s]+/, "").trim(), margin, y, { width, lineGap: 4 });
    y = doc.y + 18;
  }

  // ── Experiencia ──
  if (cv.experience?.length > 0) {
    doc.rect(margin, y, 4, 14).fill(accentColor);
    doc.fontSize(11).font("Helvetica-Bold").fillColor(darkGray)
      .text("EXPERIENCIA", margin + 12, y, { lineBreak: false });
    y += 22;

    cv.experience.forEach(exp => {
      // Fondo gris suave por entrada
      const descLines = exp.description ? Math.ceil(exp.description.length / 80) : 0;
      const blockHeight = 42 + descLines * 16;
      doc.rect(margin, y - 6, width, blockHeight).fill(lightGray);

      doc.fontSize(13).font("Helvetica-Bold").fillColor(darkGray)
        .text(exp.position || "", margin + 8, y, { width: width - 8 });
      y = doc.y + 2;
      doc.fontSize(10).font("Helvetica").fillColor(accentColor)
        .text(`${exp.company}`, margin + 8, y, { continued: true })
        .fillColor(medGray)
        .text(`   ${exp.startDate} — ${exp.endDate}`);
      y = doc.y + 6;
      if (exp.description) {
        doc.fontSize(11).font("Helvetica").fillColor("#4b5563")
          .text(exp.description.replace(/^[-*•\s]+/, "").trim(), margin + 8, y, { width: width - 8, lineGap: 3 });
        y = doc.y;
      }
      y += 14;
    });
  }

  // ── Educación ──
  if (cv.education?.length > 0) {
    doc.rect(margin, y, 4, 14).fill(accentColor);
    doc.fontSize(11).font("Helvetica-Bold").fillColor(darkGray)
      .text("EDUCACIÓN", margin + 12, y, { lineBreak: false });
    y += 22;

    cv.education.forEach(edu => {
      const descLines = edu.description ? Math.ceil(edu.description.length / 80) : 0;
      const blockHeight = 42 + descLines * 16;
      doc.rect(margin, y - 6, width, blockHeight).fill(lightGray);

      doc.fontSize(13).font("Helvetica-Bold").fillColor(darkGray)
        .text(edu.degree || "", margin + 8, y, { width: width - 8 });
      y = doc.y + 2;
      doc.fontSize(10).font("Helvetica").fillColor(accentColor)
        .text(`${edu.school}`, margin + 8, y, { continued: true })
        .fillColor(medGray)
        .text(`   ${edu.startDate} — ${edu.endDate}`);
      y = doc.y + 6;
      if (edu.description) {
        doc.fontSize(11).font("Helvetica").fillColor("#4b5563")
          .text(edu.description.replace(/^[-*•\s]+/, "").trim(), margin + 8, y, { width: width - 8, lineGap: 3 });
        y = doc.y;
      }
      y += 14;
    });
  }

  // ── Habilidades ──
  if (cv.skills) {
    doc.rect(margin, y, 4, 14).fill(accentColor);
    doc.fontSize(11).font("Helvetica-Bold").fillColor(darkGray)
      .text("HABILIDADES", margin + 12, y, { lineBreak: false });
    y += 22;

    const skillsList = cv.skills.split(",").map(s => s.trim()).filter(Boolean);
    let skillX = margin;
    skillsList.forEach(skill => {
      const skillWidth = skill.length * 6.5 + 16;
      if (skillX + skillWidth > margin + width) {
        skillX = margin;
        y += 24;
      }
      doc.rect(skillX, y, skillWidth, 18).fill(accentColor);
      doc.fontSize(9).font("Helvetica").fillColor("white")
        .text(skill, skillX + 8, y + 4, { lineBreak: false });
      skillX += skillWidth + 8;
    });
  }
}
// ── Plantilla 3: Ejecutiva Verde ───────────────────────────
function renderEjecutivaVerde(doc, cv) {
  const margin = 50;
  const width = 595 - margin * 2;
  const green = "#166534";
  const lightGreen = "#16a34a";

  const headerHeight = cv.photo ? 110 : 90;
  doc.rect(0, 0, 595, headerHeight).fill(green);

  // ✅ Foto a la IZQUIERDA, centrada verticalmente
  const photoSize = 80;
  let textX = margin;
  let textWidth = width;

  if (cv.photo) {
    const photoY = (headerHeight - photoSize) / 2;
    drawPhoto(doc, cv.photo, margin, photoY, photoSize);
    textX = margin + photoSize + 14; // ✅ texto empieza después de la foto
    textWidth = width - photoSize - 14;
  }

  doc.fontSize(24).font("Helvetica-Bold").fillColor("white")
    .text(cv.name || "", textX, 22, { width: textWidth, lineBreak: false });

  doc.fontSize(11).font("Helvetica").fillColor("rgba(255,255,255,0.85)")
    .text(cv.email || "", textX, 54, { width: textWidth, lineBreak: false });

  if (cv.linkedin || cv.github || cv.portfolio) {
    const parts = [];
    if (cv.linkedin) parts.push(`in: ${cv.linkedin}`);
    if (cv.github) parts.push(`gh: ${cv.github}`);
    if (cv.portfolio) parts.push(`web: ${cv.portfolio}`);
    doc.fontSize(9).font("Helvetica").fillColor("rgba(255,255,255,0.65)")
      .text(parts.join("   "), textX, 72, { width: textWidth, lineBreak: false });
  }

  let y = headerHeight + 16;

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