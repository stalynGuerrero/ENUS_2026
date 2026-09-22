/**
 * js/tooltip.js
 * Módulo para la gestión y posicionamiento del tooltip global flotante.
 * Proporciona retroalimentación contextual ágil durante el hovering sobre los nodos.
 */

class TooltipController {
    constructor() {
        this.tooltipEl = document.getElementById("global-tooltip");
    }

    /**
     * Muestra el tooltip con contenido estructurado en base a las coordenadas del mouse.
     * @param {MouseEvent} event - Evento nativo del mouse para extraer coordenadas.
     * @param {string} title - Título principal o ID del nodo.
     * @param {string} description - Texto explicativo o etiqueta descriptiva.
     * @param {string} [extraInfo=""] - Información adicional opcional (ej. número de preguntas).
     */
    show(event, title, description, extraInfo = "") {
        if (!this.tooltipEl) return;

        // Construcción limpia de la plantilla HTML interna del tooltip
        let content = `<strong>${title}</strong><br/><span>${description}</span>`;
        if (extraInfo) {
            content += `<br/><small style="color: #ecc94b; margin-top: 4px; display: inline-block; font-weight: 600;">${extraInfo}</small>`;
        }

        this.tooltipEl.innerHTML = content;
        this.tooltipEl.classList.remove("hidden");
        
        this.updatePosition(event);
    }

    /**
     * Actualiza la posición física del tooltip evitando desbordamientos de pantalla.
     * @param {MouseEvent} event 
     */
    updatePosition(event) {
        if (!this.tooltipEl || this.tooltipEl.classList.contains("hidden")) return;

        const offsetMouseX = 15;
        const offsetMouseY = 15;
        
        let targetX = event.clientX + offsetMouseX;
        let targetY = event.clientY + offsetMouseY;

        // Prevenir desbordamiento en el borde derecho de la ventana
        const tooltipWidth = this.tooltipEl.offsetWidth;
        if (targetX + tooltipWidth > window.innerWidth) {
            targetX = event.clientX - tooltipWidth - offsetMouseX;
        }

        // Prevenir desbordamiento en el borde inferior de la ventana
        const tooltipHeight = this.tooltipEl.offsetHeight;
        if (targetY + tooltipHeight > window.innerHeight) {
            targetY = event.clientY - tooltipHeight - offsetMouseY;
        }

        this.tooltipEl.style.left = `${targetX}px`;
        this.tooltipEl.style.top = `${targetY}px`;
    }

    /**
     * Oculta el componente tooltip de la pantalla de manera inmediata.
     */
    hide() {
        if (!this.tooltipEl) return;
        this.tooltipEl.classList.add("hidden");
        this.tooltipEl.innerHTML = "";
    }
}

// Exportar la instancia única del controlador de tooltips al entorno global
window.tooltipController = new TooltipController();