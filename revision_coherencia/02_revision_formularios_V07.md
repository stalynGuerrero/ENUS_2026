# Revisión de formularios V07 — fuentes vigentes

Formulario: `00_Cuestionario/V1/ENUS_Formato_por_Modulos_CartaDerechos_V07 17092026.xlsx`
Matriz: `00_Cuestionario/V1/Matriz_de_indicadores_-_Fichas_tecnicas_ENUS_V07_30092026.xlsx`

Se actualizaron instrumento, diseño y estimadores. No se modificaron los Excel fuente.

## Hallazgos documentados en la matriz vigente

### 1. EPS - Módulo 3 (M3EPS_P10) · IPS - Módulo 1 (M1IPS_P10)
**Hallazgo:** El enunciado de P10 ya no pregunta por los minutos de desplazamiento: pregunta «¿Cuánto tiempo transcurrió desde la solicitud del servicio hasta…?» (DD-HH:MM), duplicando P03. En EPS - Módulo 3 además tiene errores de digitación («¿Cuántos tiempo…», «en qué»). P10a sigue preguntando por el transporte «para ese desplazamiento».
**Impacto:** El tiempo de desplazamiento no es medible con V07.
**Indicadores:** IND-ACC-11 (suspendido)
**Acción propuesta en la fuente:** Restituir: «¿Cuántos minutos le tomó el desplazamiento desde su lugar de residencia hasta el lugar donde fue a tomar los servicios?» (respuesta en minutos), como figura en el Plan de Análisis.
**Prioridad de la fuente:** Alta

### 2. Sección B — T15 a T18 en EPS - Módulo 1
**Hallazgo:** El módulo de no usuarios (T06 = "No") incluye preguntas de experiencia, facilidad de acceso y recomendación del sitio de atención, que no aplican a quien no usó servicios.
**Impacto:** Datos no interpretables; riesgo de sesgar los consolidados si se incluyen.
**Indicadores:** IND-SAT-02; IND-SAT-04; IND-SAT-05
**Acción propuesta en la fuente:** Retirar T15, T16 y T18 de EPS - Módulo 1 (conservar T17, recomendación de la EPS). Mientras tanto, excluirlas del cálculo.
**Prioridad de la fuente:** Alta

### 3. Sección B — T15 a T18 (todos los módulos)
**Hallazgo:** El mismo código T no identifica el mismo constructo: en IPS - Módulo 2, T17 = sitio de atención y T18 = prestador (no se pregunta por la EPS); en IPS - Módulo 4, T17 = prestador (no hay T18 ni NPS de EPS); en Gestor - Módulo 1, T16 = NPS del gestor (rotulado «Acceso general») y T17 = EPS, sin pregunta de facilidad de acceso.
**Impacto:** Cálculo automatizado por código T produciría mezclas de constructos. La matriz asigna la variable por módulo en cada ficha.
**Indicadores:** IND-SAT-01; IND-SAT-02; IND-SAT-03; IND-SAT-05
**Acción propuesta en la fuente:** Homologar: T15 experiencia · T16 facilidad de acceso · T17 NPS EPS · T18 NPS prestador/sitio en los 8 módulos; el NPS del gestor como pregunta propia de la Sección C. Si no se homologa, asignar códigos distintos a constructos distintos.
**Prioridad de la fuente:** Alta

### 4. Plan de Análisis e Índice del libro ENUS
**Hallazgo:** Están desactualizados frente a los formularios: el Plan lista preguntas de cierre como P17–P20 de cada módulo (hoy T15–T18 en Sección B), incluye M2EPS_P21, P23, P26 y P27 que no están en el formulario, y no refleja la renumeración de Gestor - Módulo 1 (nueva M1GES_P12). El Índice indica «Versión 04» y conteos de Sección C que no coinciden (p. ej., EPS - Módulo 3: 22).
**Impacto:** La matriz toma como fuente única los formularios de cada módulo.
**Indicadores:** Todos (trazabilidad)
**Acción propuesta en la fuente:** Regenerar el Plan de Análisis y el Índice desde los formularios V07 y registrar los cambios V04 → V07 en el Control de Cambios del instrumento.
**Prioridad de la fuente:** Alta

### 5. Gestor - Módulo 1 — saltos (M1GES_P07, P09, P10)
**Hallazgo:** Por la inserción de la nueva M1GES_P12 (tiempo de entrega a domicilio), los saltos «Pase a M1GES_P12» quedaron desplazados: M1GES_P07 = "Sí" lleva al tiempo de domicilio en lugar de saltar la ruta de pendientes; P09 = "No" y P10 = "No" deberían llevar a P13.
**Impacto:** Poblaciones incorrectas para gasto de bolsillo, domicilio y tiempo de espera en el punto de dispensación.
**Indicadores:** IND-GAB-02; IND-MED-05; IND-MED-06
**Acción propuesta en la fuente:** Corregir: P07 = "Sí" → P14; P09 = "No" → P13; P10 = "No" → P13; P11 = "Sí" → P12; P11 = "No" → P13. Aplicar filtros en el procesamiento mientras tanto.
**Prioridad de la fuente:** Alta

### 6. Gestor - Módulo 1 — M1GES_P08
**Hallazgo:** El tiempo de espera en el punto de dispensación solo se pregunta a quienes NO recibieron todos los medicamentos (salto desde P07).
**Impacto:** Sesgo de selección: no representa la experiencia de todos los usuarios del punto.
**Indicadores:** IND-MED-05
**Acción propuesta en la fuente:** Preguntar M1GES_P08 a todos los usuarios que asistieron al punto de dispensación (ubicarla antes de P07).
**Prioridad de la fuente:** Media

### 7. Gestor - Módulo 1 — código «M1GES-P12» y nota de M1GES_P11
**Hallazgo:** El código usa guion en lugar de guion bajo. La nota de M1GES_P11 («indique cuántos días se tardó el domicilio») duplica la nueva M1GES_P12.
**Impacto:** Riesgo de error en la carga de la base de datos y doble registro del tiempo.
**Indicadores:** IND-MED-06
**Acción propuesta en la fuente:** Normalizar a M1GES_P12 y retirar la nota de M1GES_P11.
**Prioridad de la fuente:** Media

### 8. EPS - Módulo 2 — Sección B
**Hallazgo:** T13 y T14 aparecen duplicadas (filas 75/77 y 108/110) y el orden de la Sección B difiere del resto de módulos (T07 antes de T06; T08 después de T09).
**Impacto:** Doble registro de la misma variable por encuestado.
**Indicadores:** IND-INF-09; IND-EXI-01
**Acción propuesta en la fuente:** Eliminar la primera aparición de T13/T14 y ordenar la Sección B igual que en los demás módulos.
**Prioridad de la fuente:** Media

### 9. EPS - Módulo 2 — T09
**Hallazgo:** La lista de servicios tiene 17 opciones con códigos repetidos (dos opciones «5» y dos «6») y difiere de la lista de 10 opciones de los otros módulos.
**Impacto:** Codificación ambigua; T09 no es comparable entre módulos.
**Indicadores:** IND-ACC-01 (control de calidad)
**Acción propuesta en la fuente:** Recodificar con numeración única y homologar con los otros módulos (o documentar la lista ampliada como propia de EPS - Módulo 2).
**Prioridad de la fuente:** Media

### 10. Formatos de tiempo (varios módulos)
**Hallazgo:** La misma pregunta compartida usa formatos distintos: M3EPS_P03 (DD-HH:MM) frente a M1IPS_P03 (días con decimales); M2IPS_P12b (DD-HH:MM) frente a M3IPS_P10 (horas con decimales). El Control de Cambios V04 describía «número de horas/días», pero los formularios V07 usan DD-HH:MM.
**Impacto:** Obliga a conversión previa (t_d, t_h, t_m) y eleva el riesgo de errores de unidad.
**Indicadores:** IND-ACC-03; IND-ACC-04; IND-ACC-05; IND-ACC-13; IND-ACC-14; IND-ACC-15; IND-MED-04; IND-MED-05; IND-MED-06
**Acción propuesta en la fuente:** Unificar el formato de todas las preguntas de tiempo (recomendado DD-HH:MM con validación de rangos) y documentarlo en el diccionario de datos.
**Prioridad de la fuente:** Media

### 11. Sección B — T05
**Hallazgo:** La escala del formulario tiene 5 niveles (Deficiente / Malo / Regular / Buena / Excelente), mientras el Control de Cambios V04 registra 6 niveles (Excelente / Muy buena / Buena / Regular / Mala / Muy mala). Hay mezcla de género gramatical (Malo / Buena).
**Impacto:** Ruptura de serie y ambigüedad sobre la escala oficial.
**Indicadores:** IND-PES-01
**Acción propuesta en la fuente:** Confirmar la escala oficial. Si se mantiene la de 5 niveles, homogeneizar la concordancia (Deficiente / Mala / Regular / Buena / Excelente).
**Prioridad de la fuente:** Media

### 12. IPS - Módulo 2 — categoría de triage
**Hallazgo:** No se registra la categoría de triage asignada al usuario.
**Impacto:** No es posible contrastar el tiempo de espera post-triage contra el estándar por categoría (Res. 5596 de 2015).
**Indicadores:** IND-ACC-04
**Acción propuesta en la fuente:** Agregar una pregunta «¿Qué clasificación de triage le asignaron?» (I a V / No sabe) o capturarla del registro de la IPS.
**Prioridad de la fuente:** Media

### 13. EPS - Módulo 1 — M1EPS_P06 a P09
**Hallazgo:** Las preguntas sobre valoración, intervención, orientación y remisión por el EBS no tienen salto desde M1EPS_P05 (caracterización del hogar).
**Impacto:** Encuestados sin visita del EBS pueden responder «Sí»; denominador incierto.
**Indicadores:** IND-EBS-02; IND-EBS-03; IND-EBS-04; IND-EBS-05
**Acción propuesta en la fuente:** Agregar salto: M1EPS_P05 = "No" → M1EPS_P10.
**Prioridad de la fuente:** Media

### 14. EPS - Módulo 1 — alcance de la medición del EBS
**Hallazgo:** La cobertura de los Equipos Básicos de Salud solo se indaga en no usuarios.
**Impacto:** No se puede estimar la cobertura poblacional de los EBS.
**Indicadores:** IND-EBS-01
**Acción propuesta en la fuente:** Incluir M1EPS_P05 también en EPS - Módulo 2 (afiliados en general).
**Prioridad de la fuente:** Baja

### 15. EPS - Módulo 2 — bloque OCDE
**Hallazgo:** El formulario conserva 4 de los 8 ítems OCDE registrados en el Plan de Análisis (faltan M2EPS_P21, P23, P26 y P27) y la numeración queda discontinua.
**Impacto:** El índice de atención centrada en la persona es una versión abreviada, no comparable con la batería OCDE completa.
**Indicadores:** IND-PCC-01
**Acción propuesta en la fuente:** Decidir si se restituyen los 4 ítems; si no, renumerar y documentar la versión abreviada.
**Prioridad de la fuente:** Media

### 16. EPS - Módulo 2 — M2EPS_P04 a P11
**Hallazgo:** Ambigüedad entre «Nunca» y «No necesitó solicitarla / ejercerla».
**Impacto:** Denominador incierto para el ejercicio efectivo de derechos.
**Indicadores:** IND-DER-01; IND-EXI-02
**Acción propuesta en la fuente:** Precisar en la instrucción: «Nunca = lo necesitó pero no lo ejerció».
**Prioridad de la fuente:** Baja

### 17. EPS - Módulo 2 — M2EPS_P18, P19 y P28
**Hallazgo:** Los ítems de satisfacción refieren a «la EPS/IPS» en conjunto.
**Impacto:** No permiten atribuir el resultado a un solo actor.
**Indicadores:** IND-DER-02
**Acción propuesta en la fuente:** Separar el actor evaluado o precisar que se refiere a la experiencia global con el sistema.
**Prioridad de la fuente:** Baja

### 18. IPS - Módulo 1 — M1IPS_P15
**Hallazgo:** Ambas respuestas pasan a P16: no existe la pregunta de magnitud del gasto (P15a) a nivel IPS, a diferencia de EPS - Módulo 3.
**Impacto:** La magnitud del gasto de bolsillo solo se estima a nivel EPS.
**Indicadores:** IND-GAB-04
**Acción propuesta en la fuente:** Replicar M3EPS_P15a en IPS - Módulo 1 (pendiente también registrado en la hoja Hallazgos del instrumento).
**Prioridad de la fuente:** Baja

### 19. IPS - Módulo 2 (M2IPS_P03) frente a IPS - Módulo 3 (M3IPS_P02)
**Hallazgo:** El Plan de Análisis las declara compartidas, pero tienen opciones distintas (público/privado/propia de la EPS frente a nivel de complejidad).
**Impacto:** La desagregación «tipo de institución» no es comparable entre urgencias e internación.
**Indicadores:** IND-ACC-04; IND-ACC-12; IND-ACC-15; IND-SAT-02
**Acción propuesta en la fuente:** Homologar las opciones o separar dos variables (naturaleza jurídica y nivel de complejidad).
**Prioridad de la fuente:** Baja

### 20. IPS - Módulo 4 — M4IPS_P05
**Hallazgo:** La pregunta fusionada incluye a la vez «Ninguna vez», «No recuerda» y «No aplica».
**Impacto:** «No aplica» no es claro para quien tuvo una cirugía agendada.
**Indicadores:** IND-ACC-09
**Acción propuesta en la fuente:** Retirar «No aplica» o definir cuándo aplica.
**Prioridad de la fuente:** Baja

### 21. EPS - Módulo 1 — M1EPS_P02
**Hallazgo:** No se indica si es respuesta única o múltiple y no existe la opción «No acudió a ningún lugar».
**Impacto:** Respuestas forzadas en no usuarios que no buscaron atención.
**Indicadores:** IND-NUS-05
**Acción propuesta en la fuente:** Agregar la opción «No acudió a ningún lugar / no lo necesitó» y precisar el tipo de respuesta.
**Prioridad de la fuente:** Baja

### 22. Sección B — T08
**Hallazgo:** No se indica si es respuesta única o múltiple.
**Impacto:** Regla de conteo incierta.
**Indicadores:** IND-ACC-16
**Acción propuesta en la fuente:** Precisar «seleccione la principal» o habilitar respuesta múltiple.
**Prioridad de la fuente:** Baja

### 23. Matriz de indicadores (versión anterior)
**Hallazgo:** La hoja «Presentación» anunciaba una hoja «Catálogo de preguntas» que no existía en el libro.
**Impacto:** Los códigos de pregunta no podían resolverse dentro de la matriz.
**Indicadores:** Todos
**Acción propuesta en la fuente:** Incorporada en esta versión, generada directamente desde los formularios V07.
**Prioridad de la fuente:** Resuelto
