/* Auto-grading

$("a:contains('Descargar todas las entregas')") es el anchor de descarga

$("#page-mod-assign-grading") es el body de la calificación de todos.
El de calificación individual es $("#page-mod-assign-grader")

$("option:contains('Descargar la hoja de calificaciones')") tiene en
el value la URL la descarga de la hoja.

"option:contains('Subir la hoja de calificaciones')") tiene la URL del
formulario que envía las calificaciones.


1. Detectar cuándo estamos en la página de grading.
   Tiene que ser con un script de tampermonkey o algo así.

2. Descargar automáticamente entregas y hoja de calificaciones.

3. Descomprimir entregas, extraer calificaciones de cabeceras.

4. Rellenar hoja de cálculo CSV.


*/
