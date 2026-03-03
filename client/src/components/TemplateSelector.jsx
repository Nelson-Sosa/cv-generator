export default function TemplateSelector({ selectedTemplate, setSelectedTemplate }) {
  return (
    <div className="mt-4 flex space-x-2">
      <button
        className={`px-4 py-2 rounded ${selectedTemplate === "moderno" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setSelectedTemplate("moderno")}
      >
        Moderno
      </button>
      <button
        className={`px-4 py-2 rounded ${selectedTemplate === "clasico" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setSelectedTemplate("clasico")}
      >
        Clásico
      </button>
    </div>
  )
}