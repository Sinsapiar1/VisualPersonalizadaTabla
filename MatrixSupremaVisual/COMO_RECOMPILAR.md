# 🔧 Cómo Recompilar la Visual (Para Desarrolladores)

## 📋 Prerequisitos

- Node.js v18+ instalado
- npm instalado
- Conocimientos básicos de TypeScript

---

## 🚀 Recompilar el Proyecto

### Opción 1: Recompilación Rápida

```bash
cd /workspace/MatrixSupremaVisual
npm run build
./create_pbiviz.sh
```

Esto genera un nuevo `MatrixSupremaVisual.pbiviz`

### Opción 2: Desde Cero

```bash
cd /workspace/MatrixSupremaVisual

# 1. Limpiar instalación anterior
rm -rf node_modules package-lock.json .tmp

# 2. Instalar dependencias
npm install --legacy-peer-deps

# 3. Compilar
npm run build

# 4. Crear .pbiviz
./create_pbiviz.sh
```

---

## ✏️ Archivos Principales para Modificar

### 🎨 Cambiar Estilos (Colores, Fuentes, etc.)

**Archivo:** `src/visual.ts`

Busca la función `applyStyles()` al final del archivo. Allí están todos los estilos CSS.

**Ejemplo - Cambiar color de botón Excel:**
```typescript
.export-excel-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    // Cambia estos códigos de color
}
```

**Ejemplo - Cambiar tamaño de fuente:**
```typescript
.matrix-table th,
.matrix-table td {
    font-size: 14px;  // Cambia esto
}
```

### 📊 Cambiar Lógica de Exportación

**Archivo:** `src/visual.ts`

Busca la función `exportToExcel()` (línea ~200 aprox)

**Ejemplo - Cambiar nombre del archivo:**
```typescript
link.download = `Matrix_Suprema_${new Date().toISOString().split('T')[0]}.xlsx`;
// Cambia el nombre aquí
```

**Ejemplo - Cambiar colores de Excel:**
```typescript
headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1F1F1F' }  // Color de fondo del header
};
```

### 🏗️ Cambiar Configuración de Campos

**Archivo:** `capabilities.json`

**Ejemplo - Permitir múltiples campos en filas:**
```json
{
  "rows": {
    "max": 3  // Cambia de 1 a 3
  }
}
```

**Ejemplo - Agregar nueva opción de formato:**
```json
"properties": {
  "nuevaOpcion": {
    "displayName": "Mi Nueva Opción",
    "type": {
      "bool": true
    }
  }
}
```

---

## 🎨 Personalizaciones Comunes

### Cambiar Colores del Tema

En `src/visual.ts`, función `applyStyles()`:

```typescript
// Fondo principal
background: linear-gradient(135deg, #TuColor1 0%, #TuColor2 100%);

// Botón Excel
.export-excel-btn {
    background: linear-gradient(135deg, #TuColor3 0%, #TuColor4 100%);
}

// Botón Copiar
.copy-btn {
    background: linear-gradient(135deg, #TuColor5 0%, #TuColor6 100%);
}
```

### Cambiar Formato de Números

En `src/visual.ts`, función `formatValue()`:

```typescript
private formatValue(value: number): string {
    return new Intl.NumberFormat('es-ES', {  // Cambia 'es-ES' para otro formato
        minimumFractionDigits: 0,
        maximumFractionDigits: 2  // Cambia decimales
    }).format(value);
}
```

### Cambiar Formato de Fecha

En `src/visual.ts`, función `formatDate()`:

```typescript
private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;  // Cambia el formato aquí
}
```

---

## 🐛 Solución de Problemas al Compilar

### Error: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Error: "TypeScript compilation failed"

Verifica que no hayas introducido errores de sintaxis en `src/visual.ts`

```bash
npm run build 2>&1 | grep "error TS"
```

### Error: "webpack compilation failed"

```bash
# Verifica webpack.config.js
cat webpack.config.js

# Reinstala webpack
npm install webpack webpack-cli --save-dev --legacy-peer-deps
```

---

## 📦 Estructura del .pbiviz

Un archivo .pbiviz es simplemente un ZIP con esta estructura:

```
MatrixSupremaVisual.pbiviz (ZIP)
├── pbiviz.json          ← Metadatos
├── capabilities.json    ← Configuración de campos
├── visual.js           ← Código compilado
└── resources/
    └── icon.png        ← Icono
```

Para verificar el contenido:
```bash
unzip -l MatrixSupremaVisual.pbiviz
```

---

## 🔄 Workflow de Desarrollo

### 1. Hacer Cambios
Edita `src/visual.ts` o `capabilities.json`

### 2. Probar Sintaxis
```bash
npm run build
```

### 3. Ver Errores
Si hay errores, aparecerán en la consola. Corrígelos.

### 4. Recompilar .pbiviz
```bash
./create_pbiviz.sh
```

### 5. Probar en Power BI
- Elimina la visual anterior de Power BI
- Importa el nuevo .pbiviz
- Prueba los cambios

### 6. Iterar
Repite pasos 1-5 hasta lograr lo deseado

---

## 💡 Tips de Desarrollo

### Modo Debug
Para ver logs en la consola del navegador:

```typescript
console.log('Mi mensaje de debug', variable);
```

Luego en Power BI Desktop → F12 → Console

### Cambios Rápidos de Color
Agrupa todos los colores en variables al inicio:

```typescript
// En applyStyles()
const COLORS = {
    primary: '#667eea',
    secondary: '#764ba2',
    background: '#f5f7fa',
    // etc...
};
```

### Backup antes de Modificar
```bash
cp MatrixSupremaVisual.pbiviz MatrixSupremaVisual_backup.pbiviz
```

---

## 🎓 Recursos Útiles

### Documentación Oficial
- [Power BI Visuals API](https://github.com/microsoft/powerbi-visuals-api)
- [Power BI Visuals Tools](https://github.com/microsoft/PowerBI-visuals-tools)

### Librerías Usadas
- [ExcelJS](https://github.com/exceljs/exceljs) - Para exportar Excel
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje
- [Webpack](https://webpack.js.org/) - Empaquetador

---

## 🚨 Advertencias Importantes

### ⚠️ No Modifiques
- `node_modules/` - Se regenera automáticamente
- `.tmp/` - Carpeta temporal
- `package-lock.json` (a menos que sepas lo que haces)

### ⚠️ Antes de Compilar
- Guarda todos los archivos
- Cierra Power BI Desktop si tienes la visual cargada
- Verifica que no haya errores de sintaxis

### ⚠️ Testing
- Siempre prueba con datos de prueba primero
- Verifica la exportación a Excel
- Prueba el botón copiar
- Verifica en diferentes tamaños de pantalla

---

## 📝 Cambios Comunes Solicitados

### 1. Agregar Más Botones

En `src/visual.ts`, función `renderButtons()`:

```typescript
const miBoton = this.createButton('🎯 Mi Acción', 'mi-btn', () => {
    // Tu código aquí
});
this.buttonContainer.appendChild(miBoton);
```

Luego agrega estilo en `applyStyles()`:

```typescript
.mi-btn {
    background: linear-gradient(135deg, #color1 0%, #color2 100%);
    color: white;
}
```

### 2. Cambiar GUID de la Visual

**¿Por qué?** Si instalas dos versiones, Power BI las distingue por GUID.

En `pbiviz.json`:
```json
"guid": "MatrixSupremaNuevoGUID12345",
```

⚠️ Después de cambiar el GUID, recompila todo.

### 3. Cambiar Nombre Visible

En `pbiviz.json`:
```json
"displayName": "Tu Nuevo Nombre Aquí",
```

---

## 🎉 ¡Listo para Modificar!

Ahora tienes toda la información para:
- ✅ Recompilar el proyecto
- ✅ Hacer cambios de estilo
- ✅ Modificar funcionalidad
- ✅ Resolver problemas
- ✅ Crear nuevas versiones

**Comando rápido para recompilar:**
```bash
cd /workspace/MatrixSupremaVisual && npm run build && ./create_pbiviz.sh
```

**¡Buena suerte con tus modificaciones!** 🚀
