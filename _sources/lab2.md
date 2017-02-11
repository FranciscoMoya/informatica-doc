-*- coding: utf-8 -*-

### Bucles e iteración

Este segundo bloque está concebido para que utilices bucles y
practiques iterando (recorriendo) estructuras de datos.

En todos los bloques se propone la realización de una serie de
ejercicios. Cada uno de ellos consistirá en definir una o varias
funciones. Debes definir todas las funciones en la entrega.

Esta página comprobará que los ejercicios se han realizado
correctamente y no permitirá entregas con errores sintácticos.  **Sin
embargo en este bloque se permitirán entregas que solo pasen el 50% de
las pruebas.**

#### 11. Suma de rango de enteros

Define una función `suma_rango` que tenga dos argumentos enteros y
devuelva la suma de todos los números desde el primero hasta el
segundo, sin contar este último. Se asume que el primer argumento es
menor que el segundo.


#### 12 Contar negativos

Define una función `contar_negativos` que tenga un único argumento que
es una lista de enteros. Debe devolver el número de enteros negativos
que contiene.


#### 13. Números primos

Define una función de nombre `es_primo` que admita un único argumento
entero. Esta función debe devolver `True` si el argumento es un número
primo y `False` en caso contrario.


#### 14. Buscar vocal

Define una función `buscar_vocal` que tenga un único argumento de tipo
cadena de texto y devuelva la posición de la primera vocal
encontrada. Si no encuentra vocales debe devolver -1. 

**Nota: la primera letra tiene la posición 0.**


#### 15. Múltiplos de 7

Define una función `multiplos_7_en_rango` que tenga dos argumentos
enteros y devuelva una lista con todos los números enteros entre ambos
argumentos (sin contar el segundo argumento) que sean múltiplos
de 7. Se asume que el primer argumento es menor que el segundo.

#### 16. Cuadrado ASCII

Define una función `dibujar_cuadrado` que tenga un argumento entero
que corresponde al ancho del cuadrado en caracteres. Esta función debe
imprimir por salida estándar el dibujo de un cuadrado del ancho
especificado en caracteres. Por ejemplo, para el ancho 8 la función
debe imprimir exactamente el dibujo siguiente.

```
+------+
|      |
|      |
+------+
```

**Nota: El ancho puede asumirse entero par mayor o igual a 4. Nótese
que el ancho incluye los caracteres de los bordes y esquinas. Nótese
que la altura del cuadrado es la mitad de la anchura.**

#### 17. Código César

Escribe una función `codigo_cesar` que tenga un único argumento de
tipo cadena de texto. Debe devolver otra cadena resultado de aplicar
el [cifrado césar](https://es.wikipedia.org/wiki/Cifrado_César)
con desplazamiento de 3 posiciones a la cadena original. No se
consideran letras acentuadas, ni diéresis, ni ñ, ni números.

**Nota: Las letras a considerar son las que muestra el siguiente
fragmento (en el mismo orden).**

```
import string
print(string.ascii_letters)
```

#### 18. Números perfectos

Escribe una función `es_perfecto(n)` que devuelva `True` si el
argumento es
un [número perfecto](https://es.wikipedia.org/wiki/Número_perfecto) y
`False` si no lo es.


#### 19. Cifras decimales

Escribe una función `cifras(n)` que devuelve una lista de las cifras
decimales de su argumento. Por ejemplo, para el número 1984 devuelve
`[1, 9, 8, 4]`.

#### 20. Las siete y media

Un popular juego de naipes llamado
[las siete y media](https://es.wikipedia.org/wiki/Siete_y_media)
precisa sumar los valores de conjuntos de cartas de una manera muy
peculiar.  Los naipes están numerados del 1 al 12, aunque los 8 y los
9 no se utilizan en este juego.  Cada carta vale lo que corresponde a
su número salvo los 10, 11 y 12 que valen solo 0.5 puntos.  Si se
superan los 7.5 puntos se ha perdido.  Si no se supera gana el que más
se aproxime a 7.5 puntos (de ahí el nombre). Escribe una función
`compara_mano` que acepta dos listas de números correspondientes a la
mano de dos jugadores y devuelve 1 si gana la primera lista, 2 si gana
la segunda lista y 0 si hay empate. Por ejemplo,
`compara_mano([1,5,12], [7,10])` debe devolver 2.

#### Pruebas

A continuación se incluyen las pruebas que será necesario pasar para
aceptar esta entrega.  Debe pasar al menos <span id="minpass">5</span>
pruebas (50% del total) para aceptar la entrega.  Consulta [esta
página](https://franciscomoya.github.io/informatica-doc/docs/test-debug.html)
para aprender cómo pueden ayudarte las pruebas a desarrollar tu propio
programa.


```
import sys
try: from io import StringIO
except: from StringIO import StringIO

class Test(unittest.TestCase):
    def test_suma_rango(self):
        self.assertEqual(suma_rango(5,5), 0)
        self.assertEqual(suma_rango(0,5), 10)
        self.assertEqual(suma_rango(5,10), 35)
        self.assertEqual(suma_rango(-3,4), 0)
		
    def test_contar_negativos(self):
        self.assertEqual(contar_negativos([]), 0)
        self.assertEqual(contar_negativos([0, -2, 0, -1]), 2)
        self.assertEqual(contar_negativos([0, -1, -1]), 2)
        self.assertEqual(contar_negativos([0, 1, 1]), 0)
		
    def test_buscar_vocal(self):
        self.assertEqual(buscar_vocal('prueba'), 2)
        self.assertEqual(buscar_vocal('PRUEBA'), 2)
        self.assertEqual(buscar_vocal('AEIOU'), 0)
        self.assertEqual(buscar_vocal('Sdzqrt3'), -1)
        self.assertEqual(buscar_vocal('prJ3b4 s1n V0C4L3S'), -1)
		
    def test_multiplos_7_en_rango(self):
        self.assertEqual(multiplos_7_en_rango(1,7), [])
        self.assertEqual(multiplos_7_en_rango(1,14), [7])
        self.assertEqual(multiplos_7_en_rango(7,21), [7,14])
        self.assertEqual(multiplos_7_en_rango(7,77), [7,14,21,28,35,42,49,56,63,70])
		
    def test_dibujar_cuadrado(self):
        self.clear_std_output()
        self.assertEqual(self.std_output(dibujar_cuadrado(12)),
                         ['+----------+',
                          '|          |',
                          '|          |',
                          '|          |',
                          '|          |',
                          '+----------+'])
        self.clear_std_output()
        self.assertEqual(self.std_output(dibujar_cuadrado(8)),
                         ['+------+',
                          '|      |',
                          '|      |',
                          '+------+'])
        self.clear_std_output()
        self.assertEqual(self.std_output(dibujar_cuadrado(4)),
                         ['+--+',
                          '+--+'])

    def test_codigo_cesar(self):
        self.assertEqual(codigo_cesar('abcdef'), 'defghi')
        self.assertEqual(codigo_cesar('ABCDEF'), 'DEFGHI')
        self.assertEqual(codigo_cesar('AZ'), 'Dc')
        self.assertEqual(codigo_cesar('MaximoSecreto'), 'PdAlprVhfuhwr')
		
    def test_es_perfecto(self):
        self.assertTrue(es_perfecto(6))
        self.assertTrue(es_perfecto(28))
        self.assertTrue(es_perfecto(496))
        self.assertTrue(es_perfecto(8128))
        self.assertFalse(es_perfecto(5))
        self.assertFalse(es_perfecto(27))
        self.assertFalse(es_perfecto(495))
        self.assertFalse(es_perfecto(8127))
		
    def test_cifras(self):
        self.assertEqual(cifras(2016), [2,0,1,6])
        self.assertEqual(cifras(123456789), list(range(1,10)))
        self.assertEqual(cifras(9876543210), list(range(9,-1,-1)))
		
    def test_compara_mano(self):
        self.assertEqual(compara_mano([1,5,12], [7,10]), 2)
        self.assertEqual(compara_mano([2,5,12], [7,10]), 0)
        self.assertEqual(compara_mano([5,12], [3,10]), 1)
        self.assertEqual(compara_mano([5,12,3], [5,10]), 2)
        self.assertEqual(compara_mano([5,12,3], [5,10,4]), 0)

    def setUp(self):
        self.console = sys.stdout
        self.s = ''

    def tearDown(self):
        self.s += sys.stdout.getvalue()
        sys.stdout = self.console
        print(self.s)

    def std_output(self, _):
        sys.stdout.flush()
        return [x.strip() for x in sys.stdout.getvalue().strip().split('\n')]

    def clear_std_output(self):
        self.s += sys.stdout.getvalue()
        sys.stdout = StringIO()		
```
