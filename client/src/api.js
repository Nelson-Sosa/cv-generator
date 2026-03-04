import axios from "axios";

const API_URL = "http://localhost:5000/api/cv";

export const generateCV = async (cvData, template, preview = true) => {
  const response = await axios.post(`${API_URL}/generate`, { cvData, template, preview });
  return response.data;
};

// ✅ Bug 4 solucionado — función separada con responseType correcto
export const downloadPDF = async (cvData, template) => {
  const response = await axios.post(
    `${API_URL}/generate`,
    { cvData, template, preview: false },
    { responseType: "arraybuffer" }
  );
  return response.data;
};