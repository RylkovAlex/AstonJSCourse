const ERROR_MESSAGE =
  'В параметры функции getUniqArray были переданы невалидные значения. Аргумент arr должен содержать только числовые значения';

const getUniqArray = (arr) => [...new Set(arr.map((el) => checkNumber(el)))];

// without Set:
/* const getUniqArray = (arr) =>
  arr.reduce((acc, el) => {
    if (acc.includes(checkNumber(el))) {
      return acc;
    }
    acc.push(el);
    return acc;
  }, []); */

function checkNumber(number, errorMessage = ERROR_MESSAGE) {
  if (typeof number !== 'number' || Number.isNaN(number) || !isFinite(number)) {
    throw new Error(errorMessage);
  }
  return number;
}
