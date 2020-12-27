<?php
include ('./conexion/conexion.php'); 
$nombre= $_POST['nombre'];/*para proteger los campos*/
$marca=$_POST['marca']; 
$modelo= $_POST['modelo']; 
$precio= $_POST['precio']; 
$cantidad= $_POST['cantidad'];   
echo ("<script>console.log('$nombre');</script>"); // asi y regresarlo por ajax js para ver el resultado

$insertar="INSERT INTO productos (nombre,marca,modelo,precio,cantidad) VALUES ('$nombre','$marca','$modelo','$precio','$cantidad')"; 
$ejecutar= mysqli_query($conexion,$insertar);

if(!$ejecutar){
    printf("Error en ejecución: %s\n", mysqli_error($conexion));
}else{
    echo "El vendedor de registro exitosamente en la BD";
}  

?>