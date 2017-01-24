
Resolución de Sudokus
=====================

Ya hemos resuelto el problema de comprobar un Sudoku. Vamos ahora a
hacer un programa que resuelve Sudokus. Plantéatelo como un caso de
estudio que se parece mucho a los problemas de exámen. Para ello vamos a
utilizar clases.

Como siempre utilizaremos un diseño top-down. Empezaremos por resolver
el problema asumiendo que está resuelto cualquier subproblema de más
bajo nivel.

Puede modelarse como un problema de árboles de decisión pero en lugar de
un árbol binario se trata de un árbol con tantas ramas como opciones
disponibles hay en cada casilla. Para validar la solución simplemente
tenemos que intentar construir un Sudoku. Si no fuera posible es que las
nuevas restricciones no son consistentes.

.. code:: python

    def resolver_sudoku(sudoku):
        '''Asume sudoku de tipo Sudoku parcialmente especificado.
           Devuelve un Sudoku solución del que se pasa como argumento.'''
        restricciones = [ sudoku.get(x,y) for y in range(9) for x in range(9) ]
        return buscar_solucion(restricciones, Sudoku)

La función ``buscar_solucion`` puede hacerse de forma genérica para
cualquier problema de toma de decisiones dadas unas restricciones y una
clase que se instancia (o una función que se llama) con esas
restricciones.

El funcionamiento es muy simple. La función debe ir fijando valores para
cada casilla y probar todos los demás valores en las siguientes
casillas. Así en un momento dado tendremos una serie de valores ya
fijados y la misma función ``buscar_solucion`` se invocará para probar
todos los valores que permiten las restricciones a partir de un punto
dado.

.. code:: python

    def buscar_solucion(restricciones, solucion, desde = 0):
        '''Asume 'restricciones' una lista de listas, 
           'solucion' una clase o función, 
           'desde' un entero <= len(restricciones).
           Si solucion(x) no es válida 'solucion' eleva ValueError.
    
           Devuelve el resultado de llamar a solucion con un conjunto
           de restricciones completo (cada elemento tiene un solo elemento).
           Si no existe ninguna solución válida eleva excepción ValueError.'''
        if desde >= len(restricciones):
            return solucion(restricciones)
        
        for i in restricciones[desde]:
            tentativa = restricciones[:desde] + [[i]] + restricciones[desde+1:]
            try: return buscar_solucion(tentativa, solucion, desde+1)
            except ValueError: pass
            
        raise ValueError('No hay solución')

Probemos con un ejemplo sencillo.

.. code:: python

    def sol(x):
        for i in x: 
            if x.count(i) > 1: raise ValueError('Repetidos')
        return x
    
    print(buscar_solucion([[1], [2], [2, 3], [3, 4]], sol))


.. parsed-literal::

    [[1], [2], [3], [4]]


Modelo de Sudoku
----------------

En lo que hemos hecho hasta ahora necesitamos una clase ``Sudoku`` que
se pueda construir a partir de una lista de restricciones y que tenga un
método ``get`` para obtener el elemento de coordenadas dadas. Cada
elemento es una lista de números posibles.

Conviene pararnos a pensar en los invariantes de representación que debe
garantizar la clase ``Sudoku``. Por un lado debe garantizar que cada
celda tiene solo números de 1 a 9. Por otro lado debe garantizar que en
cada columna, en cada fila y en cada bloque hay posibilidad de tener
todos los números de 1 a 9.

.. code:: python

    class Sudoku(object):
        'Sudoku modela un juego de sudoku parcialmente especificado'
        
        def __init__(self, restricciones):
            '''Asume restricciones lista de listas.
               Construye un Sudoku dadas unas restricciones. 
               Las restricciones se especifican for filas y contienen
               todos los números permitidos en cada casilla'''
            self._rep = [ restricciones[y*9:][:9] for y in range(9) ]
            self._comprobar()
            
        def get(self, x, y):
            '''Asume x, y enteros pertenecientes a range(9).
               Devuelve el contenido de la celda de coordenadas x,y.'''
            return self._rep[y][x]
        
        def __str__(self):
            'Devuelve cadena que representa al Sudoku'
            def str_fila(f):
                return ','.join([str_celda(c) for c in f])
            def str_celda(c):
                return '[' + ' '.join([ str(i) for i in c ]) + ']'
            return '\n'.join([ str_fila(fila) for fila in self._rep ])
        
        def _comprobar(self):
            '''Comprueba los invariantes de representación y eleva 
               ValueError si no se cumplen'''
            self._comprobar_celdas()
            self._comprobar_filas()
            self._comprobar_columnas()
            self._comprobar_bloques()
            
        def _comprobar_celdas(self):
            for y in range(9):
                for x in range(9):
                    _comprobarNum(self._rep[y][x])
            
        def _comprobar_filas(self):
            for y in range(9):
                _comprobar9(self._rep[y])
        
        def _comprobar_columnas(self):
            for x in range(9):
                _comprobar9([self._rep[y][x] for y in range(9)])
                
        def _comprobar_bloques(self):
            for x in range(3):
                for y in range(3):
                    _comprobar9([self._rep[y*3 + j][x*3 + i] for j in range(3) for i in range(3)])

Comprobaciones del invariante de representación
-----------------------------------------------

Hemos delegado las comprobaciones en una función ``comprobarNum``\ que
comprueba que cada elemento de una casilla es una cifra válida, y
``_comprobar9`` que comprueba la consistencia de nueve casillas con cada
una de las nueve cifras del 1 al 9. A su vex ésta puede delegar en
``_comprobar1`` que comprueba la consistencia una cifra en particular:

-  Verifica que la cifra exista en alguna de las casillas.
-  Verifica que si hay casillas fijas esos valores no aparecen en el
   resto de casillas.

.. code:: python

    def _comprobar9(L):
        '''Asume L lista de listas.
           Eleva excepción ValueError si L corresponde a conjunto
           no consistente de restricciones. Se define '''
        for i in range(1,10):
            _comprobar1(L, i)
    
    def _comprobar1(L, n):
        '''Asume L lista de listas, n entero in range(1,10).
           Eleva excepción si L no corresponde a un conjunto de
           de restricciones válido con respecto al número n.'''
        cont = sum([c.count(n) for c in L])
        if cont < 1:
            raise ValueError('Falta ' + str(n))
        fijos = sum([c.count(n) for c in L if len(c) == 1])
        if fijos > 1:
            raise ValueError('Sobra ' + str(n))
    
    def _comprobarNum(celda):
        '''Asume celda lista.
           Eleva excepción si algún elemento no es dígito de 1 a 9'''
        for i in celda:
            if not i in range(1,10):
                raise ValueError('Valor ' + str(i) + ' no válido')

.. code:: python

    s = Sudoku([
    [2],    [8],    [9],[7],  [4],[5],[6],    [1],[3],
    [7],    [6],    [3],[9],  [2],[1],[8],    [5],[4],
    [5,9],  [1,3,5],[4],[1,3],[6],[8],[1,9],  [2],[7],
    [6],    [4],    [1],[2],  [5],[9],[7],    [3],[8],
    [3],    [7],    [2],[8],  [1],[4],[5],    [6],[9],
    [8],    [9],    [5],[6],  [7],[3],[2],    [4],[1],
    [4,5,9],[1,5],  [8],[1,5],[3],[2],[1,4,9],[7],[6],
    [4,5],  [1,3,5],[7],[1,5],[8],[6],[1,4],  [9],[2],
    [1],    [2],    [6],[4],  [9],[7],[3],    [8],[5]])
    
    print(resolver_sudoku(s))


.. parsed-literal::

    [2],[8],[9],[7],[4],[5],[6],[1],[3]
    [7],[6],[3],[9],[2],[1],[8],[5],[4]
    [5],[1],[4],[3],[6],[8],[9],[2],[7]
    [6],[4],[1],[2],[5],[9],[7],[3],[8]
    [3],[7],[2],[8],[1],[4],[5],[6],[9]
    [8],[9],[5],[6],[7],[3],[2],[4],[1]
    [9],[5],[8],[1],[3],[2],[4],[7],[6]
    [4],[3],[7],[5],[8],[6],[1],[9],[2]
    [1],[2],[6],[4],[9],[7],[3],[8],[5]


Creación de Sudokus
-------------------

El constructor de Sudokus requiere una especificación de restricciones
que puede ser un poco engorrosa de teclear. Para facilitar eso se puede
hacer un *builder*, una función o clase que ayuda a construir Sudokus a
partir de elementos más simples, como cadenas de texto.

Empezaremos por la versión más simple, en la que las celdas vacías
equivalen a no tener ningún tipo de restricción. Es decir, el valor de
la celda corresponde a ``range(1,10)``.

.. code:: python

    def crearSudoku(desc):
        '''Asume desc una cadena que describe el Sudoku.
           Devuelve un Sudoku que corresponde a dicha descripción.'''
        restricciones = [ crearCelda(i) for i in desc if not i in ' \r\n' ]
        return Sudoku(restricciones)
        
    def crearCelda(c):
        '''Asume c un caracter que representa una celda.
           Devuelve la restricción correspondiente.
           '.' se interpreta como celda sin rellenar.'''
        if c == '.':
            return list(range(1,10))
        if c in '123456789':
            return [ int(c) ]
        raise ValueError('Caracter ' + c + ' inválido')

.. code:: python

    s = crearSudoku(
    '''.....56..
       76......4
       .....8.27
       .4.2...38
       37...45..
       .9.6.324.
       ..8.32..6
       ....86..2
       .264.....''')
    
    print(s)


.. parsed-literal::

    [1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[5],[6],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9]
    [7],[6],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[4]
    [1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[8],[1 2 3 4 5 6 7 8 9],[2],[7]
    [1 2 3 4 5 6 7 8 9],[4],[1 2 3 4 5 6 7 8 9],[2],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[3],[8]
    [3],[7],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[4],[5],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9]
    [1 2 3 4 5 6 7 8 9],[9],[1 2 3 4 5 6 7 8 9],[6],[1 2 3 4 5 6 7 8 9],[3],[2],[4],[1 2 3 4 5 6 7 8 9]
    [1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[8],[1 2 3 4 5 6 7 8 9],[3],[2],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[6]
    [1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[8],[6],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[2]
    [1 2 3 4 5 6 7 8 9],[2],[6],[4],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9],[1 2 3 4 5 6 7 8 9]


Sin embargo no nos podemos plantear resolver el sudoku con estas
restricciones. Hay demasiadas posibilidades. ¿Sabes cuántas? Prueba a
calcularlas con un pequeño programita. Si te rindes mira más adelante en
este documento.

Una forma efectiva es eliminar de las casillas no fijas aquellos números
que están en las casillas fijas de la misma columna, fila o grupo.

.. code:: python

    def crearSudoku(desc):
        '''Asume desc una cadena que describe el Sudoku.
           Devuelve un Sudoku que corresponde a dicha descripción.'''
        restricciones = [ crearCelda(i) for i in desc if not i in ' \r\n' ]
        filtrarRestricciones(restricciones)
        return Sudoku(restricciones)
    
    def filtrarRestricciones(r):
        '''Asume r una lista de listas.
           Elimina de los elementos de r todos aquellos candidatos que ya
           están en una celda fija de la misma fila, columna o bloque. Una
           celda fija es aquella en la que solo hay un candidato.
        '''
        while True:
            nuevos_fijos = filtrarFilas(r) \
                           or filtrarColumnas(r) \
                           or filtrarBloques(r)
            if not nuevos_fijos: break
        
    def filtrarFilas(r):
        '''Asume r lista de listas.
           Elimina de los elementos de r los candidatos que ya están
           en una celda fija de la misma fila.
           Devuelve True si han aparecido nuevas celdas fijas y False
           en caso contrario.'''
        nuevos_fijos = False
        for i in range(9):
            nuevos_fijos = nuevos_fijos or eliminarRepetidos(r[i*9:(i+1)*9])
        return nuevos_fijos
    
    def filtrarColumnas(r):
        '''Asume r lista de listas.
           Elimina de los elementos de r los candidatos que ya están
           en una celda fija de la misma columna.
           Devuelve True si han aparecido nuevas celdas fijas y False
           en caso contrario.'''
        nuevos_fijos = False
        for i in range(9):
            nuevos_fijos = nuevos_fijos or eliminarRepetidos(r[i::9])
        return nuevos_fijos
    
    def filtrarBloques(r):
        '''Asume r lista de listas.
           Elimina de los elementos de r los candidatos que ya están
           en una celda fija del mismo bloque.
           Devuelve True si han aparecido nuevas celdas fijas y False
           en caso contrario.'''
        nuevos_fijos = False
        for y in range(0,9,3):
            for x in range(0,9,3):
                nuevos_fijos = nuevos_fijos or filtrarBloque(r, x, y)
        return nuevos_fijos
    
    def filtrarBloque(r, x, y):  
        '''Asume r lista de listas, x e y enteros.
           Elimina de los elementos de r los candidatos que ya están
           en una celda fija del bloque que empieza en las coordenadas
           (x, y).
           Devuelve True si han aparecido nuevas celdas fijas y False
           en caso contrario.'''
        l = []
        o = y*9+x
        for o in range(o, o+27, 9):
            l += r[o:o+3]
        nuevos_fijos = eliminarRepetidos(l)
        o = y*9+x
        for i in range(0,9,3):
            r[o:o+3] = l[i:i+3]
            o += 9
        return nuevos_fijos

Queda la función para eliminar repetidos en un conjunto de nueve
restricciones (fila, columna o bloque).

.. code:: python

    def eliminarRepetidos(L):
        '''Asume L lista de nueve restricciones.
           Elimina elementos que ya están en una celda fija.
           Una celda fija es aquella que solo tiene un elemento.
           Devuelve True si han aparecido nuevas celdas fijas y False
           en caso contrario.'''
        nuevos_fijos = False
        for c in L:
            if len(c) == 1:
                nuevos_fijos = nuevos_fijos or eliminarFijoRepetido(L, c[0])
        return nuevos_fijos
    
    def eliminarFijoRepetido(L, n):
        '''Asume L lista de nueve restricciones, n cifra de 1 a 9.
           Elimina las apariciones de n en las celdas de L con más de un 
           elemento.
           Devuelve True si han aparecido nuevas celdas fijas y False
           en caso contrario.'''
        nuevos_fijos = False
        for c in L:
            nuevos_fijos = nuevos_fijos or eliminarCandidato(c, n)
        return nuevos_fijos
    
    def eliminarCandidato(celda, n):
        '''Asume celda lista de cifras de 1 a 9, n cifra de 1 a 9.
           Elimina n de la celda si estaba.
           Devuelve True si celda tenía a n y ha quedado con un solo 
           elemento y False en caso contrario.'''
        if len(celda) > 1 and n in celda:
            celda.remove(n)
            if len(celda) == 1:
                return True
        return False

No pienses que todo este código ha salido funcionando a la primera.
Siempre hay errores, siempre hay que aplicar el método que hemos
descrito en clase para encontrar los errores.

Pero no esperes a tener todo escrito. Prueba las funciones conforme las
vayas escribiendo. Por ejemplo, esta podría ser una prueba de
``filtrarBloque``.

.. code:: python

    def prueba_filtrarBloque():
        r = [ \
    [2,1],[7,8],[5],[6],[3],[8],[9],[4],[1],
    [8],[6],[1],[4],[7],[9],[5],[3],[2],
    [9],[3],[4],[1],[2],[5],[8],[7],[6],
    [7],[9],[3],[2],[8],[6],[1],[5],[4],
    [4],[2],[6],[5],[1],[7],[3],[8],[9],
    [5],[1],[8],[9],[4],[3],[2],[6],[7],
    [6],[8],[9],[7],[5],[2],[4],[1],[3],
    [1],[5],[2],[3],[6],[4],[7],[9],[8],
    [3],[4],[7],[8],[9],[1],[6],[2],[5]]
        print(filtrarBloque(r, 0, 0))
        print(r)
        
    prueba_filtrarBloque()


.. parsed-literal::

    True
    [[2, 1], [7], [5], [6], [3], [8], [9], [4], [1], [8], [6], [1], [4], [7], [9], [5], [3], [2], [9], [3], [4], [1], [2], [5], [8], [7], [6], [7], [9], [3], [2], [8], [6], [1], [5], [4], [4], [2], [6], [5], [1], [7], [3], [8], [9], [5], [1], [8], [9], [4], [3], [2], [6], [7], [6], [8], [9], [7], [5], [2], [4], [1], [3], [1], [5], [2], [3], [6], [4], [7], [9], [8], [3], [4], [7], [8], [9], [1], [6], [2], [5]]


.. code:: python

    s = crearSudoku(
    '''.....56..
       76......4
       .....8.27
       .4.2...38
       37...45..
       .9.6.324.
       ..8.32..6
       ....86..2
       .264.....''')
    
    print(s)


.. parsed-literal::

    [2],[8],[9],[7],[4],[5],[6],[1],[3]
    [7],[6],[3],[9],[2],[1],[8],[5],[4]
    [5],[1],[4],[3],[6],[8],[9],[2],[7]
    [6],[4],[1],[2],[5],[9],[7],[3],[8]
    [3],[7],[2],[8],[1],[4],[5],[6],[9]
    [8],[9],[5],[6],[7],[3],[2],[4],[1]
    [9],[5],[8],[1],[3],[2],[4],[7],[6]
    [4],[3],[7],[5],[8],[6],[1],[9],[2]
    [1],[2],[6],[4],[9],[7],[3],[8],[5]


La eliminación de los elementos fijos es muy efectiva pero no elimina
completamente las incertidumbres en todos los casos. Prueba con Sudokus
difíciles para ver algún ejemplo.

Evidentemente si resolvemos un Sudoku completamente especificado resulta
en lo mismo.

.. code:: python

    print(resolver_sudoku(s))


.. parsed-literal::

    [2],[8],[9],[7],[4],[5],[6],[1],[3]
    [7],[6],[3],[9],[2],[1],[8],[5],[4]
    [5],[1],[4],[3],[6],[8],[9],[2],[7]
    [6],[4],[1],[2],[5],[9],[7],[3],[8]
    [3],[7],[2],[8],[1],[4],[5],[6],[9]
    [8],[9],[5],[6],[7],[3],[2],[4],[1]
    [9],[5],[8],[1],[3],[2],[4],[7],[6]
    [4],[3],[7],[5],[8],[6],[1],[9],[2]
    [1],[2],[6],[4],[9],[7],[3],[8],[5]


Restricciones con clases
------------------------

Vamos a pararnos por un momento en el análisis de cómo hemos resuelto el
filtrado de las restricciones. ¿No te has sentido incómodo con tanto
paso de parámetros repetidos? Las clases tienen una ventaja. El paso de
parámetros es en su mayor parte innecesario, porque podemos almacenar
los resultados interesantes en los datos del propio objeto (como un
atributo).

Para ilustrar esto vamos a volver a escribir el filtrado de las
restricciones, pero esta vez con una clase que modele las propias
restricciones.

.. code:: python

    class Restricciones(object):
        def __init__(self, L):
            '''Asume L lista de listas con las restricciones.
               Construye un objeto Restricciones eliminando 
               las innecesarias'''
            self._rep = L[:]
            self._nuevos_fijos = True
            self._filtrar()
        
        def get(self):
            return self._rep[:]
        
        def _filtrar(self):
            '''Elimina todos aquellos candidatos que ya
               están en una celda fija de la misma fila,
               columna o bloque. Una celda fija es aquella 
               en la que solo hay un candidato.'''
            while self._nuevos_fijos:
                self._nuevos_fijos = False
                self._filtrarFilas()
                self._filtrarColumnas()
                self._filtrarBloques()
    
        def _filtrarFilas(self):
            '''Elimina de los elementos de _rep los candidatos 
               que ya están en una celda fija de la misma fila.
            '''
            for i in range(9):
                self._eliminarRepetidos(self._rep[i*9:(i+1)*9])
    
        def _filtrarColumnas(self):
            '''Elimina de los elementos de _rep los candidatos 
               que ya están en una celda fija de la misma columna.
            '''
            for i in range(9):
                self._eliminarRepetidos(self._rep[i::9])
    
        def _filtrarBloques(self):
            '''Elimina de los elementos de _rep los candidatos 
               que ya están en una celda fija del mismo bloque.
            '''
            for y in range(0,9,3):
                for x in range(0,9,3):
                    self._filtrarBloque(x, y)
    
        def _filtrarBloque(self, x, y):  
            '''Asume x e y enteros.
               Elimina de los elementos de _rep los candidatos 
               que ya están en una celda fija del bloque que empieza 
               en las coordenadas (x, y).
            '''
            l, o = [], y*9+x
            for i in range(o, o+27, 9):
                l += self._rep[i:i+3]
            self._eliminarRepetidos(l)
            for i in range(0,9,3):
                self._rep[o:o+3] = l[i:i+3]
                o += 9
    
        def _eliminarRepetidos(self, L):
            '''Asume L lista de nueve restricciones.
               Elimina elementos que ya están en una celda fija.
               Una celda fija es aquella que solo tiene un elemento.
               Pone _nuevos_fijos a True si han aparecido nuevas 
               celdas fijas.'''
            for c in L:
                if len(c) == 1:
                    self._eliminarFijoRepetido(L, c[0])
    
        def _eliminarFijoRepetido(self, L, n):
            '''Asume L lista de nueve restricciones, n cifra de 1 a 9.
               Elimina las apariciones de n en las celdas de L con más de 
               un elemento.
               Pone _nuevos_fijos a True si han aparecido nuevas 
               celdas fijas.'''
            for c in L:
                self._eliminarCandidato(c, n)
    
        def _eliminarCandidato(self, celda, n):
            '''Asume celda lista de cifras de 1 a 9, n cifra de 1 a 9.
               Elimina n de la celda si estaba.
               Pone _nuevos_fijos a True si han aparecido nuevas 
               celdas fijas.'''
            if len(celda) > 1 and n in celda:
                celda.remove(n)
                if len(celda) == 1:
                    self._nuevos_fijos = True

Es bastante más breve, pero no acaban ahí las ventajas.

Ya no es necesario cargar al *builder* con la responsabilidad de
mantener el invariante de representación de las restricciones. Lo hace
directamente la clase ``Restricciones``.

.. code:: python

    def crearSudoku(desc):
        '''Asume desc una cadena que describe el Sudoku.
           Devuelve un Sudoku que corresponde a dicha descripción.'''
        restricciones = Restricciones([ crearCelda(i) for i in desc if not i in ' \r\n' ])
        return Sudoku(restricciones.get())

.. code:: python

    s = crearSudoku(
    '''.....56..
       76......4
       .....8.27
       .4.2...38
       37...45..
       .9.6.324.
       ..8.32..6
       ....86..2
       .264.....''')
    
    print(s)
    print('\nSOLUCIÓN:')
    print(resolver_sudoku(s))


.. parsed-literal::

    [2],[8],[9],[7],[4],[5],[6],[1],[3]
    [7],[6],[3],[9],[2],[1],[8],[5],[4]
    [5],[1],[4],[3],[6],[8],[9],[2],[7]
    [6],[4],[1],[2],[5],[9],[7],[3],[8]
    [3],[7],[2],[8],[1],[4],[5],[6],[9]
    [8],[9],[5],[6],[7],[3],[2],[4],[1]
    [9],[5],[8],[1],[3],[2],[4],[7],[6]
    [4],[3],[7],[5],[8],[6],[1],[9],[2]
    [1],[2],[6],[4],[9],[7],[3],[8],[5]
    
    SOLUCIÓN:
    [2],[8],[9],[7],[4],[5],[6],[1],[3]
    [7],[6],[3],[9],[2],[1],[8],[5],[4]
    [5],[1],[4],[3],[6],[8],[9],[2],[7]
    [6],[4],[1],[2],[5],[9],[7],[3],[8]
    [3],[7],[2],[8],[1],[4],[5],[6],[9]
    [8],[9],[5],[6],[7],[3],[2],[4],[1]
    [9],[5],[8],[1],[3],[2],[4],[7],[6]
    [4],[3],[7],[5],[8],[6],[1],[9],[2]
    [1],[2],[6],[4],[9],[7],[3],[8],[5]


Usar clases desde las primeras etapas del diseño hace que no nos
preocupemos de los detalles (mantener los invariantes de representación)
y nos centremos en el problema desde una perspectiva más orientada a los
datos.

Sudokus difíciles
-----------------

Los sudokus más elementales se resuelven con suma facilidad. Sin embargo
hay sudokus mucho más complejos. Puedes probar con
`sudoku-online <http://www.sudoku-online.org/>`__ con el máximo grado de
dificultad para ver a qué me refiero.

Puede resultarte útil calcular el número de posibilidades a explorar.

.. code:: python

    def posibilidades(sudoku):
        ret = 1
        for i in [ len(sudoku.get(x,y)) for x in range(9) for y in range(9) ]:
            ret *= i
        return ret

.. code:: python

    s = crearSudoku(
    '''.7.8..2..
       .48......
       .3......6
       ..3.8.7..
       .2..49.35
       ....5....
       8..52..79
       ...6.....
       4.....3..''')
    
    print(posibilidades(s))
    print(s)


.. parsed-literal::

    1754956051230228480000000000000000
    [1 5 6 9],[7],[1 5 6 9],[8],[1 3 6 9],[1 3 4 5 6],[2],[1 4 5 9],[1 3 4]
    [1 2 5 6 9],[4],[8],[1 2 3 7 9],[1 3 6 7 9],[1 2 3 5 6 7],[1 5 9],[1 5 9],[1 3 7]
    [1 2 5 9],[3],[1 2 5 9],[1 2 4 7 9],[1 7 9],[1 2 4 5 7],[1 4 5 8 9],[1 4 5 8 9],[6]
    [1 5 6 9],[1 5 6 9],[3],[1 2],[8],[1 2 6],[7],[1 2 4 6 9],[1 2 4]
    [1 6 7],[2],[1 6 7],[1 7],[4],[9],[1 6 8],[3],[5]
    [1 6 7 9],[1 6 8 9],[1 4 6 7 9],[1 2 3 7],[5],[1 2 3 6 7],[1 4 6 8 9],[1 2 4 6 8 9],[1 2 4 8]
    [8],[1 6],[1 6],[5],[2],[1 3 4],[1 4 6],[7],[9]
    [1 2 3 5 7 9],[1 5 9],[1 2 5 7 9],[6],[1 3 7 9],[1 3 4 7 8],[1 4 5 8],[1 2 4 5 8],[1 2 4 8]
    [4],[1 5 6 9],[1 2 5 6 7 9],[1 7 9],[1 7 9],[1 7 8],[3],[1 2 5 6 8],[1 2 8]


Estamos hablando de más de 1700 quintillones de posibilidades (1700
billones de trillones). No queda más remedio que explorar otras
posibilidades. Una posible estrategia es aplicar otro tipo de filtrado.

Por ejemplo, si dentro de una fila, columna o bloque solo hay una celda
donde se puede poner determinada cifra entonces podemos fijarla. Podemos
ilustrarlo con la siguiente línea del sudoku anterior:

``[1 6 7],[2],[1 6 7],[1 7],[4],[9],[1 6 8],[3],[5]``

Solo hay una celda donde se puede poner el 8, así que podemos fijarla y
descartar los otros candidatos.

Otro ejemplo, si hay dos celdas en cualquier fila, columna o bloque que
contienen los mismos dos números (y ningún otro), entonces ninguna otra
puede contener esos números. Por ejemplo:

``[[1,2], [1,2], [1,3], [5], [4], [6], [7], [8], ...``

En este caso las dos primeras celdas tienen el 1 y el 2 y ningún otro.
Si una tiene el 1, la otra tiene que ser el 2 y viceversa. Por tanto ni
el 1 ni el 2 pueden estar en el resto de la fila, columna o bloque. En
particular la tercera casilla se puede simplificar a un ``[3]``.

Lo mismo se puede aplicar con un conjunto de tres casillas y tres
números. Si entre tres casillas comparten solo tres números entonces el
resto de casillas de la fila, columna o bloque no pueden tener ninguno
de esos números. Un ejemplo lo tenemos en la misma fila conocida del
sudoku anterior:

``[1 6 7],[2],[1 6 7],[1 7],[4],[9],[1 6 8],[3],[5]``

Las casillas ``[1 6 7] ... [1 6 7] y [1 7]`` comparten entre ellas solo
tres números. Por tanto la casilla ``[1 6 8]`` no puede tener ninguno de
los tres, con lo que quedaría en un ``[8]``.

Prueba a implementar alguna de estas estrategias. ¿Puedes generalizarlas
para que el caso que hemos implementado sea un caso particular?

Puede que te interese `este otro
método <http://norvig.com/sudoku.html>`__ de Peter Norvig, que utiliza
un modelo mucho más flexible que le permite ordenar la búsqueda en el
sentido que más le convenga para tener mayores probabilidades de
encontrar la solución antes.
