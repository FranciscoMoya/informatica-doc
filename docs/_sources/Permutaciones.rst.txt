
Permutaciones de *n* elementos
==============================

Determinar todas las posibles ordenaciones de *n* elementos sin
repetición. Por ejemplo, para la lista ``[1,2,3]`` las posibles
ordenaciones son:

``Python [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]``

La forma más sencilla de resolver este problema es mediante una función
recursiva que reduzca su complejidad. Por ejemplo, para el caso de
arriba la lista de las permutaciones es: *1 seguido de cada una de las
permutaciones de [2,3], 2 seguido de cada una de las permutaciones de
[1,3] y 3 seguido de cada una de las permutaciones de [1,2]*.

Es decir, cada uno de los elementos se toma como el primer elemento y se
concatena con el resultado de las permutaciones del resto de los
elementos.

.. code:: python

    def permutaciones(l):
        '''Asume l lista de elementos.
           Devuelve una lista de permutaciones. Cada 
           permutación es una lista como l pero con 
           los elementos reordenados.'''
        if len(l) < 2:
            return [l]
        ret = []
        for i in l:
            ret += concat_elem_permutaciones(i, resto(l,i))
        return ret
    
    def concat_elem_permutaciones(elem, l):
        '''Asume elem de cualquier tipo, l lista de elementos.
           Devuelve una lista de permutaciones de l pero con 
           elem añadido a la cabeza.'''
        ret = []
        for i in permutaciones(l):
            ret.append([elem] + i)
        return ret
                                            
    def resto(l, elem):
        '''Asume l lista, elem un elemento presente en l.
           Devuelve una lista con los mismos elementos 
           salvo elem.'''
        r = l[:]
        r.remove(elem)
        return r

.. code:: python

    permutaciones([1,2,3])




.. parsed-literal::

    [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]



Se puede abreviar bastante usando comprensiones de lista:

.. code:: python

    def permutaciones(l):
        '''Asume l lista de elementos.
           Devuelve una lista de permutaciones. Cada 
           permutación es una lista como l pero con 
           los elementos reordenados.'''
        if len(l) < 2:
            return [l]
        return sum([concat_elem_permutaciones(i, resto(l,i)) for i in l ], [])
    
    def concat_elem_permutaciones(elem, l):
        '''Asume elem de cualquier tipo, l lista de elementos.
           Devuelve una lista de permutaciones de l pero con 
           elem añadido a la cabeza.'''
        return [[elem] + i for i in permutaciones(l)]
                                            
    def resto(l, elem):
        '''Asume l lista, elem un elemento presente en l.
           Devuelve una lista con los mismos elementos 
           salvo elem.'''
        return [x for x in l if x != elem]

Usando generadores
------------------

El problema está resuelto pero permíteme presentar otra posible
solución.

La solución que hemos presentado arriba devuelve una lista con todas las
posibles permutaciones. Como puedes imaginar esto puede llegar a ocupar
mucho. Imagina que tenemos que calcular las permutaciones de 20
elementos. El resultado serían ``factorial(20)`` listas de *20*
elementos. ¿Sabes cuánto es eso? Te lo diré en TB suponiendo que cada
elemento ocupa solo un byte:

.. code:: python

    from math import factorial
    round(20*factorial(20)/(1024**4))




.. parsed-literal::

    44254230



Son 44 millones de TB. Ni siquiera cabría en el disco duro de tu
ordenador. Los discos duros más grandes que se venden hoy en día son de
4TB. Necesitaríamos más de 10 millones de discos de 4TB.

Si queremos permutaciones de un número razonable de elementos es
evidente que no podemos guardarlo en una lista. Tenemos que ir generando
sobre la marcha. Para eso puede ayudarnos mucho una utilidad de Python,
los generadores. Funcionan de forma parecida a los ``range``. Cuando los
intentamos recorrer van produciendo elementos. Veamos por ejemplo un
generador para generar los *n* primeros cuadrados:

.. code:: python

    def cuadrados(n):
        '''Genera los n primeros cuadrados'''
        for i in range(n):
            yield i**2

La palabra clave ``yield`` produce un resultado parcial. Los detalles
internos no es necesario conocerlos de momento. Vamos a intentar usarla:

.. code:: python

    cuadrados(10)




.. parsed-literal::

    <generator object cuadrados at 0x00000080A040B150>



Le pasa los mismo que a los ``range``. No nos muestra información útil
pero podemos usarlo como si fuera una lista:

.. code:: python

    for i in cuadrados(10):
        print(i, end=' ')


.. parsed-literal::

    0 1 4 9 16 25 36 49 64 81 

Incluso podemos convertirlo en lista de la misma forma que un ``range``.
Lo interesante es que si no necesitamos convertirlo en lista no ocupa la
memoria correspondiente a todos los elementos.

.. code:: python

    list(cuadrados(10))




.. parsed-literal::

    [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]



Vamos a usar esta característica para generar permutaciones.

.. code:: python

    def permutaciones(l):
        if len(l) < 2:
            yield l[:]
            return
        for i in l:
            for j in permutaciones(resto(l,i)):
                yield [i] + j
    
    def resto(l, elem):
        r = l[:]
        r.remove(elem)
        return r

Fíjate bien en que ``yield`` no es un return. Produce un resultado y se
queda ahí hasta que se le pide otro resultado. Si ya no queremos seguir
la ejecución del programa tenemos que usar ``return``.

La forma de usarlo es similar a un ``range``.

.. code:: python

    list(permutaciones([1,2,3]))




.. parsed-literal::

    [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]



Un generador no se llama como una función cualquiera. El generador se
llama una vez para tener todos los resultados y después se itera sobre
ellos usando ``next`` o un bucle ``for``. Por ejemplo, veamos una forma
de imprimir solo las 10 primeras permutaciones.

.. code:: python

    todas = permutaciones([1,2,3,4,5,6,7,8])
    for i in range(10):
        print(next(todas))


.. parsed-literal::

    [1, 2, 3, 4, 5, 6, 7, 8]
    [1, 2, 3, 4, 5, 6, 8, 7]
    [1, 2, 3, 4, 5, 7, 6, 8]
    [1, 2, 3, 4, 5, 7, 8, 6]
    [1, 2, 3, 4, 5, 8, 6, 7]
    [1, 2, 3, 4, 5, 8, 7, 6]
    [1, 2, 3, 4, 6, 5, 7, 8]
    [1, 2, 3, 4, 6, 5, 8, 7]
    [1, 2, 3, 4, 6, 7, 5, 8]
    [1, 2, 3, 4, 6, 7, 8, 5]


De todas formas como puedes imaginar las permutaciones de una serie de
elementos son muy útiles. Sería imperdonable que Python no tuviera ya
una implementación en su biblioteca estándar. Está en ``itertools``.

.. code:: python

    from itertools import permutations as permutaciones

.. code:: python

    list(permutaciones([1,2,3]))




.. parsed-literal::

    [(1, 2, 3), (1, 3, 2), (2, 1, 3), (2, 3, 1), (3, 1, 2), (3, 2, 1)]


