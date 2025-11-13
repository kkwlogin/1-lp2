<?php
include 'config.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $room = $conn->real_escape_string($_POST['room_type']);
    $checkin = $conn->real_escape_string($_POST['checkin']);
    $checkout = $conn->real_escape_string($_POST['checkout']);
    $sql = "INSERT INTO bookings (name,email,phone,room_type,checkin,checkout) VALUES ('$name','$email','$phone','$room','$checkin','$checkout')";
    if ($conn->query($sql) === TRUE) {
        echo '<p style="color:green">Booking saved. <a href="booking_form.php">Make another</a></p>';
    } else {
        echo '<p style="color:red">Error: ' . $conn->error . '</p>';
    }
    $conn->close();
} else {
    header('Location: booking_form.php');
    exit;
}
?>