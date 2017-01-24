
Problema de las 8 damas
=======================

Averiguar todas las posibles posiciones de 8 damas en un tablero de
ajedrez sin que se coman unas a otras.

Análisis previo
---------------

Cada una de las 8 damas debe estar en una fila distinta. Cada una de las
8 damas debe estar en una columna distinta.

Por tanto una posible forma de modelar una solución tentativa es
mediante un vector o lista de 8 números. Cada posición del vector o
lista corresponde a la dama de la fila correspondiente y su valor
corresponde a la columna dentro de esa fila en la que está situada la
dama.

La solución puede por tanto encontrarse por enumeración exhaustiva,
comprobando todas las posibles permutaciones. Resolvamos primero el
problema de encontrar todas las posibles `permutaciones de n
elementos <Permutaciones.ipynb>`__ y luego seguimos.

.. code:: python

    def ocho_damas():
        for p in permutaciones(list(range(8))):
            if es_solucion(p):
                return p

Ya está, es así de simple. Hemos acabado el problema, solo quedan
detalles. Como ya habrás detectado hemos usado fuerza bruta (enumeración
exhaustiva). Podemos hacerlo sin problemas porque ``factorial(8)``, que
es el número de posibles permutaciones de 8 elementos, es un número
modesto.

Para comprobar si es solución solo tenemos que comprobar las diagonales.
Ya sabemos que solo hay una dama en cada fila y en cada columna por la
forma en que hemos modelado el problema.

Para ello tenemos que comprobar que en cada diagonal solo hay una dama,
y lo mismo con las diagonales inversas. Podemos extraer el
comportamiento común si pasamos una función que determina en qué
diagonal o diagonal inversa se encuentra cada dama.

.. code:: python

    def es_solucion(sol):
        return  comprobar_diagonales(sol, find_diag) \
            and comprobar_diagonales(sol, find_diag_inv)

Una posible forma de codificar las 15 diagonales es asignando el número
0 a la diagonal principal, números positivos correlativos a las que
están por encima, y números negativos a las que están por debajo. Por
eso usamos 15 contadores en un diccionario cuyas claves corresponden a
los números entre -7 y 7.

.. code:: python

    def comprobar_diagonales(sol, diag_func):
        c = { i:0 for i in range(-7,8) }
        for x,y in enumerate(sol):
            c[diag_func(x,y)] += 1
        return max(c.values()) == 1

Dadas las coordenadas de una casilla podemos encontrar la diagonal en la
que se encuentra siguiendo el criterio de arriba con un sencillo
cálculo.

.. code:: python

    def find_diag(x,y):
        return x - y
    
    def find_diag_inv(x,y):
        return 7 - x - y

Para probarlo necesitamos proporcionar una definición de
``permutaciones``. Elige la que quieras de `nuestro análisis
previo <Permutaciones.ipynb>`__.

.. code:: python

    from itertools import permutations as permutaciones
    v = ocho_damas()
    print(v)


.. parsed-literal::

    (0, 4, 7, 5, 2, 6, 1, 3)


Solo nos queda imprimir la solución.

.. code:: python

    def imprime_solucion(sol):
        for i in range(8):
            imprime_linea(sol[i])
        print(sol)

.. code:: python

    def imprime_linea(col):
        print('.'*col + '*' + '.'*(7-col))

.. code:: python

    imprime_solucion(v)


.. parsed-literal::

    *.......
    ....*...
    .......*
    .....*..
    ..*.....
    ......*.
    .*......
    ...*....
    (0, 4, 7, 5, 2, 6, 1, 3)


Si queremos buscar otra solución podemos partir de otra permutación
inicial.

.. code:: python

    def ocho_damas(inicial = None):
        for p in permutaciones(inicial if inicial is not None 
                               else list(range(8))):
            if es_solucion(p):
                return p

Ahora basta indicar una permutación inicial diferente.

.. code:: python

    from random import shuffle
    v = list(range(8))
    shuffle(v)
    imprime_solucion(ocho_damas(v))


.. parsed-literal::

    .....*..
    .*......
    ......*.
    *.......
    ...*....
    .......*
    ....*...
    ..*.....
    (5, 1, 6, 0, 3, 7, 4, 2)


Otra posibilidad es convertirlo en un generador para que pueda producir
todas las posibles soluciones.

.. code:: python

    def ocho_damas(inicial = None):
        for p in permutaciones(inicial if inicial is not None 
                               else list(range(8))):
            if es_solucion(p):
                yield p

Ahora podemos, por ejemplo imprimir las 4 primeras soluciones.

.. code:: python

    soluciones = ocho_damas()
    for s in range(4):
        imprime_solucion(next(soluciones))


.. parsed-literal::

    *.......
    ....*...
    .......*
    .....*..
    ..*.....
    ......*.
    .*......
    ...*....
    (0, 4, 7, 5, 2, 6, 1, 3)
    *.......
    .....*..
    .......*
    ..*.....
    ......*.
    ...*....
    .*......
    ....*...
    (0, 5, 7, 2, 6, 3, 1, 4)
    *.......
    ......*.
    ...*....
    .....*..
    .......*
    .*......
    ....*...
    ..*.....
    (0, 6, 3, 5, 7, 1, 4, 2)
    *.......
    ......*.
    ....*...
    .......*
    .*......
    ...*....
    .....*..
    ..*.....
    (0, 6, 4, 7, 1, 3, 5, 2)


