
Elementos de un programa
========================

Un lenguaje de programación es más que un mecanismo para decirle al
ordenador qué operaciones tiene que realizar. Sirve también como un
entorno en el que organizar nuestras ideas sobre procesos
computacionales.  Los programas sirven para comunicar esas ideas a los
miembros de la comunidad.  Es decir, los programas tienen que
escribirse fundamentalmente para que la gente los lea y eventualmente
para que el ordenador los ejecute.

No pierdas esta idea de vista en ningún momento.  El objetivo no es
que el programa haga lo que se desea, sino que lo exprese de la forma
más clara posible.

Prácticamente todos los lenguajes de propósito general incluyen tres
tipos de elementos:

- Sentencias y expresiones **primitivas**, que representan los bloques
  más simples proporcionados por el lenguaje.

- Mecanismos de **combinación**, con los que se construyen elementos
  compuestos a partir de otros más sencillos.

- Mecanismos de **abstracción**, mediante los que se puede dar nombre
  a los elementos compuestos y usarlos como elementos nuevos sin
  atender a los detalles internos.

Si recapacitas en lo que vimos en el capítulo anterior hemos visto un
poco de todo.  Las cadenas de texto como ``'Hola Mundo'``, los
números, o los nombres de las variables son expresiones primitivas.
Las sentencias de asignación o las sentencias en las que simplemente
llamábamos a una función son sentencias primitivas.

La :term:`sentencia *if*`, o el :term:`bucle *while*` son formas de
combinar sentencias que se ejecutan en unos casos pero no en otros.
El conjunto de la :term:`sentencia *if*` junto a todas las sentencias
indentadas después de la condición se comportan como una única
sentencia compuesta.  También las expresiones que combinan varias
expresiones primitivas con la ayuda de operadores son expresiones
compuestas.

Finalmente el uso de variables para almacenar resultados de
expresiones o la definición de funciones son mecanismos de abstracción
proporcionados por Python.

.. tip:: *Cuando aprendemos un lenguaje tenemos que prestar atención
         especial a los mecanismos que aporta el lenguaje para
         combinar ideas sencillas para formar ideas más complejas.*

         `John DeNero <http://www.composingprograms.com/pages/12-elements-of-programming.html>`_


En este capítulo debes aprender a usar expresiones simples y
compuestas.  Es especialmente importante entender la expresión de
llamada a función.  La regularidad de las expresiones de llamada las
hace especialmente interesantes para la composición, no se necesitan
reglas de precedencia y las propias funciones pueden pasarse como
argumentos a otras funciones.


Expresiones primitivas y compuestas
-----------------------------------

Las expresiones primitivas y las sentencias primitivas son los bloques
constructivos básicos de un lenguaje como Python.  Las expresiones
expresan un cómputo o resultados que pueden utilizarse para hacer
otros cómputos, mientras que las sentencias dictan qué tiene que hacer
el ordenador con esos cómputos.  Por ejemplo, una expresión puede ser
un número, una sentencia podría indicar que se imprima por pantalla, o
que se almacene en una variable.

Una expresión puede utilizarse como elemento constructivo para
construir otra expresión. Por ejemplo, una expresión de división tiene
dos operandos (numerador y denominador) y un operador (el operador de
división). El resultado de la división es un número y por tanto puede
a su vez ser parte de otra expresión aritmética.

Esta expresión de suma cuyos operandos son a su vez expresiones
aritméticas se llama expresión compuesta. Es uno de los mecanismos de
composición que proporciona Python.

.. code::

   1/2 + 1/4

La evaluación sigue un orden especial dictado por la precedencia de
los operadores.  Por ejemplo, las divisiones de la expresión anterior
se evalúan antes que la suma, aunque la suma aparezca antes que la
segunda división.

La clase de expresión compuesta más importante es la expresión de
llamada, que aplica una función a unos argumentos. En sentido
matemático una función es una correspondencia de unos argumentos de
entrada con un valor de salida.  Por ejemplo, la función ``max`` hace
corresponder el conjunto de valores de entrada con un único valor que
es el mayor de los los de entrada.  En Python esto se expresa igual que
en matemáticas.

.. code::

    max(9.5, 7.5)


Esta expresión de llamada tiene subexpresiones: el operador es la
subexpresión que precede al paréntesis. Los paréntesis rodean la lista
de subexpresiones de los operandos, separados por comas.

El operador especifica una función. Cuando se evalúa esta expresión de
llamada decimos que la función ``max`` es llamada con los argumentos
7.5 y 9.5 y devuelve el valor 9.5.

El orden de los argumentos en una expresión de llamada importa.  Por
ejemplo, la función pow eleva su primer argumento a la potencia
indicada en su segundo argumento.

.. activecode:: orden-argumentos-importa
   :nocodelens:

   print(pow(100,2))
   print(pow(2,100))

Los enteros de Python pueden representar números arbitrariamente
grandes. Python cuando lo necesita utiliza enteros largos, menos
eficientes que los enteros normales con los que suele trabajar un
ordenador, pero capaces de representar cualquier cantidad de dígitos.

Los operadores aritméticos también podemos verlos como funciones.

.. activecode:: importar-operadores
   :nocodelens:

   from operator import add, sub, mul, div

Lo siguiente es un ejemplo de llamada al operador ``+`` (suma) usando
notación de llamada a función.

.. activecode:: suma-con-funcion
   :nocodelens:
   :include: importar-operadores

   print(add(1,3))


Notación funcional
~~~~~~~~~~~~~~~~~~

La notación funcional tiene una serie de ventajas:

-  Primero se extiende de forma natural a cualquier número de
   argumentos.

   .. activecode:: max-n-argumentos
      :nocodelens:

      print(max(1,-2,3,-4))

-  Segundo se extiende fácilmente a expresiones anidadas, donde los
   elementos son a su vez expresiones compuestas. La estructura del
   anidamiento es completamente explícita, a diferencia de las
   expresiones infijas compuestas.

   .. activecode:: expr-funcional-compuesta
      :nocodelens:

      print(max(min(1, -2), min(pow(3, 5), -4)))


-  Tercero, la notación matemática infija tiene una amplia variedad de
   formas de representación, que en algunos casos es muy difícil de
   teclear en un ordenador. Piensa por ejemplo en el signo de la raiz
   cuadrada, o las fracciones. En cambio, la notación funcional es
   completamente homogénea y fácil de teclear. Incluso los operadores
   matemáticos habituales pueden expresarse con notación funcional.

   .. activecode:: expr-arit-func-compuesta
      :nocodelens:

      from operator import add, sub, mul
      print(mul(add(2,mul(4, 6)), add(3, 5)))


Tipos de datos en Python
------------------------

Las expresiones de Python, tanto las simples como las compuestas, tienen
un tipo asociado. Por ejemplo, examina el tipo de las siguientes
expresiones:

.. activecode:: ejemplo-cadenas

   saludo = 'Hola'
   quien = 'Mundo'
   mensaje = saludo + ', ' + quien
   print(type(mensaje), mensaje)

El tipo de una expresión puede averiguarse con la función ``type``.
Como puedes comprobar el tipo de la expresión resultante de sumar
cadenas de texto es ``<class 'str'>``.  Es decir, otra cadena de
texto.

.. activecode:: ejemplo-enteros

   a = 63
   b = 7
   c = a + b
   print(type(c), c)

El tipo de la expresión resultante de una suma de enteros es
``'int'``. Es decir, otro entero.

.. activecode:: ejemplo-enteros-hidden
   :nocanvas:

   a = 63
   b = 7
   c = a + b


.. activecode:: ejemplo-comparacion
   :include: ejemplo-enteros-hidden

   mayor = a > 3
   print(type(mayor), mayor)

El tipo de una comparación es ``<class 'bool'>``.  Corresponde a un
tipo *booleano*, que solo puede tomar dos valores: ``True``
(verdadero) y ``False`` (falso).

Algunas veces es posible combinar operandos de distinto tipo en una
expresión.

.. activecode:: ejemplo-cadena-entero
   :include: ejemplo-cadenas

   triple = saludo * 3
   print(type(triple), triple)

Multiplicar una cadena por un entero equivale a una nueva cadena que
repite la cadena original tantas veces como indique el entero.

.. activecode:: ejemplo-complejos
   :include: ejemplo-enteros

   d = .5j
   e = a + d
   print(type(e), e)

No todas las combinaciones de operadores y tipos son posibles. Algunas
no tienen sentido. En ese caso Python se queja imprimiendo un error.

.. activecode:: error-semantica-estatica
   :include: ejemplo-cadenas

   error = saludo / 3
   print(type(error), error)

La segunda línea no llega a ejecutarse porque con anterioridad se
produce un error.

Utiliza ``type`` para determinar el tipo de la expresión
``pow(2,20)``.

.. activecode:: busca-tipo-expr
   :include: ejemplo-cadenas

   a = pow(2,20)
   # ¿Cuál es el tipo de a?


.. mchoice:: q-elem-type
   :answer_a: &lt;class 'int'&gt;
   :answer_b: &lt;class 'float'&gt;
   :answer_c: &lt;class 'str'&gt;
   :answer_d: &lt;class 'builtin_function_or_method'&gt;
   :correct: a
   :feedback_a: Muy bien, la función ``pow`` devuelve un entero si sus
                argumentos son enteros.  Prueba a usar argumentos con
                punto decimal.
   :feedback_b: La función ``pow`` solo devuelve algo de este tipo
                (real) si alguno de sus argumentos es también real.
   :feedback_c: No hay forma de que ``pow`` devuelva una cadena. ¿No
                habrás puesto la expresión entre comillas?
   :feedback_d: La propia función ``pow`` es una función predefinida,
                pero su aplicación a los argumentos que indicamos no.

   ¿Cuál es el tipo de ``pow(2,20)``?


Funciones
---------

La llamada a función es una expresión compuesta esencial. Uno de los
mecanismos de composición más potentes.  La definición de funciones de
usuario es otra construcción esencial, uno de los principales
mecanismos de abstracción.

Por ejemplo, considera este ejemplo. Queremos encontrar un método para
encontrar la raiz cúbica de un número entero que asumimos que tiene una
raiz exacta.  De momento sabemos solamente la definición de la raiz
cúbica:

 :math:`x` es raiz cúbica de :math:`y` sii :math:`x^3 = y`

Ésto mismo se puede expresar en Python.

.. activecode:: raiz-cubica-entera
   :nocodelens:
   :nocanvas:

   def cubo(x):
      return x ** 3
    
   def es_raiz_cubica(raiz, num):
      return cubo(raiz) == num

Éste es **conocimiento declarativo**, sabemos hechos matemáticamente
ciertos porque se derivan de definiciones y axiomas. Pero este
conocimiento no nos permite por sí solo encontrar una solución a
nuestro problema, un método para encontrar la raiz cuadrada de un
número entero.

El conocimiento declarativo se complementa con el **conocimiento
imperativo** que expresa cómo debe encontrar la solución al problema.
Por ejemplo, en nuestro ejemplo podría hacerse por :term:`enumeración
exhaustiva`.

.. activecode:: raiz-cubica-e-exhaustiva
   :include: raiz-cubica-entera

   def raiz_cubica(num):
       n = 1
       while not es_raiz_cubica(n, num):
           n = n + 1
       return n

El método que hemos utilizado es la **:term:`enumeración exhaustiva`**
de todos los números hasta encontrar la respuesta correcta. Los
ordenadores son increíblemente rápidos y muchas veces este método
puede generar una respuesta en un tiempo pequeño.

La :term:`enumeración exhaustiva` es un método muy sencillo de
implementar, pero no siempre es utilizable. En muchas ocasiones el
número de posibles respuestas es tan elevado que no podemos
enumerarlas todas en un tiempo razonable.

Examina el ejemplo anterior para distintos valores. Por ejemplo:

.. activecode:: python
   :include: raiz-cubica-e-exhaustiva

   print(raiz_cubica(8))
   print(raiz_cubica(1971935064))

¿Qué pasaría si se llama con el argumento 9? ¿Qué debería devolver? No
son preguntas que debas saber a priori, ni preguntas con trampa. Piensa
cómo debería comportarse según tu propio criterio.
