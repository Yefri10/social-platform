# Social Platform — V0.1 Foundation

**Estado:** fundación de desarrollo. No es una red social terminada ni está lista para publicar.

Este paquete contiene:
- `mobile/`: aplicación Expo / React Native / TypeScript para Android, iOS y web.
- `backend/`: API HTTP inicial con endpoint real de salud.
- `database/`: primer diseño SQL de entidades sociales; todavía no está conectado ni migrado.
- `.gitignore` y documentación de configuración.

## Requisitos
- Node.js 22.13 o superior (Node 24 funciona).
- npm.
- Git.
- Una cuenta de GitHub.

## 1. Subir al repositorio
Extrae el ZIP y sube **el contenido de la carpeta `social-platform-v0.1`** a la raíz del repositorio `social-platform`.
No subas el ZIP dentro del repositorio como único archivo.

## 2. Ejecutar la aplicación móvil
Desde la terminal, en la raíz del repositorio:

```bash
cd mobile
npm install
npx expo start --tunnel
```

Abre Expo Go en Android y escanea el QR, o abre el enlace que muestre Expo.

## 3. Ejecutar la API
Abre una segunda terminal:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

La API escucha por defecto en `http://localhost:4000`.
Comprueba `http://localhost:4000/health`.

## 4. Conectar la app con la API
Para que el teléfono pueda acceder a la API, `localhost` no es la dirección correcta desde el dispositivo.
En Codespaces, inicia el backend y abre el puerto 4000 en la pestaña **Ports**. Configúralo como **Private** y usa la URL HTTPS reenviada de Codespaces.

Crea `mobile/.env` a partir de `mobile/.env.example` y define:

```env
EXPO_PUBLIC_API_URL=https://TU-URL-REENVIADA-DEL-PUERTO-4000
```

Reinicia Expo después de cambiar variables de entorno.

No publiques secretos en variables `EXPO_PUBLIC_*`: se incorporan al cliente.

## 5. Verificaciones
En `mobile/`:

```bash
npx expo-doctor
```

En `backend/`:

```bash
npm run typecheck
npm run build
```

## Estado honesto de V0.1
- La interfaz inicial es funcional y permite solicitar el estado de la API.
- La API responde con un endpoint `/health`.
- No hay registro, login, feed persistente, carga multimedia, chat ni notificaciones todavía.
- El SQL es un diseño inicial, no una base de datos desplegada.
- No se ha generado AAB/IPA ni se ha probado en dispositivos físicos en este paquete.

## Próxima entrega
V0.2: PostgreSQL real, migraciones, registro/login, sesiones seguras y perfiles.
