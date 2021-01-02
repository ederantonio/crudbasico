<?php

include ('./conexion/conexion.php');
$query = "SELECT * FROM productos";
$result = mysqli_query($conexion,$query);
if(!$result){
    printf("Ha ocurrido un error",mysqli_error($conexion));
}
$json = array();// se declara el arreglo
while($fila=mysqli_fetch_array($result)){
    $json[]=array(
        'id'=> $fila['id'],
        'nombre'=> $fila['nombre'],
        'marca'=> $fila['marca'],
        'modelo'=> $fila['modelo'],
        'cantidad'=> $fila['cantidad'],
        'precio'=> $fila['precio'] 
    );
}
$jsonstring=json_encode($json);
echo $jsonstring;

?>