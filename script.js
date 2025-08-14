const dateEl = document.getElementById("date");
const noteInput = document.getElementById("note-input");
const moodSelect = document.getElementById("mood");
const addBtn = document.getElementById("add-note");
const notesList = document.getElementById("notes-list");
const toggleThemeBtn = document.getElementById("toggle-theme");

const today = new Date().toISOString().split('T')[0];
dateEl.textContent = today;

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("journalNotes") || "{}");
  notesList.innerHTML = "";
  for (const day in notes) {
    notes[day].forEach(n => {
      const div = document.createElement("div");
      div.className = "note" + (document.body.classList.contains("dark") ? " dark" : "");
      div.dataset.mood = n.mood;
      div.innerHTML = `<strong>${day}</strong> [${n.mood}]<br>${n.text}`;
      notesList.appendChild(div);
    });
  }
}

addBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (!text) return alert("Écris une note !");
  const notes = JSON.parse(localStorage.getItem("journalNotes") || "{}");
  if (!notes[today]) notes[today] = [];
  notes[today].push({ text, mood: moodSelect.value });
  localStorage.setItem("journalNotes", JSON.stringify(notes));
  noteInput.value = "";
  loadNotes();
});

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  loadNotes();
});

loadNotes();
