import React from "react";

export default function EducationInput({ education, setEducation }) {
  const handleChange = (index, field, value) => {
    const newEdu = [...education];
    newEdu[index][field] = value;
    setEducation(newEdu);
  };

  const addEducation = () =>
    setEducation([...education, { school: "", degree: "", startDate: "", endDate: "", description: "" }]);

  const removeEducation = (index) =>
    setEducation(education.filter((_, i) => i !== index));

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-gray-300">Educación</h3>

      {education.map((edu, index) => (
        <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-3">

          <div className="flex justify-between items-center">
            <span className="text-xs text-violet-400 font-medium">Educación #{index + 1}</span>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="text-xs text-red-400 hover:text-red-300 transition"
            >
              ✕ Eliminar
            </button>
          </div>

          <div>
            <label className={labelClass}>Institución</label>
            <input
              className={inputClass}
              placeholder="Ej: Universidad Nacional"
              value={edu.school}
              onChange={(e) => handleChange(index, "school", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Título</label>
            <input
              className={inputClass}
              placeholder="Ej: Lic. en Sistemas"
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Inicio</label>
              <input
                className={inputClass}
                placeholder="2020"
                value={edu.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Fin</label>
              <input
                className={inputClass}
                placeholder="2024"
                value={edu.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={2}
              placeholder="Materias destacadas, logros, promedio..."
              value={edu.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="w-full border border-dashed border-gray-700 hover:border-violet-500 text-gray-500 hover:text-violet-400 transition rounded-xl py-2.5 text-sm"
      >
        + Agregar educación
      </button>
    </div>
  );
}