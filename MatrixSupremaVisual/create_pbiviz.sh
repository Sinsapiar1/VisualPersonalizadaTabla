#!/bin/bash

# Script para crear el archivo .pbiviz manualmente

echo "Creando estructura para .pbiviz..."

# Crear directorio temporal para el paquete
mkdir -p .tmp/pbiviz_package

# Copiar archivos necesarios
cp pbiviz.json .tmp/pbiviz_package/
cp capabilities.json .tmp/pbiviz_package/
cp .tmp/drop/visual.js .tmp/pbiviz_package/

# Copiar icono
mkdir -p .tmp/pbiviz_package/resources
cp assets/icon.png .tmp/pbiviz_package/resources/

# Crear el archivo .pbiviz (es un ZIP)
cd .tmp/pbiviz_package
zip -r ../../MatrixSupremaVisual.pbiviz *
cd ../..

echo "✅ Archivo MatrixSupremaVisual.pbiviz creado exitosamente!"
ls -lh MatrixSupremaVisual.pbiviz
