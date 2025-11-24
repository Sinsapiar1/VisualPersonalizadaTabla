# Ayuda para crear Custom Visual de Power BI - Problema con Renderizado

## Contexto General
Estamos creando una custom visual para Power BI Desktop que reemplace la matriz estándar con una versión ultra moderna que incluya botones para exportar a Excel y copiar al portapapeles. Trabajamos en GitHub y ya hemos logrado importar la visual exitosamente, pero el contenido se muestra en blanco.

---

## Lo Que Ya Funciona ✅

### 1. TestVisual.pbiviz (ÉXITO TOTAL)
- Descargamos el ejemplo oficial de Microsoft (BarChart)
- Lo compilamos con `npm run package`
- **Resultado:** Se importa perfectamente en Power BI Desktop y funciona
- **Conclusión:** La estructura del .pbiviz es correcta y Power BI la acepta

### 2. MatrixSupremaSimple.pbiviz (IMPORTACIÓN EXITOSA)
- Usamos la MISMA estructura del TestVisual que funcionó
- Reemplazamos solo el código JavaScript con nuestro código simple
- **Resultado:** Se importa sin errores en Power BI
- **Conclusión:** La estructura es válida y Power BI acepta nuestra visual

### 3. Datos Llegando Correctamente
- Al hacer clic derecho → "Show as table" en la visual, se ven los datos perfectamente
- **Conclusión:** Power BI SÍ está enviando los datos a la visual, el dataView tiene información

---

## El Problema Actual ❌

**Síntoma:** La visual se ve completamente en BLANCO (fondo blanco vacío)

**Qué hemos intentado:**
1. Versión con logs en consola → Power BI Desktop no tiene consola F12 accesible
2. Versión con diagnóstico en pantalla → Sigue viéndose en blanco (el HTML no se renderiza)
3. Múltiples variaciones del código JavaScript → Todas se ven en blanco

**Lo que sabemos:**
- ✅ La visual se importa correctamente
- ✅ Los datos llegan (confirmado con "show as table")
- ✅ No hay errores de importación
- ❌ El código JavaScript NO está renderizando el HTML en el container
- ❌ El `this.container.innerHTML = ...` parece no tener efecto

---

## Estructura del Archivo .pbiviz

Un archivo .pbiviz es un ZIP con esta estructura que SÍ funciona:

```
MatrixSuprema.pbiviz (ZIP)
├── package.json
└── resources/
    └── NombreVisual.pbiviz.json (archivo grande con todo el contenido)
```

### package.json
```json
{
  "version": "1.0.0",
  "author": {"name":"Developer","email":"dev@example.com"},
  "resources": [{
    "resourceId": "rId0",
    "sourceType": 5,
    "file": "resources/MatrixSuprema2025A1B2C3D4E5F6.pbiviz.json"
  }],
  "visual": {
    "name":"Matrix Suprema",
    "displayName":"Matrix Suprema",
    "guid":"MatrixSuprema2025A1B2C3D4E5F6",
    "visualClassName":"Visual",
    "version":"1.0.0",
    "description":"Matriz moderna"
  },
  "metadata": {
    "pbivizjson": {"resourceId": "rId0"}
  }
}
```

### resources/NombreVisual.pbiviz.json (estructura interna)
```json
{
  "visual": { ... },
  "author": { ... },
  "apiVersion": "5.1.0",
  "capabilities": {
    "dataRoles": [
      {"displayName": "Rows", "name": "rows", "kind": "Grouping"},
      {"displayName": "Columns", "name": "columns", "kind": "Grouping"},
      {"displayName": "Values", "name": "values", "kind": "Measure"}
    ],
    "dataViewMappings": [{
      "matrix": {
        "rows": {"for": {"in": "rows"}},
        "columns": {"for": {"in": "columns"}},
        "values": {"for": {"in": "values"}}
      }
    }]
  },
  "content": {
    "js": "var MatrixSuprema2025A1B2C3D4E5F6; (function() { ... código JavaScript ... })()",
    "css": "...",
    "iconBase64": "..."
  }
}
```

---

## Nuestro Código JavaScript Actual

El código que NO está funcionando:

```javascript
var MatrixSuprema2025A1B2C3D4E5F6;
(function () {
    "use strict";
    
    class Visual {
        constructor(options) {
            this.target = options.element;
            this.host = options.host;
            this.container = document.createElement('div');
            this.container.style.cssText = 'width:100%;height:100%;padding:20px;';
            this.target.appendChild(this.container);
            this.container.innerHTML = '<h1>Test</h1>'; // ← Esto NO se ve
        }
        
        update(options) {
            // Los datos llegan aquí (confirmado con show as table)
            this.container.innerHTML = '<h1>Actualizado</h1>'; // ← Esto NO se ve
        }
    }
    
    // Registro del plugin
    MatrixSuprema2025A1B2C3D4E5F6 = {
        name: "MatrixSuprema2025A1B2C3D4E5F6",
        displayName: "Matrix Suprema",
        class: "Visual",
        apiVersion: "5.1.0",
        create: function(options) { return new Visual(options); },
        custom: true
    };
    
    if (typeof powerbi !== 'undefined') {
        powerbi.visuals = powerbi.visuals || {};
        powerbi.visuals.plugins = powerbi.visuals.plugins || {};
        powerbi.visuals.plugins["MatrixSuprema2025A1B2C3D4E5F6"] = MatrixSuprema2025A1B2C3D4E5F6;
    }
})();
```

---

## Lo Que Necesitamos

**Objetivo:** Una visual de matriz con estas características:
1. Lee datos de matriz (rows, columns, values)
2. Renderiza una tabla HTML moderna con diseño estilo Apple
3. Botones para exportar a CSV y copiar al portapapeles
4. Valores negativos en rojo
5. Headers sticky y scrollable

**Configuración de datos en Power BI:**
- Rows: Fila_Completa (texto)
- Columns: Fecha_Reporte (fechas)
- Values: Cantidad_Negativa (números, puede ser negativo)

---

## Preguntas Específicas

1. **¿Por qué el HTML no se renderiza?** 
   - El `this.container.innerHTML = '<h1>Test</h1>'` no tiene efecto visible
   - El container SÍ se crea y se agrega al DOM (options.element)
   - ¿Hay algún problema con el sandbox de Power BI?

2. **¿Cómo debería ser el código JavaScript correcto?**
   - El ejemplo de Microsoft (BarChart) usa D3.js
   - ¿Es necesario usar alguna librería específica?
   - ¿Hay restricciones especiales para el DOM manipulation?

3. **¿El wrapper de la función está correcto?**
   ```javascript
   var MatrixSuprema2025A1B2C3D4E5F6;
   (function () {
       // código
   })();
   ```
   - ¿Debería ser diferente?
   - ¿Falta algún namespace específico?

4. **¿La estructura del objeto plugin es correcta?**
   ```javascript
   MatrixSuprema2025A1B2C3D4E5F6 = {
       name: "...",
       create: function(options) { ... }
   }
   ```

---

## Código del Ejemplo que SÍ Funciona (BarChart de Microsoft)

El TestVisual.pbiviz que importó correctamente tiene este formato de código (simplificado):

```javascript
var PBI_CV_9894B302_1DFF_4A96_ABFE_BF8588197166;
(()=>{"use strict";
    // Webpack bundle code aquí
    // Usa D3.js para renderizar
    // Exports the plugin at the end
})();
```

El archivo completo es muy largo (compilado con webpack), pero funciona perfectamente.

---

## Repositorio GitHub

Estamos trabajando en: https://github.com/Sinsapiar1/VisualPersonalizadaTabla

**Branch:** cursor/crear-y-compilar-visual-personalizado-para-power-bi-claude-4.5-sonnet-thinking-4580

**Archivos relevantes:**
- `TestVisual.pbiviz` - El que SÍ funciona (ejemplo de Microsoft)
- `MatrixSupremaDiagnostico.pbiviz` - El nuestro que se ve en blanco

---

## ¿Qué Necesitamos de Ti?

1. **Identificar por qué el HTML no se renderiza** aunque el código se ejecute
2. **Proporcionar código JavaScript funcional** que:
   - Lea datos de tipo matrix de Power BI
   - Renderice una tabla HTML simple primero (luego la haremos moderna)
   - Use la estructura exacta que funciona en Power BI
3. **Explicar si hay restricciones del sandbox** que estemos violando
4. **Código mínimo funcional** que podamos probar inmediatamente

---

## Información Adicional

- **Power BI Desktop:** Versión actual (2024)
- **API Version:** 5.1.0
- **Entorno de desarrollo:** Linux, Node.js 22.21.1
- **No podemos usar pbiviz tools** (tiene problemas en nuestro ambiente)
- **Creamos el .pbiviz manualmente** (desempaquetando, modificando, re-empaquetando)

---

## Resumen

✅ **Funciona:** Importar la visual, recibir datos
❌ **No funciona:** Renderizar HTML en el container
🎯 **Necesitamos:** Código JavaScript que renderice correctamente en Power BI

¿Puedes ayudarnos a identificar qué estamos haciendo mal y proporcionar el código JavaScript correcto?
