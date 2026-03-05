import React from "react";

export default function ExperienceInput({ experience, setExperience }) {
  const handleChange = (index, field, value) => {
    const newExp = [...experience];
    newExp[index][field] = value;
    setExperience(newExp);
  };

  const addExperience = () =>
    setExperience([...experience, { company: "", position: "", startDate: "", endDate: "", description: "" }]);

  const removeExperience = (index) =>
    setExperience(experience.filter((_, i) => i !== index));

  const inputClass = "w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide";

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-gray-300">Experiencia</h3>

      {experience.map((exp, index) => (
        <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-3">

          <div className="flex justify-between items-center">
            <span className="text-xs text-violet-400 font-medium">Experiencia #{index + 1}</span>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-xs text-red-400 hover:text-red-300 transition"
            >
              ✕ Eliminar
            </button>
          </div>

          <div>
            <label className={labelClass}>Empresa</label>
            <input
              className={inputClass}
              placeholder="Ej: Tecnología SA"
              value={exp.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Puesto</label>
            <input
              className={inputClass}
              placeholder="Ej: Frontend Developer"
              value={exp.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Inicio</label>
              <input
                className={inputClass}
                placeholder="2022"
                value={exp.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Fin</label>
              <input
                className={inputClass}
                placeholder="2025 o Presente"
                value={exp.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={2}
              placeholder="Describí tus responsabilidades y logros..."
              value={exp.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />
          </div>

        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="w-full border border-dashed border-gray-700 hover:border-violet-500 text-gray-500 hover:text-violet-400 transition rounded-xl py-2.5 text-sm"
      >
        + Agregar experiencia
      </button>
    </div>
  );
}