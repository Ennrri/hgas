<?php
require 'db_connect.php'; // Conexión ya definida

if (isset($_GET['id'])) {
    $actuatorId = $_GET['id'];

    // Simulación de obtención del estado actual
    $estadoActual = obtenerEstadoActuador($actuatorId);

    // Cambiar el estado del actuador
    $nuevoEstado = !$estadoActual;

    // Aquí actualizarías el estado en la base de datos si es necesario

    echo json_encode(['status' => $nuevoEstado]);
}

// Cerrar la conexión
$conn->close();

// Función para obtener el estado del actuador (simulada)
function obtenerEstadoActuador($idsen) {
    return rand(0, 1); // Simulación, puedes reemplazarlo por la lógica real
}
?>
