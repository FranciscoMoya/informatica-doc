
.. code:: python

    def imprimir_hex(n):
        top(n)
        for i in range(n-1):
            upper(n,i)
        for i in range(n-1):
            lower(n,i)
        bottom(n)
        
    def top(n):
        print ' '*n + '_'*n
        print ' '*(n-1) + '/' + ' '*n + '\\'
    
    def bottom(n):
        print ' '*(n-1) + '\\' + '_'*n + '/'
    
    def upper(n, i):
        print ' '*(n-2-i) + '/' + ' '*(n+2+2*i) + '\\'
    
    def lower(n, i):
        print ' '*i + '\\' + ' '*(n + 2*(n-i-1)) + '/'


.. code:: python

    imprimir_hex(4)
    imprimir_hex(3)
    imprimir_hex(2)


.. parsed-literal::

        ____
       /    \
      /      \
     /        \
    /          \
    \          /
     \        /
      \      /
       \____/
       ___
      /   \
     /     \
    /       \
    \       /
     \     /
      \___/
      __
     /  \
    /    \
    \    /
     \__/


.. code:: python

    def frequent_browsers(path):
        with open(path,'r') as f:
            return [ x for x in browsers(f) if x[1] > 5. ]
    
    def browsers(f):
        count = {}
        for linea in f:
            sid = extract_browser(linea)
            if sid in count:
                count[sid] += 1
            else:
                count[sid] = 1
        total = sum([count[x] for x in count])
        return sorted([ (x, 100.*count[x]/total) for x in count ], 
                      key = lambda x: x[1], reverse=True)
    
    def extract_browser(l):
        return l.split('"')[5]

.. code:: python

    frequent_browsers('access.log')




.. parsed-literal::

    [('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
      16.0),
     ('Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
      16.0),
     ('Mozilla/5.0 (Windows NT 10.0; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0',
      8.0)]



.. code:: python

    from math import sqrt, log, ceil
    
    def butterworth(Hp,Ha,Wp,Wa):
        n = orden(Hp,Ha,Wp,Wa)
        Wc = fcorte(n, Hp, Wp)
        return (n, Wc)
    
    def orden(Hp,Ha,Wp,Wa):
        Kd = sqrt((1./Hp**2 - 1)/(1./Ha**2 - 1))
        Ks = float(Wp) / Wa
        n = log(Kd)/log(Ks)
        return int(ceil(n))
    
    def fcorte(n, Hp, Wp):
        return Wp/((1./Hp**2 - 1)**(1./(2*n)))


.. code:: python

    print butterworth(0.9, 0.1, 1e4, 1.1e4)


.. parsed-literal::

    (32, 10229.150147595657)


.. code:: python

    def pi_leibniz(n):
        suma = 0.
        for i in range(n):
            termino = 1./(2*i + 1)
            suma += termino if i%2 == 0 else -termino
        return 4.*suma

.. code:: python

    print pi_leibniz(100000)


.. parsed-literal::

    3.14158265359


.. code:: python

    def mediana(values):
        v = sorted(values)
        l = len(values)
        if l % 2 == 0:
            return .5*(v[l/2 - 1] + v[l/2])
        return v[l/2]

.. code:: python

    print mediana(range(9))
    print mediana(range(10))


.. parsed-literal::

    4
    4.5


.. code:: python

    def validar_tarjeta(n):
        d = [int(x) for x in n]
        for i in range(0,16,2):
            d[i] *= 2
            if d[i] > 9:
                d[i] -= 9
        return sum(d) % (d[15] if d[15] else 10) == 0

.. code:: python

    print validar_tarjeta('4506252639731006')
    print validar_tarjeta('4578463073273942')


.. parsed-literal::

    False
    True


