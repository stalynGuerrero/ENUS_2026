/**
 * js/export.js
 * Módulo encargado de la exportación del lienzo SVG interactivo.
 * Permite descargas nativas en formatos SVG y PNG sin dependencias externas.
 */

class ExportController {
    constructor() {
        this.svgEl = document.getElementById("svg-canvas");
        this.viewportEl = document.getElementById("viewport-group");
    }

    /**
     * Exporta el estado actual del árbol a formato vectorial SVG plano.
     */
    exportToSVG() {
        if (!this.svgEl || !this.viewportEl) return;

        // Clonar el nodo SVG para no afectar la vista interactiva del usuario
        const svgClone = this.svgEl.cloneNode(true);
        const viewportClone = svgClone.querySelector("#viewport-group");
        
        // Remover transformaciones temporales de zoom/pan para la exportación estática
        viewportClone.removeAttribute("transform");

        // Calcular la caja de delimitación real de los elementos internos
        const bbox = this.viewportEl.getBBox();
        const padding = 50;

        // Ajustar dimensiones del clon basadas en el contenido real empaquetado
        svgClone.setAttribute("width", bbox.width + padding * 2);
        svgClone.setAttribute("height", bbox.height + padding * 2);
        svgClone.setAttribute("viewBox", `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`);

        // Inyectar las reglas de estilos CSS críticas para asegurar consistencia visual externa
        const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");
        styleEl.textContent = `
            .svg-edge { fill: none; stroke: #a0aec0; stroke-width: 2; }
            .svg-edge.highlighted { stroke: #1a365d; stroke-width: 4; }
            .svg-node-rect { fill: #ffffff; stroke-width: 2; }
            .node-type-base .svg-node-rect { stroke: #3182ce; }
            .node-type-decision .svg-node-rect { stroke: #dd6b20; }
            .node-type-entidad .svg-node-rect { stroke: #38a169; }
            .node-type-modulo .svg-node-rect { stroke: #805ad5; }
            .svg-node-text-id { font-size: 11px; font-weight: 700; fill: #718096; font-family: sans-serif; }
            .svg-node-text-label { font-size: 13px; font-weight: 600; fill: #2d3748; font-family: sans-serif; }
            .svg-edge-text { font-size: 11px; font-weight: 600; fill: #718096; font-family: sans-serif; }
        `;
        svgClone.insertBefore(styleEl, svgClone.firstChild);

        // Serializar el árbol XML del clon e iniciar descarga binaria
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgClone);
        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        
        this.triggerDownload(URL.createObjectURL(blob), "arbol-decision-salud.svg");
    }

    /**
     * Exporta el árbol como imagen rasterizada de alta definición PNG usando un Canvas intermedio.
     */
    exportToPNG() {
        if (!this.svgEl || !this.viewportEl) return;

        const bbox = this.viewportEl.getBBox();
        const padding = 50;
        
        const width = bbox.width + padding * 2;
        const height = bbox.height + padding * 2;

        // Crear una réplica exacta en formato string SVG con estilos embebidos
        const serializer = new XMLSerializer();
        const svgClone = this.svgEl.cloneNode(true);
        const viewportClone = svgClone.querySelector("#viewport-group");
        viewportClone.removeAttribute("transform");
        
        svgClone.setAttribute("width", width);
        svgClone.setAttribute("height", height);
        svgClone.setAttribute("viewBox", `${bbox.x - padding} ${bbox.y - padding} ${width} ${height}`);

        const styleEl = document.createElementNS("http://www.w3.org/2000/svg", "style");
        styleEl.textContent = `
            .svg-edge { fill: none; stroke: #a0aec0; stroke-width: 2; }
            .svg-node-rect { fill: #ffffff; stroke-width: 2; }
            .node-type-base .svg-node-rect { stroke: #3182ce; }
            .node-type-decision .svg-node-rect { stroke: #dd6b20; }
            .node-type-entidad .svg-node-rect { stroke: #38a169; }
            .node-type-modulo .svg-node-rect { stroke: #805ad5; }
            .svg-node-text-id { font-size: 11px; font-weight: 700; fill: #718096; font-family: sans-serif; }
            .svg-node-text-label { font-size: 13px; font-weight: 600; fill: #2d3748; font-family: sans-serif; }
        `;
        svgClone.insertBefore(styleEl, svgClone.firstChild);

        const svgString = serializer.serializeToString(svgClone);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        // Renderizar la estructura SVG dentro de una imagen nativa y pintarla en Canvas
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width * 2; // Doble factor de escala para evitar pixelado (Retina/High-Res)
            canvas.height = height * 2;
            
            const ctx = canvas.getContext("2d");
            ctx.scale(2, 2);
            
            // Forzar fondo blanco plano institucional en lugar de canal alfa transparente
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, width, height);
            
            ctx.drawImage(img, 0, 0);
            
            // Convertir buffer a URI de datos e iniciar ciclo de descarga
            const pngUrl = canvas.toDataURL("image/png");
            this.triggerDownload(pngUrl, "arbol-decision-salud.png");
            URL.revokeObjectURL(url);
        };
        img.src = url;
    }

    /**
     * Invoca un anclaje temporal de hipervínculo en el DOM para forzar la descarga de ficheros.
     * @param {string} url - URI del recurso binario o blob object.
     * @param {string} filename - Nombre por defecto asignado al archivo de salida.
     */
    triggerDownload(url, filename) {
        const downloadAnchor = document.createElement("a");
        downloadAnchor.href = url;
        downloadAnchor.download = filename;
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
    }
}

// Inyectar el controlador al contexto global de carga de la web
window.exportController = new ExportController();