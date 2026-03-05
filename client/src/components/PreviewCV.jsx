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

const templateStyles = {
  plantilla1: {
    header: "bg-violet-700",
    headerText: "text-white",
    headerSubtext: "text-violet-200",
    accent: "text-violet-700",
    border: "border-violet-300",
    tag: "bg-violet-100 text-violet-700",
    link: "text-violet-300",
    photoBorder: "border-violet-300"
  },
  plantilla3: {
    header: "bg-green-800",
    headerText: "text-white",
    headerSubtext: "text-green-200",
    accent: "text-green-700",
    border: "border-green-300",
    tag: "bg-green-100 text-green-700",
    link: "text-green-200",
    photoBorder: "border-green-300"
  }
};

// ── Plantilla 2: Ejecutiva Oscura ──────────────────────────
function PreviewPlantilla2({ data }) {
  const initials = data.name?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl">

      {/* Header oscuro */}
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

      {/* Franja azul */}
      <div className="h-1 bg-blue-600" />

      <div className="p-6 flex flex-col gap-5">

        {/* Resumen */}
        {data.summary && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-blue-600 rounded" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">Perfil Profesional</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experiencia */}
        {data.experience?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-blue-600 rounded" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">Experiencia</h3>
            </div>
            <div className="flex flex-col gap-3">
              {data.experience.map((exp, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{exp.position}</p>
                      <p className="text-xs text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educación */}
        {data.education?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-blue-600 rounded" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">Educación</h3>
            </div>
            <div className="flex flex-col gap-3">
              {data.education.map((edu, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{edu.degree}</p>
                      <p className="text-xs text-blue-600 font-medium">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {data.skills && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-blue-600 rounded" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800">Habilidades</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(",").map((skill, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded font-medium bg-blue-600 text-white">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function PreviewCV({ cvData, template = "plantilla1" }) {
  const data = cvData || mockData;
  const isDemo = !cvData;

  const initials = data.name?.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  // ── Plantilla 2 tiene su propio render ──
  if (template === "plantilla2") {
    return (
      <div className="relative">
        {isDemo && (
          <div className="mb-4 px-3 py-2 bg-violet-900/40 border border-violet-700/50 rounded-xl text-xs text-violet-300 text-center">
            👆 Así se verá tu CV — completá el formulario y hacé clic en <strong>Generar Preview</strong>
          </div>
        )}
        <div className={isDemo ? "opacity-60" : ""}>
          <PreviewPlantilla2 data={data} />
        </div>
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

  const styles = templateStyles[template] || templateStyles.plantilla1;

  return (
    <div className="relative">

      {isDemo && (
        <div className="mb-4 px-3 py-2 bg-violet-900/40 border border-violet-700/50 rounded-xl text-xs text-violet-300 text-center">
          👆 Así se verá tu CV — completá el formulario y hacé clic en <strong>Generar Preview</strong>
        </div>
      )}

      <div className={`bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl ${isDemo ? "opacity-60" : ""}`}>

        {/* Header plantilla 1 y 3 */}
        <div className={`${styles.header} px-6 py-5`}>
          <div className="flex items-center gap-4">
            {data.photo ? (
              <img src={data.photo} alt="Foto de perfil"
                className={`w-14 h-14 rounded-full object-cover border-2 ${styles.photoBorder} flex-shrink-0`} />
            ) : (
              <div className={`w-14 h-14 rounded-full border-2 ${styles.photoBorder} flex-shrink-0 flex items-center justify-center bg-white/20`}>
                <span className={`text-lg font-bold ${styles.headerText}`}>{initials}</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h2 className={`text-lg font-bold ${styles.headerText} truncate`}>{data.name}</h2>
              <p className={`text-xs mt-0.5 ${styles.headerSubtext} truncate`}>{data.email}</p>
              <div className="flex flex-col gap-0.5 mt-1.5">
                {data.linkedin && <span className={`text-xs ${styles.link} truncate`}><span className="font-bold">in</span> {data.linkedin}</span>}
                {data.github && <span className={`text-xs ${styles.link} truncate`}>⌥ {data.github}</span>}
                {data.portfolio && <span className={`text-xs ${styles.link} truncate`}>🌐 {data.portfolio}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-5">

          {data.summary && (
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${styles.accent}`}>Perfil Profesional</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience?.length > 0 && (
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${styles.accent}`}>Experiencia</h3>
              <div className="flex flex-col gap-3">
                {data.experience.map((exp, i) => (
                  <div key={i} className={`border-l-2 pl-3 ${styles.border}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{exp.position}</p>
                        <p className={`text-xs ${styles.accent}`}>{exp.company}</p>
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
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${styles.accent}`}>Educación</h3>
              <div className="flex flex-col gap-3">
                {data.education.map((edu, i) => (
                  <div key={i} className={`border-l-2 pl-3 ${styles.border}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{edu.degree}</p>
                        <p className={`text-xs ${styles.accent}`}>{edu.school}</p>
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
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${styles.accent}`}>Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.split(",").map((skill, i) => (
                  <span key={i} className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles.tag}`}>{skill.trim()}</span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

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