
Ramificación e iteración
========================

Ramificación e iteración son los dos mecanismos básicos que aporta
Python para controlar el flujo del programa más allá de la secuencia
normal de ejecución.

Ramificación
------------

La sentencia básica de ramificación es el *if*. Veamos unos ejemplos:

-  Imprimir por pantalla si un número *x* es par o impar.

.. code:: python

    def es_par(n):
        return n % 2 == 0
    
    x = 122
    if es_par(x):
        print(x, 'es par')
    else:
        print(x, 'es impar')


.. parsed-literal::

    122 es par


-  Encontrar el mínimo de los números x, y, z.

.. code:: python

    x, y, z = 500, 250, 100
    
    if x < y and x < z:
        print('x es el menor')
    elif y < z:
        print('y es el menor')
    else:
        print('z es el menor')


.. parsed-literal::

    z es el menor


-  Imprimir por pantalla los números x, y, z en orden creciente.

.. code:: python

    x, y, z = 13, 5, 10
    
    if x <= y and x <= z:
        print(x, end=' ')
        if y < z:
            print(y, z)
        else:
            print(z, y)
    elif y <= z:
        print(y, end=' ')
        if x < z:
            print(x, z)
        else:
            print(z, x)
    else:
        print(z, end=' ')
        if x < y:
            print(x, y)
        else:
            print(y, x)



.. parsed-literal::

    5 10 13


¿No te parece excesivamente largo para un problema tan pequeño?

Puedes apostar a que no es la mejor solución, pero es un buen ejemplo de
*if*.

No te voy a dejar con ese mal sabor de boca, vamos a escribirlo bien.

.. code:: python

    print(sorted([x, y, z]))


.. parsed-literal::

    [5, 10, 13]


No solo es mucho más corto, es además más general porque permite
aplicarlo a cualquier número de argumentos.

Esos corchetes seguro que ahora mismo no te resultan familiares, pero
pronto serán de la familia. De todas formas los podemos quitar de la
salida y dejarla igual que antes.

.. code:: python

    print(' '.join(map(str,sorted([x,y,z]))))


.. parsed-literal::

    5 10 13


¿Parece chino? Es lo que suele pasar con las bibliotecas de funciones.
Si sabes usarlas puedes ahorrar gran cantidad de tiempo, pero saber
usarlas requiere también tiempo y dedicación. En este curso solo
pretendemos que desarrolles tu pensamiento computacional. Pero recuerda
que para la vida real necesitas invertir tiempo y esfuerzo en conocer lo
que ya tienes disponible y aprender en qué situaciones puede resultarte
útil.

Por esta vez voy a explicártelo en detalle, pero intenta usar la
documentación oficial de http://docs.python.org para entender lo que
hacen los programas que veremos más adelante.

Seguramente habrás adivinado que ``sorted`` es una función que devuelve
una versión ordenada de lo que se le pasa como argumento. Lo que pasamos
como argumento a sorted es una *lista*, un tipo de objeto de Python que
agrupa una secuencia de objetos.

Por tanto ``[x, y, z]`` no es más que una lista que contiene la
secuancia de elementos ``x``, ``y``, ``z`` y ``sorted([x,y,z])`` es una
versión ordenada de esa lista.

.. code:: python

    sorted([x,y,z])




.. parsed-literal::

    [5, 10, 13]



Si queremos que la lista se muestre con otro formato no tenemos más
remedio que imprimir nosotros cada elemento en lugar de usar ``print``.
Usar ``join`` es una de las posibilidades, pero para entenderlo vamos a
tener que explicar alguna otra cosilla.

Todos los objetos de Python tienen funciones asociadas que operan con
esos objetos. Son funciones que no tienen sentido sin un objeto de un
tipo concreto. Por ejemplo, los objetos de tipo *cadena de texto* tienen
una función asociada ``lower`` que convierte la cadena a minúsculas
(*lowercase* en inglés).

.. code:: python

    s = 'Hola, Mundo'
    s.lower()




.. parsed-literal::

    'hola, mundo'



Como puedes ver para llamar a esas funciones especiales (se llaman
**métodos**) se usa el objeto sobre el que se aplicará, seguido de un
punto, y seguido de la llamada a la función.

Uno de los métodos disponibles en las cadenas de texto es el método
``join``. Este método acepta una lista de cadenas de texto que
concatenará en una única cadena de texto usando la cadena sobre la que
se invoca ``join`` como separador.

.. code:: python

    ', '.join(['Pepe', 'Paco', 'Juan'])




.. parsed-literal::

    'Pepe, Paco, Juan'



El método ``join`` hace algo claramente parecido a lo que queremos hacer
pero no del todo. Si intentamos pasar a ``join`` una lista de números la
cosa no funciona.

.. code:: python

    ' '.join([1, 2, 3])


::


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    <ipython-input-26-a6f03119863b> in <module>()
    ----> 1 ' '.join([1, 2, 3])
    

    TypeError: sequence item 0: expected str instance, int found


Por tanto tenemos que transformar esa lista de enteros en una lista de
cadenas de texto que representan esos numeros. Eso se puede hacer
llamando a la función ``str`` con cada número.

.. code:: python

    str(25) + str(10)




.. parsed-literal::

    '2510'



.. code:: python

    ' '.join([str(x), str(y), str(z)])




.. parsed-literal::

    '13 5 10'



Pero no son en ese orden, sino en el que resulte de la lista ordenada.
Hay muchas formas de hacerlo pero nosotros todavía no hemos visto
bucles, así que os proponía usar la función ``map``, que aplica una
función a todos los elementos de una lista. Por ejemplo:

.. code:: python

    def cuadrado(x):
        return x*x
    
    print(map(cuadrado, [1, 2, 3, 4, 5]))


.. parsed-literal::

    <map object at 0x000000830E5F2208>


¿No se parece a lo que te decía? En Python 3 ``map`` se optimiza usando
*generadores*. Se trata de un objeto especial que va aplicando la
función ``cuadrado`` solamente para los elementos que se van accediendo.
Si no se accede a algún elemento se ahorra la llamada. Por ejemplo:

.. code:: python

    for x in map(cuadrado, [1, 2, 3, 4, 5]):
        print(x,end=' ')


.. parsed-literal::

    1 4 9 16 25 

En nuestro caso la función a aplicar es la función ``str`` para
convertir cada elemento de la lista a una cadena de texto.

.. code:: python

    ' '.join(map(str, sorted([x, y, z])))




.. parsed-literal::

    '5 10 25'



De todas formas existe una forma más sencilla de hacer lo mismo usando
otra característica de Python. El operador ``*`` aplicado a una lista o
similar sirve para desempaquetar los elementos. Por ejemplo, de esta
forma pasamos cada elemento de la lista ordenada como argumentos
independientes de ``print``.

.. code:: python

    print(*sorted([x,y,z]))


.. parsed-literal::

    5 10 25


Hemos visto suficiente de ejecución condicional como para hacer con
facilidad todos los ejercicios del curso, pero no quiero cerrar la
sección sin mostrar otras posibilidades que ofrece Python de ejecución
condicional. El operador ternario ``if``/``else`` permite evaluar
expresiones de forma condicional. En el siguiente ejemplo el valor de
``y`` depende del valor de ``x``. Si ``x`` es par ``y`` toma el valor
``x/2``, en caso contrario ``y`` toma el valor ``x``.

.. code:: python

    x = 124
    y = x/2 if es_par(x) else x
    print(y)


.. parsed-literal::

    62.0


El operador ``if``/``else`` es distinto a la sentencia ``if``/``else``
aunque usan las mismas palabras reservadas. En este caso no usamos los
dos puntos para marcar inicios de bloque de sentencias.

Iteración
---------

Los bucles son construcciones que permiten volver atrás en la secuencia
de sentencias. Cada ejecución del grupo de sentencias que compone el
cuerpo del bucle se le llama **iteración**.

El más general es el bucle ``while`` que repite un bloque de sentencias
mientras se verifique una condición booleana y que ya conocemos de
ejemplos anteriores. Volvamos a un ejemplo conocido.

-  Encontrar la raiz cúbica de un número natural ``n``

.. code:: python

    def raiz_cubica(n):
        i = 1
        while i**3 < n:
            i = i + 1
    
        if i**3 == n:
            return i

Es un ejemplo de enumeración exhaustiva. Pasamos por todas las
posibilidades comprobando si alguna de ellas es la respuesta correcta.
¿Y qué pasa si el número ``n`` no tiene una raiz cúbica perfecta?
Nuestro algoritmo no sabe de números reales.

No hay una respuesta universal para esta pregunta, pero aquí te
proponemos una posibilidad, no devolver nada. Otra posibilidad es
devolver ``False`` y otra es utilizar un mecanismo de control de errores
denominado *excepción*.

Con nuestra propuesta la función puede utilizarse con seguridad así:

.. code:: python

    x = 9
    if None == raiz_cubica(x):
        print(x, 'no tiene raiz cúbica perfecta')
    else:
        print(raiz_cubica(x))


.. parsed-literal::

    9 no tiene raiz cúbica perfecta


A lo mejor este ejemplo es muy sencillo y tú mismo ves que el algoritmo
es fácil de entender, pero las cosas en la vida real no suelen ser tan
fáciles. En general nos vamos a enfrentar al problema de saber si lo que
hemos escrito está bien o no hemos entendido todos los casos posibles.
¿Cómo sabemos que el bucle que hemos escrito termina alguna vez? ¿Cómo
sabemos que no se queda indefinidamente en él?

La respuesta es que debemos buscar una **función de decremento**. No hay
que escribirla en el programa y en muchos casos ni siquiera hay que
escribirla en papel, pero tiene que existir. Una *función de decremento*
tiene que cumplir cuatro características básicas:

-  Se trata de una función que hace corresponder números enteros a
   valores de las variables del programa
   :math:`f:V \rightarrow \mathbb{Z}`.
-  Cuando el programa entra en el bucle tiene que tomar un valor no
   negativo.
-  Cuando la función de decremento toma un valor <= 0 el programa debe
   salir del bucle.
-  En cada iteración del bucle la función toma un valor menor que en la
   anterior iteración (de ahí el nombre de *función de decremento*).

Por ejemplo, en el caso anterior la función de decremento es
:math:`f(i,n) = n - i^3`. Al entrar en el bucle con ``n = 27`` toma el
valor 26. En cada iteración se incrementa ``i``, por lo que se
decrementa la función (toma los valores 26, 19, 0). La condición de
permanencis en el bucle es precisamente la que impone la *función de
decremento*, :math:`f(i,n) > 0`, es decir, :math:`n < i^3`.

Otra forma de iteración soportada por Python es el bucle ``for``. En
este caso una variable toma una secuencia de valores que se indica.

.. code:: python

    for i in [1, 2, 3, 4]:
        print(i)


.. parsed-literal::

    1
    2
    3
    4


Para crear secuencias de valores es muy conveniente el uso de la función
``range``.

.. code:: python

    range(10)




.. parsed-literal::

    range(0, 10)



Este rango contiene todos los valores desde 0 hasta el límite marcado
sin contarlo. Podemos verlo usando nuevamente el operador ``*`` para
expandir el rango:

.. code:: python

    print(*range(10))


.. parsed-literal::

    0 1 2 3 4 5 6 7 8 9


También podemos especificar los límites inferior y superior. El límite
inferior está incluído en el rango.

.. code:: python

    print(range(5,10))


.. parsed-literal::

    range(5, 10)


Por último se puede especificar el incremento, de manera que solo se
incluya uno de cada *n* números del rango. Por ejemplo:

.. code:: python

    print(*range(1, 20, 2))


.. parsed-literal::

    1 3 5 7 9 11 13 15 17 19


Ambos tipos de bucle pueden utilizarse en la mayoría de las situaciones.
Es quizás más sencillo buscar la *función de decremento* en el caso del
``while`` pero también suele ser algo más largo. Cuál usar es cuestión
de gustos o conveniencia. Para recorrer elementos en una secuencia el
``for`` seguramente será más apropiado, mientras que para hacer un
número de iteraciones que depende de los valores calculados el ``while``
es más natural.

Veamos el ejemplo de la raiz cúbica con ``for``.

.. code:: python

    def raiz_cubica(n):
        for i in range(n + 1):
            if i**3 >= n: break
    
        if i**3 == n:
            return i

Las cadenas de texto también pueden ser recorridas carácter a carácter
con un bucle for.

.. code:: python

    for i in 'Hola':
        print(i)


.. parsed-literal::

    H
    o
    l
    a


El bucle ``for`` tiene otra forma interesante, con ayuda de la función
``enumerate``, en la que además de recorrer los elementos de la
secuencia también recorre las posiciones de esos elementos.

.. code:: python

    for posicion, nombre in enumerate(['Pedro', 'Paco', 'Luis', 'Pocoyo', 'Marshall']):
        print(posicion, ':', nombre)


.. parsed-literal::

    0 : Pedro
    1 : Paco
    2 : Luis
    3 : Pocoyo
    4 : Marshall


