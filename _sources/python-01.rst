
Python 01. Introducción
=======================

.. code:: python

    print('Hola, Mundo')


.. parsed-literal::

    Hola, Mundo


.. code:: python

    print('Hola,')
    print('Mundo')


.. parsed-literal::

    Hola,
    Mundo


.. code:: python

    print('Hola,',end='')
    print('Mundo')


.. parsed-literal::

    Hola,Mundo


.. code:: python

    pers = 'Pedro'
    print('Hola', pers)


.. parsed-literal::

    Hola Pedro


.. code:: python

    n = 200
    if n > 100:
        print('Demasiado')


.. parsed-literal::

    Demasiado


.. code:: python

    tabla = 3
    for i in range(10):
        print(tabla,'x',i,'=',tabla*i)



.. parsed-literal::

    3 x 0 = 0
    3 x 1 = 3
    3 x 2 = 6
    3 x 3 = 9
    3 x 4 = 12
    3 x 5 = 15
    3 x 6 = 18
    3 x 7 = 21
    3 x 8 = 24
    3 x 9 = 27


.. code:: python

    print('i es', i)


.. parsed-literal::

    i es 10


Trabaja sobre lo visto
======================

No te quedes con los ejemplos tontos de las transparencias. Lee el
libro, lee ejemplos de otros sitios, prueba tú mismo otros ejemplos,
cambia los ejemplos para entenderlos plenamente. A continuación veremos
más ejemplos para motivar vuestra propia exploración del lenguaje. No te
quedes solo en ellos, prueba y resuelve tus propios problemas.

Ejecución condicional
---------------------

.. code:: python

    n = 123
    m = 187

Si *n* no está entre 5 y 10 (ambos incluidos) imprimir un mensaje de
error.

.. code:: python

    if n < 5 or n > 10:
        print('No está en el rango permitido')


.. parsed-literal::

    No está en el rango permitido


Otra forma usando rangos. Los rangos son intervalos en
:math:`\mathbb{N}` cerrados por la izquierda y abiertos por la derecha.

.. code:: python

    if n not in range(5,11):
        print('No está en el rango permitido')


.. parsed-literal::

    No está en el rango permitido


En caso de duda basta imprimir el rango.

.. code:: python

    print(range(5,11))


.. parsed-literal::

    range(5, 11)


Vamos a otro ejemplo. Si *m* es mayor que *n* restar *n* de *m*.

.. code:: python

    if m > n:
        m = m - n

Si n no es par multiplicar m por 10 y mostrar un mensaje de advertencia.

.. code:: python

    resto = n - (n//2)*2
    if resto != 0:
        m = m * 10
        print('n no es divisible por 2')


.. parsed-literal::

    n no es divisible por 2


Más fácil, usando el operador % (módulo o resto).

.. code:: python

    if n % 2 != 0:
        m *= 10
        print('n no es divisible por 2')


.. parsed-literal::

    n no es divisible por 2


Un entero se puede utilizar como condición. Si su valor es 0 se
evaluaría como False, si es distinto de 0 se evaluaría como True. Por
tanto se puede hacer más corto así:

.. code:: python

    if n % 2:
        m *= 10
        print('n no es divisible por 2')


.. parsed-literal::

    n no es divisible por 2


¿Cuál de los dos números es más próximo a 100?

.. code:: python

    if abs(n-100) < abs(m-100):
        print('n es más próximo a 100')
    else:
        print('m es más próximo a 100')


.. parsed-literal::

    n es más próximo a 100


O sin repetir el mensaje.

.. code:: python

    if abs(n-100) < abs(m-100):
        print('n', end=' ')
    else:
        print('m', end=' ')
    print('es más próximo a 100')


.. parsed-literal::

    n es más próximo a 100


O más corto, usando el operador ternario (*valor\_si\_true* **if**
*condición* **else** *valor\_si\_false*)

.. code:: python

    print('n' if abs(n-100) < abs(m-100) else 'm', 'es más próximo a 100')


.. parsed-literal::

    n es más próximo a 100


Más corto significa menos código que leer y depurar, pero también puede
significar más difícil de entender. Elige tu propio límite entre
legibilidad y longitud, pero debes ser consciente de que otros tienen
límites diferentes. Es decir, escribe como tú crees que es más legible,
pero aprende a leer código escrito con otros criterios.

Bucles
======

Volveremos a los bucles en futuras sesiones pero merece la pena
detenerse un poco en ellos. A priori parece que los bucles son una forma
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

.. code:: python

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


.. parsed-literal::

    3 x 0 = 0
    3 x 1 = 3
    3 x 2 = 6
    3 x 3 = 9
    3 x 4 = 12
    3 x 5 = 15
    3 x 6 = 18
    3 x 7 = 21
    3 x 8 = 24
    3 x 9 = 27


Evidentemente es correcto pero solo resuelve un problema muy concreto.
Con muy poquito esfuerzo más se pueden resolver problemas parecidos.

.. code:: python

    i = 0
    while i < 10:
        print('3 x',i,'=',3*i)
        i = i + 1


.. parsed-literal::

    3 x 0 = 0
    3 x 1 = 3
    3 x 2 = 6
    3 x 3 = 9
    3 x 4 = 12
    3 x 5 = 15
    3 x 6 = 18
    3 x 7 = 21
    3 x 8 = 24
    3 x 9 = 27


Ahora tenemos dos ventajas. Por un lado es mas corto y por tanto más
fácil de cambiar. Por otro lado no necesitamos conocer los resultados de
las expresiones. Es lo lógico, a fin de cuentas estamos usando un
computador.

Compara esta solución con el ejemplo visto en clase. Es ciertamente
parecido, pero en el ejemplo de clase podemos cambiar la tabla
simplemente cambiando el 3 asignado a **tabla**. La propiedad que
permite manejar casos similares con el mismo fragmento de programa se
llama **abstracción**. No es una simple comodidad, es imprescindible
para poder resolver problemas complejos con un computador.

.. code:: python

    tabla = 3
    i = 0
    while i < 10:
        print(tabla,'x',i,'=',tabla*i)
        i = i + 1


.. parsed-literal::

    3 x 0 = 0
    3 x 1 = 3
    3 x 2 = 6
    3 x 3 = 9
    3 x 4 = 12
    3 x 5 = 15
    3 x 6 = 18
    3 x 7 = 21
    3 x 8 = 24
    3 x 9 = 27


Uno de los mecanismos más poderosos de abstracción son las funciones.
Permiten poner un nombre a un fragmento de programa y además permiten
definir parámetros que pueden cambiar en cada uso. Es como si
definiéramos nuestro propio lenguaje. Volveremos a ellas en la próxima
sesión, pero veamos cómo queda nuestro ejemplo usando una función.

.. code:: python

    def imprimir_tabla_multiplicar(tabla):
        i = 0
        while i < 10:
            print(tabla,'x',i,'=',tabla*i)
            i = i + 1
    
    imprimir_tabla_multiplicar(3)


.. parsed-literal::

    3 x 0 = 0
    3 x 1 = 3
    3 x 2 = 6
    3 x 3 = 9
    3 x 4 = 12
    3 x 5 = 15
    3 x 6 = 18
    3 x 7 = 21
    3 x 8 = 24
    3 x 9 = 27


Es posible que pienses que esta versión es la más larga, y tiene las
mismas ventajas que la mostrada en las transparencias. Una ventaja de la
función es que ya no es necesario copiar el texto del programa para
imprimir otra tabla. Basta usar la función como si se tratara de una
nueva sentencia.

.. code:: python

    imprimir_tabla_multiplicar(5)


.. parsed-literal::

    5 x 0 = 0
    5 x 1 = 5
    5 x 2 = 10
    5 x 3 = 15
    5 x 4 = 20
    5 x 5 = 25
    5 x 6 = 30
    5 x 7 = 35
    5 x 8 = 40
    5 x 9 = 45


Ya está bien por hoy, pero no creas que es la única forma de resolver el
problema. En Python siempre hay más formas de escribir las cosas. Por
ejemplo, ésto sería más cercano a lo que haría un programador
experimentado:

.. code:: python

    def imprimir_tabla_multiplicar(tabla):
        for i in range(10):
            print('{} x {} = {}'.format(tabla, i, tabla*i))
    
    imprimir_tabla_multiplicar(3)


.. parsed-literal::

    3 x 0 = 0
    3 x 1 = 3
    3 x 2 = 6
    3 x 3 = 9
    3 x 4 = 12
    3 x 5 = 15
    3 x 6 = 18
    3 x 7 = 21
    3 x 8 = 24
    3 x 9 = 27


No te preocupes si no lo entiendes ahora. Es más importante saber
resolver problemas con un ordenador que conocer el lenguaje al detalle.

