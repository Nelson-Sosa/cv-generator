import { useState } from "react";
import axios from "axios";

export default function FormCV({ cvData, setCvData }) {
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setCvData({ ...cvData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // Llamar a tu backend que mejora y genera PDF
      const response = await axios.post("http://localhost:5000/api/cv/generate", {
        cvData,
        template: "default" // o el template que quieras
      }, { responseType: "blob" }); // para recibir PDF como archivo

      // Descargar PDF automáticamente
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CV_Mejorado.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
  console.error("Error en generatePDF:", err);
  alert("Error generando PDF: " + err.message);
}
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <input type="text" name="name" placeholder="Nombre completo" className="w-full p-2 border rounded" onChange={handleChange} />
      <input type="email" name="email" placeholder="Correo electrónico" className="w-full p-2 border rounded" onChange={handleChange} />
      <textarea name="summary" placeholder="Resumen profesional" className="w-full p-2 border rounded" onChange={handleChange} />
      <textarea name="experience" placeholder="Experiencia laboral" className="w-full p-2 border rounded" onChange={handleChange} />
      <textarea name="education" placeholder="Educación" className="w-full p-2 border rounded" onChange={handleChange} />
      <textarea name="skills" placeholder="Habilidades" className="w-full p-2 border rounded" onChange={handleChange} />
      
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "Generando PDF..." : "Generar PDF"}
      </button>
    </form>
  );
}