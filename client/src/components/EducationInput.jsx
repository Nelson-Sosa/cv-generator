import React from "react";

export default function EducationInput({ education, setEducation }) {
  const handleChange = (index, field, value) => {
    const newEdu = [...education];
    newEdu[index][field] = value;
    setEducation(newEdu);
  };

  const addEducation = () => setEducation([...education, { school: "", degree: "", startDate: "", endDate: "", description: "" }]);
  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));

  return (
    <div>
      <h3>Educación</h3>
      {education.map((edu, index) => (
        <div key={index} style={{ marginBottom: 10, border: "1px solid #ccc", padding: 10 }}>
          <input placeholder="Institución" value={edu.school} onChange={(e) => handleChange(index, "school", e.target.value)} />
          <input placeholder="Título" value={edu.degree} onChange={(e) => handleChange(index, "degree", e.target.value)} />
          <input placeholder="Inicio" value={edu.startDate} onChange={(e) => handleChange(index, "startDate", e.target.value)} />
          <input placeholder="Fin" value={edu.endDate} onChange={(e) => handleChange(index, "endDate", e.target.value)} />
          <textarea placeholder="Descripción" value={edu.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
          <button type="button" onClick={() => removeEducation(index)}>Eliminar</button>
        </div>
      ))}
      <button type="button" onClick={addEducation}>Agregar educación</button>
    </div>
  );
}