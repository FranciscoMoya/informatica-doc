
Instalación del software del laboratorio
----------------------------------------

Microsoft Windows
~~~~~~~~~~~~~~~~~

1. Descarga la distribución oficial de `Python
   3 <https://www.python.org/downloads/>`__. Pincha en el botón
   *Download Python 3.x.y*. En el momento de escribir este documento era
   *Download Python 3.5.2* pero no repares en instalar la última
   versión.

2. Ejecuta el intérprete de órdenes de Windows.

3. Vete a la carpeta donde está el instalador y ejecuta:

``python-3.5.2.exe /quiet InstallAllUsers=1 PrependPath=1 Include_test=0``

Cambia el nombre del ejecutable a la versión concreta que descargaste.

1. Vuelve a abrir otro intérprete de órdenes para que tenga el nuevo
   ``Path``.

2. Escribe la siguiente orden en la ventana del intérprete de órdenes:

``pip install jupyter``
