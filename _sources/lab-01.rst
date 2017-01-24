Lab 1.1: Familiarización
========================

Bienvenidos al laboratorio. Ya nos hemos familiarizado con un buen
número de características de Python y seguro que ya has hecho tus
primeros programas. Llegó el momento de poner en práctica lo que has
aprendido en un entorno tan parecido como podamos al de los exámenes de
Informática.

Nuestro consejo más importante para el laboratorio es que leas con
atención y no te inventes nada que no esté previamente escrito. Si el
ejercicio pide definir una función no basta con escribir las sentencias
de la función, tienes que definirla correctamente. Si el ejercicio pide
definir la función ``pepito`` no vale con definir ``Pepito``, ni
``funcion_pepito``, ni ``pepito1``, tiene que llamarse ``pepito``. Si
dice que la función debe devolver ``True`` en caso de que los argumentos
sean iguales y ``False`` en caso contrario no vale con imprimir que son
iguales, tiene que devolver ``True`` o ``False``.

Las prácticas, los ejercicios de laboratorio, los proyectos y los
exámenes se van a evaluar de forma automática, así que cualquier
desviación de comportamiento respecto a lo que se pide en el enunciado
se interpretará como un error. La intervención de seres humanos para
comentar vuestros programas solo ocurrirá durante las sesiones de
laboratorio, durante las sesiones reservadas para *tutoría de grupo*, o
durante las tutorías individuales.

Para describir la mecánica de entrega y evaluación no hay nada como un
primer ejercicio guiado. Veamos primero el enunciado:

1. *Definir una función ``my_email`` sin argumentos que devuelva tu
   dirección de correo electrónico de la Universidad.*

Este ejercicio es inmediato, basta con retornar una cadena con la
dirección correcta. En mi caso:

.. code:: python

    def my_email():
        return 'francisco.moya@uclm.es'

Esta función puedo (y debo) probarla antes. Por ejemplo llamándola e
imprimiendo el resultado.

.. code:: python

    print my_email()


.. parsed-literal::

    francisco.moya@uclm.es


Ahora que ya estoy seguro de que funciona puedo pinchar en el enlace de
entrega de la primera práctica en *Campus Virtual*.

La ventana de entrega es siempre similar, independientemente de si se
trata de una práctica, el proyecto, un parcial o el examen final.
Asegúrate de que aparece tu nombre correctamente y de que marcas la
casilla en la que declaras que entregas un trabajo original. Para
entregar la práctica tienes dos opciones:

-  Puedes pegar el código directamente en el cuadro de texto que
   aparece. Ésta es la opción más habitual si el ejercicio lo has
   realizado en `CodeSkulptor <http://CodeSkulptor.org>`__ u otro
   servicio online similar, o con QPython para Android.

-  Puedes adjuntar un archivo con la solución. Ésta es la opción más
   habitual si el ejercicio lo has realizado con PyCharm, IDLE, u otro
   entorno integrado de desarrollo para PC.

No olvides pulsar al botón de enviar y esperar confirmación de la
entrega correcta. Si no recibes confirmación o descubres un error en tu
entrega no temas volver a enviarlo. Se evaluará solamente el último
envío realizado.

**IMPORTANTE: Pega o adjunta exclusivamente el código que se pide. Si tú
has hecho pruebas por tu cuenta (algo que es muy recomendable) no las
incluyas en la entrega.**

Ya está, es así de fácil. No hay nada más que hacer. El resultado de la
evaluación no es inmediato. Ya no queda nada más que esperar a que
aparezca la calificación de esa actividad en el Campus Virtual.

En algunos casos es preciso obtener una calificación mínima en un
ejercicio para poder entregar otro ejercicio. No esperes al último
minuto para entregar los ejercicios, porque la evaluación puede tardar
algunos días. El evaluador se ejecutará al menos una vez a la semana. Si
se te echa el tiempo encima puedes intentar contactar con
francisco.moya@uclm.es para que se ejecute otra vez el evaluador, pero
no te garantizamos que pueda hacerse con más frecuencia.

 # Lab 1.2: Expresiones

Haz la primera entrega para familiarizarte con la mecánica de envío y el
entorno de desarrollo. Después lee atentamente los ejercicios que se
piden a continuación relacionados con las expresiones en Python y hazlos
todos ellos en una única entrega.

1.  *Define una función ``recortar`` que admita un único argumento que
    será un número real. Esta función debe devolver el valor de su
    argumento recortado al intervalo :math:`[-1, 1]`. Es decir, si el
    argumento es :math:`<-1` debe devolver ``-1.0``, si es :math:`>1`
    debe devolver ``1.0``, y en cualquier otro caso debe devolver el
    valor del argumento.*

2.  *Define una función de nombre ``es_bisiesto`` que admita un único
    argumento entero. Esta función debe devolver ``True`` si el
    argumento corresponde con un `año
    bisiesto <https://es.wikipedia.org/wiki/A%C3%B1o_bisiesto>`__ y
    ``False`` en caso contrario.* **Nota: Un año es bisiesto si es
    divisible entre 4, salvo los divisibles por 100, pero los divisibles
    por 400 también son bisiestos.**

3.  *Define una función de nombre ``es_primo`` que admita un único
    argumento entero. Esta función debe devolver ``True`` si el
    argumento es un número primo y ``False`` en caso contrario.*

4.  *Define una función de nombre ``media_geometrica`` que devuelva el
    valor de la `media
    geométrica <https://es.wikipedia.org/wiki/Media_geom%C3%A9trica>`__
    de los dos números reales que se le pasen como argumentos.*

5.  *Define una función de nombre ``bateria_cargada`` que devuelve
    ``True`` si el argumento real que se le pasa está en el intervalo
    :math:`[12.50, 12.95]` o en el intervalo :math:`[-12.95, -12.50]`.
    Debe devolver ``False`` en cualquier otro caso.*

6.  *Define una función de nombre ``calificacion`` que devuelve una
    cadena de texto correspondiente a la calificación correspondiente a
    una nota numérica que se pasa como argumento. Si la nota es inferior
    a 5.0 debe devolver ``Suspenso``, si está en el intervalo
    :math:`[5.0, 7.0)` debe devolver ``Aprobado``, si está en el
    intervalo :math:`[7.0, 9.0)` debe devolver ``Notable`` y si está en
    el intervalo :math:`[9.0, 10]` debe devolver ``Sobresaliente``.*
    **Nota: El enunciado no dice nada acerca de notas superiores a 10.
    Esto es intencional, el programador es libre de hacer lo que
    considere más conveniente.**

7.  *Define una función de nombre ``fahrenheit_a_celsius`` que
    transforma una temperatura expresada en grados Fahrenheit, que se
    pasa como argumento, en la misma temperatura expresada en grados
    centígrados, que es devuelta por la función.*

8.  *Define una función ``area_circulo`` que calcula el área de un
    círculo dado el radio, que se pasa como argumento. El radio está
    expresado en metros y el área debe expresarse en metros cuadrados.*

9.  *Define una función ``energia_cinetica`` que calcula la energía
    cinética en función del tiempo de una partícula de masa ``m`` en
    caída libre en las proximidades de la superficie terrestre partiendo
    del reposo. Esta función debe aceptar dos argumentos, la masa
    expresada en Kg y el tiempo transcurrido desde que se dejó en caída
    libre expresado en segundos. El valor de retorno debe ser la energía
    cinética expresada en Julios.* **Nota: Aunque se pide hacer una
    función eso no significa que no se puedan hacer otras auxiliares
    para simplificar la implementación. En particular puede interesar
    una función para calcular la velocidad en función del tiempo.**

10. Define una función ``redondear`` que devuelva el número entero más
    próximo al real que se le pasa como argumento. El valor medio se
    redondeará en exceso, es decir 0.5 se redondeará como 1.

