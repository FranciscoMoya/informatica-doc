
Haz un programa que imprima la suma de los 10 números que se introduzcan
por pantalla.

.. code:: python

    suma = 0
    for a in range(10):
        suma = suma + int(input('Introduce un numero ')) 
    print(suma)


.. parsed-literal::

    Introduce un numero 10
    Introduce un numero 9
    Introduce un numero 8
    Introduce un numero 7
    Introduce un numero 6
    Introduce un numero 5
    Introduce un numero 4
    Introduce un numero 3
    Introduce un numero 2
    Introduce un numero 1
    55


Haz un programa que imprima la tabla de multiplicar completa (del 1 al
9).

.. code:: python

    def imprime_tablas_simple():
        for i in range(1,10):
            imprime_tabla(i)
            print()
    
    def imprime_tabla(n):
        for i in range(1,11):
            imprime_linea(n,i)
            print()
    
    def imprime_linea(n,i):
        print(n,'x',i,'=',n*i,end='')

Otra forma:

.. code:: python

    def imprime_mosaico():
        for i in range(1,10,3):
            imprime_tablas_mosaico(i)
            
    def imprime_tablas_mosaico(primera):
        for i in range(1,11):
            imprime_linea_mosaico(primera,i)
        print()
    
    def imprime_linea_mosaico(primera, n):
        for i in range(primera, primera+3):
            imprime_linea(i,n)
            print(end='\t')
        print()
    
    def imprime_linea(n,i):
        print(n,'x',i,'=',n*i,end='')
    
    imprime_mosaico()


.. parsed-literal::

    1 x 1 = 1	2 x 1 = 2	3 x 1 = 3	
    1 x 2 = 2	2 x 2 = 4	3 x 2 = 6	
    1 x 3 = 3	2 x 3 = 6	3 x 3 = 9	
    1 x 4 = 4	2 x 4 = 8	3 x 4 = 12	
    1 x 5 = 5	2 x 5 = 10	3 x 5 = 15	
    1 x 6 = 6	2 x 6 = 12	3 x 6 = 18	
    1 x 7 = 7	2 x 7 = 14	3 x 7 = 21	
    1 x 8 = 8	2 x 8 = 16	3 x 8 = 24	
    1 x 9 = 9	2 x 9 = 18	3 x 9 = 27	
    1 x 10 = 10	2 x 10 = 20	3 x 10 = 30	
    
    4 x 1 = 4	5 x 1 = 5	6 x 1 = 6	
    4 x 2 = 8	5 x 2 = 10	6 x 2 = 12	
    4 x 3 = 12	5 x 3 = 15	6 x 3 = 18	
    4 x 4 = 16	5 x 4 = 20	6 x 4 = 24	
    4 x 5 = 20	5 x 5 = 25	6 x 5 = 30	
    4 x 6 = 24	5 x 6 = 30	6 x 6 = 36	
    4 x 7 = 28	5 x 7 = 35	6 x 7 = 42	
    4 x 8 = 32	5 x 8 = 40	6 x 8 = 48	
    4 x 9 = 36	5 x 9 = 45	6 x 9 = 54	
    4 x 10 = 40	5 x 10 = 50	6 x 10 = 60	
    
    7 x 1 = 7	8 x 1 = 8	9 x 1 = 9	
    7 x 2 = 14	8 x 2 = 16	9 x 2 = 18	
    7 x 3 = 21	8 x 3 = 24	9 x 3 = 27	
    7 x 4 = 28	8 x 4 = 32	9 x 4 = 36	
    7 x 5 = 35	8 x 5 = 40	9 x 5 = 45	
    7 x 6 = 42	8 x 6 = 48	9 x 6 = 54	
    7 x 7 = 49	8 x 7 = 56	9 x 7 = 63	
    7 x 8 = 56	8 x 8 = 64	9 x 8 = 72	
    7 x 9 = 63	8 x 9 = 72	9 x 9 = 81	
    7 x 10 = 70	8 x 10 = 80	9 x 10 = 90	
    


Haz un programa que imprima el siguiente dibujo

::

    +----------------+
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    +----------------+

.. code:: python

    def imprime_cuadrado(ancho):
        imprime_borde(ancho)
        for i in range(8):
            imprime_cara(ancho)
        imprime_borde(ancho)
        
    def imprime_borde(ancho):
        print('+' + '-'*ancho + '+')
    
    def imprime_cara(ancho):
        print('|' + ' '*ancho + '|')
    
    imprime_cuadrado(16)


.. parsed-literal::

    +----------------+
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    |                |
    +----------------+


Crear una función que valide una contraseña según estos criterios:

-  La contraseña debe contener un mínimo de 8 caracteres.
-  Una contraseña debe contener letras minúsculas, mayúsculas, números y
   al menos 1 carácter no alfanumérico.
-  La contraseña no puede contener espacios en blanco.
-  Contraseña válida, retorna ``True``.
-  Contraseña no válida, retorna el mensaje
   ``"La contraseña elegida no es segura"``.

.. code:: python

    def valida_palabra_clave(palabra):
        return  valida_8_caracteres(palabra) and \
                valida_tipos_caracteres(palabra) and \
                valida_no_espacios(palabra)
    
            
    def valida_8_caracteres(palabra):
        return len(palabra) >= 8
    
    
    def valida_tipos_caracteres(palabra):
        return valida_mayusculas(palabra) \
            and valida_minusculas(palabra) \
            and valida_numeros(palabra) \
            and valida_simbolos(palabra)
    
            
    def valida_no_espacios(palabra):
        for c in palabra:
            if c == ' ':
                return False
        return True
    
    
    def valida_mayusculas(palabra):
        for c in palabra:
            if es_mayuscula(c):
                return True
        return False
    
    
    def valida_minusculas(palabra):
        for c in palabra:
            if es_minuscula(c):
                return True
        return False
    
    
    def valida_numeros(palabra):
        for c in palabra:
            if es_numero(c):
                return True
        return False
    
    
    def valida_simbolos(palabra):
        for c in palabra:
            if es_simbolo(c):
                return True
        return False
    
    
    def es_mayuscula(c):
        return c >= 'A' and c <= 'Z'
    
    
    def es_minuscula(c):
        return c >= 'a' and c <= 'z'
    
    
    def es_numero(c):
        return c >= '0' and c <= '9'
    
    
    def es_simbolo(c):
        return not ( es_mayuscula(c) \
            or es_minuscula(c) \
            or es_numero(c) )
    
    
    valida_palabra_clave('aLt0$€cr3t0')




.. parsed-literal::

    True



¿No es muy repetitivo? Las validaciones de tipos de caracteres son
prácticamente iguales. Solo se diferencian en la función que determina
el tipo de cada caracter. Por tanto para no repetir código se puede
pasar como parámetro.

.. code:: python

    def valida_tipos_caracteres(palabra):
        return valida_tipo(es_mayuscula, palabra) \
            and valida_tipo(es_minuscula, palabra) \
            and valida_tipo(es_numero, palabra) \
            and valida_tipo(es_simbolo, palabra)
    
            
    def valida_no_espacios(palabra):
        return not valida_tipo(es_espacio, palabra)
    
    
    def valida_tipo(es_tipo, palabra):
        for c in palabra:
            if es_tipo(c):
                return True
        return False
    
    
    def es_espacio(c):
        return c == ' '
    
    
    valida_palabra_clave('aLt0s€cr3T0')




.. parsed-literal::

    True



