import React, { useState } from "react";
import ExperienceInput from "./ExperienceInput";
import EducationInput from "./EducationInput";
import TemplateSelector from "./TemplateSelector";
import { generateCV } from "../api";

export default function CVForm({ cvData, setCvData, template, setTemplate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePreview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await generateCV(
        { name, email, summary, experience, education, skills },
        template,
        true
      );
      setCvData(res.cvData);
    } catch (err) {
      console.error(err);
      alert("Error generando el CV");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handlePreview} className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-gray-200">Datos del CV</h2>

      <div>
        <label className={labelClass}>Nombre completo</label>
        <input
          className={inputClass}
          placeholder="Ej: María González"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input
          className={inputClass}
          type="email"
          placeholder="maria@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Resumen profesional</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          placeholder="Describí tu perfil profesional..."
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
      </div>

      <div className="border-t border-gray-800 pt-4">
        <ExperienceInput experience={experience} setExperience={setExperience} />
      </div>

      <div className="border-t border-gray-800 pt-4">
        <EducationInput education={education} setEducation={setEducation} />
      </div>

      <div>
        <label className={labelClass}>Habilidades</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={2}
          placeholder="JavaScript, React, Testing, Jira..."
          value={skills}
          onChange={e => setSkills(e.target.value)}
        />
      </div>

      <div className="border-t border-gray-800 pt-4">
        <TemplateSelector selected={template} setSelected={setTemplate} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-white font-semibold py-3 rounded-xl text-sm"
      >
        {loading ? "⟳ Generando con IA..." : "✦ Generar Preview"}
      </button>
    </form>
  );
}