<?php
require 'db_connect.php'; // Usar la conexión de base de datos existente

// Consultar los sensores disponibles
$query = "SELECT idsen, sensor, ubicacion FROM sen WHERE variable = 'CAU' OR variable = 'IF'"; // Usamos 'CAU' (Caudal) e 'IF' (Interruptor Flotador) como ejemplo
$result = $conn->query($query);

$actuadores = [];

while ($row = $result->fetch_assoc()) {
    $actuador = [
        'idsen' => $row['idsen'],
        'sensor' => $row['sensor'],
        'ubicacion' => $row['ubicacion'],
        'estado' => obtenerEstadoActuador($row['idsen']) // Aquí llamas a la función que obtenga el estado actual del actuador
    ];
    $actuadores[] = $actuador;
}

echo json_encode($actuadores);

// Cerrar la conexión
$conn->close();

// Función para obtener el estado del actuador (simulada)
function obtenerEstadoActuador($idsen) {
    // Implementar la lógica que obtiene el estado del actuador según su ID
    return rand(0, 1); // Solo por ejemplo, devuelve un estado aleatorio
}
?>
