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

$query2 = "SELECT * FROM productos";
$result2 = mysqli_query($conexion,$query2);

if(!$result || !$result2){
    printf("Error en ejecución: %s\n", mysqli_error($conexion));
}else{
   $json = array();
   while($fila=mysqli_fetch_array($result2)){
        $json[]=array(
            'id'=>$fila['id'],
            'nombre'=>$fila['nombre'],
            'marca'=>$fila['marca'],
            'modelo'=>$fila['modelo'],
            'cantidad'=>$fila['cantidad'],
            'precio'=>$fila['precio'] 
        );
   }
   $json_string = json_encode($json);
   echo $json_string;
}  

?>