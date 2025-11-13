<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sports Management - Login & Registration</title>
  <style>
    body { font-family: Arial; background:#f2f2f2; padding:20px; }
    .box { max-width:400px; margin:auto; background:white; padding:20px; border-radius:6px; box-shadow:0 0 5px #ccc; }
    input { width:100%; padding:8px; margin:8px 0; border:1px solid #ccc; border-radius:4px; }
    button { width:100%; padding:10px; background:#0a74da; border:none; color:white; border-radius:4px; cursor:pointer; }
    button:hover { background:#055ab0; }
    h2 { text-align:center; }
    .error { color:red; font-size:0.9rem; }
  </style>
</head>
<body>

  <div class="box">
    <h2>Login</h2>
    <form>
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Password">
      <button type="button">Login</button>
    </form>
  </div>

  <br>

  <div class="box">
    <h2>Register</h2>
    <form>
      <input type="text" placeholder="Full Name">
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Create Password">
      <button type="button">Register</button>
    </form>
  </div>

  <br>

  <!-- EVENT REGISTRATION with JS VALIDATION -->
  <div class="box">
    <h2>Event Registration</h2>
    <form id="eventForm">
      <label>Name</label>
      <input type="text" id="name">
      <p class="error" id="nameError"></p>

      <label>Email</label>
      <input type="text" id="email">
      <p class="error" id="emailError"></p>

      <label>Mobile Number</label>
      <input type="text" id="mobile">
      <p class="error" id="mobileError"></p>

      <button type="button" onclick="validateForm()">Register for Event</button>
    </form>
  </div>

  <script>
    function validateForm() {
      // get values
      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let mobile = document.getElementById("mobile").value.trim();

      // error fields
      let nameErr = document.getElementById("nameError");
      let emailErr = document.getElementById("emailError");
      let mobileErr = document.getElementById("mobileError");

      // reset errors
      nameErr.innerHTML = "";
      emailErr.innerHTML = "";
      mobileErr.innerHTML = "";

      let valid = true;

      // name validation
      if (name === "") {
        nameErr.innerHTML = "Name is required";
        valid = false;
      }

      // email validation
      let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        emailErr.innerHTML = "Enter a valid email";
        valid = false;
      }

      // mobile validation
      let mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(mobile)) {
        mobileErr.innerHTML = "Mobile must be 10 digits";
        valid = false;
      }

      // final
      if (valid) {
        alert("Event Registration Successful!");
      }
    }
  </script>

</body>
</html>
