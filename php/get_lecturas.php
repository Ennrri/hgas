<?php
// Archivo: get_lecturas.php

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "12345";
$dbname = "hgas";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener las últimas lecturas de todos los sensores
$sql = "SELECT s.nombre_sensor, l.valor, l.timestamp 
        FROM lecturas l
        JOIN sensores s ON l.id_sensor = s.id_sensor 
        ORDER BY l.timestamp DESC LIMIT 12";
$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Enviar datos como JSON
header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>
