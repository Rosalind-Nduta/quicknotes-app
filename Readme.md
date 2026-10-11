# QuickNotes

QuickNotes is a small, responsive note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, file them under Personal, Work or Study, search through them, and delete the ones you no longer need. Your notes are saved in the browser, so they are still there after you refresh the page.

## Features

- Add notes of up to 200 characters, each with a category (Personal, Work or Study)
- Each note shows its text, category label, date and time, and a Delete button
- Colour-coded note cards for each category
- Validation messages for empty notes and notes over 200 characters
- Live search that ignores upper/lower case, with a "No notes match your search." message
- Note counter: "You have no notes yet.", "You have 1 note." or "You have N notes."
- Notes saved with localStorage so they survive a page refresh
- Responsive layout that stacks the form on screens 600px wide or narrower

## How to run locally

1. Clone the repository: `git clone https://github.com/Rosalind-Nduta/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser (no build step or server needed).

## What I learned

- How to build a page with semantic HTML (`header`, `main`, `section`, `footer`) and link labels to inputs with `for` and `id`.
- How to lay out a form with Flexbox and use a `@media (max-width: 600px)` rule to make a layout work on small screens.
- How to build the page from an array of objects with `createElement` and `textContent`, which is safer than `innerHTML` for user text.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to make small, clear Git commits that tell the story of the project.