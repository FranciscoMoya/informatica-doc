
Gráficas con Python
===================

En este cuaderno veremos un conjunto de ejemplos para generar gráficas
empleando `Matplotlib <http://matplotlib.org/>`__. *Matplotlib* es una
biblioteca para generar gráficos matemáticos avanzados con Python.
Dentro de esta biblioteca se proporciona un módulo llamado *pyplot* que
proporciona unas funciones muy similares a las capacidades gráficas de
MATLAB. Éste es el módulo que mostraremos aquí.

Para mostrar gráficas en un cuaderno lo más práctico es insertarlas en
el texto. Para eso tenemos que utilizar una directiva que modifica el
comportamiento por defecto del cuaderno. Si no lo hiciéramos las figuras
se verían en ventanas independientes, que es muy difícil de seguir. Si
no utilizas `IPython Notebook <http://ipython.org/notebook.html>`__ esta
directiva no es necesaria.

.. code:: python

    %matplotlib inline

Para ilustrar el uso de ``pyplot`` vamos a usar unos datos de
temperaturas generados aleatoriamente. Los detalles no son relevantes
para lo que se pretende mostrar en este cuaderno.

.. code:: python

    import random
    
    def leer_temperaturas():
        # 12 temperaturas ordenadas
        mx = sorted([ round(random.uniform(0.0, 40.0), 2) for x in range(12) ])
        # las reordenamos para que se parezca más a un año normal
        mx = mx[::2] + mx[::-2]
        # mínimos restando algo a los máximos
        mn = [ m - random.uniform(5.0, .3*m) for m in mx ]
        return mn, mx

Una gráfica básica de estas temperaturas puede realizarse con la función
``plot`` y la función ``show``.

.. code:: python

    import matplotlib.pyplot as plt
    
    tmin, tmax = leer_temperaturas()
    
    plt.plot(tmax)
    plt.plot(tmin)
    plt.show()



.. image:: Gr%C3%A1ficas_files/Gr%C3%A1ficas_5_0.png


Pero evidentemente lo podemos hacer mejor y eso cuenta en tu
calificación del trabajo en grupo.

En primer lugar una gráfica debe indicar qué es lo que representa. Para
eso tenemos que poner las unidades, título y una leyenda con lo que
representa cada línea.

.. code:: python

    
    plt.title(u'Temperatura en Madrid (año 2015)', fontsize='x-large')
    plt.xlabel('mes')
    plt.ylabel(u'temperatura (ºC)')
    
    plt.plot(tmax, label=u'T máxima')
    plt.plot(tmin, label=u'T mínima')
    leyenda = plt.legend(loc='upper right', shadow=True, fontsize='large')
    
    plt.show()



.. image:: Gr%C3%A1ficas_files/Gr%C3%A1ficas_7_0.png


Convendría que los colores de las líneas sirvieran para identificar lo
que representan. Por ejemplo, la temperatura máxima podría ser roja,
mientras que la mínima podría ser azul. También es útil identificar los
puntos de los que tenemos valores en lugar de pintar las líneas como si
fuera un continuo.

.. code:: python

    plt.title(u'Temperatura en Madrid (año 2015)', fontsize='x-large')
    plt.xlabel('mes')
    plt.ylabel(u'temperatura (ºC)')
    
    plt.plot(tmax, 'ro--', label=u'máxima')
    plt.plot(tmin, 'bo--', label=u'mínima')
    leyenda = plt.legend(loc='upper right', shadow=True, fontsize='large')
    
    plt.show()



.. image:: Gr%C3%A1ficas_files/Gr%C3%A1ficas_9_0.png


El mes convendría representarlo con el texto correspondiente, no con un
número.

.. code:: python

    plt.title(u'Temperatura en Madrid (año 2015)', fontsize='x-large')
    plt.xlabel('mes')
    plt.ylabel(u'temperatura (ºC)')
    plt.xticks(range(12),['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'])
    
    plt.plot(tmax, 'ro--', label=u'máxima')
    plt.plot(tmin, 'bo--', label=u'mínima')
    leyenda = plt.legend(loc='upper right', shadow=True, fontsize='large')
    
    plt.show()



.. image:: Gr%C3%A1ficas_files/Gr%C3%A1ficas_11_0.png


O bien con las etiquetas de los meses rotadas.

.. code:: python

    plt.title(u'Temperatura en Madrid (año 2015)', fontsize='x-large')
    plt.xlabel('mes')
    plt.ylabel(u'temperatura (ºC)')
    plt.xticks(range(12),
               ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], 
               rotation=45)
    
    plt.plot(tmax, 'ro--', label=u'máxima')
    plt.plot(tmin, 'bo--', label=u'mínima')
    leyenda = plt.legend(loc='upper right', shadow=True, fontsize='large')
    
    plt.show()



.. image:: Gr%C3%A1ficas_files/Gr%C3%A1ficas_13_0.png


Para grabarlo como un archivo PNG o PDF basta llamar a ``savefig`` en
lugar de ``show``.

.. code:: python

    plt.title(u'Temperatura en Madrid (año 2015)', fontsize='x-large')
    plt.ylabel(u'temperatura (ºC)')
    plt.xticks(range(12),
               ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], 
               rotation=45)
    
    plt.plot(tmax, 'ro--', label=u'máxima')
    plt.plot(tmin, 'bo--', label=u'mínima')
    leyenda = plt.legend(loc='upper right', shadow=True, fontsize='large')
    plt.savefig('plot.pdf')



.. image:: Gr%C3%A1ficas_files/Gr%C3%A1ficas_15_0.png


Esto es lo mínimo necesario para el trabajo en grupo, pero leyendo la
documentación seguro que podrás mejorar el resultado. Ten en cuenta que
lo que se busca en una gráfica no es que sea vistosa, sino que se vea
con facilidad lo que se pretende mostrar en ella.
