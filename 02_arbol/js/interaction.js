/**
 * js/interaction.js
 * Control de transformaciones espaciales (Pan & Zoom) e iluminación dinámica de flujos.
 */

class InteractionHandler {
    constructor() {
        this.containerEl = document.getElementById("canvas-container");
        this.svgEl = document.getElementById("svg-canvas");
        this.viewportEl = document.getElementById("viewport-group");
        
        this.scale = 0.8;
        this.panX = 100;
        this.panY = 20;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;

        this.initPanZoomEvents();
        this.initUIEvents();
    }

    initPanZoomEvents() {
        if (!this.containerEl) return;

        this.containerEl.addEventListener("wheel", (e) => {
            e.preventDefault();
            const zoomFactor = 0.05;
            if (e.deltaY < 0) {
                this.scale = Math.min(this.scale + zoomFactor, 2.5);
            } else {
                this.scale = Math.max(this.scale - zoomFactor, 0.2);
            }
            this.applyTransform();
        }, { passive: false });

        this.containerEl.addEventListener("mousedown", (e) => {
            if (e.button !== 0 || e.target.closest(".svg-node-g")) return;
            this.isDragging = true;
            this.startX = e.clientX - this.panX;
            this.startY = e.clientY - this.panY;
        });

        window.addEventListener("mousemove", (e) => {
            if (!this.isDragging) return;
            this.panX = e.clientX - this.startX;
            this.panY = e.clientY - this.startY;
            this.applyTransform();
        });

        window.addEventListener("mouseup", () => this.isDragging = false);
    }

    initUIEvents() {
        const closeBtn = document.getElementById("btn-close-sidebar");
        if (closeBtn) closeBtn.addEventListener("click", () => this.closeSidebar());

        const fitBtn = document.getElementById("btn-zoom-fit");
        if (fitBtn) fitBtn.addEventListener("click", () => this.zoomToFit());
    }

    applyTransform() {
        if (this.viewportEl) {
            this.viewportEl.setAttribute("transform", `translate(${this.panX}, ${this.panY}) scale(${this.scale})`);
        }
    }

    zoomToFit() {
        if (!this.viewportEl || !this.containerEl) return;
        const bbox = this.viewportEl.getBBox();
        const cWidth = this.containerEl.clientWidth;
        
        this.scale = Math.min((cWidth - 60) / bbox.width, 0.85);
        this.panX = (cWidth - bbox.width * this.scale) / 2 - bbox.x * this.scale;
        this.panY = 40; 
        this.applyTransform();
    }

    /**
     * ILUMINACIÓN DEL CAMINO ELEGIDO
     * Enciende de manera progresiva y secuencial los nodos y líneas que conforman una ruta reglamentaria.
     */
    highlightRoute(routeId) {
        const route = window.routesManager.getRoute(routeId);
        if (!route) return;
        this.highlightNodePath(route.nodes);
    }

    /**
     * Enciende de manera progresiva y secuencial los nodos y líneas de un camino arbitrario
     * (secuencia ordenada de IDs de nodo desde la raíz hasta el destino).
     * @param {Array<string>} nodePath
     */
    highlightNodePath(nodePath) {
        if (!nodePath || nodePath.length === 0) return;

        // Limpiar flujos activos previos
        document.querySelectorAll(".svg-edge").forEach(el => el.classList.remove("highlighted"));
        document.querySelectorAll(".svg-node-g").forEach(el => el.classList.remove("highlighted"));

        // Considerar TODAS las aristas cuyos dos extremos están en el camino, no solo pares
        // consecutivos: un tramo compartido puede incluir varios nodos hermanos de un mismo
        // nivel (ej. Hombre y Mujer), cada uno con su propia arista hacia el siguiente nodo.
        const pathSet = new Set(nodePath);
        const relevantEdges = EdgesData.filter(edge => pathSet.has(edge.source) && pathSet.has(edge.target));

        // Recorrido con timming dinámico para simular el fluido eléctrico por el camino
        nodePath.forEach((nodeId, index) => {
            setTimeout(() => {
                const nodeEl = document.getElementById(`node-${nodeId}`);
                if (nodeEl) nodeEl.classList.add("highlighted");

                // Encender toda arista que parta de este nodo hacia otro nodo del camino
                relevantEdges
                    .filter(edge => edge.source === nodeId)
                    .forEach(edge => {
                        const edgeEl = document.getElementById(`edge-${edge.source}-${edge.target}`);
                        if (edgeEl) edgeEl.classList.add("highlighted");
                    });
            }, index * 60); // Retardo controlado de 60ms por tramo
        });
    }

    selectNode(nodeId) {
        document.querySelectorAll(".svg-node-g").forEach(el => el.classList.remove("selected"));
        const nodeEl = document.getElementById(`node-${nodeId}`);
        if (nodeEl) nodeEl.classList.add("selected");

        const nodeData = NodesData.find(n => n.id === nodeId);
        if (nodeData) {
            this.openSidebar(nodeData);
            // Al hacer clic en un nodo, marcamos el camino real desde la raíz hasta ese nodo
            const pathToNode = window.routesManager.computePathToNode(nodeId);
            this.highlightNodePath(pathToNode);

            // Si el nodo es Sexo, Edad, Departamento o Régimen, alimenta la calculadora
            // de tamaño de muestra acumulada (ver js/sample-calculator.js)
            if (window.sampleCalculator) {
                window.sampleCalculator.registerNodeSelection(nodeId);
            }
        }
    }

    openSidebar(nodeData) {
        const sidebar = document.getElementById("sidebar-panel");
        if (!sidebar) return;

        const title = document.getElementById("sidebar-title");
        const idBadge = document.getElementById("sidebar-node-id");
        const typeText = document.getElementById("sidebar-node-type");
        const desc = document.getElementById("sidebar-node-description");
        const moduleInfo = document.getElementById("sidebar-module-info");
        const moduleCount = document.getElementById("sidebar-module-count");
        const routesList = document.getElementById("sidebar-routes-list");

        title.textContent = nodeData.label;
        if (idBadge) idBadge.textContent = nodeData.id;
        if (typeText) typeText.textContent = InteractionHandler.NODE_TYPE_LABELS[nodeData.type] || nodeData.type;

        const blockMeta = ModulesData[nodeData.block];
        desc.textContent = blockMeta ? blockMeta.description : "Nodo operativo de flujo secuencial.";

        if (moduleInfo && moduleCount) {
            if (blockMeta && blockMeta.questionsCount) {
                moduleCount.textContent = `${blockMeta.questionsCount} preguntas`;
                moduleInfo.classList.remove("hidden");
            } else {
                moduleInfo.classList.add("hidden");
            }
        }

        if (routesList) {
            routesList.innerHTML = "";
            const associatedRoutes = window.routesManager.getRoutesByNode(nodeData.id);
            associatedRoutes.forEach(route => {
                const item = document.createElement("li");
                item.className = "sidebar-route-item";
                item.textContent = route.name;
                item.title = route.description;
                item.addEventListener("click", () => this.highlightRoute(route.id));
                routesList.appendChild(item);
            });
        }

        sidebar.classList.remove("collapsed");
    }

    closeSidebar() {
        const sidebar = document.getElementById("sidebar-panel");
        if (sidebar) sidebar.classList.add("collapsed");
    }

    /**
     * Traduce el tipo técnico interno del nodo a una etiqueta legible para el panel lateral.
     */
    static get NODE_TYPE_LABELS() {
        return {
            base: "Variable Base",
            decision: "Pregunta de Decisión",
            entidad: "Entidad Gestora",
            modulo: "Módulo de Encuesta"
        };
    }

    panToNode(nodeId) {
        const nodeData = NodesData.find(n => n.id === nodeId);
        if (!nodeData || !this.containerEl) return;
        
        // Mover cámara al nodo localizado
        const layout = window.treeLayoutEngine.computeLayout();
        const nodeGeo = layout.nodes.find(n => n.id === nodeId);
        
        if (nodeGeo) {
            this.panX = this.containerEl.clientWidth / 2 - (nodeGeo.x + nodeGeo.width / 2) * this.scale;
            this.panY = this.containerEl.clientHeight / 3 - (nodeGeo.y + nodeGeo.height / 2) * this.scale;
            this.applyTransform();
            this.selectNode(nodeId);
        }
    }
}

window.interactionHandler = new InteractionHandler();