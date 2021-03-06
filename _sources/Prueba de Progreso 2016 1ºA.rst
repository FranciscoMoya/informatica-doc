
Distancia Minkowski
===================

*La distancia Minkowski es una generalización de las distancias Manhatan
y Euclídea, que viene dada por la siguiente fórmula.*

.. math::


   \left(\sum_{i=1}^{n} \left|x_i - y_i\right|^p \right)^{1/p}

*En este ejercicio debes definir una función ``distancia_minkowski`` que
admita tres argumentos. Los dos primeros argumentos son dos listas (o
tuplas) de números de igual longitud. El último es el parámetro p que es
un real comprendido entre 1 y 2 y debe tomar como valor por defecto 2.
La función debe calcular la distancia Minkowski entre los dos primeros
argumentos usando el parámetro p del tercer argumento.*

Ejemplo de funcionamiento:
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    >>> distancia_minkowski([1,2,3], [0,2, 4], p=1.5)
    1.5874010519681994

Solución
~~~~~~~~

Este ejercicio es simple escritura en Python de la fórmula.

.. code:: python

    def distancia_minkowski(x,y,p=2):
        return sum(abs(xi-yi)**p for xi,yi in zip(x,y))**(1/p)

Vamos a probarlo con el ejemplo del enunciado.

.. code:: python

    distancia_minkowski([1,2,3], [0,2, 4], p=1.5)

Distancia a una agrupación
==========================

*Uno de los métodos computacionales más importantes en la actualidad es
el clustering o agrupamiento de una colección de puntos de un espacio
n-dimensional. El objetivo es clasificar los puntos en un conjunto de
agrupamientos (o clusters) que contienen los puntos que más se parecen
entre sí.*

*Los algoritmos de clustering deben comparar la distancia entre los
puntos y los agrupamientos que se van generando. ¿Cómo podemos medir la
distancia de un punto a un agrupamiento? No hay una respuesta universal,
suele emplearse la distancia más pequeña entre el punto y cualquiera de
los puntos del agrupamiento, o la mayor distancia, o la distancia media
a todos los puntos del agrupamiento.*

*En este ejercicio debes definir una función distancia\_cluster(punto,
grupo) que tiene dos argumentos. El primero es un punto en un espacio
n-dimensional (lista o tupla de valores numéricos), el segundo es un
grupo de puntos (lista de puntos). La función debe devolver una tupla
con tres valores: la distancia mínima del punto a todos los elementos
del grupo, la distancia máxima, y la distancia media (en este orden).*

*Para medir la distancia entre dos puntos se usará la distancia euclídea
(distancia Minkowski para p=2, es decir, la raiz cuadrada de la suma de
las diferencias de las coordenadas al cuadrado).*

Ejemplo de funcionamiento:
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    >>> distancia_cluster((1,2,3), [(1,0,0), (1,1,0), (1,2,0), (2,1,0)])
    (3.0, 3.605551275463989, 3.2711134314969423)

Solución
~~~~~~~~

Este ejercicio es simple aplicación de las fórmulas más elementales.
Primero calculamos la distancia del punto a cada uno de los puntos del
agrupamiento. Luego obtenemos el mínimo, máximo y media.

.. code:: python

    def distancia_cluster(x, g):
        d = tuple(distancia_minkowski(x,y) for y in g)
        return min(d), max(d), sum(d)/len(d)

Y lo probamos con el ejemplo del enunciado.

.. code:: python

    distancia_cluster((1,2,3), [(1,0,0), (1,1,0), (1,2,0), (2,1,0)])

Centroide de un agrupamiento
============================

*En muchas ocasiones es más sencillo determinar una localización del
agrupamiento en lugar de trabajar con las localizaciones de cada uno de
los puntos.*

*Para ello suele utilizarse el concepto de centroide que es aquel punto
cuyas coordenadas son la media de las coordenadas homólogas en todos los
puntos del agrupamiento.*

*Por ejemplo, para el agrupamiento de puntos del plano
``[(1,0), (0,1), (1,2)]`` el centroide estará en
``( (1+0+1)/3, (0+1+2)/3 ) = (0.6666, 1)``.*

*Define una función centroide con un único argumento que es una lista de
puntos de un espacio n-dimensional. La función debe devolver el
centroide de dicha lista.*

Ejemplo de funcionamiento:
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    >>> centroide([(1,0,0), (1,1,0), (1,2,0), (2,1,0)])
    (1.25, 1.0, 0.0)

Solución
~~~~~~~~

Nuevamente se trata de aplicar la fórmula de la media a cada coordenada.

.. code:: python

    def centroide(g):
        N = len(g)
        return tuple(sum(x[i] for x in g)/N for i in range(len(g[0])))

Y lo probamos.

.. code:: python

    centroide([(1,0,0), (1,1,0), (1,2,0), (2,1,0)])

Cuadrado mágico
===============

*En una cuadrícula de 3 casillas de ancho por 3 casillas de alto se
disponen las cifras de 1 a 9. Se dice que es un cuadrado mágico cuando
la suma de todas las filas, todas las columnas y todas las diagonales
tiene el mismo valor numérico. Por ejemplo:*

+---------+---------+---------+
| **8**   | **1**   | **6**   |
+=========+=========+=========+
| **3**   | **5**   | **7**   |
+---------+---------+---------+
| **4**   | **9**   | **2**   |
+---------+---------+---------+

*Escribe una función ``cuadrado_magico`` sin argumentos que busca una
solución a este problema. Debe devolver la lista de las nueve cifras en
orden desde la casilla superior izquierda hasta la casilla inferior
derecha.*

Ejemplo de funcionamiento:
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: python

    >>> cuadrado_magico()
    (2, 7, 6, 9, 5, 1, 4, 3, 8)

Solución
~~~~~~~~

Este ejercicio sería un problema si no fuera porque en el examen se
permite todo tipo de apuntes y ejercicios de clase. El ejercicio
consiste en determinar una permutación de los números del 1 al 9 que
cumple una serie de restricciones. Eso es prácticamente el mismo
problema que el `Problema de las ocho
damas <Problema%20de%20las%208%20damas.ipynb>`__. Como vimos era
perfectamente posible resolverlo por fuerza bruta, por lo que la
solución es exactamente la misma.

.. code:: python

    from itertools import permutations
    
    def triangulo_numerico():
        for p in permutations(range(1,10)):
            if es_solucion(p):
                return p
        return ValueError('No hay solución')

Lo único que cambia es cómo se determina si es solución. Simplemente
calculamos la suma de la diagonal principal y comprobamos que coincide
con las filas, las columnas y la diagonal secundaria.

.. code:: python

    def es_solucion(l):
        S = sum(l[::4])
        return  all(S==sum(l[i:i+3]) for i in (0,3,6)) \
            and all(S==sum(l[i::3]) for i in (0,1,2)) \
            and S == sum(l[2:8:2])

Solo queda probarlo.

.. code:: python

    triangulo_numerico()

