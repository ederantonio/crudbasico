<?php
include ('./conexion/conexion.php'); 
$nombre= $_POST['nombre'];/*para proteger los campos*/
$marca=$_POST['marca']; 
$modelo= $_POST['modelo']; 
$precio= $_POST['precio']; 
$cantidad= $_POST['cantidad'];   
//echo ("<script>jconsole.color.yellow.log('$precio');</script>"); 
$query="INSERT INTO productos (nombre,marca,modelo,precio,cantidad) VALUES ('$nombre','$marca','$modelo','$precio','$cantidad')"; 
$result= mysqli_query($conexion,$query);

if(!$result){
    printf("Error en ejecución: %s\n", mysqli_error($conexion));
}else{
    echo "Se registro exitosamente en la BD";
}  

?>