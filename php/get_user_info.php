<?php
// get_user_info.php
session_start();

// Verificar que el usuario está autenticado
if (isset($_SESSION['user_id'])) {
    // Conectar a la base de datos
    $conn = new mysqli("localhost", "root", "12345", "hgas");

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Obtener el ID del usuario desde la sesión
    $user_id = $_SESSION['user_id'];

    // Consulta para obtener el nombre y el rol del usuario
    $sql = "SELECT nombre, rol FROM usuarios WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode($user);
    } else {
        echo json_encode(["error" => "Usuario no encontrado"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["error" => "No autenticado"]);
}
?>
