# Trabajo Práctico Integrador: TypeScript & Autenticación
### Asignatura: Programación III — Tecnicatura Universitaria en Programación
### Aplicación: **Food Store**

---

## 📌 Descripción del Proyecto
Evolución de la aplicación dinámica **Food Store** hacia un sistema con **Autenticación, Gestión de Sesión y Control de Acceso por Roles (Guard)**, utilizando **TypeScript estricto** y persistencia local mediante `localStorage`.

---

## 🚀 Cómo Ejecutar el Proyecto

> [!IMPORTANT]
> **¿Por qué no se puede abrir haciendo doble clic en los archivos HTML (`file:///`)?**  
> El proyecto utiliza **módulos nativos de JavaScript/TypeScript** (`<script type="module">`). Por políticas de seguridad de los navegadores modernos (CORS), los scripts modulares y el acceso a `localStorage` son bloqueados cuando se abren directamente desde el explorador de archivos con el protocolo `file://`.  
> Por este motivo, **siempre debe ejecutarse a través de un servidor HTTP local** (como Vite o Live Server).

---

### Método 1: Servidor de Desarrollo con Vite (Recomendado)

#### Requisitos previos:
- Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

#### Pasos:
1. Abrir una terminal en la carpeta del proyecto (`proteger_rutas`):
   ```bash
   cd proteger_rutas
   ```
2. Instalar las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
3. Iniciar el servidor local:
   ```bash
   npm run dev
   ```
4. La terminal indicará la dirección local generada (normalmente `http://localhost:5173/`). Abrir ese enlace en el navegador.

---

### Método 2: Extensión Live Server de VS Code

Si prefieres no usar la terminal de Node.js:
1. Abrir Visual Studio Code directamente en la carpeta **`proteger_rutas`** (`Archivo > Abrir carpeta...`).
2. Abrir el archivo `index.html`.
3. Hacer clic derecho sobre el editor y seleccionar **"Open with Live Server"** (o presionar el botón *Go Live* en la barra inferior de VS Code).

---

### Método 3: Compilación para Producción (Build & Preview)

Para verificar la compilación estricta de TypeScript y previsualizar los archivos empaquetados:
```bash
npm run build
npm run preview
```

---

## 🔑 Credenciales de Prueba

Para facilitar la evaluación y testeo de ambos roles:

| Rol | Email | Contraseña | Destino Autorizado |
| :--- | :--- | :--- | :--- |
| **Administrador** (Pre-cargado) | `admin@foodstore.com` | `admin` | `/src/pages/admin/home/home.html` |
| **Cliente** (Registro libre) | Cualquiera creado en el registro | Mínimo 6 caracteres | `/src/pages/client/home/home.html` |

---

## 🛠️ Flujo de la Aplicación y Funcionalidades

### 1. Registro de Usuarios (`/src/pages/auth/registro/`)
- Formulario con campos de **Email**, **Contraseña** y **Confirmar contraseña** (el selector manual de rol fue removido).
- **Validación de duplicados (Criterio de Excelencia):** No permite registrar emails ya existentes en el sistema.
- Almacena los usuarios como un Array de Objetos en `localStorage` bajo la clave `"users"`.
- Al registrarse con éxito, inicia la sesión automáticamente y deriva al usuario a su catálogo de productos.

### 2. Login y Sesión (`/src/pages/auth/login/`)
- Autenticación real contrastada contra la clave `"users"` de `localStorage`.
- Si las credenciales coinciden, guarda el usuario en `localStorage` bajo la clave `"userData"`.
- Redirección automática según el rol asignado (`admin` $\rightarrow$ panel de administración, `client` $\rightarrow$ menú de la tienda).

### 3. Protección de Rutas ("Guard")
- **Control Centralizado (`src/main.ts`):** Evalúa la ruta actual y bloquea el acceso si no hay sesión iniciada, redirigiendo a la pantalla de login.
- **Autorización por Rol (`src/utils/auth.ts`):**
  - Si un usuario con rol `client` intenta ingresar por URL a `/admin/`, es redirigido a `/client/home/home.html`.
  - Si un usuario con rol `admin` intenta ingresar a `/client/`, es redirigido a `/admin/home/home.html`.
- **Persistencia ante recarga (Criterio de Excelencia):** La sesión y la protección no se eluden al recargar la página (F5) ni al ingresar URLs directas en la barra del navegador.

---

## 📁 Estructura del Código

```text
proteger_rutas/
├── index.html                       # Página inicial de bienvenida
├── package.json                     # Scripts y dependencias del proyecto
├── tsconfig.json                    # Configuración estricta de TypeScript
├── vite.config.ts                   # Configuración multi-página de Vite
├── src/
│   ├── main.ts                      # Guard centralizado de protección de rutas
│   ├── style.css                    # Estilos globales (Dark Neon Glassmorphism)
│   ├── types/
│   │   ├── IUser.ts                 # Interfaz estricta del modelo de Usuario
│   │   └── Rol.ts                   # Tipo unión estricto: "client" | "admin"
│   ├── utils/
│   │   ├── auth.ts                  # Utilidades de autenticación (checkAuthUser, logout)
│   │   ├── localStorage.ts          # Gestión tipada de lectura/escritura en localStorage
│   │   └── navigate.ts              # Manejo centralizado de redirecciones
│   └── pages/
│       ├── admin/home/              # Panel de administración (solo admin)
│       ├── auth/
│       │   ├── login/               # Vista y lógica de Iniciar Sesión
│       │   └── registro/            # Vista y lógica de Crear Cuenta
│       └── client/home/             # Catálogo y menú de compras (solo client)
```

---

## 📦 Instrucciones para la Entrega (.zip)

Para comprimir y entregar el trabajo práctico:
1. Excluir las carpetas `node_modules/` y `dist/`.
2. Comprimir la carpeta del proyecto en formato `.zip` conservando la jerarquía de carpetas intacta.
