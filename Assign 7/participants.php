<?php
include 'db_connect.php';

// Selected event from dropdown
$selectedEvent = isset($_GET['event']) ? $_GET['event'] : '';

// Fetch distinct event names
$eventQuery = "SELECT DISTINCT event_name FROM participants ORDER BY event_name";
$eventResult = $conn->query($eventQuery);

// Fetch participant list for selected event
$participants = [];
if ($selectedEvent != '') {
  $stmt = $conn->prepare("SELECT participant_name, email, contact FROM participants WHERE event_name = ?");
  $stmt->bind_param("s", $selectedEvent);
  $stmt->execute();
  $participants = $stmt->get_result();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Participant List - Event Management</title>
  <link rel="stylesheet" href="style7.css" />
</head>
<body>
  <header>
    <h1>Participant List</h1>
  </header>

  <div class="container">
    <form method="GET" action="">
      <label for="event">Select Event:</label>
      <select name="event" id="event" onchange="this.form.submit()">
        <option value="">-- Choose an Event --</option>
        <?php while($row = $eventResult->fetch_assoc()) { ?>
          <option value="<?= htmlspecialchars($row['event_name']) ?>" 
            <?= ($selectedEvent == $row['event_name']) ? 'selected' : '' ?>>
            <?= htmlspecialchars($row['event_name']) ?>
          </option>
        <?php } ?>
      </select>
    </form>

    <?php if ($selectedEvent != '') { ?>
      <h2>Participants for: <?= htmlspecialchars($selectedEvent) ?></h2>
      <table>
        <thead>
          <tr>
            <th>Participant Name</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          <?php if ($participants->num_rows > 0) { 
            while($p = $participants->fetch_assoc()) { ?>
              <tr>
                <td><?= htmlspecialchars($p['participant_name']) ?></td>
                <td><?= htmlspecialchars($p['email']) ?></td>
                <td><?= htmlspecialchars($p['contact']) ?></td>
              </tr>
          <?php } } else { ?>
              <tr><td colspan="3">No participants found for this event.</td></tr>
          <?php } ?>
        </tbody>
      </table>
    <?php } ?>
  </div>

  <footer>&copy; 2025 Event Management System</footer>
</body>
</html>
