import { renderTotalRow } from "./renderTable.js";
import { notes } from "./notes.js";

export const categories = [
    { id: 0, title: "Task", icon: "./images/task.png" },
    { id: 1, title: "Random Thought", icon: "./images/thinking.png" },
    { id: 2, title: "Idea", icon: "./images/idea.png" },
];

export function getCategory(category) {
    const index = categories.find(c => c.id === +category);
    return index;
};


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

    const tableTotal = arr?.map((item) => renderTotalRow(item));
    return tableTotal
}
