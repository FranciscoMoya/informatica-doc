1. Introducción
===============

Empieza a programar ya. No tienes excusa, si estás leyendo ésto es que
tienes un navegador y por tanto puedes probar el código que aparece en
la siguiente celda editable:

.. activecode:: Hola_Mundo
    :nocodelens:

    print('Hola, Mundo')

Ahora pulsa el botón *Run* de la barra de botones. Verás que el
mensaje entre comillas aparece junto a la celda editable. Ya has hecho
tu primer programa, es así de simple.  Prueba a cambiar el mensaje,
poniendo eñes, tildes o signos de puntuación y volviendo a pulsar
*Run*.

Prueba ahora a sustituir todo el mensaje entre comillas, incluídas las
comillas por un número y pulsa *Run*.  Prueba también a poner una
expresión aritmética, por ejemplo `124 + (12 - 1.5) * 0.21`.

Probar es esencial, aunque te parezca tonto hazlo, tienes que
desarrollar tu intuición para ver cómo puedes cambiar un programa para
que haga lo que tú quieres.

1.1 Instalación del software
----------------------------

Para trabajar desconectado de la red puede ser útil instalar software
en tu propio ordenador.  Sigue estos sencillos pasos y podrás editar
cuadernos interactivos similares a los que usamos en clase en tu
ordenador.

1.1.1 Microsoft Windows
~~~~~~~~~~~~~~~~~~~~~~~

1. Descarga e instala la distribución oficial de `Python
   3 <https://www.python.org/downloads/>`_. Pincha en el botón
   *Download Python 3.x.y*. En el momento de escribir este documento era
   *Download Python 3.5.2* pero no repares en instalar la última
   versión. Ese botón descarga un ejecutable que contiene el instalador
   de Python que debes *ejecutar*. En este documento asumiremos que lo
   has instalado con las opciones por defecto, pulsando directamente en
   la opción *Install Now* del instalador, pero procura activar la
   opción *Add Python 3.5 to PATH*.

2. Ejecuta el intérprete de órdenes de Windows pulsando la tecla con el
   logo de Windows y teclando ``cmd.exe``.

3. Escribe las siguientes órdenes en la ventana del intérprete de
   órdenes:

.. code::
   
   pip install ipython
   pip install jupyter

En algunos casos hemos visto instalaciones en las que esto no funciona
porque ``pip`` no está en la ruta por defecto. Esto ocurre cuando Python
no se ha añadido correctamente al ``PATH``. Añade manualmente las
siguientes rutas a la variable de entorno ``Path``. En el propio
intérprete de órdenes:

.. code::
   
    setx PATH "%PATH%;C:\Users\<usuario>\AppData\Local\Programs\Python\Python35"
    setx PATH "%PATH%;C:\Users\<usuario>\AppData\Local\Programs\Python\Python35\Scripts"

Ten en cuenta que debes cambiar ``<usuario>`` por tu nombre de usuario.
Es el nombre que aparece en el *prompt* del intérprete de órdenes (por
ejemplo, en mi caso el *prompt* es ``C:\Users\Francisco.Moya>`` y mi
nombre de usuario es ``Francisco.Moya``). Ahora debería funcionar ``pip``.

1.1.2 Mac OS X
~~~~~~~~~~~~~~

1. Descarga e instala la distribución oficial de `Python
   3 <https://www.python.org/downloads/>`__. Pincha en el botón
   *Download Python 3.x.y*. En el momento de escribir este documento era
   *Download Python 3.5.2* pero no repares en instalar la última
   versión. Ese botón descarga un paquete que debes *instalar*. Tendrás
   una nueva carpeta *MacPython 3.5* en la carpeta de *Aplicaciones*.

2. Ejecuta la aplicación *Terminal* dentro de la carpeta *Utilidades*.

3. Introduce las siguientes órdenes en la ventana del *Terminal*.

.. code::
   
   pip install ipython
   pip install jupyter

1.2 Ejecutar Python
-------------------

Si has seguido el procedimiento indicado tendrás dos entornos de
programación muy útiles: *IDLE* y *Jupyter*.

*IDLE* es el entorno incluído en la distribución oficial de Python.
No es muy avanzado pero es más que suficiente para los objetivos del
curso.  Tiene una interfaz gráfica primitiva, con una consola
interactiva de Python y un editor multi-ventana integrado para
escribir los programas.

*Jupyter* es un entorno para la programación desde un navegador web.
Se trata de una herramienta interactiva con capacidad de integrar
textos, gráficos y programas.  Es una forma interesante de construir
documentos que explican poco a poco los programas.  Puedes probarlo
también en línea, sin instalar nada, visitando `try.jupyter.org
<https://try.jupyter.org/>`_.

.. warning:: En lo sucesivo asumiremos que el alumno usa Microsoft
             Windows porque es la opción más frecuente.  Si eres
             usuario de otro sistema operativo trata de adaptar las
             instrucciones o pide ayuda en el foro del Campus Virtual.

1.2.1 Hola mundo con IDLE
~~~~~~~~~~~~~~~~~~~~~~~~~

Pulsa la tecla del logo de :kbd:`Windows` y teclea ``idle``.  Si has
instalado correctamente Python aparecerá ``IDLE (Python 3.5)`` o algo
similar.  Pulsa :kbd:`Intro` y la ventana principal de IDLE aparecerá.

.. figure:: _static/idle-main.png
   :align: center
   :figwidth: 60%
   :alt: Ventana principal de IDLE.

         
La ventana principal es una consola interactiva de Python.  El símbolo
``>>>`` invita a introducir nuevas órdenes en Python.  Se conoce por
su nombre en inglés, *prompt*.

Cuando Python se ejecuta en modo interactivo ejecuta las órdenes tan
pronto como se introducen.  Por ejemplo, si introducimos el contenido
del programa `Hola_Mundo` veremos el resultado inmediatamente.

.. code::

   >>> print('Hola Mundo')
   Hola Mundo
   >>> ▂

El modo interactivo es extraordinariamente útil para experimentar.
Una característica interesante de este modo es que el resultado de las
expresiones que se introducen se muestra automáticamente, como si
hubiéramos usado ``print``.  Por ejemplo:


.. code::

   >>> 123.92 * 0.21
   26.0232
   >>> ▂

Es decir, funciona como una calculadora avanzada.

Sin embargo lo normal será que utilicemos archivos de texto para
escribir nuestros programas.  De esta forma podrán almacenarse en el
disco para ejecutarlos tantas veces como deseemos.

.. warning:: Los programas se escriben en archivos de texto, no en
             documentos.  No utilices *Microsoft Word* para programar.
             Utiliza IDLE o Jupyter.

             Un archivo de texto solo contiene el programa.  Por
             contra, un documento contiene además gran cantidad de
             información acerca de estilos, tipos de letra, formato de
             página, alineamiento, etc.  Nada de eso será capaz de
             entenderlo el intérprete de Python.

Selecciona ahora la opción de menú :menuselection:`File-->New File` o
pulsa las teclas :kbd:`Control-N`.  Aparecerá una nueva ventana
similar a la principal, pero en este caso no hay intérprete de Python.

.. figure:: _static/idle-new-file.png
   :align: center
   :figwidth: 60%
   :alt: Nuevo archivo en IDLE.

Es un editor de archivos de texto especialmente indicado para editar
programas en Python. Escribe ahora el programa `Hola_Mundo` en la
nueva ventana.  Cuando termines selecciona el menú
:menuselection:`Run-->Run Module` o pulsa :kbd:`F5`.  La primera vez
que lo hagas IDLE avisará de que el archivo no está guardado y debe
guardarse antes de ejecutarlo.

.. figure:: _static/idle-must-save.png
   :align: center
   :figwidth: 60%
   :alt: Advertencia para grabar archivo.

Pulsa *OK* y escribe un nombre (por ejemplo `hola`) en el cuadro de
diálogo que se muestra a continuación:

.. figure:: _static/idle-save-as.png
   :align: center
   :figwidth: 60%
   :alt: Diálogo para guardar archivo.

Inmediatamente aparecerá en la ventana principal lo siguiente:

.. code::

   ======================== RESTART: /home/paco/hola.py ========================
   Hola Mundo
   >>> ▂

Como ves los programas Python se ejecutan siempre en la ventana
principal.  Sin embargo puedes tener un número arbitrario de ventanas
de edición en las que editas tus programas.


1.2.2 Hola mundo con Jupyter
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Otra forma de ejecutar Python es 

Para ejecutar un entorno similar a `tmpnb.org <http://tmpnb.org>`_ en
tu propio ordenador con la capacidad de guardar los cuadernos en disco
basta con ejecutar el intérprete de órdenes (``cmd.exe`` en Windows o
*Terminal* en Mac OS X) e introducir la siguiente orden.

.. code::
   
   jupyter notebook

