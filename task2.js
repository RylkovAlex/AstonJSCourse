function getNumberRadix(number, radix) {
  const parsedNumber = Number.parseInt(number.toString());
  const parsedRadix = Number.parseInt(radix.toString());
  if (
    isNaN(parsedNumber) ||
    isNaN(parsedRadix) ||
    parsedNumber < 0 ||
    parsedRadix < 2 ||
    parsedRadix > 16
  ) {
    throw new Error(
      'Функция getNumberRadix была вызвана с некорректными аргументами'
    );
  }
  return parsedNumber.toString(parsedRadix);
}
