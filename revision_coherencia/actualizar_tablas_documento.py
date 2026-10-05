from pathlib import Path
import json
p=Path('capitulos_bookdown/06-Diseno_muestral.Rmd');s=p.read_text(encoding='utf8');data=json.loads(Path('revision_coherencia/asignacion_actualizada.json').read_text(encoding='utf8'));cells=data['cells']
start=s.index('Sobre la estructura de celdas se conserva');end=s.index('### Alcance de los resultados por departamento',start)
def fmt(n):return f'{n:,}'.replace(',','.')
block=r'''Sobre la estructura de celdas se conserva un **mínimo de 10 respuestas por celda con población positiva**. Las celdas vacías tienen meta cero. Primero se reserva el mínimo y después se distribuye el remanente proporcionalmente a la población. Este es el procedimiento implementado en el archivo fuente; difiere de aplicar un máximo a la asignación proporcional inicial.

Para cada departamento, con $C_d^+$ celdas de población positiva, se define:

$$
R_d=n_d-10C_d^+,\qquad q_c=R_d\frac{N_c}{\sum_{k:N_k>0}N_k}.
$$

La asignación inicial es $10+\lfloor q_c\rfloor$. Las unidades restantes se asignan a las celdas con mayor parte fraccionaria de $q_c$; los empates se resuelven por el orden de las filas del archivo. El procedimiento requiere $n_d\geq10C_d^+$; si no se cumple, se debe revisar la factibilidad antes de asignar. No se relaja silenciosamente el mínimo.

La matriz actualizada contiene **1.848 celdas**, todas con población positiva, y suma **43.173 respuestas**. Las 33 sumas departamentales coinciden exactamente con sus metas. Hay **39 celdas con meta 10** y la meta máxima es **72**. Los conteos poblacionales utilizados suman **50.168.746 afiliados** y coinciden por departamento con la tabla de planeación.

El **Anexo E — Matriz de metas de respuesta** se encuentra en `03_Encuesta/01_Tamaño_Muestra/Output/04_asignacion_sexo_edad10_departamento_regimen.xlsx`, hoja `2_Asignacion_Celda`. El archivo incluye parámetros, cálculo departamental, controles de cuadre y resúmenes. Los conteos poblacionales proceden de la matriz departamental existente (BDUA marzo de 2026); la actualización modifica las metas y conserva esos conteos. El procedimiento reproducible actualizado está en `revision_coherencia/actualizar_asignacion.py`.

### Resultado agregado por región y régimen

| Región | Contributivo | Subsidiado | Total región |
|---|---:|---:|---:|
'''
for region in data['summary']['region']:
 vals=[sum(c['meta'] for c in cells if c['region']==region and c['regimen']==reg) for reg in ['CONTRIBUTIVO','SUBSIDIADO']]
 block+=f'| {region} | {fmt(vals[0])} | {fmt(vals[1])} | {fmt(sum(vals))} |\n'
block+='| **Total nacional** | **17.505** | **25.668** | **43.173** |\n\nTable: (\\#tab:cuota-region-regimen) Metas de respuesta por región y régimen, obtenidas por agregación de la matriz departamental actualizada.\n\n### Composición agregada de las metas\n\n'
for key,title,label in [('sexo','Sexo','cuota-sexo'),('edad','Grupo de edad','cuota-edad'),('zona','Zona','cuota-zona')]:
 block+=f'| {title} | Meta | % |\n|---|---:|---:|\n'
 for name,(pop,n) in data['summary'][key].items():block+=f'| {name} | {fmt(n)} | {100*n/43173:.1f} % |\n'.replace('.',',') if False else f'| {name} | {fmt(n)} | {str(round(100*n/43173,1)).replace(".",",")} % |\n'
 block+=f'| **Total** | **43.173** | **100 %** |\n\nTable: (\\#tab:{label}) Composición de las metas por {title.lower()}, matriz departamental actualizada. Los porcentajes se redondean de forma independiente.\n\n'
s=s[:start]+block+s[end:];p.write_text(s,encoding='utf8')
p=Path('capitulos_bookdown/00-Glosario.Rmd');s=p.read_text(encoding='utf8');s=s.replace('[**Pendiente de actualización.**]{.pendiente-rojo} El archivo vigente del anexo está organizado por región y debe regenerarse con la estructura departamental','La matriz actualizada contiene 1.848 celdas departamentales y suma 43.173 respuestas; está disponible en la hoja `2_Asignacion_Celda` del archivo departamental');p.write_text(s,encoding='utf8')
p=Path('revision_coherencia/01_revision_y_decisiones.md');s=p.read_text(encoding='utf8');s+='\n## Actualización de asignación completada\n\nSe localizó la matriz departamental y se verificaron sus conteos: 50.168.746 personas, con coincidencia en los 33 departamentos. Se recalcularon las metas enteras (43.173) y la asignación de 1.848 celdas mediante mínimo de 10 más remanente proporcional y resto mayor. Se actualizaron el Anexo E y las tablas agregadas. Los 33 controles de cuadre son cero. El libro Excel incluye fórmulas con resultados almacenados, verificadas contra el cálculo independiente del script. No se compiló el libro bookdown.\n';p.write_text(s,encoding='utf8')
print('Documento y glosario actualizados.')
