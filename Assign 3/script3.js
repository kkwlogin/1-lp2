function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let mobile = document.getElementById("mobile").value.trim();
  let msg = document.getElementById("message");

  // Regular expressions
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let mobilePattern = /^[0-9]{10}$/;

  if (name === "") {
    msg.style.color = "red";
    msg.innerHTML = "Please enter your name.";
    return false;
  }

  if (!emailPattern.test(email)) {
    msg.style.color = "red";
    msg.innerHTML = "Please enter a valid email address.";
    return false;
  }

  if (!mobilePattern.test(mobile)) {
    msg.style.color = "red";
    msg.innerHTML = "Mobile number must be 10 digits.";
    return false;
  }

  msg.style.color = "green";
  msg.innerHTML = "Registration successful!";
  return false; // Prevent actual submission (demo purpose)
}
