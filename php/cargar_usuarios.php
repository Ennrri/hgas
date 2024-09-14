<?php
// Conectar a la base de datos
$servername = "localhost";
$username = "root";  // Cambiar por el usuario real de tu base de datos
$password = "12345";  // Contraseña de la base de datos
$dbname = "hgas";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del formulario
$user_username = $_POST['username'];
$user_password = $_POST['password'];
$user_nombre = $_POST['nombre'];
$user_email = $_POST['email'];
$fecha_creacion = date("Y-m-d H:i:s");

// Preparar la sentencia SQL
$sql = "INSERT INTO usuarios (username, password, nombre, email, fecha_creacion) VALUES (?, ?, ?, ?, ?)";

// Usar una sentencia preparada para evitar inyección SQL
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $user_username, $user_password, $user_nombre, $user_email, $fecha_creacion);

// Ejecutar la consulta y verificar si fue exitosa
if ($stmt->execute()) {
    echo "Nuevo usuario creado con éxito";
} else {
    echo "Error: " . $stmt->error;
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
