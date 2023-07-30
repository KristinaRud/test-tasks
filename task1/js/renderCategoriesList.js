export const renderCategoriesList = (categories) => {
  const select = document.createElement("select");
  select.id = "category";
  select.name = "category";
  const optionsList = categories.map((c) => {
    const option = document.createElement("option");
    option.value = c.id;
    option.innerHTML = c.title;
    return option;
  });

  select.append(...optionsList);
  return select;
};
