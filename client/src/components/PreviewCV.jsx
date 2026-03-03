export default function PreviewCV({ cvData, template }) {
  return (
    <div className={`p-4 border rounded ${template === "moderno" ? "bg-white text-gray-800" : "bg-gray-100 text-black"}`}>
      <h2 className="text-xl font-bold">{cvData.name || "Nombre Apellido"}</h2>
      <p><strong>Email:</strong> {cvData.email || "correo@ejemplo.com"}</p>
      <p><strong>Resumen:</strong> {cvData.summary || "Tu resumen profesional aquí"}</p>
      <p><strong>Experiencia:</strong> {cvData.experience || "Tus experiencias laborales"}</p>
      <p><strong>Educación:</strong> {cvData.education || "Tu educación"}</p>
      <p><strong>Habilidades:</strong> {cvData.skills || "Habilidades clave"}</p>
    </div>
  )
}