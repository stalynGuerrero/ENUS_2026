/**
 * js/tree.js
 * Inyector de gráficos SVG nativos en el DOM de la aplicación.
 */

class TreeRenderer {
    constructor() {
        this.nodesLayer = document.getElementById("nodes-layer");
        this.edgesLayer = document.getElementById("edges-layer");
    }

    render(layoutData) {
        if (!this.nodesLayer || !this.edgesLayer) return;
        this.nodesLayer.innerHTML = "";
        this.edgesLayer.innerHTML = "";

        // Pintar aristas
        layoutData.edges.forEach(edge => {
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("id", `edge-${edge.source}-${edge.target}`);
            path.setAttribute("d", edge.path);
            path.setAttribute("class", "svg-edge");
            path.setAttribute("marker-end", "url(#arrowhead)");
            g.appendChild(path);

            if (edge.label) {
                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", edge.textX);
                text.setAttribute("y", edge.textY);
                text.setAttribute("class", "svg-edge-text");
                text.setAttribute("text-anchor", "middle");
                text.textContent = edge.label;
                g.appendChild(text);
            }
            this.edgesLayer.appendChild(g);
        });

        // Pintar nodos
        layoutData.nodes.forEach(node => {
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.setAttribute("id", `node-${node.id}`);
            g.setAttribute("class", `svg-node-g node-type-${node.type}`);

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", node.x);
            rect.setAttribute("y", node.y);
            rect.setAttribute("width", node.width);
            rect.setAttribute("height", node.height);
            rect.setAttribute("rx", "6");
            rect.setAttribute("class", "svg-node-rect");
            rect.setAttribute("filter", "url(#node-shadow)");
            g.appendChild(rect);

            const tId = document.createElementNS("http://www.w3.org/2000/svg", "text");
            tId.setAttribute("x", node.x + 10);
            tId.setAttribute("y", node.y + 20);
            tId.setAttribute("class", "svg-node-text-id");
            tId.textContent = node.id.toUpperCase();
            g.appendChild(tId);

            const tLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
            tLabel.setAttribute("x", node.x + 10);
            tLabel.setAttribute("y", node.y + 40);
            tLabel.setAttribute("class", "svg-node-text-label");
            tLabel.textContent = node.label.length > 24 ? node.label.substring(0, 22) + "..." : node.label;
            g.appendChild(tLabel);

            g.addEventListener("click", (e) => {
                e.stopPropagation();
                window.interactionHandler.selectNode(node.id);
            });

            g.addEventListener("mouseenter", (e) => {
                if (!window.tooltipController) return;
                const blockMeta = ModulesData[node.block];
                const description = blockMeta ? blockMeta.description : "Nodo operativo de flujo secuencial.";
                const extraInfo = blockMeta && blockMeta.questionsCount ? `${blockMeta.questionsCount} preguntas` : "";
                window.tooltipController.show(e, node.label, description, extraInfo);
            });

            g.addEventListener("mousemove", (e) => {
                if (window.tooltipController) window.tooltipController.updatePosition(e);
            });

            g.addEventListener("mouseleave", () => {
                if (window.tooltipController) window.tooltipController.hide();
            });

            this.nodesLayer.appendChild(g);
        });
    }
}

window.treeRenderer = new TreeRenderer();