import { useState } from "react"
import FormCV from "./components/FormCV"
import PreviewCV from "./components/PreviewCV"
import TemplateSelector from "./components/TemplateSelector"

function App() {
  const [cvData, setCvData] = useState({})
  const [selectedTemplate, setSelectedTemplate] = useState("moderno")

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Generador de CV</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <FormCV cvData={cvData} setCvData={setCvData} />
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </div>

        <div>
          <PreviewCV cvData={cvData} template={selectedTemplate} />
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={async () => {
              const res = await fetch("http://localhost:5000/api/cv/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cvData, template: selectedTemplate }),
              })
              const blob = await res.blob()
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "CV.pdf"
              document.body.appendChild(a)
              a.click()
              a.remove()
            }}
          >
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default App