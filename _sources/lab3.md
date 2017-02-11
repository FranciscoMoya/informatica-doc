### Manos a la obra

Hasta ahora los programas que te hemos propuesto eran muy simples.
Tenían como propósito familiarizarse con las construcciones del
lenguaje. Como los ejercicios de calentamiento en las disciplinas
deportivas.

Este bloque, mucho más pequeño en número de ejercicios, tiene como
objetivo que desarrolles tu pensamiento computacional.  Ahora toca
trasladar conceptos del dominio del problema al dominio de la
implementación (al lenguaje python). Aplica diseño de arriba a abajo y
estrategia de divide y vencerás.  No hagas funciones de más de un
puñado de líneas y escríbelas en orden, desde lo más abstracto hacia
lo más concreto.

#### 21. Buscar texto

Escribe una función `buscar_texto` que devuelva el número de veces que
aparece la cadena que se pasa como segundo argumento en la cadena que
se pasa como primer argumento. Por ejemplo `buscar_texto('No por mucho
madrugar amanece mas temprano', 'ma')` debe devolver 3.

**Nota: a diferencia de la función `count` de las cadenas, no
  asumiremos que las ocurrencias no pueden solapar.  De hecho hay
  algún caso en el que solapa.  Mira las pruebas con atención.**

#### 22. Días entre dos fechas

Escribe una función `dias_entre_fechas` que acepta dos argumentos de
tipo tupla de tres enteros.  Cada tupla representa una fecha en
formato `(día, mes, año)`.  La función debe devolver el número de días
que hay entre las dos fechas.


#### 23. Mínimo número de movimientos

Empiezas con 1€ y, con cada movimiento, puedes o bien doblar tu dinero
o sumar otro euro. ¿Cuál es el mínimo número de movimientos para
obtener exactamente 200€?

Escribe una función `minmov` que acepta como único argumento la
cantidad objetivo (en nuestro ejemplo 200) y devuelve el mínimo número
de movimientos necesarios para obtener exactamente esa cantidad.

#### 24. Descubre la expresión

El objetivo de este ejercicio es realizar una función que encuentre
una expresión que añade signos + (suma) o - (resta) entre los dígitos
123456789 de manera que la expresión evaluada valga 100.

Por ejemplo, `1 + 2 + 3 - 4 + 5 + 6 + 78 + 9 = 100` es una posible
solución.

Escribir una función `suma_100` sin argumentos que devuelve una lista
de números enteros (positivos o negativos) que cumpla las siguientes
condiciones:

* La suma de todos sus elementos es 100.
* El resultado de imprimir todos los números en valor absoluto, en el
  mismo orden y sin ningún espacio entre ellos es la cadena
  `'123456789'`.
* La lista no corresponde a la solución de arriba.  Es decir, el
  resultado no es `[1,2,3,-4,5,6,78,9]`.

#### 25. Criptoaritmética

El objetivo de este ejercicio es resolver problemas de
[criptoaritmética](http://retomania.blogspot.com.es/2009/07/criptoaritmetica.html)
sencilla, como los que se proponen en bachillerato para desarrollar el
pensamiento lógico.

Escribe una función `resolver_criptosuma` que acepta un argumento de
tipo cadena de caracteres.  La cadena representa una expresión de suma
de dos o más números en la que cada cifra numérica ha sido sustituída
por una letra.  Por ejemplo: `'SEND+MORE=MONEY'`. La función debe
devolver un diccionario que hace corresponder a cada letra la cifra
correspondiente.  En nuestro ejemplo podría ser
`{'D':7,'E':5,'M':1,'N':6,'O':0,'R':8,'S':9,'Y':2}`.

Se deben respetar las reglas habituales:

* Letras iguales representan dígitos iguales.
* Letras diferentes representan dígitos diferentes.
* Al formar el número, nínguno debe iniciar por cero.

#### Pruebas

A continuación se incluyen las pruebas que será necesario pasar para
aceptar esta entrega.  Debe pasar al menos <span id="minpass">1</span>
de las pruebas para aceptar la entrega.  Consulta [esta
página](https://franciscomoya.github.io/informatica-doc/docs/test-debug.html)
para aprender cómo pueden ayudarte las pruebas a desarrollar tu propio
programa.

```
class Test(unittest.TestCase):
    def test_buscar_texto(self):
        self.assertEqual(buscar_texto('No por mucho madrugar amanece mas temprano', 'ma'), 3)
        self.assertEqual(buscar_texto('No aparece el texto', 'pares'), 0)
        self.assertEqual(buscar_texto('Aparece el texto', 'pare'), 1)
        self.assertEqual(buscar_texto('reparepare', 'repare'), 2)

    def test_dias_entre_fechas(self):
        import sys, datetime
        del datetime
        sys.modules['datetime'] = None
        self.assertEqual( 366,dias_entre_fechas(( 1, 1,2000), ( 1, 1,2001)))
        self.assertEqual( 365,dias_entre_fechas(( 1, 1,2001), ( 1, 1,2002)))
        self.assertEqual(6061,dias_entre_fechas((21, 3,2000), (24,10,2016)))
        self.assertEqual(  12,dias_entre_fechas((24,10,2016), ( 5,11,2016)))
        self.assertEqual(1124,dias_entre_fechas((31, 1,2001), (29, 2,2004)))

    def test_minmov(self):
        self.assertEqual(10,minmov(200))
        self.assertEqual(12,minmov(300))
        self.assertEqual(18,minmov(3000))

    def test_suma_100(self):
        result = suma_100()
        self.assertEqual(list, type(result))
        self.assertEqual(100, sum(result))
        self.assertEqual('123456789', ''.join([str(abs(i)) for i in result]))
        self.assertNotEqual([1,2,3,-4,5,6,78,9], result)

    def test_resolver_criptosuma(self):
        def chk_(s):
            d = resolver_criptosuma(s)
            num = ''.join(str(d[k]) if k in d else k for k in s)
            expr, suma = num.split('=')
            sumandos = [int(x) for x in expr.split('+')]
            return sum(sumandos) == int(suma)
        self.assertTrue(chk_('CON+AMOR+PARA=MAMA'))
        self.assertTrue(chk_('LEER+LEER=EXITO'))
```
