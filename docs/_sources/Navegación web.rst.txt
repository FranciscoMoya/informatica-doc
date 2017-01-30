
Navegación web con Python
=========================

El trabajo en grupo propuesto es solo una de las muchas situaciones en
tu vida en las que los datos a procesar deben extraerse de páginas web o
documentos colgados en un sitio web.

Conceptos previos
-----------------

La *World Wide Web* es el servicio de navegación hipertexto más
utilizado del Mundo. Lo que conocemos como páginas y servidores web, que
nuestros mayores suelen identificar con Internet no es más que un
servicio operado por millones de ordenadores en el Mundo.

-  Se trata de un servicio con arquitectura cliente-servidor. Los
   servidores alojan información en forma de páginas hipertexto (con
   enlaces) o documentos (imágenes, vídeos, archivos PDF, etc.) y los
   navegadores actúan como clientes de esos servidores para consultar la
   información.

-  Se trata de un servicio distribuido. No existe un único servidor de
   páginas. Una página de un servidor puede contener enlaces a multitud
   de otras páginas alojadas en otros servidores.

-  Cada página o documento disponible en este servicio se puede acceder
   a través de una dirección global conocida como URL (*Universal
   Resource Locator*) que no es más que la dirección que aparece en la
   parte superior del navegador.

-  Este servicio utiliza normalmente un protocolo sencillo denominado
   HTTP (*Hiper Text Transport Protocol*) que se utiliza de forma
   transparente por los navegadores. Por eso las URL suelen comenzar por
   ``http://`` o ``https://``. Este protocolo tiene apenas un puñado de
   mensajes diferentes que generan los navegadores sin que sea necesaria
   la intervención explícita del usuario.

-  Cuando un navegador obtiene una página web de un servidor emplea un
   mensaje HTTP denominado *método GET*. Dada una URL, que funciona como
   una especie de dirección global, permite obtener el documento al que
   referencia. Cuando un navegador envía datos de un formulario a un
   servidor suele emplear otro mensaje de HTTP denominado *método POST*.
   Este método permite enviar información arbitraria al servidor. El
   protocolo HTTP tiene otros métodos menos utilizados en la navegación
   normal pero muy utilizado en los *servicios web* como son PUT, DELETE
   o PATCH. Aún hay algún otro método más, pero su uso directo es mucho
   más raro.

Para el trabajo en grupo se requiere descargar documentos XML que tienen
una URL conocida. Por tanto se utilizaría el método GET sin más. Sin
embargo en vuestra vida profesional es muy posible que os enfrentéis a
servicios web más elaborados que requieren del uso de los demás métodos.
Vamos a empezar por lo más sencillo.

Navegación con ``urllib``
-------------------------

La biblioteca Python estándar incluye funciones suficientes para obtener
la información de cualquier URL. La biblioteca ``urllib`` contiene la
función ``urlopen`` que abre una URL como si se tratara de un archivo
local. Lo que devuelve es un objeto que se comporta igual que un archivo
abierto en modo de lectura.

.. code:: python

    import urllib
    f = urllib.urlopen('http://www.aemet.es/xml/municipios/localidad_28013.xml')
    
    # Imprime las 10 primeras líneas
    for i in range(10):
        print f.readline(),


.. parsed-literal::

    <?xml version="1.0" encoding="ISO-8859-15" ?>
    <root id="28013" version="1.0" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.aemet.es/xsd/localidades.xsd">
    	<origen>
    		<productor>Agencia Estatal de Meteorolog�a - AEMET. Gobierno de Espa�a</productor>
    		<web>http://www.aemet.es</web>
    		<enlace>http://www.aemet.es/es/eltiempo/prediccion/municipios/aranjuez-id28013</enlace>
    		<language>es</language>
    		<copyright>&#169; AEMET. Autorizado el uso de la informaci�n y su reproducci�n citando a AEMET como autora de la misma.</copyright>
    		<nota_legal>http://www.aemet.es/es/nota_legal</nota_legal>
    	</origen>


El problema es que ``urllib`` no se queja en absoluto si el documento no
corresponde a un recurso válido. Para poder saber si se trata de una URL
válida o inválida tenemos que usar el método ``getcode`` del objeto
devuelto. Ese método devuelve un entero especificado en el propio
protocolo HTTP. Un valor 200 significa que el acceso ha tenido éxito y
cualquier otro valor implica algún tipo de anomalía. Si te interesa
profundizar puedes consultar `todos los códigos
aquí <http://www.w3.org/Protocols/HTTP/HTRESP.html>`__.

.. code:: python

    import urllib
    
    f = urllib.urlopen('http://www.aemet.es/xml/municipios/localidad_28013.xml')
    print f.getcode()
    
    f = urllib.urlopen('http://www.aemet.es/xml/municipios/localidad_99999.xml')
    print f.getcode()


.. parsed-literal::

    200
    404


Con esto debería ser suficiente para poder realizar el trabajo en grupo.
De todas formas vamos a comentar brevemente alguna otra biblioteca más
flexible.

Navegación con ``requests``
---------------------------

Python 2 solo incluye ``urllib`` y ``httplib`` en la biblioteca estándar
para tratar con contenidos web. Ambas bibliotecas son francamente
incómodas para realizar aplicaciones modernas basadas en la *World Wide
Web*. Por eso han surgido multitud de alternativas que facilitan el
trabajo. Una de las más populares es
```requests`` <http://requests.readthedocs.org/en/latest/>`__, una
biblioteca que se incluye en la mayoría de las distribuciones de Python.

El funcionamiento para la descarga de documentos es bastante similar,
salvo que usamos explicitamente el método ``get`` y el resultado no es
un archivo, sino un objeto con métodos y atributos específicos.

.. code:: python

    import requests
    
    r = requests.get('http://www.aemet.es/xml/municipios/localidad_28013.xml')
    # Si r.status_code in range(200,300) entonces r.text es el documento
    doc = r.text
    print r.status_code
    # Imprimir las 5 primeras líneas
    print '\n'.join(doc.split('\n')[:5])


.. parsed-literal::

    200
    <?xml version="1.0" encoding="ISO-8859-15" ?>
    <root id="28013" version="1.0" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.aemet.es/xsd/localidades.xsd">
    	<origen>
    		<productor>Agencia Estatal de Meteorología - AEMET. Gobierno de Espańa</productor>
    		<web>http://www.aemet.es</web>


Una característica interesante es que podemos elevar una excepción
``HTTPError`` automáticamente si el código de estado no es 2xx. Esto
simplifica notablemente el tratamiento de errores.

.. code:: python

    r = requests.get('http://www.aemet.es/xml/municipios/localidad_99999.xml')
    r.raise_for_status()


::


    ---------------------------------------------------------------------------
    HTTPError                                 Traceback (most recent call last)

    <ipython-input-2-676cd40ee8e5> in <module>()
          1 r = requests.get('http://www.aemet.es/xml/municipios/localidad_99999.xml')
    ----> 2 r.raise_for_status()
    

    /usr/lib/python2.7/dist-packages/requests/models.pyc in raise_for_status(self)
        835 
        836         if http_error_msg:
    --> 837             raise HTTPError(http_error_msg, response=self)
        838 
        839     def close(self):


    HTTPError: 404 Client Error: Not Found for url: http://www.aemet.es/xml/municipios/localidad_99999.xml



