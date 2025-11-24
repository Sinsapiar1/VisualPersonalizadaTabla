/*
 *  Matrix Suprema Visual para Power BI
 *  Versión Ultra Moderna con Exportación a Excel
 */

import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataView = powerbi.DataView;
import DataViewMatrix = powerbi.DataViewMatrix;
import DataViewMatrixNode = powerbi.DataViewMatrixNode;
import * as ExcelJS from 'exceljs';

interface MatrixData {
    rows: string[];
    columns: string[];
    values: number[][];
    formattedValues: string[][];
}

class Visual implements IVisual {
    private target: HTMLElement;
    private host: IVisualHost;
    private container: HTMLDivElement;
    private tableContainer: HTMLDivElement;
    private buttonContainer: HTMLDivElement;
    private matrixData: MatrixData;
    private updateCount: number;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.target = options.element;
        this.host = options.host;
        this.updateCount = 0;

        // Crear contenedor principal
        this.container = document.createElement('div');
        this.container.className = 'matrix-suprema-container';
        this.target.appendChild(this.container);

        // Crear contenedor de botones
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = 'button-container';
        this.container.appendChild(this.buttonContainer);

        // Crear contenedor de tabla
        this.tableContainer = document.createElement('div');
        this.tableContainer.className = 'table-container';
        this.container.appendChild(this.tableContainer);

        // Aplicar estilos
        this.applyStyles();
    }

    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);
        this.updateCount++;

        if (!options.dataViews || !options.dataViews[0] || !options.dataViews[0].matrix) {
            this.showMessage('Por favor, agregue datos a la visual');
            return;
        }

        try {
            const dataView = options.dataViews[0];
            this.matrixData = this.transformData(dataView);
            this.renderButtons();
            this.renderTable();
        } catch (error) {
            console.error('Error al actualizar visual:', error);
            this.showMessage('Error al procesar los datos');
        }
    }

    private transformData(dataView: DataView): MatrixData {
        const matrix = dataView.matrix;
        const rows: string[] = [];
        const columns: string[] = [];
        const values: number[][] = [];
        const formattedValues: string[][] = [];

        // Obtener encabezados de columnas
        if (matrix.columns && matrix.columns.root && matrix.columns.root.children) {
            matrix.columns.root.children.forEach(col => {
                columns.push(this.getNodeValue(col));
            });
        }

        // Obtener filas y valores
        if (matrix.rows && matrix.rows.root && matrix.rows.root.children) {
            matrix.rows.root.children.forEach(row => {
                rows.push(this.getNodeValue(row));
                
                const rowValues: number[] = [];
                const rowFormatted: string[] = [];
                
                if (row.values) {
                    Object.keys(row.values).forEach(key => {
                        const value = row.values[key];
                        if (value && value.value !== undefined) {
                            rowValues.push(value.value as number);
                            rowFormatted.push(value.valueSourceIndex !== undefined && dataView.matrix.valueSources 
                                ? this.formatValue(value.value as number)
                                : String(value.value));
                        } else {
                            rowValues.push(0);
                            rowFormatted.push('-');
                        }
                    });
                }
                
                values.push(rowValues);
                formattedValues.push(rowFormatted);
            });
        }

        return { rows, columns, values, formattedValues };
    }

    private getNodeValue(node: DataViewMatrixNode): string {
        if (node.value !== undefined && node.value !== null) {
            if (node.value instanceof Date) {
                return this.formatDate(node.value);
            }
            return String(node.value);
        }
        return '';
    }

    private formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    private formatValue(value: number): string {
        if (value === null || value === undefined) return '-';
        return new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(value);
    }

    private renderButtons() {
        this.buttonContainer.innerHTML = '';

        // Botón Exportar a Excel
        const excelButton = this.createButton('📊 Exportar a Excel', 'export-excel-btn', () => {
            this.exportToExcel();
        });
        this.buttonContainer.appendChild(excelButton);

        // Botón Copiar al Portapapeles
        const copyButton = this.createButton('📋 Copiar', 'copy-btn', () => {
            this.copyToClipboard();
        });
        this.buttonContainer.appendChild(copyButton);
    }

    private createButton(text: string, className: string, onClick: () => void): HTMLButtonElement {
        const button = document.createElement('button');
        button.className = `action-button ${className}`;
        button.textContent = text;
        button.onclick = onClick;
        return button;
    }

    private renderTable() {
        if (!this.matrixData || this.matrixData.rows.length === 0) {
            this.showMessage('No hay datos para mostrar');
            return;
        }

        const table = document.createElement('table');
        table.className = 'matrix-table';

        // Crear encabezado
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Celda vacía para la esquina
        const cornerCell = document.createElement('th');
        cornerCell.className = 'corner-cell';
        headerRow.appendChild(cornerCell);

        // Encabezados de columnas
        this.matrixData.columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            th.className = 'column-header';
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Crear cuerpo
        const tbody = document.createElement('tbody');
        
        this.matrixData.rows.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            tr.className = rowIndex % 2 === 0 ? 'row-even' : 'row-odd';

            // Encabezado de fila
            const th = document.createElement('th');
            th.textContent = row;
            th.className = 'row-header';
            tr.appendChild(th);

            // Celdas de valores
            this.matrixData.formattedValues[rowIndex].forEach((value, colIndex) => {
                const td = document.createElement('td');
                td.textContent = value;
                td.className = 'data-cell';
                
                // Agregar clase especial para valores negativos
                const numValue = this.matrixData.values[rowIndex][colIndex];
                if (numValue < 0) {
                    td.classList.add('negative-value');
                }
                
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        
        this.tableContainer.innerHTML = '';
        this.tableContainer.appendChild(table);
    }

    private async exportToExcel() {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Datos');

            // Agregar encabezados
            const headers = ['', ...this.matrixData.columns];
            worksheet.addRow(headers);

            // Estilizar encabezados
            const headerRow = worksheet.getRow(1);
            headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
            headerRow.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF1F1F1F' }
            };
            headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
            headerRow.height = 30;

            // Agregar datos
            this.matrixData.rows.forEach((row, rowIndex) => {
                const rowData = [row, ...this.matrixData.values[rowIndex]];
                const excelRow = worksheet.addRow(rowData);
                
                // Estilo de fila
                excelRow.alignment = { vertical: 'middle' };
                excelRow.height = 25;

                // Estilo primera columna (encabezados de fila)
                excelRow.getCell(1).font = { bold: true };
                excelRow.getCell(1).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF5F5F5' }
                };

                // Colorear valores negativos en rojo
                this.matrixData.values[rowIndex].forEach((value, colIndex) => {
                    if (value < 0) {
                        excelRow.getCell(colIndex + 2).font = { color: { argb: 'FFFF0000' } };
                    }
                });
            });

            // Ajustar ancho de columnas
            worksheet.columns.forEach((column, index) => {
                if (index === 0) {
                    column.width = 30;
                } else {
                    column.width = 15;
                }
            });

            // Agregar bordes
            worksheet.eachRow((row) => {
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'FFE0E0E0' } },
                        left: { style: 'thin', color: { argb: 'FFE0E0E0' } },
                        bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
                        right: { style: 'thin', color: { argb: 'FFE0E0E0' } }
                    };
                });
            });

            // Generar archivo
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], { 
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
            });
            
            // Descargar archivo
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Matrix_Suprema_${new Date().toISOString().split('T')[0]}.xlsx`;
            link.click();
            window.URL.revokeObjectURL(url);

            this.showNotification('✅ Excel exportado correctamente', 'success');
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
            this.showNotification('❌ Error al exportar a Excel', 'error');
        }
    }

    private copyToClipboard() {
        try {
            // Crear texto en formato tabla
            let text = '\t' + this.matrixData.columns.join('\t') + '\n';
            
            this.matrixData.rows.forEach((row, rowIndex) => {
                text += row + '\t' + this.matrixData.formattedValues[rowIndex].join('\t') + '\n';
            });

            // Copiar al portapapeles
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('✅ Datos copiados al portapapeles', 'success');
            }).catch(err => {
                console.error('Error al copiar:', err);
                this.showNotification('❌ Error al copiar', 'error');
            });
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('❌ Error al copiar', 'error');
        }
    }

    private showMessage(message: string) {
        this.tableContainer.innerHTML = `
            <div class="message-container">
                <div class="message-text">${message}</div>
            </div>
        `;
    }

    private showNotification(message: string, type: 'success' | 'error') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        this.container.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    private applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .matrix-suprema-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                padding: 20px;
                box-sizing: border-box;
                overflow: hidden;
            }

            .button-container {
                display: flex;
                gap: 12px;
                margin-bottom: 20px;
                flex-shrink: 0;
            }

            .action-button {
                padding: 12px 24px;
                border: none;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                font-family: inherit;
            }

            .export-excel-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }

            .export-excel-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
            }

            .copy-btn {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
            }

            .copy-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);
            }

            .action-button:active {
                transform: translateY(0);
            }

            .table-container {
                flex: 1;
                overflow: auto;
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                padding: 0;
            }

            .matrix-table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                font-size: 14px;
            }

            .matrix-table th,
            .matrix-table td {
                padding: 16px 20px;
                text-align: left;
                border-bottom: 1px solid #e5e7eb;
            }

            .corner-cell {
                background: linear-gradient(135deg, #1f1f1f 0%, #3d3d3d 100%);
                color: white;
                font-weight: 700;
                position: sticky;
                left: 0;
                top: 0;
                z-index: 3;
            }

            .column-header {
                background: linear-gradient(135deg, #1f1f1f 0%, #3d3d3d 100%);
                color: white;
                font-weight: 700;
                text-align: center;
                position: sticky;
                top: 0;
                z-index: 2;
                white-space: nowrap;
            }

            .row-header {
                background: linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%);
                font-weight: 600;
                position: sticky;
                left: 0;
                z-index: 1;
                max-width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .data-cell {
                text-align: right;
                font-variant-numeric: tabular-nums;
                transition: background-color 0.2s ease;
            }

            .row-even {
                background-color: #ffffff;
            }

            .row-odd {
                background-color: #f9fafb;
            }

            .matrix-table tbody tr:hover .data-cell {
                background-color: #f3f4f6;
            }

            .negative-value {
                color: #ef4444;
                font-weight: 600;
            }

            .message-container {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: 100%;
            }

            .message-text {
                font-size: 18px;
                color: #6b7280;
                font-weight: 500;
            }

            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 12px;
                font-weight: 600;
                font-size: 14px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                opacity: 0;
                transform: translateX(400px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .notification.show {
                opacity: 1;
                transform: translateX(0);
            }

            .notification-success {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
            }

            .notification-error {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
            }

            /* Scrollbar personalizado estilo Apple */
            .table-container::-webkit-scrollbar {
                width: 12px;
                height: 12px;
            }

            .table-container::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
            }

            .table-container::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%);
                border-radius: 10px;
            }

            .table-container::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
            }

            /* Responsive */
            @media (max-width: 768px) {
                .matrix-suprema-container {
                    padding: 10px;
                }

                .button-container {
                    flex-direction: column;
                    gap: 8px;
                }

                .action-button {
                    width: 100%;
                    padding: 10px 16px;
                    font-size: 12px;
                }

                .matrix-table th,
                .matrix-table td {
                    padding: 12px 16px;
                    font-size: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
export { Visual };
