<?php
$servername = "localhost";
$username = "root";
$password = "12345";
$dbname = "hgas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$id = $_POST['id'];
$user_username = $_POST['username'];
$user_password = $_POST['password'];
$user_nombre = $_POST['nombre'];
$user_email = $_POST['email'];

$sql = "UPDATE usuarios SET username = ?, password = ?, nombre = ?, email = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $user_username, $user_password, $user_nombre, $user_email, $id);
$stmt->execute();
$stmt->close();
$conn->close();
?>
