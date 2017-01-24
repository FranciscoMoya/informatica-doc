
Python básico
=============

Por diversos problemas administrativos y logísticos parece que hay
alumnos con un evidente desconocimiento de partes de Python que
consideramos esenciales. Por tanto voy a describir en este documento
toda la sintaxis de Python ya descrita hasta el momento. Lee el
documento rápidamente, sin pararte en cada detalle. Vuelve a él cuando
tengas alguna duda.

Expresiones
-----------

Las expresiones son la forma de expresar cómputos en el ordenador. Hay
expresiones simples y compuestas. Las expresiones simples más
importantes son los literales, es decir, los valores inmediatos, como un
valor numérico o un texto que se imprime por pantalla.

Literales
~~~~~~~~~

Las expresiones tienen un tipo asociado que le permite a Python
determinar cuándo tienen sentido (semántica estática) o qué operaciones
pueden aplicarse.

.. code:: python

    type(1+34 + 2**5)




.. parsed-literal::

    int



.. code:: python

    type('hola ' + 'caracola')




.. parsed-literal::

    str



.. code:: python

    type(251/2)




.. parsed-literal::

    float



.. code:: python

    type(max)




.. parsed-literal::

    builtin_function_or_method



Cadenas de texto
^^^^^^^^^^^^^^^^

El texto se representa como una secuencia de caracteres entre comillas.
Se les llama habitualmente cadenas de texto.

.. code:: python

    print('¿Qué tal?')


.. parsed-literal::

    ¿Qué tal?


Las cadenas de texto funcionan como cualquier otra secuencia (listas,
tuplas, etc.) en muchos sentidos. Por ejemplo, podemos obtener cualquier
letra de la cadena con el operador de indexación. Los índices negativos
sirven para contar desde el final.

.. code:: python

    s = 'abcdefghijklmnñopqrstuvwxyz'
    print(s[0], s[4], s[-1], s[-4])


.. parsed-literal::

    a e z w


Podemos obtener la longitud con la función ``len``.

.. code:: python

    len(s)




.. parsed-literal::

    27



También se pueden obtener subcadenas (rodajas o *slices*) usando la
notación especial separada por dos puntos. La notación corresponde a
*primero:último:salto* pero el segundo signo ``:`` junto al tercer
número se pueden omitir si el salto es de uno en uno. Por otro lado si
se omite el primer número se asume el primer elemento. Y si se omite el
último se asume ``len(s)``. El último elemento no se incluye en la
rodaja.

.. code:: python

    print(s[4:7], s[:3], s[3:], s[-3:])
    print(s[::4], s[::-1])


.. parsed-literal::

    efg abc defghijklmnñopqrstuvwxyz xyz
    aeimptx zyxwvutsrqpoñnmlkjihgfedcba


Números enteros
^^^^^^^^^^^^^^^

Python 3 tiene enteros de precisión arbitraria. Eso significa que no hay
límite en el tamaño que pueden tener. Por ejemplo:

.. code:: python

    2**3450




.. parsed-literal::

    3576720803565275057839928219353083921763535259468698662753739152198552441867883647143304428637726141133835596930347257022227256683860990623981160430533007689883916308559118990520146216899699248238931399641413845615405251814462209444850454652714334205292077092223677308216738965107105682968359166327863506711948610474227555031881236534132855712180707371506836324487806365067661619066349957068368599876048426776492574045512344928622851612631408186799965481951599514299320985419831699339082151647887667702459162952921870631514562032839424059238157521104510001197050206012304136306326417222969089279622337718269953046640849445119972864193163906852973990993916046565484375085517592524959655061567575060419482887691343703741609788280527973997927868816235126269880880695310768033978427832595814683231289717256596146826674836556793769044528480443382424075224851267780806416197680367795308315040020246019511627745987158655671829042268906633428954797799329045711381633521769648556208828100473192244572164644396423321472805318672454370005905911578624



Se puede operar con enteros con los operadores habituales, pero algunas
operaciones, como la división, transforma automáticamente la expresión a
un real (``float``). Utiliza ``//`` para forzar división entera y no
perder precisión.

.. code:: python

    1 + 234/2 - 12**46




.. parsed-literal::

    -4.388714385610605e+49



.. code:: python

    1 + 234//2 - 12**46




.. parsed-literal::

    -43887143856106046360568987631860370008329246736266



Números reales
^^^^^^^^^^^^^^

Se expresan en base 10 con un punto para separar la parte decimal y en
notación científica (con una ``e`` para representar
:math:`\times 10^n`).

.. code:: python

    1.25e-5 + 12.34 - 15e+3




.. parsed-literal::

    -14987.6599875



Los números reales **no tienen precisión infinita**. Se representan
internamente como signo, mantisa normalizada de tamaño fijo y exponente
de tamaño fijo utilizando base 2. Los detalles no son relevantes en este
punto del curso. Pero sí es importante saber que esto implica que es
fácil perder resolución.

.. code:: python

    n = 1.0
    for i in range(10):
        n = n - 0.1
    n




.. parsed-literal::

    1.3877787807814457e-16



Por tanto no se debe comparar reales con igualdad

Llamada a función
^^^^^^^^^^^^^^^^^

La expresión más importante de todas es la llamada a función. Es tan
importante porque por sí sola permite implementar todas las demás.
Consideramos completamente esencial saber definir funciones y usar
funciones (llamar a dichas funciones). La llamada a función es similar
al uso de funciones en matemáticas.

.. code:: python

    max(1,2,5,21,4,43,11,3,9)




.. parsed-literal::

    43



Variables
---------

Python permite poner nombres a valores almacenados en memoria usando
*sentencias de asignación*.

.. code:: python

    pi = 3.141592653589793
    radio = 20
    area = pi * radio**2

A la derecha del signo ``=`` debe haber un valor. Por ejemplo, el
resultado de evaluar una expresión aritmética, o un literal. Ese valor
se almacena en memoria y se le asocia el nombre de la izquierda. A
partir de ahora se puede usar el nombre para referirse al valor
almacenado.

Python permite asignar varias variables de golpe separando los elementos
por comas:

.. code:: python

    a, b = 10, 25
    print(a)
    print(b)


.. parsed-literal::

    10
    25


En cualquier caso todas las expresiones de la derecha se evalúan *antes*
de poner los nombres de la izquierda. Por tanto puede usarse para
intercambio de valores:

.. code:: python

    a, b = b, a
    print(a)
    print(b)


.. parsed-literal::

    25
    10


Funciones
---------

Es muy importante saber definir y usar funciones. La estructura general
es simple.

.. code:: python

    def funcion(arg1, arg2):
        resultado = (arg1 * arg2)**0.5
        return resultado

Los argumentos o parámetros formales de la función (``arg1`` y ``arg2``
en nuestro ejemplo) son simplemente nombres para referirnos a lo que se
pase como primer argumento, segundo argumento, etc. en cualquier llamada
a la función. Permiten escribir lo que debe hacer la función con esos
argumentos sin conocer los valores que se van a usar. En este sentido
proporcionan un mecanismo de abstracción, que se conoce como
*abstracción lambda*.

La forma en la que se implementa esta *abstracción lambda* en Python es
también interesante. Cuando se llama a una función se crea un nuevo
ámbito de declaración de variables y en ese nuevo ámbito se crean nuevas
variables con el nombre de los parámetros formales que se refieren a los
valores de los argumentos pasados en la llamada. El ámbito de
declaración de la función desaparece cuando la función se destruye.

Por ejemplo:

.. code:: python

    funcion(12, 15)




.. parsed-literal::

    13.416407864998739



En esta llamada se crea un ámbito de declaración en el que se incluyen
las siguientes asignaciones.

.. code:: python

    arg1 = 12
    arg2 = 15
    resultado = (arg1*arg2)**0.5

Las dos primeras corresponden a los parámetros formales y l última es
del cuerpo de la función. Durante la llamada a la función sí que existe
una variable para cada parámetro formal, es la forma en la que Python
implementa la *abstracción lambda*. Además cualquier asignación a
variables que ocurra dentro de esa llamada a función se realizará en el
ámbito de declaración de variables de la función, que desaparecerá tan
pronto como la función termine con un ``return`` o llegando a la última
sentencia. Es decir, ``arg1``, ``arg2`` y ``resultado`` ya no existirán
después de ejecutar la función. Lo único que permanece es el valor
devuelto con ``return``, como valor de la expresión de llamada. Tendrás
que almacenarlo en una variable o pasarlo como argumento a otra función
para que pueda ser usado.

Si no se entiende la llamada a función recomendamos la experimentación
con `Python Tutor <pythontutor.com>`__ de Philip Guo. No es posible
avanzar de ninguna manera sin haber entendido perfectamente cómo
funcionan la definición y las llamadas a funciones. Si necesitas ayuda
acude a tutorías o al laboratorio.

Bifurcación
-----------

La ejecución condicional de código se realiza con la sentencia ``if``:

.. code:: python

    if a > 5:
        print('a es mayor de 5')
    elif a < 0:
        print('a es negativo')
    else:
        print('a está en el intervalo [0,5]')


.. parsed-literal::

    a es mayor de 5


La claúsula ``elif`` es una abreviatura de *else if* y puede repetirse
tantas veces como sea necesario (nada recomendable). Tanto la claúsula
``elif`` como la claúsula ``else`` son opcionales. Las condiciones
después de ``if`` o después ``elif`` deben ser expresiones booleanas (de
valor ``True`` o ``False``).

Repetición
----------

Python incluye dos sentencias para repetir: ``while`` y ``for``. Se
podría hacer todo con ``while`` pero ``for`` es más cómodo cuando se
conoce a priori el número de repeticiones, o se conoce una expresión
para calcular el número de repeticiones.

.. code:: python

    def leer_entero():
        while True:
            s = input('Introduce un número ')
            if s.isdecimal():
                return int(s)
            print('Entrada inválida')
            
    def paracetamol_dosis(kg):
        mg_kg_hora = 50/24
        mg_hora = mg_kg_hora*kg
        ml_hora = mg_hora/40
        print('Apiretal 40 para niño de {}kg\n'.format(kg))
        print('Cada\tmg\tml')
        print('----\t--\t--')
        for horas in (4, 6, 8):
            print('{}h\t{}\t{}'
                  .format(horas,
                          round(mg_hora*horas),
                          round(ml_hora*horas)))

.. code:: python

    leer_entero()


.. parsed-literal::

    Introduce un número 1a
    Entrada inválida
    Introduce un número 12




.. parsed-literal::

    12



.. code:: python

    paracetamol_dosis(13)


.. parsed-literal::

    Apiretal 40 para niño de 13kg
    
    Cada	mg	ml
    ----	--	--
    4h	108	3
    6h	162	4
    8h	217	5


Listas
------

Las listas son la secuencia más flexible de Python. Mantiene el orden de
sus elementos y puede modificarse después de su creación (se dice que es
*mutable*).

+---------------------+-------------------------+
| Operación           | Significado             |
+=====================+=========================+
| ``l = []``          | Crea una lista vacía    |
+---------------------+-------------------------+
| ``l = [1,2,3]``     | Crea una lista con      |
|                     | valores iniciales       |
+---------------------+-------------------------+
| ``len(l)``          | Número de elementos     |
+---------------------+-------------------------+
| ``l.append(4)``     | Añade un elemento       |
+---------------------+-------------------------+
| ``l.remove(2)``     | Elimina un elemento     |
+---------------------+-------------------------+
| ``l.count(2)``      | Número de veces que     |
|                     | aparece el elemento 2   |
|                     | en ``l``                |
+---------------------+-------------------------+
| ``del l[2]``        | Elimina el elemento de  |
|                     | la posición 2           |
+---------------------+-------------------------+
| ``l.extend([5,6])`` | Extiende la lista con   |
|                     | los elementos de otra   |
|                     | lista                   |
+---------------------+-------------------------+
| ``m = l + [5,6]``   | Crea otra lista         |
|                     | concatenando ``l`` y    |
|                     | ``[5,6]``               |
+---------------------+-------------------------+
| ``4 in l``          | ``True`` si ``4`` está  |
|                     | en la lista ``l``       |
+---------------------+-------------------------+
| ``a = l.pop()``     | Quita el último         |
|                     | elemento de ``l`` y lo  |
|                     | devuelve                |
+---------------------+-------------------------+
| ``l[1]``            | Segundo elemento de la  |
|                     | lista                   |
+---------------------+-------------------------+
| ``m = l[:]``        | Copia todos los         |
|                     | elementos de la lista   |
|                     | ``l`` en una nueva      |
|                     | lista ``m``             |
+---------------------+-------------------------+
| ``m = l[1:4]``      | Nueva lista con los     |
|                     | elementos de ``l`` que  |
|                     | ocupan las posiciones   |
|                     | 1, 2 y 3                |
+---------------------+-------------------------+
| ``m = l[:3]``       | Nueva lista con los 3   |
|                     | primeros elementos de   |
|                     | ``l``                   |
+---------------------+-------------------------+
| ``m = l[-3:]``      | Nueva lista con los 3   |
|                     | últimos elementos de    |
|                     | ``l``                   |
+---------------------+-------------------------+
| ``m = l[::2]``      | Nueva lista con los     |
|                     | elementos de ``l`` en   |
|                     | posición par            |
+---------------------+-------------------------+
| ``m = l[1::2]``     | Nueva lista con los     |
|                     | elementos de ``l`` en   |
|                     | posición impar          |
+---------------------+-------------------------+

Tuplas
------

Las tuplas son la secuencia más sencilla (y eficiente) de Python. Una
vez creada no puede modificarse (se dice que es *inmutable*).

+---------------------+--------------------------------------------------+
| Operación           | Significado                                      |
+=====================+==================================================+
| ``l = (1,2,3)``     | Crea una tupla con 3 valores                     |
+---------------------+--------------------------------------------------+
| ``len(l)``          | Número de elementos                              |
+---------------------+--------------------------------------------------+
| ``m = l + (5,6)``   | Crea otra tupla concatenando ``l`` y ``(5,6)``   |
+---------------------+--------------------------------------------------+
| ``4 in l``          | ``True`` si ``4`` está en la tupla ``l``         |
+---------------------+--------------------------------------------------+
| ``l[1]``            | Segundo elemento de la tupla                     |
+---------------------+--------------------------------------------------+

Diccionarios
------------

Los diccionarios son contenedores de parejas clave/valor. Pueden
modificarse después de su creación (se dice que es *mutable*).

+---------------------+-------------------------+
| Operación           | Significado             |
+=====================+=========================+
| ``d = {}``          | Crea un diccionario     |
|                     | vacío                   |
+---------------------+-------------------------+
| ``d = {'a':1,'b':2, | Crea un diccionario con |
| 'c':3]``            | valores iniciales       |
+---------------------+-------------------------+
| ``len(d)``          | Número de elementos     |
+---------------------+-------------------------+
| ``d['d'] = 4``      | Añade un elemento       |
+---------------------+-------------------------+
| ``del d['b']``      | Elimina un elemento     |
+---------------------+-------------------------+
| ``d.update({'d':4,' | Extiende el diccionario |
| e':5})``            | con los elementos de    |
|                     | otro diccionario        |
+---------------------+-------------------------+
| ``'c' in d``        | ``True`` si ``'c'``     |
|                     | está en el diccionario  |
|                     | ``d``                   |
+---------------------+-------------------------+
| ``a = d.pop('e')``  | Quita el elemento con   |
|                     | clave ``'e'`` y lo      |
|                     | devuelve                |
+---------------------+-------------------------+
| ``m = d['a']``      | Elemento con clave 'a'  |
+---------------------+-------------------------+

Conjuntos
---------

Los conjuntos son contenedores sin orden donde los elementos no se
repiten. Pueden modificarse después de su creación (se dice que son
*mutables*) y están optimizados para determinar pertenencia. Implementan
todas las operaciones típicas del álgebra de Boole. Los conjuntos no
soportan indexación (operador ``[]``).

+---------------------+-------------------------+
| Operación           | Significado             |
+=====================+=========================+
| ``a = set()``       | Crea un conjunto vacío  |
+---------------------+-------------------------+
| ``a = set([1,2,3])` | Crea un conjunto con    |
| `                   | valores iniciales       |
+---------------------+-------------------------+
| ``len(a)``          | Número de elementos     |
+---------------------+-------------------------+
| ``a.add(4)``        | Añade un elemento       |
+---------------------+-------------------------+
| ``a.remove(2)``     | Elimina un elemento     |
+---------------------+-------------------------+
| ``a.update([5,6])`` | Añade un conjunto de    |
|                     | elementos               |
+---------------------+-------------------------+
| ``a.union(b)``      | Nuevo conjunto con      |
|                     | unión de conjuntos      |
+---------------------+-------------------------+
| ``a.intersection(b) | Nuevo conjunto con      |
| ``                  | intersección de         |
|                     | conjuntos               |
+---------------------+-------------------------+
| ``a.symetric_differ | Nuevo conjunto con      |
| ence(b)``           | diferencia simétrica de |
|                     | conjuntos               |
+---------------------+-------------------------+
| ``a - b``           | Nuevo conjunto con      |
|                     | diferencia de conjuntos |
+---------------------+-------------------------+
| ``4 in a``          | ``True`` si ``4`` está  |
|                     | en el conjunto ``a``    |
+---------------------+-------------------------+
| ``x = a.pop()``     | Quita un elemento de    |
|                     | ``a`` y lo devuelve     |
+---------------------+-------------------------+

Rodajas (slices)
----------------

Uno de los aspectos más importantes de los contenedores es la capacidad
de indexar para seleccionar trozos del contenedor. Cuanta más práctica
tengas en el uso de rodajas más sencillos serán tus tipos de datos.

La forma general de una rodaja es ``contenedor[primero:ultimo:salto]``.
Produce un subconjunto de elementos (rodaja) que corresponde a todos los
elementos con posiciones entre ``primero`` y ``ultimo`` (sin contar
``ultimo``) tomando un elemento de cada ``salto`` elementos. Si se omite
``primero`` se asume *0*, si se omite ``ultimo`` se asume
``len(contenedor)`` y si se omite ``salto`` se asume *1*.

Esto funciona con cualquier objeto iterable que tenga operador de
indexación. Funciona con cadenas de texto, listas, tuplas, rangos.
Veamos algunos ejemplos.

.. code:: python

    import random
    l = tuple(random.randint(0,100) for i in range(15))
    l




.. parsed-literal::

    (77, 86, 43, 7, 72, 63, 13, 58, 86, 94, 98, 96, 40, 25, 68)



Los elementos de posición par y los de posición impar:

.. code:: python

    l[::2], l[1::2]




.. parsed-literal::

    ((77, 43, 72, 13, 86, 98, 40, 68), (86, 7, 63, 58, 94, 96, 25))



Los tres primeros y los tres últimos:

.. code:: python

    l[:3], l[-3:]




.. parsed-literal::

    ((77, 86, 43), (40, 25, 68))



Acostúmbrate a usar rodajas para modelar datos complejos. Por ejemplo,
una matriz 3x3 se puede representar directamente como un tupla de 9
elementos:

.. code:: python

    a = tuple(random.randint(0,10) for i in range(9))
    a




.. parsed-literal::

    (10, 5, 0, 4, 5, 9, 2, 4, 8)



Las tres filas se pueden imprimir como rodajas:

.. code:: python

    a[:3], a[3:6], a[6:]




.. parsed-literal::

    ((10, 5, 0), (4, 5, 9), (2, 4, 8))



Las tres columnas también:

.. code:: python

    a[::3], a[1::3], a[2::3]




.. parsed-literal::

    ((10, 4, 2), (5, 5, 4), (0, 9, 8))



Incluso las diagonales pueden escribirse como rodajas:

.. code:: python

    a[::4], a[2:-1:2]




.. parsed-literal::

    ((10, 5, 8), (0, 5, 2))



Si en algún momento quieres representarla como una lista de listas
también es fácil, pero no te lo recomendamos, es más lento.

.. code:: python

    [list(a[i:i+3]) for i in (0,3,6)]




.. parsed-literal::

    [[10, 5, 0], [4, 5, 9], [2, 4, 8]]



O como una tupla de tuplas (un poco más eficiente pero tampoco mucho):

.. code:: python

    tuple(a[i:i+3] for i in (0,3,6))




.. parsed-literal::

    ((10, 5, 0), (4, 5, 9), (2, 4, 8))



Apéndice. Biblioteca estándar
=============================

Python tiene una amplísima biblioteca de funciones de todo tipo. Para
cualquier trabajo serio de programación sería muy conveniente echar un
vistazo a los documentos de
`docs.python.org <http://docs.python.org>`__. En este curso utilizaremos
pocas funciones de la biblioteca estándar, pero de todas formas en los
ejemplos verás con frecuencia formas alternativas de resolver problemas
que utilizan funciones de la bibioteca estándar. En este apéndice
recogemos las más importantes.

Formateo de cadenas
-------------------

Uno de los aspectos más recurrentes en la programación es la necesidad
de presentar la información según unas indicaciones determinadas. En
Python hay varias formas de construir cadenas de acuerdo a un formato
dado, pero la más moderna es el método ``format`` de las cadenas.

.. code:: python

    help(''.format)


.. parsed-literal::

    Help on built-in function format:
    
    format(...) method of builtins.str instance
        S.format(*args, **kwargs) -> str
        
        Return a formatted version of S, using substitutions from args and kwargs.
        The substitutions are identified by braces ('{' and '}').
    


Se utilizan los caracteres ``{}`` para representar puntos de inserción
de los argumentos. Por ejemplo:

.. code:: python

    '{} x {} = {}'.format(5, 9, 5*9)




.. parsed-literal::

    '5 x 9 = 45'



Se pueden usar números que indican la posición del argumento a sustituir
para evitar ambigüedad o hacer repeticiones:

.. code:: python

    '{0} es a {1} como {1} es a {0}'.format('tortilla', 'zapatilla')




.. parsed-literal::

    'tortilla es a zapatilla como zapatilla es a tortilla'



Y probablemente lo más útil es la posibilidad de indicar el formato con
dos puntos. Por ejemplo:

.. code:: python

    import math
    print('{0:.4f}\t{0:.7E}'.format(math.pi))


.. parsed-literal::

    3.1416	3.1415927E+00


O incluso indicar el ancho que debe ocupar y si se alinea a derecha,
centrado, o a izquierda.

.. code:: python

    '[{:>10s}] [{:^10s}] [{:<10s}]'.format('Hola', 'Pasa', 'Adios')




.. parsed-literal::

    '[      Hola] [   Pasa   ] [Adios     ]'



Funciones de cadenas
~~~~~~~~~~~~~~~~~~~~

Es importante conocer qué funciones proporcionan las cadenas. Para
conocerlas basta utilizar los mecanismos de introspección normales.

.. code:: python

    s=''
    dir(s)




.. parsed-literal::

    ['__add__',
     '__class__',
     '__contains__',
     '__delattr__',
     '__dir__',
     '__doc__',
     '__eq__',
     '__format__',
     '__ge__',
     '__getattribute__',
     '__getitem__',
     '__getnewargs__',
     '__gt__',
     '__hash__',
     '__init__',
     '__iter__',
     '__le__',
     '__len__',
     '__lt__',
     '__mod__',
     '__mul__',
     '__ne__',
     '__new__',
     '__reduce__',
     '__reduce_ex__',
     '__repr__',
     '__rmod__',
     '__rmul__',
     '__setattr__',
     '__sizeof__',
     '__str__',
     '__subclasshook__',
     'capitalize',
     'casefold',
     'center',
     'count',
     'encode',
     'endswith',
     'expandtabs',
     'find',
     'format',
     'format_map',
     'index',
     'isalnum',
     'isalpha',
     'isdecimal',
     'isdigit',
     'isidentifier',
     'islower',
     'isnumeric',
     'isprintable',
     'isspace',
     'istitle',
     'isupper',
     'join',
     'ljust',
     'lower',
     'lstrip',
     'maketrans',
     'partition',
     'replace',
     'rfind',
     'rindex',
     'rjust',
     'rpartition',
     'rsplit',
     'rstrip',
     'split',
     'splitlines',
     'startswith',
     'strip',
     'swapcase',
     'title',
     'translate',
     'upper',
     'zfill']



Algunas de las que más se usan son ``startswith``, ``endswith``,
``lower``, ``upper``, ``split``, ``join``, ``find`` y ``count``. Obtener
ayuda sobre cada una de ellas es trivial.

.. code:: python

    help(s.split)


.. parsed-literal::

    Help on built-in function split:
    
    split(...) method of builtins.str instance
        S.split(sep=None, maxsplit=-1) -> list of strings
        
        Return a list of the words in S, using sep as the
        delimiter string.  If maxsplit is given, at most maxsplit
        splits are done. If sep is not specified or is None, any
        whitespace string is a separator and empty strings are
        removed from the result.
    


No es esencial conocer en detalle estas funciones, pero simplifican
extraordinariamente el trabajo con cadenas de texto.

\*\* Este apéndice necesita completarse \*\*

Apéndice. Aspectos avanzados
============================

En este apéndice describiremos dos características de Python que tienen
una fuerte relación. No es necesario dominar ninguna de estas
características para completar satisfactoriamente los objetivos del
curso, pero sí es necesario entender mínimamente su funcionamiento,
porque se emplean continuamente.

Generadores
-----------

A lo largo del curso hemos visto y seguiremos viendo multitud de casos
donde se necesita generar una considerable cantidad de datos pero no se
necesita consumirlos de golpe, sino uno a uno. En esos casos es
frecuentemente más sencillo emplear generadores. Los generadores son
funciones que producen datos usando la sentencia ``yield``. Esta
sentencia

*Comprehensions*
----------------

Las comprensiones de lista, diccionario o tupla

Apéndice. Operadores
====================

Python tiene una rica colección de operadores. Cuantos más conozcas más
sencillas serán tus expresiones. Ponemos en este apéndice los que
creemos que pueden serte útiles.

Operadores aritméticos
----------------------

+-------------+--------------------+---------------------------------------------------------------------------------------+
| Expresión   | Tipo de operando   | Significado                                                                           |
+=============+====================+=======================================================================================+
| ``a+b``     | Numéricos          | Suma                                                                                  |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a+b``     | Cadenas            | Concatenación                                                                         |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a+b``     | Listas             | Concatenación                                                                         |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a+b``     | Conjuntos          | Unión                                                                                 |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a-b``     | Numéricos          | Resta                                                                                 |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a-b``     | Conjuntos          | `Diferencia de conjuntos <https://es.wikipedia.org/wiki/Diferencia_de_conjuntos>`__   |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a*b``     | Numéricos          | Multiplicación                                                                        |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a*b``     | Cadena, Entero     | Repetición                                                                            |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a*b``     | Lista, Entero      | Repetición                                                                            |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a/b``     | Numéricos          | División real                                                                         |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a//b``    | Numéricos          | División entera                                                                       |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a%b``     | Numéricos          | Resto de división entera                                                              |
+-------------+--------------------+---------------------------------------------------------------------------------------+
| ``a**b``    | Numéricos          | Potencia (*a* elevado a *b*)                                                          |
+-------------+--------------------+---------------------------------------------------------------------------------------+

Operadores de comparación
-------------------------

+--------------+--------------------+-----------------+
| Expresión    | Tipo de operando   | Significado     |
+==============+====================+=================+
| ``a == b``   | Cualquiera         | Igual           |
+--------------+--------------------+-----------------+
| ``a != b``   | Cualquiera         | Distinto        |
+--------------+--------------------+-----------------+
| ``a < b``    | Comparables        | Menor           |
+--------------+--------------------+-----------------+
| ``a > b``    | Comparables        | Mayor           |
+--------------+--------------------+-----------------+
| ``a <= b``   | Comparables        | Menor o igual   |
+--------------+--------------------+-----------------+
| ``a >= b``   | Comparables        | Mayor o igual   |
+--------------+--------------------+-----------------+

Operadores lógicos
------------------

+---------------+------------------------+---------------+
| Expresión     | Tipo de operando       | Significado   |
+===============+========================+===============+
| ``a and b``   | Booleano               | Y lógico      |
+---------------+------------------------+---------------+
| ``a or b``    | Booleano               | Ó lógico      |
+---------------+------------------------+---------------+
| ``not a``     | Booleano               | No lógico     |
+---------------+------------------------+---------------+
| ``a in b``    | Cualquiera/secuencia   | Pertenence    |
+---------------+------------------------+---------------+

Nota: ``a in b`` funciona para ``b`` lista, tupla, diccionario, conjunto
o cadena.

.. code:: python

    [1,2,3]*3




.. parsed-literal::

    [1, 2, 3, 1, 2, 3, 1, 2, 3]



