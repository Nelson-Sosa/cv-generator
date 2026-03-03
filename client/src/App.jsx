import { useState } from "react";
import FormCV from "./components/FormCV";
import PreviewCV from "./components/PreviewCV";
import TemplateSelector from "./components/TemplateSelector";
import axios from "axios";

export default function App() {
  const [cvData, setCvData] = useState({
    name: "",
    email: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });
  const [selectedTemplate, setSelectedTemplate] = useState("moderno");
  const [loading, setLoading] = useState(false);

  // Función para enviar al backend y generar PDF
  const handleGeneratePDF = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/cv/generate", {
        cvData,
        template: selectedTemplate,
      }, { responseType: "blob" }); // importante para descargar PDF
     
      // Crear enlace para descargar
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CV.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error al generar PDF:", err);
      alert("Hubo un error al generar el PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generador de CV</h1>
      
      <FormCV cvData={cvData} setCvData={setCvData} />
      <TemplateSelector selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
      <PreviewCV cvData={cvData} template={selectedTemplate} />

      <button
        onClick={handleGeneratePDF}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        {loading ? "Generando PDF..." : "Generar PDF"}
      </button>
    </div>
  );
}