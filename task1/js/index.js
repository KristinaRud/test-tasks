import {
  btnCreateNotes,
  btnCloseModal,
  table,
  categoryList,
  form,
  tabs,
} from "./constants.js";
import { notes} from "./notes.js";
import { categories} from "./categories.js";
import { closeModal, openModal} from "./modal.js";
import { renderCategoriesList } from "./renderCategoriesList.js";
import { renderData, updateNote, updateTotalTable } from "./renderTable.js";

document.addEventListener("DOMContentLoaded", () => {
tabs.addEventListener("click", (e) => {
  const btnTarget = e.target.closest("button");
  if (btnTarget.innerText==="Archive") {
    btnTarget.classList.toggle("active");
    table.innerHTML="";
    table.append(...renderData(notes, false));
  }else{
    table.innerHTML="";
    table.append(...renderData(notes));
  }
});
  btnCreateNotes.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateNote(e.target);
  });
  table.append(...renderData(notes));
  categoryList.append(renderCategoriesList(categories));
  updateTotalTable();
  form.reset();
});


