
Prueba de progreso 1ºC
======================

Lee atentamente el enunciado de la prueba. El enunciado consiste en una
serie de ejercicios que deben realizarse en un mismo archivo Python.
Todas las funciones deben definirse en el mismo archivo y no debe
incuirse ningún fragmento de código de prueba. Las entregas deberán ser
trabajo original del alumno que realiza la entrega.

No se permite la comunicación con otras personas durante el examen. Se
permiten libros, apuntes y búsquedas en Internet.

1. Convolución de señales
-------------------------

Dadas dos señales de tiempo discreto, definidas como secuencias de
valores reales :math:`u(k)` y :math:`v(k)` se define la convolución de
ambas señales como:

.. math::  w[n] = \sum_k u[k]\, v[n-k] 

**Nota: Una señal :math:`u[k]` se modela como una lista ``u`` con los
números reales desde :math:`u[0]` hasta :math:`u[m-1]` siendo
``m = len(u)``. Todos los demás elementos se asume que valen 0. Es decir
:math:`u[k] = 0, \forall k \notin \{0..m\}`.**

1. *Definir una función ``elem`` con dos parámetros. El primer parámetro
   es una lista ``s`` conteniendo una señal discreta. El segundo
   parámetro es un entero ``k`` que indica un índice de elemento. La
   función debe devolver ``s[k]`` si ``k`` está en el rango de índices
   válidos para la lista ``s`` o ``0.0`` en caso contrario.*

2. *Definir una función ``conv_elem`` con tres parámetros. Los dos
   primeros parámetros corresponden a las señales ``u`` y ``v``. El
   tercer parámetro es un entero ``n``. La función debe devolver el
   resultado de la ecuación definida arriba. Es decir, debe devolver el
   elemento ``n``-simo de la convolución de ``u`` y ``v``. Se sugiere
   utilizar la función ``elem`` para evitar tener que considerar casos
   especiales.*

3. *Definir una función ``convolucion`` con dos parámetros que
   corresponden a las señales ``u`` y ``v`` y devuelve la lista de
   números reales resultado de la convolución de ambas señales. La
   longitud de la convolución de ``u`` y ``v`` es
   ``len(u) + len(v) - 1``.*

Ejemplo de funcionamiento
~~~~~~~~~~~~~~~~~~~~~~~~~

::

    u = [ 1., 2., 1., 2., 1., 2., 1., 2. ]
    v = [ 1., 2., 3., 2., 1. ]
    print convolucion(u,v)

    [1.0, 4.0, 8.0, 12.0, 13.0, 14.0, 13.0, 14.0, 12.0, 10.0, 5.0, 2.0]

.. code:: python

    def elem(signal,k):
        if k >= len(signal) or k < 0:
            return 0.
        return signal[k]
    
    def conv_elem(u, v, n):
        sum = 0.
        for k in range(len(u)):
            sum += elem(u,k)*elem(v,n-k)
        return sum
    
    def convolucion(u,v):
        return [ conv_elem(u,v,i) for i in range(len(u)+len(v)-1) ]

La función ``convolucion`` también se puede hacer sin *list
comprehensions*.

.. code:: python

    def convolucion(u,v):
        c = []
        for i in range(len(u)+len(v)-1):
            c.append(conv_elem(u,v,i))
        return c

2. Piedra, papel o tijera
-------------------------

Piedra, papel o tijera es un juego en el que dos jugadores eligen una de
esas tres opciones a la vez. El que gana depende de lo elegido por
ambos:

-  La piedra gana a las tijeras (las despunta).
-  Las tijeras ganan al papel (lo cortan).
-  El papel gana a la piedra (la tapa).
-  Dos iguales empatan.

Hacer una función ``ganador`` que tenga dos parámetros de tipo cadena de
texto. Cada parámetro puede contener una de estas tres palabras
``piedra``, ``papel``, o ``tijera``. La función debe devolver un número
indicando cuál de los dos gana. Si el primero gana devolverá un ``1``.
Si el segundo gana devolverá un ``2``. Si empatan devolverá un ``0``.

Ejemplo de funcionamiento
~~~~~~~~~~~~~~~~~~~~~~~~~

::

    print ganador('piedra','tijera')
    1
    print ganador('piedra','papel')
    2
    print ganador('tijera','tijera')
    0

La forma más sencilla de hacerlo (desde mi punto de vista) es con un
diccionario. Veamos cuáles son las distintas posibilidades de partidas
en las que no hay empate.

.. code:: python

    opciones = ['piedra', 'papel', 'tijera']
    juegos_posibles = [ (i,j) for i in opciones for j in opciones if i != j ]
    print(juegos_posibles)


.. parsed-literal::

    [('piedra', 'papel'), ('piedra', 'tijera'), ('papel', 'piedra'), ('papel', 'tijera'), ('tijera', 'piedra'), ('tijera', 'papel')]


Ya solo tenemos que decir cuál es el ganador de estas posibilidades en
una lista y componer el diccionario:

.. code:: python

    def ganador(a,b):
        opciones = ['piedra', 'papel', 'tijera']
        posibles = [ (i,j) for i in opciones for j in opciones if i != j ]
        gana = [ 2, 1, 1, 2, 2, 1 ]
        ganadores = dict(zip(posibles, gana))
        if (a,b) in ganadores:
            return ganadores[(a,b)]
        return 0

También se puede hacer sin diccionario. Contemplamos primero el caso de
que sean iguales y luego la mitad de los casos en los que a y b están
ordenados según la secuencia ``piedra``, ``papel``, ``tijera``. Para los
demás casos llamamos a ``ganador`` con los parámetros invertidos y
corregimos el resultado.

.. code:: python

    def ganador(a,b):
        if a == b: return 0
        if a == 'piedra' and b == 'papel':
            return 2
        if a == 'piedra' and b == 'tijera':
            return 1
        if a == 'papel' and b == 'tijera':
            return 2
        return 2 if ganador(b,a) == 1 else 1

La última línea también se puede poner como una lista indexada por el
resultado.

.. code:: python

    def ganador(a,b):
        if a == b: return 0
        if a == 'piedra' and b == 'papel':
            return 2
        if a == 'piedra' and b == 'tijera':
            return 1
        if a == 'papel' and b == 'tijera':
            return 2
        return [0, 2, 1][ganador(b,a)]

Rúbrica de evaluación
---------------------

Puntos totales: 10 puntos:

-  1.1 Función ``elem``: 2.5 puntos
-  1.2 Función ``conv_elem``: 2.5 puntos
-  1.3 Función ``convolucion``: 2.5 puntos
-  2 Función ``ganador``: 2.5 puntos

Penalizaciones:

-  Errores de sintaxis: 100% de los puntos de la función
-  Errores de ejecución (excepciones): 50% de los puntos de la función
-  Errores en límites de recorridos: 20% de los puntos de la función
-  Código repetitivo: 10% de los puntos de la función

