# Literales, expresiones y ejecución condicional

Bienvenidos al laboratorio. Este primer bloque servirá para
familiarizarte con la mecánica de entrega de prácticas, que es la
misma del examen.

En cada bloque se propone la realización de una serie de ejercicios.
Cada uno de ellos consistirá en definir una o varias funciones.  Debes
definir todas las funciones en la entrega.

Esta página comprobará que los ejercicios se han realizado
correctamente y no permitirá entregas con errores sintácticos o con
fallos de funcionamiento.  En otros casos te permitiremos algunos
fallos.

## 1. Correo electrónico

Debes definir una función `my_email` sin argumentos que devuelva la
dirección de correo de la UCLM.

Las pruebas que deberá pasar tu entrega se muestran a continuación.
Aunque ahora mismo no lo entiendas muy bien estoy seguro de que podrás
descubrir información útil

## 2. Recortar un valor dentro de un rango

Define una función `recortar` que admita un único argumento que será
un número real. Esta función debe devolver el valor de su argumento
recortado al intervalo [−1,1]. Es decir, si el argumento es menor que
−1 debe devolver -1.0, si es mayor que 1 debe devolver 1.0, y en
cualquier otro caso debe devolver el valor del argumento.

## 3. Años bisiestos

Define una función de nombre `es_bisiesto` que admita un único
argumento entero. Esta función debe devolver
`True` si el argumento corresponde con un año bisiesto
y `False` en caso contrario.

**Nota: Un año es bisiesto si es divisible entre 4, salvo los
divisibles por 100, pero los divisibles por 400 también son
bisiestos.**

## 4. Media geométrica

Define una función de nombre `media_geometrica` que devuelva el valor
de la media geométrica de los dos números reales que se le pasen como
argumentos.

## 5. Batería cargada

Define una función de nombre `bateria_cargada` que devuelve `True` si
el argumento real que se le pasa está en el intervalo `[12.50,12.95]`
o en el intervalo `[−12.95,−12.50]`. Debe devolver `False` en
cualquier otro caso.

## 6. Calificación alfabética

Define una función de nombre `calificacion` que devuelve una cadena de
texto con la calificación alfabética correspondiente a una nota
numérica que se pasa como argumento. Si la nota es inferior a 5.0 debe
devolver `Suspenso`, si está en el intervalo [5.0,7.0) debe devolver
`Aprobado`, si está en el intervalo [7.0,9.0) debe devolver `Notable`
y si está en el intervalo [9.0,10] debe devolver `Sobresaliente`.

**Nota: El enunciado no dice nada acerca de notas superiores
a 10. Esto es intencional, el programador es libre de hacer lo que
considere más conveniente.**

## 7. Conversión Fahrenheit a Celsius

Define una función de nombre `fahrenheit_a_celsius` que transforma una
temperatura expresada en grados Fahrenheit, que se pasa como
argumento, en la misma temperatura expresada en grados centígrados,
que es devuelta por la función.

## 8. Área del círculo

Define una función `area_circulo` que calcula el área de un círculo
dado el radio, que se pasa como argumento. El radio está expresado en
metros y el área debe expresarse en metros cuadrados.

## 9. Energía cinética

Define una función `energia_cinetica` que calcula la energía cinética
en función del tiempo de una partícula de masa `m` en caída libre en
las proximidades de la superficie terrestre partiendo del reposo.
Esta función debe aceptar dos argumentos, la masa expresada en Kg y el
tiempo transcurrido desde que se dejó en caída libre expresado en
segundos.  El valor de retorno debe ser la energía cinética expresada
en Julios.

**Nota: Aunque se pide hacer una función eso no significa que no se
puedan hacer otras auxiliares para simplificar la implementación. En
particular puede interesar una función para calcular la velocidad en
función del tiempo.**

## 10. Redondeo a entero

Define una función `redondear` que devuelva el número **entero** más
próximo al real que se le pasa como argumento. El valor medio se
redondeará en exceso, es decir 0.5 se redondeará como 1.

## Pruebas

A continuación se incluyen las pruebas que será necesario pasar para
aceptar esta entrega.  Consulta [esta página]() para aprender cómo
pueden ayudarte las pruebas a desarrollar tu propio programa.

```
class Test(TestCaseGui):
    def test_my_email(self):
        self.assertEqual(1,my_email().count('@'))
        self.assertTrue(my_email().endswith('uclm.es'))
		
    def test_recortar(self):
        self.assertEqual(recortar(120.), 1.0)
        self.assertEqual(recortar(-120.), -1.0)
        self.assertEqual(recortar(-1.), -1.0)
        self.assertEqual(recortar(1.), 1.0)
        self.assertEqual(recortar(0.75), 0.75)
        self.assertEqual(recortar(0.), 0.)
        self.assertEqual(recortar(-0.25), -0.25)
		
    def test_es_bisiesto(self):
        self.assertFalse(es_bisiesto(1))
        self.assertTrue(es_bisiesto(4))
        self.assertFalse(es_bisiesto(100))
        self.assertTrue(es_bisiesto(400))
        self.assertTrue(es_bisiesto(2000))
        self.assertFalse(es_bisiesto(1900))
        self.assertTrue(es_bisiesto(2016))
		
    def test_es_primo(self):
        self.assertFalse(es_primo(0))
        self.assertFalse(es_primo(1))
        self.assertTrue(es_primo(2))
        self.assertTrue(es_primo(17))
        self.assertFalse(es_primo(18))
        self.assertTrue(es_primo(19))
        self.assertTrue(es_primo(97))
        self.assertFalse(es_primo(98))
        self.assertFalse(es_primo(99))
		
    def test_media_geometrica(self):
        self.assertEqual(media_geometrica(1.0, 1.0), 1.0)
        self.assertEqual(media_geometrica(4.0, 25.0), 10.0)
        self.assertEqual(media_geometrica(100.0, 16.0), 40.0)
        self.assertEqual(media_geometrica(2.0, 1.125), 1.5)
		
    def test_bateria_cargada(self):
        self.assertTrue(bateria_cargada(12.5))
        self.assertTrue(bateria_cargada(12.95))
        self.assertTrue(bateria_cargada(12.75))
        self.assertFalse(bateria_cargada(12.96))
        self.assertFalse(bateria_cargada(12.49))
        self.assertTrue(bateria_cargada(-12.5))
        self.assertTrue(bateria_cargada(-12.95))
        self.assertTrue(bateria_cargada(-12.75))
        self.assertFalse(bateria_cargada(-12.96))
        self.assertFalse(bateria_cargada(-12.49))
		
    def test_calificacion(self):
        self.assertEqual(calificacion(4.9), 'Suspenso')
        self.assertEqual(calificacion(5.0), 'Aprobado')
        self.assertEqual(calificacion(6.96), 'Aprobado')
        self.assertEqual(calificacion(7.0), 'Notable')
        self.assertEqual(calificacion(8.9999), 'Notable')
        self.assertEqual(calificacion(9.0), 'Sobresaliente')
        self.assertEqual(calificacion(10.0), 'Sobresaliente')
		
    def test_fahrenheit_a_celsius(self):
        self.assertEqual(fahrenheit_a_celsius(32.0), 0.0)
        self.assertEqual(fahrenheit_a_celsius(86.0), 30.0)
        self.assertEqual(fahrenheit_a_celsius(212.0), 100.0)
		
    def test_area_circulo(self):
        from math import pi
        self.assertAlmostEqual(area_circulo(1.0), pi)
        self.assertAlmostEqual(area_circulo(2.0), 4.*pi)
        self.assertAlmostEqual(area_circulo(1.25), 1.5625*pi)
        self.assertAlmostEqual(area_circulo(0), 0.0)
		
    def test_energia_cinetica(self):
        epsilon = 0.001
        self.assertTrue(abs(energia_cinetica(1,2) - 192.08) < epsilon)
        self.assertTrue(abs(energia_cinetica(2,1) - 96.04) < epsilon)
        self.assertTrue(abs(energia_cinetica(2,2) - 384.16) < epsilon)
        self.assertTrue(abs(energia_cinetica(1,4) - 768.32) < epsilon)
		
    def test_redondear(self):
        self.assertIs(type(redondear(1.25)), int)
        self.assertEqual(redondear(1.0), 1)
        self.assertEqual(redondear(1.25), 1)
        self.assertEqual(redondear(1.25), 1)
        self.assertEqual(redondear(1.55), 2)
        self.assertEqual(redondear(1.5), 2)
```
