# API de Bancos

API REST para gestionar bancos y personas con documentación Swagger.

## Versiones

- **V1**: Respuestas simples
- **V2**: Respuestas estructuradas con metadatos

## Instalación Local

```bash
npm install
npm run dev
```

La API estará disponible en `http://localhost:3000`
Documentación: `http://localhost:3000/api-docs`

## Despliegue en Render

### Pasos:

1. **Push a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Crear en Render**:
   - Ve a [render.com](https://render.com)
   - Conecta tu repositorio GitHub
   - Crea nuevo **Web Service**
   - Selecciona esta rama
   - Render detectará automáticamente la configuración

3. **Variables de entorno** (en Dashboard de Render):
   ```
   NODE_ENV = production
   ```

### URLs después del despliegue:

- API Root: `https://tuapi.onrender.com`
- V1: `https://tuapi.onrender.com/api/v1`
- V2: `https://tuapi.onrender.com/api/v2`
- Docs: `https://tuapi.onrender.com/api-docs`

## Estructura

```
├── server.js          # Servidor principal
├── swagger.js         # Configuración de Swagger
├── routesV1.js        # Rutas versión 1
├── routesV2.js        # Rutas versión 2
├── utils.js           # Utilidades
├── bancos.json        # Base de datos (JSON)
├── package.json       # Dependencias
├── .gitignore         # Archivos ignorados
├── .env.example       # Variables de ejemplo
└── render.yaml        # Configuración de Render
```

## Endpoints

### V1 - Bancos
- `GET /api/v1/banco` - Obtener todos
- `GET /api/v1/banco/:id` - Obtener por ID

### V2 - Bancos
- `GET /api/v2/banco` - Obtener todos (con metadatos)
- `GET /api/v2/banco/:id` - Obtener por ID

## Troubleshooting

**Error: Puerto ya en uso**
```bash
# En Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Error: Módulos no encontrados**
```bash
npm install
npm run dev
```

**Error en Render después del deploy**
- Verifica que `render.yaml` esté en la raíz
- Revisa los Build Logs en el Dashboard de Render
- Asegúrate de que Node 18+ esté especificado
