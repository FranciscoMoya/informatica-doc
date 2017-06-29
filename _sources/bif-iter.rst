
Ramificación e iteración
========================

Un computador está diseñado para ejecutar instrucciones en secuencia.
En condiciones normales las sentencias de Python se ejecutan una
después de otra (ejecución secuencial).  En Python el flujo normal se
representa con una secuencia de sentencias, cada una empieza en una
línea diferente y con el mismo margen a la izquierda.  Una de estas
secuencias se denomina :term:`bloque`.

Ramificación e iteración son los mecanismos básicos que aporta Python
para controlar el flujo del programa más allá de la secuencia normal
de ejecución.  Se consigue con sentencias compuestas, que contienen
bloques de sentencias en su interior, pero que por otro lado se
comportan como una única sentencia.  Veamos las más importantes.

Ramificación
------------

Es necesario emplear sentencias de :term:`bifurcación` o
:term:`ramificación` siempre que se necesite ejecutar un conjunto de
sentencias solo en determinados casos y no en otros.

La sentencia básica de :term:`ramificación` es la *sentencia
if*.  La estructura más simple es la siguiente:

.. parsed-literal::

   if *condición*:
       *bloque_si_cierto*

La *condición* debe tener un valor booleano o debe ser posible
convertirlo a un valor booleano.  Es decir, la *condición* debe poder
evaluarse como uno de los valores ``True`` (cierto) o ``False``
(falso).  Si la *condición* es ``True`` entonces se ejecutará el
*bloque_si_cierto*.  Después sigue con la ejecución secuencial.

.. tip::

   Los bloques como *bloque_si_cierto* no tienen por qué consistir en
   una única instrucción.  Pueden ser varias siempre que tengan el
   mismo nivel de *indentación*, es decir, el ´mismo número de
   espacios antes de cada sentencia.

Todas las sentencias compuestas tienen la misma estructura.  Empiezan
con una :term:`palabra clave` que la identifica, luego pueden aparecer
una serie de elementos sintácticos propios de la sentencia y termina
la línea con un signo ``:`` (dos puntos).  A continuación viene al
menos un bloque de sentencias que debe cambiar su margen respecto a la
:term:`palabra clave`. ¿Cuánto margen?  Da igual, mientras sea
diferente del margen de la palabra clave a Python le da lo mismo.

En el caso de la :term:`sentencia if` existen versiones algo más
complejas, que, no obstante, mantienen la misma estructura.  Por
ejemplo, es posible indicar también un bloque de sentencias que se
ejecuta solo si no se cumple la *condición*:

.. parsed-literal::

   if *condición*:
       *bloque_si_cierto*
   else:
       *bloque_si_falso*

Funciona igual que el caso anterior pero en caso de que la *condición*
se evalúe como ``False`` se ejecutará el bloque de sentencias
*bloque_si_falso*, que sigue a la palabra clave ``else``.  El nuevo
añadido tiene la misma estructura de una sentencia compuesta
cualquiera, pero es parte de la :term:`sentencia *if*`.  Se denomina
:term:`claúsula else`.

Todavía hay otra claúsula más en la :term:`sentencia if`.  Se trata
de la :term:`claúsula elif` que puede repetirse tantas veces como
sea necesario justo antes de la :term:`claúsula else`:

.. parsed-literal::

   if *condición1*:
       *bloque_si_cierto_1*
   elif *condición2*:
       *bloque_si_cierto_2*
   elif *condición3*:
       *bloque_si_cierto_3*
   else:
       *bloque_si_falso*

La palabra clave ``elif`` significa *else if*, es decir, *en caso
contrario, si ...* Es equivalente a una claúsula ``else`` seguida de
una nueva sentencia ``if`` pero es mucho más compacta.  Por ejemplo,
el mismo caso que hemos puesto arriba sin claúsulas *elif* sería algo
así:

.. parsed-literal::

   if *condición1*:
       *bloque_si_cierto_1*
   else:
       if *condición2*:
           *bloque_si_cierto_2*
       else:
           if *condición3*:
               *bloque_si_cierto_3*
           else:
               *bloque_si_falso*

Como puedes ver este código está lleno de márgenes diferentes.  Eso es
extremadamente feo.  Los programas de ordenador, como toda labor
artesanal, tienen también cierto sentido estético.  Un programa de
ordenador bonito debe ser agradable de leer, fácil de entender y
modificar, sin redundancias, sin código innecesario.  Este fragmento
es muy difícil de entender y modificar, así que no lo hagas nunca.

.. tip::

   Las claúsulas *elif* hacen más legible un código como el de arriba.
   Pero debes pararte a pensar antes de usarlas.  Una :term:`sentencia
   if` con claúsulas *elif* es mucho más compleja que un *if* sencillo.
   Procura evitarlas, procura también evitar las claúsulas *else*.

Veamos unos ejemplos:

-  Imprimir por pantalla si un número *x* es par o impar.

   .. activecode:: es-par
      :nocodelens:

      def es_par(n):
          return n % 2 == 0

   .. activecode:: numero-par-o-impar
      :include: es-par

      x = 122
      if es_par(x):
          print(x, 'es par')
      else:
          print(x, 'es impar')

   El mensaje a imprimir es diferente según *x* sea par o impar.  Es
   decir, lo que hay que hacer es diferente según el valor de una
   condición.  Eso claramente nos indica que tenemos que usar una
   sentencia de bifurcación.

   En realidad pronto veremos que podemos evitar hacer cosas
   diferentes en la mayoría de los casos, pero todavía no sabemos
   suficiente Python.

-  Encontrar el mínimo de los números x, y, z.

   .. activecode:: minimo-de-x-y-z

      x, y, z = 500, 250, 100
    
      if x < y and x < z:
          print('x es el menor')
      elif y < z:
          print('y es el menor')
      else:
          print('z es el menor')

   Este ejemplo ilustra dos aspectos interesantes.  Uno es la
   posibilidad de hacer expresiones complejas usando operadores ``x <
   y and x < z``.  Otro es la posibilidad de asignar varias variables
   de golpe en una línea, separando los valores y las variables por
   comas.  Los detalles de esta construcción los veremos más adelante,
   pero empieza a usarla desde ya, ahorra mucho espacio.

-  Imprimir por pantalla los números x, y, z en orden creciente.

   .. activecode:: define-x-y-z
      :nocodelens:
      :nocanvas:

      x, y, z = 13, 5, 10
    

   .. activecode:: ordenar-x-y-z-v1
      :include: define-x-y-z

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

   ¿No te parece excesivamente largo para un problema tan pequeño?
   Puedes apostar a que no es la mejor solución, pero es un buen
   ejemplo de *if*.

No te vamos a dejar con ese mal sabor de boca, vamos a escribirlo
bien.

.. activecode:: ordenar-x-y-z-v2
   :include: define-x-y-z

   print(sorted([x, y, z]))

No solo es mucho más corto, es además más general porque permite
aplicarlo a cualquier número de argumentos.

Esos corchetes seguro que ahora mismo no te resultan familiares,
pero pronto serán de la familia. De todas formas los podemos quitar
de la salida y dejarla igual que antes.

.. activecode:: ordenar-x-y-z-v3
   :include: define-x-y-z

   print(*sorted([x,y,z]))

Por esta vez vamos a explicártelo en detalle, pero intenta usar la
documentación oficial de http://docs.python.org para entender lo
que hacen los programas que veremos más adelante.

Seguramente habrás adivinado que ``sorted`` es una función que
devuelve una versión ordenada de lo que se le pasa como argumento.  Lo
que pasamos como argumento a ``sorted`` es una :term:`lista`, un tipo
de objeto de Python que agrupa una secuencia de objetos.

Por tanto ``[x, y, z]`` no es más que una lista que contiene la
secuencia de elementos ``x``, ``y`` y ``z``.  Y ``sorted([x,y,z])`` es
una versión ordenada de esa lista.

Si queremos que la lista se muestre con otro formato no tenemos más
remedio que imprimir nosotros cada elemento en lugar de usar
``print``.  Por suerte sabemos que ``print`` imprime todos sus
argumentos separados por un espacio.  Por tanto basta con pasar todos
los elementos de la lista como argumentos independientes de ``print``.
Eso es lo que conseguimos con el asterisco antes de ``sorted``.  

Así es, el asterisco no solo vale para multiplicar.  Como otros muchos
operadores en Python tiene diferentes significados dependiendo del
contexto.  Cuando el operador ``*`` solo tiene un argumento (operador
unario) y el argumento es una secuencia de elementos el asterisco
*desempaqueta* los elementos y permite usarlos en contextos en los que
se necesitan varios argumentos.  Por ejemplo, en llamadas a función.

Hemos visto suficiente de ejecución condicional como para hacer con
facilidad todos los ejercicios del curso, pero no queremos cerrar la
sección sin mostrar otras posibilidades que ofrece Python de ejecución
condicional.  El :term:`operador ternario if/else` permite evaluar
expresiones de forma condicional.  En el siguiente ejemplo el valor de
``y`` depende del valor de ``x``. Si ``x`` es par ``y`` toma el valor
``x/2``, en caso contrario ``y`` toma el valor ``x``.

.. activecode:: ejemplo-op-ternario
   :include: define-x-y-z, es-par

   x = 124
   y = x/2 if es_par(x) else x
   print(y)

El :term:`operador ternario if/else` es distinto a la :term:`sentencia
if` con :term:`claúsula else` aunque usan las mismas palabras
reservadas.  En este caso no usamos los dos puntos para marcar inicios
del bloque contenido.  Ese pequeño detalle hace que no se interprete
como una sentencia, sino como una expresión.

Iteración
---------

Los bucles son construcciones que permiten volver atrás en la secuencia
de sentencias. Cada ejecución del bloque de sentencias que compone el
cuerpo del bucle se le llama :term:`iteración`.

El más general es el :term:`bucle while` que repite un bloque de
sentencias mientras se verifique una condición booleana y que ya
conocemos de ejemplos anteriores.  La estructura general es:

.. parsed-literal::

   while *condición*:
       *bloque_si_cierto*

El bloque del :term:`bucle while` se repite continuamente mientras
se cumpla la condición.  Se comprueba la condición siempre al empezar
cada repetición.

Veamos un ejemplo muy similar a un conocido.

-  Encontrar la raiz cúbica de un número natural *n*.

   .. activecode:: raiz-cubica-entera

      def raiz_cubica(n):
          i = 1
          while i**3 < n:
              i = i + 1
    
          if i**3 == n:
              return i

   Es un ejemplo de enumeración exhaustiva. Pasamos por todas las
   posibilidades comprobando si alguna de ellas es la respuesta
   correcta.  ¿Y qué pasa si el número *n* no tiene una raiz cúbica
   perfecta?  Nuestro algoritmo no sabe de números reales.

   No hay una respuesta universal para esta pregunta, pero aquí te
   proponemos una posibilidad, no devolver nada.  Otra posibilidad es
   devolver ``False`` y otra es utilizar un mecanismo de control de
   errores denominado *excepción*.  Esta última opción es seguramente
   la más recomendable pero aún no sabemos suficiente Python.

   Con nuestra propuesta de no devolver nada la función puede
   utilizarse con seguridad así:

   .. activecode:: uso-raiz-cubica-none

      x = 9
      if None == raiz_cubica(x):
          print(x, 'no tiene raiz cúbica perfecta')
      else:
          print(raiz_cubica(x))

A lo mejor este ejemplo es muy sencillo y tú mismo ves que el
algoritmo es fácil de entender, pero las cosas en la vida real no
suelen ser tan fáciles. En general nos vamos a enfrentar al problema
de saber si lo que hemos escrito está bien o no hemos entendido todos
los casos posibles.  ¿Cómo sabemos que el bucle que hemos escrito
termina alguna vez? ¿Cómo sabemos que no se queda indefinidamente en
él?

La respuesta es que debemos buscar una :term:`función de decremento`.
No hay que escribirla en el programa y en muchos casos ni siquiera hay
que escribirla en papel, pero tiene que existir.  Una :term:`función
de decremento` tiene que cumplir cuatro características básicas:

1.  Se trata de una función que hace corresponder números enteros a
    valores de las variables del programa :math:`f:V \rightarrow
    \mathbb{Z}`.
2.  Cuando el programa entra en el bucle tiene que tomar un valor no
    negativo.
3.  Cuando la función de decremento toma un valor <= 0 el programa debe
    salir del bucle.
4.  En cada iteración del bucle la función toma un valor menor que en
    la anterior iteración (de ahí el nombre de *función de
    decremento*).

Por ejemplo, en el caso anterior la función de decremento es
:math:`f(i,n) = n - i^3`. Al entrar en el bucle con ``n = 27`` toma el
valor 26.  En cada iteración se incrementa ``i``, por lo que se
decrementa la función (toma los valores 26, 19, 0).  La condición de
permanencia en el bucle es precisamente la que impone la
:term:`función de decremento`, :math:`f(i,n) > 0`, es decir, :math:`n
< i^3`.

Otra forma de iteración soportada por Python es el :term:`bucle
for`.  En este caso una variable toma una secuencia de valores que
se indica.  La forma general es:

.. parsed-literal::

   for *variable* in *iterable*:
       *bloque_del_bucle*

Un *iterable* no es más que una secuencia de valores.  La *variable*
de control del bucle toma en cada iteración uno de los valores
contenidos en el *iterable*.  El *bloque_del_bucle* se ejecuta tantas
veces como valores tenga el *iterable*.  En cada iteración la variable
de control toma uno de estos valores, lo que puede utilizarse para
variar el comportamiento del bloque.  Por ejemplo:

.. activecode:: ejemplo-bucle-for

   for i in [1, 2, 3, 4]:
       print(i)

Prueba a cambiar la lista de valores, poniendo elementos desordenados
e incluso cambiando el tipo de los elementos.

Para crear secuencias de valores es muy conveniente el uso de la
función ``range``.  Esta función devuelve un iterable que contiene un
conjunto de números enteros consecutivos.

.. activecode:: ejemplo-rango-10

    print(range(10))

Este rango contiene todos los valores desde 0 hasta el límite marcado
sin contarlo.  No es una lista, no podemos verlo imprimiendo sin más.
Pero podemos verlo usando nuevamente el operador ``*`` para expandir
el rango:

.. activecode:: expande-rango-10

    print(*range(10))


También podemos especificar los límites inferior y superior.  El límite
inferior está incluído en el rango.

.. activecode:: ejemplo-rango-5-10

    print(*range(5,10))


Por último se puede especificar el incremento, de manera que solo se
incluya uno de cada *n* números del rango. Por ejemplo:

.. activecode:: ejemplo-rango-1-20-2

    print(*range(1, 20, 2))

Con ``range`` es muy sencillo construir bucles *for*.

.. activecode:: ejemplo-rango-1-20-2

   for i in range(10):
       print(i)

   for i in range(10,0,-1):
       print(i)

Ambos tipos de bucle pueden utilizarse en la mayoría de las situaciones.
Es quizás más sencillo buscar la *función de decremento* en el caso del
``while`` pero también suele ser algo más largo. Cuál usar es cuestión
de gustos o conveniencia.  Para recorrer elementos en una secuencia el
``for`` seguramente será más apropiado, mientras que para hacer un
número de iteraciones que depende de los valores calculados el ``while``
es más natural.

Veamos el ejemplo de la raiz cúbica con ``for``.

.. activecode:: raiz-cubica-con-for

   def raiz_cubica(n):
       for i in range(n + 1):
           if i**3 >= n: break
    
       if i**3 == n:
           return i

   print(raiz_cubica(2406104))


La sentencia ``break`` interrumpe el bucle.  Es decir, sale del bucle
que está ejecutando y continúa con la siguiente sentencia.

Las cadenas de texto también pueden ser recorridas carácter a carácter
con un bucle *for*.

.. activecode:: ejemplo-for-cadena

   for i in 'Hola':
       print(i)

El bucle *for* tiene otra forma interesante, con ayuda de la función
``enumerate``, en la que además de recorrer los elementos de la
secuencia también recorre las posiciones de esos elementos. Fíjate
bien, ahora tenemos dos variables de control.

.. activecode:: ejemplo-for-enum

   for pos, nombre in enumerate(['Pedro', 'Paco', 'Luis', 'Pocoyo']):
       print(pos, ':', nombre)

Aún hay otra forma de *for* que resulta muy útil.  Se utiliza con la
función ``zip`` cuando queremos recorrer dos iterables de manera
sincronizada.  Es decir, cuando tenemos que recorrer los dos primeros
elementos de cada iterable, después los dos segundos, etc.

.. activecode:: ejemplo-for-zip

   for a, b in zip('ABCDEF', ['a', 'be', 'ce', 'de', 'e', 'efe']):
       print(a, ':', b)

Esto es suficiente para completar con facilidad todos los ejercicios
del curso.  Evidentemente debes entrenar todas las formas de iteración
vistas, así que procura hacer los ejercicios que se piden a
continuación.

Recuerda que los ejercicios tienen una función similar a los
ejercicios deportivos.  No se trata de hacerlos, sino de perfeccionar
su ejecución y plantearse retos.  Por ejemplo, después de hacer un
ejercicio con un *for* prueba a hacerlo con un *while*.

Ejercicios
----------

.. parsonsprob:: suma-10-input

   Reordena las líneas para que el programa imprima la suma de los 10
   números que se introduzcan por pantalla.
   -----
   suma = 0
   for a in range(10):
       suma = suma + int(input('Introduce un numero ')) 
   print(suma)


.. note:: Para que el usuario pueda introducir texto por pantalla se
          usa la función ``input`` que devuelve una cadena de texto.
          Fíjate bien en cómo convertimos el resultado de ``input`` a
          un entero usando la función ``int``. ¿Qué pasaría si lo que
          metemos no es un entero?
   

Vamos a enfrentarnos por primera vez a un prgrama de más de 5 líneas:

| Haz un programa que imprima la tabla de multiplicar completa (del 1 al 9).

.. activecode:: imprime-tabla-v1

    def imprime_tablas_simple():
        for i in range(1,10):
            imprime_tabla(i)
            print()
    
    def imprime_tabla(n):
        for i in range(1,11):
            imprime_linea(n,i)
            print()
    
    def imprime_linea(n,i):
        print(n,'x',i,'=',n*i,end='')


Observa cómo escribimos el programa, desde lo más complejo hasta lo
más simple.  Empezamos con el problema que se pide (escribir las nueve
tablas de multiplicar).  Si en ese proceso nos surge otro problema
(imprimir tabla de multiplicar) lo asumimos resuelto con una función,
la que nosotros decidimos (``imprime_tabla``) con todos los argumentos
que necesitemos.  Después aplicamos el mismo proceso con todas las
funciones que hayamos necesitado usar y no estén aún definidas.

Otra forma:

.. code:: python

    def imprime_mosaico():
        for i in range(1,10,3):
            imprime_tablas_mosaico(i)
            
    def imprime_tablas_mosaico(primera):
        for i in range(1,11):
            imprime_linea_mosaico(primera,i)
        print()
    
    def imprime_linea_mosaico(primera, n):
        for i in range(primera, primera+3):
            imprime_linea(i,n)
            print(end='\t')
        print()
    
    def imprime_linea(n,i):
        print(n,'x',i,'=',n*i,end='')
    
    imprime_mosaico()

No te quedes mirando, lee, experimenta y cambia lo que necesites hasta
entenderlo completamente.

| Haz un programa que imprima el siguiente dibujo

::

    +----------------+
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    +----------------+

.. code:: python

    def imprime_cuadrado(ancho):
        imprime_borde(ancho)
        for i in range(8):
            imprime_cara(ancho)
        imprime_borde(ancho)
        
    def imprime_borde(ancho):
        print('+' + '-'*ancho + '+')
    
    def imprime_cara(ancho):
        print('|' + ' '*ancho + '|')
    
    imprime_cuadrado(16)


.. parsed-literal::

    +----------------+
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    +----------------+


Crear una función que valide una contraseña según estos criterios:

-  La contraseña debe contener un mínimo de 8 caracteres.
-  Una contraseña debe contener letras minúsculas, mayúsculas, números y
   al menos 1 carácter no alfanumérico.
-  La contraseña no puede contener espacios en blanco.
-  Contraseña válida, retorna ``True``.
-  Contraseña no válida, retorna el mensaje
   ``"La contraseña elegida no es segura"``.

.. code:: python

    def valida_palabra_clave(palabra):
        return  valida_8_caracteres(palabra) and \
                valida_tipos_caracteres(palabra) and \
                valida_no_espacios(palabra)
    
            
    def valida_8_caracteres(palabra):
        return len(palabra) >= 8
    
    
    def valida_tipos_caracteres(palabra):
        return valida_mayusculas(palabra) \
            and valida_minusculas(palabra) \
            and valida_numeros(palabra) \
            and valida_simbolos(palabra)
    
            
    def valida_no_espacios(palabra):
        for c in palabra:
            if c == ' ':
                return False
        return True
    
    
    def valida_mayusculas(palabra):
        for c in palabra:
            if es_mayuscula(c):
                return True
        return False
    
    
    def valida_minusculas(palabra):
        for c in palabra:
            if es_minuscula(c):
                return True
        return False
    
    
    def valida_numeros(palabra):
        for c in palabra:
            if es_numero(c):
                return True
        return False
    
    
    def valida_simbolos(palabra):
        for c in palabra:
            if es_simbolo(c):
                return True
        return False
    
    
    def es_mayuscula(c):
        return c >= 'A' and c <= 'Z'
    
    
    def es_minuscula(c):
        return c >= 'a' and c <= 'z'
    
    
    def es_numero(c):
        return c >= '0' and c <= '9'
    
    
    def es_simbolo(c):
        return not ( es_mayuscula(c) \
            or es_minuscula(c) \
            or es_numero(c) )
    
    
    valida_palabra_clave('aLt0$€cr3t0')




.. parsed-literal::

    True



¿No es muy repetitivo? Las validaciones de tipos de caracteres son
prácticamente iguales. Solo se diferencian en la función que determina
el tipo de cada caracter. Por tanto para no repetir código se puede
pasar como parámetro.

.. code:: python

    def valida_tipos_caracteres(palabra):
        return valida_tipo(es_mayuscula, palabra) \
            and valida_tipo(es_minuscula, palabra) \
            and valida_tipo(es_numero, palabra) \
            and valida_tipo(es_simbolo, palabra)
    
            
    def valida_no_espacios(palabra):
        return not valida_tipo(es_espacio, palabra)
    
    
    def valida_tipo(es_tipo, palabra):
        for c in palabra:
            if es_tipo(c):
                return True
        return False
    
    
    def es_espacio(c):
        return c == ' '
    
    
    valida_palabra_clave('aLt0s€cr3T0')




.. parsed-literal::

    True



