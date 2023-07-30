export const categories = [
    { id: 0, title: "Task", icon: "./images/task.png" },
    { id: 1, title: "Random Thought", icon: "./images/thinking.png" },
    { id: 2, title: "Idea", icon: "./images/idea.png" },
];

export function getCategory(category) {
    const index = categories.find(c => c.id === +category);
    return index;
};