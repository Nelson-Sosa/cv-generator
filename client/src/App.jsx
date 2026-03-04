import React, { useState } from "react";
import CVForm from "./components/CVForm";
import PreviewCV from "./components/PreviewCV";
import { generateCV, downloadPDF } from "./api";

export default function App() {
  const [cvData, setCvData] = useState(null);

  const handleDownloadPDF = async () => {
    try {
      const data = await downloadPDF(cvData, "plantilla1");
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

  return (
    <div style={{ padding: 20 }}>
      <h1>Generador de CV con IA</h1>
      <CVForm cvData={cvData} setCvData={setCvData} />
      <PreviewCV cvData={cvData} />
      {cvData && (
        <button onClick={handleDownloadPDF} style={{ marginTop: 20 }}>
          Descargar PDF
        </button>
      )}
    </div>
  );
}