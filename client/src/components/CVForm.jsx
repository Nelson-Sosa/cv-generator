import React, { useState } from "react";
import ExperienceInput from "./ExperienceInput";
import EducationInput from "./EducationInput";
import TemplateSelector from "./TemplateSelector";
import { generateCV } from "../api";

export default function CVForm({ cvData, setCvData }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [template, setTemplate] = useState("plantilla1");
  const [loading, setLoading] = useState(false);

  const handlePreview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await generateCV({ name, email, summary, experience, education, skills: "" }, template, true);
      setCvData(res.cvData);
      alert("Preview generado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error generando el CV");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePreview}>
      <h2>Generador de CV Profesional</h2>
      <input placeholder="Nombre completo" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <textarea placeholder="Resumen profesional" value={summary} onChange={e => setSummary(e.target.value)} />
      <ExperienceInput experience={experience} setExperience={setExperience} />
      <EducationInput education={education} setEducation={setEducation} />
      <TemplateSelector selected={template} setSelected={setTemplate} />
      <button type="submit" disabled={loading}>{loading ? "Generando..." : "Generar Preview"}</button>
    </form>
  );
}