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
    const protocol = req.protocol
    const host = req.get('host')
    const baseUrl = `${protocol}://${host}`
    
    res.json({
        mensaje: "Bienvenido a la API de Bancos",
        versiones: {
            v1: `${baseUrl}/api/v1`,
            v2: `${baseUrl}/api/v2`
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
    console.log(`Documentación: /api-docs`)
    console.log(`API V1: /api/v1`)
    console.log(`API V2: /api/v2`)
})