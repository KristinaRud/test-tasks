import { editNote, deleteNote } from "./notes.js";
import { getCategory } from "./categories.js";
import { formatDate } from "./helpers.js";
import {toggleArchiveNote} from "./archieve.js";

export const renderRow = ({ name, created, category, content, dates, isActive }, id, isAllNotes) => {
  const tr = document.createElement("tr");
  tr.dataset.active = isActive === isAllNotes? "active" : "";
  tr.style.display = isActive === isAllNotes ? "revert" : "none";
  const editTd = document.createElement("td");
  editTd.id = "edit";
  editTd.innerHTML = "edit";
  editTd.addEventListener("click", (e) => editNote(e.currentTarget));

  const deleteTd = document.createElement("td");
  deleteTd.id = "delete";
  deleteTd.innerHTML = "Delete";
  deleteTd.addEventListener("click", (e) => deleteNote(e.currentTarget));

  const archiveTd = document.createElement("td");
  archiveTd.id = isAllNotes? "archive" : "unarchive";
  archiveTd.innerHTML = isAllNotes? "archive" : "unarchive";
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

export const renderData = (list, isAllNotes=true) => {
  const arrayRows = list?.map((item, index) => renderRow(item, index, isAllNotes));
  return arrayRows;
};
