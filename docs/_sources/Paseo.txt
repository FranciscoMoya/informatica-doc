
Un paseo con Python
===================

Cuando se ejecuta el intérprete de Python sin indicar un programa,
Python funciona de forma interactiva. Cada vez que se escribe una
expresión Python escribe automáticamente su resultado. Por tanto Python
puede usarse como simple calculadora interactiva.

.. code:: python

    50 - 5*6




.. parsed-literal::

    20



Si pruebas este mismo fragmento en un módulo de IDLE no imprimirá nada,
porque IDLE utiliza el intérprete de Python de forma no interactiva. Se
edita el programa completo en la ventana del módulo y una vez completado
se ejecuta. En este modo de funcionamiento aunque realiza los mismos
cálculos no imprime el resultado de las expresiones a menos que se pida
explícitamente.

Si quieres imprimir el resultado de la expresión anterior debes usar la
función print (imprime). Esto también funciona en modo interactivo.

.. code:: python

    print(50 - 5*6)


.. parsed-literal::

    20


Funciona como una calculadora algebraica normal, con los operadores
aritméticos habituales, incluyendo paréntesis.

.. code:: python

    (50 - 5*6)/4




.. parsed-literal::

    5



El doble asterisco es el operador de exponenciación. Los decimales se
indican con un punto.

.. code:: python

    (2**16 + 2**8 + 2**4) / 1000.0




.. parsed-literal::

    65.808



Python diferencia entre la división ``/`` que produce un número real y
la división entera ``//`` que produce solo la parte entera de la
división.

.. code:: python

    (2**16 + 2**8 + 2**4) // 1000




.. parsed-literal::

    65



Las expresiones tienen un **tipo** asociado. Enteros, numeros reales o
cadenas de texto son ejemplos de tipos. El resultado de la división es
un real, y el resultado de la división entera es un entero.

De modo interactivo el último resultado se almacena en una *variable*
con nombre \_ que viene muy bien para ahorrar tiempo.

.. code:: python

    iva = 0.21
    precio = 100.5
    precio * iva




.. parsed-literal::

    21.105



.. code:: python

    precio + _




.. parsed-literal::

    121.605



.. code:: python

    round(_,2)




.. parsed-literal::

    121.61



Álgebra matricial
-----------------

Python puede usarse para cálculo vectorial y matricial de forma muy
parecida a MATLAB utilizando la biblioteca NumPy.

.. code:: python

    from numpy import *

Se trabaja con vectores y matrices como si se tratara de números. Por
ejemplo, la suma del cuadrado y el cubo de los primeros 20 números
enteros positivos.

.. code:: python

    a = arange(20)
    a**2 + a**3




.. parsed-literal::

    array([   0,    2,   12,   36,   80,  150,  252,  392,  576,  810, 1100,
           1452, 1872, 2366, 2940, 3600, 4352, 5202, 6156, 7220])



Resolver la ecuación :math:`Ax = b`.

.. code:: python

    A = array([[1, 2, 1], 
               [1, 0, 1], 
               [2, 0, 1]])
    b = array([[1], 
               [3], 
               [4]])
    linalg.solve(A,b)




.. parsed-literal::

    array([[ 1.],
           [-1.],
           [ 2.]])



.. code:: python

    N = 20
    t = linspace(-2*pi, 2*pi, N)
    seno = sin(sin(t))
    ruido = random.normal(0, .1, N)
    seno+ruido




.. parsed-literal::

    array([-0.12492006,  0.67232257,  0.87420753,  0.71643189,  0.55123972,
           -0.29835434, -0.72767628, -0.89018729, -0.80328646, -0.33994442,
            0.22051145,  0.69409006,  0.80901399,  0.53790948,  0.27495212,
           -0.62804698, -0.9349357 , -0.70521792, -0.69355704, -0.10856833])



.. code:: python

    %matplotlib inline
    from matplotlib.pyplot import *
    plot(t, seno, 'k--', t, seno+ruido, 'ro')
    show()



.. image:: Paseo_files/Paseo_23_0.png


Cálculo simbólico
-----------------

También existe una biblioteca ``sympy`` para hacer cálculo simbólico,
similar a lo que puedes realizar con *Mathematica*.

.. code:: python

    from sympy import *
    init_printing()

.. code:: python

    x,y,z = symbols('x y z')

.. code:: python

    integrate(sin(x)+log(y/z)+cos(x*y), x)




.. math::

    x \log{\left (\frac{y}{z} \right )} + \begin{cases} x & \text{for}\: y = 0 \\\frac{1}{y} \sin{\left (x y \right )} & \text{otherwise} \end{cases} - \cos{\left (x \right )}



.. code:: python

    solve(x**2*y - 5*z, x)




.. math::

    \left [ - \sqrt{5} \sqrt{\frac{z}{y}}, \quad \sqrt{5} \sqrt{\frac{z}{y}}\right ]



Gráficos
--------

Con la biblioteca ``matplotlib`` se pueden hacer gráficas muy decentes
con suma facilidad. La interfaz se parece bastante a las gráficas de
*MATLAB*.

.. code:: python

    %matplotlib inline
    from numpy import *
    from matplotlib.pyplot import *

.. code:: python

    def f(t):
        return exp(-t) * cos(2*pi*t)
    
    t1 = arange(0.0, 5.0, 0.1)
    t2 = arange(0.0, 5.0, 0.02)
    
    figure(1)
    
    subplot(211)
    plot(t1, f(t1), 'bo', t2, f(t2), 'k')
    
    subplot(212)
    plot(t2, np.cos(2*np.pi*t2), 'r--')
    
    show()



.. image:: Paseo_files/Paseo_31_0.png


