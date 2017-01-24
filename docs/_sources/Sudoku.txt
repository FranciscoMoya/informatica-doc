
Sudoku
======

Sudoku es un rompecabezas matemático. Consiste en rellenar una
cuadrícula de 9x9 con cifras de 1 a 9. Algunas de las casillas están
previamente rellenas y una vez completado debe cumplir que:

-  Cada fila debe contener todas las cifras del 1 al 9.
-  Cada columna debe contener todas las cifras del 1 al 9.
-  Cada bloque debe contener todas las cifras del 1 al 9. Se llama
   bloque a cualquiera de los 9 subcuadros de 3x3 que contiene el
   tablero (ver figura):

.. figure:: https://upload.wikimedia.org/wikipedia/commons/1/13/Sudoku-by-L2G-20050714.gif
   :alt: Ejemplo de Sudoku

   Ejemplo de Sudoku

Un Sudoku bien construido solo debe tener una solución correcta. Es
decir, los números que se rellenan incialmente tienen que ser
suficientes para eliminar toda posible ambigüedad.

Comprobar Sudoku
----------------

El problema a resolver consiste en comprobar si una solución propuesta a
un Sudoku determinado es correcta o no.

Por tanto se limita a realizar las comprobaciones correspondientes a las
tres propiedades de un Sudoku correcto.

.. code:: python

    def comprobar_sudoku(s):
        return comprobar_filas(s) \
           and comprobar_columnas(s) \
           and comprobar_bloques(s)

El Sudoku lo modelaremos con una lista de 9 listas, una por cada fila.
Cada lista correspondiente a una fila contiene 9 números.

.. code:: python

    def comprobar_filas(s):
        for fila in s:
            if not comprobar_lista(fila):
                return False
        return True

Comprobar una fila es contar el número de ocurrencias de cada dígito. Si
no es exactamente 1 es que es incorrecto.

.. code:: python

    def comprobar_lista(s):
        c = [0] * 9
        for i in s:
            c[i - 1] += 1
        return max(c) == 1 and min(c) == 1

Otra forma es pasarlo a una forma canónica y comparar. Cuidado con las
listas, que son mutables. Haz copias antes de modificarla. Por ejemplo,
la función ``sorted`` devuelve una nueva copia de la lista ordenada, lo
que permite compararla muy facilmente.

.. code:: python

    def comprobar_lista(s):
        return sorted(s) == range(1,10)

Comprobar cada columna puede reducirse al subproblema anterior si
construimos una lista con los elementos de cada columna.

.. code:: python

    def comprobar_columnas(s):
        for col in columnas(s):
            if not comprobar_lista(col):
                return False
        return True

Las columnas pueden devolverse con un generador.

.. code:: python

    def columnas(s):
        for i in range(9):
            yield [x[i] for x in s]

O bien si no te resultan cómodos los generadores puedes devolver una
lista.

.. code:: python

    def columnas(s):
        cols = []
        for i in range(9):
            cols.append([x[i] for x in s])
        return cols

Los bloques son iguales.

.. code:: python

    def comprobar_bloques(s):
        for bloque in bloques(s):
            if not comprobar_lista(bloque):
                return False
        return True

Generar los bloques es un poquito más complejo.

.. code:: python

    def bloques(s):
        for y in (0,3,6):
            for x in (0,3,6):
                yield sum([fila[x:x+3] for fila in s[y:y+3]], [])

Con *list comprehensions* también es posible, ya lo vimos.

.. code:: python

    def bloques(s):
        for y in (0,3,6):
            for x in (0,3,6):
                yield [e for fila in s[y:y+3] for e in fila[x:x+3]]

O si no te gustan los generadores, con listas.

.. code:: python

    def bloques(s):
        blq = []
        for y in (0,3,6):
            for x in (0,3,6):
                blq.append(sum([fila[x:x+3] for fila in s[y:y+3]], []))
        return blq

Ya solo nos queda la lectura del Sudoku. Para ello solo hay que leer
cada una de las líneas.

.. code:: python

    def leer_sudoku():
        s = []
        for i in range(9):
            s.append(leer_linea())
        return s

O con *list comprehensions* un poco más compacto:

.. code:: python

    def leer_sudoku():
        return [ leer_linea() for i in range(9) ]

Cada línea puede leerse como un conjunto de palabras separadas por
espacio y posteriormente construir la lista generando los enteros
correspondientes.

.. code:: python

    def leer_linea():
        s = input().strip().split(' ')
        return [ int(i) for i in s ]

Con todo esto ya podemos construir el programa principal.

.. code:: python

    s = leer_sudoku()
    print(comprobar_sudoku(s))


.. parsed-literal::

    0 1 2 3 4 5 6 7 8 9
    0 1 2 3 4 5 6 7 8 9
    0 1 2 3 4 5 6 7 8 9
    0 1 2 3 4 5 6 7 8 9
    0 1 2 3 4 5 6 7 8 9
    0 1 2 3 4 5 6 7 8 9
    0 1 2 3 4 5 6 7 8 9
    0 1 2 3 4 5 6 7 8 9
    0 1 2 3 4 5 6 7 8 9
    False


