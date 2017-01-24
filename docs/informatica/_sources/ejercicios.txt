
Ejercicios simples
==================

Coordenadas geográficas
-----------------------

Dadas unas coordenadas de latitud y longitud representarlas en grados,
minutos y segundos.

.. code:: python

    def imprimir_coord(latitud, longitud):
        hemi = 'N' if latitud >= 0 else 'S' 
        g,m,s = coord_a_grados_min_seg(abs(latitud))
        print('Latitud {}º {}\' {}" {}'.format(g,m,s,hemi))
        hemi = 'W' if longitud >= 0 else 'E' 
        g,m,s = coord_a_grados_min_seg(abs(longitud))
        print('Longitud {}º {}\' {}" {}'.format(g,m,s,hemi))
        
    def coord_a_grados_min_seg(v):
        grados = int(v)
        v = v - grados
        v *= 60
        minutos = int(v)
        v = v - minutos
        v *= 60
        segundos = int(v)
        return grados, minutos, segundos

.. code:: python

    imprimir_coord(40.76, 10.15)


.. parsed-literal::

    Latitud 40º 45' 35" N
    Longitud 10º 9' 0" W


La única cosa destacable es la forma en la que se devuelven múltiples
valores de una función y cómo se introduce una comilla en una cadena
delimitada por comilla simple.

Reproducción de insectos
------------------------

Solución al reto `645 <http://www.solveet.com/exercises/java/645>`__ de
Solveet!

    Un estudiante de biologia esta realizando un experimento con unos
    insectos que se descubrieron en una expedición al centro de la selva
    amazonica, estos insectos son muy coloridos y les encanta comer
    hojas secas, siendo las de eucalipto sus favoritas.

    Además nota que estos insectos colocan 3 huevos cada 2 días, de cada
    huevo como es de esperar sale un nuevo insecto a los dos días de
    haber sido colocado y estos insectos solo viven por 5 días.

    El estudiante teme que los insectos se apoderen de los ambientes
    donde estan siendo estudiados, puesto que el sabe que solo tiene una
    capacidad limitada de espacio para ellos, te pide que le ayudes a
    determinar en cuantos días la población de insectos llegara a
    superar la capacidad con la que cuenta. Para ello el te dira con
    cuantos insectos cuenta en un determinado momento y hasta cuantos
    insectos puede manejar.

La forma más sencilla, que no requiere análisis detallado es simular la
evolución de la población. Para eso tenemos que simular el nacimiento,
la muerte, la puesta y la eclosión.

Hay infinidad de maneras de modelar los datos asociados. Nosotros hemos
utilizado para los insectos tuplas *(num\_insectos,
dias\_sin\_poner\_huevos, dias\_vida)*. Estas ternas se van actualizando
conforme evoluciona el sistema. Para los huevos usamos tuplas *(huevos,
dias\_desde\_puesta)* que también se actualizan cada día.

Por tanto usamos tres variables para almacenar el estado: ``insectos``
con la población total de insectos, ``huevos`` con el inventario total
de huevos, y ``dia`` para mantener el día actual. Sería normal usar
listas para las dos primeras, pero vamos a hacerlo con tuplas para
ilustrar cómo podemos evitar manipulaciones imprevistas.

.. code:: python

    def dias(inicial, final):
        insectos = ((inicial, 0, 0),)
        huevos = tuple()
        dia = 0
        while True:
            insectos, huevos = poblacion_dia_siguiente(insectos, huevos)
            if total_insectos(insectos) > final:
                return dia
            dia += 1
            print ('DIA {} --------------\n insectos: {}\n huevos: {}'.
                   format(dia, insectos, huevos))

La simulación es sencilla, lo más complejo es calcular la población del
día siguiente. Empezaremos por contabilizar la población total de
insectos con la función ``total_insectos``.

.. code:: python

    def total_insectos(insectos):
        return sum(x[0] for x in insectos)

La población del día siguiente tiene que tener en cuenta todos los
procesos que indica el enunciado. En primer lugar hay que incrementar el
número de días que llevan los insectos sin poner huevos y de vida total,
y los días que llevan los huevos sin eclosionar. Luego tratamos la
muerte de los insectos viejos, la puesta de huevos, y la eclosión.

.. code:: python

    def poblacion_dia_siguiente(insectos, huevos):
        insectos, huevos = incrementar_dia(insectos, huevos)
        insectos = matar_viejos(insectos)
        insectos, huevos = poner_huevos(insectos, huevos)
        insectos, huevos = eclosionar_huevos(insectos, huevos)
        return insectos, huevos

Incrementar el día implica construir nuevas tuplas con los campos
correspondientes a días incrementados en una unidad.

.. code:: python

    def incrementar_dia(insectos, huevos):
        return  tuple( (x[0], x[1]+1, x[2]+1) for x in insectos ), \
                tuple( (x[0], x[1]+1) for x in huevos )

Los insectos que cumplan 5 días ya no deben figurar en la lista.

.. code:: python

    def matar_viejos(insectos):
        return tuple( x for x in insectos if x[2] <= 5 )

Poner huevos implica primero calcular a cuántos insectos les toca poner
(llevan 2 días sin poner). Fíjate bien en cómo generamos la tupla de
todos los huevos. Podemos concatenar dos tuplas para formar una tupla
mayor, pero no podemos usar ``append`` ni sumar un simple elemento. Por
eso es importante la coma del final de la última línea.

.. code:: python

    def poner_huevos(insectos, huevos):
        ponen = sum(x[0] for x in insectos if x[1]>=2)
        if ponen == 0:
            return insectos, huevos
        return tuple( (x[0], x[1] if x[1] < 2 else 0, x[2]) for x in insectos ), \
               huevos + ((ponen*3, 0),)

Los huevos que lleven dos días puestos deben eclosionar. Esto los debe
eliminar de la tupla de huevos y convertir en nuevos insectos en la
tupla de insectos.

.. code:: python

    def eclosionar_huevos(insectos, huevos):
        nuevos = sum([ x[0] for x in huevos if x[1] >= 2 ])
        if nuevos == 0:
            return insectos, huevos
        return insectos + ((nuevos,0,0),), \
               tuple( x for x in huevos if x[1] < 2 )

.. code:: python

    dias(2, 10)


.. parsed-literal::

    DIA 1 --------------
     insectos: ((2, 1, 1),)
     huevos: ()
    DIA 2 --------------
     insectos: ((2, 0, 2),)
     huevos: ((6, 0),)
    DIA 3 --------------
     insectos: ((2, 1, 3),)
     huevos: ((6, 1),)
    DIA 4 --------------
     insectos: ((2, 0, 4), (6, 0, 0))
     huevos: ((6, 0),)
    DIA 5 --------------
     insectos: ((2, 1, 5), (6, 1, 1))
     huevos: ((6, 1),)




.. parsed-literal::

    5



