===========================
Informática para ingenieros
===========================

.. toctree::
   :maxdepth: 2
              
   prefacio.rst
   python-00.rst
   python-01.rst
   python-02.rst
   python-04-ejercicios.rst
   python-04.rst
   python-05-06-07.rst
   python-09.rst
   python-10.rst
   python-12.rst
   python-14.rst
   BisectionSearch.rst
   Datos_AEMET.rst
   ejercicios.rst
   ExamenExtraordinario.rst
   Examen ordinario.rst
   Gráficas.rst
   hanoi.rst
   lab-01.rst
   lab-02.rst
   lab-03.rst
   mochila01.rst
   Navegación web.rst
   Optimización.rst
   Paseo.rst
   Permutaciones.rst
   Problema de las 8 damas.rst
   Procesamiento de XML.rst
   Prueba de Progreso 1ºA.rst
   Prueba de Progreso 1ºB.rst
   Prueba de Progreso 1ºC.rst
   Prueba de Progreso 2016 1ºA.rst
   Prueba de Progreso 2016 1ºB.rst
   Prueba de Progreso 2016 1ºC.rst
   python-files.rst
   PythonMinimo.rst
   Resumen.rst
   sopa_letras.rst
   Sudoku 2.rst
   Sudoku 3.rst
   Sudoku.rst
   tour-caballo.rst
   trabajo-grupo.rst


Section 2: Links
::::::::::::::::

Runestone uses the ``restructuredText`` (rst) markup language.  We chose this over markdown largely because rst is extensible.  Nearly all of the basic markup tasks are already handled by restructuredText.  You should check out the docs for the basics of restructuredText (link below). Our extensions are all for the interactive elements.  One key hint about restructuredText:  Its like **Python** -- *indentation matters!*

* `restructuredText Docs <http://docutils.sourceforge.net/rst.html>`_
* `Runestone Docs <http://runestoneinteractive.org/build/html/index.html>`_
* Join the discussion on our `Google Group <https://groups.google.com/forum/#!forum/runestone_instructors>`_
* Tell us about problems on `Github <https://github.com/RunestoneInteractive/RunestoneComponents>`_



SECTION 3: Sample Directives
::::::::::::::::::::::::::::

ActiveCode
----------

.. activecode:: codeexample1
   :coach:
   :caption: This is a caption

   print("My first program adds a list of numbers")
   myList = [2, 4, 6, 8, 10]
   total = 0
   for num in myList:
       total = total + num
   print(total)

Multiple Choice
---------------

.. mchoice:: question1_2
    :multiple_answers:
    :correct: a,b,d
    :answer_a: red
    :answer_b: yellow
    :answer_c: black
    :answer_d: green
    :feedback_a: Red is a definitely on of the colors.
    :feedback_b: Yes, yellow is correct.
    :feedback_c: Remember the acronym...ROY G BIV.  B stands for blue.
    :feedback_d: Yes, green is one of the colors.

    Which colors might be found in a rainbow? (choose all that are correct)

These are just two of the many interactive components for writing online course materials.  You can see examples of all of them `On our Example Page <http://interactivepython.org/runestone/static/overview/overview.html>`_

Now feel free to modify this file to start creating your own interactive page.

