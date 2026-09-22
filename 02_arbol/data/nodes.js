/**
 * data/nodes.js
 * Registro maestro con la totalidad de los nodos obligatorios para el árbol de decisión.
 * Cada nodo incluye su tipo, bloque asociado, identificador único y etiqueta de visualización.
 */

const NodesData = [
    // ==========================================================================
    // BLOQUE 1: IDENTIFICACIÓN Y CARACTERIZACIÓN (Variables Derivadas/Capturadas)
    // ==========================================================================
    { id: "cedula", label: "Cédula", type: "base", block: "BLOQUE_1" },
    { id: "sexo", label: "Sexo", type: "base", block: "BLOQUE_1" },
    { id: "sexo_hombre", label: "Hombre", type: "base", block: "BLOQUE_1" },
    { id: "sexo_mujer", label: "Mujer", type: "base", block: "BLOQUE_1" },
    { id: "edad", label: "Edad", type: "base", block: "BLOQUE_1" },
    { id: "grupo_edad_0_9", label: "0–9", type: "base", block: "BLOQUE_1" },
    { id: "grupo_edad_10_19", label: "10–19", type: "base", block: "BLOQUE_1" },
    { id: "grupo_edad_20_29", label: "20–29", type: "base", block: "BLOQUE_1" },
    { id: "grupo_edad_30_39", label: "30–39", type: "base", block: "BLOQUE_1" },
    { id: "grupo_edad_40_49", label: "40–49", type: "base", block: "BLOQUE_1" },
    { id: "grupo_edad_50_59", label: "50–59", type: "base", block: "BLOQUE_1" },
    { id: "grupo_edad_60_mas", label: "60+", type: "base", block: "BLOQUE_1" },
    { id: "departamento", label: "Departamento", type: "base", block: "BLOQUE_1" },
    { id: "depto_bogota", label: "Bogotá", type: "base", block: "BLOQUE_1" },
    { id: "depto_oriental", label: "Oriental", type: "base", block: "BLOQUE_1" },
    { id: "depto_caribe", label: "Caribe", type: "base", block: "BLOQUE_1" },
    { id: "depto_central", label: "Central", type: "base", block: "BLOQUE_1" },
    { id: "depto_pacifica", label: "Pacífica", type: "base", block: "BLOQUE_1" },
    { id: "depto_orinoquia", label: "Orinoquía-Amazonía", type: "base", block: "BLOQUE_1" },
    { id: "zona", label: "Zona", type: "base", block: "BLOQUE_1" },
    { id: "zona_urbano", label: "Urbano", type: "base", block: "BLOQUE_1" },
    { id: "zona_rural", label: "Rural", type: "base", block: "BLOQUE_1" },
    { id: "regimen", label: "Régimen", type: "base", block: "BLOQUE_1" },
    { id: "regimen_contributivo", label: "Contributivo", type: "base", block: "BLOQUE_1" },
    { id: "regimen_subsidiado", label: "Subsidiado", type: "base", block: "BLOQUE_1" },

    // ==========================================================================
    // BLOQUE 2: PARTE 2 — PREGUNTAS COMUNES (respuestas directas del usuario)
    // ==========================================================================
    { id: "parte2", label: "Responde Parte 2 (preguntas comunes)", type: "base", block: "BLOQUE_2" },

    // ==========================================================================
    // BLOQUE 2B: SORTEO BERNOULLI (solo primer ingreso; define acceso a Parte 3)
    // ==========================================================================
    { id: "sorteo_bernoulli", label: "Sorteo Bernoulli u~U(0,1), π=0,8", type: "decision", block: "BLOQUE_2B" },
    { id: "fin_sin_parte3", label: "Fin de la encuesta (sin Parte 3)", type: "base", block: "BLOQUE_2B" },

    // ==========================================================================
    // BLOQUE 3: ELECCIÓN DE PRESTADOR (el usuario elige cuál evaluar,
    // entre los prestadores habilitados en BDUA y no bloqueados)
    // ==========================================================================
    { id: "entidad_eps", label: "Empresa Prestadora (EPS)", type: "entidad", block: "BLOQUE_3" },
    { id: "entidad_ips", label: "Institución Prestadora (IPS)", type: "entidad", block: "BLOQUE_3" },
    { id: "entidad_gestor", label: "Entidad Gestora Farmacéutica", type: "entidad", block: "BLOQUE_3" },

    // ==========================================================================
    // BLOQUE 4: ASIGNACIÓN ALEATORIA DE MÓDULO DENTRO DEL PRESTADOR ELEGIDO
    // ==========================================================================
    { id: "asignacion_eps", label: "Asignación aleatoria (P=1/3 por módulo)", type: "decision", block: "BLOQUE_4" },
    { id: "asignacion_ips", label: "Asignación aleatoria (P=1/4 por módulo)", type: "decision", block: "BLOQUE_4" },

    // ==========================================================================
    // BLOQUE 5: MÓDULOS FINALES (Parte 3)
    // ==========================================================================
    { id: "eps_m1", label: "EPS Módulo 1", type: "modulo", block: "MODULO_EPS_M1" },
    { id: "eps_m2", label: "EPS Módulo 2", type: "modulo", block: "MODULO_EPS_M2" },
    { id: "eps_m3", label: "EPS Módulo 3", type: "modulo", block: "MODULO_EPS_M3" },
    { id: "ips_m1", label: "IPS Módulo 1", type: "modulo", block: "MODULO_IPS_M1" },
    { id: "ips_m2", label: "IPS Módulo 2", type: "modulo", block: "MODULO_IPS_M2" },
    { id: "ips_m3", label: "IPS Módulo 3", type: "modulo", block: "MODULO_IPS_M3" },
    { id: "ips_m4", label: "IPS Módulo 4", type: "modulo", block: "MODULO_IPS_M4" },
    { id: "gestor_m1", label: "Gestor Módulo 1", type: "modulo", block: "MODULO_GESTOR_M1" }
];

// Congelar la colección para asegurar la integridad e inmutabilidad de la estructura de nodos
Object.freeze(NodesData);
