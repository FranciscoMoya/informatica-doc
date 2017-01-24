
Ejemplos de divide y vencerás
=============================

**Nota: Algunos de estos ejemplos son interactivos. Para probarlos
necesitarás las capacidades de IPython Notebook. La forma más fácil es
subirlo en `tmpnb.org <http://tmpnb.org/>`__. veamos cómo hacerlo.**

-  Descarga el `archivo correspondiente a este
   cuaderno <https://github.com/FranciscoMoya/informatica/raw/master/notebooks/python-10.ipynb>`__
   y guárdalo en tu ordenador.

-  Entra en `tmpnb.org <http://tmpnb.org>`__ y pulsa sobre el botón
   *Upload*. Selecciona el archivo que guardaste en el paso anterior y
   acepta.

-  Aparecerá el archivo en la página de `tmpnb.org <http://tmpnb.org>`__
   con un botón *Upload* a la derecha, pulsa sobre él para que se
   realice la transferencia.

-  Posteriormente comprueba de que el nombre del archivo termina en
   ``.ipynb``. Si no lo hace marca la casilla (*checkbox*) a la
   izquierda del archivo subido y pulsa el botón *Rename*. Edita el
   nombre para que termine en ``.ipynb`` y acepta.

-  Ya puedes pinchar sobre el nombre del archivo para interactuar con el
   cuaderno. Ahora selecciona la opción de menú *Cell->Run All* para ver
   ejecutar todas las celdas en el nuevo entorno.

Torres de Hanoi
---------------

Mover ``n`` discos desde el palo ``orig`` al palo ``dest``. Es directo
usando la estrategia de divide y vencerás. Para mover los ``n`` discos
tenemos que mover primero los ``n-1`` superiores al palo libre, entonces
movemos el disco grande al palo destino y posteriormente movemos los
``n-1`` discos del palo libre al palo destino.

.. code:: python

    def hanoi(n, orig=1, dest=3):
        '''
        Asume n número natural (> 0), 
        orig número de palo origen, orig in (1,2,3),
        dest número de palo destino, dest in (1,2,3).
        Imprime los movimientos a realizar para mover n discos
        desde el palo orig al palo dest.
        '''
        if n < 1:
            return
        libre = (set((1,2,3)) - set((orig,dest))).pop()
        hanoi(n-1, orig, libre)
        print('De {} a {}'.format(orig, dest))
        hanoi(n-1, libre, dest)

Solo falta probarlo:

.. code:: python

    hanoi(4)


.. parsed-literal::

    De 1 a 2
    De 1 a 3
    De 2 a 3
    De 1 a 2
    De 3 a 1
    De 3 a 2
    De 1 a 2
    De 1 a 3
    De 2 a 3
    De 2 a 1
    De 3 a 1
    De 2 a 3
    De 1 a 2
    De 1 a 3
    De 2 a 3


Como puede verse no es muy vistoso que digamos. Sería más elegante una
representación gráfica. Pero esto es algo que no debería mezclarse con
la solución del problema. El error ha sido mezclar la interacción con el
usuario con la solución del problema. Vamos a arreglarlo. El resultado
de ``hanoi`` debe ser la secuencia de movimientos. Cada movimiento es un
par de números, el palo origen y el destino. Por tanto el resultado debe
ser una lista de tuplas de dos números. Para concatenar dos listas
podemos usar el método ``extend`` de las listas o la suma de listas, que
también concatena.

.. code:: python

    def hanoi(n, orig=1, dest=3):
        '''
        Asume n número natural (> 0), 
        orig número de palo origen, orig in (1,2,3),
        dest número de palo destino, dest in (1,2,3).
        Imprime los movimientos a realizar para mover n discos
        desde el palo orig al palo dest.
        '''
        if n < 1:
            return []
        libre = [x for x in (1,2,3) if not x in (orig,dest)][0]
        return hanoi(n-1, orig, libre) \
                + [(orig, dest)] \
                + hanoi(n-1, libre, dest)

.. code:: python

    print(hanoi(4))


.. parsed-literal::

    [(1, 2), (1, 3), (2, 3), (1, 2), (3, 1), (3, 2), (1, 2), (1, 3), (2, 3), (2, 1), (3, 1), (2, 3), (1, 2), (1, 3), (2, 3)]


Y si queremos volver a tener la misma salida:

.. code:: python

    for m in hanoi(4):
        print('De {} a {}'.format(m[0], m[1]))


.. parsed-literal::

    De 1 a 2
    De 1 a 3
    De 2 a 3
    De 1 a 2
    De 3 a 1
    De 3 a 2
    De 1 a 2
    De 1 a 3
    De 2 a 3
    De 2 a 1
    De 3 a 1
    De 2 a 3
    De 1 a 2
    De 1 a 3
    De 2 a 3


Lo bueno es que ahora podemos preparar otra visualización más vistosa
sin tocar el algoritmo.

.. code:: python

    %matplotlib inline
    from IPython.display import HTML, display
    from IPython.html.widgets.interaction import interact
    
    def mostrar_torres(ndiscos=8, paso=0):
        '''Asume ndiscos entero positivo (> 0)
           paso entero positivo (>= 0).
           Muestra un SVG que represemta el estado de las
           torres en esta situación.
        '''
        t = [list(range(ndiscos+1,1,-1)),[],[]]
        mov = hanoi(ndiscos)
        for i in range(min(paso, len(mov))):
            mover(t,mov[i])
        display(HTML(torres(t)))
    
    def mover(t,m):
        '''Asume t es una lista de 3 listas. Cada lista de t 
           contiene los discos del palo correspondiente. Cada
           disco se representa con su longitud.
           Asume m es una tupla de dos números. El palo origen
           y el palo destino. Los palos se numeran desde 1.
           Mueve el último disco según de t[m[0]] a t[m[1]].
        '''
        orig, dest = m
        t[dest-1].append(t[orig-1].pop())
    
    def torres(ll):
        '''Asume ll es una lista de 3 listas. Cada lista de t 
           contiene los discos del palo correspondiente. Cada
           disco se representa con su longitud.
           Devuelve un SVG que representa el contenido de ll.
        '''
        return '<svg width="600" height="180">{}</svg>' \
                .format(''.join([palos(150, 6, 100)] + \
                          [torre(ll[i],i+1, 100) for i in range(len(ll))]))
    
    def palos(x, w, h):
        '''Asume x, w, h son enteros positivos que representan 
           respectivamente la posición en el eje x del primer palo,
           el ancho y el alto.
           Devuelve una cadena con los elementos graficos que 
           representan los palos y la base de las torres de Hanoi.
        '''
        return ''.join([rect(x-w/2, 10, w, h),
                        rect(2*x-w/2, 10, w, h),
                        rect(3*x-w/2, 10, w, h),
                        rect(x/2, 10+h, 3*x, 2*w)])
    
    def rect(x,y,w,h,style='fill:lightgray'):
        '''Asume x, y, w, h son enteros positivos que representan
           respectivamente la posición en el eje x, en el eje y, el
           ancho y el alto.
           Asume style es una cadena que contiene un estilo CSS.
           Devuelve una cadena que representa el rectángulo de estas
           características.
        '''
        return '<rect x="{}" y="{}" width="{}" height="{}" style="{}" />' \
                .format(x,y,w,h,style)
    
    def torre(l, palo, h):
        '''Asume l es una lista de enteros que corresponde a los anchos
           de los discos de una torre desde el inferior hasta el superior.
           Asume palo es un entero (palo in [1,2,3]).
           Asume h entero positivo.
           Devuelve una cadena con la representación gráfica de la torre
           correspondiente, siendo h la altura del palo.
        '''
        return ''.join([disco(l[i], palo, i, h) for i in range(len(l))])
    
    def disco(ancho, palo, y, h):
        '''Asume ancho, palo, y, h enteros positivos.
           Asume palo in [1,2,3].
           Devuelve una cadena con la representación gráfica de un disco de
           ancho ancho, en el palo palo, en la posición y, siendo la altura
           del palo h.
        '''
        return '''
    <rect x="{}" y="{}" rx="5" ry="5" width="{}" height="10"
     style="fill:red;stroke:black" />''' \
        .format(palo*150 - ancho*5, h - 10*y, ancho*10)
    
    interact(mostrar_torres, ndiscos=(4,8,1), paso=(0,256,1))



.. raw:: html

    <svg width="600" height="180"><rect x="147.0" y="10" width="6" height="100" style="fill:lightgray" /><rect x="297.0" y="10" width="6" height="100" style="fill:lightgray" /><rect x="447.0" y="10" width="6" height="100" style="fill:lightgray" /><rect x="75.0" y="110" width="450" height="12" style="fill:lightgray" />
    <rect x="125" y="100" rx="5" ry="5" width="50" height="10"
     style="fill:red;stroke:black" />
    <rect x="130" y="90" rx="5" ry="5" width="40" height="10"
     style="fill:red;stroke:black" />
    <rect x="135" y="80" rx="5" ry="5" width="30" height="10"
     style="fill:red;stroke:black" />
    <rect x="140" y="70" rx="5" ry="5" width="20" height="10"
     style="fill:red;stroke:black" /></svg>


Ordenación: *Merge sort*
------------------------

Consideremos el problema de ordenar una secuencia de números.

.. code:: python

    import random
    datos = list(range(20))
    random.shuffle(datos)
    print(datos)


.. parsed-literal::

    [13, 14, 16, 8, 2, 1, 19, 10, 9, 7, 0, 17, 18, 5, 3, 15, 12, 11, 6, 4]


Podemos aplicar *divide y vencerás* de varias formas. Por ejemplo,
dividimos la lista en 2, ordenamos las 2 mitades y mezclamos las dos
listas ordenadas. Este algoritmo se lo debemos a John von Neumann.

.. code:: python

    def merge_sort(l):
        if len(l) < 2: 
            return l
        mitad = len(l)//2
        return merge(merge_sort(l[:mitad]),
                     merge_sort(l[mitad:]))
    
    def merge(l1, l2):
        i, j = 0, 0
        l = []
        while i < len(l1) and j < len(l2):
            if l1[i] < l2[j]:
                l.append(l1[i])
                i += 1
            else:
                l.append(l2[j])
                j += 1
        return l + l1[i:] + l2[j:]

Lo único complejo es la mezcla. La mezcla selecciona elementos de una
lista o de otra dependiendo de cuál tiene el menor. Cuando una lista se
acaba la mezcla debe incluir el resto de la otra. Tal vez sea más fácil
de entender la función ``merge`` si usamos divide y vencerás para
describirla.

.. code:: python

    def merge(l1, l2):
        if len(l1) == 0:
            return l2
        if len(l2) == 0:
            return l1
        if l1[0] < l2[0]:
            return [l1[0]] + merge(l1[1:], l2)
        return [l2[0]] + merge(l1, l2[1:])

.. code:: python

    print(merge_sort(datos))


.. parsed-literal::

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]


Una característica interesante de este algoritmo es que es fácil de
adaptar al caso en el que no disponemos de memoria suficiente para
ordenar todos los elementos (por ejemplo, cuando los datos están en una
base de datos). Sin embargo se trata de un algoritmo que consume
bastante memoria, porque se copian los elementos para formar las listas
ordenadas.

Ordenación: *Quicksort*
-----------------------

Otra forma de aplicar la estrategia de *divide y vencerás* es el
algoritmo Quicksort de C. A. R. Hoare. El método consiste en seleccionar
un elemento denominado *pivote*. Todos los elementos menores o iguales
al pivote se ponen a un lado y todos los mayores o iguales se ponen a
otro lado. Al acabar tenemos dos grupos de números que volvemos a
ordenar utilizando el mismo algoritmo. Lo bueno de este algoritmo es que
puede usarse *in-place* para reducir el consumo de memoria.

.. code:: python

    def qsort(l):
        qsort_segmento(l, 0, len(l))
    
    def qsort_segmento(l, primero, ultimo):
        if ultimo - primero < 2:
            return
        div = clasifica(l, primero, ultimo)
        qsort_segmento(l, primero, div)
        qsort_segmento(l, div, ultimo)
        
    def clasifica(l, primero, ultimo):
        pivote = (primero + ultimo) // 2
        l[primero], l[pivote] = l[pivote], l[primero]
        div = primero + 1
        for i in range(primero + 1, ultimo):
            if l[i] <= l[primero]:
                l[div], l[i] = l[i], l[div]
                div += 1
        return div

La parte más difícil es clasificar con respecto al pivote. Nosotros
seleccionamos el elemento del medio como pivote (para no perjudicar a
las listas ya ordenadas). Ese elemento lo situamos como primero del
segmento a ordenar y el resto lo vamos pegando a él si es menor o igual
o lo dejamos si es mayor. Puede que te preguntes por qué se mueve el
pivote como primer elemento. Se hace para evitar casos desafortunados en
que el pivote es el mayor elemento del segmento. Si no se moviera
llamaríamos indefinidamente a la función de ordenación con el mismo
segmento.

Solo queda probarlo.

.. code:: python

    ordenados = datos[:]
    qsort(ordenados)
    print(ordenados)


.. parsed-literal::

    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]


