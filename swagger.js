import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

export function getSwaggerOptions() {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host = process.env.RENDER_EXTERNAL_URL || `localhost:${process.env.PORT || 3000}`
    const baseUrl = `${protocol}://${host}`
    
    return {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API de Bancos",
                version: "2.0.0",
                description: "API REST para gestionar bancos y personas - Versiones V1 y V2"
            },
            servers: [
                {
                    url: `${baseUrl}/api/v1`,
                    description: "Servidor V1"
                },
                {
                    url: `${baseUrl}/api/v2`,
                    description: "Servidor V2"
                }
            ]
        },
        apis: ["./server.js", "./routesV1.js", "./routesV2.js"]
    }
}

const swaggerOptions = getSwaggerOptions()
const swaggerSpec = swaggerJsdoc(swaggerOptions)


export function setupSwagger(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
