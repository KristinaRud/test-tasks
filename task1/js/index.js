import { btnCreateNotes, btnCloseModal, table } from "./constants.js";
import {  notes } from "./notes.js";
import { getCategory } from './categories.js'

document.addEventListener("DOMContentLoaded", () => {
  btnCreateNotes.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  table.append(...renderData(notes));
});

const renderRow = ({ name, created, category, content, dates }, id) => {
  const tr = document.createElement("tr");
  const {id:idCategory, title, icon} = getCategory(category);
  tr.id = id;
  tr.innerHTML = `<td id="name"> <img src=${icon} alt=${title} class="item-icon" /> ${name}</td>
                  <td id="created">${created}</td>
                  <td id="category" data-category="${idCategory}">${title}</td>
                  <td id="content">${content}</td>
                  <td id="dates">${dates}</td>
                  <td id="edit">Edit</td>
                  <td id="archive">Archive</td>
                  <td id="delete">Delete</td>`;
  return tr;
};


const renderData = (notes) => {
  const arrayRows = notes?.map((item, index) => renderRow(item, index));
  return arrayRows;
};

// Функция для открытия модального окна
function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Функция для закрытия модального окна
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}
