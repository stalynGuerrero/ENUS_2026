# ENUS 2026 — Documento Técnico

Especificación técnica reproducible de la operación estadística
**ClicSalud — Encuesta Nacional de Experiencia del Usuario en Salud (ENUS
2026)**, del Ministerio de Salud y Protección Social.

## Libro publicado

**https://stalynguerrero.github.io/ENUS_2026/**

El libro (HTML navegable) se publica desde `docs/` en la rama `main` vía
GitHub Pages. El PDF y el Word compilados están disponibles para descarga
desde esa misma página. `docs/` se sube manualmente después de cada
`bookdown::render_book(...)`; no hay despliegue automático todavía.

**Nota:** para que la URL quede activa hace falta habilitarla una sola vez
en GitHub → Settings → Pages → Source: rama `main`, carpeta `/docs`.

## Fuente única: el libro bookdown

**Actualización 2026-08-17:** se retiró la tubería Quarto
(`documento_tecnico.qmd`, `anexos/*.qmd`, `_quarto.yml`) y el borrador
huérfano `capitulos/`. El proyecto ahora tiene **una sola vía de
compilación**: el libro bookdown. El contenido se redacta directamente en:

- `index.Rmd` — capítulo 1 (Presentación)
- `capitulos_bookdown/*.Rmd` — el resto de los capítulos y anexos

Cada capítulo se llena **uno a la vez**. Mientras un capítulo siga con
contenido pendiente, su línea permanece **comentada** en `rmd_files` dentro
de `_bookdown.yml`; se descomenta cuando ese capítulo queda listo, y recién
entonces entra en la compilación del libro. Por ahora están activos
`index.Rmd` y 6 capítulos: 01 (Introducción), 02 (Antecedentes), 03
(Objetivo y alcance), 04 (Marco conceptual), 07 (Papel de las EPS e IPS) y
24 (Limitaciones).

**Actualización 2026-08-19 — prompt maestro v3.0:** `CLAUDE.md` fue
reescrito por completo (versión 3.0, mucho más corta que la 2.1 anterior) y
define una estructura de documento distinta (§4, subsecciones 4.1-4.18) y
una lista de anexos distinta (§19, Anexo A-J en vez de A-M). Se aplicaron
en secuencia estos cambios:

1. Los 13 anexos A-M anteriores se retiraron del libro (ver sección
   "Anexos" más abajo) y se archivaron en `_archivo/anexos_pre_v3/`; los
   nuevos Anexo A-J de la v3.0 aún no se han redactado.
2. Los 22 archivos del cuerpo (`capitulos_bookdown/02-...` a `23-...`) se
   renombraron y reordenaron para seguir la secuencia §4.1-4.17 de la
   v3.0, quedando dos capítulos sin equivalente directo en la nueva
   estructura ("Identidad de la operación estadística" y "Versionamiento
   del instrumento") y cuatro secciones de la v3.0 sin archivo
   correspondiente (Introducción, Marco conceptual, Limitaciones general,
   Papel de las EPS e IPS).
3. Los dos capítulos sin equivalente se retiraron del libro por
   instrucción de Stalyn y se archivaron en `_archivo/capitulos_pre_v3/`
   (no se borraron).
4. Se redactaron y activaron los 4 capítulos nuevos que llenaban esos
   huecos: `01-Introduccion.Rmd`, `04-Marco_conceptual.Rmd`,
   `07-Papel_de_las_EPS_e_IPS.Rmd` y `24-Limitaciones.Rmd`.

El estado final de la numeración y la correspondencia completa con la v3.0
queda en "Cuerpo del documento: mapeo v2.1 → v3.0" más abajo.

## Compilación

```r
bookdown::render_book("index.Rmd", output_format = "bookdown::gitbook")        # libro HTML navegable
bookdown::render_book("index.Rmd", output_format = "bookdown::pdf_book")       # libro en PDF
bookdown::render_book("index.Rmd", output_format = "bookdown::word_document2") # libro en DOCX
```

Genera todo en `docs/` (nombre base `ENUS_2026_metodoloia`, definido en
`_bookdown.yml`). Requiere R con los paquetes `bookdown`, `rmarkdown`,
`tinytex` (o una instalación LaTeX con `xelatex`), y Pandoc.

En este equipo, R no encuentra Pandoc automáticamente porque no hay
RStudio con Pandoc embebido configurado en el `PATH`; hay que apuntar
`RSTUDIO_PANDOC` al Pandoc que trae Quarto antes de renderizar (Quarto en
sí ya no se usa para compilar el documento, pero su Pandoc empaquetado
sigue sirviendo como Pandoc del sistema):

```bash
export RSTUDIO_PANDOC="/c/Program Files/Quarto/bin/tools"
```

(en PowerShell: `$env:RSTUDIO_PANDOC = "C:\Program Files\Quarto\bin\tools"`)

Con los capítulos activos actuales, los tres formatos compilan sin error
(avisos benignos de "referencia indefinida" para `\@ref()` que apuntan a
capítulos todavía comentados — desaparecen al activarlos).

## Flujo para llenar un capítulo

1. Editar el `.Rmd` correspondiente en `capitulos_bookdown/` (o `index.Rmd`
   si es el capítulo 1), reemplazando los bloques `::: {.pendiente-definicion}`
   por contenido redactado a partir de los insumos (ver regla de "no
   inventar" en `CLAUDE.md`).
2. Descomentar su línea en `_bookdown.yml` → `rmd_files`.
3. Recompilar (`bookdown::render_book(...)`) y revisar que las referencias
   cruzadas `\@ref(sec-...)` que dependan de ese capítulo ya resuelvan.

## Cuerpo del documento: estado final tras la adopción de la v3.0

El cuerpo tiene ahora 25 archivos (`01` a `25`), siguiendo la secuencia
§4.1 a §4.17 del prompt maestro v3.0. Los marcados **(activo)** tienen
contenido redactado y están descomentados en `_bookdown.yml`; el resto
conserva el contenido (mayormente stub) que ya tenía de la estructura
v2.1, solo renombrado y reubicado según la correspondencia indicada.

| # | Archivo | Título | Sección v3.0 | Origen |
|---|---|---|---|---|
| 01 | `01-Introduccion.Rmd` | Introducción | §4.1 | **nuevo (activo)** |
| 02 | `02-Antecedentes.Rmd` | Antecedentes | §4.2 | **nuevo (activo)**, antes `01-Antecedentes.Rmd` |
| 03 | `03-Objetivo_y_alcance.Rmd` | Objetivo y alcance | §4.3 + §4.4 | sin cambio **(activo)** |
| 04 | `04-Marco_conceptual.Rmd` | Marco conceptual | §4.5 | **nuevo (activo)** |
| 05 | `05-Poblacion_objetivo_y_marco_de_referencia.Rmd` | Población objetivo y marco de referencia | §4.6 | sin cambio |
| 06 | `06-Diseno_muestral.Rmd` | Diseño muestral | §4.7 (§5.1) | antes `10-Diseno_muestral.Rmd` |
| 07 | `07-Papel_de_las_EPS_e_IPS.Rmd` | Papel de las EPS e IPS | §5.2 | **nuevo (activo)** |
| 08 | `08-Muestreo_por_cuotas.Rmd` | Muestreo por cuotas | §4.7 (§5.3) | antes `11-Muestreo_por_cuotas.Rmd` |
| 09 | `09-Variables_de_clasificacion.Rmd` | Variables de clasificación | §4.7 (§10) | antes `08-Variables_trazadoras_y_clasificacion.Rmd` |
| 10 | `10-Relacion_entre_cuestionario_y_cuotas.Rmd` | Relación entre cuestionario y cuotas | §4.7 | antes `09-Relacion_entre_cuestionario_y_cuotas.Rmd` |
| 11 | `11-Mecanismo_de_seleccion.Rmd` | Mecanismo de selección | §4.7 | antes `12-Mecanismo_de_seleccion.Rmd` |
| 12 | `12-Limitaciones_del_muestreo_por_cuotas.Rmd` | Limitaciones del muestreo por cuotas | §4.7 (§5.4) | antes `13-Limitaciones_del_muestreo_por_cuotas.Rmd` |
| 13 | `13-Instrumento_de_recoleccion.Rmd` | Instrumento de recolección | §4.8 | antes `06-Cuestionario_como_sistema_logico.Rmd` |
| 14 | `14-Flujo_y_rutas_del_cuestionario.Rmd` | Flujo y rutas del cuestionario | §4.9 | antes `07-Arbol_de_decision_y_rutas.Rmd` |
| 15 | `15-Reconciliacion_de_estructuras.Rmd` | Reconciliación de estructuras | §8 | antes `23-Inconsistencias_entre_fuentes.Rmd` |
| 16 | `16-Recoleccion_ClicSalud.Rmd` | Recolección (ClicSalud) | §4.10 | antes `05-Aplicacion_de_recoleccion_ClicSalud.Rmd` |
| 17 | `17-Procesamiento.Rmd` | Procesamiento | §4.11 | antes `20-Arquitectura_de_datos.Rmd` |
| 18 | `18-Ponderacion_y_calibracion.Rmd` | Ponderación y calibración | §4.12 | antes `14-Pesos_iniciales_y_calibracion_por_entropia.Rmd` |
| 19 | `19-Distincion_entre_cuotas_y_calibracion.Rmd` | Distinción entre cuotas y calibración | §4.12 | antes `15-Distincion_entre_cuotas_y_calibracion.Rmd` |
| 20 | `20-Diagnostico_de_calibracion.Rmd` | Diagnóstico de calibración | §4.12 (§11.5) | antes `16-Diagnostico_de_calibracion.Rmd` |
| 21 | `21-Indicadores.Rmd` | Indicadores | §4.13 | antes `18-Indicadores.Rmd` |
| 22 | `22-Precision_e_incertidumbre.Rmd` | Precisión e incertidumbre | §4.14 | antes `17-Inferencia_y_precision.Rmd` |
| 23 | `23-Calidad_estadistica.Rmd` | Calidad estadística | §4.15 | antes `21-Control_de_calidad.Rmd` |
| 24 | `24-Limitaciones.Rmd` | Limitaciones | §4.16 | **nuevo (activo)** |
| 25 | `25-Trazabilidad_y_reproducibilidad.Rmd` | Trazabilidad y reproducibilidad | §4.17 | antes `19-Trazabilidad_integral.Rmd` |

Los antiguos capítulos "Identidad de la operación estadística" (sin
equivalente en la v3.0) y "Versionamiento del instrumento" (idem) se
retiraron del libro y se archivaron, sin borrar, en
`_archivo/capitulos_pre_v3/`.

**Contenido de los 4 capítulos nuevos y sus fuentes:**

- **01 Introducción** — contexto y propósito de ENUS 2026, por qué medir
  la experiencia del usuario, y alcance/estructura de este documento;
  construido sobre el marco normativo ya citado en Antecedentes
  (`Decreto1011_2006`) y los referentes de *responsiveness*/CAHPS
  (`WHO2000Responsiveness`, `AHRQ_CAHPS`).
- **04 Marco conceptual** — define experiencia del usuario, sus
  dimensiones (accesibilidad, oportunidad, trato digno, comunicación,
  resolutividad) y la distingue de satisfacción y de resultado clínico;
  mismas fuentes normativas e internacionales que la Introducción.
- **07 Papel de las EPS e IPS** — documenta únicamente lo que respaldan
  los insumos técnicos (ClicSalud y el árbol de decisión): la EPS como
  dato de identificación del usuario en ClicSalud, y EPS/IPS/gestor como
  variable de clasificación del módulo en el árbol. Declara
  explícitamente que **no hay evidencia en esos insumos técnicos** de un
  mecanismo de reclutamiento institucional (invitaciones, QR, etc.) — si
  ese mecanismo existe en la operación real, falta que el equipo
  metodológico lo aporte.
- **24 Limitaciones** — limitaciones generales de la operación (mecanismo
  de captación, cobertura, participación/no respuesta, selección dentro
  de cuotas, dependencia de variables auxiliares, límites de la
  calibración y de la estimación de incertidumbre), siguiendo el checklist
  del §16 del prompt maestro; complementa sin duplicar al capítulo 12
  (limitaciones específicas de cuotas), que sigue sin redactar.

## Estructura del proyecto

```
02_ENUS/
├── index.Rmd                   Capítulo 1 (Presentación) — fuente
├── capitulos_bookdown/         Capítulos 01-25 (cuerpo) — fuente, se llenan uno a uno
├── _archivo/anexos_pre_v3/     Los 13 anexos A-M de la estructura v2.1, retirados del libro (ver nota "Anexos")
├── _archivo/capitulos_pre_v3/  "Identidad de la operación" y "Versionamiento del instrumento", sin equivalente en la v3.0
├── _bookdown.yml                Config bookdown: nombre del libro, rmd_files (activos vs. comentados)
├── _output.yml                  Formatos bookdown (gitbook/pdf_book/word_document2)
├── referencias.bib              Bibliografía
├── style.css                     Ajustes CSS menores heredados (tablas/código)
├── figuras/                     Diagramas (.mmd fuente + .png renderizado) y capturas del mock ClicSalud
├── datos/                       Matrices en CSV (nodos, rutas, cuotas, indicadores, preguntas)
├── docs/                        Salidas compiladas del libro (generado, no versionar a mano)
│
├── CLAUDE.md                    Prompt maestro / reglas metodológicas del documento
├── styles/                      Identidad visual MSPS aplicada a la salida (ver nota abajo) — NO se documenta como contenido del libro
├── 00_Cuestionario/             Insumo: matrices de indicadores, viabilidad, estructura de base
├── 01_App/                      Insumo: mock de la app de recolección (ClicSalud.html)
├── 02_arbol/                    Insumo: árbol de decisión (nodes/edges/modules/routes.js)
├── 03_Encuesta/                 Insumo: diseño muestral, tamaño de muestra, borradores metodológicos
└── 04_Marca/                    Insumo: manual de identidad visual MSPS (PDF) + recursos gráficos oficiales
```

### Anexos: retirados del libro por el cambio de prompt maestro (2026-08-19)

El prompt maestro v2.1 definía 13 anexos (A-M): Cuestionario completo,
Matriz de preguntas, Árbol completo, Matriz de rutas, Matriz de cuotas,
Especificación de pesos, Especificación de calibración por entropía,
Especificación de varianzas, Matriz de indicadores, Arquitectura de la
aplicación, Capturas del mock ClicSalud, Decisiones metodológicas y
cambios de versión, y Referencias bibliográficas. El prompt maestro v3.0
(§19) define en cambio solo 10 (A-J): Cuestionario, Matriz de preguntas,
Árbol de decisión, Matriz de rutas, Matriz de cuotas, Especificación de
calibración (fusiona pesos + calibración), Matriz de indicadores, Matriz
de trazabilidad, Especificación de estimación de varianza, y Evidencia
visual de ClicSalud — sin anexo aparte para arquitectura de la aplicación,
decisiones metodológicas ni referencias.

Por instrucción de Stalyn, los 13 archivos de la estructura anterior se
retiraron del libro (ya no están en `capitulos_bookdown/`, quedaron
comentados en `_bookdown.yml` y luego se eliminó esa referencia). No se
borraron: siguen completos en `_archivo/anexos_pre_v3/`, incluyendo el
registro de decisiones metodológicas ya adoptadas (peso inicial $d_i=1$,
límites de calibración, totales BDUA, método de varianzas, identidad
visual) que antes vivía en el Anexo L. Los nuevos Anexo A-J de la v3.0
**todavía no se han redactado**.

### Identidad visual: se aplica en la salida, no se documenta en el libro

La identidad visual institucional del MSPS (paleta, tipografía, logo) se
**aplica** a los tres formatos de salida (PDF/Word/HTML) — lo que no
corresponde es explicarla como contenido narrativo dentro del documento
metodológico, porque el lector de ENUS no necesita saber por qué se usa
cada color, logo o tipografía. Por eso el capítulo
`23-Formato_institucional_MSPS.Rmd` permanece retirado del libro, pero los
archivos de `styles/` que implementan la marca en la salida sí se
conservan y están activos en `_output.yml`:

```
styles/
├── preamble.tex              Preámbulo LaTeX del PDF: colores, Nunito Sans
│                             (fontspec), portada, encabezado/pie con logo
├── msps.css                  Estilos del HTML (gitbook): paleta, @font-face
│                             Nunito Sans, logo en la barra lateral
├── msps_reference.docx       reference-doc de pandoc para el Word: estilos
│                             en Verdana, colores institucionales, logo en
│                             encabezado, numeración de página
├── generar_reference_doc.py  Script que genera msps_reference.docx
│                             (ejecutar de nuevo solo si cambia la identidad
│                             visual: python styles/generar_reference_doc.py)
├── logo/                     Logo MSPS (color/blanco/gris, fondo transparente)
└── fonts/                    Nunito Sans (HTML/PDF) y Verdana (Word)
```

Fuente de la especificación (paleta, tipografía, logo):
`04_Marca/manual-identidad-visual-minsalud-gobierno-2024.pdf` y
`04_Marca/recursos_graficos-minsalud.zip`, suministrados por Stalyn. Detalle
de la decisión (colores exactos, uso diferenciado de cada tipografía) en la
decisión #7 del registro archivado en
`_archivo/anexos_pre_v3/35-Anexo_L_...Rmd`.

**Nota:** el 2026-08-19 se borraron por error `04_identidad_visual/` (nombre
original de esta carpeta) y varios archivos binarios de `styles/`, sin
control de versiones disponible aquí. Stalyn volvió a suministrar el manual
y los recursos gráficos como `04_Marca/`, y con eso se restauraron el logo,
la tipografía Nunito Sans y `styles/msps.css`. Los tres formatos ya
compilan de nuevo con la identidad completa — detalle de la recuperación en
`_archivo/anexos_pre_v3/35-Anexo_L_...Rmd`. Esta carpeta no tiene control de
versiones: si un archivo binario (PDF/PNG/TTF/ZIP) se borra por error, no
es recuperable desde el propio proyecto.

## Estado actual

El libro está reestructurado según el prompt maestro v3.0 (adoptado
2026-08-19): 25 archivos de cuerpo en `capitulos_bookdown/` (01 a 25),
de los cuales `index.Rmd` + 6 capítulos (01, 02, 03, 04, 07, 24) están
activos en `_bookdown.yml`. El resto conserva, bajo su nuevo nombre y
posición, el contenido (mayormente stub, "Pendiente de definición") que
ya tenía en la estructura v2.1 — no se reescribió al reordenar. Los 13
anexos A-M anteriores se archivaron fuera del libro (ver sección "Anexos"
más arriba) y los nuevos Anexo A-J de la v3.0 no se han redactado
todavía.

Nota sobre "Pendiente de definición": Stalyn indicó que esa marca no debe
usarse en contenido nuevo del documento técnico final — los 4 capítulos
nuevos (01, 04, 07, 24) no la usan. Los stubs preexistentes que aún la
usan (03, y el resto de capítulos sin activar) se dejaron intencionalmente
sin tocar; no editarlos en bloque salvo que Stalyn lo pida.

6 decisiones metodológicas fueron cerradas por Stalyn: peso inicial
($d_i=1$), límites de calibración (determinados en operación), totales de
referencia desde BDUA, método de varianzas (replicación de pesos
calibrados, B=500-1000) el 2026-08-17, e identidad visual institucional
MSPS el 2026-08-19 bajo la v2.1 — el registro completo de esas decisiones
(y del incidente de borrado/recuperación de archivos binarios) quedó
archivado en `_archivo/anexos_pre_v3/35-Anexo_L_...Rmd`; siguen vigentes
como decisiones aunque ese archivo ya no forme parte del libro. Además, la
pregunta abierta sobre el papel de las EPS/IPS como canal de reclutamiento
(capítulo 07) quedó explícitamente sin resolver por falta de evidencia en
los insumos técnicos — ver ese capítulo para el detalle.

## Requisitos pendientes antes de completar el documento

1. **Aportar evidencia sobre el mecanismo de participación vía EPS/IPS**
   (capítulo 07): los insumos técnicos (ClicSalud, árbol de decisión) no
   documentan si las EPS/IPS invitan, facilitan acceso mediante QR, u
   otro mecanismo — si existe, Stalyn debe suministrarlo.
2. **Redactar los capítulos 05-06, 08-23 y 25**, y los nuevos Anexo A-J,
   siguiendo la estructura §4, §5-16 y §19 del prompt maestro v3.0 —
   siguen con el contenido stub heredado de la v2.1 (mayormente
   "Pendiente de definición", que Stalyn pidió no dejar en el documento
   final).
3. Confirmar la estructura de módulos vigente del cuestionario (árbol vs.
   ClicSalud vs. Excel consolidado B0-B7).
4. Resolver la caracterización del diseño muestral (dos fases:
   probabilística + cuotas) frente a la instrucción de documentarlo como
   no probabilístico.
5. Tabular numéricamente los totales de referencia $X_j$ desde el cubo
   BDUA vigente (la fuente y las variables ya están decididas).

El listado completo de decisiones metodológicas con su estado queda en
`_archivo/anexos_pre_v3/35-Anexo_L_...Rmd` (fuera del libro, pero conservado
como registro).
