export const getYears = (year) => {
  const yearStringToNumber = Number(year);
  let date = new Date(Date.now());
  date.setFullYear(date.getFullYear() + yearStringToNumber);
  date = Date.parse(date) / 1000;
  return date;
};
