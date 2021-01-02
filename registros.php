<?php
include ('./conexion/conexion.php'); 
$search = $_POST['buscar']; 
$query =  " SELECT * FROM productos WHERE nombre LIKE '$search%' ";
$result = mysqli_query($conexion,$query); 
if(!$result){
    printf("Ha ocurrido un Error: %s\n", mysqli_error($conexion));
} 
$json = array(); 
while ($fila = mysqli_fetch_array($result)) {
    $json[]=array(
        'id'=> $fila['id'],
        'nombre'=> $fila['nombre'],
        'marca'=> $fila['marca'],
        'modelo'=> $fila['modelo'],
        'cantidad'=> $fila['cantidad'],
        'precio'=> $fila['precio'] 
    );      
}
$jsonstring = json_encode($json);
echo $jsonstring; 
?>