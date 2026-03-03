const express = require("express")
const cors = require("cors")
const cvRoutes = require("./routes/cvRoutes")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/cv", cvRoutes)

app.listen(5000, () => console.log("Server running on port 5000"))