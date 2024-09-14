<?php
$servername = "localhost";
$username = "root";
$password = "12345";
$dbname = "hgas";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT sensores.nombre_sensor,sensores.ubicacion, lecturas.valor, lecturas.fecha_hora FROM lecturas JOIN sensores ON lecturas.id_sensor = sensores.id_sensor";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);

$conn->close();
?>
