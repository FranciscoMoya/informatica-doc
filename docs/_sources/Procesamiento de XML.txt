
Procesamiento de XML
====================

XML es un lenguaje de marcado para escribir documentos estructurados. Se
usa para multitud de aplicaciones y por tanto deben conocerse al menos
los rudimentos.

Un documento XML está jerárquicamente dividido por *elementos*
identificados por etiquetas (*tags*). La etiqueta que marca el comienzo
se identifica con una palabra entre corchetes angulares, mientras que la
etiqueta que marca el final se identifica con un carácter ``/``
adicional antes de la misma palabra. Por ejemplo:

.. raw:: html

   <pre>
   &lt;root&gt;
   ...
   &lt;/root&gt;
   </pre>

Dentro de un elemento puede haber otros elementos. Por ejemplo:

.. raw:: html

   <pre>
   &lt;root&gt;
   &lt;origen&gt;...&lt;/origen&gt;
   &lt;nombre&gt;...&lt;/nombre&gt;
   &lt;/root&gt;
   </pre>

Cada etiqueta puede tener atributos que se incluyen justo después de la
etiqueta de comienzo con los valores entre comillas:

.. raw:: html

   <pre>
   &lt;root id="28013" version="1.0"&gt;
   ...
   &lt;/root&gt;
   </pre>

Un elemento también puede contener texto entre las etiquetas de comienzo
y fin:

.. raw:: html

   <pre>
   &lt;nombre&gt;Aranjuez&lt;/nombre&gt;
   </pre>

Un documento XML bien formado solo contiene un elemento raíz (no
contenido en ningún otro elemento). Por tanto al leer un documento XML
se genera un arbol de elementos.

La biblioteca estándar de Python incluye `varios
módulos <https://docs.python.org/2/library/xml.html>`__ relacionados con
la lectura y escritura de documentos XML. Nosotros solo comentaremos el
más sencillo. Consulta la `documentación de
Python <https://docs.python.org/2/library/xml.html>`__ si necesitas
ampliar más.

Leer con ``ElementTree``
------------------------

El procesador de XML más simple y ligero de los incluidos en Python es
``xml.etree.ElementTree``. Ilustraremos su uso con un archivo XML como
los empleados en el trabajo en grupo.

.. code:: python

    import requests
    r = requests.get('http://www.aemet.es/xml/municipios/localidad_28013.xml')
    xml = r.text.encode('utf-8')

Ahora la variable ``xml`` contiene una cadena con todo el documento XML.
Veamos cómo interpretarlo con ``ElementTree``.

.. code:: python

    import xml.etree.ElementTree as ET
    root = ET.fromstring(xml)

La función ``fromstring`` devuelve un objeto de tipo ``Element``, el
elemento raíz del documento XML. ``Element`` permite acceder a todos los
componentes de un elemento con estas funciones:

-  ``e.iter('etiqueta')`` devuelve todos los elementos ``etiqueta`` que
   haya dentro del elemento ``e``. Incluso los que estén dentro de otros
   elementos contenidos dentro de ``e``.
-  ``e.find('etiqueta')`` devuelve el primer elemento ``etiqueta`` que
   es hijo directo de ``e``.
-  ``e.findall('etiqueta')`` devuelve todos los elementos ``etiqueta``
   que son hijos directos de ``e``.
-  ``e.text`` devuelve la cadena correspondiente al texto del elemento
   ``e``.
-  ``e.attrib`` devuelve los atributos del elemento ``e`` como un
   diccionario.
-  ``e.get('attr')`` devuelve el valor del atributo ``attr`` del
   elemento ``e``.

Veamos un ejemplo que imprime la humedad mínima y máxima para los
próximos días.

.. code:: python

    for dia in root.iter('dia'):
        print '{0}:'.format(dia.get('fecha')),
        humedad = dia.find('humedad_relativa')
        hmax = int(humedad.find('maxima').text)
        hmin = int(humedad.find('minima').text)
        print 'humedad {0}/{1}'.format(hmin, hmax)


.. parsed-literal::

    2015-12-25: humedad 70/100
    2015-12-26: humedad 55/100
    2015-12-27: humedad 45/100
    2015-12-28: humedad 60/95
    2015-12-29: humedad 75/100
    2015-12-30: humedad 65/95
    2015-12-31: humedad 90/100


Leer con ``BeautifulSoup``
--------------------------

**Nota: En *BeautifulSoup* se usan atributos de Python para representar
elementos XML. No confundas los *atributos* de Python con los
*atributos* de un elemento XML. Los atributos de XML son parejas
clave/valor que se pueden incluir en las etiquetas de comienzo de cada
elemento.**

*BeautifulSoup* es una biblioteca que simplifica notablemente la lectura
y escritura de documentos XML. En *BeautifulSoup* la jerarquía del
documento se traslada automáticamente a Python en forma de atributos de
objeto. Así, por ejemplo, si el documento está contenido en un elemento
``root`` entonces lo devuelto por *BeautifulSoup* tendrá un atributo
``root``.

.. code:: python

    from bs4 import BeautifulSoup
    soup = BeautifulSoup(xml, 'lxml')

Así, ``soup`` tendrá un atributo ``root`` y a su vez ese atributo tendrá
un atributo ``prediccion``, etc. Tenemos varias formas de recorrer los
elementos. Si usamos los paréntesis como si ``soup`` fuera una función
podemos buscar todos los elementos con una etiqueta determinada. Por
ejemplo, ``soup('dia')`` nos devolverá todos los elementos con etiqueta
``dia``. En cambio si usamos los corchetes, como si se tratara de una
lista, podemos acceder a los atributos del elemento. Por ejemplo si
``dia`` es un elemento con etiqueta ``'dia'`` entonces ``dia['fecha']``
es el valor del atributo ``fecha`` del elemento ``dia`` en el documento
XML.

Si solo hay un elemento con esa etiqueta entonces podemos usar el
atributo con el mismo nombre. Por ejemplo, los elementos con etiqueta
``dia`` tienen solo un elemento ``humedad_relativa``. Por tanto podemos
acceder a él usando el atributo del mismo nombre. Si hay múltiples
elementos con la misma etiqueta el atributo solo sirve para acceder al
primero.

Para obtener el texto de cada elemento podemos acceder al atributo
``string``. Por ejemplo,
``soup.root.dia.prediccion.humedad_relativa.maxima.string`` es el texto
del elemento ``maxima``, dentro del elemento ``humedad_relativa``,
dentro del elemento ``prediccion``, dentro del primer elemento ``dia``,
dentro del elemento ``root`` del documento.

Así, el código equivalente al ejemplo de ``ElementTree`` sería:

.. code:: python

    for dia in soup('dia'):
        humedad = dia.humedad_relativa
        hmax = int(humedad.maxima.string)
        hmin = int(humedad.minima.string)
        print '{0}: humedad {1}/{2}'.format(dia['fecha'], hmin, hmax)


.. parsed-literal::

    2015-12-25: humedad 70/100
    2015-12-26: humedad 55/100
    2015-12-27: humedad 45/100
    2015-12-28: humedad 60/95
    2015-12-29: humedad 75/100
    2015-12-30: humedad 65/95
    2015-12-31: humedad 90/100

