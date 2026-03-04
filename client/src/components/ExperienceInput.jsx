import React from "react";

export default function ExperienceInput({ experience, setExperience }) {
  const handleChange = (index, field, value) => {
    const newExp = [...experience];
    newExp[index][field] = value;
    setExperience(newExp);
  };

  const addExperience = () => setExperience([...experience, { company: "", position: "", startDate: "", endDate: "", description: "" }]);
  const removeExperience = (index) => setExperience(experience.filter((_, i) => i !== index));

  return (
    <div>
      <h3>Experiencia</h3>
      {experience.map((exp, index) => (
        <div key={index} style={{ marginBottom: 10, border: "1px solid #ccc", padding: 10 }}>
          <input placeholder="Empresa" value={exp.company} onChange={(e) => handleChange(index, "company", e.target.value)} />
          <input placeholder="Puesto" value={exp.position} onChange={(e) => handleChange(index, "position", e.target.value)} />
          <input placeholder="Inicio" value={exp.startDate} onChange={(e) => handleChange(index, "startDate", e.target.value)} />
          <input placeholder="Fin" value={exp.endDate} onChange={(e) => handleChange(index, "endDate", e.target.value)} />
          <textarea placeholder="Descripción" value={exp.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
          <button type="button" onClick={() => removeExperience(index)}>Eliminar</button>
        </div>
      ))}
      <button type="button" onClick={addExperience}>Agregar experiencia</button>
    </div>
  );
}