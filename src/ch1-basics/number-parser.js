const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  return parseInt(a) + parseInt(b);
};

export { sum };
