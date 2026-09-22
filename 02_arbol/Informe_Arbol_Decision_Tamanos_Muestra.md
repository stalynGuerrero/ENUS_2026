# Informe: Árbol de Decisión y Tamaños de Muestra
## Encuesta Nacional de Salud

---

## 1. Objetivo del informe

Este documento describe la estructura del árbol de decisión vertical utilizado para clasificar a los encuestados de la Encuesta Nacional de Salud, y presenta los tamaños de muestra asociados a cada bloque y a cada uno de los 9 desenlaces posibles del mecanismo, con base en el archivo `03_asignacion_sexo_edad10_region_regimen.xlsx` (hoja `2_Asignacion_Celda`).

> **Actualización de mecanismo (septiembre 2026):** el enrutamiento a módulo, descrito originalmente en las secciones 2.2–2.3 como determinístico (según servicio real utilizado, vía pregunta trazadora B0), fue reemplazado por el mecanismo de sorteo Bernoulli y elección de prestador descrito en el §5.4 del prompt maestro (`CLAUDE.md`). El tronco de caracterización (Bloque 1) y el tamaño de muestra por celda (secciones 3–4) **no cambian**: la actualización afecta únicamente cómo, una vez captada la persona, se determina si responde Parte 3 y qué módulo específico contesta.

---

## 2. Estructura general del árbol

El árbol se organiza en **5 bloques secuenciales**:

| Bloque | Nombre | Función |
|---|---|---|
| 1 | Identificación y Caracterización | Variables sociodemográficas: Sexo, Grupo de Edad, Departamento, Zona, Régimen (define la cuota) |
| 2 | Parte 2 — Preguntas comunes | Preguntas de respuesta directa sobre experiencia general de atención (máx. 20-25) |
| 2B | Sorteo Bernoulli | u~U(0,1), π=0,8: decide si la persona accede a Parte 3 (solo primer ingreso) |
| 3 | Elección de prestador | El usuario elige cuál prestador evaluar, entre los habilitados en BDUA y no bloqueados |
| 4 | Asignación aleatoria de módulo | Dentro del prestador elegido, se asigna al azar uno de sus módulos: P=1/n_prestador |
| 5 | Módulos Finales (Parte 3) | 8 formularios especializados: EPS (3), IPS (4), Gestor (1) |

### 2.1 Bloque 1 — Identificación y Caracterización

Secuencia de preguntas (cada una reconverge en la siguiente sin importar la respuesta anterior):

- **Sexo**: Hombre / Mujer
- **Edad**: 7 grupos decenales (00-09, 10-19, 20-29, 30-39, 40-49, 50-59, 60 o más)
- **Departamento** (agrupado en 6 regiones): Bogotá, Oriental, Central, Caribe, Pacífica, Orinoquía-Amazonía
- **Zona**: Urbano / Rural
- **Régimen**: Contributivo / Subsidiado

### 2.2 Bloque 2 y 2B — Parte 2 y Sorteo Bernoulli

Al terminar Parte 2 (preguntas comunes, respuesta directa del usuario), se ejecuta un sorteo Bernoulli u~Uniforme(0,1) con corte π=0,8:
- **u > 0,8 (NO)** → la encuesta finaliza sin Parte 3.
- **u ≤ 0,8 (SI)** → continúa al Bloque 3 (elección de prestador).

Este sorteo aplica **solo en el primer ingreso**. En ingresos posteriores no hay sorteo ni repetición de Parte 2: se accede directamente al Bloque 3, restringido a los prestadores que no estén bloqueados (ver §5.4.2 de `CLAUDE.md`).

### 2.3 Bloques 3 y 4 — Elección de prestador y asignación aleatoria de módulo

El usuario elige cuál prestador evaluar entre los que tiene habilitados en BDUA y que no estén bloqueados (el prestador evaluado en un ingreso anterior queda bloqueado 1 año calendario). El sistema asigna entonces, al azar, uno de los módulos disponibles para ese prestador:

| Prestador elegido | Módulos disponibles | P(módulo) | Módulo asignado (ejemplos) |
|---|---|---|---|
| EPS | 3 | 1/3 | EPS M1, EPS M2 o EPS M3 |
| IPS | 4 | 1/4 | IPS M1, IPS M2, IPS M3 o IPS M4 |
| Gestor Farmacéutico | 1 | 1 | Gestor M1 (único) |

A diferencia del mecanismo anterior, el módulo asignado **no depende del servicio efectivamente recibido**: es una asignación aleatoria dentro del prestador elegido, con el sesgo de disponibilidad que ello implica (§5.7.1 de `CLAUDE.md`).

### 2.4 Bloque 5 — Módulos Finales (Parte 3)

| Módulo | Preguntas | Enfoque |
|---|---|---|
| EPS Módulo 1 | 27 | Barreras de acceso (contenido original, para población sin uso de servicios). **Pendiente de definición:** este contenido es inconsistente con el criterio de elegibilidad vigente (§5.2.2 de `CLAUDE.md`), que exige uso previo de servicios; se conserva como una de las 3 opciones asignables al azar en EPS mientras se resuelve. |
| EPS Módulo 2 | 36 | Urgencias, internación o especializado vía EPS |
| EPS Módulo 3 | 34 | Ambulatorio / consulta externa vía EPS |
| IPS Módulo 1 | 34 | Ambulatorio directo en red IPS |
| IPS Módulo 2 | 32 | Urgencias en red IPS |
| IPS Módulo 3 | 29 | Internación / hospitalización |
| IPS Módulo 4 | 33 | Procedimientos quirúrgicos |
| Gestor Módulo 1 | 34 | Entrega de medicamentos y dispositivos médicos |

El conteo de 8 módulos (EPS 3, IPS 4, Gestor 1) proviene de `00_Cuestionario/ENUS_Formato_por_Modulos.xlsx`, que sí define el contenido de cada módulo. El §5.3.3 de `CLAUDE.md` menciona "EPS 5, IPS 3, Gestor 1 (9 módulos)"; ese conteo no tiene respaldo en los insumos y se corrige aquí a 8.

---

## 3. Fuente y método del tamaño de muestra

- **Archivo fuente**: `03_asignacion_sexo_edad10_region_regimen.xlsx`, hoja `2_Asignacion_Celda`.
- **Insumo previo**: `02_tamanos_muestra_deff_1.5.xlsx` (tamaño de muestra nacional con efecto de diseño *deff* = 1.5).
- **Universo poblacional**: 50,168,746 afiliados (BDUA - Cubo BDUA, corte Marzo 2026).
- **Método de reparto**: proporcional a población por celda, con mínimo garantizado de 10 encuestas por celda de Sexo × Grupo de Edad × Zona.
- **Dimensiones de la celda de asignación**: Región (6) × Régimen (2) × Sexo (2) × Grupo de Edad (7) × Zona (2) = **336 celdas**.
- **Tamaño de muestra nacional total**: **7,876 encuestas**.

---

## 4. Tamaño de muestra — Bloque 1 (Caracterización)

El tamaño total de 7,876 encuestas se distribuye entre todas las combinaciones de las 5 variables de caracterización. A continuación, los totales marginales (sumando sobre las demás variables):

### 4.1 Por Sexo

| Sexo | n | % |
|---|---|---|
| Femenino | 3,993 | 50.7% |
| Masculino | 3,883 | 49.3% |
| **Total** | **7,876** | **100%** |

### 4.2 Por Grupo de Edad

| Grupo de Edad | n | % |
|---|---|---|
| 00-09 | 1,014 | 12.9% |
| 10-19 | 1,163 | 14.8% |
| 20-29 | 1,203 | 15.3% |
| 30-39 | 1,203 | 15.3% |
| 40-49 | 1,086 | 13.8% |
| 50-59 | 975 | 12.4% |
| 60 o más | 1,232 | 15.6% |
| **Total** | **7,876** | **100%** |

### 4.3 Por Departamento (Región)

| Departamento | n |
|---|---|
| Bogotá | 1,313 |
| Caribe | 1,313 |
| Central | 1,313 |
| Oriental | 1,313 |
| Orinoquía-Amazonía | 1,311 |
| Pacífica | 1,313 |
| **Total** | **7,876** |

> Nota: la asignación reparte el tamaño de muestra casi equitativamente entre las 6 regiones (~1,313 cada una), con una leve variación en Orinoquía-Amazonía por redondeo del mínimo garantizado.

### 4.4 Por Zona

| Zona | n | % |
|---|---|---|
| Urbano | 5,147 | 65.4% |
| Rural | 2,729 | 34.6% |
| **Total** | **7,876** | **100%** |

### 4.5 Por Régimen

| Régimen | n | % |
|---|---|---|
| Subsidiado | 4,207 | 53.4% |
| Contributivo | 3,669 | 46.6% |
| **Total** | **7,876** | **100%** |

### 4.6 Cruce Departamento × Régimen

| Departamento | Contributivo | Subsidiado | Total |
|---|---|---|---|
| Bogotá | 855 | 458 | 1,313 |
| Caribe | 494 | 819 | 1,313 |
| Central | 663 | 650 | 1,313 |
| Oriental | 629 | 684 | 1,313 |
| Orinoquía-Amazonía | 453 | 858 | 1,311 |
| Pacífica | 575 | 738 | 1,313 |

### 4.7 Cruce Departamento × Zona

| Departamento | Urbano | Rural | Total |
|---|---|---|---|
| Bogotá | 1,020 (13.0%) | 293 (3.7%) | 1,313 |
| Caribe | 854 (10.8%) | 459 (5.8%) | 1,313 |
| Central | 887 (11.3%) | 426 (5.4%) | 1,313 |
| Oriental | 868 (11.0%) | 445 (5.7%) | 1,313 |
| Orinoquía-Amazonía | 686 (8.7%) | 625 (7.9%) | 1,311 |
| Pacífica | 832 (10.6%) | 481 (6.1%) | 1,313 |

---

## 5. Tamaño de muestra — Bloques 2 y 2B (Parte 2 y Sorteo Bernoulli)

Los Bloques 2 y 2B no introducen una nueva estratificación de diseño: **la totalidad de las 7,876 encuestas** completa Parte 2 y queda sujeta al sorteo Bernoulli en su primer ingreso. El resultado del sorteo (SI/NO, con π=0,8) determina si la persona accede a Parte 3, pero no cambia el tamaño de la muestra de Bloque 1 —solo la clasifica posteriormente entre los Bloques 3-5. En expectativa, un 80% de las 7,876 personas accede a la elección de prestador y un 20% finaliza sin módulo.

---

## 6. Tamaño de muestra — Bloques 3 a 5 (Elección de prestador y módulos)

**Importante:** el archivo de asignación muestral (`03_asignacion_sexo_edad10_region_regimen.xlsx`) diseña la muestra únicamente sobre las 5 variables de caracterización (Sexo, Edad, Departamento/Región, Zona, Régimen). **No existe un reparto de diseño por prestador (EPS/IPS/Gestor) ni por módulo**, porque esa clasificación se determina *después* de Parte 2, mediante el sorteo Bernoulli, la elección del usuario y la asignación aleatoria de módulo — no es un estrato definido a priori.

En consecuencia, **los 9 desenlaces posibles comparten el mismo universo muestral de 7,876 encuestas**: cada encuestado, sin importar su combinación de Sexo/Edad/Departamento/Zona/Régimen, terminará en exactamente uno de los 9 desenlaces según el sorteo, su elección de prestador y la asignación aleatoria de módulo. No hay una "cuota" fija de encuestas por desenlace; el número final de encuestas que caen en cada uno se conocerá solo al aplicar el instrumento en campo.

### 6.1 Los 9 desenlaces posibles

| Desenlace | Nombre | Sorteo → Prestador elegido → Módulo asignado | Preguntas del módulo |
|---|---|---|---|
| 0 | Sorteo negativo | u>0,8 → (sin Parte 3) | — |
| 1 | EPS - Módulo 1 | u≤0,8 → EPS → asignación aleatoria (P=1/3) | 27 |
| 2 | EPS - Módulo 2 | u≤0,8 → EPS → asignación aleatoria (P=1/3) | 36 |
| 3 | EPS - Módulo 3 | u≤0,8 → EPS → asignación aleatoria (P=1/3) | 34 |
| 4 | IPS - Módulo 1 | u≤0,8 → IPS → asignación aleatoria (P=1/4) | 34 |
| 5 | IPS - Módulo 2 | u≤0,8 → IPS → asignación aleatoria (P=1/4) | 32 |
| 6 | IPS - Módulo 3 | u≤0,8 → IPS → asignación aleatoria (P=1/4) | 29 |
| 7 | IPS - Módulo 4 | u≤0,8 → IPS → asignación aleatoria (P=1/4) | 33 |
| 8 | Gestor - Módulo 1 | u≤0,8 → Gestor → único módulo (P=1) | 34 |

Todos los desenlaces parten del mismo tronco de caracterización + Parte 2 (Bloques 1 y 2, sección 4), por lo que su tamaño de muestra "de entrada" es el total nacional (7,876) o cualquiera de sus desagregaciones demográficas de la sección 4, según el subgrupo de interés (ej. "mujeres del régimen subsidiado en zona rural del Caribe").

---

## 7. Calculadora interactiva de tamaño de muestra (herramienta del árbol)

El árbol de decisión interactivo (`arbol.html`) incluye una calculadora que reproduce este mismo cruce de datos: al hacer clic secuencialmente en un nodo de **Sexo, Grupo de Edad, Departamento, Zona y Régimen**, y luego llegar hasta un **Módulo Final** (completando así uno de los 9 desenlaces), el panel revela el tamaño de muestra exacto (n) de esa celda específica, tomado directamente de las 336 filas de `2_Asignacion_Celda`.

El resultado se mantiene oculto mientras no se complete el recorrido completo de las 6 selecciones, para evitar interpretar un número parcial como si fuera el tamaño de muestra final de una ruta.

---

## 8. Notas metodológicas

- El efecto de diseño (*deff*) aplicado en el cálculo del tamaño nacional fue 1.5 (existe también un escenario alternativo con *deff* = 2 en `01_Tamaño_Muestra/Output/02_tamanos_muestra_deff_2.xlsx`, no utilizado en esta asignación).
- Se garantizó un mínimo de 10 encuestas por celda de Sexo × Grupo de Edad × Zona, lo que puede generar pequeñas desviaciones frente a la proporción estrictamente poblacional en celdas de baja frecuencia (ej. Orinoquía-Amazonía).
- La hoja `3_Chequeo_Cuadre` confirma que la suma de las celdas asignadas coincide con el tamaño de muestra objetivo por región (diferencias de -0.2 a -0.8, atribuibles al redondeo).
- Los tamaños de muestra por desenlace (Bloques 3-5) **no son un dato de diseño muestral**, sino un resultado que depende del sorteo Bernoulli, la elección de prestador y la asignación aleatoria de módulo; este informe no debe interpretarse como una proyección de cuántas encuestas caerán en cada módulo.
- El mecanismo de sorteo y asignación descrito en las secciones 2.2-2.3 y 6 reemplaza al mecanismo determinístico (pregunta trazadora B0 + servicio real) documentado en versiones anteriores de este informe, conforme a la actualización de `CLAUDE.md` §5.4 (septiembre de 2026). El flujo de ingresos posteriores (sin sorteo, con bloqueo de prestador por 1 año) se describe en `CLAUDE.md` §5.4.2 y no está representado como rama independiente en `arbol.html`.
