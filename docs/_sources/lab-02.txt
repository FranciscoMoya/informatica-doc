
Lab 2: Bucles, listas y cadenas
===============================

Lee atentamente los ejercicios que se piden a continuación relacionados
con bucles, listas y cadenas en Python y hazlos todos ellos en una única
entrega.

1.  *Define una función ``suma_rango`` que tenga dos argumentos enteros
    y devuelva la suma de todos los números desde el primero hasta el
    segundo, sin contar este último. Se asume que el primer argumento es
    menor que el segundo.*

2.  *Define una función ``contar_negativos`` que tenga un único
    argumento que es una lista de enteros. Debe devolver el número de
    enteros negativos que contiene.*

3.  *Define una función ``buscar_vocal`` que tenga un único argumento de
    tipo cadena de texto y devuelva la posición de la primera vocal
    encontrada. Si no encuentra vocales debe devolver -1.* Nota: la
    primera letra tiene la posición 0.

4.  *Define una función ``multiplos_7_en_rango`` que tenga dos
    argumentos enteros y devuelva una lista con todos los números
    enteros entre ambos argumentos (sin contar el segundo) que sean
    múltiplos de 7. Se asume que el primer argumento es menor que el
    segundo.* Nota: Para añadir un elemento a una lista se puede usar el
    método ``append``.

5.  *Define una función ``dibujar_cuadrado`` que tenga un argumento
    entero que corresponde al ancho del cuadrado en caracteres. Esta
    función debe imprimir por salida estándar el dibujo de un cuadrado
    del ancho especificado en caracteres. Por ejemplo, para el ancho 8
    la función debe imprimir exactamente el dibujo de abajo.* **Nota: El
    ancho puede asumirse par. Nótese que el ancho incluye los caracteres
    de los bordes y esquinas. Nótese que la altura del cuadrado es menor
    que la anchura. Concretamente el número de segmentos verticales
    ``|`` es la mitad que el número de segmentos horizontales ``-``.**

    ::

        +------+
        |      |
        |      |
        |      |
        +------+

6.  *Escribe una función ``codigo_cesar`` que tenga un único argumento
    de tipo cadena de texto. Debe devolver otra cadena resultado de
    aplicar el `Cifrado
    César <https://es.wikipedia.org/wiki/Cifrado_C%C3%A9sar>`__ con
    desplzamiento de 3 posiciones a la cadena original. No se consideran
    letras acentuadas, ni diéresis, ni ñ, ni números.* **Nota: Las
    únicas letras a considerar son las que muestra el siguiente
    fragmento.**

    ::

        import string
        print string.ascii_letters

    Si usas CodeSkulptor quizás no puedas ejecutar este fragmento. El
    resultado es la siguiente cadena de texto.

    ::

        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

7.  *Escribe una función ``es_perfecto(n)`` que devuelva ``True`` si el
    argumento es un `número
    perfecto <https://es.wikipedia.org/wiki/N%C3%BAmero_perfecto>`__ y
    ``False`` si no lo es.*

8.  *Escribe una función ``cifras(n)`` que devuelve una lista de las
    cifras decimales de su argumento. Por ejemplo, para el número
    ``1984`` devuelve ``[1, 9, 8, 4]``.* Nota: Para añadir un elemento a
    una lista se puede usar el método ``append``.

9.  *Un popular juego de naipes llamado `las 7 y
    media <https://es.wikipedia.org/wiki/Siete_y_media>`__ precisa sumar
    los valores de conjuntos de cartas de una manera muy peculiar. Los
    naipes están numerados del 1 al 12, aunque los 8 y los 9 no se
    utilizan en este juego. Cada carta vale lo que corresponde a su
    número salvo los 10, 11 y 12 que valen solo 0.5 puntos. Si se
    superan los 7.5 puntos se ha perdido. Si no se supera gana el que
    más se aproxime a 7.5 puntos (de ahí el nombre). Escribe una función
    ``compara_bazas`` que acepta dos listas de números correspondientes
    a las bazas de dos jugadores y devuelve 1 si gana la primera lista,
    2 si gana la segunda lista y 0 si hay empate.* Por ejemplo,
    ``compara_bazas([1,5,12], [7,10])`` debe devolver ``2``.

10. *Escribe una función ``buscar_texto`` que devuelva el número de
    veces que aparece la cadena que se pasa como segundo argumento en la
    cadena que se pasa como primer argumento.* Por ejemplo
    ``buscar_texto('No por mucho madrugar amanece mas temprano', 'ma')``
    debe devolver 3.

