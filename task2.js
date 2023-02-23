const addElementsToArray = (arr, index) => {
  if (
    index &&
    (typeof index !== 'number' || !Number.isInteger(index) || index < 0)
  ) {
    throw new Error(
      'index cannot be a negative number or fractional number'
    );
  }
  index = index || arr.length;
  return (...elems) => {
    const result = [...arr];
    result.splice(index, 0, ...elems);
    return result;
  };
};
