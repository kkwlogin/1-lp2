// admin_script.js - simple UI-only operations for admin dashboard
const adminEvents = [
  { name: 'Intercollege Football Cup', date: '2025-12-05', venue: 'Main Stadium' },
  { name: 'City Marathon', date: '2026-01-18', venue: 'City Park' },
  { name: 'Junior Basketball League', date: '2026-02-10', venue: 'Sports Complex' }
];

function $(id){return document.getElementById(id)}

function renderEvents(){
  const tbody = $('eventsTbody');
  tbody.innerHTML = '';
  adminEvents.forEach((ev, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${ev.name}</td>
      <td>${ev.date}</td>
      <td>${ev.venue}</td>
      <td class="actions">
        <button class="btn" onclick="openEdit(${i})">Edit</button>
        <button class="btn ghost" onclick="deleteEvent(${i})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  $('totalCount').textContent = `${adminEvents.length} record${adminEvents.length===1?'':'s'}`;
}

function openEdit(index){
  $('modal').classList.add('show');
  $('evIndex').value = index;
  if (index >= 0){
    const ev = adminEvents[index];
    $('evName').value = ev.name;
    $('evDate').value = ev.date;
    $('evVenue').value = ev.venue;
    $('modalTitle').textContent = 'Edit Event';
  } else {
    // new record
    $('evName').value = '';
    $('evDate').value = '';
    $('evVenue').value = '';
    $('modalTitle').textContent = 'Add Event';
  }
}

function closeModal(){
  $('modal').classList.remove('show');
}

function saveEvent(){
  const idx = parseInt($('evIndex').value, 10);
  const name = $('evName').value.trim();
  const date = $('evDate').value;
  const venue = $('evVenue').value.trim();
  if (!name){ alert('Name is required'); return; }
  if (idx >= 0){
    adminEvents[idx] = { name, date, venue };
  } else {
    adminEvents.push({ name, date, venue });
  }
  closeModal();
  renderEvents();
}

function deleteEvent(index){
  if (!confirm('Delete this record?')) return;
  adminEvents.splice(index,1);
  renderEvents();
}

document.addEventListener('DOMContentLoaded', function(){
  const addBtn = $('addBtn');
  if (addBtn) addBtn.addEventListener('click', ()=> openEdit(-1));
  const saveBtn = $('saveBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveEvent);
  const closeBtn = $('closeBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  renderEvents();
});
