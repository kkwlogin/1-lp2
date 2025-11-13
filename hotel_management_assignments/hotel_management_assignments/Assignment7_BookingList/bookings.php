<?php include '../Assignment5_PHP_MySQL/config.php'; ?>
<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Bookings</title><link rel="stylesheet" href="../Assignment5_PHP_MySQL/styles.css"></head><body>
<div class="container"><header class="header"><div class="brand">Sunrise Hotel</div></header>
<main><section class="card"><h2>Booking List</h2>
<?php
$sql = 'SELECT id,name,email,phone,room_type,checkin,checkout,created_at FROM bookings ORDER BY created_at DESC LIMIT 200';
$res = $conn->query($sql);
if ($res && $res->num_rows>0) {
  echo '<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%"><tr><th>ID</th><th>Name</th><th>Phone</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>When</th></tr>';
  while($r=$res->fetch_assoc()){
    echo '<tr><td>'.$r['id'].'</td><td>'.$r['name'].'</td><td>'.$r['phone'].'</td><td>'.$r['room_type'].'</td><td>'.$r['checkin'].'</td><td>'.$r['checkout'].'</td><td>'.$r['created_at'].'</td></tr>';
  }
  echo '</table>';
} else {
  echo '<p>No bookings found. Use the <a href="../Assignment5_PHP_MySQL/booking_form.php">booking form</a> to add sample data.</p>';
}
$conn->close();
?>
</section></main><footer class="footer">© 2025 Sunrise Hotel</footer></div></body></html>