import { table, form } from "./constants.js";
import { closeModal, openModal, clearForm } from "./modal.js";
import { extractDates } from "./helpers.js";
import { renderRow } from "./renderTable.js";
import { categories } from "./categories.js";

export const notes = [
  {
    id: 0,
    name: "Meeting Reminder",
    created: "2023-07-25T00:00:00.000Z",
    category: 0,
    content: "Don't forget the team meeting at 3 PM today.",
    dates: [],
    isActive: false,
  },
  {
    id: 1,
    name: "Grocery List",
    created: "2023-07-25T00:00:00.000Z",
    category: 0,
    content: "Buy milk, eggs, bread, and fruits.",
    dates: [],
    isActive: false,
  },
  {
    id: 2,
    name: "Book Recommendation",
    created: "2023-07-25T00:00:00.000Z",
    category: 2,
    content: "Read 'The Alchemist' by Paulo Coelho.",
    dates: [],
    isActive: true,
  },
  {
    id: 3,
    name: "Gift Ideas",
    created: "2023-07-25T00:00:00.000Z",
    category: 2,
    content: "Think of gift ideas for mom's birthday.",
    dates: [],
    isActive: true,
  },
  {
    id: 4,
    name: "Project Deadline",
    created: "2023-07-25T00:00:00.000Z",
    category: 1,
    content: "Finish the report and submit it by Friday(10/08/2023)",
    dates: ["10/08/2023"],
    isActive: true,
  },
  {
    id: 5,
    name: "Travel Plans",
    created: "2023-07-25T00:00:00.000Z",
    category: 1,
    content:
      "Research and plan for the summer vacation during 10/08/2023 26/07/2023",
    dates: ["10/08/2023", "26/07/2023"],
    isActive: true,
  },
  {
    id: 6,
    name: "Fitness Goals",
    created: "2023-07-25T00:00:00.000Z",
    category: 0,
    content: "Go for a jog and eat a healthy dinner.",
    dates: [],
    isActive: true,
  },
];

function createNote(e) {
  const newNote = {
    id: notes[notes.length - 1].id + 1,
    name: e.name.value,
    created: new Date(),
    category: +e.category.value,
    content: e.content.value,
    dates: extractDates(e.content.value),
    isActive: true,
  };

  notes.push(newNote);
  table.append(renderRow(newNote, newNote.id, newNote.isActive));
}

export function editNote(e) {
  openModal(true);
  const selectedTask = e.parentElement;
  form.dataset.id = selectedTask.id;
  form.name.value = selectedTask.children[0].lastChild.textContent;
  form.category.value = selectedTask.children[2].dataset.category;
  form.content.value = selectedTask.children[3].innerHTML;
}

export function updateNote(e) {
  const allTr = Array.from(table.querySelectorAll("tr"));
  if (e.closest("td")) {
    const id = e.parentElement.id;
    const index = notes.findIndex((el) => el.id === +id);
    const indexTr = allTr.findIndex((el) => el.id === id);
    if (index !== -1 && indexTr !== -1) {
      notes[index].isActive =
        e.closest("td").innerText === "archive" ? false : true;
      e.parentElement.remove();
    }
  } else {
    const index = notes.findIndex((el) => el.id === +form.dataset.id);
    if (index === -1) {
      createNote(e);
    } else {
      const indexTr = allTr.findIndex((el) => el.id === form.dataset.id);
      if (indexTr !== -1) {
        notes[index].name = e.name.value;
        notes[index].category = e.category.value;
        notes[index].content = e.content.value;
        notes[index].dates = extractDates(e.content.value);
        const updateTr = renderRow(
          notes[index],
          notes[index].id,
          notes[index].isActive
        );
        allTr[indexTr] = updateTr;
        table.innerHTML = "";
        table.append(...allTr);
      }
    }
    clearForm(e);
    closeModal();
  }
  countCategory();
}

export function deleteNote(e) {
  const index = notes.findIndex((el) => el.id === +e.parentElement.id);
  if (index !== -1) {
    notes.splice(index, 1);
    e.parentElement.remove();
  }
}

export function countCategory() {
  const arr = [];
  categories.forEach((n) => {
    let active = 0;
    let archived = 0;
    notes.forEach((i) => {
      if (i.category === n.id) {
        n = i.isActive
          ? { ...n, active: ++active, archived: archived }
          : { ...n, active: active, archived: ++archived };
      }
    });
    arr.push(n);
  });

  console.log(arr);
}
