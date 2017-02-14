### Método de Gauss-Jordan

El método de Gauss-Jordan ha sido ampliamente ejercitado en Álgebra,
por lo que debería ser completamente conocido por todos los alumnos.
Además es un excelente ejercicio para ejercitar la programación de
bucles.

#### 1. Rango de una matriz

Definir la función `rango_matriz(m)` que devuelve el rango de una
matriz calculado por
el
[método de Gauss](http://matematicasies.com/Rango-de-una-matriz-por-el-metodo-de-Gauss).

Deberá funcionar con cualquier número de filas y columnas. No se dará
puntuación alguna a las entregas que no respeten este requisito.

##### Ejemplo de funcionamiento

```
>>> rango_matriz([[1,0,0], [0,1,0], [0,0,1]])
3
>>> rango_matriz([[0,0,0], [0,1,0], [1,2,0]])
2
>>> rango_matriz([[1,0,0], [0,0,1], [0,0,2]])
2
```

#### 2. Solución de un sistema de ecuaciones lineales

Definir una función `lin_solve(A,B)` que resuelve el sistema lineal de
ecuaciones *A·x = B* empleando el método de Gauss-Jordan.  La función
debe devolver la secuencia de operaciones a realizar sobre *A|B*,
y el vector solución.

Cada una de las operaciones se representará por una tupla, que incluye
una cadena (`'div'` para dividir, `'mac'` para multiplicar y sumar,
etc.) seguida de los argumentos necesarios (fila donde se aplica, fila
con la que se opera, factor de multiplicación, etc.).

La solución debe utilizar cualquiera de las siguientes operaciones.

Operación      | Descripción
---------------|------------
`('div',a,b)`  | Divide la fila `a` por el número `b`
`('xch',a,b)`  | Intercambia las filas `a` y `b`
`('mac',a,b,c)`| Suma a la fila `a` el resultado de multiplicar la fila `b` por el número `c`

Las matrices se representarán como una lista de filas, donde cada fila
es una lista de números.  Las filas se identifican por su índice en la
matriz (empezando en cero).

##### Ejemplo de funcionamiento

```
>>> lin_solve([[1,0,0], [0,2,0], [2,0,3]], [1, 0, 2])
([('div', 1, 2), ('mac', 2, 1, -2), ('div', 2, 3)], [1, 0, 0])
```

#### 3. Inversa de una matriz

Definir la función `inv_matriz(M)` que devuelve la matriz inversa de
la que se pasa como argumento y la lista de operaciones que se deben
aplicar sobre la matriz *M* para obtener la matriz inversa.  Debe
utilizar el método de Gauss-Jordan y las operaciones descritas en el
ejercicio anterior.

##### Ejemplo de funcionamiento

```
>>> inv_matriz([[1,0,0], [0,4,0], [0,0,10]])
[[1,0,0], [0,0.25,0], [0,0,0.1]]
```

## Pruebas

Para ser admitida la entrega deberá pasar al menos las pruebas que se
muestran en los ejemplos de funcionamiento.

```
class Test(TestCase):
    def test_rango_matriz(self):
        def f(): pass
        self.assertEqual(type(rango_matriz), type(f))

    def test_lin_solve(self):
        def f(): pass
        self.assertEqual(type(lin_solve), type(f))

    def test_inv_matriz(self):
        def f(): pass
        self.assertEqual(type(inv_matriz), type(f))
```
