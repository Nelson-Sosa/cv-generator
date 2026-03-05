import React, { useState } from "react";
import ExperienceInput from "./ExperienceInput";
import EducationInput from "./EducationInput";
import TemplateSelector from "./TemplateSelector";
import { generateCV } from "../api";

export default function CVForm({ cvData, setCvData, template, setTemplate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [photo, setPhoto] = useState(null); // base64
  const totalFields = 6;

  const handlePhoto = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => setPhoto(reader.result); // base64
  reader.readAsDataURL(file);
};

  const completedFields = [
  name,
  email,
  summary,
  skills,
  experience.length > 0 ? "ok" : "",
  education.length > 0 ? "ok" : ""
].filter(Boolean).length;

const progress = Math.round((completedFields / totalFields) * 100);

  const handlePreview = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await generateCV(
      { name, email, linkedin, github, portfolio, photo, summary, experience, education, skills },
      template,
      true
    );
    // ✅ Preserva las redes que el backend no devuelve
    setCvData({
      ...res.cvData,
      linkedin,
      github,
      portfolio
    });
  } catch (err) {
    console.error(err);
    alert("Error generando el CV");
  } finally {
    setLoading(false);
  }
};
const handleReset = () => {
  setName("");
  setEmail("");
  setLinkedin("");
  setGithub("");
  setPortfolio("");
  setSummary("");
  setExperience([]);
  setEducation([]);
  setSkills("");


};
const validateField = (name, value) => {
  let message = "";

  if (name === "name" && value.trim().length < 3) {
    message = "El nombre debe tener al menos 3 caracteres";
  }

  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      message = "Ingresa un email válido";
    }
  }

  if (name === "summary" && value.length > 0 && value.length < 20) {
    message = "El resumen debería tener al menos 20 caracteres";
  }

  if (name === "skills" && value.length > 0 && value.length < 5) {
    message = "Agrega más habilidades";
  }

  setErrors(prev => ({
    ...prev,
    [name]: message
  }));
};

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide";

  return (
    <div>
  {/* Badges profesionales: confianza y conversión */}
  <div className="flex flex-wrap gap-3 mb-4">
    <div className="group relative flex items-center gap-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full cursor-default transition-transform transform hover:scale-105">
      <span>✔</span>
      <span>Seguro</span>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Tus datos están protegidos
      </div>
    </div>

    <div className="group relative flex items-center gap-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full cursor-default transition-transform transform hover:scale-105">
      <span>🔒</span>
      <span>Sin registro requerido</span>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Completa tu CV sin crear cuenta
      </div>
    </div>

    <div className="group relative flex items-center gap-2 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full cursor-default transition-transform transform hover:scale-105">
      <span>⭐</span>
      <span>Confianza</span>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Más de 1000 usuarios confían en nuestra herramienta
      </div>
    </div>
  </div>
    
    <form onSubmit={handlePreview} className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-gray-200">Datos del CV</h2>
      {/* Indicador de progreso */}
<div className="w-full">
  <div className="flex justify-between text-xs text-gray-400 mb-1">
    <span>Progreso del CV</span>
    <span>{progress}%</span>
  </div>

  <div className="w-full bg-gray-800 rounded-full h-2">
    <div
      className="bg-violet-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
</div>
{/* Foto de perfil — opcional */}
<div>
  <label className={labelClass}>Foto de perfil <span className="text-gray-600 normal-case">(opcional)</span></label>
  <div className="flex items-center gap-4">
    {photo ? (
      <div className="relative">
        <img src={photo} alt="Foto" className="w-16 h-16 rounded-full object-cover border-2 border-violet-500" />
        <button
          type="button"
          onClick={() => setPhoto(null)}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
        >✕</button>
      </div>
    ) : (
      <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-600 text-2xl">
        👤
      </div>
    )}
    <label className="cursor-pointer bg-gray-800 border border-gray-700 hover:border-violet-500 text-gray-400 hover:text-violet-400 transition rounded-xl px-4 py-2 text-sm">
      {photo ? "Cambiar foto" : "Subir foto"}
      <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
    </label>
  </div>
</div>
      <div>
  <label className={labelClass}>Nombre completo</label>
  <input
    className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
    placeholder="Ej: María González"
    value={name}
    onChange={(e) => {
      setName(e.target.value);
      validateField("name", e.target.value);
    }}
    required
  />
  {errors.name && (
    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
  )}
</div>

      <div>
  <label className={labelClass}>Email</label>
  <input
    className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
    type="email"
    placeholder="maria@email.com"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      validateField("email", e.target.value);
    }}
    required
  />
  {errors.email && (
    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
  )}
</div>

      {/* Redes sociales */}
      <div className="border-t border-gray-800 pt-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Redes sociales</h3>
        <div className="flex flex-col gap-3">

          <div>
            <label className={labelClass}>LinkedIn</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">in</span>
              <input
                className={`${inputClass} pl-8`}
                placeholder="linkedin.com/in/tu-perfil"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>GitHub</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">⌥</span>
              <input
                className={`${inputClass} pl-8`}
                placeholder="github.com/tu-usuario"
                value={github}
                onChange={e => setGithub(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Portfolio</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🌐</span>
              <input
                className={`${inputClass} pl-8`}
                placeholder="tuportfolio.com"
                value={portfolio}
                onChange={e => setPortfolio(e.target.value)}
              />
            </div>
          </div>

        </div>
      </div>

      <div>
  <label className={labelClass}>Resumen profesional</label>
  <textarea
    className={`${inputClass} resize-none ${errors.summary ? "border-red-500" : ""}`}
    rows={3}
    placeholder="Describí tu perfil profesional..."
    value={summary}
    onChange={(e) => {
      setSummary(e.target.value);
      validateField("summary", e.target.value);
    }}
  />
  {errors.summary && (
    <p className="text-red-400 text-xs mt-1">{errors.summary}</p>
  )}
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
    className={`${inputClass} resize-none ${errors.skills ? "border-red-500" : ""}`}
    rows={2}
    placeholder="JavaScript, React, Testing, Jira..."
    value={skills}
    onChange={(e) => {
      setSkills(e.target.value);
      validateField("skills", e.target.value);
    }}
  />
  {errors.skills && (
    <p className="text-red-400 text-xs mt-1">{errors.skills}</p>
  )}
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

      <button
    type="button"
    onClick={handleReset}
    className="w-full bg-gray-700 hover:bg-gray-600 transition text-white font-semibold py-3 rounded-xl text-sm"
  >
    🗑 Limpiar
  </button>
    </form>
  </div>
  );
}