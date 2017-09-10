
Abstracción con funciones
=========================

Como ya comentamos en la introducción, la *abstracción* es la
herramienta más potente que tenemos para manejar problemas grandes.
Abstraer es simplificar, dejar de lado los detalles para concentrarse
en lo fundamental.  Eso es justo lo que hacemos al *usar* una función,
al emplear la *expresión de llamada*.  Al llamar a una función no nos
preocupa cómo funciona por dentro, sino solamente lo que hace.  ¿A que
no te has preguntado cómo es la función ``print`` por dentro? Y sin
embargo estás usándola desde tu primer programa.  Acostúmbrate a hacer
lo mismo cuando usas tus propias funciones.  No pienses en cómo están
hechas, sino en qué hacen.  Ya te ocuparás del cómo más adelante.

Usar funciones (la expresión de llamada) no debería resultar nada
nuevo, porque es complétamente análogo al uso de funciones en
matemáticas.  Cuando se utiliza una función, como :math:`max(x,y)`
no nos preocupa cómo está definida, sino simplemente lo que hace, como
si se tratara de una caja negra, y la utilizamos sin ni siquiera
pensar en la definición.





Recursión
---------

*Ejercicio: Implementar el factorial de forma iterativa y recursiva*

.. code:: python

    def fact(n):
        if (n < 2):
            return 1
        return n*fact(n-1)

.. code:: python

    def fact_iter(n):
        res = 1
        for i in range(n,1,-1):
            res *= i
        return res

.. code:: python

    assert(fact(10) == fact_iter(10))

*Ejercicio: implementar una función para saber si un texto es
palíndromo.*

.. code:: python

    def es_palindromo(texto):
        return es_simetrico(extraer_letras(texto))
    
    def extraer_letras(texto):
        letras = ''
        for c in texto.lower():
            if c.isalpha():
                letras += c
        return letras
    
    def es_simetrico(s):
        if len(s) < 2:
            return True
        return s[0] == s[-1] and es_simetrico(s[1:-1])

.. code:: python

    print(es_palindromo('Dabale arroz a la zorra el abad.'))


.. parsed-literal::

    True


Recursión
---------

*Ejercicio: Implementar de forma recursiva un programa que dibuje la
curva de Koch*

Este tipo de dibujos se puede hacer facilmente con el módulo ``turtle``
de la biblioteca estándar. Nosotros vamos a usar una versión de
``turtle`` que funciona en los cuadernos. Se llama ``mobilechelonian``
pero funciona igual que ``turtle``.

.. code:: python

    def koch(t, N, n=None):
        if n == None:
            n = N
        if n == 0:
            t.forward(400/3**N)
            return
        for angulo in (-60, 120, -60, 0):
            koch(t, N, n-1)
            if angulo < 0:
                t.left(-angulo)
            else:
                t.right(angulo)

.. code:: python

    from mobilechelonian import Turtle
    
    t = Turtle()
    t.speed(10)
    t.penup()
    t.goto(-200,0)
    t.pendown()
    t.pensize(3)
    koch(t, 4)
    t.penup()
    t.home()

