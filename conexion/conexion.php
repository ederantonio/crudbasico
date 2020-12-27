<?php

$conexion = mysqli_connect('localhost','root','','crudequipos'); 

/* comprobar la conexión */
if (mysqli_connect_errno()) {//Devuelve el código de error de la última llamada
    printf("Falló la conexión: %s\n", mysqli_connect_error());//mysqli_connect_error devuelve una cadena con la descripcion del ultimo error
    exit();
}

/* cambiar el conjunto de caracteres a utf8 */
if (!mysqli_set_charset($conexion, "utf8")) {
    printf("Error cargando el conjunto de caracteres utf8: %s\n", mysqli_error($conexion));
    exit();
} 
?>