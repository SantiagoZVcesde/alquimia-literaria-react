# Proyecto Integrador Frontend - Alquimia Literaria

---

## 📖 Descripción del Proyecto

Este repositorio contiene el frontend de "Alquimia Literaria", una plataforma digital para la compra, venta y lectura de libros en línea. Corresponde al primer hito de desarrollo, enfocado en establecer una arquitectura escalable y un flujo de trabajo colaborativo.

---

## 🛠️ Versiones de Software

- **Node.js:** v18.0.0 o superior
- **React:** v18.2.0
- **Vite:** v4.0.0 o superior
- **React Router DOM:** v6.x
- **Tailwind CSS:** v3.x
- **SweetAlert2:** v11.x
- **npm:** v9.0.0 o superior

---

## 🚀 Comandos de Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto localmente:

1. Clonar el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Acceder al directorio del proyecto:
   ```bash
   cd alquimia-literaria-front
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

4. Ejecutar el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir el navegador en la dirección que indique la terminal (generalmente http://localhost:5173)

---

## Integrantes del Equipo

| Nombre                  | Usuario GitHub     |
|-------------------------|--------------------|
| Santiago Zapata Villada | @[SantiagoZVcesde]   |
| Santiago Sanchez Rojas  | @[piolin666satan]  |
| [Nombre 3]              | @[usuario]         |
| [Nombre 4]              | @[usuario]         |

---

## 📁 Estructura del Proyecto

A continuación se detalla la organización de los directorios y archivos principales del frontend:

```text
src/
├── assets/           # Recursos estáticos (imágenes, logos de portadas)
├── components/       # Componentes UI reutilizables e interactivos
│   ├── HeaderBarraNavegacion.jsx  # Barra superior con lógica de sesión
│   └── Footer.jsx                 # Pie de página ejecutivo
├── helpers/          # Funciones de utilidad y notificaciones
│   └── alerts.js     # Centralización de alertas visuales (SweetAlert2)
├── pages/            # Vistas de alto nivel y formularios
│   ├── AdminDashboard.jsx  # Panel administrativo de la librería
│   ├── Cart.jsx            # Panel lateral del carrito de compras
│   ├── ForgotPassword.jsx  # Módulo de restablecimiento por PUT
│   ├── Home.jsx            # Página de bienvenida principal
│   ├── Library.jsx         # Catálogo dinámico conectado al backend
│   ├── Login.jsx           # Validación de accesos y credenciales
│   └── Register.jsx        # Captura y mapeo de nuevos usuarios
├── services/         # Gestión de URLs y configuración de la API
│   └── api.js        # Objeto centralizado de endpoints del sistema
├── App.jsx           # Orquestador y layout principal de la SPA
└── main.jsx          # Punto de entrada de React en el DOM