// A version of the password verifier that allows overriding individual
// dependencies.  Seems kind of clunky.
const originalDependencies = {
  dayjs: require("dayjs"),
};

let dependencies = { ...originalDependencies };

const inject = (fakes) => {
  Object.assign(dependencies, fakes);
  return function reset() {
    dependencies = { ...originalDependencies };
  };
};

const DaysOfWeek = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

const verifyPassword = (input, rules) => {
  const dayOfWeek = dependencies.dayjs().day();
  if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(dayOfWeek)) {
    throw new Error("It's the weekend!");
  }
  // more code goes here...
  // return list of errors found...
  return [];
};

export { DaysOfWeek, inject, verifyPassword };
