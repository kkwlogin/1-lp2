<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "test1";
$port = 3306;

function show_result($title, $msg, $ok = true, $icon = '') {
    $color = $ok ? '#155724' : '#721c24';
    $bg = $ok ? '#d4edda' : '#f8d7da';
    $border = $ok ? '#c3e6cb' : '#f5c6cb';
    echo "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>$title</title><link rel=\"stylesheet\" href=\"style5.css\"></head><body><div class=\"container\"><div class=\"form-box\"><div class=\"success\" style=\"background:$bg;color:$color;border-color:$border\"><h4>$icon ".htmlspecialchars($title)."</h4><p>".htmlspecialchars($msg)."</p></div><p style=\"margin-top:20px;text-align:center\"><a href=\"register.html\" style=\"color:#0f6b4a;text-decoration:none;font-weight:600\">← Back to form</a></p></div></div></body></html>";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    show_result('Error', 'Invalid request method.', false, '❌');
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$contact = isset($_POST['contact']) ? trim($_POST['contact']) : '';
$event = isset($_POST['event']) ? trim($_POST['event']) : '';

$errors = [];
if (strlen($name) < 2) $errors[] = 'Name must be at least 2 characters.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email address.';
if (!preg_match('/^[6-9][0-9]{9}$/', $contact)) $errors[] = 'Contact must be a valid 10-digit number.';
if (empty($event)) $errors[] = 'Please select an event.';

if (!empty($errors)) {
    show_result('Validation Error', implode(' ', $errors), false, '⚠️');
}

$conn = new mysqli($servername, $username, $password, $database, $port);
if ($conn->connect_error) {
    show_result('Database Error', 'Connection failed: ' . $conn->connect_error, false, '❌');
}
$conn->set_charset('utf8mb4');

// Check if email already exists
$checkStmt = $conn->prepare('SELECT id FROM registrations WHERE email = ?');
if (!$checkStmt) {
    show_result('Database Error', 'Prepare failed: ' . $conn->error, false, '❌');
}
$checkStmt->bind_param('s', $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    $checkStmt->close();
    $conn->close();
    show_result('Already Registered', 'This email address is already registered. Please use a different email or contact support if you forgot your details.', false, '📧');
}
$checkStmt->close();

// Check if contact already exists
$checkContact = $conn->prepare('SELECT id FROM registrations WHERE contact = ?');
if (!$checkContact) {
    show_result('Database Error', 'Prepare failed: ' . $conn->error, false, '❌');
}
$checkContact->bind_param('s', $contact);
$checkContact->execute();
$checkContact->store_result();

if ($checkContact->num_rows > 0) {
    $checkContact->close();
    $conn->close();
    show_result('Already Registered', 'This mobile number is already registered. Please use a different number or contact support.', false, '📱');
}
$checkContact->close();

// Insert new registration
$stmt = $conn->prepare('INSERT INTO registrations (name, email, contact, event) VALUES (?, ?, ?, ?)');
if (!$stmt) {
    show_result('Database Error', 'Prepare failed: ' . $conn->error, false, '❌');
}
$stmt->bind_param('ssss', $name, $email, $contact, $event);
if ($stmt->execute()) {
    show_result('✅ Success!', 'Registration submitted successfully! We will contact you soon with event details.', true, '🎉');
} else {
    show_result('Database Error', 'Insert failed: ' . $stmt->error, false, '❌');
}

$stmt->close();
$conn->close();
?>
