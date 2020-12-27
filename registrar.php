<?php
include ('./conexion/conexion.php');

 
$nombre= $_POST['nombre'];/*para proteger los campos*/
$marca=$_POST['marca']; 
$modelo= $_POST['modelo']; 
$precio= $_POST['precio']; 
$cantidad= $_POST['cantidad'];   
//echo json_encode("<script>console.log('$nombre');</script>"); // asi y regresarlo por ajax js para ver el resultado
 

if (!isset($nombre)||!isset($marca)||!isset($modelo)||!isset($precio)||!isset($cantidad))/*si van vacios los campos mando el letrero*/
{
	echo '<span>Por favor complete todos los campos.</span>';
}
else{
	$consulta="INSERT INTO productos VALUES ('".$nombre."','".$marca."','".$modelo."','".$precio."','".$cantidad."')";
	mysqli_query($conexion, $consulta);

		if($consulta)
		{            
			echo ("<span>Guardado Correctamente</span>");
		}
		else
		{
			echo "<span>No se pudieron guardar los datos</span>";
		}
}

?>