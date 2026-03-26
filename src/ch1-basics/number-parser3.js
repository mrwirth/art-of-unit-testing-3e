let total = 0;

const totalSoFar = () => {
  return total;
};

const makeLogger = () => {
  const info = (message, data) => {
    console.log(message);
    console.log(data);
  };

  return { info };
};

const logger = makeLogger();

const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  logger.info("this is a very important log output", {
    firstNumWas: a,
    secondNumWas: b,
  });

  const result = parseInt(a) + parseInt(b);
  total += result;
  return result;
};

export { totalSoFar, sum };

sum("10,20");
