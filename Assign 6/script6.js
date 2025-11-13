// --- Admin Credentials ---
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

// --- Sample Events ---
let events = [
  { id: 1, name: "Python Workshop", category: "Programming" },
  { id: 2, name: "Data Science Meetup", category: "Data" },
  { id: 3, name: "AI Bootcamp", category: "Technology" },
  { id: 4, name: "Startup Summit", category: "Business" },
  { id: 5, name: "Web Dev Basics", category: "Coding" },
  { id: 6, name: "Bootstrap Design", category: "UI/UX" },
  { id: 7, name: "JavaScript Masterclass", category: "Programming" },
  { id: 8, name: "Hackathon 2025", category: "Competition" },
  { id: 9, name: "Cyber Security Talk", category: "Technology" }
];

// ---------- LOGIN PAGE ----------
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true");
      msg.style.color = "green";
      msg.innerText = "Login successful! Redirecting...";
      setTimeout(() => (window.location.href = "dashboard.html"), 800);
    } else {
      msg.style.color = "red";
      msg.innerText = "Invalid username or password!";
    }
  });
}

// ---------- DASHBOARD PAGE ----------
if (document.getElementById("eventTable")) {
  if (localStorage.getItem("isAdmin") !== "true") {
    alert("Access denied! Please login as admin.");
    window.location.href = "admin_login.html";
  } else {
    loadEvents();
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "admin_login.html";
  });

  document.getElementById("addEventBtn").addEventListener("click", addEvent);
}

// Load events into table
function loadEvents() {
  const tbody = document.querySelector("#eventTable tbody");
  tbody.innerHTML = "";

  events.forEach((ev) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${ev.id}</td>
      <td>${ev.name}</td>
      <td>${ev.category}</td>
      <td>
        <button class="action update" onclick="updateEvent(${ev.id})">Update</button>
        <button class="action delete" onclick="deleteEvent(${ev.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Update both name and category
function updateEvent(id) {
  const ev = events.find((e) => e.id === id);
  if (!ev) return;

  const newName = prompt("Enter new event name:", ev.name);
  if (!newName || newName.trim() === "") return alert("Invalid name!");

  const newCat = prompt("Enter new event category:", ev.category);
  if (!newCat || newCat.trim() === "") return alert("Invalid category!");

  ev.name = newName.trim();
  ev.category = newCat.trim();

  alert("Event updated successfully!");
  loadEvents();
}

// Add new event
function addEvent() {
  const name = prompt("Enter event name:");
  if (!name || name.trim() === "") return alert("Event name cannot be empty.");

  const category = prompt("Enter event category:");
  if (!category || category.trim() === "") return alert("Category cannot be empty.");

  const newEvent = {
    id: events.length ? Math.max(...events.map((e) => e.id)) + 1 : 1,
    name: name.trim(),
    category: category.trim(),
  };

  events.push(newEvent);
  alert("New event added successfully!");
  loadEvents();
}

// Delete event
function deleteEvent(id) {
  if (confirm("Are you sure you want to delete this event?")) {
    events = events.filter((e) => e.id !== id);
    alert("Event deleted successfully!");
    loadEvents();
  }
}
