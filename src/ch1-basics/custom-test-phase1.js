import { sum } from "./number-parser.js";

const parserTest = () => {
  try {
    const result = sum("1,2");

    if (result === 3) {
      console.log("parserTest example 1 PASSED");
    } else {
      throw new Error(`parserTest: expected 3 but was ${result}`);
    }
  } catch (error) {
    console.error(error.stack);
  }
};

parserTest();
