
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

Por ejemplo, sea la función matemática siguiente:

.. math::

   h(x,y) = \sqrt{x^2 + y^2}

Es fácil adivinar que se trata de la longitud de la hipotenusa de un
triángulo dadas las longitudes de los catetos.  ¿Te has parado alguna
vez a pensar qué significa :math:`x` e :math:`y`? Fuera de la
definición de la función no tienen ningún significado.  Son solo
símbolos que representan al primer y al segundo argumento, sea cual
sea.  Esto permite construir fácilmente sobre ellas.  Por ejemplo, la
distancia entre dos puntos en el plano.

.. math::

   d(\boldsymbol{a}, \boldsymbol{b}) = h(\|a_x - b_x\|, \|a_y - b_y\|)

Usamos :math:`h` pero ya no hay :math:`x` ni :math:`y`.  La definición
de la función :math:`h` vale para cualquier argumento que utilicemos
al llamarla.  Los nombres :math:`x` e :math:`y` sirven para referirse
al primer y al segundo argumento respectivamente en la definición de
la función :math:`h`, pero no tienen sentido fuera.  Es más, si
utilizamos :math:`x` e :math:`y` fuera de la definición de :math:`h`
nos referimos a otra cosa completamente diferente.  Por ejemplo:

.. math::

   f(x) = \sin(x)/x

Otra vez aparece :math:`x` pero no tiene nada que ver.  Ahora nos
referimos al único argumento de la función :math:`f`.

Estos símbolos que representan a cualquier argumento que se utilice
cumplen claramente una función de abstracción, de eliminar detalle
innecesario para concentrarnos en lo fundamental.  De hecho tiene un
nombre, la *abstracción lambda*.  

La experiencia nos dice que muchos alumnos tienen una sorprendente
dificultad en entender la abstracción lambda en un lenguaje de
programación, pero llevan años usándola en matemáticas.  Por eso hemos
querido presentarte la abstracción lambda en términos puramente
matemáticos.  Las funciones de un lenguaje de programación no son
diferentes en absoluto.

Pero los mecanismos de abstracción que proporcionan las funciones van
mucho más allá de la abstracción lambda.  Fundamentalmente sirven para
organizar el pensamiento y para entender el programa.  Así que en
Informática no vamos a utilizar habitualmente nombres tan poco
descriptivos como :math:`h`.  En Python sería más apropiado algo de
este estilo.

.. code::

   def norma(x,y):
       from math import sqrt
       return sqrt(x**2 + y**2)

No es muy diferente a la versión puramente matemática.  Algo más de
texto, pero esencialmente igual.  Hemos usado un nombre simbólico
`norma` que corresponde claramente con lo que calcula, la norma de un
vector expresado en coordenadas cartesianas.  Sería más natural que
solo tuviera un argumento, el vector.  Más adelante aprenderemos cómo
pasar un argumento que incluye ambas coordenadas.

Ámbitos de declaración
----------------------



Especificación de software
--------------------------




Recursión
---------

La recursión no es más que el uso de una función en la propia
definición de la función, o en una función que es llamada desde la
definición.  No tiene nada de particular y se utiliza desde siempre en
matemáticas en las definiciones inductivas.  Por ejemplo, el término
n-simo de la sucesión de Fibonacci.

.. math::

   f(n) = \begin{cases}
               0               & n = 0\\
               1               & n = 1\\
               f(n-1) + f(n-2) & \text{en otro caso}
           \end{cases}, n \in \mathbb{Z^+}

Evidentemente es fácil equivocarse, y frecuentemente conduce al
aparente bloqueo del ordenador. ¿Adivinas por qué?  Es fácil, si el
programa no pasa por un camino por el que no se llama otra vez a la
función, no terminará nunca.


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

