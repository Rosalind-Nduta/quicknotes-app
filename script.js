const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

const STORAGE_KEY = "quicknotes-notes";

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    // Storage may be unavailable; the app still works for this visit.
  }
}

function formatDate(date) {
  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

function render() {
  notesList.textContent = "";
  updateCount();

  const query = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(query);
  });

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement("li");
    empty.className = "no-results";
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
    return;
  }

  visibleNotes.forEach(function (note) {
    const li = document.createElement("li");
    li.className = "note-card category-" + note.category.toLowerCase();

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const category = document.createElement("span");
    category.className = "note-category";
    category.textContent = note.category;

    const date = document.createElement("span");
    date.className = "note-date";
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.appendChild(category);
    meta.appendChild(date);
    meta.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(meta);
    notesList.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: formatDate(new Date()),
  };

  notes.push(note);
  saveNotes();
  render();
  noteInput.value = "";
});

searchInput.addEventListener("input", render);

render();