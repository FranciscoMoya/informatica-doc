1. Introducción
===============


Empieza a programar ya. No tienes excusa, si estás leyendo ésto es que
tienes un navegador y por tanto puedes probar el código que aparece en
la siguiente celda editable:

.. activecode:: hello-world

    print('Hola, Mundo')

Ahora pulsa el botón *Run* de la barra de botones. Verás que el
mensaje entre comillas aparece junto a la celda editable. Ya has hecho
tu primer programa, es así de simple. Prueba a cambiar el mensaje,
poniendo eñes, tildes o signos de puntuación y volviendo a pulsar
*Run*.

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

::
   pip install ipython
   pip install jupyter

En algunos casos hemos visto instalaciones en las que esto no funciona
porque ``pip`` no está en la ruta por defecto. Esto ocurre cuando Python
no se ha añadido correctamente al ``PATH``. Añade manualmente las
siguientes rutas a la variable de entorno ``Path``. En el propio
intérprete de órdenes:

::
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

``pip install ipython   pip install jupyter``

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

1.2.1 Hola mundo con IDLE
~~~~~~~~~~~~~~~~~~~~~~~~~

1.2.2 Hola mundo con Jupyter
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para ejecutar un entorno similar a `tmpnb.org <http://tmpnb.org>`_ en
tu propio ordenador con la capacidad de guardar los cuadernos en disco
basta con ejecutar el intérprete de órdenes (``cmd.exe`` en Windows o
*Terminal* en Mac OS X) e introducir la siguiente orden.

::
   jupyter notebook

