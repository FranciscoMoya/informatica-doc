
Trabajo en grupo (curso 2016-2017)
==================================

En este curso el trabajo en grupo consistirá simplemente en el
desarrollo en Python del método de Gauss-Jordan. Se proponen varios
ejercicios relacionados con esto.

1. Rango de una matriz
----------------------

Definir la función ``rango_matriz(m)`` que devuelve el rango de una
matriz calculado por el `método de
Gauss <http://matematicasies.com/Rango-de-una-matriz-por-el-metodo-de-Gauss>`__.

Deberá funcionar con cualquier número de filas y columnas. No se dará
puntuación alguna a las entregas que no respeten este requisito.

Ejemplo de funcionamiento
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    >>> rango_matriz([[1,0,0], [0,1,0], [0,0,1]])
    3
    >>> rango_matriz([[1,0,0], [0,1,0], [1,2,0]])
    2

2. Solución de sistema de ecuaciones
------------------------------------

Definir una función ``lin_solve(A,B)`` que resuelve el sistema lineal de
ecuaciones :math:`A\cdot x = B` empleando el método de Gauss-Jordan. La
función debe devolver la secuencia de operaciones a realizar sobre
``A|B``, y el vector solución.

Ejemplo de funcionamiento
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    >>> lin_solve([[1,0,0], [0,2,0], [2,0,3]], [1, 0, 2])
    ([('div', 1, 2), ('mac', 2, 1, -2), ('div', 2, 3)], [1, 0, 0])

Hemos representado las operaciones por una tupla, que incluye una cadena
(``'div'`` para dividir, ``'mac'`` para multiplicar y sumar, etc.)
seguida de los argumentos necesarios (fila donde se aplica, fila con la
que se opera, factor de multiplicación, etc.). Tu puedes representar las
operaciones de forma diferente. Por ejemplo, se recomiendan clases.

3. Inversa de una matriz
------------------------

Definir la función ``inv_matriz(M)`` que devuelve la matriz inversa de
la que se pasa como argumento.

Ejemplo de funcionamiento
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    >>> inv_matriz([[1,0,0], [0,4,0], [0,0,10]])
    [[1,0,0], [0,0.25,0], [0,0,0.1]]

