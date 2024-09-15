<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "12345";
$dbname = "hgas";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta SQL para obtener los datos de los sensores
$sql = "SELECT sensores.nombre_sensor, sensores.ubicacion, lecturas.valor, lecturas.fecha_hora 
        FROM lecturas 
        JOIN sensores ON lecturas.id_sensor = sensores.id_sensor 
        ORDER BY lecturas.fecha_hora DESC LIMIT 50";  // Limitamos a las últimas 50 lecturas
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo json_encode(["error" => "No hay datos disponibles"]);
    exit();
}

echo json_encode($data);

$conn->close();
?>
