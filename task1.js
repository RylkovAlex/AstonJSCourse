const deleteElementFromArray = (arr, elem) => {
  const index = arr.findIndex((el) => el === elem);
  if (~index) {
    const result = [...arr];
    result.splice(index, 1);
    return result;
  }
  return arr;
};
