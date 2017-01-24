
Prueba de progreso 1ºA
======================

Lee atentamente el enunciado de la prueba. El enunciado consiste en una
serie de ejercicios que deben realizarse en un mismo archivo Python.
Todas las funciones deben definirse en el mismo archivo y no debe
incuirse ningún fragmento de código de prueba. Las entregas deberán ser
trabajo original del alumno que realiza la entrega.

No se permite la comunicación con otras personas durante el examen. Se
permiten libros, apuntes y búsquedas en Internet.

1. Filtrado de señales
----------------------

Dada una señal de tiempo discreto, definida como una secuencia de
valores reales :math:`x = \{x_0, x_1, ... x_n\}` se define la señal de
salida de un filtro FIR como la secuencia de los valores:

.. math::  y_n = \sum_{k=0}^{N-1} h_k\cdot x_{n-k} 

donde :math:`h_k` para :math:`k\in\{0..N-1\}` son los coeficientes del
filtro, y ``n`` es e índice del elemento correspondiente.

**Nota: Una señal :math:`u = \{u_0, u_1, ... u_{M-1}\}` se modela como
una lista de Python ``u`` con la secuencia de los números reales de la
señal. Todos los demás elementos se asume que valen 0. Es decir
:math:`u_k = 0, \forall k \notin \{0..M-1\}` siendo :math:`M` el número
de elementos de ``u``.**

1. *Definir una función ``fir_elem`` con tres parámetros. El primer
   parámetro es una lista ``h`` que contiene los coeficientes del
   filtro. El segundo parámetro es una lista ``x`` conteniendo una señal
   discreta. El tercer parámetro es un entero ``n`` que corresponde al
   índice del elemento de la señal de salida. La función debe devolver
   el resultado de calcular :math:`y_n` según la fórmula de arriba. Se
   recomienda emplear una función ``elem(u,k)`` que devuelve
   :math:`u_k`, es decir, el elemento k-ésimo de la señal que recibe
   como argumento. Se recuerda que :math:`k` puede estar fuera del rango
   de índices válidos para la lista ``u`` y que en ese caso el valor
   debe ser cero.*

2. *Definir una función ``fir`` con dos parámetros. El primer parámetro
   es una lista ``h`` que contiene los coeficientes del filtro. El
   segundo parámetro es una lista ``x`` conteniendo una señal discreta.
   La función debe devolver la señal de salida del filtro FIR
   correspondiente. Es decir, debe devolver la lista de todos los
   elementos distintos de cero. La longitud de la salida de un filtro
   FIR es :math:`N+M-1` siendo :math:`N` la longitud de ``h`` y
   :math:`M` la longitud de ``x``.*

3. *Una característica interesante de los filtros FIR es que pueden
   tener respuesta de fase lineal, pero para eso los coeficiente de
   ``h`` deben cumplir una condición.

   .. math::  h_n = \pm h_{M-1-n}\ \ \ \forall n \in \{0..M-1\} 

    Es decir, los coeficientes del fitro deben ser simétricos o
   antisimétricos. Según se cumpla la condición con signo positivo o
   negativo, y según el número de elementos de ``h`` sea par o impar,
   los filtros FIR se clasifican en cuatro tipos que se usan para fines
   diferentes. Definir una función ``tipo_fir`` que acepte un argumento
   ``h`` de tipo lista de reales y devuelva un valor entero de acuerdo a
   la siguiente tabla.*

+--------------------------------+-----------+--------+
| Simetría de los coeficientes   | # Coefs   | Tipo   |
+================================+===========+========+
| :math:`h(n) = h(M-1-n)`        | Impar     | 1      |
+--------------------------------+-----------+--------+
| :math:`h(n) = h(M-1-n)`        | Par       | 2      |
+--------------------------------+-----------+--------+
| :math:`h(n) = -h(M-1-n)`       | Impar     | 3      |
+--------------------------------+-----------+--------+
| :math:`h(n) = -h(M-1-n)`       | Par       | 4      |
+--------------------------------+-----------+--------+
| Sin simetría                   |           | 0      |
+--------------------------------+-----------+--------+

Ejemplo de funcionamiento
~~~~~~~~~~~~~~~~~~~~~~~~~

::

    x = [i % 10 for i in range(10)]
    h = [1./3,1./3,1./3]
    print fir(h, x)
    print tipo_fir(h)

    [0.0, 0.3333333333333333, 1.0, 1.9999999999999998, 2.9999999999999996, 4.0, 5.0, 6.0, 7.0, 7.999999999999999, 5.666666666666666, 3.0]
    1

El primer ejercicio es aplicar directamente la fórmula con la única
precaución de usar una función intermediaria para no indexar las listas
fuera de rango.

.. code:: python

    def elem(u,k):
        return u[k] if k in range(len(u)) else 0.
    
    def fir_elem(h,x,n):
        sum=0.
        for k in range(len(h)):
            sum += elem(h,k)*elem(x,n-k)
        return sum

El segundo ejercicio es más sencillo aún, basta con usar la función
desarrollada en el ejercicio anterior en todo el rango de la señal de
salida.

.. code:: python

    def fir(h,x):
        return [fir_elem(h,x,i) for i in range(len(h)+len(x)-1)]

También se puede hacer sin *list comprehensions*.

.. code:: python

    def fir(h,x):
        y = []
        for i in range(len(h)+len(x)-1):
            y.append(fir_elem(h,x,i))
        return y

El tercer ejercicio lo podemos hacer con *list comprehensions* y
diccionarios. Calculamos los tres parámetros que permiten saber el tipo
de filtro: si los coeficientes son simétricos, si son antisimétricos, y
si el número de elementos en par o impar.

.. code:: python

    def tipo_fir(h):
        M = len(h)
        sim = all([h[i]==h[M-i-1] for i in range(M//2)])
        asim = all([h[i]==-h[M-i-1] for i in range(M//2)])
        par = (M % 2 == 0)
        return {
            (True,False,False) :1,
            (True,False,True)  :2,
            (False,True,False) :3,
            (False,True,True)  :4,
            (False,False,False):0,
            (False,False,True) :0,
            }[(sim,asim,par)]

También se puede hacer con ``if`` y sin *list comprehensions*.

.. code:: python

    def tipo_fir(h):
        if es_simetrico(h):
            return 2 if len(h) % 2 == 0 else 1
        if es_antisimetrico(h):
            return 4 if len(h) % 2 == 0 else 3
        return 0
    
    def es_simetrico(h):
        M = len(h)
        for i in range(M//2):
            if h[i] != h[M-i-1]:
                return False
        return True
    
    def es_antisimetrico(h):
        M = len(h)
        for i in range(M//2):
            if h[i] != -h[M-i-1]:
                return False
        return True

Ya solo falta probarlo.

.. code:: python

    x = [i % 10 for i in range(10)]
    h = [1./3,1./3,1./3]
    print(fir(h, x))
    print(tipo_fir(h))


.. parsed-literal::

    [0.0, 0.3333333333333333, 1.0, 1.9999999999999998, 2.9999999999999996, 4.0, 5.0, 6.0, 7.0, 7.999999999999999, 5.666666666666666, 3.0]
    1


2. Nota numérica
----------------

En muchas becas se calcula la nota media del expediente a partir de las
notas alfabéticas. Así una nota de ``Matricula de honor`` computa como
un 10.0, un ``Sobresaliente`` computa como un 9.0, un ``Notable`` como
un 7.5, un ``Aprobado`` como un 5.5 y un ``Suspenso`` como un 3.0.

*Define la función ``nota_media`` que calcula la nota media de un
expediente a partir de sus valores alfabéticos. La función tiene un
único argumento que es una lista de cadenas de texto, y debe devolver un
número real con la nota media del expediente de acuerdo a lo descrito en
el párrafo anterior.*

**Nota: Fíjate en que las cadenas de texto no llevan tildes y comienzan
por un letra mayúscula. Deben ser exactamente así:
``Matricula de honor``, ``Sobresaliente``, ``Notable``, ``Aprobado``,
``Suspenso``.**

Ejemplo de uso
~~~~~~~~~~~~~~

::

    expediente = ['Sobresaliente', 'Notable', 'Notable', 'Aprobado', 'Suspenso']
    print nota_media(expediente)

    6.5

La forma más fácil de hacerlo es con un diccionario.

.. code:: python

    def nota_media(e):
        sum=0.
        for i in e:
            sum += nota(i)
        return sum/len(e)
    
    def nota(s):
        return {
            'Matricula de honor':10.,
            'Sobresaliente':9.,
            'Notable':7.5,
            'Aprobado':5.5,
            'Suspenso':3
            }[s]
    
    expediente = ['Sobresaliente', 'Notable', 'Notable', 'Aprobado', 'Suspenso']
    print(nota_media(expediente))


.. parsed-literal::

    6.5


Rúbrica de evaluación
---------------------

Puntos totales: 10 puntos:

-  1.1 Función ``fir_elem``: 2.5 puntos
-  1.2 Función ``fir``: 2.5 puntos
-  1.3 Función ``tipo_fir``: 2.5 puntos
-  2 Función ``nota_media``: 2.5 puntos

Penalizaciones:

-  Errores de sintaxis: 100% de los puntos de la función
-  Errores de ejecución (excepciones): 50% de los puntos de la función
-  Errores en límites de recorridos: 20% de los puntos de la función
-  Código repetitivo: 10% de los puntos de la función

