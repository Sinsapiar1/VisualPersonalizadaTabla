#!/bin/bash

echo "🔨 Construyendo MatrixSupremaV2.pbiviz..."

cd MatrixSupremaV2
rm -f ../MatrixSupremaV2.pbiviz
zip -r ../MatrixSupremaV2.pbiviz package.json resources/

cd ..

if [ -f "MatrixSupremaV2.pbiviz" ]; then
    echo "✅ MatrixSupremaV2.pbiviz creado exitosamente"
    ls -lh MatrixSupremaV2.pbiviz
    echo ""
    echo "📦 Contenido del archivo:"
    unzip -l MatrixSupremaV2.pbiviz
else
    echo "❌ Error al crear el archivo"
    exit 1
fi
