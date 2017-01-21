
.. code:: python

    import turtle
    from math import pi
    
    t = turtle.Turtle()
    
    def avanzar(puntos):
        t.pendown()
        t.forward(puntos)
    
    def girar(radianes):
        grados = radianes*180/pi
        if grados < 0: t.left(-grados)
        else: t.right(grados)
        
    def comenzar():
        t.penup()
        t.home()
        
    def saltar(puntos):
        t.penup()
        t.forward(puntos)

.. code:: python

    # Para ver el resultado en Jupyter deber llamar a la función dibujo()
    # como última función de la celda.
    #
    # Por ejemplo:
    #
    # avanzar(100)
    # girar(-pi/2)
    # avanzar(50)
    # dibujo()
    #
    # No utilices la función dibujo en el código que envíes en el examen.
    
    from IPython.display import HTML, SVG, display
    from math import pi, sin, cos
    
    def avanzar(puntos):
        global current_pos, current_drawing
        pos1 = current_pos
        saltar(puntos)
        current_drawing += line(pos1, current_pos)
            
    def saltar(puntos):
        global current_pos, current_angle
        x, y = current_pos
        current_pos = x + puntos*cos(current_angle), y + puntos*sin(current_angle)
    
    def girar(radianes):
        global current_angle
        current_angle += radianes
    
    def comenzar():
        global current_pos, current_angle
        current_pos = (200,200)
        current_angle = 0.
    
    def limpiar():
        global current_drawing
        current_drawing = ''
        comenzar()
    
    def dibujo():
        global current_drawing
        ret = SVG('''<svg width="400" height="400" viewBox="0 0 400 400"
                          xmlns="http://www.w3.org/2000/svg">{}</svg>'''\
                   .format(current_drawing))
        limpiar()
        return ret
    
    def line(p1, p2):
        (x1, y1), (x2, y2) = p1, p2
        return '''<line x1="{}" y1="{}" 
                        x2="{}" y2="{}" 
                        stroke-width="1" stroke="black"/>'''.format(x1,y1,x2,y2)
    
    limpiar()

.. code:: python

    def poligono(n, lado):
        for i in range(n):
            avanzar(lado)
            girar(-2*pi/n)

.. code:: python

    poligono(5,80)
    dibujo()




.. image:: exb_files/exb_3_0.svg



.. code:: python

    from math import cos, pi
    
    def estrella(n, lado):
        angulo = -4*pi/n
        if n%2 != 0:
            poligonal(n, lado, angulo)
        else:
            poligonal(n//2, lado, angulo)
            siguiente_vertice(n,lado)
            poligonal(n//2, lado, angulo)
    
    def poligonal(n, lado, angulo):
        for i in range(n):
            avanzar(lado)
            girar(angulo)
    
    def siguiente_vertice(n, lado):
            a = pi/n
            girar(a)
            saltar(lado/2/cos(a))
            girar(-3*a)

.. code:: python

    limpiar()
    estrella(6,150)
    screen()




.. image:: exb_files/exb_5_0.svg



.. code:: python

    def rosa(n, lado):
        angulo = 2*pi/n
        for i in range(n):
            poligono(n, lado)
            saltar(lado)
            girar(angulo)

.. code:: python

    limpiar()
    rosa(5,40)
    screen()




.. image:: exb_files/exb_7_0.svg



.. code:: python

    def rosa(n, lado, depth = 1):
        if depth == 0:
            poligono(n, lado)
            return
        angulo = 2*pi/n
        for i in range(n):
            rosa(n, lado, depth-1)
            saltar(lado)
            girar(angulo)
        angulo = pi/2-pi/n
        girar(angulo)
        saltar(lado/2/cos(angulo))
        girar(-angulo)

.. code:: python

    limpiar()
    rosa(7,10,2)
    screen()




.. image:: exb_files/exb_9_0.svg



.. code:: python

    def copo(n,lado):
        for i in (0,1,2):
            koch(n,lado)
            girar(2*pi/3)
    
    def koch(n,lado):
        if n<1:
            avanzar(lado)
            return
        for a in (0, -pi/3, 2*pi/3, -pi/3):
            girar(a)
            koch(n-1,lado/3)

.. code:: python

    current_pos=(0,100)
    copo(0,300)
    dibujo()




.. image:: exb_files/exb_11_0.svg



