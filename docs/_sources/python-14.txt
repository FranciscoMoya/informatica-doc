
Operaciones con listas
======================

En este cuaderno veremos una serie de operaciones con listas que
resultan muy útiles en muchos contextos.

Subconjunto de una lista
------------------------

Dadas dos listas ``L1`` y ``L2`` se trata de comprobar si ``L1`` es un
subconjunto de la lista ``L2``.

.. code:: python

    def esSubconjunto(L1, L2):
        '''Asume L1, L2 listas
           Devuelve True si todos los elementos de L1 están en L2
           y False en caso contrario'''
        for e in L1:
            if not e in L2:
                return False
        return True
    
    print(esSubconjunto([3,5,7], range(10)))
    print(esSubconjunto([3,5,17], range(10)))


.. parsed-literal::

    True
    False


Intersección de listas
----------------------

Dadas dos listas ``L1`` y ``L2`` se trata de determinar la lista de los
elementos que están en las dos listas.

.. code:: python

    def interseccion(L1,L2):
        '''Asume L1, L2 listas
           Devuelve lista con elementos comunes'''
        l = []
        for e in L1:
            if e in L2:
                l.append(e)
        return l
    
    print(interseccion(range(10), range(8,20)))


.. parsed-literal::

    [8, 9]


O con *list comprehensions*.

.. code:: python

    def interseccion(L1,L2):
        '''Asume L1, L2 listas
           Devuelve lista con elementos comunes'''
        return [ e for e in L1 if e in L2 ]
    
    print(interseccion(range(10), range(8,20)))


.. parsed-literal::

    [8, 9]


*Powerset*
----------

Dada una lista ``L``, se define su *powerset* como el conjunto de todas
las posibles combinaciones de elementos que podemos hacer con los
elementos de ``L``. Por ejemplo, para la lista ``[1, 2]`` su *powerset*
sería ``[], [1], [2], [1,2]``.

Una posible forma de modelar el problema es asociando un bit a cada
elemento de ``L``. Si el bit está a 0 significa que ese elemento no se
toma, si está a 1, significa que sí se toma. Así el ejemplo anterior
podría representarse por los números binarios 00, 01, 10, 11 (en decimal
0, 1, 2, 3). Es decir, todos los posibles valores de un número de 2
bits. Y todos los valores posibles de números de *n* bits son
``range(2**n)``.

.. code:: python

    def genPowerset(L):
        '''Asume L una lista
           Devuelve una lista de listas con todas las posibles 
           combinaciones de los elementos de L'''
        powerset = []
        for i in range(0, 2**len(L)):
            subset = []
            for j in range(len(L)):
                if isBitSet(i,j):
                    subset.append(L[j])
            powerset.append(subset)
        return powerset

Ya solo queda la función ``isBitSet(n, bit)``, que determina si
determinado bit está a 0 o a 1 en un número ``n``. Para ello podemos
crear un número que solo tiene el bit deseado a 1 (``1<<bit``) y hacer
una operación *and* bit a bit con ``n``. El resultado será 0 si el bit
es 0 o bien ``1<<bit`` si el bit es 1.

.. code:: python

    def isBitSet(n, bit):
        return 0 != n & (1<<bit)

Si te resulta complicado el uso de las operaciones de bits lee en
detalle la segunda parte de este documento.

Operaciones con bits
====================

Python ofrece una amplia variedad de características para trabajar con
los bits de un número. Vamos a ver algunas de ellas.

Sistemas de numeración posicionales
-----------------------------------

El ordenador trabaja con números almacenados en bits. Cada bit solo
puede almacenar un 0 o un 1. Por tanto si queremos almacenar un número
más grande tenemos que guardar más de un bit. Al guardarlos de esta
forma se dice que son *codificados en binario*. Así, por ejemplo, un 2
se almacenaría como un 1 en un bit y un 0 en otro. Éstos son todos los
números que podemos representar con 2 bits:

+----------+-----------------------+
| Número   | En binario (2 bits)   |
+==========+=======================+
| 0        | 00                    |
+----------+-----------------------+
| 1        | 01                    |
+----------+-----------------------+
| 2        | 10                    |
+----------+-----------------------+
| 3        | 11                    |
+----------+-----------------------+

Es fácil calcular lo que vale cada valor representado en un conjunto de
``n`` bits, siendo :math:`b_0` el valor del bit más a la derecha y
:math:`b_{n-1}` el valor del bit más a la izquierda.

$ v = :raw-latex:`\sum`:raw-latex:`\limits`\_{i=0}^{n-1} b\_i
:raw-latex:`\cdot `2^i $

Puede apreciarse que ésto es completamente análogo al valor de un número
cualquiera a partir de sus dígitos decimales :math:`d_i`:

$ v = :raw-latex:`\sum`:raw-latex:`\limits`\_{i=0}^{n-1} d\_i
:raw-latex:`\cdot `10^i $

Es decir, que la codificación binaria no es más que otra posible
representación del mismo número, pero que utiliza la base 2 en lugar de
la base 10. Cada cifra puede vales 0 o 1, en lugar de 0 a 9.

En ambos casos se trata de un sistema de representación posicional, y
cuando hay duda suele representarse poniendo la base como sufijo:

$ 1011\_2 = 11\_{10} $

Por ejemplo:

+----------+------------------------+
| Número   | En binario (8 bits)    |
+==========+========================+
| 0        | 00000000\ :math:`_2`   |
+----------+------------------------+
| 1        | 00000001\ :math:`_2`   |
+----------+------------------------+
| 120      | 01111000\ :math:`_2`   |
+----------+------------------------+
| 215      | 11010111\ :math:`_2`   |
+----------+------------------------+

Las propiedades de un número binario son análogas a la de un número
decimal, pero usando la base 2 en lugar de la 10. Por ejemplo, dividir
por 2 equivale a quitar el dígito binario menos significativo,
multiplicar por 2 equivale a añadir un cero a la derecha.

Conversiones de base
--------------------

Pasar de un número binario a su valor decimal se puede hacer
directamente con la fórmula mencionada anteriormente:

$ v = :raw-latex:`\sum`:raw-latex:`\limits`\_{i=0}^{n-1} b\_i
:raw-latex:`\cdot `2^i $

Cada dígito tiene un *peso* de :math:`2^i` y simplemente hay que sumar
los pesos de los dígitos que son 1. El peso del bit más a la derecha
(bit menos significativo) es 1, el que está inmediatemente a la
izquierda de éste es 2, el siguiente 4, el siguiente 8, etc. Por ejemplo
:math:`0101_2` sería :math:`1 + 4 = 5`. Sumamos los pesos del bit 0 o
bit menos significativo y el bit 2.

Pasar de un número decimal a su correspondiente representación binaria
se puede hacer dividiendo sucesivamente por 2 y tomando los restos en
orden inverso. Por ejemplo:

+-------+------+
| 120   | 2    |
+=======+======+
| 0     | 60   |
+-------+------+

+------+------+
| 60   | 2    |
+======+======+
| 0    | 30   |
+------+------+

+------+------+
| 30   | 2    |
+======+======+
| 0    | 15   |
+------+------+

+------+-----+
| 15   | 2   |
+======+=====+
| 1    | 7   |
+------+-----+

+-----+-----+
| 7   | 2   |
+=====+=====+
| 1   | 3   |
+-----+-----+

+-----+-----+
| 3   | 2   |
+=====+=====+
| 1   | 1   |
+-----+-----+

+-----+-----+
| 1   | 2   |
+=====+=====+
| 1   | 0   |
+-----+-----+

Y tomando los restos en orden inverso obtenemos :math:`1111000_2`.

Números con signo
-----------------

Recuerda que la memoria de un ordenador solo puede guardar 0 o 1 en cada
una de sus celdas elementales (bits). Entonces ¿cómo almacenamos el
signo de los números negativos? Está claro que tenemos que guardarlo
como un 0 o como un 1. Hay varias formas de hacerlo, veamos las más
frecuentes.

Signo-magnitud
~~~~~~~~~~~~~~

La forma más simple es reservar un bit (el más significativo
normalmente) para representar el signo. Si ese bit vale 0 el número es
positivo, si vale 1 el número es negativo. Y la magnitud corresponde al
resto de los bits, de la misma forma que vimos antes. Ésta es la forma
en la que se representan los números reales en la mayoría de los
ordenadores modernos.

+----------+---------------------------+
| Número   | Signo-magnitud (8 bits)   |
+==========+===========================+
| 0        | 00000000\ :math:`_2`      |
+----------+---------------------------+
| -1       | 10000001\ :math:`_2`      |
+----------+---------------------------+
| -15      | 10001111\ :math:`_2`      |
+----------+---------------------------+
| 120      | 01111000\ :math:`_2`      |
+----------+---------------------------+

Complemento a 1
~~~~~~~~~~~~~~~

La representación en complemento a 1 también tiene un bit más que
almacena el signo y también en este caso es 0 para los positivos y 1
para los negativos. Sin embargo en este caso la magnitud de los números
negativos se representan como el resultado de invertir todos los bits
del valor positivo. Esta representación no suele emplearse en los
ordenadores modernos, pero es esencial para entender la siguiente

+----------+----------------------------+
| Número   | Complemento a 1 (8 bits)   |
+==========+============================+
| 0        | 00000000\ :math:`_2`       |
+----------+----------------------------+
| -1       | 11111110\ :math:`_2`       |
+----------+----------------------------+
| -15      | 11110000\ :math:`_2`       |
+----------+----------------------------+
| 120      | 01111000\ :math:`_2`       |
+----------+----------------------------+

Complemento a 2
~~~~~~~~~~~~~~~

El problema de las representaciones anteriores es que el 0 tiene dos
representaciones válidas (una con signo positivo y otra con signo
negativo). Ésto es una anomalía que dificulta las operaciones. En la
representación en complemento a 2 se utiliza una codificación que solo
tiene una representación válida del 0 (con signo positivo), y por tanto
puede representar un número negativo más.

Los números positivos se representan como en los dos casos anteriores,
con un bit adicional (el más significativo) que sirve para almacenar el
signo (0 para los positivos, 1 para los negativos). Sin embargo los
negativos se representan como el resultado de hacer su complemento a 1 y
posteriormente sumar 1 al resultado.

+----------+----------------------------+
| Número   | Complemento a 1 (8 bits)   |
+==========+============================+
| 0        | 00000000\ :math:`_2`       |
+----------+----------------------------+
| -1       | 11111111\ :math:`_2`       |
+----------+----------------------------+
| -15      | 11110001\ :math:`_2`       |
+----------+----------------------------+
| 120      | 01111000\ :math:`_2`       |
+----------+----------------------------+

Lo interesante de esta representación es que la suma de números con
signo no tiene que tener en cuenta nada especial. El resultado es
directamente el que resulta del algoritmo normal que hacemos con lápiz y
papel, solo que usando base 2 en lugar de base 10. Fíjate bien en la
representación del -1, es la que corresponde al -0 en complemento a 1,
todos los bits a 1.

También se puede expresar con una fórmula matemática sencilla. Para un
número de *n* bits:

$ v = -b\_{n-1}:raw-latex:`\cdot `2^{n-1} +
:raw-latex:`\sum`:raw-latex:`\limits`\_{i=0}\ :sup:`{n-2}b\_i:raw-latex:`\cdot `2`\ i$

Es decir, el valor es el mismo que en el caso de los números binarios
sin signo pero teniendo en cuenta que el peso del bit de signo es
negativo.

Esta representación es la que utilizan todos los ordenadores modernos
para representar los enteros con signo. Los enteros de Python se
representan en complemento a 2.

Operadores de bits
------------------

Para manipular bits de forma independiente en Python se utilizan una
serie de operadores que realizan operaciones lógicas bit a bit. Se
realiza la operación lógica con el bit 0 de ambos argumentos y su
resultado se representa en el bit 0 del resultado, en paralelo se
realiza la misma operación con el bit 1 de ambos argumentos y su
resultado se representa en el bit 1 del resultado, etc.

Además existe un par de operadores que permiten multiplicar o dividir
por 2 desplazando un bit a la derecha o a la izquierda, igual que
haríamos para multiplicar o dividir por 10 en un número expresado en
decimal.

+------------+------------------------+------------------------------+
| Operador   | Función                | Ejemplo                      |
+============+========================+==============================+
| ``&``      | AND de bits            | ``37 & 7 == 5``              |
+------------+------------------------+------------------------------+
| \|         | OR de bits             | ``37`` \| ``7 == 7``         |
+------------+------------------------+------------------------------+
| ``^``      | XOR de bits            | ``37 ^ 7 == 34``             |
+------------+------------------------+------------------------------+
| ``~``      | NOT de bits            | ``~0 == -1``                 |
+------------+------------------------+------------------------------+
| ``<<``     | desplazamiento izda.   | ``13 << 4 == 13 * 2**4``     |
+------------+------------------------+------------------------------+
| ``>>``     | desplazamiento dcha.   | ``121 >> 3 == 121 / 2**3``   |
+------------+------------------------+------------------------------+

Es muy habitual que el programador primerizo no sepa cuándo debe emplear
cada uno de estos operadores. Para intentar paliar el problema vamos a
dar algunos consejos generales.

Los operadores lógicos de bits (``&``, ``|`` y ``^``) pueden entenderse
como funciones que alteran un valor (el primer parámetro) de acuerdo a
un parámetro de ajuste (el segundo parámetro).

Así el operador ``&`` (se lee *AND*) sirve para poner ceros, el operador
``|`` (se lee *OR*) sirve para poner unos, y el operador ``^`` (se lee
XOR) sirve para invertir bits. El operador ``~`` (se lee *NOT*) es un
caso especial del operador ``^`` en el que se invierten todos los bits
(``~0`` es un valor con todo unos, y ``~x`` equivale a ``x ^ ~0``).
Veamos algunos ejemplos.

Supongamos que tenemos una variable ``v`` con un valor arbitrario.

.. code:: python

    v = 85

En ocasiones tendremos necesidad de quedarnos solo con algunos bits y
poner el resto a cero. Por ejemplo, supongamos que queremos quedarnos
con los 4 bits menos significativos. En ese caso tendremos que *poner
ceros* en el resto de los bits de ``v``, es decir, tenemos que usar un
``&`` con un valor que tenga a cero todos los bits que queramos poner a
cero y a uno todos los bits que queramos mantener como estaban. En
nuestro caso:

.. code:: python

    print(v & 0b1111)


.. parsed-literal::

    5


Nótese que para escribir un número en binario en Python se utiliza el
prefijo ``0b``. También podemos imprimir su representación binaria
usando la función ``bin``.

.. code:: python

    print(bin(v), bin(v & 0b1111))


.. parsed-literal::

    0b1010101 0b101


Supongamos ahora que queremos poner a uno los tres bits menos
significativos, independientemente del valor que tenga ``v`` en un caso
concreto. Para *poner unos* se utiliza el operador ``|`` con un valor
que tenga a uno todos los bits que queremos dejar a uno, y a cero todos
los bits que no queremos que cambien.

.. code:: python

    print(bin(v), bin(v | 0b111))


.. parsed-literal::

    0b1010101 0b1010111


Supongamos ahora que queremos invertir los bits 3 a 6, ambos incluidos.
Para invertir bits se utiliza el operador ``^`` con un valor que tenga a
uno todos los bits que se desean invertir, y a cero los que no se
quieren tocar.

.. code:: python

    print(bin(v), bin(v ^ 0b1111000))


.. parsed-literal::

    0b1010101 0b101101


Las operaciones de desplazamiento también merecen la pena detenerse un
poco. El desplazamiento a la izquierda es añadir ceros a la derecha en
la representación binaria. Es decir, equivale a multiplicar por 2 tantas
veces como diga el segundo argumento.

.. code:: python

    print(bin(v), bin(v << 3))


.. parsed-literal::

    0b1010101 0b1010101000


El desplazamiento a la derecha es más interesante. Como cabe esperar
hace la operación complementaria al desplazamiento a la izquierda. Es
decir, divide por 2 tantas veces como diga el segundo argumento. En
números positivos es equivalente a eliminar los bits menos
significativos y rellenar con ceros a la izquierda.

.. code:: python

    print(bin(v), bin(v >> 3))


.. parsed-literal::

    0b1010101 0b1010


Con números negativos en complemento a 2 la división por 2 funciona de
forma similar, con la única salvedad de que en lugar de introducir un
cero a la izquierda habría que introducir un 1 para mantener el signo
del número. Prueba con algún ejemplo para comprobarlo.

Lo interesante de ésto es que puede generalizarse, la operación de
desplazamiento a la derecha consiste en eliminar los bits menos
significativos y reemplazarlos por el valor del bit de signo en la
izquierda. Sin embargo si lo intentamos imprimir directamente no
encontraremos la solución esperada.

.. code:: python

    v = -52
    print(bin(v), bin(v >> 3))


.. parsed-literal::

    -0b110100 -0b111


El tamaño de los enteros en Python no es fijo, por lo que el bit de
signo se trata de forma especial. Sin embargo en complemento a 2 el bit
de signo se repite en todos los bits más significativos mientras el
resto del número quepa en los restantes bits. Por tanto podemos obtener
la representación seleccionando exclusivamente una cantidad razonable de
bits menos significativos. Por ejemplo, los 32 bits menos
significativos. Para seleccionar estos bits tenemos que poner ceros en
los restantes bits. Para poner ceros se usa un *AND* con un valor que
corresponda a 32 unos. Los 32 unos pueden obtenerse como ``2**32 - 1`` o
como ``(1<<32) - 1``.

.. code:: python

    v = -52
    unos = 2**32 - 1
    print(bin(unos))
    print(bin(v & unos), bin((v >> 3) & unos))


.. parsed-literal::

    0b11111111111111111111111111111111
    0b11111111111111111111111111001100 0b11111111111111111111111111111001


Seleccionar bits de un número
-----------------------------

Un ejercicio interesante es el siguiente. Hacer una función ``getbits``
que extrae un rango de bits de un valor que se pasa como argumento.

.. code:: python

    def getbits(x, primero, n):
        '''Asume x, primero, n enteros, primero >= n - 1
           Devuelve n bits de x a partir de la posición primero'''
        return (x >> (primero + 1 - n)) & ~(~0 << n)
    
    print(bin(getbits(v, 6, 3)))


.. parsed-literal::

    0b100


Para ver cómo funciona nada mejor que un ejemplo. Veamos qué pasaría si
queremos 9 bits a partir del bit 18 del número ``x``.

+---------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
| 31      | 30   | 29   | 28   | 27   | 26   | 25   | 24   | 23   | 22   | 21   | 20   | 19   | 18   | 17   | 16   | 15   | 14   | 13   | 12   | 11   | 10   | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
+=========+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
| **s**   |      |      |      |      |      |      |      |      |      |      |      |      | b    | b    | b    | b    | b    | b    | b    | b    | b    |     |     |     |     |     |     |     |     |     |     |
+---------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+

El valor de ``primero`` sería 18, y el valor de ``n`` sería 9. El valor
de ``x`` es irrelevante para entender la función.

Lo primero que tenemos que hacer es desplazar ``x`` a la derecha de
manera que los bits que queremos se queden en los bits más bajos. Es
fácil comprobar que el número de bits a desplazar es
``primero - n + 1``.

+------+------+------+------+------+------+------+------+------+---------+------+------+------+------+------+------+------+------+------+------+------+------+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
| 31   | 30   | 29   | 28   | 27   | 26   | 25   | 24   | 23   | 22      | 21   | 20   | 19   | 18   | 17   | 16   | 15   | 14   | 13   | 12   | 11   | 10   | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
+======+======+======+======+======+======+======+======+======+=========+======+======+======+======+======+======+======+======+======+======+======+======+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
| s    | s    | s    | s    | s    | s    | s    | s    | s    | **s**   |      |      |      |      |      |      |      |      |      |      |      |      |     | b   | b   | b   | b   | b   | b   | b   | b   | b   |
+------+------+------+------+------+------+------+------+------+---------+------+------+------+------+------+------+------+------+------+------+------+------+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+

A continuación hay que seleccionar los ``n`` bits más bajos. Es decir,
hay que poner a cero todos los bits del resultado que no sean los ``n``
más bajos. Para poner ceros hay que usar el operador ``&`` con un valor
que tiene ``n`` unos en los ``n`` bits más bajos (que son los que
queremos conservar) y a cero todos los demás.

Hacer un número con ``n`` en una expresión simple no es inmediato. Lo
más fácil es hacer un número con ``n`` ceros en los bits menos
significativos y unos en el resto. Eso es tan simple como ``~0 << n``.
Ese número es justo el contrario al que queremos, así que solo tenemos
que negarlo otra vez: ``~(~0 << n)``. Ese es el número con el que
tenemos que hacer el *and* bit a bit.

+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
| 31   | 30   | 29   | 28   | 27   | 26   | 25   | 24   | 23   | 22   | 21   | 20   | 19   | 18   | 17   | 16   | 15   | 14   | 13   | 12   | 11   | 10   | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+======+=====+=====+=====+=====+=====+=====+=====+=====+=====+=====+
| 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0   | b   | b   | b   | b   | b   | b   | b   | b   | b   |
+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+------+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+
