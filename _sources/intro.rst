Introducción
============

Empieza a programar ya. No tienes excusa, si estás leyendo ésto es que
tienes un navegador y por tanto puedes probar el código que aparece en
la siguiente celda editable:

.. activecode:: Hola_Mundo
    :nocodelens:
    :caption: Hola Mundo

    print('Hola, Mundo')

Ahora pulsa el botón *Run* de la barra de botones. Verás que el
mensaje entre comillas aparece junto a la celda editable. Ya has hecho
tu primer programa, es así de simple.  Prueba a cambiar el mensaje,
poniendo eñes, tildes o signos de puntuación y volviendo a pulsar
*Run*.

Prueba ahora a sustituir todo el mensaje entre comillas, incluídas las
comillas por un número y pulsa *Run*.  Prueba también a poner una
expresión aritmética, por ejemplo `124 + (12 - 1.5) * 0.21`.

Finalmente prueba a añadir un espacio antes de ``print``. Es bastante
puntilloso, ¿verdad?

Probar es esencial, aunque te parezca tonto hazlo, tienes que
desarrollar tu intuición para ver cómo puedes cambiar un programa para
que haga lo que tú quieres.

Intérpretes y compiladores
--------------------------



Instalación del software
------------------------

Para trabajar desconectado de la red puede ser útil instalar software
en tu propio ordenador.  Sigue estos sencillos pasos y podrás editar
cuadernos interactivos similares a los que usamos en clase en tu
ordenador.

Microsoft Windows
~~~~~~~~~~~~~~~~~

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

Mac OS X
~~~~~~~~

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

Ejecutar Python
---------------

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

Hola mundo con IDLE
~~~~~~~~~~~~~~~~~~~

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


Hola mundo con Jupyter
~~~~~~~~~~~~~~~~~~~~~~

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


Elegir un entorno de programación
---------------------------------

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
<http://wiki.netbeans.org/Python>`_,
`Visual Studio con Python Development Tools
<https://www.visualstudio.com/es/vs/python/>`_, etc.

No te rindas a la primera.  Un buen entorno es normalmente complejo y
requiere algo de tiempo acostumbrarse a él.  Ese tiempo se recupera
con creces en el futuro debido a los incrementos de productividad que
permite.

A partir de este momento asumiremos que el entorno de programación que
usaremos es IDLE.  Si no es así en tu caso adapta las instrucciones a
tu entorno.

Modo interactivo y modo *script*
--------------------------------

Python tiene dos modos de funcionamiento que se aprecian perfectamente
en el entorno IDLE.  El modo interactivo es el de la ventana principal
de IDLE.  En este modo Python imprime automáticamente el resultado de
las expresiones que se le pasen, sin necesidad de usar ``print``.
Esto permite utilizarlo como si fuera una calculadora o para hacer
pequeñas pruebas.  Las órdenes se ejecutan conforme se introducen en
el intérprete.

El modo *script* está pensado para cuando tenemos un programa completo
y queremos ejecutarlo completamente.  En ese caso el propio programa
debe encargarse de mostrar los resultados que más nos interesan.

Averigua si las celdas de este libro interactivo usan el modo
interactivo o el modo *script*.  Para ello basta introducir una
expresión sin ningún ``print`` y comprobar si al ejecutarse se muestra
la expresión.  Por ejemplo:

.. activecode:: Hola_Mundo_Interactivo
   :nocodelens:
   :caption: Hola mundo interactivo

   'Hola, Mundo'

.. mchoice:: question1_1
   :answer_a: Modo interactivo
   :answer_b: Modo *script*
   :correct: b
   :feedback_a: Si te fijas en la salida del programa cuando se
                ejecuta no hay nada.  Eso significa que el intérprete
                no imprime las expresiones a menos que se le indique.
                Es decir, no es interactivo.
   :feedback_b: Exactamente, no puedes usar usar las celdas de código
                activo como una calculadora a menos que utilices
                ``print``.

   Examina la salida del programa de arriba y en base a ello
   selecciona el modo de ejecución de estas celdas.

Si en algún momento necesitas probar algo de lo que te contamos en el
libro no necesitas tener una instalación de Python a mano.  Basta que
pinches en el icono de la lupa de la parte superior.  En el menú que
aparece selecciona :menuselection:`Código activo de prueba`.

.. figure:: _static/runestone-scratch.png
   :align: center
   :figwidth: 60%
   :alt: Ventana de código activo de prueba.



Un paseo por la sintaxis de Python
----------------------------------

De momento solo hemos visto un programa, el *Hola mundo*.  Es un
clásico que se utiliza para enseñar la estructura básica de un
programa en cualquier lenguaje de programación.  En Python es
extremadamente simple, pero ya se pueden identificar elementos
básicos.

.. code::

    print('Hola, Mundo')

La única línea de la que consta el programa es una :term:`sentencia`.
Un programa es una secuencia de *sentencias* que se ejecutan en orden.

Nuestra sentencia es una :term:`llamada a función`, muy similar al uso
de una función en matemáticas.  La función ``print`` imprime sus
argumentos en la :term:`salida estándar` y no devuelve nada.  Las
funciones en matemáticas siempre devuelven algo, y esto también ocurre
en Python, pero existe un valor especial ``None`` que se interpreta
como *nada*.

.. tip:: No es lo mismo devolver algo que imprimir algo.  Un ejemplo
         de ello es la función ``print``.  Imprime sus argumentos,
         pero no devuelve nada.  Insistiremos mucho en esta idea
         porque es una fuente de confusión frecuente.

En este caso solo pasamos un argumento a la función ``print``.  Se
trata de la cadena de texto ``'Hola, Mundo'``.  Las cadenas de texto
(secuencias de letras) van entre comillas.

Cada vez que llamamos a ``print`` se escribe una nueva línea en la
salida estándar.  Por ejemplo:

.. activecode:: hola-mundo-2-lineas
   :nocodelens:

    print('Hola,')
    print('Mundo')

En algunas ocasiones nos puede interesar que diferentes llamadas a
``print`` impriman en la misma línea de la salida estándar.  Eso se
puede controlar con un argumento opcional de ``print`` llamado
``end``.

.. activecode:: hola-mundo-2-prints
   :nocodelens:

    print('Hola,', end='')
    print('Mundo')

Este argumento adicional es un :term:`argumento nombrado`. Es una
característica muy interesante para evitar posibles errores en el
orden de argumentos.

Asignación
~~~~~~~~~~

La función ``print`` no solo imprime textos.  Imprime el resultado de
cualquier expresión.  En el siguiente ejemplo utilizamos una
:term:`variable` para almacenar la persona a la que hay que saludar y
en el print utilizamos el nombre de la variable en lugar de una
persona concreta.

.. activecode:: hola-pedro

    pers = 'Pedro'
    print('Hola', pers)

La primera sentencia es una sentencia de :term:`asignación`.  La
:term:`asignación` sirve para poner nombre a una zona de memoria que
contiene un valor determinado.  En este caso la cadena ``'Pedro'`` se
almacena en memoria y la posición en la que se almacena recibe el
nombre ``pers``.  Puedes verlo en detalle si pulsas en el botón *Show
in Codelens*.  *Codelens* es una herramienta educativa que permite
entender cómo funciona el programa paso a paso.  Utiliza los botones
*Forward* y *Back* para avanzar y retroceder.  Observa cómo aparece la
variable cuando se ejecuta la sentencia de asignación.  Aparece en una
tabla llamada *Global frame*.  Ya veremos eso con más detalle más
adelante.

Bifurcación
~~~~~~~~~~~

A veces es necesario ejecutar determinadas sentencias solo si se
cumple una condición.  Esto se consigue con una :term:`sentencia de
bifurcación`.  La más simple de todas es la :term:`sentencia *if*`.

.. activecode:: ejemplo-bifurcar

   n = 200
   if n > 100:
       print('Demasiado')

Habrás podido comprobar que el valor de la variable ``n`` determina si
se imprime o no el mensaje.  Fíjate que después de la condición hay un
signo ``:`` y que las sentencias que se ejecutan en caso de que se
cumpla están indentadas (con un margen mayor a la izquierda).  Prueba
a cambiar el valor de la variable, la condición, los espacios antes
del ``print`` e incluso a poner varios ``print`` que se ejecuten si se
cumple la condición.  Verás que Python es bastante relajado con la
forma en que escribes el programa, solo necesita que respetes los
márgenes.  Por ejemplo, si quieres ejecutar dos ``print`` en caso de
que se cumpla la condición, tendrás que ponerlos con el mismo margen
ambos.  Da igual cuántos espacios, pero que sean los mismos.

Bucles
~~~~~~

En no pocas ocasiones necesitaremos repetir una serie de operaciones
idénticas o casi idénticas.  Para repetir están los bucles.  El más
sencillo de todos es el :term:`bucle *while*`:

El :term:`bucle *while*` funciona de forma similar a la
:term:`sentencia *if*`.  Evalúa la condición y si se cumple ejecuta
las sentencias indentadas justo a continuación.  Pero después de
ejecutarlas no continúa con la siguiente sentencia, sino que vuelve a
evaluar la condición.  Así hasta que la condición no se cumpla.

.. _tabla-del-3:
.. activecode:: tabla-del-3

   tabla = 3
   i=0
   while i<10:
       print(tabla,'x',i,'=',tabla*i)
       i = i + 1

Examina con *Show in Codelens* la ejecución paso a paso de este
programa.  Observa cómo cambia el valor de la *variable*
``i``. ¿Entiendes ahora por qué se les llama variables?

Aunque es un poco pronto para entenderlo completamente quiero también
que pruebes este otro fragmento.  Hace lo mismo pero es
significativamente más breve.  Utiliza el :term:`bucle *for*` que es
capaz de recorrer una serie de valores.  Cada uno de los valores es
asignando a la variable de control (``i`` en este caso) y ejecuta las
sentencias indentadas del bucle.

.. activecode:: tabla-del-3-for

   tabla = 3
   for i in range(10):
       print(tabla,'x',i,'=',tabla*i)


Trabaja sobre lo visto
----------------------

No te quedes con los ejemplos de este capítulo.  Lee ejemplos de otros
sitios, prueba tú mismo otros ejemplos, cambia los ejemplos para
entenderlos plenamente. A continuación veremos más ejemplos para
motivar vuestra propia exploración del lenguaje. No te quedes solo en
ellos, prueba y resuelve tus propios problemas.

Ejecución condicional
~~~~~~~~~~~~~~~~~~~~~

Empecemos dando valores a un par de variables.

.. activecode:: asigna-n-m
   :nocodelens:

   n = 123
   m = 187

Si *n* no está entre 5 y 10 (ambos incluidos) imprimir un mensaje de
error.

.. activecode:: ejemplo-if-or
   :nocodelens:
   :include: asigna-n-m

   if n < 5 or n > 10:
       print('No está en el rango permitido')


Otra forma usando rangos. Los rangos son intervalos en
:math:`\mathbb{Z}` cerrados por la izquierda y abiertos por la
derecha.

.. activecode:: ejemplo-if-range
   :nocodelens:
   :include: asigna-n-m

   if n not in range(5,11):
       print('No está en el rango permitido')


Vamos a otro ejemplo. Si *m* es mayor que *n* restar *n* de *m*.

.. activecode:: resta-si-m-mayor
   :nocodelens:
   :include: asigna-n-m

   if m > n:
       m = m - n

Si n no es par multiplicar m por 10 y mostrar un mensaje de advertencia.

.. activecode:: impar-por-10
   :nocodelens:
   :include: asigna-n-m

   resto = n - (n//2)*2
   if resto != 0:
       m = m * 10
       print('n no es divisible por 2')

El operador ``//`` es la :term:`división entera` (parte entera de la
división) y ``!=`` es el :term:`operador distinto`. No te agobies con
los operadores, los irás conociendo poco a poco.

Más fácil aún, usando el operador ``%`` (módulo o resto) y el operador
``*=`` que combina multiplicación y asignación.

.. activecode:: impar-por-10-mod
   :nocodelens:
   :include: asigna-n-m

   if n % 2 != 0:
       m *= 10
       print('n no es divisible por 2')

Es muy posible que a estas alturas esto te suene a chino.  No pasa
nada, solo tienes que entender lo que hace.  Si no lo entiendes
experimenta.  En unos meses esto te parecerá tan claro como el agua.

En Python un entero se puede utilizar directamente como condición.  Si
su valor es 0 se evaluaría como ``False``, si es distinto de 0 se
evaluaría como ``True``. Por tanto se puede hacer todavía más corto así:

.. activecode:: impar-por-10-peque
   :nocodelens:
   :include: asigna-n-m

   if n % 2:
       m *= 10
       print('n no es divisible por 2')


¿Cuál de los dos números es más próximo a 100?

.. activecode:: proximo-a-100
   :nocodelens:
   :include: asigna-n-m

   if abs(n-100) < abs(m-100):
       print('n es más próximo a 100')
   else:
       print('m es más próximo a 100')

Bueno, esta es la primera vez que vemos un ``else``.  Deberíamos
aclarar algo, verdad?  La claúsula ``else`` es una parte opcional de
la sentencia ``if``.  Indica que en caso de que no se cumpla la
condición ejecute las sentencias indentadas a continuación.  Te
aseguro que no es tan útil como el ``if`` pero a veces puede ser
práctico.

Veamos una vuelta de tuerca más sin repetir el mensaje.

.. activecode:: proximo-a-100-v2
   :nocodelens:
   :include: asigna-n-m

   if abs(n-100) < abs(m-100):
       print('n', end=' ')
   else:
       print('m', end=' ')
   print('es más próximo a 100')

Y todavía podemos acortarlo más, usando el operador ternario
(*valor\_si\_true* **if** *condición* **else** *valor\_si\_false*).
No lo confundas con la sentencia ``if``.  Es un operador, como la
suma.

.. activecode:: proximo-a-100-v3
   :nocodelens:
   :include: asigna-n-m

   print('n' if abs(n-100) < abs(m-100) else 'm', 'es más próximo a 100')


Más corto significa menos código que leer y depurar, y eso es muy
importante.  Pero también puede significar más difícil de entender.
Elige tu propio límite entre legibilidad y longitud, pero debes ser
consciente de que otros tienen límites diferentes.  Es decir, escribe
como tú crees que es más legible, pero aprende a leer código escrito
con otros criterios.

Abstracción y funciones
~~~~~~~~~~~~~~~~~~~~~~~

Volveremos a los bucles en futuras sesiones pero merece la pena
detenerse un poco en ellos.  A priori parece que los bucles son una forma
de abreviar cuando el código es muy repetitivo.

Imagina que no tuvieras bucles en Python. ¿Crees que podrías realizar
cualquier operación computable? Piensa en esos cálculos que necesitan
días o meses para realizarse. Por ejemplo, la predicción meteorológica.
¿Podría hacerse con un lenguaje sin bucles?

Pista. Piensa en el tiempo que tardaría en ejecutarse un programa sin
bucles. ¿De qué depende? ¿Puede depender de los datos? Analiza los casos
de un programa lineal y un programa con bifurcaciones (sentencias
**if**).

La tabla de multiplicar
~~~~~~~~~~~~~~~~~~~~~~~

El ejemplo de bucle que hemos visto es ciertamente simple. ¿No podríamos
haber resuelto el problema así?

.. activecode:: tabla-del-3-v0
   :nocodelens:

   print('3 x 0 = 0')
   print('3 x 1 = 3')
   print('3 x 2 = 6')
   print('3 x 3 = 9')
   print('3 x 4 = 12')
   print('3 x 5 = 15')
   print('3 x 6 = 18')
   print('3 x 7 = 21')
   print('3 x 8 = 24')
   print('3 x 9 = 27')

Evidentemente es correcto pero solo resuelve un problema muy concreto.
Con muy poquito esfuerzo más se pueden resolver problemas parecidos.

.. activecode:: tabla-del-3-v1
   :nocodelens:

   i = 0
   while i < 10:
       print('3 x',i,'=',3*i)
       i = i + 1

Ahora tenemos dos ventajas. Por un lado es mas corto y por tanto mas
fácil de cambiar.  Por otro lado no necesitamos conocer los resultados
de las expresiones.  Es lo lógico, a fin de cuentas estamos usando un
computador.

Compara esta solución con el ejemplo :numref:`tabla-del-3`.  Es
ciertamente parecido, pero en el ejemplo anterior podemos cambiar la
tabla simplemente cambiando el 3 asignado a ``tabla``.  La propiedad
que permite manejar casos similares con el mismo fragmento de programa
se llama :term:`abstracción`.  No es una simple comodidad, es
imprescindible para poder resolver problemas complejos con un
computador.

Uno de los mecanismos más poderosos de abstracción son las funciones.
Permiten poner un nombre a un fragmento de programa y además permiten
definir parámetros que pueden cambiar en cada uso.  Es como si
definiéramos nuestro propio lenguaje.  Volveremos a ellas en el
próximo capítulo, pero veamos cómo queda nuestro ejemplo usando una
función.

.. activecode:: imprimir_tabla_multiplicar

   def imprimir_tabla_multiplicar(tabla):
       i = 0
       while i < 10:
           print(tabla,'x',i,'=',tabla*i)
           i = i + 1    

Y podemos usarla con una expresión de llamada a función, igual que la
propia función ``print``.

.. activecode:: tabla-funcion-3
   :include: imprimir_tabla_multiplicar

   imprimir_tabla_multiplicar(3)

Es posible que pienses que esta versión es la más larga, y tiene las
mismas ventajas que la primera versión :numref:`tabla-del-3`.  Una
ventaja de la función es que ya no es necesario copiar el texto del
programa para imprimir otra tabla. Basta usar la función como si se
tratara de una nueva sentencia.

.. activecode:: tabla-funcion-5
   :include: imprimir_tabla_multiplicar

   imprimir_tabla_multiplicar(5)

Ya está bien por ahora, pero no creas que es la única forma de resolver el
problema. En Python siempre hay más formas de escribir las cosas. Por
ejemplo, ésto sería más cercano a lo que haría un programador
experimentado:

.. activecode:: imprimir_tabla_multiplicar_v2

   def imprimir_tabla_multiplicar(tabla):
       for i in range(10):
           print('{} x {} = {}'.format(tabla, i, tabla*i))
    
   imprimir_tabla_multiplicar(3)

No te preocupes si no lo entiendes ahora. Es más importante saber
resolver problemas con un ordenador que conocer el lenguaje al
detalle.
