// UI-only admin for events (edit/delete in frontend only)
let events = [
  {id:1, name:'Misty Getaway', duration:'3 days'},
  {id:2, name:'Sunrise Hike', duration:'Day'},
  {id:3, name:'Forest Retreat', duration:'2 days'},
  {id:4, name:'Lake Camping', duration:'Weekend'},
  {id:5, name:'Valley Trek', duration:'Day'},
  {id:6, name:'Village Visit', duration:'Day'}

];

const $ = id => document.getElementById(id);

function renderTable(filterText=''){
  const tbody = $('eventsTable').querySelector('tbody');
  tbody.innerHTML = '';
  const list = events.filter(ev => !filterText || ev.name.toLowerCase().includes(filterText.toLowerCase()));
  if(!list.length){ $('noRows').classList.remove('hidden'); return; } else { $('noRows').classList.add('hidden'); }
  list.forEach(ev => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${ev.id}</td><td>${ev.name}</td><td>${ev.duration}</td><td>
      <div class="actions">
        <button class="action-btn edit" data-id="${ev.id}">Edit</button>
        <button class="action-btn del" data-id="${ev.id}">Delete</button>
      </div>
    </td>`;
    tbody.appendChild(tr);
  });
}

function openEdit(id){
  const ev = events.find(x => x.id === id);
  if(!ev) return;
  $('editId').value = ev.id;
  $('editName').value = ev.name;
  $('editDuration').value = ev.duration;
  // set modal title
  const title = document.querySelector('#modal .modal-box h3');
  if (title) title.textContent = 'Edit Event';
  const m = $('modal');
  if (m) {
    m.classList.remove('hidden');
    m.style.display = 'flex';
  }
  const nm = $('editName'); if (nm) nm.focus();
}

function closeModal(){
  const m = $('modal');
  if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
  // clear form fields
  if ($('editId')) $('editId').value = '';
  if ($('editName')) $('editName').value = '';
  if ($('editDuration')) $('editDuration').value = '';
}

function saveEdit(e){
  e.preventDefault();
  const id = Number($('editId').value);
  const name = $('editName').value.trim();
  const dur = $('editDuration').value.trim();
  const idx = events.findIndex(x=>x.id===id);
  if(idx>=0){
    // update existing
    events[idx].name = name; events[idx].duration = dur;
  } else {
    // create new
    events.push({ id, name, duration: dur });
  }
  renderTable($('search').value);
  closeModal();
}

function delEvent(id){
  if(!confirm('Delete event id '+id+'?')) return;
  events = events.filter(x=>x.id!==id);
  renderTable($('search').value);
}

// attach listeners
document.addEventListener('DOMContentLoaded', ()=>{
  renderTable();

  // table actions
  document.getElementById('eventsTable').addEventListener('click', (ev)=>{
    const btn = ev.target.closest('button');
    if(!btn) return;
    const id = Number(btn.dataset.id);
    if(btn.classList.contains('edit')) openEdit(id);
    if(btn.classList.contains('del')) delEvent(id);
  });

  // search
  $('search').addEventListener('input', e=> renderTable(e.target.value));

  // modal: safe attach for cancel + allow overlay click and Escape key to close
  const cancelBtn = $('cancel');
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  const modal = $('modal');
  if (modal) {
    // click outside modal-box closes it
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) closeModal();
    });
    // ensure modal is hidden on load (defensive)
    modal.classList.add('hidden');
  }
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeModal();
  });
  // fallback: catch Cancel clicks anywhere (in case direct listener misses)
  document.addEventListener('click', (ev) => {
    if (ev.target && ev.target.closest && ev.target.closest('#cancel')) closeModal();
  });
  if ($('editForm')) $('editForm').addEventListener('submit', saveEdit);

  // add event (ui only): open modal to add
  $('btnAdd').addEventListener('click', ()=>{
    const id = events.length? Math.max(...events.map(x=>x.id))+1 : 1;
    $('editId').value = id;
    if ($('editName')) $('editName').value = '';
    if ($('editDuration')) $('editDuration').value = '';
    const title = document.querySelector('#modal .modal-box h3');
    if (title) title.textContent = 'Add Event';
    const m = $('modal'); if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
    const nm = $('editName'); if (nm) nm.focus();
  });

  // logout
  $('btnLogout').addEventListener('click', ()=> window.location.href='index.html');
});