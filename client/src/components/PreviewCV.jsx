import React from "react";

const mockData = {
  name: "María González",
  email: "maria.gonzalez@gmail.com",
  linkedin: "linkedin.com/in/maria-gonzalez",
  github: "github.com/mariagonzalez",
  portfolio: "mariagonzalez.dev",
  photo: null,
  summary: "Desarrolladora frontend con 3 años de experiencia construyendo interfaces modernas con React y TypeScript. Apasionada por el diseño y la experiencia de usuario.",
  experience: [
    {
      position: "Frontend Developer",
      company: "Tecnología SA",
      startDate: "2022",
      endDate: "2025",
      description: "Desarrollé interfaces web con React, reduciendo el tiempo de carga un 40% y mejorando la experiencia de usuario."
    }
  ],
  education: [
    {
      degree: "Lic. en Sistemas",
      school: "Universidad Nacional",
      startDate: "2018",
      endDate: "2022",
      description: "Especialización en desarrollo de software y arquitectura de sistemas."
    }
  ],
  skills: "React, JavaScript, TypeScript, CSS, Git, Figma"
};

// ── Traducciones ───────────────────────────────────────────
const labels = {
  es: {
    profile: "Perfil Profesional",
    experience: "Experiencia",
    education: "Educación",
    skills: "Habilidades",
    contact: "Contacto",
  },
  en: {
    profile: "Professional Profile",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    contact: "Contact",
  }
};

// ── Plantilla 1: Moderna Azul ──────────────────────────────
function PreviewPlantilla1({ data, language = "es" }) {
  const t = labels[language];
  const initials = data.name?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl flex" style={{ height: "600px" }}>

      {/* Sidebar azul */}
      <div className="flex flex-col items-center px-3 py-5 gap-3 overflow-y-auto" style={{ width: "36%", backgroundColor: "#4f46e5" }}>

        {data.photo ? (
          <img src={data.photo} alt="Foto"
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-300 flex-shrink-0" />
        ) : (
          <div className="w-20 h-20 rounded-full border-2 border-indigo-300 flex-shrink-0 flex items-center justify-center bg-white/20">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
        )}

        <h2 className="text-sm font-bold text-white text-center leading-tight">{data.name}</h2>
        <p className="text-xs text-center break-all" style={{ color: "rgba(255,255,255,0.7)" }}>{data.email}</p>

        {(data.linkedin || data.github || data.portfolio) && (
          <div className="w-full mt-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{t.contact}</p>
            {data.linkedin && <p className="text-xs text-white break-all">in  {data.linkedin}</p>}
            {data.github && <p className="text-xs text-white break-all">gh  {data.github}</p>}
            {data.portfolio && <p className="text-xs text-white break-all">web  {data.portfolio}</p>}
          </div>
        )}

        {data.skills && (
          <div className="w-full mt-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{t.skills}</p>
            {data.skills.split(",").map((s, i) => (
              <p key={i} className="text-xs text-white">• {s.trim()}</p>
            ))}
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 px-4 py-5 flex flex-col gap-4 overflow-y-auto">

        {data.summary && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4f46e5" }}>{t.profile}</p>
            <p className="text-xs text-gray-600 leading-relaxed">{data.summary}</p>
            <div className="mt-2 border-t border-gray-200" />
          </div>
        )}

        {data.experience?.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#4f46e5" }}>{t.experience}</p>
            <div className="flex flex-col gap-2">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-gray-900">{exp.position}</p>
                  <p className="text-xs" style={{ color: "#7c3aed" }}>{exp.company} | {exp.startDate} — {exp.endDate}</p>
                  {exp.description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
            <div className="mt-2 border-t border-gray-200" />
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#4f46e5" }}>{t.education}</p>
            <div className="flex flex-col gap-2">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-xs" style={{ color: "#7c3aed" }}>{edu.school} | {edu.startDate} — {edu.endDate}</p>
                  {edu.description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Plantilla 2: Ejecutiva Oscura ──────────────────────────
function PreviewPlantilla2({ data, language = "es" }) {
  const t = labels[language];
  const initials = data.name?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">

      <div className="bg-gray-900 px-6 py-5">
        <div className="flex items-center gap-4">
          {data.photo ? (
            <img src={data.photo} alt="Foto" className="w-14 h-14 rounded-full object-cover border-2 border-gray-600 flex-shrink-0" />
          ) : (
            <div className="w-14 h-14 rounded-full border-2 border-gray-600 flex-shrink-0 flex items-center justify-center bg-white/10">
              <span className="text-lg font-bold text-white">{initials}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white truncate">{data.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{data.email}</p>
            <div className="flex flex-col gap-0.5 mt-1.5">
              {data.linkedin && <span className="text-xs text-gray-500 truncate"><span className="font-bold text-blue-400">in</span> {data.linkedin}</span>}
              {data.github && <span className="text-xs text-gray-500 truncate">⌥ {data.github}</span>}
              {data.portfolio && <span className="text-xs text-gray-500 truncate">🌐 {data.portfolio}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-blue-600" />

      <div className="p-6 flex flex-col gap-5">

        {data.summary && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-blue-600 rounded" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">{t.profile}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-blue-600 rounded" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">{t.experience}</h3>
            </div>
            <div className="flex flex-col gap-3">
              {data.experience.map((exp, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{exp.position}</p>
                      <p className="text-xs text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  {exp.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-blue-600 rounded" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">{t.education}</h3>
            </div>
            <div className="flex flex-col gap-3">
              {data.education.map((edu, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{edu.degree}</p>
                      <p className="text-xs text-blue-600 font-medium">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  {edu.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-blue-600 rounded" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">{t.skills}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(",").map((skill, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded font-medium bg-blue-600 text-white">{skill.trim()}</span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Plantilla 3: Ejecutiva Verde ───────────────────────────
function PreviewPlantilla3({ data, language = "es" }) {
  const t = labels[language];
  const initials = data.name?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">

      <div className="bg-green-800 px-6 py-4">
        <div className="flex items-center gap-4">
          {data.photo ? (
            <img src={data.photo} alt="Foto"
              className="w-16 h-16 rounded-full object-cover border-2 border-green-300 flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-green-300 flex-shrink-0 flex items-center justify-center bg-white/20">
              <span className="text-xl font-bold text-white">{initials}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white leading-tight truncate">{data.name}</h2>
            <p className="text-xs text-white/80 mt-0.5 truncate">{data.email}</p>
            {(data.linkedin || data.github || data.portfolio) && (
              <p className="text-xs text-white/60 mt-1 truncate">
                {[
                  data.linkedin && `in: ${data.linkedin}`,
                  data.github && `gh: ${data.github}`,
                  data.portfolio && `web: ${data.portfolio}`
                ].filter(Boolean).join("   ")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 flex flex-col gap-4">

        {data.summary && (
          <div>
            <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-1">{t.profile}</p>
            <p className="text-xs text-gray-600 leading-relaxed">{data.summary}</p>
            <div className="mt-3 border-t border-green-100" />
          </div>
        )}

        {data.experience?.length > 0 && (
          <div>
            <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-2">{t.experience}</p>
            <div className="flex flex-col gap-3">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-gray-900">{exp.position}</p>
                  <p className="text-xs text-green-600 font-medium">{exp.company} · {exp.startDate} — {exp.endDate}</p>
                  {exp.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-green-100" />
          </div>
        )}

        {data.education?.length > 0 && (
          <div>
            <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-2">{t.education}</p>
            <div className="flex flex-col gap-3">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-xs text-green-600 font-medium">{edu.school} · {edu.startDate} — {edu.endDate}</p>
                  {edu.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills && (
          <div>
            <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-1">{t.skills}</p>
            <p className="text-xs text-gray-600">
              {data.skills.split(",").map(s => s.trim()).filter(Boolean).join(", ")}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Helper demo wrapper ────────────────────────────────────
function DemoWrapper({ isDemo, children }) {
  return (
    <div className="relative">
      {isDemo && (
        <div className="mb-4 px-3 py-2 bg-violet-900/40 border border-violet-700/50 rounded-xl text-xs text-violet-300 text-center">
          👆 Así se verá tu CV — completá el formulario y hacé clic en <strong>Generar Preview</strong>
        </div>
      )}
      <div className={isDemo ? "opacity-60" : ""}>{children}</div>
      {isDemo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="bg-gray-900/80 text-gray-300 text-xs px-4 py-2 rounded-full border border-gray-700">
            Vista previa de ejemplo
          </span>
        </div>
      )}
    </div>
  );
}

export default function PreviewCV({ cvData, template = "plantilla1", language = "es" }) {
  const data = cvData || mockData;
  const isDemo = !cvData;

  if (template === "plantilla1") {
    return <DemoWrapper isDemo={isDemo}><PreviewPlantilla1 data={data} language={language} /></DemoWrapper>;
  }

  if (template === "plantilla2") {
    return <DemoWrapper isDemo={isDemo}><PreviewPlantilla2 data={data} language={language} /></DemoWrapper>;
  }

  if (template === "plantilla3") {
    return <DemoWrapper isDemo={isDemo}><PreviewPlantilla3 data={data} language={language} /></DemoWrapper>;
  }

  return null;
}