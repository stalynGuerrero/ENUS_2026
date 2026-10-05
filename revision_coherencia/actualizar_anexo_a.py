from pathlib import Path
from openpyxl import load_workbook
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.pagesizes import A4,landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from xml.sax.saxutils import escape
from pypdf import PdfReader
import re,shutil,json
out=Path('Anexos/Anexo_A_Formularios_del_cuestionario.pdf');shutil.copy2(out,Path('revision_coherencia/respaldo/Anexo_A_antes_actualizacion_V07.pdf'))
source=next(Path('00_Cuestionario/V1').glob('ENUS*.xlsx'));w=load_workbook(source,data_only=True)
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'));pdfmetrics.registerFont(TTFont('ArialBold','C:/Windows/Fonts/arialbd.ttf'))
styles=getSampleStyleSheet();styles.add(ParagraphStyle(name='CellENUS',fontName='Arial',fontSize=8.3,leading=10.5,spaceAfter=1));styles.add(ParagraphStyle(name='HeadENUS',fontName='ArialBold',fontSize=16,leading=20,spaceAfter=12,textColor=colors.HexColor('#1F4E79')));styles.add(ParagraphStyle(name='BodyENUS',fontName='Arial',fontSize=10,leading=14,spaceAfter=10))
P=lambda t:Paragraph(escape(str(t)).replace('\n','<br/>'),styles['CellENUS'])
story=[Paragraph('Anexo A — Formularios del cuestionario',styles['HeadENUS']),Paragraph('ENUS 2026 · Actualización del 5 de octubre de 2026',styles['BodyENUS']),Paragraph('Este anexo reproduce el contenido de los ocho formularios vigentes identificados como V07, con identificación administrativa, preguntas trazadoras, bloques específicos, opciones y reglas de salto. Se conserva el texto de las hojas de módulo; no se utiliza el Índice ni el Plan de Análisis para reconstruir preguntas.',styles['BodyENUS']),Paragraph('Alcance de la actualización: incorpora los últimos aportes presentes en los formularios. Las incidencias de aplicabilidad, duplicación, codificación y saltos registradas en la revisión permanecen pendientes de validación; la reproducción no equivale a declarar los formularios listos para aplicación. La fecha de esta edición del anexo no modifica la fecha ni la versión del instrumento fuente.',styles['BodyENUS'])]
inv=[]
for s in w:
 if 'Módulo' not in s.title:continue
 codes=[]
 for row in s:
  if row[0].value and re.fullmatch(r'(T\d+[a-z]?|M\d(?:EPS|IPS|GES)[_-]P\d+[a-z]?)',str(row[0].value).strip()):codes.append(str(row[0].value).strip())
 inv.append((s.title,len([c for c in codes if c.startswith('T')]),len(set(c for c in codes if c.startswith('T'))),len([c for c in codes if c.startswith('M')])))
t=Table([[P('Formulario'),P('Registros T'),P('Códigos T distintos'),P('Preguntas C')]]+[[P(c) for c in row] for row in inv],colWidths=[330,110,160,120]);t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#DCE6F1')),('GRID',(0,0),(-1,-1),.3,colors.grey),('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),6)]));story.append(t)
story.append(Spacer(1,12));story.append(Paragraph('Los conteos corresponden a códigos presentes, no al número de respuestas de cada persona. EPS 2 contiene duplicados de T13 y T14. Las preguntas específicas suman 123 entradas entre formularios; incluyen contenidos compartidos.',styles['BodyENUS']))
for s in w:
 if 'Módulo' not in s.title:continue
 story.append(PageBreak());story.append(Paragraph(escape(s.title),styles['HeadENUS']))
 section=None;bucket=[]
 def flush():
  if not bucket:return
  widths=[35,75,245,65,210,120] if section!='A' else [35,180,535]
  header=['Código','Categoría','Pregunta','Código / tipo','Opción de respuesta','Pase a / instrucción'] if section!='A' else ['N.º','Variable','Descripción']
  tab=Table([[P(v) for v in header]]+[[P(v) for v in row] for row in bucket],colWidths=widths,repeatRows=1,hAlign='LEFT')
  tab.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#DCE6F1')),('GRID',(0,0),(-1,-1),.25,colors.HexColor('#B8C4CE')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),4),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#F5F7FA')])]))
  story.append(tab);story.append(Spacer(1,10));bucket.clear()
 for row in s.values:
  r=list(row)+[None]*6;r=r[:6];v=str(r[0] or '')
  if v.startswith('SECCIÓN'):
   flush();section='A' if 'SECCIÓN A' in v else ('B' if 'SECCIÓN B' in v else 'C');story.append(Paragraph(escape(v),styles['BodyENUS']));continue
  if not section:continue
  if v=='N°' or v=='Nº':continue
  if not any(x is not None for x in r):continue
  if r[0] and all(x is None for x in r[1:]):flush();story.append(Paragraph(escape(v),styles['BodyENUS']));continue
  bucket.append(['' if x is None else str(x) for x in (r[:3] if section=='A' else r)])
 flush()
def footer(c,doc):
 c.setFont('Arial',8);c.setFillColor(colors.HexColor('#506070'));c.drawString(35,22,'ENUS 2026 · Anexo A · Formularios V07');c.drawRightString(807,22,str(doc.page))
SimpleDocTemplate(str(out),pagesize=landscape(A4),leftMargin=35,rightMargin=35,topMargin=35,bottomMargin=38,title='Anexo A — Formularios ENUS 2026 V07',author='Ministerio de Salud y Protección Social').build(story,onFirstPage=footer,onLaterPages=footer)
r=PdfReader(out);text='\n'.join(p.extract_text() or '' for p in r.pages);assert all(name in text for name,*_ in inv);flat=re.sub(r'\s+','',text);assert all(c in flat for c in ['M1GES-P12','T12a','M2EPS_P28'])
print('Anexo actualizado:',len(r.pages),'páginas. Ocho formularios y códigos nuevos verificados.')
