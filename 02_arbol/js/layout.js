/**
 * js/layout.js
 * Motor de distribución automatizado modificado para ordenación VERTICAL.
 */

class TreeLayoutEngine {
    constructor() {
        this.nodeWidth = 180;
        this.nodeHeight = 60;
        this.colGap = 40;  // Separación horizontal entre hermanos de nivel
        this.rowGap = 90;  // Separación vertical entre etapas
    }

    computeLayout() {
        const nodeRanks = this.assignRanks();
        const rows = {};

        // Agrupar nodos por su fila (Rank)
        NodesData.forEach(node => {
            const rank = nodeRanks[node.id] || 0;
            if (!rows[rank]) rows[rank] = [];
            rows[rank].push(node);
        });

        const positionedNodes = [];
        const nodeMap = {};
        const canvasWidth = 2200; // Espacio horizontal ampliado para equilibrar las ramas inferiores

        Object.keys(rows).forEach(rankStr => {
            const rank = parseInt(rankStr);
            const nodesInRow = rows[rank];
            
            // La coordenada Y depende directamente del rango secuencial (Hacia abajo)
            const posY = rank * (this.nodeHeight + this.rowGap) + 60;
            
            const totalRowWidth = (nodesInRow.length * this.nodeWidth) + ((nodesInRow.length - 1) * this.colGap);
            const startX = (canvasWidth - totalRowWidth) / 2;

            nodesInRow.forEach((node, index) => {
                const posX = startX + index * (this.nodeWidth + this.colGap);
                
                const nodeCopy = {
                    ...node,
                    x: posX,
                    y: posY,
                    width: this.nodeWidth,
                    height: this.nodeHeight
                };
                
                positionedNodes.push(nodeCopy);
                nodeMap[node.id] = nodeCopy;
            });
        });

        // Enrutar líneas de flujo de forma ortogonal vertical
        const processedEdges = EdgesData.map(edge => {
            const source = nodeMap[edge.source];
            const target = nodeMap[edge.target];

            if (!source || !target) return null;

            // Anclajes: Punto medio inferior del padre al punto medio superior del hijo
            const startX = source.x + source.width / 2;
            const startY = source.y + source.height;
            const endX = target.x + target.width / 2;
            const endY = target.y;

            // Quiebre a 90 grados a mitad de camino en el eje vertical
            const midY = startY + (endY - startY) / 2;
            const pathData = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;

            return {
                ...edge,
                path: pathData,
                textX: startX + (endX - startX) / 2,
                textY: midY - 6
            };
        }).filter(e => e !== null);

        return { nodes: positionedNodes, edges: processedEdges };
    }

    assignRanks() {
        return {
            "cedula": 0,
            "sexo": 1, "sexo_hombre": 2, "sexo_mujer": 2,
            "edad": 3,
            "grupo_edad_0_9": 4, "grupo_edad_10_19": 4, "grupo_edad_20_29": 4, "grupo_edad_30_39": 4, "grupo_edad_40_49": 4, "grupo_edad_50_59": 4, "grupo_edad_60_mas": 4,
            "departamento": 5,
            "depto_bogota": 6, "depto_oriental": 6, "depto_caribe": 6, "depto_central": 6, "depto_pacifica": 6, "depto_orinoquia": 6,
            "zona": 7, "zona_urbano": 8, "zona_rural": 8,
            "regimen": 9, "regimen_contributivo": 10, "regimen_subsidiado": 10,
            "parte2": 11,
            "sorteo_bernoulli": 12,
            "fin_sin_parte3": 13, "entidad_eps": 13, "entidad_ips": 13, "entidad_gestor": 13,
            "asignacion_eps": 14, "asignacion_ips": 14,
            "eps_m1": 15, "eps_m2": 15, "eps_m3": 15, "ips_m1": 15, "ips_m2": 15, "ips_m3": 15, "ips_m4": 15, "gestor_m1": 15
        };
    }
}

window.treeLayoutEngine = new TreeLayoutEngine();