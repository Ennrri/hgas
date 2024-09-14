<?php
$servername = "localhost";
$username = "root";  // Cambiar según tu configuración
$password = "12345";  // Contraseña de la base de datos
$dbname = "hgas";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id, username, password, nombre, email FROM usuarios";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>
            <td>{$row['username']}</td>
            <td>{$row['password']}</td>
            <td>{$row['nombre']}</td>
            <td>{$row['email']}</td>
            <td>
                <button class='btn btn-warning editUser' data-id='{$row['id']}'>Editar</button>
                <button class='btn btn-danger deleteUser' data-id='{$row['id']}'>Eliminar</button>
            </td>
        </tr>";
    }
} else {
    echo "<tr><td colspan='5'>No hay usuarios</td></tr>";
}

$conn->close();
?>
