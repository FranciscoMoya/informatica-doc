
Archivos con Python
===================

En los próximos ejercicios vamos a usar frecuentemente archivos de
datos, así que es un buen momento para leer en detalle el capítulo 11
del libro de texto. Las funciones básicas de escritura son muy
sencillas.

.. code:: python

    f = open('ejemplo.txt', 'w')
    f.write('''Esto es un ejemplo de archivo
    escrito con Python.
      Puedo escribir en varias lineas porque
    estoy usando las triples comillas.''')
    f.close()

Leer archivos es igual de sencillo.

.. code:: python

    fi = open('ejemplo.txt', 'r')
    for linea in fi:
        print(linea,end='')
    fi.close()


.. parsed-literal::

    Esto es un ejemplo de archivo
    escrito con Python.
      Puedo escribir en varias lineas porque
    estoy usando las triples comillas.

Observa que pongo una coma al final del ``print``. Lo hago porque las
líneas incluyen el caracter terminador de línea si lo hubiera. También
puedo quitarlos con ``strip`` pero observa cómo ``strip`` elimina
también los espacios al principio de la línea:

.. code:: python

    fi = open('ejemplo.txt', 'r')
    for linea in fi:
        print(linea.strip())
    fi.close()


.. parsed-literal::

    Esto es un ejemplo de archivo
    escrito con Python.
    Puedo escribir en varias lineas porque
    estoy usando las triples comillas.


Como resumen podemos decir que en la mayoría de los casos solo se
necesitan 3 funciones para manejar archivos (``open``, ``close`` y
``write``). Hay muchas más y te animo a que leas en detalle el capítulo
11 del libro y la `documentación de archivos
oficial <https://docs.python.org/2.7/library/stdtypes.html#bltin-file-objects>`__.
Lo que leemos o escribimos de/en archivos son cadenas de texto, así que
para usos avanzados tendremos que dominar las cadenas de texto. Repasa
el capítulo 7 del libro de texto y la `documentación de cadenas
oficial <https://docs.python.org/2.7/library/stdtypes.html#string-formatting>`__.
También puede que te resulten útiles los módulos
`string <https://docs.python.org/2.7/library/string.html?highlight=string#module-string>`__
y `re <https://docs.python.org/2.7/library/re.html#module-re>`__.

Lectura de archivos CSV
-----------------------

Los archivos CSV no son diferentes de los demás, son simples archivos de
texto en los que cada línea corresponde a una fila de una tabla. Cada
campo en una línea se separa con una coma. (El nombre CSV deriva
precisamente de ésto (*Comma Separated Values*). En Python existe un
módulo ``csv`` que simplifica la lectura de estos archivos. Pero
realmente es muy simple también procesarlos a mano. Esto podría ser un
ejemplo de archivo CSV.

.. raw:: html

   <pre>,Ambos sexos,Mujeres
   Aragón,"6845.0","3962.0"
   Canarias,"11164.0","6181.0"</pre>

.. code:: python

    fi = open('ejemplo.csv', 'r')
    for linea in fi:
        fila = linea.strip()
        celdas = fila.split(',')
        for celda in celdas:
            print('[{!s:>11}]\t'.format(celda), end='')
        print()
    fi.close()


.. parsed-literal::

    [           ]	[Ambos sexos]	[    Mujeres]	
    [     Aragón]	[   "6845.0"]	[   "3962.0"]	
    [   Canarias]	[  "11164.0"]	[   "6181.0"]	



Caso de estudio: Censo de viviendas
-----------------------------------

El INE distribuye datos del `Censo de Población y
Viviendas <http://www.ine.es/prodyser/micro_censopv.htm>`__ que incluyen
dos archivos interesantes para nuestros propósitos:

-  Por un lado se distribuyen los `microdatos de toda
   España <ftp://www.ine.es/temas/censopv/cen11/Microdatos_viviendas_nacional.rar>`__
   que contienen todos los datos de la encuesta sin procesar.

-  Por otro lado se distribuye una hoja de cálculo que describe el
   `formato de cada registro del archivo de
   microdatos <ftp://www.ine.es/temas/censopv/cen11/Viviendas%20y%20Edificios_WEB.xls>`__.

Veamos cómo es el diseño de los registros. Es una tabla que indica a
partir de qué posición empieza cada campo y hasta qué posición, así como
la interpretación que tiene cada posible valor. Por ejemplo, para ver si
la vivienda tiene o no Internet habría que consultar el caracter 25
(empezando desde 1). Es decir, si ``linea`` contiene una línea completa
del archivo de microdatos entonces ``linea[24]`` nos indica si tiene o
no Internet esa vivienda.

.. raw:: html

   <table cellspacing="0" border="0">

::

    <tr>
        <td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" rowspan=3 height="42" align="left" valign=top bgcolor="#E3E3E3"><b><font size=1>Nombre del campo</font></b></td>
        <td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" rowspan=3 align="left" valign=top bgcolor="#E3E3E3"><b><font size=1>Nombre de la variable</font></b></td>
        <td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" rowspan=3 align="left" valign=top bgcolor="#E3E3E3"><b><font size=1>Longitud del campo</font></b></td>
        <td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" rowspan=3 align="left" valign=top bgcolor="#E3E3E3"><b><font size=1>Inicio</font></b></td>
        <td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" rowspan=3 align="left" valign=top bgcolor="#E3E3E3"><b><font size=1>Fin</font></b></td>
        <td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" rowspan=3 align="left" valign=top bgcolor="#E3E3E3"><b><font size=1>Valores validos</font></b></td>
    </tr>
    <tr>
        </tr>
    <tr>
        </tr>
    <tr>
        <td style="border-top: 2px solid #000000; border-left: 2px solid #000000" height="26" align="left" bgcolor="#FFD475"><b><font size=1>Identificación</font></b></td>
        <td style="border-top: 2px solid #000000" align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td style="border-top: 2px solid #000000" align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td style="border-top: 2px solid #000000" align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td style="border-top: 2px solid #000000" align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td style="border-top: 2px solid #000000; border-right: 2px solid #000000" align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="21" align="left" valign=top><font size=1>Código de provincia</font></td>
        <td align="left" valign=top><font size=1>CPRO</font></td>
        <td align="center" valign=top sdval="2" sdnum="3082;"><font size=1>2</font></td>
        <td align="center" valign=top sdval="1" sdnum="3082;"><font size=1>1</font></td>
        <td align="center" valign=top sdval="2" sdnum="3082;"><font size=1>2</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>Desde 1 hasta 52</font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="94" align="left" valign=top><font size=1>Código o tamaño de municipio</font></td>
        <td align="left" valign=top><font size=1>CMUN</font></td>
        <td align="center" valign=top sdval="3" sdnum="3082;"><font size=1>3</font></td>
        <td align="center" valign=top sdval="3" sdnum="3082;"><font size=1>3</font></td>
        <td align="center" valign=top sdval="5" sdnum="3082;"><font size=1>5</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>Si tamaño de municipio &lt;=2.000, CMUN=991<br>Si 2.001 &lt;=tamaño de municipio &lt;=5.000, CMUN=992<br>Si 5.001 &lt;=tamaño de municipio &lt;=10.000, CMUN=993<br>Si 10.001 &lt;=tamaño de municipio &lt;=20.000, CMUN=994<br>Si tamaño de municipio &gt;20.000, CMUN=Código de municipio</font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="21" align="left" bgcolor="#FFD475"><b><font size=1>Datos de la vivienda</font></b></td>
        <td align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td style="border-right: 2px solid #000000" align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="20" align="left" valign=top><font size=1>Factor de elevación de la vivienda</font></td>
        <td align="left" valign=top><font size=1>FACTOR</font></td>
        <td align="center" valign=top sdval="14" sdnum="3082;"><font size=1>14</font></td>
        <td align="center" valign=top sdval="6" sdnum="3082;"><font size=1>6</font></td>
        <td align="center" valign=top sdval="19" sdnum="3082;"><font size=1>19</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1 color="#FF0000"><br></font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="56" align="left" valign=top><font size=1>Clase de vivienda </font></td>
        <td align="left" valign=top><font size=1>CVIVIF</font></td>
        <td align="center" valign=top sdval="1" sdnum="3082;"><font size=1>1</font></td>
        <td align="center" valign=top sdval="20" sdnum="3082;"><font size=1>20</font></td>
        <td align="center" valign=top sdval="20" sdnum="3082;"><font size=1>20</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>1 Vivienda Prinicipal<br>2 Vivienda Secundaria<br>3 Vivienda Vacía</font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="150" align="left" valign=top><font size=1>Régimen de tenencia</font></td>
        <td align="left" valign=top><font size=1>TENEN</font></td>
        <td align="center" valign=top sdval="1" sdnum="3082;"><font size=1>1</font></td>
        <td align="center" valign=top sdval="21" sdnum="3082;"><font size=1>21</font></td>
        <td align="center" valign=top sdval="21" sdnum="3082;"><font size=1>21</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>1 Propia, por compra, totalmente pagada<br>2 Propia, por compra, con pagos pendientes (hipotecas)<br>3 Propia por herencia o donación<br>4 Alquilada<br>5 Cedida gratis o a bajo precio (por otro hogar, pagada por la empresa...)<br>6 Otra forma<br>Blanco si CVIVIF &lt;&gt; 1 </font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="113" align="left" valign=top><font size=1>Calefacción </font></td>
        <td align="left" valign=top><font size=1>CALE</font></td>
        <td align="center" valign=top sdval="1" sdnum="3082;"><font size=1>1</font></td>
        <td align="center" valign=top sdval="22" sdnum="3082;"><font size=1>22</font></td>
        <td align="center" valign=top sdval="22" sdnum="3082;"><font size=1>22</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>1 Colectiva o central<br>2 Individual<br>3 No tiene calefacción pero sí algún aparato que permite calentar<br>4 No tiene calefacción<br>Blanco si CVIVIF &lt;&gt; 1 </font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="56" align="left" valign=top><font size=1>Cuanto de aseo con inodoro</font></td>
        <td align="left" valign=top><font size=1>ASEO</font></td>
        <td align="center" valign=top sdval="1" sdnum="3082;"><font size=1>1</font></td>
        <td align="center" valign=top sdval="23" sdnum="3082;"><font size=1>23</font></td>
        <td align="center" valign=top sdval="23" sdnum="3082;"><font size=1>23</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>1 Sí<br>2 No<br>Blanco si CVIVIF &lt;&gt; 1 </font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="56" align="left" valign=top><font size=1>Baño o ducha</font></td>
        <td align="left" valign=top><font size=1>BADUCH</font></td>
        <td align="center" valign=top sdval="1" sdnum="3082;"><font size=1>1</font></td>
        <td align="center" valign=top sdval="24" sdnum="3082;"><font size=1>24</font></td>
        <td align="center" valign=top sdval="24" sdnum="3082;"><font size=1>24</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>1 Sí<br>2 No<br>Blanco si CVIVIF &lt;&gt; 1 </font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="56" align="left" valign=top><font size=1>Acceso a Internet</font></td>
        <td align="left" valign=top><font size=1>INTERNET</font></td>
        <td align="center" valign=top sdval="1" sdnum="3082;"><font size=1>1</font></td>
        <td align="center" valign=top sdval="25" sdnum="3082;"><font size=1>25</font></td>
        <td align="center" valign=top sdval="25" sdnum="3082;"><font size=1>25</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>1 Sí<br>2 No<br>Blanco si CVIVIF &lt;&gt; 1 </font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="94" align="left" valign=top><font size=1>Sistema de suministro de agua</font></td>
        <td align="left" valign=top><font size=1>AGUACOR</font></td>
        <td align="center" valign=top sdval="1" sdnum="3082;"><font size=1>1</font></td>
        <td align="center" valign=top sdval="26" sdnum="3082;"><font size=1>26</font></td>
        <td align="center" valign=top sdval="26" sdnum="3082;"><font size=1>26</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>1 Agua corriente por abastecimiento público<br>2 Agua corriente por abastecimiento privado o particular del edificio<br>3 No tiene agua corriente<br>Blanco si CVIVIF &lt;&gt; 1 </font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="38" align="left" valign=top><font size=1>Superficie útil</font></td>
        <td align="left" valign=top><font size=1>SUT</font></td>
        <td align="center" valign=top sdval="3" sdnum="3082;"><font size=1>3</font></td>
        <td align="center" valign=top sdval="27" sdnum="3082;"><font size=1>27</font></td>
        <td align="center" valign=top sdval="29" sdnum="3082;"><font size=1>29</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>Desde 5 hasta 999<br>Blanco si CVIVIF &lt;&gt; 1 </font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="38" align="left" valign=top><font size=1>Número de habitaciones</font></td>
        <td align="left" valign=top><font size=1>NHAB</font></td>
        <td align="center" valign=top sdval="2" sdnum="3082;"><font size=1>2</font></td>
        <td align="center" valign=top sdval="30" sdnum="3082;"><font size=1>30</font></td>
        <td align="center" valign=top sdval="31" sdnum="3082;"><font size=1>31</font></td>
        <td style="border-right: 2px solid #000000" align="left" valign=top><font size=1>Desde 1 hasta 99<br>Blanco si CVIVIF &lt;&gt; 1 </font></td>
    </tr>
    <tr>
        <td style="border-left: 2px solid #000000" height="22" align="left" bgcolor="#FFD475"><b>...</b></td>
        <td align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
        <td style="border-right: 2px solid #000000" align="left" bgcolor="#FFD475"><font face="Univers" size=1><br></font></td>
    </tr>

.. raw:: html

   </table>

Vamos a contestar alguna pregunta de ejemplo. Por ejemplo, ¿cuántas
viviendas secundarias (caracter 20) tienen Internet (caracter 25)?

.. code:: python

    def viviendas_secundarias_con_internet():
        f = open('Microdatos_viviendas.txt', 'r')
        c = 0
        for linea in f:
            if linea[19] == '2' and linea[24] == '1':
                c += 1
        f.close()
        return c

.. code:: python

    print('{} viviendas secundarias tienen Internet'
          .format(viviendas_secundarias_con_internet()))


.. parsed-literal::

    0 viviendas secundarias tienen Internet


¿Y qué porcentaje de viviendas principales tiene Internet?

.. code:: python

    def viviendas_1_con_internet():
        f = open('Microdatos_viviendas.txt', 'r')
        viviendas = 0
        internet = 0
        for linea in f:
            if linea[19] == '1':
                viviendas += 1
                if linea[24] == '1':
                    internet += 1
        f.close()
        return internet*100.0/viviendas

.. code:: python

    print('El {:.2f}% de las primeras viviendas tienen Internet'
          .format(viviendas_1_con_internet()))


.. parsed-literal::

    El 50.65% de las primeras viviendas tienen Internet


Ese código con tantos niveles de anidamiento no es bonito, vamos a
refactorizarlo un poco.

.. code:: python

    def viviendas_1_con_internet():
        f = open('Microdatos_viviendas.txt', 'r')
        viviendas = 0
        internet = 0
        for linea in f:
            viviendas, internet = acum_datos_interes(linea, viviendas, internet)
        f.close()
        return 100.0 * internet / viviendas
    
    def acum_datos_interes(linea, viviendas, internet):
        if linea[19] == '1':
            viviendas += 1
            if linea[24] == '1':
                internet += 1
        return viviendas, internet

.. code:: python

    print ('El {:.2f}% de las primeras viviendas tienen Internet'
           .format(viviendas_1_con_internet()))


.. parsed-literal::

    El 50.65% de las primeras viviendas tienen Internet


Sigue sin ser especialmente elegante pero ya no tiene tantos niveles de
indentación. Aprenderemos a mejorarlo cuando veamos clases.
