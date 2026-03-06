import React, { useState } from "react";
import CVForm from "./components/CVForm";
import PreviewCV from "./components/PreviewCV";
import { downloadPDF } from "./api";

export default function App() {
  const [cvData, setCvData] = useState(null);
  const [template, setTemplate] = useState("plantilla1");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [language, setLanguage] = useState("es");
  

  const handleDownloadPDF = async () => {
    try {
      const data = await downloadPDF(cvData, template);
      const blob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CV.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Error al descargar PDF");
    }
  };

  const faqs = [
  {
    question: "¿Mis datos están seguros?",
    answer: "Sí, tu información está protegida y nunca se comparte con terceros."
  },
  {
    question: "¿Necesito crear una cuenta?",
    answer: "No, puedes generar tu CV sin registro alguno, completamente gratis."
  },
  {
    question: "¿Puedo modificar el CV después?",
    answer: "Sí, todos los campos son editables y puedes guardar tu progreso automáticamente."
  },
  {
    question: "¿Puedo usar la IA para generar mi resumen profesional?",
    answer: "Sí, al generar el preview, nuestra IA sugerirá un resumen profesional optimizado."
  }
];

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            CV
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">CVGenius</span>
        </div>
        <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
          ✦ Potenciado con IA
        </span>
      </header>

      {/* Hero */}
      <section className="text-center py-14 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Tu CV profesional{" "}
          <span className="text-violet-400">en minutos</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Completá el formulario, la IA mejora tu contenido y descargás el PDF listo para enviar.
        </p>
        <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
          <span>✓ Preview gratis</span>
          <span>✓ Sin registro</span>
          <span>✓ PDF por $3</span>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Form card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <CVForm
            cvData={cvData}
            setCvData={setCvData}
            template={template}
            setTemplate={setTemplate}
             language={language}        // ← agregar
             setLanguage={setLanguage}  // ← agregar
          />
        </div>

        {/* Preview card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">Vista previa</h2>
          <PreviewCV cvData={cvData} template={template} language={language} />
          {cvData && (
            <button
              onClick={handleDownloadPDF}
              className="mt-6 w-full bg-violet-600 hover:bg-violet-700 transition text-white font-semibold py-3 rounded-xl text-sm"
            >
              Descargar PDF — $3.00
            </button>
          )}
        </div>

      </main>
      

      {/* Footer */}
      <footer className="text-center text-gray-700 text-xs pb-8">
        © 2025 CVGenius · Potenciado con IA
      </footer>
    </div>
  );
}