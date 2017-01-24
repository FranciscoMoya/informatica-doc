
Listas, tuplas, conjuntos y diccionarios
========================================

La gama de contenedores de Python hay que conocerla con cierta
profundidad para hacer programas no triviales. Estudia los capítulos 8,
9 y 10 del libro de texto y empieza a practicar.

Directa o indirectamente hemos conocido varias formas de agrupar
elementos en Python. La que hemos utilizado con más frecuencia es la
*lista*, que se crea con corchetes. Alguna vez han aparecido las
*tuplas* que aparecen entre paréntesis. Y aún hay otra forma, que son
los conjuntos, que se expresan como una seuencia de elementos entre
llaves.

.. code:: python

    a = [ 1, 2, 3 ]
    b = ( 1, 2, 3 )
    c = { 1, 2, 3 }
    d = {}
    type(d), type(a), type(b), type(c)




.. parsed-literal::

    (dict, list, tuple, set)



Aparentemente listas y tuplas funcionan de forma parecida.

.. code:: python

    print(a[1:])
    for i in a:
        print(i)
    if 3 in a:
        print('El 3 está')


.. parsed-literal::

    [2, 3]
    1
    2
    3
    El 3 está


.. code:: python

    print(b[1:])
    for i in b:
        print(i)
    if 3 in b:
        print('El 3 está')


.. parsed-literal::

    (2, 3)
    1
    2
    3
    El 3 está


Los conjuntos son ligeramente diferentes, porque no permiten indexar,
pero sí iterar y determinar pertenencia. De hecho son especialmente
eficientes en esta última operación.

.. code:: python

    # c[1:] <- No podemos
    for i in c:
        print(i)
    if 3 in c:
        print('El 3 está')


.. parsed-literal::

    1
    2
    3
    El 3 está


Los diccionarios se comportan como conjuntos, pero además tienen una
operación de indexación especial, que permiten acceder a valores
independientes de los elementos que actúan como índice.

.. code:: python

    d = { 1:'uno', 2:'dos', 3:'tres' }
    for i in d:
        print(i, d[i])
    if 3 in d:
        print('El 3 está')


.. parsed-literal::

    1 uno
    2 dos
    3 tres
    El 3 está


Otra característica distintiva de conjuntos y diccionarios es que el
orden no necesariamente refleja el orden en que se introdujeron los
elementos. Se dice que son contenedores sin orden.

.. code:: python

    c = { 3, 1, 2 }
    d = { 2:'dos', 1:'uno', 3:'tres' }
    for i in c:
        print(i)
    for i in d:
        print(i, d[i])


.. parsed-literal::

    1
    2
    3
    1 uno
    2 dos
    3 tres


Mutabilidad en listas
---------------------

Las listas tienen algunas características especiales, que deben ser
conocidas para evitar sorpresas. Por ejemplo, se trata de un tipo
*mutable*. Esto quiere decir que podemos usar el operador de indexación
(corchetes) al lado izquierdo de una asignación.

.. code:: python

    a = list(range(20))
    a[19] = 58
    a[5:12] = []
    print(a)


.. parsed-literal::

    [0, 1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 58]


La mutabilidad tiene consecuencias muy importantes. Vamos a ver una
serie de ejemplos para ilustrarlas.

.. code:: python

    consonantes = ['b', 'c', 'd', 'f']
    vocales = ['a', 'e', 'i']
    letras = [consonantes, vocales]
    letras2 = [['b', 'c', 'd', 'f'], ['a', 'e', 'i']]

Aparentemente ``letras`` y ``letras2`` son lo mismo.

.. code:: python

    print('letras =', letras)
    print('letras2 =', letras2)
    print(letras == letras2)


.. parsed-literal::

    letras = [['b', 'c', 'd', 'f'], ['a', 'e', 'i']]
    letras2 = [['b', 'c', 'd', 'f'], ['a', 'e', 'i']]
    True


Pero fíjate en el resultado de manipular la lista ``vocales`` sin tocar
en absoluto la lista ``letras``.

.. code:: python

    vocales.append('o')
    print('letras =', letras)
    print('letras2 =', letras2)
    print(letras == letras2)


.. parsed-literal::

    letras = [['b', 'c', 'd', 'f'], ['a', 'e', 'i', 'o']]
    letras2 = [['b', 'c', 'd', 'f'], ['a', 'e', 'i']]
    False


Python no guarda el contenido de las listas ``consonantes`` y
``vocales`` como elementos de ``letras``, sino que guarda una referencia
al objeto original, que puede manipularse afectando a todas las
variables que contienen referencias a esas listas.

Podemos ver que se trata de objetos diferentes empleando la función
``id`` o bien con
`PythonTutor <http://www.pythontutor.com/visualize.html#code=consonantes+%3D+%5B'b',+'c',+'d',+'f'%5D%0Avocales+%3D+%5B'a',+'e',+'i'%5D%0Aletras+%3D+%5Bconsonantes,+vocales%5D%0Aletras2+%3D+%5B%5B'b',+'c',+'d',+'f'%5D,+%5B'a',+'e',+'i'%5D%5D%0A&mode=display&origin=opt-frontend.js&cumulative=false&heapPrimitives=false&textReferences=false&py=2&rawInputLstJSON=%5B%5D&curInstr=4>`__.

.. code:: python

    print(id(letras), id(letras2))


.. parsed-literal::

    912297503944 912316674440


Esto tiene más implicaciones de las que vemos a primera vista, porque el
paso de parámetros no es más que un caso particular de todo esto.

.. code:: python

    def f(lista):
        lista[1].append('u')
        
    f(letras2)
    
    print(letras2)


.. parsed-literal::

    [['b', 'c', 'd', 'f'], ['a', 'e', 'i', 'u']]


Hasta ahora cuando pasábamos un valor a una función se trataba de una
copia, que podía manipular a su antojo sin afectar al programa que
llamaba. Por ejemplo:

.. code:: python

    def cifras(n):
        while n > 0:
            print(n%10)
            n //= 10
    
    n = 1985
    cifras(n)
    print(n)


.. parsed-literal::

    5
    8
    9
    1
    1985


Al pasar una lista se está pasando una referencia al objeto
correspondiente. Al tratarse de un objeto mutable la función puede
devolver resultados a la función que llama sin ni siquiera usar
``return``. Nunca hagas esto.

.. code:: python

    def cifras(n, lista):  # Nunca hagas esto
        while n > 0:
            lista.append(n%10)
            n //= 10
    
    n = []
    cifras(1985, n)
    print(n)


.. parsed-literal::

    [5, 8, 9, 1]


Recuerda que programas para que otros lean tus programas. Si escondes el
valor de retorno solo estás dificultando la lectura.

.. code:: python

    def cifras(n):
        lista = []
        while n > 0:
            lista.append(n%10)
            n //= 10
        return lista
    
    print(cifras(1985))


.. parsed-literal::

    [5, 8, 9, 1]


Slicing en listas
-----------------

Se llama *slicing* (partir en rodajas) a las operaciones que seleccionan
una parte de la lista, generando una nueva lista en principio más
pequeña. Familiarízate con las operaciones de *slicing*, son las más
frecuentes y no solo en listas.

Veamos algunos ejemplos.

.. code:: python

    L1 = list(range(10))
    L2 = list(range(10))
    print(L1)
    print(L2)


.. parsed-literal::

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


Cuando se selecciona una parte de la lista el resultado es una lista. En
cambio si se usa un índice concreto (operación de indexación) el
resultado es un elemento concreto. Eso es muy importante para manipular
la lista. Veamos dos ejemplos en los que sustituimos el segundo
elemento.

En el primer caso usamos indexación, metemos como segundo elemento el
resultado de la operación de slicing ``L1[5:]``. Es decir, a partir del
elemento 5.

En el segundo caso sustituimos la lista ``L2[1:1]`` por la lista
``L2[5:]``. Aunque ``L2[1:1]`` solo tenga un elemento sigue siendo una
lista, no un elemento. Por eso al sustituir una lista por otra estamos
insertando.

.. code:: python

    L1[1] = L1[5:]
    L2[1:1] = L2[5:]
    print(L1)
    print(L2)


.. parsed-literal::

    [0, [5, 6, 7, 8, 9], 2, 3, 4, 5, 6, 7, 8, 9]
    [0, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]


Un ejercicio interesante es practicar *slicing* para seleccionar las
distintas partes de un Sudoku.

.. code:: python

    sudoku = [
    [4,9,1,3,6,2,8,7,5],
    [5,2,6,8,7,1,4,9,3],
    [7,8,3,9,5,4,6,1,2],
    [2,3,9,4,1,7,5,8,6],
    [1,5,7,6,3,8,9,2,4],
    [6,4,8,2,9,5,7,3,1],
    [8,7,2,1,4,6,3,5,9],
    [9,1,4,5,8,3,2,6,7],
    [3,6,5,7,2,9,1,4,8]]

Practica con filas, y con elementos de una fila. Pero hasta que domines
las *list comprehensions* que se cuentan más adelante no serás capaz de
seleccionar los cuadrantes.

Métodos de una lista
--------------------

Familiarízate con los métodos de las listas. Se utilizan muchísimo.

.. code:: python

    L = list(range(10))

Añadir un elemento al final.

.. code:: python

    L.append(4)
    print(L)


.. parsed-literal::

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 4]


Contar todas las apariciones del elemento ``4``.

.. code:: python

    print(L.count(4))


.. parsed-literal::

    2


Insertar el elemento ``80`` en la posición ``3``.

.. code:: python

    L.insert(3, 80)
    print(L)


.. parsed-literal::

    [0, 1, 2, 80, 3, 4, 5, 6, 7, 8, 9, 4]


Añadir al final los elementos de otra lista.

.. code:: python

    L.extend([2,3,4])
    print(L)


.. parsed-literal::

    [0, 1, 2, 80, 3, 4, 5, 6, 7, 8, 9, 4, 2, 3, 4]


Eliminar la primera ocurrencia del elemento ``4``.

.. code:: python

    L.remove(4)
    print(L)


.. parsed-literal::

    [0, 1, 2, 80, 3, 5, 6, 7, 8, 9, 4, 2, 3, 4]


Imprimir la posición del primer elemento de valor ``4``.

.. code:: python

    print(L.index(4))


.. parsed-literal::

    10


Eliminar el último de la lista devolviendo su valor. También se puede
indicar una posición para eliminar uno cualquiera de la lista.

.. code:: python

    print(L.pop())


.. parsed-literal::

    4


Ordenar los elementos de la lista en orden creciente.

.. code:: python

    L.sort()
    print(L)


.. parsed-literal::

    [0, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 80]


Invertir el orden de todos los elementos de la lista.

.. code:: python

    L.reverse()
    print(L)


.. parsed-literal::

    [80, 9, 8, 7, 6, 5, 4, 3, 3, 2, 2, 1, 0]


Clonado de listas
-----------------

Al modificar el contenido de la lista se puede afectar al recorrido de
la lista. Por ejemplo, considera la siguiente función:

.. code:: python

    def borraDuplicados(L1, L2): # ¡OJO! ¡Esta función es incorrecta!
        '''Asume que L1 y L2 son listas.
        Elimina todos los elementos de L1 que estén presentes en L2.'''
        for e in L1:
            if e in L2:
                L1.remove(e)

Veamos un posible uso de la función.

.. code:: python

    L1 = [1,2,3,4]
    L2 = [1,2,5,6]
    borraDuplicados(L1, L2)
    print('L1 =', L1)


.. parsed-literal::

    L1 = [2, 3, 4]


¡Sorpresa! El número 2 está presente en ``L2`` pero no es eliminado de
``L1``. ¿Qué ha pasado?

El motivo es que el recorrido de la lista se realiza internamente con un
contador que va desde el 0 (primer elemento) hasta ``len(L1)`` (sin
incluirlo). En la primera iteración comprueba el elemento 0 y descubre
que es un duplicado. Por tanto lo elimina, pero al eliminarlo el primer
elemento deja de existir y su lugar es ocupado por el segundo elemento.
El bucle ``for`` no tiene forma de saber que se ha cambiado el orden de
los elementos y sigue por donde iba, por el segundo elemento. Pero el
que ahora ocupa el segundo lugar es el que antes era el tercero. Se ha
saltado el ``2``.

**La lección a recordar es que la mutación de una lista invalida los
iteradores. Todos los ``for`` que recorran la lista y que se estén
ejecutando en el momento de la mutación dejan de tener sentido.**

Por tanto el recorrido debe separarse de la mutación, debe hacerse sobre
objetos distintos. La forma más sencilla es clonando la lista. Es decir,
creando otra lista con los mismos elementos. Y eso ya sabemos hacerlo:

.. code:: python

    def borraDuplicados(L1, L2):
        '''Asume que L1 y L2 son listas.
        Elimina todos los elementos de L1 que estén presentes en L2.'''
        for e in L1[:]:
            if e in L2:
                L1.remove(e)

La expresión ``L1[:]`` es una nueva lista que contiene todos los
elementos de ``L1``. Ahora el recorrido se hace sobre esa nueva lista,
mientras que la operación de mutación ``remove`` se realiza sobre la
lista ``L1`` original.

.. code:: python

    L1 = [1,2,3,4]
    L2 = [1,2,5,6]
    borraDuplicados(L1, L2)
    print('L1 =', L1)


.. parsed-literal::

    L1 = [3, 4]


El mismo resultado se obtiene con la llamada a la función ``list(L1)``.
Crea una nueva lista con los elementos de la que se pasa como argumento.

.. code:: python

    def borraDuplicados(L1, L2):
        '''Asume que L1 y L2 son listas.
        Elimina todos los elementos de L1 que estén presentes en L2.'''
        for e in list(L1):
            if e in L2:
                L1.remove(e)

Ambas opciones son perfectamente razonables en un programa Python. Cuál
usar es un tema de gusto personal.

.. code:: python

    L1 = [1,2,3,4]
    L2 = [1,2,5,6]
    borraDuplicados(L1, L2)
    print('L1 =', L1)


.. parsed-literal::

    L1 = [3, 4]


¿Y si los elementos de la lista son a su vez mutables? Volvemos a tener
el mismo problema. Al copiar los elementos cada uno de ellos debe
crearse una nueva copia de su contenido. Veamos un ejemplo.

.. code:: python

    frutas = [ 'pera', 'manzana', 'naranja' ]
    verduras = [ 'tomate', 'apio', 'puerro' ]
    productos = [ frutas, verduras ]
    
    productos2 = productos[:]
    frutas.append('melon')
    print(productos2)


.. parsed-literal::

    [['pera', 'manzana', 'naranja', 'melon'], ['tomate', 'apio', 'puerro']]


La forma más sencilla de realizar copias de objetos complejos es
mediante la biblioteca ``copy``.

.. code:: python

    from copy import deepcopy
    
    productos2 = deepcopy(productos)
    verduras.append('calabaza')
    print(productos2)


.. parsed-literal::

    [['pera', 'manzana', 'naranja', 'melon'], ['tomate', 'apio', 'puerro']]


Ahora las dos estructuras de datos son completamente independientes y al
alterar una o parte de ella no notamos cambio alguno en la otra.

Comprensiones de listas
-----------------------

Una construcción muy importante en Python es la denominada *list
comprehension* o comprensión de lista. Se trata de una notación compacta
para generar listas (u otros contenedores) cuyos elementos se puedan
escribir en forma de expresiones con los elementos de otra lista.

Por ejemplo, una lista con los primeros 10 cuadrados de números
naturales.

.. code:: python

    [ x**2 for x in range(1,11) ]




.. parsed-literal::

    [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]



También se puede añadir una condición que actúa como filtro. Es decir,
de los elementos generados solo los que cumplen la condición se incluyen
en la lista. Por ejemplo, tenemos la función ``os.listdir`` que nos dice
el contenido de una carpeta. Veamos que pasa si la llamo en el
directorio de los cuadernos de la asignatura.

.. code:: python

    import os
    os.listdir('.')




.. parsed-literal::

    ['.ipynb_checkpoints',
     'BisectionSearch.ipynb',
     'Datos AEMET.ipynb',
     'Examen ordinario.ipynb',
     'ExamenExtraordinario.ipynb',
     'Gráficas.ipynb',
     'lab-01.ipynb',
     'lab-02.ipynb',
     'lab-03.ipynb',
     'Navegación web.ipynb',
     'Paseo.ipynb',
     'Problema de las 8 damas.ipynb',
     'Procesamiento de XML.ipynb',
     'Prueba de Progreso 1ºA.ipynb',
     'Prueba de Progreso 1ºB.ipynb',
     'Prueba de Progreso 1ºC.ipynb',
     'python-00.ipynb',
     'python-01.ipynb',
     'python-02.ipynb',
     'python-04-ejercicios.ipynb',
     'python-04.ipynb',
     'python-05-06-07.ipynb',
     'python-09.ipynb',
     'python-10.ipynb',
     'python-14.ipynb',
     'python-files.ipynb',
     'Resumen.ipynb',
     'Sudoku 2.ipynb',
     'Sudoku 3.ipynb',
     'Sudoku.ipynb',
     'Untitled.ipynb',
     'Untitled1.ipynb',
     'Untitled2.ipynb']



Hay archivos que acaban en ``.ipynb`` que son cuadernos y otros que no.
Hay archivos que corresponden al laboratorio, otros que son ejemplos no
relacionados con un tema concreto y otros que son relativos a un tema
concreto. Por ejemplo, los que empiezan por ``python-`` y acaban en
``.ipynb`` son cuadernos relativos a un tema. Vamos a generar una lista
por comprensión.

.. code:: python

    [ f for f in os.listdir('.') if f.endswith('.ipynb') and f.startswith('python-') ]




.. parsed-literal::

    ['python-00.ipynb',
     'python-01.ipynb',
     'python-02.ipynb',
     'python-04-ejercicios.ipynb',
     'python-04.ipynb',
     'python-05-06-07.ipynb',
     'python-09.ipynb',
     'python-10.ipynb',
     'python-14.ipynb',
     'python-files.ipynb']



Volvamos al ejercicio del Sudoku. Vamos a seleccionar partes de él ahora
que sabemos todo acerca de las *list comprehensions*.

.. code:: python

    sudoku = [
    [4,9,1,3,6,2,8,7,5],
    [5,2,6,8,7,1,4,9,3],
    [7,8,3,9,5,4,6,1,2],
    [2,3,9,4,1,7,5,8,6],
    [1,5,7,6,3,8,9,2,4],
    [6,4,8,2,9,5,7,3,1],
    [8,7,2,1,4,6,3,5,9],
    [9,1,4,5,8,3,2,6,7],
    [3,6,5,7,2,9,1,4,8]]

Seleccionemos el cuadrante superior izquierdo.

.. code:: python

    [s[:3] for s in sudoku[:3]]




.. parsed-literal::

    [[4, 9, 1], [5, 2, 6], [7, 8, 3]]



Ahora el inferior derecho.

.. code:: python

    [s[6:] for s in sudoku[6:]]




.. parsed-literal::

    [[3, 5, 9], [2, 6, 7], [1, 4, 8]]



Ahora el del medio.

.. code:: python

    [s[3:6] for s in sudoku[3:6]]




.. parsed-literal::

    [[4, 1, 7], [6, 3, 8], [2, 9, 5]]



Ahora la tercera columna.

.. code:: python

    [ s[2] for s in sudoku ]




.. parsed-literal::

    [1, 6, 3, 9, 7, 8, 2, 4, 5]



Practica tú. Haz por ejemplo que los cuadrantes aparezcan como una lista
simple en lugar de una lista de listas.

Piénsalo un poco por tí mismo y si no llegas a la solución sigue
leyendo. A partir de aquí se pede considerar un uso avanzado de las
*list comprehensions*. No te preocupes si no las entiendes.

Por ejemplo, el cuadrante superior izquierdo:

.. code:: python

    [ i for s in sudoku[:3] for i in s[:3] ]




.. parsed-literal::

    [4, 9, 1, 5, 2, 6, 7, 8, 3]



El cuadrante inferior derecho:

.. code:: python

    [ i for s in sudoku[6:] for i in s[6:] ]




.. parsed-literal::

    [3, 5, 9, 2, 6, 7, 1, 4, 8]



El del medio:

.. code:: python

    [ i for s in sudoku[3:6] for i in s[3:6] ]




.. parsed-literal::

    [4, 1, 7, 6, 3, 8, 2, 9, 5]



Piensa ahora una función para devolver el cuadrante (x, y) siendo x e y
números entre 0 y 2.

.. code:: python

    def cuadrante(sudoku, x, y):
        return [ i for s in sudoku[3*y:][:3] for i in s[3*x:][:3] ]

Veamos para probarlo los cuadrantes centrales.

.. code:: python

    print(cuadrante(sudoku, 0, 1))
    print(cuadrante(sudoku, 1, 1))
    print(cuadrante(sudoku, 2, 1))


.. parsed-literal::

    [2, 3, 9, 1, 5, 7, 6, 4, 8]
    [4, 1, 7, 6, 3, 8, 2, 9, 5]
    [5, 8, 6, 9, 2, 4, 7, 3, 1]


