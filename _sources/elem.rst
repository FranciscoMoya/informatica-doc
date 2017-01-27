
Elementos de programación
=========================

En esta sesión debes aprender a usar expresiones simples y compuestas.
Es especialmente importante entender la expresión de llamada a función.
La regularidad de las expresiones de llamada las hace especialmente
interesantes para la composición, no se necesitan reglas de precedencia
y las propias funciones pueden pasarse como argumentos a otras
funciones.

.. code:: python

    max(9.5,7.5)




.. parsed-literal::

    9.5



El orden de los argumentos importa. Por ejemplo:

.. code:: python

    pow(100,2)




.. parsed-literal::

    10000



.. code:: python

    pow(2,100)




.. parsed-literal::

    1267650600228229401496703205376



Los enteros de Python pueden representar números arbitrariamente
grandes. Python cuando lo necesita utiliza enteros largos, menos
eficientes que los enteros normales con los que suele trabajar un
ordenador, pero capaces de representar cualquier cantidad de dígitos.

Los operadores aritméticos también podemos verlos como funciones.

.. code:: python

    from operator import add

Lo siguiente es un ejemplo de llamada al operador + (suma) usando
notación de llamada a función.

.. code:: python

    add(1,3)




.. parsed-literal::

    4



Notación funcional
------------------

La notación funcional tiene una serie de ventajas:

-  Primero se extiende de forma natural a cualquier número de
   argumentos.

.. code:: python

    max(1,-2,3,-4)




.. parsed-literal::

    3



-  Segundo se extiende fácilmente a expresiones anidadas, donde los
   elementos son a su vez expresiones compuestas. La estructura del
   anidamiento es completamente explícita, a diferencia de las
   expresiones infijas compuestas.

.. code:: python

    max(min(1, -2), min(pow(3, 5), -4))




.. parsed-literal::

    -2



-  Tercero, la notación matemática infija tiene una amplia variedad de
   formas de representación, que en algunos casos es muy difícil de
   teclear en un ordenador. Piensa por ejemplo en el signo de la raiz
   cuadrada, o las fracciones. En cambio, la notación funcional es
   completamente homogénea y fácil de teclear. Incluso los operadores
   matemáticos habituales pueden expresarse con notación funcional.

.. code:: python

    from operator import add, sub, mul
    
    mul(add(2,mul(4, 6)), add(3, 5))




.. parsed-literal::

    208



Tipos de datos en Python
------------------------

Las expresiones de Python, tanto las simples como las compuestas, tienen
un tipo asociado. Por ejemplo, examina el tipo de las siguientes
expresiones:

.. code:: python

    saludo = 'Hola'
    quien = 'Mundo'
    saludo + ', ' + quien




.. parsed-literal::

    'Hola, Mundo'



.. code:: python

    a = 63
    b = 7
    a + b




.. parsed-literal::

    70



.. code:: python

    a > 3




.. parsed-literal::

    True



Algunas veces es posible combinar operandos de distinto tipo en una
expresión.

.. code:: python

    saludo * 3




.. parsed-literal::

    'HolaHolaHola'



.. code:: python

    d = .5j
    a + d




.. parsed-literal::

    (63+0.5j)



No todas las combinaciones de operadores y tipos son posibles. Algunas
no tienen sentido. En ese caso Python se queja.

.. code:: python

    saludo / 3


::


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    <ipython-input-17-28c1817cc477> in <module>()
    ----> 1 saludo / 3
    

    TypeError: unsupported operand type(s) for /: 'str' and 'int'


En caso de duda puedes pregunta al propio intérprete de Python el tipo
de una expresión.

.. code:: python

    print(type(pow(2, 600)))
    print(type(saludo))


.. parsed-literal::

    <class 'int'>
    <class 'str'>


Funciones
---------

La llamada a función es una expresión compuesta esencial. Uno de los
mecanismos de composición más potentes.

La definición de funciones de usuario es otra construcción esencial, uno
de los principales mecanismos de abstracción.

Por ejemplo, considera este ejemplo. Queremos encontrar un método para
encontrar la raiz cúbica de un número entero que asumimos que tiene una
raiz exacta. De momento sabemos solamente la definición de la raiz
cúbica: *:math:`x` es raiz cúbica de :math:`y` sii :math:`x^3 = y`*.
Ésto mismo se puede expresar en Python.

.. code:: python

    def cubo(x):
        return x ** 3
    
    def es_raiz_cubica(raiz, num):
        return cubo(raiz) == num

Éste es **conocimiento declarativo**, sabemos hechos matemáticamente
ciertos porque se derivan de definiciones y axiomas. Pero este
conocimiento no nos permite por sí solo encontrar una solución a nuestro
problema, un método para encontrar la raiz cuadrada de un número entero.

El conocimiento declarativo se complementa con el **conocimiento
imperativo** que expresa cómo debe encontrar la solución al problema.
Por ejemplo, en nuestro ejemplo podría hacerse por enumeración
exhaustiva.

.. code:: python

    def raiz_cubica(num):
        n = 1
        while not es_raiz_cubica(n, num):
            n = n + 1
        return n

El método que hemos utilizado es la **enumeración exhaustiva** de todos
los números hasta encontrar la respuesta correcta. Los ordenadores son
increíblemente rápidos y muchas veces este método puede generar una
respuesta en un tiempo pequeño.

La enumeración exhaustiva es un método muy sencillo de implementar, pero
no siempre es utilizable. En muchas ocasiones el número de posibles
respuestas es tan elevado que no podemos enumerarlas todas en un tiempo
razonable.

Examina el ejemplo anterior para distintos valores. Por ejemplo:

.. code:: python

    print(raiz_cubica(8))
    print(raiz_cubica(1971935064))


.. parsed-literal::

    2
    1254


¿Qué pasaría si se llama con el argumento 9? ¿Qué debería devolver? No
son preguntas que debas saber a priori, ni preguntas con trampa. Piensa
cómo debería comportarse según tu propio criterio.

