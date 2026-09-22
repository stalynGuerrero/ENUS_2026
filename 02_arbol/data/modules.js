/**
 * data/modules.js
 * Definición de los Bloques Estructurales y Módulos de la Encuesta Nacional de Salud.
 * Proporciona el contexto global de clasificación y conteo de preguntas.
 */

const ModulesData = {
    "BLOQUE_1": {
        id: "BLOQUE_1",
        name: "Identificación y Caracterización",
        description: "Variables sociodemográficas iniciales, caracterización territorial y régimen de afiliación en salud.",
        color: "var(--color-base-azul)"
    },
    "BLOQUE_2": {
        id: "BLOQUE_2",
        name: "Parte 2 — Preguntas comunes",
        description: "Preguntas de respuesta directa del usuario sobre experiencia general de atención y servicio (máx. 20-25 preguntas). Todas las personas que avanzan más allá de Parte 1 la responden; en ingresos posteriores al primero, ya completada, no se repite.",
        color: "var(--color-decision-naranja)"
    },
    "BLOQUE_2B": {
        id: "BLOQUE_2B",
        name: "Sorteo Bernoulli",
        description: "Al finalizar Parte 2 se genera u~Uniforme(0,1) con corte π=0,8: si u≤0,8 el usuario accede a Parte 3 (elección de prestador y módulo); si u>0,8 la encuesta finaliza. Aplica solo en el primer ingreso; en ingresos posteriores no hay sorteo y se accede directamente a la elección de prestador.",
        color: "var(--color-decision-naranja)"
    },
    "BLOQUE_3": {
        id: "BLOQUE_3",
        name: "Elección de prestador",
        description: "El usuario elige cuál prestador evaluar entre los que tiene habilitados en BDUA y que no estén bloqueados (el prestador evaluado en un ingreso anterior queda bloqueado 1 año calendario). Las entidades no se seleccionan probabilísticamente: son objeto de medición, no unidades muestrales.",
        color: "var(--color-entidad-verde)"
    },
    "BLOQUE_4": {
        id: "BLOQUE_4",
        name: "Asignación aleatoria de módulo",
        description: "Dentro del prestador elegido, el sistema asigna aleatoriamente uno de sus módulos disponibles: P(módulo | prestador) = 1/n_prestador. El módulo asignado puede no coincidir con el servicio efectivamente recibido (sesgo de disponibilidad reconocido en las limitaciones del diseño).",
        color: "var(--color-decision-naranja)"
    },
    "MODULO_EPS_M1": {
        id: "MODULO_EPS_M1",
        name: "EPS Módulo 1",
        description: "Formulario originalmente enfocado en población que no reporta uso de servicios de salud (barreras de acceso). Pendiente de definición: este contenido es inconsistente con el criterio de elegibilidad vigente (registro BDUA de uso efectivo de servicio), por lo que su rol dentro de la asignación aleatoria de módulos EPS debe revisarse.",
        questionsCount: 27,
        color: "var(--color-modulo-morado)"
    },
    "MODULO_EPS_M2": {
        id: "MODULO_EPS_M2",
        name: "EPS Módulo 2",
        description: "Formulario especializado en otros servicios de EPS (Urgencias, Internación, Especializado) o canales no farmacológicos del gestor.",
        questionsCount: 36,
        color: "var(--color-modulo-morado)"
    },
    "MODULO_EPS_M3": {
        id: "MODULO_EPS_M3",
        name: "EPS Módulo 3",
        description: "Formulario para la evaluación de servicios ambulatorios de consulta externa gestionados vía EPS.",
        questionsCount: 34,
        color: "var(--color-modulo-morado)"
    },
    "MODULO_IPS_M1": {
        id: "MODULO_IPS_M1",
        name: "IPS Módulo 1",
        description: "Formulario de evaluación de servicios ambulatorios directamente prestados por la red de IPS.",
        questionsCount: 34,
        color: "var(--color-modulo-morado)"
    },
    "MODULO_IPS_M2": {
        id: "MODULO_IPS_M2",
        name: "IPS Módulo 2",
        description: "Formulario de evaluación del servicio de urgencias y atención de emergencias en la red hospitalaria.",
        questionsCount: 32,
        color: "var(--color-modulo-morado)"
    },
    "MODULO_IPS_M3": {
        id: "MODULO_IPS_M3",
        name: "IPS Módulo 3",
        description: "Formulario enfocado en internación, hospitalización permanente y estancias hospitalarias.",
        questionsCount: 29,
        color: "var(--color-modulo-morado)"
    },
    "MODULO_IPS_M4": {
        id: "MODULO_IPS_M4",
        name: "IPS Módulo 4",
        description: "Formulario detallado para la evaluación de procedimientos quirúrgicos y cirugías.",
        questionsCount: 33,
        color: "var(--color-modulo-morado)"
    },
    "MODULO_GESTOR_M1": {
        id: "MODULO_GESTOR_M1",
        name: "Gestor Módulo 1",
        description: "Formulario especializado para operadores de farmacia y entrega efectiva de medicamentos y dispositivos médicos.",
        questionsCount: 34,
        color: "var(--color-modulo-morado)"
    }
};

// Congelar el objeto para asegurar la inmutabilidad de los datos maestros de los bloques
Object.freeze(ModulesData);
