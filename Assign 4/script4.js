// Array of events with categories
const events = [
  { name: "Python Workshop", category: "python" },
  { name: "Advanced JavaScript", category: "javascript" },
  { name: "Bootstrap UI Design", category: "bootstrap" },
  { name: "Data Science Bootcamp", category: "data" },
  { name: "Python for Beginners", category: "python" },
  { name: "JavaScript for Web", category: "javascript" },
  { name: "Bootstrap Essentials", category: "bootstrap" },
  { name: "Data Analytics Meetup", category: "data" }
];

const eventList = document.getElementById("eventList");
const searchBox = document.getElementById("searchBox");
const filterSelect = document.getElementById("filterSelect");

// Function to display filtered events
function displayEvents(filteredEvents) {
  eventList.innerHTML = ""; // clear old list
  if (filteredEvents.length === 0) {
    eventList.innerHTML = "<li>No events found</li>";
    return;
  }

  filteredEvents.forEach(event => {
    const li = document.createElement("li");
    li.textContent = event.name;
    eventList.appendChild(li);
  });
}

// Function to apply search and filter together
function filterEvents() {
  const searchText = searchBox.value.toLowerCase();
  const selectedCategory = filterSelect.value;

  const filtered = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  displayEvents(filtered);
}

// Event listeners
searchBox.addEventListener("input", filterEvents);
filterSelect.addEventListener("change", filterEvents);

// Initial load
displayEvents(events);
