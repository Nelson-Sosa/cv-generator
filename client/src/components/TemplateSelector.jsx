import React from "react";

const templates = [
  { id: "plantilla1", name: "Moderna Azul" },
  { id: "plantilla2", name: "Profesional Minimalista" }
];

export default function TemplateSelector({ selected, setSelected }) {
  return (
    <div>
      <label>Plantilla:</label>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
    </div>
  );
}