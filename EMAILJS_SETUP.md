# Configuración de EmailJS para el Formulario de Contacto

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita (permite hasta 200 emails/mes)

### 2. Crear un Email Service
1. En el dashboard, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona **Gmail** (o el proveedor que uses)
4. Conecta tu cuenta de Gmail (beydafentanes.studio@gmail.com)
5. Guarda el **Service ID** (lo necesitarás después)

### 3. Crear un Email Template
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Usa este template:

```
De: {{from_name}} ({{from_email}})
Servicio: {{service}}
Mensaje:
{{message}}
```

4. Configura:
   - **To Email**: beydafentanes.studio@gmail.com
   - **From Name**: {{from_name}}
   - **Reply To**: {{from_email}}
   - **Subject**: Nuevo mensaje de contacto - {{service}}

5. Guarda el template y copia el **Template ID**

### 4. Obtener tu Public Key
1. Ve a **Account** → **General**
2. Copia tu **Public Key**

### 5. Configurar las credenciales (SEGURO - NO SE SUBE A GIT)
1. Abre el archivo `js/config.js` (este archivo está en .gitignore y NO se subirá a git)
2. Reemplaza los valores con tus credenciales reales:

```javascript
window.emailjsConfig = {
  publicKey: "tu_public_key_aqui",
  serviceId: "service_abc123",
  templateId: "template_xyz789"
};
```

**Importante**:
- El archivo `js/config.js` está en `.gitignore` por seguridad
- Solo el archivo `js/config.example.js` se sube a git (como plantilla)
- Tus credenciales reales NUNCA se subirán al repositorio

### 6. Probar el formulario
1. Recarga tu página
2. Llena el formulario de contacto
3. Envía un mensaje de prueba
4. Verifica que recibas el correo en beydafentanes.studio@gmail.com

## Notas importantes:
- El plan gratuito permite 200 emails/mes
- Los emails se envían directamente desde tu cuenta de Gmail
- No necesitas backend ni servidor
- Todo funciona desde el frontend
- **Seguridad**: Las credenciales están en `js/config.js` que está en `.gitignore`
- Si clonas el repo, copia `js/config.example.js` como `js/config.js` y completa tus credenciales

## Alternativas si EmailJS no te funciona:
1. **Formspree**: https://formspree.io/ (similar a EmailJS)
2. **Netlify Forms**: Si despliegas en Netlify
3. **Backend propio**: Node.js + Nodemailer (más complejo)
