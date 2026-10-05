from pathlib import Path
import json,re,shutil
from openpyxl import load_workbook
root=Path.cwd(); inv=json.loads(Path('revision_coherencia/inventario_formularios_V07.json').read_text(encoding='utf8'))
form='00_Cuestionario/V1/ENUS_Formato_por_Modulos_CartaDerechos_V07 17092026.xlsx';matrix='00_Cuestionario/V1/Matriz_de_indicadores_-_Fichas_tecnicas_ENUS_V07_30092026.xlsx'
for name in ['13-Instrumento_de_recoleccion','06-Diseno_muestral','18-Ponderacion_y_calibracion']:
 shutil.copy2(Path('capitulos_bookdown')/(name+'.Rmd'),Path('revision_coherencia/respaldo')/(name+'_antes_revision_V07.Rmd'))
p=Path('capitulos_bookdown/13-Instrumento_de_recoleccion.Rmd');s=p.read_text(encoding='utf8')
intro='''## Fuente vigente y estructura de los formularios {#sec-formularios-v07}

La fuente vigente del cuestionario es `'''+form+'''`; las definiciones de indicadores se consultan en `'''+matrix+'''`. Se identifica la versión por archivo y fecha: algunos encabezados internos del formulario aún dicen «Versión 04», y el Índice, el Plan de Análisis y el Control de Cambios no reflejan completamente sus hojas de módulo. Para describir las preguntas se toma como referencia el contenido efectivo de cada formulario; para cálculo y restricciones, las fichas técnicas de la matriz del 30 de septiembre.

Los ocho formularios son independientes y contienen Sección A (identificación administrativa), Sección B (trazadoras y preguntas transversales) y Sección C (preguntas específicas). No existe salto de un formulario a otro. La siguiente tabla cuenta códigos de pregunta presentes, no opciones de respuesta ni el número que responderá cada persona; las rutas condicionan la carga efectiva.

| Formulario | Códigos T distintos | Registros T | Preguntas específicas C |
|---|---:|---:|---:|
'''
for x in inv:intro+=f"| {x['module']} | {x['t_unique']} | {x['t_rows']} | {x['p_count']} |\n"
intro+='''
EPS 2 tiene dos apariciones de T13 y T14. Los demás conteos incluyen T12a y las preguntas de cierre que efectivamente aparecen: T18 no está en IPS 4 ni en Gestor. Los códigos de Sección C suman 123 entradas entre módulos; no son 123 preguntas semánticamente diferentes, pues existen contenidos compartidos.

**Periodo de referencia.** Los formularios reemplazan seis meses por «el último año» en preguntas de uso, cambio de EPS, necesidad de atención y otros eventos; varias preguntas de experiencia se refieren a la última atención. Esto no modifica automáticamente la ventana de seis meses del marco de invitación. Se debe armonizar el periodo del cuestionario, la elegibilidad y los universos de los indicadores antes de publicar resultados.

**Perfil y asignación.** El Índice describe preselección de los formularios por perfil de servicio y destina EPS 1 a no usuarios. T06 y T09 se presentan como clasificación y control, sin salto entre formularios. Esta especificación no coincide completamente con la asignación aleatoria entre todos los módulos de un actor descrita en el diseño. Las fuentes V07 no resuelven esa decisión: se requiere definir módulos elegibles por persona, probabilidades y totales de calibración, y el tratamiento de discordancias de perfil.

'''
s=s.replace('## Estructura general de la aplicación',intro+'## Estructura general de la aplicación',1)
start=s.index('Al iniciar la encuesta, el usuario responde Parte 2: once preguntas');end=s.index('### Paso 11.',start)
s=s[:start]+'''El prototipo documentado en las capturas presenta once preguntas, pero esa cantidad y sus textos no describen los formularios vigentes V07. La Sección B incorpora códigos T01–T18 y T12a, con diferencias y duplicados según módulo, detallados en \\@ref(sec-formularios-v07). T01 y T02 identifican el documento; no deben contarse automáticamente como preguntas sustantivas adicionales después de la autenticación.

La adaptación del aplicativo debe usar los textos, opciones y condiciones del formulario vigente. En particular, T06, T07 y T12 se refieren al último año; T12a indaga la razón de no acudir y es condicional a T12; T14 recoge tutela o PQRS. Las preguntas T15–T18 deben mapearse por módulo y constructo: no puede asumirse que un mismo código T representa una variable idéntica en todos los formularios.

Las capturas previas ilustran el diseño de pantalla y no certifican los textos, escalas o la cantidad de preguntas de V07. Deben actualizarse después de armonizar el formulario y las rutas con el aplicativo.

'''+s[end:]
s+='''
## Controles pendientes de los formularios vigentes

La hoja «Hallazgos del instrumento» de la matriz V07 documenta las incidencias y su efecto en los indicadores. Entre las de mayor prioridad están la duplicación de la pregunta de espera en lugar del desplazamiento (EPS 3 e IPS 1), preguntas de experiencia no aplicables a no usuarios, códigos T15–T18 con constructos distintos y saltos desactualizados del gestor farmacéutico. La matriz señala IND-ACC-11 como suspendido; no debe presentarse como calculable mientras falte la pregunta pertinente.

También requieren control los duplicados T13/T14 en EPS 2, opciones repetidas en T09, formatos heterogéneos de tiempo, ausencia de captura de triage y la batería abreviada de atención centrada en la persona. Estas incidencias no se corrigen por asumir que el Plan de Análisis o el Control de Cambios están actualizados: deben resolverse en los formularios, las reglas del aplicativo y las fichas afectadas de forma trazable. Los archivos fuente V1 se conservan sin modificación en esta revisión.
'''
p.write_text(s,encoding='utf8')
p=Path('capitulos_bookdown/06-Diseno_muestral.Rmd');s=p.read_text(encoding='utf8').replace('`00_Cuestionario/ENUS_Formato_por_Modulos.xlsx`','`'+form+'`');s=s.replace('### Módulos de Parte 3','### Módulos de Parte 3',1);pos=s.index('### Módulos de Parte 3');end=s.index('### Diferenciación frente a las metas',pos)
s=s[:end]+'''**Contraste con la fuente vigente V07.** Los formularios en `00_Cuestionario/V1` son independientes y describen perfiles preseleccionados por uso de servicio en el último año, incluido EPS 1 para no usuarios. Esta especificación difiere de la asignación aleatoria entre todos los módulos del actor y del marco de usuarios con atención en seis meses aquí documentados. Antes de implementar se deben resolver la elegibilidad de cada módulo y el universo de EPS 1; si cambia el conjunto de módulos asignables, deben revisarse las probabilidades y los pesos, en lugar de conservar automáticamente 1/3 o 1/4. Véase \\@ref(sec-formularios-v07).

'''+s[end:];p.write_text(s,encoding='utf8')
p=Path('capitulos_bookdown/18-Ponderacion_y_calibracion.Rmd');s=p.read_text(encoding='utf8');s=s.replace('## Estimadores {#sec-estimadores}','''## Estimadores {#sec-estimadores}

**Referencia de indicadores vigente.** Los universos, preguntas origen, denominadores y restricciones se consultan en `'''+matrix+'''`. No se consolida una variable únicamente por código T: T15–T18 varían por módulo. Las referencias a uso de servicios en el último año y al perfil de no usuarios requieren armonización con el marco antes de estimar. Los filtros y exclusiones documentados en las fichas deben aplicarse por indicador; IND-ACC-11 permanece suspendido por falta de una pregunta válida de desplazamiento. La batería de atención centrada en la persona debe identificarse como abreviada, sin equipararla automáticamente al bloque completo.
''');p.write_text(s,encoding='utf8')
w=load_workbook(matrix,data_only=True);h=w['Hallazgos del instrumento'];report=['# Revisión de formularios V07 — fuentes vigentes','',f'Formulario: `{form}`',f'Matriz: `{matrix}`','','Se actualizaron instrumento, diseño y estimadores. No se modificaron los Excel fuente.','', '## Hallazgos documentados en la matriz vigente','']
for row in list(h.values)[3:]:
 if row[0] is None:continue
 report += [f"### {row[0]}. {row[1]}",f"**Hallazgo:** {row[2]}",f"**Impacto:** {row[3]}",f"**Indicadores:** {row[4]}",f"**Acción propuesta en la fuente:** {row[5]}",f"**Prioridad de la fuente:** {row[6]}",'']
Path('revision_coherencia/02_revision_formularios_V07.md').write_text('\n'.join(report),encoding='utf8')
print('Inventario y revisión guardados; tres capítulos actualizados.')
