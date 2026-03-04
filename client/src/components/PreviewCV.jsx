import React from "react";

export default function PreviewCV({ cvData }) {
  if (!cvData) return null;

  return (
    <div style={{ marginTop: 20, padding: 10, border: "1px solid #000" }}>
      <h2>{cvData.name}</h2>
      <p><strong>Email:</strong> {cvData.email}</p>
      <p><strong>Resumen:</strong> {cvData.summary}</p>
      <p><strong>Experiencia:</strong></p>
      <ul>
        {cvData.experience.map((exp, i) => (
          <li key={i}>{exp.position} en {exp.company}: {exp.description}</li>
        ))}
      </ul>
      <p><strong>Educación:</strong></p>
      <ul>
        {cvData.education.map((edu, i) => (
          <li key={i}>{edu.degree} en {edu.school}: {edu.description}</li>
        ))}
      </ul>
    </div>
  );
}