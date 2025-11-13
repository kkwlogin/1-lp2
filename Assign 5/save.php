<?php
// Database connection info
$servername = "localhost";
$username = "root";
$password = "";   // Default XAMPP password is blank
$database = "test1";
$port = 3306;     // Your custom MySQL port

// Create connection
$conn = new mysqli($servername, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$contact = $_POST['contact'];

// Insert into database
$sql = "INSERT INTO registrations (name, email, contact) VALUES ('$name', '$email', '$contact')";

if ($conn->query($sql) === TRUE) {
    echo "<h2>✅ Registration successful!</h2>";
    echo "<a href='register.html'>Go Back</a>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
