
Bloque 1. Ejercicios sencillos
==============================

Rombo con caracteres ascii
--------------------------

Dada la regularidad del dibujo lo más fácil es definir una función para
imprimir una línea cualquiera y usarla tantas veces como se necesite.

.. code:: python

    def imprimir_rombo(n):
        assert n % 2 == 0, 'El argumento debe ser par'
        assert n >= 2, 'El argumento debe ser mayor o igual a 2'
        for i in range(n/2):
            imprimir_linea_rombo('/', '\\', i, n)
        for i in reversed(range(n/2)):
            imprimir_linea_rombo('\\', '/', i, n)
    
    def imprimir_linea_rombo(a,b,i,n):
        print ' '*(n/2-i-1)+a+' '*(2*i)+b

Vamos a hacer alguna prueba.

.. code:: python

    imprimir_rombo(8)


.. parsed-literal::

       /\
      /  \
     /    \
    /      \
    \      /
     \    /
      \  /
       \/


Suma de fecha y días
--------------------

El cálculo de la nueva fecha es relativamente complicado. Nuestra
estrategia es empezar en el día uno del mes sumando el número del día
menos uno a los días que hay que sumar. Una vez en este punto vamos
sumando los días de cada mes hasta que ya no nos queden suficientes días
que sumar y ese resto se suma al número de día inicial. De esta forma
nos evitamos el problema de tener que corregir una fecha a posteriori.

.. code:: python

    def sumar_dias(fecha, dias):
        dias += fecha[0] - 1
        fecha = (1, fecha[1], fecha[2])
        while dias > 0:
            fecha, dias = sumar_mes(fecha, dias)
        return fecha
    
    def sumar_mes(fecha, dias):
        dm = dias_mes(fecha)
        if dm > dias:
            return (1+dias,fecha[1],fecha[2]), 0
        return siguiente_mes(fecha), dias - dm
    
    def dias_mes(fecha):
        ndias = [[0,31,28,31,30,31,30,31,31,30,31,30,31],
                 [0,31,29,31,30,31,30,31,31,30,31,30,31]]
        return ndias[es_bisiesto(fecha[2])][fecha[1]]
    
    def siguiente_mes(fecha):
        if fecha[1] == 12:
            return (fecha[0], 1, fecha[2]+1)
        return (fecha[0], fecha[1]+1, fecha[2])
    
    def es_bisiesto(y):
        return y % 400 == 0 or (y % 4 == 0 and y % 100 != 0)

Algunas pruebas para verificar que todo funciona como debe.

.. code:: python

    print sumar_dias((21,1,2016), 15)
    print sumar_dias((21,1,2016), 1)
    print sumar_dias((31,1,2016), 1)
    print sumar_dias((31,1,2016), 0)
    print sumar_dias((21,1,2016), 366)


.. parsed-literal::

    (5, 2, 2016)
    (22, 1, 2016)
    (1, 2, 2016)
    (31, 1, 2016)
    (21, 1, 2017)


Regresión lineal
----------------

Este ejercicio es aplicación directa de la fórmula, no tiene nada
especial.

.. code:: python

    def regresion_lineal(puntos):
        xm = media([p[0] for p in puntos])
        ym = media([p[1] for p in puntos])
        xy = 0.
        xx = 0.
        for p in puntos:
            xy += (p[0]-xm)*(p[1]-ym)
            xx += (p[0]-xm)**2
        a = xy/xx
        b = ym - a*xm
        return a,b
    
    def media(l):
        return sum(l)/len(l)

Verificaremos el ejemplo del enunciado y algún otro.

.. code:: python

    print regresion_lineal([(0.,1.),
                            (1.,4.),
                            (-1.,-2.)])
    print regresion_lineal([(1.,1.),
                            (2.,2.),
                            (8.,8.)])
    print regresion_lineal([(1.,1.),
                            (2.,2.),
                            (8.,8.1)])


.. parsed-literal::

    (3.0, 1.0)
    (1.0, 0.0)
    (1.0151162790697674, -0.02209302325581408)


Bloque 2. Ley D'Hont
====================

El algoritmo que se propone en el bloque 2 es muy simple. Basta calcular
la tabla de votos divididos por el número de escaños para cada partido.
Las celdas de esa tabla se ordenan de manera que el que pueda pagar más
por cada escaño vaya primero. Por último basta coger solo tantas celdas
como escaños haya disponibles y contar a quién corresponde cada escaño.

.. code:: python

    def reparto_d_hont(n, votos):
        precios_ordenados = sorted(precios_por_escanno_partido(votos, n),
                                   key = celda_precio,
                                   reverse=True)
        return cuenta_escannos(precios_ordenados[:n])

En esta implementación hemos usado algunas características avanzadas de
la función ``sorted`` pero es simplemente por brevedad. Lo mismo puede
conseguirse con una simple función auxiliar y escribiendo las tuplas en
el orden adecuado para que las comparaciones se produzcan como queremos.

La tabla de precios por escaño y partido, es decir, los votos divididos
por número de escaños, la implementamos como una simple lista de tuplas
con el nombre del partido y el coste del escaño. Esto facilita
enormemente la ordenación.

.. code:: python

    def precios_por_escanno_partido(votos, n):
        precios = []
        for partido in votos:
            precios += precios_por_escanno(partido, n)
        return precios

Donde el precio por escaño que podría pagar cada partido, siguiendo la
ley de oferta y demanda es simplemente el número de votos dividido por
el número de escaños disponibles (que pueden ser entre 1 y ``n``). Es
decir:

.. code:: python

    def precios_por_escanno(partido, n):
        return [ (partido[0], partido[1]/i) for i in range(1,n+1) ]

Contar los escaños es simplemente contar cuántas celdas de cada partido
han quedado. Por comodidad lo hacemos con un diccionario y lo ordenamos
por número decreciente de escaños, como en los resultados electorales
oficiales.

.. code:: python

    def cuenta_escannos(precios):
        escannos = {}
        for p in precios:
            incrementa_cuenta_escannos(escannos, celda_partido(p))
        return sorted([(k, escannos[k]) for k in escannos ],
                      key = celda_precio,
                      reverse = True)

Al utilizar un diccionario inicialmente vacío tenemos que tratar de
forma especial el caso del escaño inicial. También podríamos haber
inicializado el diccionario con todos los partidos y una cuenta inicial
a cero.

.. code:: python

    def incrementa_cuenta_escannos(escannos, partido):
        if partido in escannos:
            escannos[partido] += 1
        else:
            escannos[partido] = 1

Cada celda contiene el nombre del partido y el precio que puede pagar.
Para no llenar el código con índices que son muy propensos a error
utilizamos funciones auxiliares que dada una celda devuelve cada uno de
sus elementos.

.. code:: python

    def celda_precio(celda):
        return celda[1]
    
    def celda_partido(celda):
        return celda[0]

Solo falta probar. Haremos dos casos de prueba, el del enunciado y los
resultados de Madrid de las últimas elecciones generales.

.. code:: python

    print reparto_d_hont(12,
                         [('A', 4000000),
                          ('B', 3500000),
                          ('C', 2000000),
                          ('D', 1500000)])
    
    print reparto_d_hont(36,
                         [('PP', 1203837),
                          ('Podemos', 750477),
                          ('Cs', 676389),
                          ('PSOE', 643158),
                          ('Unidad Popular en Comun', 189237),
                          ('UPyD', 43103),
                          ('PACMA', 28302),
                          ('VOX', 22441),
                          ('X La Izquierda-Los Verdes', 5007),
                          ('FE de las JONS', 4688),
                          ('Recortes Cero-Grupo Verde', 4009),
                          ('PUM+J', 2832),
                          ('PH', 1848),
                          ('PCPE', 1730),
                          ('SAIn', 1229),
                          ('P-LIB', 1053)])


.. parsed-literal::

    [('A', 5), ('B', 4), ('C', 2), ('D', 1)]
    [('PP', 13), ('Podemos', 8), ('Cs', 7), ('PSOE', 6), ('Unidad Popular en Comun', 2)]


Recuperación de prueba de progreso
==================================

Vocales a números
-----------------

Es muy parecido a ``codigo_cesar`` de la práctica 2.

.. code:: python

    def vocales_a_numeros(s):
        return ''.join([letra_transformada(c) for c in s])
    
    def letra_transformada(c):
        vocales = 'aeioAEIO'
        numeros = '43104310'
        if c in vocales:
            return numeros[vocales.index(c)]
        return c

Vamos a probar lo del enunciado.

.. code:: python

    print vocales_a_numeros('Examen')


.. parsed-literal::

    3x4m3n


Iniciales
---------

Simple manipulación de cadenas. Eliminamos todo lo que no sean letras
porque no serían iniciales. Eso no se indica en el enunciado, por lo que
se consideraría válido aunque no se haga.

.. code:: python

    def iniciales(s):
        palabras = normalizar_cadena(s).split(' ')
        return ''.join([p[0] for p in palabras if len(p) > 0])
    
    def normalizar_cadena(s):
        return ''.join([noletra_a_espacio(c) for c in s])
    
    import string
    
    def noletra_a_espacio(c):
        transtab = dict(zip(u'ÁÉÍÓÚÜáéíóúü','AEIOUUaeiouu'))
        if c in transtab:
            return transtab[c]                        
        validas=string.letters + u'Ññ'
        if c in validas:
            return c
        return ' '

.. code:: python

    print iniciales('No por mucho madrugar,amanece mas temprano')


.. parsed-literal::

    Npmmamt


Traza de una matriz cuadrada
----------------------------

Es trivial con una *list comprehension*.

.. code:: python

    def traza(m):
        return sum([m[i][i] for i in range(len(m))])

.. code:: python

    print traza([[1,2,3],[4,5,6],[7,8,9]])
    print traza([[1,0,0],[0,1,0],[0,0,1]])


.. parsed-literal::

    15
    3


Opciones de compra
------------------

Básicamente consiste en filtrar las combinaciones de ``precios`` tomados
de dos en dos. Es decir, el grueso del trabajo es conseguir estas
combinaciones.

Las combinaciones las generamos con una simple función recursiva. Las
diferentes combinaciones de ``precios`` tomados de ``n`` en ``n`` es,
para el caso general, la lista de las combinaciones que empiezan por el
primer elemento de ``precios`` mas la lista de las combinaciones que no
empiezan por el primer elemento de ``precios``. El primer término
consiste en la lista de los elementos que contienen al primero y además
a ``n-1`` elementos del resto, es decir,
``combinaciones_n(precios[1:], n-1)``. El segundo término es
directamente ``combinaciones_n(precios[1:], n)``.

El caso base lo constituyen los dos casos extremos. Cuando ``n``
coincide con la longitud de ``precios``, en cuyo caso no hay nada que
elegir, es toda la lista. Y cuando ``n`` es uno en cuyo caso solo hay
que convertir cada elemento en una lista para generar la respuesta.

.. code:: python

    def opciones_de_compra(precios, n, total):
        return [ c for c in combinaciones_n(precios, n) if sum(c) <= total ]
    
    def combinaciones_n(precios, n):
        if len(precios) == n:
            return [ precios ]
        if n == 1:
            return [ [x] for x in precios ]
        return [ [precios[0]] + i for i in combinaciones_n(precios[1:], n-1)] \
            + combinaciones_n(precios[1:], n)

.. code:: python

    print opciones_de_compra([2,5,1,3],2,6)
    print opciones_de_compra([3,5,2],2,4)


.. parsed-literal::

    [[2, 1], [2, 3], [5, 1], [1, 3]]
    []

