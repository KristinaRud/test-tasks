import { btnCreateNotes, btnCloseModal, table } from "./constants.js";
import { sendRequest } from "./api.js";
import { API_URL } from "./constants.js";

const data = [];
document.addEventListener("DOMContentLoaded", () => {
  sendRequest(API_URL).then((res) => {
    data.push(...res);
    table.append(...renderData(data));
  });

  btnCreateNotes.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
});

const renderRow = ({ name, created, category, content, dates }, id) => {
  const tr = document.createElement("tr");
  tr.id = id;
  tr.innerHTML = `<td id="name">${name}</td>
                  <td id="created">${created}</td>
                  <td id="category">${category}</td>
                  <td id="content">${content}</td>
                  <td id="dates">${dates}</td>
                  <td id="edit">Edit</td>
                  <td id="archive">Archive</td>
                  <td id="delete">Delete</td>`;
  return tr;
};
const renderData = (data) => {
  const arrayRows = data?.map((item, index) => renderRow(item, index));
  return arrayRows;
};

// Функция для открытия модального окна
function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Функция для закрытия модального окна
function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}
