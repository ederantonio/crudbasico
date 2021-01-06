<?php
include ('./conexion/conexion.php');
$id = $_POST['id'];
$query = "DELETE FROM productos WHERE id = '$id'";
$result= mysqli_query($conexion,$query);

$query2 = "SELECT * FROM productos";
$result2= mysqli_query($conexion,$query2);

if(!$result || !$result2){
    printf("ha ocurrido un error",mysqli_error($conexion));
}
else{
    $json_prod = array();
    while($row_prod = mysqli_fetch_array($result2)){
        $json_prod[]=array (
            'id'=>$row_prod['id'],
            'nombre' =>$row_prod['nombre'],
            'marca'=>$row_prod['marca'],
            'modelo'=>$row_prod['modelo'],
            'cantidad'=>$row_prod['cantidad'],
            'precio'=>$row_prod['precio']
        );
    }
    $json_string_prod = json_encode($json_prod );
    echo $json_string_prod;

}



?>