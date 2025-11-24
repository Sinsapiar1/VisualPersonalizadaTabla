# 🎯 PROMPT COMPLETO PARA CLAUDE - CUSTOM VISUAL DE POWER BI

## 📋 CONTEXTO DEL PROYECTO

Necesito ayuda para crear una **custom visual para Power BI Desktop** desde cero. He intentado múltiples enfoques y ninguno ha funcionado correctamente. Las visuales se importan sin errores, pero aparecen completamente **en blanco** (fondo azul/gris vacío).

**Repositorio GitHub:** https://github.com/Sinsapiar1/VisualPersonalizadaTabla
**Branch:** `cursor/crear-y-compilar-visual-personalizado-para-power-bi-claude-4.5-sonnet-thinking-4580`

---

## 🎯 OBJETIVO PRINCIPAL

Crear una **versión ultra suprema moderna** de una matriz de Power BI con las siguientes características:

### Funcionalidades Requeridas:
1. ✅ **Matriz moderna con diseño estilo Apple**
   - Diseño limpio, intuitivo, responsive
   - Colores y gradientes elegantes
   - Animaciones sutiles
   - Scrollable para grandes volúmenes de datos

2. ✅ **Botón para Exportar a Excel** (o CSV)
   - Descarga automática del archivo
   - Incluye todos los datos visibles

3. ✅ **Botón para Copiar al Portapapeles**
   - Formato compatible para pegar en Excel
   - Incluye headers y valores

4. ✅ **Formateo inteligente de valores**
   - Valores negativos en rojo
   - Valores positivos en verde
   - Formato de números con separadores

5. ✅ **Headers sticky**
   - Los headers se mantienen fijos al hacer scroll

---

## 📊 CONFIGURACIÓN ACTUAL EN POWER BI

### Mi matriz actual funciona así:

#### **Build Visual:**
- **Rows (Filas):** Campo `Fila_Completa` de la tabla `negativosBi`
- **Columns (Columnas):** Campo `Fecha_Reporte` de la tabla `negativosBi`
- **Values (Valores):** Campo `Sum of Cantidad_Negativa` de la tabla `negativosBi`

#### **Filters on this visual:**
- **Campo:** `Aplicar_Filtro_Activos`
- **Fórmula DAX:**

```dax
Aplicar_Filtro_Activos = 
VAR OpcionSeleccionada = SELECTEDVALUE(Filtro_Activos[Opcion], "Todos")
VAR FiltroFinDeSemana = SELECTEDVALUE(negativosBi[Es_FinDeSemana], "Todos")
VAR UltimaFecha = 
    IF(
        FiltroFinDeSemana = "No",
        CALCULATE(
            MAX(negativosBi[Fecha_Reporte]),
            ALL(negativosBi),
            negativosBi[Es_FinDeSemana] = "No"
        ),
        CALCULATE(MAX(negativosBi[Fecha_Reporte]), ALL(negativosBi))
    )
VAR CodigoActual = SELECTEDVALUE(negativosBi[Codigo])
VAR PalletActual = SELECTEDVALUE(negativosBi[ID_Pallet])
VAR ExisteHoy = 
    CALCULATE(
        COUNTROWS(negativosBi),
        negativosBi[Fecha_Reporte] = UltimaFecha,
        negativosBi[Codigo] = CodigoActual,
        negativosBi[ID_Pallet] = PalletActual,
        ALL(negativosBi[Fecha_Reporte])
    )
RETURN
    IF(
        OpcionSeleccionada = "Solo Activos",
        IF(ExisteHoy > 0, 1, 0),
        1
    )
```

### Datos de diagnóstico del modelo:

```json
{
  "model": {
    "culture": "es-ES",
    "tables": [
      {
        "name": "negativosBi",
        "columns": [
          {"name": "Fecha_Reporte", "dataType": "dateTime"},
          {"name": "Fila_Completa", "dataType": "string"},
          {"name": "Cantidad_Negativa", "dataType": "double"},
          {"name": "Codigo", "dataType": "string"},
          {"name": "ID_Pallet", "dataType": "string"},
          {"name": "Es_FinDeSemana", "dataType": "string"}
        ],
        "measures": [
          {
            "name": "Aplicar_Filtro_Activos",
            "expression": "[Formula DAX de arriba]"
          }
        ]
      },
      {
        "name": "Filtro_Activos",
        "columns": [
          {"name": "Opcion", "dataType": "string"}
        ]
      }
    ]
  }
}
```

**Importante:** La visual debe ser compatible con **segmentaciones** (slicers) de Power BI y debe poder filtrar datos dinámicamente.

---

## 🚫 PROBLEMAS ENCONTRADOS HASTA AHORA

### Intentos realizados:

1. ✅ **Intentamos usar `pbiviz` CLI** → Errores de compatibilidad con Node.js
2. ✅ **Creamos estructura manual** → Compiló pero visual en blanco
3. ✅ **Corregimos namespace de Power BI** → Visual en blanco
4. ✅ **Agregamos método `enumerateObjectInstances()`** → Visual en blanco
5. ✅ **Probamos con indicadores visuales (fondos amarillos, rojos, etc.)** → Visual en blanco
6. ✅ **Comparamos con visual oficial de Microsoft (`TestVisual.pbiviz`)** → La oficial funciona, las nuestras no

### Síntomas:
- ✅ Las visuales **SE IMPORTAN** sin errores en Power BI Desktop
- ✅ La opción **"Show as table"** muestra los datos correctamente (los datos LLEGAN)
- ❌ Pero la visual aparece completamente **EN BLANCO** (fondo azul/gris vacío)
- ❌ No se ve ningún HTML, ni siquiera los colores de debug extremos

### Conclusión:
El problema NO parece ser:
- ❌ La estructura del `.pbiviz` (porque se importa correctamente)
- ❌ Los datos (porque "Show as table" funciona)
- ❌ El código JavaScript (hemos probado versiones extremadamente simples)

**Posible causa:** Algo en cómo estamos registrando o renderizando la visual no es compatible con el sandbox de Power BI Desktop.

---

## 💻 ESTRUCTURA ACTUAL DEL PROYECTO

### Archivos en el repositorio:

```
/workspace/
├── MatrixSupremaFinal/
│   ├── package.json
│   └── resources/
│       └── MatrixSuprema2025A1B2C3D4E5F6.pbiviz.json
│
├── MatrixSupremaFUNCIONAL.pbiviz    ← Última versión (no funciona)
├── MatrixSupremaDEBUG.pbiviz        ← Versión debug (no funciona)
├── MatrixSupremaCompleta.pbiviz     ← Versión completa (no funciona)
├── MatrixSupremaSimple.pbiviz       ← Versión simple (no funciona)
└── TestVisual.pbiviz                ← Visual oficial Microsoft (SÍ funciona)
```

### Estructura interna del `.pbiviz.json`:

```json
{
  "visual": {
    "name": "MatrixSuprema2025A1B2C3D4E5F6",
    "displayName": "Matrix Suprema",
    "guid": "MatrixSuprema2025A1B2C3D4E5F6",
    "visualClassName": "Visual",
    "version": "1.0.0",
    "description": "Matriz moderna con exportación"
  },
  "apiVersion": "5.1.0",
  "author": {
    "name": "Developer",
    "email": "dev@example.com"
  },
  "capabilities": {
    "dataRoles": [
      {"displayName": "Rows", "name": "rows", "kind": "Grouping"},
      {"displayName": "Columns", "name": "columns", "kind": "Grouping"},
      {"displayName": "Values", "name": "values", "kind": "Measure"}
    ],
    "dataViewMappings": [
      {
        "matrix": {
          "rows": {"for": {"in": "rows"}},
          "columns": {"for": {"in": "columns"}},
          "values": {"for": {"in": "values"}}
        }
      }
    ],
    "objects": {}
  },
  "content": {
    "js": "[CÓDIGO JAVASCRIPT AQUÍ]",
    "css": "",
    "iconBase64": ""
  }
}
```

---

## 🎯 LO QUE NECESITO DE TI (CLAUDE)

### Por favor ayúdame a:

1. **Identificar por qué las visuales no se renderizan**
   - ¿Qué estamos haciendo mal en el registro de la visual?
   - ¿Hay algún requisito del sandbox que estemos omitiendo?
   - ¿La estructura del `.pbiviz` está correcta?

2. **Proporcionar un enfoque desde CERO que FUNCIONE**
   - Código JavaScript mínimo funcional para Power BI
   - Estructura correcta del archivo `.pbiviz.json`
   - Pasos exactos para empaquetar y probar

3. **Implementar las funcionalidades requeridas**
   - Una vez que logremos ver algo en pantalla
   - Implementar la matriz moderna
   - Agregar botones de exportar y copiar

---

## 🔧 HERRAMIENTAS DISPONIBLES

- **Git/GitHub:** Estamos usando control de versiones
- **Node.js:** Disponible (aunque `pbiviz` CLI tiene problemas)
- **Python:** Disponible para scripts de empaquetado
- **Power BI Desktop:** Para probar las visuales
- **Archivos de referencia:** Tenemos `TestVisual.pbiviz` que SÍ funciona

---

## ❓ PREGUNTAS ESPECÍFICAS

1. **¿Cuál es la estructura MÍNIMA funcional de una custom visual?**
   - ¿Qué métodos son absolutamente obligatorios?
   - ¿Cuál es el namespace correcto?
   - ¿Cómo debe ser la exportación global?

2. **¿Por qué una visual se importa pero no renderiza?**
   - ¿Qué puede estar bloqueando el renderizado?
   - ¿Hay algún error silencioso en el sandbox?
   - ¿Cómo podemos debuggear sin acceso a console/F12?

3. **¿Deberíamos usar un enfoque diferente?**
   - ¿Es mejor partir de un template oficial?
   - ¿Deberíamos usar `pbiviz` CLI de otra manera?
   - ¿Hay alguna herramienta alternativa?

4. **¿Cómo podemos comparar nuestro `.pbiviz` con `TestVisual.pbiviz`?**
   - ¿Qué diferencias críticas debemos buscar?
   - ¿Hay herramientas para validar un `.pbiviz`?

---

## 🎨 DISEÑO ESPERADO (REFERENCIA)

### Visual sin datos:
```
┌─────────────────────────────────────┐
│ 📊 Matrix Suprema                   │
│                                     │
│ Esperando datos...                  │
│ Agregue campos en:                  │
│ • Rows: Fila_Completa              │
│ • Columns: Fecha_Reporte           │
│ • Values: Cantidad_Negativa        │
└─────────────────────────────────────┘
```

### Visual con datos:
```
┌────────────────────────────────────────────────┐
│ 📊 Matrix Suprema                              │
│                                                │
│ [📊 Exportar CSV] [📋 Copiar]                 │
│                                                │
│ ╔═══════════╦═══════════╦═══════════╦════════╗│
│ ║           ║ 01/11/24  ║ 02/11/24  ║  ...   ║│
│ ╠═══════════╬═══════════╬═══════════╬════════╣│
│ ║ Prod A    ║   -50     ║    120    ║  ...   ║│
│ ║ Prod B    ║    80     ║    -30    ║  ...   ║│
│ ║ Prod C    ║   -120    ║     45    ║  ...   ║│
│ ╚═══════════╩═══════════╩═══════════╩════════╝│
└────────────────────────────────────────────────┘
```

**Características visuales:**
- Headers oscuros con gradiente
- Filas alternadas (gris claro / blanco)
- Valores negativos en **rojo** (#ef4444)
- Valores positivos en **verde** (#059669)
- Botones con gradientes modernos
- Sombras sutiles (box-shadow)
- Bordes redondeados (border-radius)

---

## 📦 ENTREGABLES ESPERADOS

Por favor proporciona:

1. ✅ **Explicación del problema**
   - ¿Por qué no renderiza?
   - ¿Qué estamos haciendo mal?

2. ✅ **Código JavaScript funcional MÍNIMO**
   - Que muestre al menos "Visual cargada"
   - Código completo listo para usar

3. ✅ **Estructura correcta del `.pbiviz.json`**
   - Con todos los campos requeridos
   - Explicando cada sección

4. ✅ **Pasos exactos para crear el `.pbiviz`**
   - Comandos específicos
   - Herramientas a usar

5. ✅ **Código completo con todas las funcionalidades**
   - Una vez que el mínimo funcione
   - Matriz moderna + exportar + copiar

---

## 🚀 CONTEXTO ADICIONAL

### Lo que hemos aprendido:
- ✅ El formato `.pbiviz` es un ZIP con estructura específica
- ✅ El JavaScript debe estar minificado en una línea
- ✅ El método `enumerateObjectInstances()` es obligatorio en API 5.1.0
- ✅ El namespace debe ser `powerbi.visuals.plugins.GUID`
- ✅ Los datos llegan correctamente a la visual (verificado con "Show as table")

### Recursos:
- **Documentación oficial:** https://learn.microsoft.com/en-us/power-bi/developer/visuals/
- **GitHub del proyecto:** https://github.com/Sinsapiar1/VisualPersonalizadaTabla
- **Visual de referencia que funciona:** TestVisual.pbiviz (en el repo)

---

## 💬 NOTA FINAL

He trabajado intensivamente en este proyecto con otro asistente AI y hemos probado múltiples enfoques sin éxito. Necesito tu experiencia y conocimiento para:

1. Identificar el problema raíz
2. Proporcionar una solución que FUNCIONE
3. Implementar las funcionalidades requeridas

**Este proyecto está en GitHub y estoy comprometido a hacerlo funcionar.** Cualquier guía, código, o enfoque que puedas proporcionar será extremadamente valioso.

¿Puedes ayudarme a resolver esto desde cero de manera correcta?

Gracias de antemano por tu ayuda. 🙏
