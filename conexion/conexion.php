<?php

$conexion = mysqli_connect('localhost','root','','crudequipos'); 

if(!$conexion)
{ 
    die("no se pudo conectar a la base de datos".mysqli_connect_erno());
}
 

?>