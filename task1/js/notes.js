import { table, form } from "./constants.js";
import { closeModal, openModal, clearForm } from "./modal.js";
import { extractDates } from "./helpers.js";
import { renderRow } from "./renderTable.js";
import { categories } from "./categories.js";

export const notes = [
  {
    id: 0,
    name: "Task",
    created: "2023-07-31T00:00:00.000Z",
    category: 0,
    content: "Prepare for the job interview on Wednesday(02/08/2023)",
    dates: ["02/08/2023"],
    isActive: true,
  },
  {
    id: 1,
    name: "Random Thought",
    created: "2023-07-31T00:00:00.000Z",
    category: 1,
    content: "Life is full of surprises and possibilities.",
    dates: [],
    isActive: false,
  },
  {
    id: 2,
    name: "Idea",
    created: "2023-07-31T00:00:00.000Z",
    category: 2,
    content: "Start a new project related to photography.",
    dates: [],
    isActive: true,
  },
  {
    id: 3,
    name: "Task",
    created: "2023-07-31T00:00:00.000Z",
    category: 0,
    content: "Buy a gift for a friend's birthday.",
    dates: [],
    isActive: false,
  },
  {
    id: 4,
    name: "Random Thought",
    created: "2023-07-31T00:00:00.000Z",
    category: 1,
    content: "Nature has a way of calming the mind.",
    dates: [],
    isActive: true,
  },
  {
    id: 5,
    name: "Idea",
    created: "2023-07-31T00:00:00.000Z",
    category: 2,
    content: "Create an online store for handmade crafts.",
    dates: [],
    isActive: true,
  },
  {
    id: 6,
    name: "Task",
    created: "2023-07-31T00:00:00.000Z",
    category: 0,
    content: "Organize the bookshelf and donate old books.",
    dates: [],
    isActive: true,
  },
];

export function createNote(e) {
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


export function deleteNote(e) {
  const index = notes.findIndex((el) => el.id === +e.parentElement.id);
  if (index !== -1) {
    notes.splice(index, 1);
    e.parentElement.remove();
  }
}