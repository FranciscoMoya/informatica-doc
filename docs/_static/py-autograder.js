/* Auto-grading

$("a:contains('Descargar todas las entregas')") es el anchor de descarga

$("#page-mod-assign-grading") es el body de la calificaci�n de todos.
El de calificaci�n individual es $("#page-mod-assign-grader")

$("option:contains('Descargar la hoja de calificaciones')") tiene en
el value la URL la descarga de la hoja.

"option:contains('Subir la hoja de calificaciones')") tiene la URL del
formulario que env�a las calificaciones.


1. Detectar cu�ndo estamos en la p�gina de grading.
   Tiene que ser con un script de tampermonkey o algo as�.

2. Descargar autom�ticamente entregas y hoja de calificaciones.

3. Descomprimir entregas, extraer calificaciones de cabeceras.

4. Rellenar hoja de c�lculo CSV.


*/
