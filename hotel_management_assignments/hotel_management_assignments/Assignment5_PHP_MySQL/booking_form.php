<?php include 'config.php'; ?>
<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Booking</title><link rel="stylesheet" href="styles.css"></head><body>
<div class="container"><header class="header"><div class="brand">Sunrise Hotel</div></header>
<main><section class="card"><h2>Booking Form (PHP)</h2>
<form method="post" action="save_booking.php">
  <label>Full Name<input name="name" required style="width:100%;padding:8px;margin-top:6px"></label>
  <label>Email<input name="email" type="email" required style="width:100%;padding:8px;margin-top:6px"></label>
  <label>Phone<input name="phone" required style="width:100%;padding:8px;margin-top:6px"></label>
  <label>Room Type<select name="room_type" required style="width:100%;padding:8px;margin-top:6px"><option value=''>--</option><option>Deluxe Room</option><option>Executive Suite</option><option>Family Room</option><option>Economy Room</option></select></label>
  <label>Check-in<input name="checkin" type="date" required style="width:100%;padding:8px;margin-top:6px"></label>
  <label>Check-out<input name="checkout" type="date" required style="width:100%;padding:8px;margin-top:6px"></label>
  <div style="margin-top:8px"><button class="btn" type="submit">Submit Booking</button></div>
</form></section></main><footer class="footer">© 2025 Sunrise Hotel</footer></div></body></html>