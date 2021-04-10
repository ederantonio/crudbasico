<?php

// $conexion = mysqli_connect('localhost','root','','crudequipos'); 
$conexion = mysqli_connect('sql204.epizy.com','epiz_27778881','MUH6PmqQKXO','epiz_27778881_crudequipos');

/* comprobar la conexión */
if (!$conexion) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

// echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
// echo "Host information: " . mysqli_get_host_info($conexion) . PHP_EOL;

 
?>