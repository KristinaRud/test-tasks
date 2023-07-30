import { deleteNote, updateNote } from "./notes.js";

export function toggleArchiveNote(e) {
  updateNote(e);
}
