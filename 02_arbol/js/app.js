/**
 * js/app.js
 * Orquestador principal e inicio de la aplicación (Bootstrapper).
 * Coordina el ciclo de vida del software, realiza el renderizado inicial y acopla los módulos individuales.
 */

class ApplicationBootstrap {
    constructor() {
        // Asegurar la carga correcta del árbol estructural al encender el DOM
        document.addEventListener("DOMContentLoaded", () => this.init());
    }

    /**
     * Ciclo de inicialización integral del ecosistema Front-End.
     */
    init() {
        // 1. Ejecutar el cálculo topológico y renderizado inicial del diagrama
        this.refreshDiagram();

        // 2. Acoplar el Motor de Búsqueda con el Handler de Interacción Espacial
        if (window.searchEngine && window.interactionHandler) {
            window.searchEngine.onResultSelect((result) => {
                if (result.type === "node") {
                    window.interactionHandler.panToNode(result.id);
                } else if (result.type === "module" && result.targetNodeId) {
                    window.interactionHandler.panToNode(result.targetNodeId);
                } else if (result.type === "route") {
                    window.interactionHandler.highlightRoute(result.id);
                    // Mover el foco al nodo final de la ruta seleccionada
                    const routeData = window.routesManager.getRoute(result.id);
                    if (routeData && routeData.nodes.length > 0) {
                        const lastNodeId = routeData.nodes[routeData.nodes.length - 1];
                        window.interactionHandler.panToNode(lastNodeId);
                    }
                }
            });
        }

        // 3. Registrar los Escuchadores de Eventos para la Barra de Herramientas (Toolbar)
        this.bindToolbarActions();

        // 4. Forzar encuadre óptimo inicial automático con retardo leve para garantizar render de fuentes
        setTimeout(() => {
            if (window.interactionHandler) {
                window.interactionHandler.zoomToFit();
            }
        }, 300);
    }

    /**
     * Invoca los motores distribuidos para procesar y pintar la topología en el canvas.
     */
    refreshDiagram() {
        if (window.treeLayoutEngine && window.treeRenderer) {
            const layoutResult = window.treeLayoutEngine.computeLayout();
            window.treeRenderer.render(layoutResult);
        }
    }

    /**
     * Enlaza los botones de control de la cabecera y desencadena las acciones solicitadas.
     */
    bindToolbarActions() {
        // Control Global de Expansión (Resaltado unificado de la totalidad de nodos)
        const btnExpandAll = document.getElementById("btn-expand-all");
        if (btnExpandAll) {
            btnExpandAll.addEventListener("click", () => {
                document.querySelectorAll(".svg-node-g").forEach(el => {
                    el.classList.add("highlighted");
                });
                document.querySelectorAll(".svg-edge").forEach(el => {
                    el.classList.add("highlighted");
                });
            });
        }

        // Control Global de Contracción / Limpieza de Estados Activos
        const btnCollapseAll = document.getElementById("btn-collapse-all");
        if (btnCollapseAll) {
            btnCollapseAll.addEventListener("click", () => {
                document.querySelectorAll(".svg-node-g").forEach(el => {
                    el.classList.remove("highlighted", "selected");
                });
                document.querySelectorAll(".svg-edge").forEach(el => {
                    el.classList.remove("highlighted");
                });
                if (window.interactionHandler) {
                    window.interactionHandler.closeSidebar();
                }
                if (window.searchEngine) {
                    window.searchEngine.clearSearch();
                }
            });
        }

        // Acciones nativas de exportación de diagramación
        const btnExportSVG = document.getElementById("btn-export-svg");
        if (btnExportSVG && window.exportController) {
            btnExportSVG.addEventListener("click", () => {
                window.exportController.exportToSVG();
            });
        }

        const btnExportPNG = document.getElementById("btn-export-png");
        if (btnExportPNG && window.exportController) {
            btnExportPNG.addEventListener("click", () => {
                window.exportController.exportToPNG();
            });
        }
    }
}

// Instanciar el disparador e iniciar la ejecución inmediata del árbol de decisión
window.appBootstrap = new ApplicationBootstrap();