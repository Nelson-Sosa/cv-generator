import React from "react";

const mockData = {
  name: "María González",
  email: "maria.gonzalez@gmail.com",
  linkedin: "linkedin.com/in/maria-gonzalez",
  github: "github.com/mariagonzalez",
  portfolio: "mariagonzalez.dev",
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
    link: "text-violet-300"
  },
  plantilla2: {
    header: "bg-gray-900",
    headerText: "text-white",
    headerSubtext: "text-gray-400",
    accent: "text-gray-700",
    border: "border-gray-300",
    tag: "bg-gray-100 text-gray-700",
    link: "text-gray-400"
  },
  plantilla3: {
    header: "bg-green-800",
    headerText: "text-white",
    headerSubtext: "text-green-200",
    accent: "text-green-700",
    border: "border-green-300",
    tag: "bg-green-100 text-green-700",
    link: "text-green-200"
  }
};

export default function PreviewCV({ cvData, template = "plantilla1" }) {
  const data = cvData || mockData;
  const isDemo = !cvData;
  const styles = templateStyles[template] || templateStyles.plantilla1;

  return (
    <div className="relative">

      {isDemo && (
        <div className="mb-4 px-3 py-2 bg-violet-900/40 border border-violet-700/50 rounded-xl text-xs text-violet-300 text-center">
          👆 Así se verá tu CV — completá el formulario y hacé clic en <strong>Generar Preview</strong>
        </div>
      )}

      <div className={`bg-white text-gray-900 rounded-xl overflow-hidden shadow-xl ${isDemo ? "opacity-60" : ""}`}>

        {/* Header */}
        <div className={`${styles.header} px-6 py-5`}>
          <h2 className={`text-xl font-bold ${styles.headerText}`}>{data.name}</h2>
          <p className={`text-sm mt-1 ${styles.headerSubtext}`}>{data.email}</p>

          {/* Redes sociales en header */}
          <div className="flex flex-wrap gap-3 mt-2">
            {data.linkedin && (
              <span className={`text-xs flex items-center gap-1 ${styles.link}`}>
                <span className="font-bold">in</span> {data.linkedin}
              </span>
            )}
            {data.github && (
              <span className={`text-xs flex items-center gap-1 ${styles.link}`}>
                <span>⌥</span> {data.github}
              </span>
            )}
            {data.portfolio && (
              <span className={`text-xs flex items-center gap-1 ${styles.link}`}>
                <span>🌐</span> {data.portfolio}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col gap-5">

          {/* Resumen */}
          {data.summary && (
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${styles.accent}`}>
                Perfil Profesional
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Experiencia */}
          {data.experience?.length > 0 && (
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${styles.accent}`}>
                Experiencia
              </h3>
              <div className="flex flex-col gap-3">
                {data.experience.map((exp, i) => (
                  <div key={i} className={`border-l-2 pl-3 ${styles.border}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{exp.position}</p>
                        <p className={`text-xs ${styles.accent}`}>{exp.company}</p>
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
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${styles.accent}`}>
                Educación
              </h3>
              <div className="flex flex-col gap-3">
                {data.education.map((edu, i) => (
                  <div key={i} className={`border-l-2 pl-3 ${styles.border}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{edu.degree}</p>
                        <p className={`text-xs ${styles.accent}`}>{edu.school}</p>
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
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${styles.accent}`}>
                Habilidades
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.split(",").map((skill, i) => (
                  <span key={i} className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles.tag}`}>
                    {skill.trim()}
                  </span>
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