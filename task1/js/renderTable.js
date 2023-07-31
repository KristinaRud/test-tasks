import { editNote, deleteNote, createNote, notes } from "./notes.js";
import { getCategory, countCategory } from "./categories.js";
import { formatDate, extractDates } from "./helpers.js";
import { toggleArchiveNote } from "./archieve.js";
import { closeModal, clearForm } from "./modal.js";
import { tableTotal, table, form } from "./constants.js";

export const renderRow = ({ name, created, category, content, dates, isActive }, id, isAllNotes) => {
  const tr = document.createElement("tr");
  tr.dataset.active = isActive === isAllNotes ? "active" : "";
  tr.style.display = isActive === isAllNotes ? "revert" : "none";
  const editTd = document.createElement("td");
  editTd.id = "edit";
  editTd.innerHTML = '<img src="./images/edit.png" alt="edit" class="item-icon" />';;
  editTd.addEventListener("click", (e) => editNote(e.currentTarget));

  const deleteTd = document.createElement("td");
  deleteTd.id = "delete";
  deleteTd.innerHTML = '<img src="./images/delete.png" alt="delete" class="item-icon" />';
  deleteTd.addEventListener("click", (e) => deleteNote(e.currentTarget));

  const archiveTd = document.createElement("td");
  archiveTd.id = isAllNotes ? "archive" : "unarchive";
  archiveTd.innerHTML = isAllNotes ? '<img src="./images/archive.png" alt="archive" class="item-icon"/>' : '<img src="./images/unarchive.png" alt="unarchive" class="item-icon"/>';
  archiveTd.addEventListener("click", (e) => toggleArchiveNote(e.currentTarget));

  const { id: idCategory, title, icon } = getCategory(category);
  tr.id = id;
  tr.innerHTML = `<td id="name"> <img src=${icon} alt=${title} class="item-icon" /> ${name}</td>
                    <td id="created">${formatDate(new Date(created))}</td>
                    <td id="category" data-category="${idCategory}">${title}</td>
                    <td id="content">${content}</td>
                    <td id="dates">${dates}</td>`;
  tr.append(editTd);
  tr.append(deleteTd);
  tr.append(archiveTd);

  return tr;
};
export const renderData = (list, isAllNotes = true) => {
  const arrayRows = list?.map((item, index) => renderRow(item, index, isAllNotes));
  return arrayRows;
};

export const renderTotalRow = ({ id, title, icon, active, archived }) => {
  const tr = document.createElement("tr");

  tr.id = id;
  tr.innerHTML = `<td id="name"> <img src=${icon} alt=${title} class="item-icon" /> ${title}</td>
                    <td id="active">${active}</td>
                    <td id="archived">${archived}</td>`;

  return tr;
};


export function updateNote(e) {
  const allTr = Array.from(table.querySelectorAll("tr"));
  if (e.closest("td")) {
    const id = e.parentElement.id;
    const index = notes.findIndex((el) => el.id === +id);
    const indexTr = allTr.findIndex((el) => el.id === id);
    if (index !== -1 && indexTr !== -1) {
      notes[index].isActive =
        e.closest("td").id === "archive" ? false : true;
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
  updateTotalTable();
}

export function updateTotalTable(){
  tableTotal.innerHTML="";
  tableTotal.append(...countCategory());
}