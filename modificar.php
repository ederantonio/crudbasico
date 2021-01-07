<?php
include ('./conexion/conexion.php');


$id=$_POST['id'];
$nombre = $_POST['nombre'];
$marca = $_POST['marca'];
$modelo = $_POST['modelo'];
$cantidad = $_POST['cantidad'];
 
$precio = $_POST['precio'];


$query = "UPDATE PRODUCTOS SET nombre = '$nombre', marca = '$marca', modelo = '$modelo', cantidad = '$cantidad', precio = '$precio' WHERE id ='$id'";
$result= mysqli_query($conexion,$query);
$query_tabla = "SELECT * FROM productos";
$resultado = mysqli_query($conexion,$query_tabla);

if(!$result || !$resultado){
    printf("ha ocurrido un error",mysqli_error($conexion));
}
 else{
     
    $json_tabla = array();
    while($rows = mysqli_fetch_array($resultado)){
        $json_tabla[]=array(
            'id'=> $rows['id'],
            'nombre'=> $rows['nombre'],
            'marca'=> $rows['marca'],
            'modelo'=> $rows['modelo'],
            'cantidad'=> $rows['cantidad'],
            // $operacion = $rows['precio'] * 1.16,
            // $format_number = number_format($operacion, 2),
            'precio'=> $rows['precio'] 
        );
    }
    $json_string_tabla = json_encode($json_tabla);
    echo $json_string_tabla;
 }
?>