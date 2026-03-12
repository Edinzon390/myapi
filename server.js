import express from "express"
import routesV1 from "./routesV1.js"
import routesV2 from "./routesV2.js"
import { setupSwagger } from "./swagger.js"

const app = express()
app.use(express.json())

// Usar rutas versionadas PRIMERO
app.use("/api/v1", routesV1)
app.use("/api/v2", routesV2)

// Configurar Swagger DESPUÉS
setupSwagger(app)

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
        documentacion: `${baseUrl}/api-docs`
    })
})

// Endpoint de health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" })
})

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ 
        error: "No encontrado",
        path: req.path,
        method: req.method,
        disponibles: {
            v1: "/api/v1/banco",
            v2: "/api/v2/banco",
            docs: "/api-docs",
            health: "/health"
        }
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Servidor corriendo en puerto ${PORT}`)
    console.log(`✓ Documentación: http://localhost:${PORT}/api-docs`)
    console.log(`✓ API V1: http://localhost:${PORT}/api/v1`)
    console.log(`✓ API V2: http://localhost:${PORT}/api/v2`)
    console.log(`✓ Health: http://localhost:${PORT}/health`)
})