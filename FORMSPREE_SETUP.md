# Configuración de Formspree para el Formulario de Contacto

## ¿Por qué Formspree?

Formspree es una excelente alternativa porque:
- ✅ **NO expone credenciales en tu código**: Las credenciales están solo en el dashboard de Formspree
- ✅ **Funciona perfectamente en GitHub Pages**: No necesitas backend
- ✅ **Gratis hasta 50 envíos/mes**: Suficiente para la mayoría de portfolios
- ✅ **Protección anti-spam**: Incluye reCAPTCHA y filtros automáticos
- ✅ **Fácil de configurar**: Solo necesitas un endpoint URL

## Pasos para Configurar Formspree

### 1. Crear cuenta en Formspree
1. Ve a https://formspree.io/
2. Crea una cuenta gratuita (permite hasta 50 envíos/mes)
3. Verifica tu email

### 2. Crear un nuevo formulario
1. En el dashboard, haz clic en **"New Form"** o **"Create Form"**
2. Completa la información:
   - **Form Name**: "Contacto Portfolio" (o el nombre que prefieras)
   - **Email**: beydafentanes.studio@gmail.com (tu email donde recibirás los mensajes)
3. Haz clic en **"Create Form"**

### 3. Obtener tu Endpoint URL
1. Una vez creado el formulario, verás tu **Form Endpoint URL**
2. Se verá algo así: `https://formspree.io/f/YOUR_FORM_ID`
3. **Copia esta URL** - la necesitarás en el siguiente paso

### 4. Configurar el formulario en tu código

#### Opción A: Usar el endpoint directamente en el HTML (Recomendado)

Abre `index.html` y encuentra el formulario (línea ~308). Agrega `action` y `method` al tag `<form>`:

```html
<form id="contact-form"
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST"
      class="space-y-6">
```

**Reemplaza `YOUR_FORM_ID` con tu ID real de Formspree**

#### Opción B: Usar JavaScript (Ya implementado)

El código JavaScript ya está configurado para usar Formspree. Solo necesitas:

1. Abre `js/app.js`
2. Busca la línea que dice `const formspreeEndpoint = ...`
3. Reemplaza con tu endpoint de Formspree

### 5. Verificar los nombres de los campos

Formspree envía automáticamente **todos los campos** que tengan el atributo `name`. Tu formulario ya está configurado correctamente:

- ✅ `name="name"` → Nombre del usuario
- ✅ `name="email"` → Email del usuario (requerido por Formspree - debe llamarse "email")
- ✅ `name="service"` → Servicio seleccionado
- ✅ `name="message"` → Mensaje del usuario

**IMPORTANTE**: El código JavaScript está configurado para enviar todos estos campos. Formspree los recibirá y los incluirá automáticamente en el email que recibas.

### 6. Asegurar que todos los campos lleguen en el email

**Formspree automáticamente incluye TODOS los campos** que se envíen en el formulario. Tu código JavaScript ya está configurado para enviar:

- ✅ **name** → Nombre del usuario
- ✅ **email** → Email del usuario (requerido por Formspree)
- ✅ **service** → Servicio seleccionado (con el texto completo, ej: "Desarrollo Web")
- ✅ **message** → Mensaje del usuario

#### ¿Cómo se verá el email que recibes?

Por defecto, Formspree envía un email con este formato:

```
Subject: New submission from Contact Form

From: nombre@email.com
Name: Juan Pérez
Email: juan@email.com
Service: Desarrollo Web
Message: Hola, quiero un sitio web...
```

**Todos los campos siempre se incluyen automáticamente** - no necesitas configurar nada adicional.

#### Personalizar el asunto del email (Opcional)

Si quieres cambiar el asunto del email:

1. En el dashboard de Formspree, ve a tu formulario
2. Haz clic en **"Settings"** → **"Email"** o **"Notifications"**
3. Busca **"Email Subject"** o **"Subject Line"**
4. Puedes usar variables como:
   - `{{name}}` - Nombre del usuario
   - `{{email}}` - Email del usuario
   - `{{service}}` - Servicio seleccionado

Ejemplo de asunto personalizado:
```
Nuevo contacto - {{service}} - {{name}}
```

**Nota**: En el plan gratuito, esta opción puede no estar disponible, pero **todos los campos siempre se incluyen en el cuerpo del email**.

#### Verificar que todos los campos lleguen

1. Configura tu endpoint en `index.html` (reemplaza `YOUR_FORM_ID`)
2. Envía un formulario de prueba desde tu sitio
3. Revisa el email que recibes en `beydafentanes.studio@gmail.com`
4. Deberías ver **todos los campos** listados claramente

Si algún campo no aparece:
- Verifica que el campo tenga el atributo `name` en el HTML
- Revisa la consola del navegador para errores
- Verifica que el JavaScript esté enviando el campo (línea ~243-246 en `app.js`)

### 7. Probar el formulario
1. Recarga tu página local
2. Llena el formulario de contacto
3. Envía un mensaje de prueba
4. Verifica que recibas el correo en beydafentanes.studio@gmail.com

## Configuración de Seguridad

### Protección Anti-Spam
Formspree incluye protección automática, pero puedes habilitar:
1. **reCAPTCHA**: En Settings → Security
2. **Honeypot**: Se agrega automáticamente
3. **Rate Limiting**: Configurado automáticamente

### Whitelist de Dominios (Opcional)
Si quieres restringir desde qué dominios se pueden enviar formularios:
1. Ve a Settings → Security
2. Agrega tu dominio (ej: `tudominio.com`)

## Límites del Plan Gratuito

- ✅ 50 envíos por mes
- ✅ Protección anti-spam
- ✅ Notificaciones por email
- ✅ Dashboard básico

Si necesitas más, puedes actualizar a un plan de pago.

## Ventajas sobre EmailJS

| Característica | Formspree | EmailJS |
|---------------|-----------|---------|
| Credenciales en código | ❌ No | ✅ Sí (públicas) |
| Fácil configuración | ✅ Muy fácil | ⚠️ Requiere más pasos |
| Protección anti-spam | ✅ Incluida | ⚠️ Manual |
| Dashboard | ✅ Incluido | ✅ Incluido |
| Límite gratis | 50/mes | 200/mes |

## Solución de Problemas

### El formulario no envía
1. Verifica que el endpoint URL sea correcto
2. Asegúrate de que el campo `email` tenga `name="email"`
3. Revisa la consola del navegador para errores

### No recibes los emails
1. Verifica que tu email esté correcto en el dashboard de Formspree
2. Revisa la carpeta de spam
3. Verifica que el formulario esté activo en el dashboard

### Error 404 o 403
- Verifica que el endpoint URL sea correcto
- Asegúrate de que el formulario esté activo en Formspree

## Migración desde EmailJS

Si ya tenías EmailJS configurado:
1. El código ya está actualizado para usar Formspree
2. Solo necesitas:
   - Crear tu cuenta en Formspree
   - Obtener tu endpoint URL
   - Actualizar el endpoint en `js/app.js`
3. Puedes eliminar:
   - `js/config.js`
   - `js/config.example.js`
   - Referencias a EmailJS en el HTML
