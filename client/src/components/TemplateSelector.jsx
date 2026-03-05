import React from "react";

const templates = [
  {
    id: "plantilla1",
    name: "Moderna Azul",
    description: "Sidebar colorido, moderna y llamativa",
    colors: ["#4f46e5", "#7c3aed", "#ffffff"]
  },
  {
    id: "plantilla2",
    name: "Minimalista",
    description: "Limpia y elegante, ideal para empresas",
    colors: ["#111827", "#6b7280", "#ffffff"]
  },
  {
    id: "plantilla3",
    name: "Ejecutiva Verde",
    description: "Profesional con acento verde",
    colors: ["#166534", "#16a34a", "#ffffff"]
  }
];

export default function TemplateSelector({ selected, setSelected }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        Plantilla
      </label>
      <div className="grid grid-cols-3 gap-3">
        {templates.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelected(t.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition text-left
              ${selected === t.id
                ? "border-violet-500 bg-violet-900/30"
                : "border-gray-700 bg-gray-800 hover:border-gray-600"
              }`}
          >
            {/* Mini preview */}
            <div className="w-full h-14 rounded-lg overflow-hidden flex">
              <div className="w-1/3 h-full" style={{ background: t.colors[0] }} />
              <div className="w-2/3 h-full flex flex-col justify-center gap-1 px-2" style={{ background: t.colors[2] }}>
                <div className="h-1.5 rounded-full w-3/4" style={{ background: t.colors[1], opacity: 0.5 }} />
                <div className="h-1 rounded-full w-full bg-gray-200 opacity-50" />
                <div className="h-1 rounded-full w-2/3 bg-gray-200 opacity-50" />
              </div>
            </div>
            <span className={`text-xs font-semibold w-full ${selected === t.id ? "text-violet-300" : "text-gray-400"}`}>
              {t.name}
            </span>
            {selected === t.id && (
              <span className="text-xs text-violet-400">✓ Seleccionada</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}