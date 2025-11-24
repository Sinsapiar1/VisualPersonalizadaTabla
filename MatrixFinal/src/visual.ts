"use strict";

import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

export class Visual implements IVisual {
    private target: HTMLElement;
    private container: HTMLDivElement;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.container = document.createElement('div');
        this.container.style.cssText = 'width: 100%; height: 100%; padding: 20px; font-family: Arial;';
        this.container.innerHTML = '<h1>Matrix Suprema - Test Básico</h1><p>Visual importada correctamente!</p>';
        this.target.appendChild(this.container);
    }

    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);
        if (options.dataViews && options.dataViews[0]) {
            this.container.innerHTML = '<h1>Matrix Suprema</h1><p>✅ Datos recibidos correctamente</p>';
        }
    }
}
