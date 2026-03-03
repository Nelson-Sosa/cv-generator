import { useState } from "react"

export default function FormCV({ cvData, setCvData }) {
  const handleChange = e => {
    setCvData({ ...cvData, [e.target.name]: e.target.value })
  }

  return (
    <form className="bg-white p-4 rounded shadow space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />
      <textarea
        name="summary"
        placeholder="Resumen profesional"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />
      <textarea
        name="experience"
        placeholder="Experiencia laboral"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />
      <textarea
        name="education"
        placeholder="Educación"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />
      <textarea
        name="skills"
        placeholder="Habilidades"
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />
    </form>
  )
}