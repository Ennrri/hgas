<?php
// login.php
$servername = "localhost";
$username = "root";  // Ajusta según tu configuración
$password = "12345";  // Ajusta según tu configuración
$dbname = "hgas";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    // Consulta para verificar usuario, contraseña y estado activo
    $sql = "SELECT * FROM usuarios WHERE username = '$user' AND password = '$pass'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verificar si el usuario está activo
        if ($row['activo'] == '1') {
            echo 'success'; // El usuario puede ingresar
        } else {
            echo 'inactive'; // El usuario está inactivo
        }
    } else {
        echo 'error'; // Usuario o contraseña incorrectos
    }
}

$conn->close();
?>
