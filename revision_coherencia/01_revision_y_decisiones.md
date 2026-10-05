# Primera revisión de coherencia — capítulos habilitados

Fecha: 5 de octubre de 2026.

## Cambios realizados

- Glosario: se identifica la ambigüedad del bloqueo.
- Introducción: se explicita el alcance de la compilación actual.
- Objetivo y alcance: publicación condicionada a calidad por indicador, no solamente al cumplimiento de metas.
- Diseño: relación correcta ME = L/2; se conserva ME=0,0392 (n MAS=625) y se corrige L a 0,0784. El usuario ratificó conservar los tamaños mínimos y las metas de 43.176; no se recalcularon tablas. Se corrige el nivel departamental de la corrección por población finita, la distinción asignación/finalización y el universo de calibración.
- Papel de las entidades: capítulo armonizado con el esquema adoptado de invitación y refuerzo, con responsabilidades y evidencia operativa requerida.
- Instrumento: flujo adoptado separado del prototipo; actor vinculado a la atención, elegibilidad adicional a afiliación y reglas de reingreso pendientes.
- Ponderación: se exige conciliación del marco móvil y anual y una observación transversal por persona y periodo.

## Decisiones que deben cerrarse

1. Decisión de tamaños cerrada: se conservan mínimos y metas, con ME=0,0392 y L=0,0784. Sigue pendiente justificar DEFF y evitar superposición con el factor de ponderación.
2. Definir construcción del universo anual a partir de ventanas de seis meses, incluyendo fechas de cierre, rezagos y afiliación.
3. Precisar bloqueo por entidad o tipo de actor, duración, renovación de Parte 2 y reingreso tras sorteo negativo.
4. Resolver EPS 1 y módulos no aplicables a la atención recibida; revisar probabilidades si cambia la asignación.
5. Aprobar un protocolo por indicador para publicación, faltantes y diagnóstico de calibración, incluido tratamiento de réplicas fallidas.
6. Actualizar anexos y referencias cruzadas a capítulos excluidos, y capturas cuando se implemente el nuevo flujo.

## Verificación y límites

Se comprobaron las sustituciones de textos contradictorios y la aritmética del cálculo MAS. No se modificaron el aplicativo, las tablas numéricas de metas ni los archivos compilados. R está disponible, pero bookdown y rmarkdown no están instalados en el entorno consultado; no se pudo verificar la compilación HTML, PDF o Word. Persisten pendientes metodológicos y remisiones a capítulos excluidos; esta ronda no convierte el documento en una versión definitiva de publicación.

Los originales de los siete archivos intervenidos están en `respaldo/`.
## Actualización de asignación completada

Se localizó la matriz departamental y se verificaron sus conteos: 50.168.746 personas, con coincidencia en los 33 departamentos. Se recalcularon las metas enteras (43.173) y la asignación de 1.848 celdas mediante mínimo de 10 más remanente proporcional y resto mayor. Se actualizaron el Anexo E y las tablas agregadas. Los 33 controles de cuadre son cero. El libro Excel incluye fórmulas con resultados almacenados, verificadas contra el cálculo independiente del script. No se compiló el libro bookdown.

## Condensación del capítulo de antecedentes

El capítulo pasó de 7.572 a 1.425 palabras (reducción aproximada de 81,2 %). Se agruparon las mediciones en tablas, se sintetizaron los referentes internacionales y se eliminaron repeticiones normativas y de comparabilidad. Se conservaron los identificadores de sección y las referencias de los contenidos retenidos. No se incorporaron cifras históricas nuevas. El original está en respaldo/02-Antecedentes.Rmd. La reducción de páginas requiere comprobación al compilar: el recuento de palabras no determina por sí solo la paginación.
