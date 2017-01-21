
El problema de la mochila 0-1
=============================

Dado un conjunto de elementos con *valor* y *peso* se trata de
determinar el subconjunto de elementos que maximiza el valor y cumple
una determinada restricción de peso. Matemáticamente implica determinar
para un conjunto de elementos :math:`I = \{I_i\}` el vector booleano
:math:`V` que maximiza:

.. math::  \sum_iV_i\cdot I_i^{valor} 

Sujeto a la restricción:

.. math::  \sum_iV_i\cdot I_i^{peso} \leq w 

Donde :math:`I_i^{valor}` es el valor del elemento :math:`I_i`,
:math:`I_i^{peso}` es el peso del elemento :math:`I_i` y :math:`V_i`
vale *1* si se coge el elemento :math:`I_i` y *0* en caso contrario.

Empecemos por las pruebas. Un caso simple podría ser el siguiente:

.. code:: python

    def prueba0():
        nombres = ['a', 'b', 'c', 'd']
        valores = [ 6,   7,   8,   9]
        pesos   = [ 3,   3,   2,   5]
        elems = list(zip(nombres, valores, pesos))
        val, saco = mochila01(elems, 5)
        print(saco)
        print('Valor total =', val)
    
    
    def valor(e): return e[1]
    def peso(e): return e[2]

De esta forma modelamos los elementos como tuplas de tres elementos
*(nombre, valor, peso)* y utilizamos funciones auxiliares ``valor`` y
``peso`` para abstraer la representación y no cometer errores.

Esta prueba nos puede valer para desarrollar el algoritmo, pero
añadiremos una prueba más de tamaño variable para probar los límites del
algoritmo y caracterizar su rendimiento.

.. code:: python

    import random
    def constr_elems(n, valMax, pesoMax):
        return [ (str(i), 
                  random.randint(1, valMax),
                  random.randint(1, pesoMax)) \
                 for i in range(n) ]
    
    
    def prueba1(n):
        elems = constr_elems(n, 10, 10)
        val, saco = mochila01(elems, 40)
        print ('Contenido:', saco)
        print ('Valor total:', val)

Enumeración exhaustiva
----------------------

La solución trivial es la evaluación de todas las posibles
combinaciones. La dificultad estriba precisamente en eso, en generar
todos los posibles subconjuntos del conjunto de elementos. Es lo que se
conoce como el *powerset* de un conjunto.

.. code:: python

    def mochila01(disponibles, pesoMax = 20):
        mejorVal, mejorSaco = 0.0, None
        for saco in genPowerset(disponibles):
            valor,peso = valorSaco(saco),pesoSaco(saco)
            if peso <= pesoMax and valor > mejorVal:
                mejorVal, mejorSaco = valor, saco
        return (mejorVal, mejorSaco)
    def valorSaco(saco):
        return sum(valor(e) for e in saco)
    def pesoSaco(saco):
        return sum(peso(e) for e in saco)
    def genPowerset(L):
        return (genSubset(L,i) \
                for i in range(2**len(L)))
    def genSubset(L, i):
        return [L[j] \
                for j in range(len(L)) \
                if isBitSet(i, j)]
    def isBitSet(n, bit):
        return n & (1 << bit) != 0

.. code:: python

    def mochila01(disponibles, pesoMax = 20):
        saco, valorSaco = [], 0
        quedan = list(disponibles)
        while True:
            e = mejorElemento(quedan)
            if peso(e) > pesoMax:
                break
            pesoMax -= peso(e)
            valorSaco += valor(e)
            quedan.remove(e)
            saco.append(e)
        return valorSaco, saco
    
    def mejorElemento(disponibles):
        mejorElem, mejorCoste = None, 0
        for e in disponibles:
            c = cost(e)
            if c > mejorCoste:
                mejorElem, mejorCoste = e, c
        return mejorElem
    
    def mejorElemento(disponibles):
        return max(disponibles, key = cost)
    
    def cost(e):
        return valor(e)
    
    def cost(e):
        return valor(e)/peso(e)

.. code:: python

    def mochila01(pend, libre):
        if not pend or libre == 0:
            return 0, ()
        if peso(pend[0]) > libre:
            return mochila01(pend[1:], libre)
        elem = pend[0]
        val1, saco1 = mochila01(pend[1:],
                                libre - peso(elem))
        val1 += valor(elem)
        saco1 += (elem,)
        val0, saco0 = mochila01(pend[1:], libre)
        if val1 > val0:
            return val1, saco1
        return val0, saco0

.. code:: python

    prueba0()


.. parsed-literal::

    (('c', 8, 2), ('b', 7, 3))
    Valor total = 15


.. code:: python

    def mochila01(pend, libre, memo= {}):
        if (len(pend), libre) in memo:
            return memo[(len(pend), libre)]
        ret = elegir(pend, libre, memo)
        memo[(len(pend), libre)] = ret
        return ret
    
    def elegir(pend, libre, memo):
        if not pend or libre == 0:
            return 0, ()
        if peso(pend[0]) > libre:
            return mochila01(pend[1:], libre, memo)
        elem = pend[0]
        val1, saco1 = mochila01(pend[1:],
                                libre - peso(elem),
                                memo)
        val1 += valor(elem)
        saco1 += (elem,)
        val0, saco0 = mochila01(pend[1:], libre, memo)
        if val1 > val0:
            return val1, saco1
        return val0, saco0

.. code:: python

    prueba0()


.. parsed-literal::

    (('c', 8, 2), ('b', 7, 3))
    Valor total = 15


.. code:: python

    prueba1(180)


.. parsed-literal::

    Contenido: (('99', 9, 2), ('91', 5, 1), ('76', 10, 3), ('73', 6, 2), ('67', 4, 1), ('65', 4, 1), ('61', 7, 1), ('34', 7, 2), ('28', 10, 2), ('19', 10, 3), ('8', 10, 3), ('96', 7, 2), ('87', 5, 1), ('77', 8, 2), ('66', 10, 3), ('53', 8, 2), ('52', 10, 1), ('43', 9, 2), ('40', 10, 1), ('35', 7, 2), ('32', 10, 2), ('21', 8, 1))
    Valor total: 174


