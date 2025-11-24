# 📋 Instrucciones de Instalación Paso a Paso

## 🎯 Guía Rápida de 3 Pasos

### 1. Descargar el Archivo

Necesitas el archivo: **`MatrixSupremaVisual.pbiviz`**

Este archivo está en el directorio del proyecto.

---

### 2. Importar en Power BI Desktop

#### Paso 2.1: Abrir el Panel de Visualizaciones
1. Abre tu archivo de Power BI Desktop (`.pbix`)
2. Mira el panel derecho donde están todas las visualizaciones

#### Paso 2.2: Importar Visual Personalizada
1. Busca el botón de **tres puntos (...)** en el panel de visualizaciones
2. Haz clic en él
3. Selecciona **"Importar un visual desde un archivo"**
4. Navega hasta donde guardaste `MatrixSupremaVisual.pbiviz`
5. Selecciónalo y haz clic en **"Abrir"**

#### Paso 2.3: Aceptar Aviso de Seguridad
- Power BI mostrará un mensaje de advertencia
- Es normal, todas las visuals personalizadas lo muestran
- Haz clic en **"Importar"** o **"Aceptar"**

---

### 3. Usar la Visual

#### Paso 3.1: Agregar al Reporte
1. En el panel de visualizaciones, busca el nuevo icono de **Matrix Suprema**
2. Haz clic en él para agregar la visual a tu página
3. Redimensiona según necesites

#### Paso 3.2: Configurar Campos
Arrastra los siguientes campos desde tu tabla **negativosBi**:

**En "Rows" (Filas):**
- Arrastra el campo: `Fila_Completa`

**En "Columns" (Columnas):**
- Arrastra el campo: `Fecha_Reporte`

**En "Values" (Valores):**
- Arrastra el campo: `Cantidad_Negativa` (se agregará automáticamente como suma)

#### Paso 3.3: Aplicar Filtros (Opcional)
**En "Filters" (Filtros):**
- Arrastra el campo: `Aplicar_Filtro_Activos`
- Configura el filtro = 1 (para mostrar solo activos)

---

## ✅ ¡Listo!

Ahora verás tu matriz ultra moderna con:
- ✨ Diseño estilo Apple
- 📊 Botón para exportar a Excel
- 📋 Botón para copiar al portapapeles
- 🎨 Colores y animaciones modernas
- 📱 Diseño responsive

---

## 🎮 Cómo Usar los Botones

### Exportar a Excel 📊
1. Haz clic en el botón **"📊 Exportar a Excel"**
2. Se descargará automáticamente un archivo `.xlsx`
3. Ábrelo en Excel
4. ¡Verás todos tus datos perfectamente formateados!

### Copiar 📋
1. Haz clic en el botón **"📋 Copiar"**
2. Verás una notificación verde: "✅ Datos copiados al portapapeles"
3. Abre Excel, Word, o cualquier aplicación
4. Presiona `Ctrl+V` (o `Cmd+V` en Mac)
5. ¡Los datos se pegarán en formato tabla!

---

## 🔧 Configuración Avanzada (Opcional)

### Cambiar Colores y Estilos

1. Con la visual seleccionada, ve al panel de **Formato** (🎨 icono de rodillo de pintura)
2. Expande las secciones:

#### General
- ☑️ Mostrar botón exportar
- ☑️ Mostrar botón copiar

#### Encabezado
- Cambia la fuente
- Ajusta el tamaño
- Modifica colores

#### Celdas
- Personaliza la apariencia de los datos

---

## 🐛 Solución Rápida de Problemas

### ❌ La visual aparece vacía
**Solución**: Verifica que hayas agregado los tres campos (Rows, Columns, Values)

### ❌ No veo datos
**Solución**: 
- Revisa tus filtros
- Asegúrate de que hay datos en tu tabla después de aplicar filtros
- Verifica que `Aplicar_Filtro_Activos` esté correctamente configurado

### ❌ El botón exportar no funciona
**Solución**:
- Verifica que tu navegador no esté bloqueando descargas
- En Chrome: Mira si hay un icono de descarga bloqueada en la barra de direcciones
- Prueba con otro navegador (Edge, Chrome, Firefox)

### ❌ El botón copiar no funciona
**Solución**:
- Asegúrate de estar usando un navegador moderno
- Da permisos al sitio para acceder al portapapeles
- En algunos navegadores, la primera vez pedirá permiso

---

## 📸 Referencia Visual Rápida

```
Panel de Visualizaciones en Power BI:
┌─────────────────────────────────┐
│  ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜  │ ← Visualizaciones estándar
│  ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜ ⬜  │
│  ─────────────────────────  │
│  🟦 ← Matrix Suprema (TU)   │ ← Tu nueva visual
│  ⋮                          │
└─────────────────────────────────┘

Configuración de Campos:
┌─────────────────────────────────┐
│ 📊 Rows                        │
│  └─ Fila_Completa              │
│                                 │
│ 📅 Columns                     │
│  └─ Fecha_Reporte              │
│                                 │
│ 🔢 Values                      │
│  └─ Sum of Cantidad_Negativa   │
│                                 │
│ 🔍 Filters                     │
│  └─ Aplicar_Filtro_Activos     │
└─────────────────────────────────┘
```

---

## 💡 Tips y Mejores Prácticas

### ✅ Para Mejor Rendimiento
- Si tienes muchos datos (>5,000 filas), agrega filtros
- Usa la segmentación de fechas para mostrar rangos específicos
- Considera usar "Top N" para limitar filas

### ✅ Para Mejor Apariencia
- Dale suficiente espacio a la visual (mínimo 600x400 px)
- Usa colores de tema consistentes con tu dashboard
- Deja los botones visibles en la parte superior

### ✅ Para Compartir
- Cuando publiques en Power BI Service, la visual funcionará igual
- Los usuarios pueden exportar y copiar sin problemas
- Las notificaciones se verán en todos los dispositivos

---

## 🎓 Video Tutorial (Conceptual)

Si estuvieras viendo un video, estos serían los pasos:

1. **0:00** - Abrir Power BI Desktop
2. **0:15** - Hacer clic en "..." en panel de visualizaciones
3. **0:20** - Seleccionar "Importar visual desde archivo"
4. **0:30** - Elegir MatrixSupremaVisual.pbiviz
5. **0:40** - Aceptar aviso de seguridad
6. **0:45** - Hacer clic en el nuevo icono
7. **1:00** - Arrastrar Fila_Completa a Rows
8. **1:10** - Arrastrar Fecha_Reporte a Columns
9. **1:20** - Arrastrar Cantidad_Negativa a Values
10. **1:30** - Ver la matriz renderizada
11. **1:40** - Hacer clic en "Exportar a Excel"
12. **1:50** - Ver archivo descargado
13. **2:00** - Hacer clic en "Copiar"
14. **2:10** - Pegar en Excel
15. **2:20** - ¡Disfrutar!

---

## 📞 Necesitas Ayuda?

Si algo no funciona:

1. ✅ **Revisa esta guía** de nuevo, paso por paso
2. ✅ **Verifica la versión** de Power BI Desktop (debe ser reciente)
3. ✅ **Comprueba los permisos** del navegador para descargas y portapapeles
4. ✅ **Reinicia Power BI Desktop** si la visual no aparece
5. ✅ **Revisa los filtros** si no ves datos

---

## 🎉 ¡Felicidades!

Ya tienes instalada y configurada la visual **Matrix Suprema**.

Ahora puedes:
- 📊 Ver tus datos de forma más elegante
- 💾 Exportar a Excel con un clic
- 📋 Copiar datos rápidamente
- 🎨 Disfrutar de un diseño moderno
- 🚀 Impresionar con tus reportes

**¡A disfrutar de tu nueva visual ultra suprema!** ✨
