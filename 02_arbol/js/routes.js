/**
 * js/routes.js
 * Arquitectura de enrutamiento y lógica de trazabilidad de la encuesta.
 * Almacena e indexa secuencialmente los identificadores de nodos que componen cada ruta.
 */

class RoutesManager {
    constructor() {
        /**
         * Definición topológica secuencial de las 9 rutas del árbol de decisión.
         * Cada ruta contiene la lista exacta de nodos desde la raíz hasta el módulo final.
         */
        this.routes = {
            "ruta_0": {
                id: "ruta_0",
                name: "Desenlace 0: Sorteo negativo (sin Parte 3)",
                description: "El sorteo Bernoulli resulta u>0,8: la encuesta finaliza al terminar Parte 2, sin acceso a la elección de prestador ni a un módulo específico.",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "fin_sin_parte3"
                ]
            },
            "ruta_1": {
                id: "ruta_1",
                name: "Desenlace 1: EPS - Módulo 1 (asignación aleatoria)",
                description: "Sorteo positivo, el usuario elige evaluar EPS y el sistema le asigna al azar (P=1/3) el Módulo 1.",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "entidad_eps", "asignacion_eps", "eps_m1"
                ]
            },
            "ruta_2": {
                id: "ruta_2",
                name: "Desenlace 2: EPS - Módulo 2 (asignación aleatoria)",
                description: "Sorteo positivo, el usuario elige evaluar EPS y el sistema le asigna al azar (P=1/3) el Módulo 2.",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "entidad_eps", "asignacion_eps", "eps_m2"
                ]
            },
            "ruta_3": {
                id: "ruta_3",
                name: "Desenlace 3: EPS - Módulo 3 (asignación aleatoria)",
                description: "Sorteo positivo, el usuario elige evaluar EPS y el sistema le asigna al azar (P=1/3) el Módulo 3.",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "entidad_eps", "asignacion_eps", "eps_m3"
                ]
            },
            "ruta_4": {
                id: "ruta_4",
                name: "Desenlace 4: IPS - Módulo 1 (asignación aleatoria)",
                description: "Sorteo positivo, el usuario elige evaluar IPS y el sistema le asigna al azar (P=1/4) el Módulo 1.",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "entidad_ips", "asignacion_ips", "ips_m1"
                ]
            },
            "ruta_5": {
                id: "ruta_5",
                name: "Desenlace 5: IPS - Módulo 2 (asignación aleatoria)",
                description: "Sorteo positivo, el usuario elige evaluar IPS y el sistema le asigna al azar (P=1/4) el Módulo 2.",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "entidad_ips", "asignacion_ips", "ips_m2"
                ]
            },
            "ruta_6": {
                id: "ruta_6",
                name: "Desenlace 6: IPS - Módulo 3 (asignación aleatoria)",
                description: "Sorteo positivo, el usuario elige evaluar IPS y el sistema le asigna al azar (P=1/4) el Módulo 3.",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "entidad_ips", "asignacion_ips", "ips_m3"
                ]
            },
            "ruta_7": {
                id: "ruta_7",
                name: "Desenlace 7: IPS - Módulo 4 (asignación aleatoria)",
                description: "Sorteo positivo, el usuario elige evaluar IPS y el sistema le asigna al azar (P=1/4) el Módulo 4.",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "entidad_ips", "asignacion_ips", "ips_m4"
                ]
            },
            "ruta_8": {
                id: "ruta_8",
                name: "Desenlace 8: Gestor - Módulo 1 (único módulo)",
                description: "Sorteo positivo, el usuario elige evaluar el Gestor farmacéutico; al existir un único módulo, la asignación es determinística (P=1).",
                nodes: [
                    "cedula", "sexo", "sexo_hombre", "sexo_mujer", "edad",
                    "grupo_edad_0_9", "grupo_edad_10_19", "grupo_edad_20_29", "grupo_edad_30_39",
                    "grupo_edad_40_49", "grupo_edad_50_59", "grupo_edad_60_mas",
                    "departamento", "depto_bogota", "depto_oriental", "depto_caribe", "depto_central", "depto_pacifica", "depto_orinoquia",
                    "zona", "zona_urbano", "zona_rural", "regimen", "regimen_contributivo", "regimen_subsidiado",
                    "parte2", "sorteo_bernoulli", "entidad_gestor", "gestor_m1"
                ]
            }
        };
        Object.freeze(this.routes);
    }

    /**
     * Obtiene la estructura inmutable de una ruta por su ID.
     * @param {string} routeId
     * @returns {Object|null}
     */
    getRoute(routeId) {
        return this.routes[routeId] || null;
    }

    /**
     * Obtiene todas las rutas registradas.
     * @returns {Object}
     */
    getAllRoutes() {
        return this.routes;
    }

    /**
     * Retorna un arreglo con las rutas que contienen a un nodo específico.
     * Útil para poblar el panel dinámico lateral.
     * @param {string} nodeId 
     * @returns {Array<Object>}
     */
    getRoutesByNode(nodeId) {
        const matchingRoutes = [];
        for (const key in this.routes) {
            if (this.routes[key].nodes.includes(nodeId)) {
                matchingRoutes.push(this.routes[key]);
            }
        }
        return matchingRoutes;
    }

    /**
     * Calcula el camino real desde la raíz del árbol (Cédula) hasta el nodo indicado.
     *
     * Los Bloques 1 a 2B (caracterización + Parte 2 + sorteo Bernoulli) son un tronco común:
     * cada pregunta reconverge en una única siguiente pregunta sin importar la respuesta
     * previa (ej. Departamento sigue igual sea cual sea el Sexo o el Grupo de Edad elegido).
     * Elegir una sola rama "primera" ahí producía siempre el mismo camino arbitrario
     * (Hombre > 0-9 > Bogotá > Urbano > Contributivo). En su lugar, para ese tramo se listan
     * TODAS las opciones de cada nivel inferior y solo el nodo propio en el nivel del clic.
     *
     * Los Bloques 3 y 4 (Elección de prestador > Asignación aleatoria > Módulo) sí son una
     * bifurcación real, así que ese tramo se reconstruye remontando las aristas específicas
     * hasta el nodo del sorteo Bernoulli.
     *
     * @param {string} nodeId
     * @returns {Array<string>} Secuencia de IDs de nodos desde la raíz hasta el nodo.
     */
    computePathToNode(nodeId) {
        const ranks = window.treeLayoutEngine.assignRanks();
        const targetRank = ranks[nodeId];
        if (targetRank === undefined) return [nodeId];

        const traceRank = ranks["sorteo_bernoulli"];
        const sharedUpperRank = Math.min(targetRank, traceRank);

        const path = [];
        for (let r = 0; r <= sharedUpperRank; r++) {
            NodesData.forEach(node => {
                if (ranks[node.id] === r && (r < targetRank || node.id === nodeId)) {
                    path.push(node.id);
                }
            });
        }

        // Tramo institucional real (Bloques 3 y 4), remontado nodo a nodo desde el clic hasta B0
        if (targetRank > traceRank) {
            const institutionalPath = [nodeId];
            const visited = new Set([nodeId]);
            let current = nodeId;

            while (ranks[current] > traceRank) {
                const parentEdge = EdgesData.find(edge => edge.target === current && !visited.has(edge.source));
                if (!parentEdge) break;
                institutionalPath.unshift(parentEdge.source);
                visited.add(parentEdge.source);
                current = parentEdge.source;
            }

            path.push(...institutionalPath.filter(id => id !== "sorteo_bernoulli"));
        }

        return path;
    }
}

// Exportar la instancia única del gestor de rutas al entorno global de la aplicación
window.routesManager = new RoutesManager();