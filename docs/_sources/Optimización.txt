
Enumeración exhaustiva
----------------------

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

.. code:: python

    def mochila01(disponibles, pesoMax = 20):
        mejorVal,mejorSaco = 0.0,None
        for saco in genPowerset(disponibles):
            valor,peso = valorSaco(saco),pesoSaco(saco)
            if peso <= pesoMax and valor > mejorVal:
                mejorVal, mejorSaco = valor, saco
        return mejorVal, mejorSaco
    
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

    prueba0()


.. parsed-literal::

    [('b', 7, 3), ('c', 8, 2)]
    Valor total = 15


Algoritmo voraz
---------------

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
        return max(disponibles, key=cost)
    
    def cost(e): return valor(e)

.. code:: python

    prueba0()


.. parsed-literal::

    [('d', 9, 5)]
    Valor total = 9


.. code:: python

    def cost(e): return valor(e)/peso(e)

.. code:: python

    prueba0()


.. parsed-literal::

    [('c', 8, 2), ('b', 7, 3)]
    Valor total = 15


Simplificando
~~~~~~~~~~~~~

.. code:: python

    from itertools import accumulate
    
    def mochila01(disponibles, pesoMax = 20):
        quedan = sorted(disponibles, key=cost, reverse=True)
        pesos = accumulate(peso(e) for e in quedan)
        ultimo = next(i for i,p in enumerate(pesos) if p>pesoMax)
        return valorSaco(quedan[:ultimo]), quedan[:ultimo]

.. code:: python

    prueba0()


.. parsed-literal::

    [('c', 8, 2), ('b', 7, 3)]
    Valor total = 15


