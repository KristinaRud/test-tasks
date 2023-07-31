import { modal, form } from "./constants.js";

export function openModal(isEdit = false) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

export function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  form.reset();
}

export function clearForm(e) {
  form.dataset.id = "-1";
  e.reset();
}
