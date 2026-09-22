/**
 * js/sample-calculator.js
 * Calculadora de tamaño de muestra acumulada: registra las elecciones de Sexo,
 * Grupo de Edad, Departamento, Zona y Régimen que la persona va marcando en el
 * árbol y busca el tamaño de muestra (n) correspondiente en SampleSizeData.
 * El resultado solo se revela cuando además se recorrió toda la ruta hasta un
 * módulo final (Entidad > Servicio > Módulo), no apenas al completar las 5
 * dimensiones demográficas.
 */

/**
 * Traduce cada nodo elegible del árbol a su dimensión de muestreo y al valor
 * exacto usado en la tabla SampleSizeData (data/samples.js).
 */
const SAMPLE_DIMENSION_MAP = {
    sexo_hombre: { dimension: "sexo", label: "Hombre", value: "MASCULINO" },
    sexo_mujer: { dimension: "sexo", label: "Mujer", value: "FEMENINO" },

    grupo_edad_0_9: { dimension: "edad", label: "0–9 años", value: "00-09" },
    grupo_edad_10_19: { dimension: "edad", label: "10–19 años", value: "10-19" },
    grupo_edad_20_29: { dimension: "edad", label: "20–29 años", value: "20-29" },
    grupo_edad_30_39: { dimension: "edad", label: "30–39 años", value: "30-39" },
    grupo_edad_40_49: { dimension: "edad", label: "40–49 años", value: "40-49" },
    grupo_edad_50_59: { dimension: "edad", label: "50–59 años", value: "50-59" },
    grupo_edad_60_mas: { dimension: "edad", label: "60+ años", value: "60 o más" },

    depto_bogota: { dimension: "depto", label: "Bogotá", value: "depto_bogota" },
    depto_oriental: { dimension: "depto", label: "Oriental", value: "depto_oriental" },
    depto_caribe: { dimension: "depto", label: "Caribe", value: "depto_caribe" },
    depto_central: { dimension: "depto", label: "Central", value: "depto_central" },
    depto_pacifica: { dimension: "depto", label: "Pacífica", value: "depto_pacifica" },
    depto_orinoquia: { dimension: "depto", label: "Orinoquía-Amazonía", value: "depto_orinoquia" },

    zona_urbano: { dimension: "zona", label: "Urbano", value: "URBANO" },
    zona_rural: { dimension: "zona", label: "Rural", value: "RURAL" },

    regimen_contributivo: { dimension: "regimen", label: "Contributivo", value: "CONTRIBUTIVO" },
    regimen_subsidiado: { dimension: "regimen", label: "Subsidiado", value: "SUBSIDIADO" },

    // Módulos finales: marcan que la ruta se recorrió por completo (Entidad > Servicio > Módulo).
    // No participan en la búsqueda de "n" (que solo depende de sexo/edad/depto/régimen),
    // solo habilitan la revelación del resultado una vez alcanzado el final de alguna de las 9 rutas.
    eps_m1: { dimension: "modulo", label: "EPS Módulo 1" },
    eps_m2: { dimension: "modulo", label: "EPS Módulo 2" },
    eps_m3: { dimension: "modulo", label: "EPS Módulo 3" },
    ips_m1: { dimension: "modulo", label: "IPS Módulo 1" },
    ips_m2: { dimension: "modulo", label: "IPS Módulo 2" },
    ips_m3: { dimension: "modulo", label: "IPS Módulo 3" },
    ips_m4: { dimension: "modulo", label: "IPS Módulo 4" },
    gestor_m1: { dimension: "modulo", label: "Gestor Módulo 1" }
};

class SampleCalculatorController {
    constructor() {
        this.selection = { sexo: null, edad: null, depto: null, zona: null, regimen: null, modulo: null };

        this.panelEl = document.getElementById("sample-panel");
        this.resultEl = document.getElementById("sample-result-value");
        this.hintEl = document.getElementById("sample-result-hint");
        this.summaryEls = {
            sexo: document.getElementById("sample-summary-sexo"),
            edad: document.getElementById("sample-summary-edad"),
            depto: document.getElementById("sample-summary-depto"),
            zona: document.getElementById("sample-summary-zona"),
            regimen: document.getElementById("sample-summary-regimen"),
            modulo: document.getElementById("sample-summary-modulo")
        };

        const resetBtn = document.getElementById("btn-sample-reset");
        if (resetBtn) resetBtn.addEventListener("click", () => this.reset());

        this.render();
    }

    /**
     * Registra la elección de un nodo si pertenece a alguna de las dimensiones
     * de muestreo (Sexo, Edad, Departamento, Zona, Régimen), marcándolo visualmente
     * como "chosen" y liberando la elección previa de esa misma dimensión.
     * @param {string} nodeId
     * @returns {boolean} true si el nodo pertenece a una dimensión de muestreo
     */
    registerNodeSelection(nodeId) {
        const meta = SAMPLE_DIMENSION_MAP[nodeId];
        if (!meta) return false;

        const previousNodeId = this.selection[meta.dimension];
        if (previousNodeId && previousNodeId !== nodeId) {
            const prevEl = document.getElementById(`node-${previousNodeId}`);
            if (prevEl) prevEl.classList.remove("chosen");
        }

        this.selection[meta.dimension] = nodeId;
        const nodeEl = document.getElementById(`node-${nodeId}`);
        if (nodeEl) nodeEl.classList.add("chosen");

        this.render();
        return true;
    }

    /**
     * Limpia por completo la selección acumulada y su marcado visual en el árbol.
     */
    reset() {
        Object.values(this.selection).forEach(nodeId => {
            if (!nodeId) return;
            const el = document.getElementById(`node-${nodeId}`);
            if (el) el.classList.remove("chosen");
        });
        this.selection = { sexo: null, edad: null, depto: null, zona: null, regimen: null, modulo: null };
        this.render();
    }

    /**
     * Busca el tamaño de muestra exacto para la combinación actual. El resultado solo se
     * revela cuando, además de las 5 dimensiones demográficas, se ha alcanzado un módulo
     * final (fin real de alguna de las 9 rutas): Entidad > Servicio > Módulo.
     * @returns {number|null} n si toda la ruta fue recorrida, null si aún falta algún tramo.
     */
    computeSampleSize() {
        const { sexo, edad, depto, zona, regimen, modulo } = this.selection;
        if (!sexo || !edad || !depto || !zona || !regimen || !modulo) return null;

        const sexoVal = SAMPLE_DIMENSION_MAP[sexo].value;
        const edadVal = SAMPLE_DIMENSION_MAP[edad].value;
        const zonaVal = SAMPLE_DIMENSION_MAP[zona].value;
        const regimenVal = SAMPLE_DIMENSION_MAP[regimen].value;

        const match = SampleSizeData.find(row =>
            row.deptoId === depto &&
            row.regimen === regimenVal &&
            row.sexo === sexoVal &&
            row.rangoEdad10 === edadVal &&
            row.zona === zonaVal
        );

        return match ? match.n : 0;
    }

    /**
     * Actualiza el panel flotante con el estado de las 6 dimensiones y el resultado.
     */
    render() {
        if (!this.panelEl) return;

        Object.keys(this.summaryEls).forEach(dimension => {
            const el = this.summaryEls[dimension];
            if (!el) return;

            const nodeId = this.selection[dimension];
            el.textContent = nodeId ? SAMPLE_DIMENSION_MAP[nodeId].label : "Pendiente";
            el.classList.toggle("pending", !nodeId);
        });

        const n = this.computeSampleSize();
        if (this.resultEl) this.resultEl.textContent = n === null ? "—" : n;
        if (this.hintEl) this.hintEl.classList.toggle("hidden", n !== null);
        this.panelEl.classList.toggle("complete", n !== null);
    }
}

// Exportar la instancia única de la calculadora al entorno global de la aplicación
window.sampleCalculator = new SampleCalculatorController();
