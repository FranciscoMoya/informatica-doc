
Pago de balance de tarjeta de crédito en un año
===============================================

1. Pago mínimo de 10€
---------------------

Escribe un programa que calcula la cuota mínima mensual necesaria para
pagar un balance de tarjeta de crédito en 12 meses.

La cuota mensual es un valor fijo, que no cambia cada mes. No se
considerará una tasa mínima de pago mensual.

La función deberá tener dos argumentos: ``balance``, que indica la
cantidad que se debe en la tarjeta de crédito, y ``tasa_anual``, que
indica la tasa de interés anual.

Debe asumirse que el interés se compone mensualmente de acuerdo al
balance al final del mes. Es decir, después de que el pago de la cuota
se ha realizado. La cuota tiene que ser un múltiplo de 10€ y es el mismo
para todos los meses. Nótese que es posible que el balance final sea
negativo empleando este esquema de pago. Eso es normal y no implica
error alguno.

.. code:: python

    # Sugerencia: Enumeración exhaustiva

La solución por enumeración exhaustiva es trivial.

.. code:: python

    def cuota_minima(balance, tasa_anual):
        tasa_mensual = tasa_anual / 12
        cuota = 10
        while not es_suficiente(cuota, balance, tasa_mensual):
            cuota += 10
        return cuota

Evidentemente la dificultad mayor está en la función ``es_suficiente``.

.. code:: python

    def es_suficiente(cuota, balance, tasa):
        for i in range(12):
            balance -= cuota
            if balance > 0:
                balance *= 1 + tasa
        return balance <= 0

Solo falta probarlo

.. code:: python

    print(cuota_minima(1000, .09))


.. parsed-literal::

    90


2. Pago múltiplo de 0.01€
=========================

El resto del problema en las mismas condiciones que el problema
anterior.

.. code:: python

    # Sugerencia: Búsqueda por bisección

La búsqueda por bisección es igual que en la transparencia. Tan solo
tenemos que pensar las cotas inferior y superior de la ``cuota`` y
determinar cuando hemos llegado a la solución.

La cuota mínima podría ser la que corresponde a una tasa de interés del
0% anual. Osea, ``balance/12``.

La cuota máxima podría determinarse como la necesaria para pagar todo a
final de año. Es decir, si no vamos pagando cada mes sino las 12 cuotas
al final del año. Cada mes habríamos acumulado intereses, por lo que el
balance a final de año sería ``balance * (1 + tasa_mensual) ** 12``. La
cota por tanto sería el resultado de dividir esto entre 12.

El cálculo de las cuotas se redondea a 1 céntimo como dice el enunciado.

.. code:: python

    def cuota_minima(balance, tasa_anual):
        tasa_mensual = tasa_anual / 12.
        low = balance / 12.
        high = (balance * (1 + tasa_mensual)**12) / 12.
        cuota = round((high + low)/2, 2)
        balance_final = calcular_balance_final(cuota, balance, tasa_mensual)
        while not es_balance_final_minimo(balance_final):
            if balance_final > 0: low = cuota
            else: high = cuota
            cuota = round((high + low)/2, 2)
            balance_final = calcular_balance_final(cuota, balance, tasa_mensual)
        return cuota

El balance mínimo será aquel que permita pagar el crédito
(``balance_final <= 0``) y además no nos pasemos en exceso.

Supongamos que llegamos a una cuota que no permite pagar el crédito por
1 céntimo. Esa cuota no vale, necesitamos una superior, pero si pagamos
un céntimo más al mes habremos pagado en total 11 céntimos más de lo
necesario. Esto es lo máximo que podemos excedernos.

.. code:: python

    def es_balance_final_minimo(balance_final):
        return balance_final <= 0 and balance_final > -0.12

El balance final ya lo calculamos en el caso anterior.

.. code:: python

    def calcular_balance_final(cuota, balance, tasa_mensual):
        for i in range(12):
            balance -= cuota
            if balance >0:
                balance *= 1+tasa_mensual
        return balance

Solo falta probarlo.

.. code:: python

    print(cuota_minima(1000, .09))


.. parsed-literal::

    86.81


Ahora sí que podemos usarlo con números realmente grandes, porque el
método es mucho más rápido.

.. code:: python

    print(cuota_minima(1000000000, .09))


.. parsed-literal::

    86800473.23

