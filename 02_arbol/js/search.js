/**
 * js/search.js
 * Motor de búsqueda unificado y control de autocompletado en cascada.
 * Permite localizar nodos por ID, etiquetas, módulos o rutas asociadas en tiempo real.
 */

class SearchEngine {
    constructor() {
        this.inputEl = document.getElementById("search-input");
        this.clearBtn = document.getElementById("btn-clear-search");
        this.dropdownEl = document.getElementById("search-results-dropdown");
        this.onResultSelectCallback = null;
        
        this.initEvents();
    }

    /**
     * Inicializa los escuchadores de eventos para el buscador nativo.
     */
    initEvents() {
        if (!this.inputEl) return;

        this.inputEl.addEventListener("input", (e) => this.handleInput(e.target.value));
        this.inputEl.addEventListener("focus", (e) => this.handleInput(e.target.value));
        
        if (this.clearBtn) {
            this.clearBtn.addEventListener("click", () => this.clearSearch());
        }

        // Cerrar el menú desplegable si se hace clic fuera del buscador
        document.addEventListener("click", (e) => {
            if (!this.inputEl.contains(e.target) && !this.dropdownEl.contains(e.target)) {
                this.hideDropdown();
            }
        });
    }

    /**
     * Registra un callback externo para ejecutarse al seleccionar un resultado.
     * @param {Function} callback 
     */
    onResultSelect(callback) {
        this.onResultSelectCallback = callback;
    }

    /**
     * Gestiona el comportamiento de búsqueda al escribir texto.
     * @param {string} query 
     */
    handleInput(query) {
        const cleanQuery = query.trim().toLowerCase();

        if (!cleanQuery) {
            this.clearBtn.classList.remove("visible");
            this.hideDropdown();
            return;
        }

        this.clearBtn.classList.add("visible");
        const results = this.performSearch(cleanQuery);
        this.renderResults(results);
    }

    /**
     * Ejecuta el filtrado relacional en nodos, módulos y rutas de la encuesta.
     * @param {string} query 
     * @returns {Array<Object>}
     */
    performSearch(query) {
        const matches = [];

        // 1. Buscar en Nodos Obligatorios
        NodesData.forEach(node => {
            if (node.label.toLowerCase().includes(query) || node.id.toLowerCase().includes(query)) {
                matches.push({
                    id: node.id,
                    title: node.label,
                    meta: `Nodo • Identificador: ${node.id}`,
                    type: "node"
                });
            }
        });

        // 2. Buscar en Bloques / Módulos
        for (const key in ModulesData) {
            const mod = ModulesData[key];
            if (mod.name.toLowerCase().includes(query) || mod.description.toLowerCase().includes(query)) {
                matches.push({
                    id: mod.id,
                    title: mod.name,
                    meta: mod.questionsCount ? `Módulo Final • ${mod.questionsCount} preguntas` : "Bloque Estructural",
                    type: "module",
                    targetNodeId: this.findFirstNodeOfBlock(mod.id)
                });
            }
        }

        // 3. Buscar en las 9 Rutas Reglamentarias
        const allRoutes = window.routesManager.getAllRoutes();
        for (const key in allRoutes) {
            const route = allRoutes[key];
            if (route.name.toLowerCase().includes(query) || route.description.toLowerCase().includes(query)) {
                matches.push({
                    id: route.id,
                    title: route.name,
                    meta: "Ruta Flujo Completo",
                    type: "route"
                });
            }
        }

        return matches.slice(0, 10); // Limitar a los 10 resultados más relevantes
    }

    /**
     * Localiza el primer nodo que pertenece a un bloque determinado para saltar a él.
     * @param {string} blockId 
     * @returns {string|null}
     */
    findFirstNodeOfBlock(blockId) {
        const found = NodesData.find(n => n.block === blockId || n.id.toLowerCase() === blockId.toLowerCase().replace("modulo_", "").toLowerCase());
        return found ? found.id : null;
    }

    /**
     * Renderiza dinámicamente el listado de resultados en el dropdown.
     * @param {Array<Object>} results 
     */
    renderResults(results) {
        if (!this.dropdownEl) return;

        if (results.length === 0) {
            this.dropdownEl.innerHTML = `<div class="search-result-item"><span class="search-result-title">Sin resultados</span><span class="search-result-meta">Pruebe con otros términos</span></div>`;
            this.dropdownEl.classList.remove("hidden");
            return;
        }

        this.dropdownEl.innerHTML = "";
        results.forEach(res => {
            const item = document.createElement("div");
            item.className = "search-result-item";
            item.innerHTML = `
                <span class="search-result-title">${res.title}</span>
                <span class="search-result-meta">${res.meta}</span>
            `;
            
            item.addEventListener("click", () => {
                if (this.onResultSelectCallback) {
                    this.onResultSelectCallback(res);
                }
                this.hideDropdown();
            });
            
            this.dropdownEl.appendChild(item);
        });

        this.dropdownEl.classList.remove("hidden");
    }

    /**
     * Oculta el contenedor del menú desplegable.
     */
    hideDropdown() {
        if (this.dropdownEl) this.dropdownEl.classList.add("hidden");
    }

    /**
     * Restablece el buscador y limpia la caja de texto.
     */
    clearSearch() {
        if (this.inputEl) this.inputEl.value = "";
        if (this.clearBtn) this.clearBtn.classList.remove("visible");
        this.hideDropdown();
    }
}

// Inicializar y registrar el motor de búsqueda en el entorno global de la ventana
window.searchEngine = new SearchEngine();