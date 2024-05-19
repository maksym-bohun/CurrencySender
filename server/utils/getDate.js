function getDate() {
  const date = new Date();
  const day =
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate();
  const month =
    date.getMonth().toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;

  return `${date.getFullYear()}${month}${day}`;
}

module.exports = { getDate };
