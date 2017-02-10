
Prueba y depuración de software
===============================

Casos de prueba
---------------

Las pruebas que se pasan en los ejercicios del laboratorio pueden servir
de ejemplo para probar tus propios programas. Vemos como ejemplo el
primer ejercicio del primer bloque.

.. activecode:: correo-electronico
    :nocodelens:
    :caption: Correo electrónico

    def my_email():
        return 'francisco.moya@uclm.es'

Definir la función que se indica en el enunciado no es tu único
trabajo.  **Es responsabilidad tuya probar el código *antes* de
enviarlo**. Python incluye una biblioteca para pruebas denominada
``unittest``. El único problema es que exige definir una clase y es
posible que todavía no sepas hacerlo. No te asustes, los enunciados de
las prácticas tienen multitud de ejemplos que puedes usar directamente
como punto de partida.

.. activecode:: import-unittest
    :nocodelens:
    :caption: Correo electrónico

    import unittest

Como primera aprosimación basta pasar el ratón por encima del símbolo
**π** arriba a la izquierda de la herramienta de entrega de prácticas.
En el primer ejercicio se muestra lo siguiente.

.. code:: python

    class Test(unittest.TestCase):
        def test_my_email(self):
            self.assertEqual(1, my_email().count('@'))
            self.assertTrue(my_email().endswith('uclm.es'))

Es más simple de lo que parece, pero no te preocupes si no lo entiendes
de momento. Dentro de la *clase* ``Test`` hay una definición de una
función ``test_my_email`` que debería resultarte familiar. Esa función
es la prueba. Puede haber más de una de estas funciones que comienzan
por ``test_`` dentro de la clase.

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

.. code:: python

    'El hombre del traje gris no tiene nada que comer hoy'.count('o')




.. parsed-literal::

    4



Cuidado con ``count``, asume que lo que busca es disjunto. Por ejemplo:

.. code:: python

    'reparepare'.count('repare')




.. parsed-literal::

    1



En realidad hay dos ``'repare'`` en ``'reparepare'``, uno a partir de la
posición *0* y otro a partir de la posición *4*. Pero el segundo solapa
con el primero, por lo que no lo tiene en cuenta.

De todas formas en nuestro caso es ideal. Una dirección de correo válida
tiene que tener un carácter ``@`` y solo uno.

La llamada ``assertTrue`` utiliza el método ``endswith`` de las cadenas
para asegurar que la dirección termina en ``uclm.es``. Cualquier
dirección válida de la UCLM debe terminar en ``uclm.es``.

.. code:: python

    'Caracola'.endswith('la')




.. parsed-literal::

    True



Es muy posible que a estas alturas ya hayas descubierto que hubiera sido
mucho más simple poner un único ``assert`` que asegurara que termina en
``@alu.uclm.es``.

.. code:: python

    class OtroTest(unittest.TestCase):
        def test_my_email(self):
            self.assertTrue(my_email().endswith('@alu.uclm.es'))

Desde luego eso habría funcionado con todos los estudiantes, pero no
habría funcionado conmigo. Yo no tengo una dirección ``@alu.uclm.es``
sino ``@uclm.es``. Puedes pensar que eso deja abierta la puerta a un
montón de posibles respuestas erróneas. Por ejemplo:
``pepe@jefes.uclm.es`` o peor, ``chori@kkuclm.es``. Es cierto, es un
compromiso ue deberás afrontar continuamente. Decide cuánto quieres
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

.. code:: python

    suite = unittest.TestLoader().loadTestsFromTestCase(Test)
    unittest.TextTestRunner().run(suite).wasSuccessful()


.. parsed-literal::

    .
    ----------------------------------------------------------------------
    Ran 1 test in 0.003s
    
    OK




.. parsed-literal::

    True



Hay mucho más sobre pruebas, pero eso te toca a ti descubrirlo. Si en
algún momento te atascas lee la `documentación de
unittest <https://docs.python.org/3/library/unittest.html>`__.

Depuración con ``ipdb``
-----------------------

Una vez encontrado un problema hay que solucionarlo. Para ello
típicamente se utilizan llamadas a ``print`` estratégicamente situadas,
como hemos visto en las transparencias del tema. Si tus funciones son
suficientemente pequeñas y tus tests prueban el funcionamiento de cada
función será fácil encontrar el error. Pero no siempre va a ser así.

Existe otra forma equivalente al uso de ``print`` que puede ser
considerablemente más efectiva en la vida real, el uso de un depurador.
Se trata de un programa que permite controlar con precisión la ejecución
del programa y examinar todas las variables en cualquier punto. Incluso
permite analizar la traza de llamadas.

En Python el depurador

.. code:: python

    %pdb 1
    
    print('Hola')
    a = 12
    print (a, 'Adios')


.. parsed-literal::

    Automatic pdb calling has been turned ON
    Hola
    12 Adios


