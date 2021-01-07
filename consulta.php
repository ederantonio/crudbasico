<?php

include ('./conexion/conexion.php');
$query = "SELECT * FROM productos";
$result = mysqli_query($conexion,$query);
if(!$result){
    printf("Ha ocurrido un error",mysqli_error($conexion));
}
$json = array();// se declara el arreglo
while($filaconsulta=mysqli_fetch_array($result)){
    $json[]=array(
        'id'=> $filaconsulta['id'],
        'nombre'=> $filaconsulta['nombre'],
        'marca'=> $filaconsulta['marca'],
        'modelo'=> $filaconsulta['modelo'],
        'cantidad'=> $filaconsulta['cantidad'],
        // $operacion = $fila['precio'] * 1.16,
        // $format_number = number_format($operacion, 2),
        'precio'=> $filaconsulta['precio']
    );
}
$jsonstring=json_encode($json);
echo $jsonstring;

?>