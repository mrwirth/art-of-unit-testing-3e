const DaysOfWeek = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

// Curried function
const makeVerifier = (rules, dayOfWeekFn) => {
  return function (input) {
    if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(dayOfWeekFn())) {
      throw new Error("It's the weekend!");
    }
    // more code goes here...
  };
};

// Constructor function
const Verifier = function (rules, dayOfWeekFn) {
  this.verify = function (input) {
    if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(dayOfWeekFn())) {
      throw new Error("It's the weekend!");
    }
    // more code goes here...
  };
};

export { DaysOfWeek, makeVerifier, Verifier };
