/**
 * data/edges.js
 * Registro de conexiones (aristas/enlaces) del árbol de decisión.
 * Define el origen (source), destino (target) y etiquetas de transición opcionales.
 */

const EdgesData = [
    // ==========================================================================
    // JERARQUÍA DEL BLOQUE 1: CARACTERIZACIÓN (Flujo Estructural Base)
    // ==========================================================================
    { source: "cedula", target: "sexo" },
    { source: "sexo", target: "sexo_hombre" },
    { source: "sexo", target: "sexo_mujer" },
    
    { source: "sexo_hombre", target: "edad" },
    { source: "sexo_mujer", target: "edad" },
    
    { source: "edad", target: "grupo_edad_0_9" },
    { source: "edad", target: "grupo_edad_10_19" },
    { source: "edad", target: "grupo_edad_20_29" },
    { source: "edad", target: "grupo_edad_30_39" },
    { source: "edad", target: "grupo_edad_40_49" },
    { source: "edad", target: "grupo_edad_50_59" },
    { source: "edad", target: "grupo_edad_60_mas" },
    
    { source: "grupo_edad_0_9", target: "departamento" },
    { source: "grupo_edad_10_19", target: "departamento" },
    { source: "grupo_edad_20_29", target: "departamento" },
    { source: "grupo_edad_30_39", target: "departamento" },
    { source: "grupo_edad_40_49", target: "departamento" },
    { source: "grupo_edad_50_59", target: "departamento" },
    { source: "grupo_edad_60_mas", target: "departamento" },
    
    { source: "departamento", target: "depto_bogota" },
    { source: "departamento", target: "depto_oriental" },
    { source: "departamento", target: "depto_caribe" },
    { source: "departamento", target: "depto_central" },
    { source: "departamento", target: "depto_pacifica" },
    { source: "departamento", target: "depto_orinoquia" },
    
    { source: "depto_bogota", target: "zona" },
    { source: "depto_oriental", target: "zona" },
    { source: "depto_caribe", target: "zona" },
    { source: "depto_central", target: "zona" },
    { source: "depto_pacifica", target: "zona" },
    { source: "depto_orinoquia", target: "zona" },
    
    { source: "zona", target: "zona_urbano" },
    { source: "zona", target: "zona_rural" },
    
    { source: "zona_urbano", target: "regimen" },
    { source: "zona_rural", target: "regimen" },
    
    { source: "regimen", target: "regimen_contributivo" },
    { source: "regimen", target: "regimen_subsidiado" },

    // Conexión unificada de la caracterización hacia Parte 2 (preguntas comunes)
    { source: "regimen_contributivo", target: "parte2" },
    { source: "regimen_subsidiado", target: "parte2" },

    // Al finalizar Parte 2, se ejecuta el sorteo Bernoulli (solo primer ingreso)
    { source: "parte2", target: "sorteo_bernoulli" },

    // ==========================================================================
    // ENRUTAMIENTO LÓGICO DE LOS 9 DESENLACES POSIBLES DEL MECANISMO
    // (sorteo Bernoulli -> elección de prestador -> asignación aleatoria de módulo)
    // ==========================================================================

    // DESENLACE 0: u > 0,8 -> la encuesta finaliza sin Parte 3
    { source: "sorteo_bernoulli", target: "fin_sin_parte3", label: "NO (u>0,8)" },

    // u <= 0,8 -> el usuario elige cuál prestador evaluar (entre los habilitados y no bloqueados)
    { source: "sorteo_bernoulli", target: "entidad_eps", label: "SI (u≤0,8)" },
    { source: "sorteo_bernoulli", target: "entidad_ips", label: "SI (u≤0,8)" },
    { source: "sorteo_bernoulli", target: "entidad_gestor", label: "SI (u≤0,8)" },

    // Asignación aleatoria de módulo dentro de la EPS elegida (P = 1/3 por módulo)
    { source: "entidad_eps", target: "asignacion_eps" },
    { source: "asignacion_eps", target: "eps_m1", label: "1/3" }, // Desenlace 1
    { source: "asignacion_eps", target: "eps_m2", label: "1/3" }, // Desenlace 2
    { source: "asignacion_eps", target: "eps_m3", label: "1/3" }, // Desenlace 3

    // Asignación aleatoria de módulo dentro de la IPS elegida (P = 1/4 por módulo)
    { source: "entidad_ips", target: "asignacion_ips" },
    { source: "asignacion_ips", target: "ips_m1", label: "1/4" }, // Desenlace 4
    { source: "asignacion_ips", target: "ips_m2", label: "1/4" }, // Desenlace 5
    { source: "asignacion_ips", target: "ips_m3", label: "1/4" }, // Desenlace 6
    { source: "asignacion_ips", target: "ips_m4", label: "1/4" }, // Desenlace 7

    // Gestor farmacéutico: módulo único, sin asignación probabilística (P = 1)
    { source: "entidad_gestor", target: "gestor_m1", label: "1 (único módulo)" } // Desenlace 8
];

// Congelar la colección para asegurar la inmutabilidad de la matriz topológica de enlaces
Object.freeze(EdgesData);