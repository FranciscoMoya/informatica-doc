
Resumen de métodos computacionales
==================================

A lo largo del curso hemos aprendido un buen número de métodos para
resolver problemas con un ordenador. Veamos un pequeño resumen con
ejemplos sencillos.

Conjeturar y comprobar
----------------------

Los métodos de *guess and check* engloban toda una familia de métodos,
que incluyen métodos de enumeración exhaustiva, bisección, algunos
métodos estocásticos, algoritmos genéticos, ...

*Encontrar la raiz cuadrada de un número natural*

.. code:: python

    def raiz_cuadrada(x):
        g = primera_conjetura(x)
        while True:
            if suficientemente_proximos(g*g, x):
                return g
            g = nueva_conjetura(x,g)

.. code:: python

    (g + x/g)/2

Enumeración exhaustiva
----------------------

La *enumeración exhaustiva* o *fuerza bruta* se utiliza cuando el número
de casos a probar no es prohibitivamente alto y la evaluación de cada
caso es sencilla. Por ejemplo:

*Encontrar la raiz cúbica de un número natural*.

.. code:: python

    def raiz_cubica(n):
        i = 1
        while i**3 < n:
            i = i + 1
        if i**3 == n:
            return i
        return False

Búsqueda por bisección
----------------------

La *búsqueda por bisección* se utiliza cuando las posibles soluciones
están totalmente ordenadas y se puede determinar cuál es la posible
solución que se encuentra entre dos dadas. Por ejemplo:

*Encontrar la raiz cúbica de un número real con una precisión dada*

.. code:: python

    def raiz_cubica(x, epsilon):
        low = 0.0
        high = max(1.0, x)
        r = (high + low)/2.0
        while abs(r**3 - x) >= epsilon:
            if r**3 < x: low = r
            else: high = r
            r = (high + low)/2.0
        return r

Método de Newton-Raphson
------------------------

Para el problema particular de encontrar las raizes de un polinomio
:math:`p(x) = 0` el mátodo de Newton Raphson establece un método que
converge más rápidamente que la búsqueda por bisección. Se basa en esl
siguiente teorema:

*Sea :math:`p(x)` un polinomio en :math:`x`. Sea :math:`g` conjetura que
aproxima una raiz, es decir :math:`p(g) \simeq 0`. Entonces
:math:`g - p(g)/p’(g)` es mejor conjetura.*

Por ejemplo:

*Encontrar la raiz cúbica de un número real con una precisión dada*

.. code:: python

    def raiz_cubica(k, epsilon):
        x = k/2.0
        while abs(x**3 - k) >= epsilon:
            x -= (x**3 - k)/(3*x**2)
        return x

Divide y vencerás
-----------------

*Divide y vencerás* es un principio general para resolución de problemas
que pueden ser descompuestos en problemas más pequeños. Debe cumplir un
requisito:

-  Subestructura óptima. La solución del problema puede componerse a
   partir de soluciones a problemas más pequeños

Por ejemplo:

*Encontrar la potencia n-sima de un número real*

.. code:: python

    def pot(x, n):
      if n == 1: return x
      if n % 2 == 0:
        y = pot(x, n//2)
        return y*y
      else:
        y = pot(x, (n-1)//2)
        return y*y*x

Programación dinámica
---------------------

Cuando la solución a un problema exige rehacer repetidamente los mismos
cálculos es posible reducir el trabajo aplicando *memoization*
(guardando los valores ya calculados). Deben cumplirse dos requisitos:

-  Subestructura óptima. La solución del problema puede componerse a
   partir de las soluciones a problemas más pequeños
-  Subproblemas solapados. Los problemas más pequeños son frecuentemente
   repetidos.

Por ejemplo:

*Calcular el término n-simo de la sucesión de Fibonacci*

.. code:: python

    def fib(n, mem = {}):
        if n == 0 or n == 1:
            return 1
        try:
            return mem[n]
        except KeyError:
            res = fib(n-1, mem) + fib(n-2, mem)
            mem[n] = res
            return res

Poda del espacio de búsqueda
----------------------------

En algunos casos la búsqueda exhaustiva no es posible por existir un
número excesivo de posibles soluciones. En esos casos pueden utilizarse
técnicas que reducen el espacio de búsqueda.

Una técnica muy efectiva es la *propagación de restricciones*. Se trata
de determinar restricciones de la solución final y propagarlas en los
subproblemas para obtener nuevas restricciones en la solución final. Por
ejemplo, en la solución al Sudoku:

.. code:: python

    class Restricciones(object):
        def _filtrar(self):
            while self._nuevos_fijos:
                self._nuevos_fijos = False
                self._filtrarFilas()
                self._filtrarColumnas()
                self._filtrarBloques()
        #...

