
Prueba de progreso 1ºB
======================

Lee atentamente el enunciado de la prueba. El enunciado consiste en una
serie de ejercicios que deben realizarse en un mismo archivo Python.
Todas las funciones deben definirse en el mismo archivo y no debe
incuirse ningún fragmento de código de prueba. Las entregas deberán ser
trabajo original del alumno que realiza la entrega.

No se permite la comunicación con otras personas durante el examen. Se
permiten libros, apuntes y búsquedas en Internet.

1. Filtrado de señales (IIR)
----------------------------

Dada una señal de tiempo discreto, definida como una secuencia de
valores reales :math:`x = \{x_0, x_1, ... x_n\}` se define la señal de
salida de un filtro IIR como la secuencia de los valores:

.. math::  \sum_{k=0}^{M} a_k\cdot y_{n-k} = \sum_{k=0}^{N} b_k\cdot x_{n-k} 

Despejando el término :math:`y_n` tenemos la ecuación de recurrencia:

.. math::  y_n = \frac{1}{a_0} (\sum_{k=0}^{N} b_k\cdot x_{n-k} - \sum_{k=1}^{M} a_k\cdot y_{n-k} ) 

donde :math:`b_k, k\in\{0..N\}` y :math:`a_k, k\in\{1..M\}` son los
coeficientes del filtro, y ``n`` es el índice (posición) del elemento
correspondiente. Nótese que el valor de cada elemento de salida depende
de valores de elementos anteriores, que se calculan con la misma
fórmula. Es decir, se trata de una recurrencia. Como toda recurrencia
debe tener al menos un caso base. En este caso sabemos que
:math:`y_k = 0\ \ \forall k<0`.

**Nota: Una señal :math:`u = \{u_0, u_1, ... u_{M}\}` se modela como una
lista de Python ``u`` con la secuencia de los números reales de la
señal. Todos los demás elementos se asume que valen 0. Es decir
:math:`u_k = 0, \forall k \notin \{0..M\}`.**

1. *Definir una función ``iir_elem`` con cuatro parámetros. Los primeros
   dos parámetros son las listas ``a``\ y ``b`` que contienen los
   coeficientes del filtro. El tercer parámetro es una lista ``x``
   conteniendo una señal discreta. El cuarto parámetro es un entero
   ``n`` que corresponde al índice del elemento de la señal de salida.
   La función debe devolver el resultado de calcular :math:`y_n` según
   la fórmula de arriba. Se recomienda emplear una función ``elem(u,k)``
   que devuelve :math:`u_k`, es decir, el elemento k-ésimo de la señal
   que recibe como argumento. Se recuerda que :math:`k` puede estar
   fuera del rango de índices válidos para la lista ``u`` y que en ese
   caso el valor debe ser cero.*

2. *A diferencia de otro tipo de filtros, la salida de un filtro IIR no
   tiene por qué ser finita, aunque la entrada lo sea. Por tanto no
   podemos obtener toda la señal de salida del filtro, tenemos que
   indicar un límite. En este ejercicio se debe definir una función
   ``iir`` con cuatro parámetros. Los primeros dos parámetros son las
   listas ``a``\ y ``b`` que contienen los coeficientes del filtro. El
   tercer parámetro es una lista ``x`` conteniendo una señal discreta de
   entrada. El cuarto parámetro es un entero ``n`` que indica cuántos
   términos de ``y`` deben calcularse. La función debe devolver una
   lista ``y`` con los elementos desde :math:`y_0` hasta
   :math:`y_{n-1}`.*

Ejemplo de funcionamiento
~~~~~~~~~~~~~~~~~~~~~~~~~

::

    a = [ 1.0000, -0.6090, 0.5589, -0.2267, 0.0552, -0.0059 ]
    b = [ 0.0000,  0.1362, 0.4609,  0.1703, 0.0064,  0.0000 ]
    x = [ 1. ]
    print iir(a,b,x,20)

    [0.0, 0.1362, 0.5438457999999999, 0.4253799122, -0.0076225110901999675, -0.12661533932251176, -0.005631602263356893, 0.04533536317137913, 0.004983545346105678, -0.016635445678637978, -0.0030749291383428603, 0.006018949974088185, 0.0016052498338984026, -0.0021358009083332456, -0.0007617939672824104, 0.0007432886184513401, 0.0003411453650477868, -0.00025299798976127845, -0.0001467885888520849, 8.381986397751188e-05]

El primer ejercicio es traducción directa de la fórmula. Podría hacerse
con una función recursiva, pero se realizarían muchos más cálculos de
los necesarios. En esta implementación utilizo una función
``iir_elem_append`` que añade un elemento nuevo a la lista ``y``. De
esta forma ``iir_elem`` llama repetidamente a esta función y finalmente
devuelve solo el último elemento calculado.

.. code:: python

    def elem(u,k):
        return u[k] if k in range(len(u)) else 0.
    
    def iir_elem_append(a,b,x,y):
        sum = 0.
        n = len(y)
        for k in range(len(b)):
            sum += b[k]*elem(x,n-k)
        for k in range(1,len(a)):
            sum -= a[k]*elem(y,n-k)
        y.append(sum/a[0])
        
    def iir_elem(a,b,x,n):
        y = []
        for i in range(n + 1):
            iir_elem_append(a,b,x,y)
        return y.pop()

O con *list comprehensions*.

.. code:: python

    def iir_elem(a,b,x,n):
        return [iir_elem_append(a,b,x,y) for i in range(n + 1)].pop()

La versión recursiva sería mucho menos eficiente puesto que repetiría
numerosos cálculos. Pero la pongo a continuación porque también sería
aceptada como correcta. El caso base serían los valores de ``n``
negativos.

.. code:: python

    def iir_elem(a,b,x,n):
        if n < 0: return 0.
        sum = 0.
        for k in range(len(b)):
            sum += b[k]*elem(x,n-k)
        for k in range(1,len(a)):
            sum -= a[k]*iir_elem(a,b,x,n-k)
        return sum/a[0]

La función ``iir`` puede implementarse también con ayuda de
``iir_elem_append``.

.. code:: python

    def iir(a,b,x,n):
        y = []
        for i in range(n):
            iir_elem_append(a,b,x,y)
        return y

O con *list comprehensions*.

.. code:: python

    def iir_elem(a,b,x,n):
        return [iir_elem_append(a,b,x,y) for i in range(n + 1)]

Pero una vez implementada esta versión de ``iir`` podemos comprobar que
se parece mucho a nuestra implementación original de ``iir_elem``.
Merece la pena reescribir ``iir_elem`` para reutilizar esta última
implementación y reducir la duplicación de código.

.. code:: python

    def iir_elem(a, b, x, n):
        return iir(a, b, x, n+1).pop()

Solo falta probarlo.

.. code:: python

    a = [ 1.0000, -0.6090, 0.5589, -0.2267, 0.0552, -0.0059 ]
    b = [ 0.0000,  0.1362, 0.4609,  0.1703, 0.0064,  0.0000 ]
    x = [ 1. ]
    iir(a, b, x, 20)




.. parsed-literal::

    [0.0,
     0.1362,
     0.5438457999999999,
     0.4253799122,
     -0.0076225110901999675,
     -0.12661533932251176,
     -0.005631602263356893,
     0.04533536317137913,
     0.004983545346105678,
     -0.016635445678637978,
     -0.0030749291383428603,
     0.006018949974088185,
     0.0016052498338984026,
     -0.0021358009083332456,
     -0.0007617939672824104,
     0.0007432886184513401,
     0.0003411453650477868,
     -0.00025299798976127845,
     -0.0001467885888520849,
     8.381986397751188e-05]



2. Diezmado e interpolación
---------------------------

Una operación de filtrado básica es la reducción del número de muestras,
que equivale a reducir la frecuencia de muestreo. Esta operación se
puede describir matemáticamente así:

.. math::  y_n = x_{M\cdot n} 

Es decir, la señal de salida conserva los valores de la de entrada, pero
solo se preservan una de cada M muestras.

**Nota: El diezmado habituamente requiere un paso previo de filtrado que
vamos a ignorar en esta prueba**

La operación complementaria del diezmado es la interpolación. Generar
nuevas muestras como resultado de un promediado de las muestras de
alrededor. En nuestro caso usaremos el método más simple (interpolación
lineal) que consiste en generar muestras como la media aritmética de la
muestra que la precede y la que sigue. Es decir:

.. math::  y_{2n} = x_n 

.. math::  y_{2n+1} = \frac{x_{2n} + x_{2n+2}}{2} 

Es decir, las muestras pares corresponden a la señal original y las
impares se toman como la media aritmética de la anterior y la posterior.

1. *Definir una función ``diezmar`` que tenga dos parámetros. El primer
   parámetro es una lista ``x`` que representa la señal de entrada. El
   segundo representa a :math:`M`, la tasa de diezmado. La función debe
   devolver otra lista con solo uno de cada :math:`M` elementos de
   ``x``.*

2. *Definir una función ``interpolar`` que tenga un parámetro, la lista
   ``x`` que representa la señal de entrada. La función debe devolver
   una lista con el doble de elementos, donde los elementos impares se
   calculan interpolando como se explica arriba.*

Ejemplo de uso
~~~~~~~~~~~~~~

::

    x = range(100)
    print diezmar(x,5)
    x = range(0,10,2)
    print interpolar(x)

    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
    [0, 1.0, 2, 3.0, 4, 5.0, 6, 7.0, 8, 4.0]

Ambas funciones son prácticamente directas.

.. code:: python

    def diezmar(x,M):
        y=[]
        for i in range(0,len(x),M):
            y.append(x[i])
        return y
    
    def interpolar(x):
        y=[]
        for i in range(len(x)):
            y.append(x[i])
            y.append(.5*(x[i]+elem(x,i+1)))
        return y

O con *list comprehensions* que en el caso de la función ``interpolar``
puede ser demasiado rebuscado.

.. code:: python

    def diezmar(x,M):
        return [ x[i] for i in range(0,len(x),M) ]
    
    def interpolar(x):
        l = zip(x,[ .5*(x[i]+elem(x,i+1)) for i in range(len(x))])
        return [ i for tupla in l for i in tupla ]

O haciendo funciones ``f(x,i)`` intermedias para poder iterar sobre las
propias funciones. Una de las funciones es directamente devolver el
término i-ésimo, que puede ser aprovechada directamente de ``elem``.

.. code:: python

    def media(x, i): return .5*(x[i] + elem(x,i+1))
    
    def interpolar(x):
        return [ f(x, i) for i in range(len(x)) for f in (elem, media) ]

Solo falta probarlo.

.. code:: python

    x = range(100)
    print(diezmar(x,5))
    x = range(0,10,2)
    print(interpolar(x))


.. parsed-literal::

    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
    [0, 1.0, 2, 3.0, 4, 5.0, 6, 7.0, 8, 4.0]


Rúbrica de evaluación
---------------------

Puntos totales: 10 puntos:

-  1.1 Función ``iir_elem``: 2.5 puntos
-  1.2 Función ``iir``: 2.5 puntos
-  2.1 Función ``diezmar``: 2.5 puntos
-  2.2 Función ``interpolar``: 2.5 puntos

Penalizaciones:

-  Errores de sintaxis: 100% de los puntos de la función
-  Errores de ejecución (excepciones): 50% de los puntos de la función
-  Errores en límites de recorridos: 20% de los puntos de la función
-  Código repetitivo: 10% de los puntos de la función

