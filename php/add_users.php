<?php
$servername = "localhost";
$username = "root";  // Ajusta según tu configuración
$password = "12345";      // Ajusta según tu configuración
$dbname = "hgas";    // El nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si la solicitud es POST (envío de formulario)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos del formulario
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];

    // Preparar la consulta SQL para evitar inyecciones SQL
    $stmt = $conn->prepare("INSERT INTO usuarios (username, password, nombre, email, fecha_creacion) VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("ssss", $user, $pass, $nombre, $email);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error: " . $stmt->error;
    }

    // Cerrar la declaración y la conexión
    $stmt->close();
}

$conn->close();
?>
