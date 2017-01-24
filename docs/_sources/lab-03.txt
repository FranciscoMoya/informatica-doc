
Lab 3: Archivos y manipulación de cadenas
=========================================

Lee atentamente los ejercicios que se piden a continuación relacionados
con el procesamiento de archivos y cadenas en Python y hazlos todos
ellos en una única entrega.

Todos los ejercicios deben manipular los datos de uno de los `archivos
en formato Csv distribuidos por el
INE <http://www.ine.es/jaxi/menu.do?type=pcaxis&path=/t13/p405&file=inebase&L=0>`__,
que contiene datos sobre los resultados de las antiguas Pruebas de
Acceso a la Universidad. Se ofrece como ejemplo para hacer pruebas `el
archivo correspondiente a los datos de
2012 <https://drive.google.com/file/d/0B6-YWONEXOQcem9QQnhsTFJRWUU/view?usp=sharing>`__
pero la evaluación no se realizará necesariamente con este archivo.

El formato Csv (*comma separated values*) es un formato textual para
tablas de datos. Cada línea corresponde a una fila de la tabla. Dentro
de una línea los valores de las celdas se separan por comas. Los valores
de cada celda pueden ir entre comillas o no. El significado de cada
columna y cada fila está en el propio archivo, en las etiquetas
correspondientes a cada fila o columna.

1. *Define la función ``comunidades_autonomas`` que tiene un único
   argumento de tipo cadena de texto que contiene la ruta del archivo a
   analizar. La función debe devolver una lista con las comunidades
   autónomas que aparecen en el archivo (ver primera columna del
   archivo).*

2. *Define una función ``aprobados_pau`` que tiene un único argumento de
   tipo cadena de texto que contiene la ruta del archivo a analizar. La
   función debe devolver un diccionario que utilice como clave los
   nombres de las comunidades autónomas (ver primera columna del
   archivo) y asocie a cada una de las comunidades el número de
   aprobados en las Pruebas de Acceso a la Universidad (de tipo
   entero).*

3. *Define una función ``suspensos_pau`` que tiene dos argumentos de
   tipo cadena de texto. El primero contiene la ruta del archivo a
   analizar. El segundo corresponde al nombre de una comunidad autónoma
   según los nombres que figuran en la primera columna del archivo. La
   función debe devolver el número de suspensos en las Pruebas de Acceso
   a la Universidad para la comunidad indicada (tipo entero).*

4. *Define una función ``comunidad_mas_aprobados`` que tiene un único
   argumento de tipo cadena de texto que contiene la ruta del archivo a
   analizar. La función debe devolver la comunidad autónoma con mejor
   tasa de aprobados en las Pruebas de Acceso a la Universidad.*

5. *Define una función ``comunidad_mas_diferencia`` que tiene un único
   argumento de tipo cadena de texto que contiene la ruta del archivo a
   analizar. La función debe devolver una tupla de dos elementos, la
   comunidad autónoma con mayor diferencia entre la tasa de aprobados de
   junio y septiembre, y el valor de esta diferencia. En caso de empate
   devolverá la primera que aparece en el archivo. Nota: la tasa de
   aprobados no se indica en porcentaje, sino en unidades naturales.*
