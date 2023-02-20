const ERRORS = {
  base: 'В параметры функции getInterval были переданы невалидные значения. ',
  from: 'Аргумент from должен быть числом',
  to: 'Аргумент to должен быть числом',
  arr: 'Аргумент arr должен содержать только числовые значения',
};

const getInterval = (arr, from, to, check = checkNumber) => {
  from = check(from, ERRORS.base + ERRORS.from);
  to = check(to, ERRORS.base + ERRORS.to);
  const start = Math.min(from, to);
  const end = Math.max(from, to);
  return arr.filter((number) => {
    return start <= check(number, ERRORS.base + ERRORS.arr) && number <= end;
  });
};

function checkNumber(number, errorMessage) {
  if (typeof number !== 'number' || Number.isNaN(number) || !isFinite(number)) {
    throw new Error(errorMessage);
  }
  return number;
}
