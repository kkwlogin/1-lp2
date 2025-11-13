
<?php
// config/db.php
// Simple mysqli connection (procedural). Edit credentials below.

$DB_HOST = 'localhost';
$DB_USER = 'your_mysql_user';
$DB_PASS = 'your_mysql_password';
$DB_NAME = 'sports_db';

// create connection
$conn = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// check connection
if (!$conn) {
    die('Database connection failed: ' . mysqli_connect_error());
}

// set charset
mysqli_set_charset($conn, 'utf8mb4');

// $conn is available to included scripts

// register.php
// This file receives form data and displays it (basic processing)

// Check if form submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form values
    $name = htmlspecialchars($_POST["name"] ?? "");
    $email = htmlspecialchars($_POST["email"] ?? "");
    $password = htmlspecialchars($_POST["password"] ?? "");
    $mobile = htmlspecialchars($_POST["mobile"] ?? "");

    // Display the submitted info
    echo "<h2>Registration Successful!</h2>";
    echo "<p><strong>Name:</strong> $name</p>";
    echo "<p><strong>Email:</strong> $email</p>";
    echo "<p><strong>Password:</strong> $password</p>";
    echo "<p><strong>Mobile:</strong> $mobile</p>";

} else {
    echo "No data received!";
}
?>
