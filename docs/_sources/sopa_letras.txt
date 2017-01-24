
Sopa de letras
--------------

En este ejemplo resolveremos el ejercicio
`639 <http://www.solveet.com/exercises/sopa-de-letras/639>`__ de
*Solveet!* donde se propone generar una sopa de letras con una serie de
palabras. El enunciado habla de cinco, pero no veo diferencia en que
sean más o menos.

Empecemos por definir el tamaño de la sopa de letras. En principio
empezaremos por lo más sencillo, un tamaño fijo de 8x8.

.. code:: python

    ANCHO = 8

El ejercicio consistirá entonces en fabricar una sopa de letras
aleatoria y luego colocar las palabras en posiciones y orientaciones
aleatorias. Modelaremos la sopa como una lista de listas de letras y
otra lista de listas indicando cuáles de las letras están fijadas
(pertenecen a las palabras que hay que colocar).

.. code:: python

    def sopa_letras(palabras):
        sopa = sopa_aleatoria()
        fijas = [ [False]*ANCHO ]*ANCHO
        for p in palabras:
            poner_palabra(p, sopa, fijas)
        return sopa
    
    from string import ascii_uppercase as letras
    from random import randrange, choice
    
    def sopa_aleatoria():
        return [ fila_aleatoria() for y in range(ANCHO) ]
    
    def fila_aleatoria():
        return [ choice(letras) for x in range(ANCHO) ]

Al poner una palabra de forma aleatoria es posible que no lo consiga. En
ese caso debe intentarlo una y otra vez hasta que pueda ponerla.

.. code:: python

    def poner_palabra(palabra, sopa, fijas):
        while not intenta_poner(palabra, sopa, fijas):
            pass

En primer lugar tiene que elegir de forma aleatoria la orientación y la
posición. La orientación marca también el rango de posiciones posibles.
Modelamos la orientación como una tupla *(ix,iy)* con el movimiento en X
y en Y necesario para poner la siguiente letra de la palabra. Así
*(-1,0)* significa que cada letra se pone en una posición anterior en X.
Es decir, ese caso corresponde a poner la palabra horizontal en sentido
contrario al de escritura.

La parte más difícil es determinar el rango de valores permitidos de X y
de Y. Razonemos el caso de X y por analogía se aplica lo mismo en Y. En
el caso de un incremento negativo en X (``ix = -1``) el límite inferior
sería el ancho de la palabra menos uno, pero en los otros casos el
límite será 0. Por eso usamos *min*. Algo análogo ocurre en el otro
extremo, en el caso de incremento positivo el límite es ``ANCHO`` menos
el ancho de la palabra, pero en los demás casos será ``ANCHO``, por eso
utilizamos nuevamente la función *min*.

.. code:: python

    def intenta_poner(palabra, sopa, fijas):
        pos = posicion_aleatoria(len(palabra))
        if puedo_poner(palabra, pos, sopa, fijas):
            escribir_palabra(palabra, pos, sopa, fijas)
            return True
        return False

Elegir una posición para la palabra implica elegir primero una
orientación y luego la posición a partir de la cual se empieza a
escribir.

.. code:: python

    def posicion_aleatoria(w):
        ix, iy = choice([(0,1), (1,0), (0,-1), (-1,0), 
                         (1,1), (1,-1), (-1,1), (-1,-1) ])
        x, y = randrange(max(0, -w*ix-1), min(ANCHO, ANCHO - w*ix + 1)), \
               randrange(max(0, -w*iy-1), min(ANCHO, ANCHO - w*iy + 1))
        return x,y,ix,iy

Para saber si se puede poner una palabra hay que comprobar si alguna de
las letras cae sobre una letra fija y no coincide con la que queremos
poner.

.. code:: python

    def puedo_poner(palabra, pos, sopa, fijas):
        x,y,ix,iy = pos
        for letra in palabra:
            if sopa[y][x] != letra and fijas[y][x]:
                return False
            x, y = x + ix, y + iy
        return True

Escribir la palabra exige actualizar el modelo, tanto la ``sopa`` como
el estado de fijación de las letras (``fijas``).

.. code:: python

    def escribir_palabra(palabra, pos, sopa, fijas):
        x,y,ix,iy = pos
        print (palabra, pos)
        for letra in palabra:
            sopa[y][x] = letra
            fijas[y][x] = True
            x, y = x + ix, y + iy

Con esto es suficiente para encontrar la sopa de letras.

.. code:: python

    sopa_letras(['HOLA', 'OSTRA', 'CASO', 'POSO', 'PESO'])


.. parsed-literal::

    HOLA (6, 4, -1, -1)
    OSTRA (2, 7, 0, -1)
    CASO (7, 4, 0, -1)
    POSO (0, 3, 0, -1)
    PESO (1, 1, 0, 1)




.. parsed-literal::

    [['O', 'U', 'W', 'U', 'Q', 'H', 'Y', 'C'],
     ['S', 'P', 'L', 'A', 'F', 'J', 'G', 'O'],
     ['O', 'E', 'P', 'C', 'L', 'V', 'L', 'S'],
     ['P', 'S', 'A', 'E', 'W', 'O', 'T', 'A'],
     ['Z', 'O', 'R', 'A', 'Q', 'X', 'H', 'C'],
     ['J', 'A', 'T', 'V', 'E', 'B', 'P', 'D'],
     ['A', 'H', 'S', 'M', 'Y', 'U', 'U', 'W'],
     ['R', 'J', 'O', 'C', 'D', 'M', 'O', 'D']]



Conviene de todas formas que nos paremos a pensar un poco en el
algoritmo utilizado. Funciona, pero cada palabra será más difícil de
colocar que la anterior, porque tendrá más letras fijas. Es
relativamente fácil encontrar casos en los que no acaba de encontrar una
solución. En esos casos es posible parar el intérprete y volver a
ejecutar el programa, con la esperanza de que esta vez las palabras
caigan en una posición más sencilla.

En realidad esto se puede hacer directamente en nuestro programa.
Probamos un número de veces limitado y si no lo conseguimos probamos
otra vez con otras posiciones aleatorias.

.. code:: python

    def poner_palabra(palabra, sopa, fijas):
        for i in range(100):
            if intenta_poner(palabra, sopa, fijas):
                return
        raise ValueError('Demasiado difícil')

Ahora podemos detectar este caso anómalo y reintentar desde el principio
en caso de que no encontremos solución.

.. code:: python

    def sopa_letras(palabras):
        while True:
            try: return intentar_sopa_letras(palabras)
            except: pass
    
    def intentar_sopa_letras(palabras):
        sopa = sopa_aleatoria()
        fijas = [ [False]*ANCHO ]*ANCHO
        for p in palabras:
            poner_palabra(p, sopa, fijas)
        return sopa

.. code:: python

    sopa_letras(['CARACOLA', 'HOLA', 'OSTRA', 'CASO', 'POSO', 'PESO'])


.. parsed-literal::

    CARACOLA (1, 7, 0, -1)
    HOLA (4, 1, 1, 0)
    OSTRA (2, 7, 0, -1)
    CASO (3, 5, 0, -1)
    POSO (0, 6, 0, -1)
    CARACOLA (0, 7, 1, -1)
    CARACOLA (0, 7, 1, -1)
    CARACOLA (0, 0, 1, 1)
    CARACOLA (0, 0, 0, 1)
    HOLA (5, 5, -1, 0)
    OSTRA (7, 1, 0, 1)
    CASO (1, 6, 0, -1)
    POSO (6, 2, 0, 1)
    CARACOLA (7, 0, 0, 1)
    HOLA (6, 1, -1, 0)
    OSTRA (1, 4, 0, -1)
    CASO (2, 2, 0, 1)
    POSO (0, 1, 0, 1)
    CARACOLA (6, 0, 0, 1)
    HOLA (3, 0, -1, 0)
    OSTRA (7, 0, 0, 1)
    CASO (5, 4, 0, 1)
    POSO (4, 6, 0, -1)
    CARACOLA (5, 7, 0, -1)
    HOLA (0, 2, 0, 1)
    OSTRA (0, 3, 1, 1)
    CASO (6, 6, 0, -1)
    POSO (7, 5, 0, -1)
    CARACOLA (7, 7, -1, -1)
    CARACOLA (0, 3, 1, 0)
    CARACOLA (0, 7, 1, -1)
    CARACOLA (7, 7, -1, -1)
    CARACOLA (0, 0, 1, 1)
    CARACOLA (4, 7, 0, -1)
    HOLA (6, 3, 0, -1)
    OSTRA (2, 3, 0, 1)
    CASO (3, 4, 0, 1)
    POSO (0, 3, 0, -1)
    PESO (1, 5, 0, -1)




.. parsed-literal::

    [['O', 'C', 'N', 'W', 'A', 'S', 'A', 'Z'],
     ['S', 'L', 'I', 'U', 'L', 'W', 'L', 'V'],
     ['O', 'O', 'X', 'M', 'O', 'C', 'O', 'R'],
     ['P', 'S', 'O', 'T', 'C', 'P', 'H', 'Y'],
     ['J', 'E', 'S', 'C', 'A', 'E', 'P', 'F'],
     ['P', 'P', 'T', 'A', 'R', 'G', 'N', 'S'],
     ['A', 'V', 'R', 'S', 'A', 'M', 'S', 'Q'],
     ['B', 'Z', 'A', 'O', 'C', 'J', 'S', 'U']]


