export function formatDate(date) {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function extractDates(text) {
  const dateRegex = /\d{2}\/\d{2}\/\d{4}/g;
  const dates = [];
  let match;

  while ((match = dateRegex.exec(text)) !== null) {
    dates.push(match[0]);
  }

  return dates;
}
