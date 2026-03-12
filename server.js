import express from "express"
import { setupSwagger } from "./swagger.js"
import routesV1 from "./routesV1.js"
import routesV2 from "./routesV2.js"

const app = express()
app.use(express.json())

// Configurar Swagger
setupSwagger(app)

// Usar rutas versionadas
app.use("/api/v1", routesV1)
app.use("/api/v2", routesV2)

// Endpoint raíz
app.get("/", (req, res) => {
    res.json({
        mensaje: "Bienvenido a la API de Bancos",
        versiones: {
            v1: "http://localhost:3000/api/v1",
            v2: "http://localhost:3000/api/v2"
        },
        documentacion: "http://localhost:3000/api-docs"
    })
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    console.log(`Documentación: http://localhost:${PORT}/api-docs`)
    console.log(`API V1: http://localhost:${PORT}/api/v1`)
    console.log(`API V2: http://localhost:${PORT}/api/v2`)
})