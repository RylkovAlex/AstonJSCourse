/*Doesn't works with objects which contains circular references.*/
const deepCopyObject = (value) => {
  // check is Primitive:
  if (value !== Object(value)) {
    return value;
  }
  try {
    // attempt to copy
    const {
      constructor: { name: objectType },
    } = value;
    switch (objectType) {
      case 'Object': {
        const copy = {};
        for (key in value) {
          copy[key] = deepCopyObject(value[key]);
        }
        return copy;
      }
      case 'Array': {
        const copy = [];
        value.forEach((elem, idx) => {
          copy[idx] = deepCopyObject(elem);
        });
        return copy;
      }
      case 'Boolean':
      case 'Number':
      case 'String':
        return new value.constructor(value);
      default:
        console.warn(
          `Attention: argument contains object which is instance of ${objectType} class. It was shallow copied, not deep!`
        );
        return value;
    }
  } catch (error) {
    console.warn(`Failed to copy object: ${error.message}`);
    return value;
  }
};
