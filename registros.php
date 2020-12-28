<?php
include ('./conexion/conexion.php');

   
$query =  "SELECT * FROM productos ";
$result = mysqli_query($conexion,$query);

if(!$result){
    printf("Ha ocurrido un Error: %s\n", mysqli_error($conexion));
}

$json = array(); 
while ($fila = mysqli_fetch_array($result)) {
    $json[]=array(
        'nombre'=> $fila['nombre'],
        'marca'=> $fila['marca'],
        'modelo'=> $fila['modelo'],
        'cantidad'=> $fila['cantidad'],
        'precio'=> $fila['precio']

    );
     
     
        
}
$jsonstring = json_encode($json);
echo $jsonstring;

// print_r($result);
// mysqli_close($conexion);





     
//}

// while ($fila = mysqli_fetch_assoc($ejecutar)) {
  
//     $data['Nombre']= $fila['nombre'];
//     $data['Marca']= $fila['marca'];
//     $data['Modelo']= $fila['modelo'];
//     $data['Precio']= $fila['precio'];
// }
 

    /* obtener el array asociativo */
   
      
    /* liberar el conjunto de resultados */
    //mysqli_free_result($resultado);
 
 
?>