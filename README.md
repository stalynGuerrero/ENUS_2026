# ENUS 2026 — Documento Técnico

Especificación técnica reproducible de la operación estadística
**ClicSalud — Encuesta Nacional de Experiencia del Usuario en Salud (ENUS
2026)**, del Ministerio de Salud y Protección Social. El documento se
redacta como un libro bookdown (fuente en `index.Rmd` y
`capitulos_bookdown/*.Rmd`) y se compila a HTML, PDF y Word.

## Libro publicado

**https://stalynguerrero.github.io/ENUS_2026/**

El HTML navegable se publica desde `docs/` en la rama `main` vía GitHub
Pages; el PDF y el Word compilados están disponibles para descarga desde
esa misma página. `docs/` se sube manualmente después de cada
`bookdown::render_book(...)`.

## Capítulos propuestos

Cada capítulo se redacta directamente en su `.Rmd`; mientras tenga
contenido pendiente, su línea permanece comentada en `rmd_files` dentro de
`_bookdown.yml` y no entra en la compilación del libro.

1. Introducción
2. Antecedentes
3. Objetivo y alcance (incluye el marco conceptual: fenómenos medidos y su definición; y la población objetivo)
4. Diseño muestral (incluye el marco de referencia: fuente y actualización)
5. Papel de las EPS e IPS
6. Muestreo por cuotas
7. Variables de clasificación
8. Relación entre cuestionario y cuotas
9. Mecanismo de selección
10. Limitaciones del muestreo por cuotas
11. Instrumento de recolección (incluye ClicSalud)
12. Flujo y rutas del cuestionario
13. Reconciliación de estructuras
14. Procesamiento
15. Ponderación y calibración
16. Diagnóstico de calibración
17. Precisión e incertidumbre
18. Limitaciones
19. Referencias

## Compilación

```r
bookdown::render_book("index.Rmd", output_format = "bookdown::gitbook")        # libro HTML navegable
bookdown::render_book("index.Rmd", output_format = "bookdown::pdf_book")       # libro en PDF
bookdown::render_book("index.Rmd", output_format = "bookdown::word_document2") # libro en DOCX
```

