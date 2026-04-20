import { DaysOfWeek } from "../DaysOfWeek.js";

// A version of the password verifier that allows overriding individual
// dependencies.  Seems kind of clunky.
import dayjs from "dayjs";

const originalDependencies = {
  dayjs: dayjs,
};

let dependencies = { ...originalDependencies };

const inject = (fakes) => {
  Object.assign(dependencies, fakes);
  return function reset() {
    dependencies = { ...originalDependencies };
  };
};

const verifyPassword = () => {
  const dayOfWeek = dependencies.dayjs().day();
  if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(dayOfWeek)) {
    throw new Error("It's the weekend!");
  }
  // more code goes here...
  // return list of errors found...
  return [];
};

export { inject, verifyPassword };
