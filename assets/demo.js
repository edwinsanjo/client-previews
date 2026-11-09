
const form = document.querySelector('form');
const queue = document.querySelector('.queue');
const live = document.querySelector('.notice');
const demoCount = document.querySelector('#demo-count');
const actionsCount = document.querySelector('#actions-count');

function updateCounts() {
  const entries = [...queue.querySelectorAll('.entry')];
  demoCount.textContent = entries.length;
  actionsCount.textContent = entries.filter(entry => entry.dataset.state === 'open').length;
}

document.querySelector('#fill-example').addEventListener('click', () => {
  for (const input of form.querySelectorAll('input[data-example]')) input.value = input.dataset.example;
  live.textContent = 'Example details filled. Submit to see the request in the queue.';
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const details = [...form.querySelectorAll('input[data-example]')].map(input => input.value.trim());
  const entry = document.createElement('article');
  entry.className = 'entry';
  entry.dataset.state = 'open';
  const header = document.createElement('div');
  header.className = 'entry-head';
  const title = document.createElement('strong');
  title.textContent = form.dataset.request;
  const state = document.createElement('span');
  state.className = 'pill';
  state.textContent = 'New request';
  header.append(title, state);
  const summary = document.createElement('p');
  summary.textContent = details.join(' · ');
  const advance = document.createElement('button');
  advance.type = 'button';
  advance.className = 'secondary';
  advance.textContent = 'Mark as reviewed';
  advance.addEventListener('click', () => {
    entry.dataset.state = 'reviewed';
    state.textContent = 'Reviewed';
    live.textContent = 'Example request marked as reviewed.';
    advance.remove();
    updateCounts();
  });
  entry.append(header, summary, advance);
  queue.prepend(entry);
  updateCounts();
  form.reset();
  live.textContent = 'Example request added to the team view.';
  if (matchMedia('(max-width: 740px)').matches) {
    entry.setAttribute('tabindex', '-1');
    entry.focus();
  }
});

updateCounts();

if (new URLSearchParams(location.search).get("asset") === "DOOR-014" && form.dataset.request === "Automatic-door fault") {
  form.querySelector("#detail-0").value = "DOOR-014 · Main entrance";
  live.textContent = "Door details loaded from the sample label.";
}
