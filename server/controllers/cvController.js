const generatePDF = require("../utils/generatePDF")

exports.generateCV = (req, res) => {
  const { cvData, template } = req.body
  generatePDF({ cvData, template }, res)
}