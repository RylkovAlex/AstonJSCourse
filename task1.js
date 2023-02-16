const sum = (a, b, fractionDigits = 3) => {
  const first = Number.parseFloat(a);
  if (isNaN(a)) {
    throw new Error(
      `function ${sum.name}: can't parse argument "${a}" as a Number`
    );
  }
  const second = Number.parseFloat(b);
  if (isNaN(b)) {
    throw new Error(
      `function ${sum.name}: can't parse argument "${b}" as a Number`
    );
  }
  return +(first + second).toFixed(fractionDigits);
};
