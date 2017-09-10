
Prueba y depuración de software
===============================

Las pruebas primero
-------------------

Antes de empezar en tema vamos a explicar someramente la mecánica que
deberías aplicar desde el primer día en tus ejercicios y programas.
Aún cuando no hayas leído nada más de este tema *debes* aplicar el
método desde el primer día.

Lo primero es tener claro qué vas a hacer. Inmediatamente después, el
siguiente caso es hace una prueba, un pequeño ejemplo que permita
saber si el programa que vas a hacer funciona o no. Es decir, se usa el programa antes incluso de hacerlo, *Las pruebas
primero*.


Casos de prueba
---------------

Las pruebas que se pasan automáticamente en los ejercicios del
laboratorio pueden servir de ejemplo para ayudarte a probar tus
propios programas. Vemos como ejemplo el primer ejercicio del primer
bloque.

.. activecode:: correo-electronico
   :nocodelens:
   :nocanvas:
   :caption: Correo electrónico

   def my_email():
       return 'francisco.moya@uclm.es'

Definir la función que se indica en el enunciado no es tu único
trabajo.  **Es responsabilidad tuya probar el código antes de
enviarlo**. Python incluye una biblioteca para pruebas denominada
``unittest``. El único problema es que exige definir una clase y es
posible que todavía no sepas hacerlo. No te asustes, los enunciados de
las prácticas tienen multitud de ejemplos que puedes usar directamente
como punto de partida.  Copia esta línea a continuación de tu
programa.

.. activecode:: import-unittest
   :nocodelens:
   :nocanvas:
   :caption: Importación de la biblioteca de pruebas

   import unittest

Como primera aproximación basta añadir el código de pruebas de
cualquiera de las tareas de prácticas.  En el primer ejercicio se
muestra lo siguiente.

.. activecode:: test-case-email
   :nocodelens:
   :nocanvas:
   :caption: TestCase para la práctica del correo electrónico
   :include: correo-electronico,import-unittest

   class Test(unittest.TestCase):
       def test_my_email(self):
           self.assertEqual(1, my_email().count('@'))
           self.assertTrue(my_email().endswith('uclm.es'))

Es más simple de lo que parece, pero no te preocupes si no lo
entiendes de momento. Dentro de la *clase* ``Test`` hay una definición
de una función ``test_my_email`` que debería resultarte familiar. Esa
función es la prueba. Puede haber más de una de estas funciones que
comienzan por ``test_`` dentro de la clase.  Cada una es una prueba, y
todas ellas componen el caso de prueba (*TestCase*).

Dentro de la función vemos varias llamadas a funciones que comienzan por
``assert``. Son aserciones, afirmaciones sobre lo que debe cumplirse
para considerar correcto el programa. No te preocupes por el ``self.``
que aparece antes de las llamadas, ya lo entenderemos cuando veamos
programación orientada a objetos.

Hay dos llamadas diferentes, ``assertEqual`` que afirma que los dos
argumentos deben ser iguales y ``assertTrue`` que afirma que el
argumento debe ser cierto (debe ser una expresión booleana de valor
*True*). Vamos a explicar cada una de ellas.

La primera utiliza el *método* ``count`` de las cadenas de texto para
asegurar que hay uno y solo un carácter ``@``. El método ``count``
devuelve cuántas veces aparece el argumento en la cadena. Por ejemplo:

.. activecode:: ejemplo-count
    :nocodelens:
    :caption: Ejemplo de count

    'El hombre del traje gris no tiene nada que comer hoy'.count('o')


Cuidado con ``count``, asume que lo que busca es disjunto. Por ejemplo:

.. activecode:: ejemplo-count-2
    :nocodelens:
    :caption: Otro ejemplo de count

    'reparepare'.count('repare')

En realidad hay dos ``'repare'`` en ``'reparepare'``, uno a partir de la
posición *0* y otro a partir de la posición *4*. Pero el segundo solapa
con el primero, por lo que no lo tiene en cuenta.

De todas formas en nuestro caso es ideal. Una dirección de correo válida
tiene que tener un carácter ``@`` y solo uno.

La llamada ``assertTrue`` utiliza el método ``endswith`` de las cadenas
para asegurar que la dirección termina en ``uclm.es``. Cualquier
dirección válida de la UCLM debe terminar en ``uclm.es``.

.. activecode:: ejemplo-endswith
    :nocodelens:
    :caption: Ejemplo de endswith

    'Caracola'.endswith('la')

Es muy posible que a estas alturas ya hayas descubierto que hubiera sido
mucho más simple poner un único ``assert`` que asegurara que termina en
``@alu.uclm.es``.

.. activecode:: otro-ejemplo-de-test
    :nocodelens:
    :caption: Otra alternativa de prueba
    :include: correo-electronico,import-unittest

    class OtroTest(unittest.TestCase):
        def test_my_email(self):
            self.assertTrue(my_email().endswith('@alu.uclm.es'))

Desde luego eso habría funcionado con todos los estudiantes, pero no
habría funcionado conmigo. Yo no tengo una dirección ``@alu.uclm.es``
sino ``@uclm.es``. Puedes pensar que eso deja abierta la puerta a un
montón de posibles respuestas erróneas. Por ejemplo:
``pepe@jefes.uclm.es`` o peor, ``chori@kkuclm.es``. Es cierto, es un
compromiso que deberás afrontar continuamente. Decide cuánto quieres
trabajar en las pruebas para tener ciertas garantías de que tu programa
es correcto.

No es lo mismo hacer un programa para un avión que para el laboratorio,
calibra tu esfuerzo, se trata de que tengas cierta confianza en que el
programa es correcto. Siento comunicarte que en general, salvo en los
casos más simples, va a ser imposible que puedas garantizar que el
programa es correcto.

Ya solo queda ejecutarlo. Es posible usar herramientas auxiliares (*test
runners*), como ``nosetests`` para ejecutar las pruebas. Sin instalar
nada lo puedes hacer tú mismo en Python.

.. activecode:: driver-del-testcase
   :nocodelens:
   :caption: Ejecución del caso de prueba
   :include: correo-electronico, import-unittest, test-case-email

   unittest.main()


Hay mucho más sobre pruebas, pero eso te toca a ti descubrirlo. Si en
algún momento te atascas lee la `documentación de
unittest <https://docs.python.org/3/library/unittest.html>`__.
