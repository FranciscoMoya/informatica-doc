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

El ciclo *editar - ejecutar* debe ser muy ágil. Debes acostumbrarte a
editar rápido con pequeños cambios que puedas probar y ejecutar
pulsando :kbd:`F5` para comprobar esos cambios.  Evita escribir mucho
código sin probarlo.  Lo más probable es que no funcione a la primera
y es mucho más difícil depurar (corregir) un programa grande que uno
pequeño.


1.2.2 Hola mundo con Jupyter
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Otra forma de ejecutar Python es mediante un cuaderno *Jupyter*.  Este
entorno es más bien un editor de documentos en los que puedes insertar
programas o fragmentos de un programa, así como los resultados
producidos por su ejecución.  Un aspecto interesante es que utiliza un
navegador web como interfaz de usuario.  Entre otras cosas eso hace
que el usuario pueda disponer de un sinfín de características
avanzadas del navegador (gráficos, animaciones, tipografía avanzada,
etc.).

*Jupyter* puede utilizarse en línea sin necesidad de instalar nada
pero te recomendamos instalarlo en tu propio ordenador para evitar
problemas.  Los servicios en línea de *Jupyter* que son gratuitos no
tienen muchas garantías de disponibilidad.  Por si quieres probar
éstos son algunos de los mejores:

- `Microsoft Azure Notebooks <https://notebooks.azure.com/>`_ es la
  versión de Microsoft desplegada sobre sus servicios en la nube,
  Azure.  Está en fase de pruebas (*preview*) y mientras eso ocurra es
  totalmente gratuito.  Tarde o temprano será un servicio de pago,
  pero siempre habrá una capa gratuita (*free tier*).  Es decir, con
  ciertas limitaciones siempre podrás utilizarlo de forma gratuita.

- `IBM Data Scientist Workbench
  <https://datascientistworkbench.com/>`_ es algo lento para
  arrancar un cuaderno y la interfaz no está tan cuidada como en otros
  servicios, pero el soporte para computación científica es excelente.

- `SageMathCloud <https://cloud.sagemath.com/settings>`_ es mucho más
  que cuadernos *Jupyter*, pero una de las cosas que permite hacer en
  un proyecto es crear cuadernos de Jupyter.  El uso sin *upgrades* es
  gratuito pero puede no estar disponible en las horas pico.

- `Binder <http://mybinder.org/>`_ te permite almacenar cuadernos
  Jupyter en un repositorio `GitHub <https://github.com>`_ y el
  servicio de *binder* los permite ejecutar en línea.  Es una forma
  excelente de colaborar en trabajos que puedes haber editado con
  cualquiera de las otras opciones, o en tu propio ordenador.

- Cuadernos Jupyter `temporales <https://try.jupyter.org>`_ es una
  demo de Jupyter que mantiene la propia organización de Jupyter.
  Siempre tienen la última versión liberada pero la disponibilidad en
  horas pico se resiente.

Para ejecutar un entorno similar en tu propio ordenador con la
capacidad de guardar los cuadernos en tu propio disco sigue estos pasos.

1. Ejecuta un navegador web.

2. Ejecuta el intérprete de órdenes.  En Windows puedes ejecutarlo
pulsando la tecla :kbd:`Windows` y escribiendo :program:`cmd`.  En
Mac OS X ejecuta la aplicación :program:`Terminal`.

3. Introduce la siguiente orden:

.. code::
   
   jupyter notebook

4. Utiliza la ventana que se abre en el navegador para interactuar con
   Jupyter.  Si no se abre ninguna ventana abre una nueva pestaña en
   el navegador y escribe la siguiente URL en la barra de direcciones:
   ``localhost:8888``.

La ventana principal de Jupyter tiene el siguiente aspecto.

.. figure:: _static/jupyter-main.png
   :align: center
   :figwidth: 60%
   :alt: Ventana principal de Jupyter.

Se trata del administrador de archivos.  Para crear un nuevo cuaderno
selecciona el menú :menuselection:`New-->Python 3`.  Aparecerá la
interfaz de edición de documentos, como la que se muestra a
continuación.

.. figure:: _static/jupyter-new.png
   :align: center
   :figwidth: 60%
   :alt: Nuevo documento en Jupyter.

Al crear un nuevo documento aparece automáticamente una nueva *celda*
editable.  Las celdas de Jupyter pueden servir para diversos
propósitos, pero por defecto son para introducir programas.  Así que
escribe en la celda el programa `Hola_Mundo`.  Después pulsa sobre el
botón con el signo de *ejecutar y avanzar* como muestra la figura.
Alternativamente se puede usar el menú :menuselection:`Cell-->Run
Cells` o directamente pulsando :kbd:`Mays Intro` (:kbd:`Shift Enter`).

.. figure:: _static/jupyter-run.png
   :align: center
   :figwidth: 60%
   :alt: Ejecutar celda en Jupyter.

El resultado se mostrará justo bajo la celda y automáticamente
avanzará a la siguiente celda.  En este caso no hay celda siguiente y
por tanto crea una nueva.  Cada celda puede contener un fragmento del
programa y se pueden ejecutar en cualquier orden, aunque lo normal es
que se ejecuten en secuencia.

El documento se guarda automáticamente en el disco, pero con el nombre
``Untitled``.  Si deseas ponerle un nombre más adecuado basta hacer
doble click sobre el nombre en la cabecera.

.. figure:: _static/jupyter-rename.png
   :align: center
   :figwidth: 60%
   :alt: Renombrar documento Jupyter.

Jupyter añadirá automáticamente la extensión ``.ipynb`` a los
documentos.

Cuando hayas terminado de editar el documento selecciona el menú
:menuselection:`File-->Close and Halt`.  De esta forma nos aseguramos
de que la copia del disco estará completamente al día.


1.3 Elegir un entorno de programación
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

La elección del entorno en el que vas a trabajar depende
exclusivamente de tu gusto personal.  En esta asignatura no vamos a
necesitar manejar grandes cantidades de código, ni vamos a utilizar
bibliotecas externas.  Por tanto el entorno va a aportar relativamente
poco.

Nuestro consejo es que empieces con IDLE, que está incluido en la
distribución oficial de Python. Por tanto está disponible en todos
los ordenadores que dispongan de Python.

Más adelante, cuando domines el lenguaje, empieza a probar otros, como
`Jupyter <http://jupyter.org/>`_, `PyCharm
<https://www.jetbrains.com/pycharm/>`_, `Eclipse PyDev
<http://www.pydev.org/>`_, `Netbeans Python
<http://wiki.netbeans.org/Python>`_, `Visual Studio con Python
Development Tools <https://www.visualstudio.com/es/vs/python/>`_, etc.

No te rindas a la primera.  Un buen entorno es normalmente complejo y
requiere algo de tiempo acostumbrarse a él.  Ese tiempo se recupera
con creces en el futuro debido a los incrementos de productividad que
permite.

A partir de este momento asumiremos que el entorno de programación que
usaremos es IDLE.  Si no es así en tu caso adapta las instrucciones a
tu entorno.
