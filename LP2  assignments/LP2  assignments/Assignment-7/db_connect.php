<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "test2"; // updated database name
$port = 3306; // your custom MySQL port in XAMPP

$conn = new mysqli($servername, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
  die("Database connection failed: " . $conn->connect_error);
}
?>
