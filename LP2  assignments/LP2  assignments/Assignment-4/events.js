// Events with duration field + combined filter
const events = [
  {name: 'Misty Getaway', duration: '3 days'},
  {name: 'Sunrise Hike', duration: 'Day'},
  {name: 'Forest Retreat', duration: '2 days'},
  {name: 'Lake Camping', duration: 'Weekend'},
  {name: 'Tea Walk', duration: 'Morning'},
  {name: 'Waterfall Trail', duration: 'Half Day'},
  {name: 'Stargaze', duration: 'Night'},
  {name: 'Birdwatch', duration: 'Guided'},
  {name: 'Valley Trek', duration: '2 days'},
  {name: 'Village Visit', duration: 'Half Day'}
];

const $ = id => document.getElementById(id);

function render(list){
  const ul = $('list'); ul.innerHTML = '';
  if(!list.length){ $('empty').classList.remove('hidden'); return; }
  $('empty').classList.add('hidden');
  list.forEach(ev => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `<strong>${ev.name}</strong><small>${ev.duration}</small>`;
    ul.appendChild(li);
  });
}

function filter(q, dur){
  const s = (q||'').toLowerCase().trim();
  return events.filter(ev => {
    const matchesQ = !s || ev.name.toLowerCase().includes(s) || ev.duration.toLowerCase().includes(s);
    const matchesDur = !dur || dur === 'all' || ev.duration === dur;
    return matchesQ && matchesDur;
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  render(events);
  $('q').addEventListener('input', e => render(filter(e.target.value, $('filter').value)));
  $('filter').addEventListener('change', e => render(filter($('q').value, e.target.value)));
});