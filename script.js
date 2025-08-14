const todayDate = document.getElementById('todayDate');
const todayNotes = document.getElementById('todayNotes');
const pastNotes = document.getElementById('pastNotes');
const noteText = document.getElementById('noteText');
const noteMood = document.getElementById('noteMood');
const addNote = document.getElementById('addNote');
const toggleTheme = document.getElementById('toggleTheme');

const today = new Date().toISOString().split('T')[0];
todayDate.textContent = today;

// Mode clair/sombre
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Charger les notes depuis LocalStorage
let journal = JSON.parse(localStorage.getItem('journal')) || {};

// Afficher notes
function renderNotes() {
  todayNotes.innerHTML = '';
  pastNotes.innerHTML = '';

  Object.keys(journal).sort((a,b) => b.localeCompare(a)).forEach(date => {
    journal[date].forEach(note => {
      const li = document.createElement('li');
      li.textContent = `${note.time} ${note.mood} : ${note.text}`;
      if(date === today) {
        todayNotes.appendChild(li);
      } else {
        pastNotes.appendChild(li);
      }
    });
  });
}

// Ajouter note
addNote.addEventListener('click', () => {
  const text = noteText.value.trim();
  if(!text) return alert("Écris quelque chose !");
  
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const mood = noteMood.value;
  
  if(!journal[today]) journal[today] = [];
  journal[today].push({text, mood, time});
  
  localStorage.setItem('journal', JSON.stringify(journal));
  noteText.value = '';
  renderNotes();
});

renderNotes();
