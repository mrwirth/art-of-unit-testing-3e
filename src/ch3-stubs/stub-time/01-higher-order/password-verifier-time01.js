import { DaysOfWeek } from "../DaysOfWeek.js";

// Curried function
const makeVerifier = (rules, dayOfWeekFn) => {
  return function () {
    if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(dayOfWeekFn())) {
      throw new Error("It's the weekend!");
    }
    // more code goes here...
  };
};

// Constructor function pattern
const Verifier = function (rules, dayOfWeekFn) {
  this.verify = function () {
    if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(dayOfWeekFn())) {
      throw new Error("It's the weekend!");
    }
    // more code goes here...
  };
};

// Class with constructor injection pattern
class PasswordVerifier {
  constructor(rules, dayOfWeekFn) {
    this.rules = rules;
    this.dayOfWeek = dayOfWeekFn;
  }

  verify() {
    if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(this.dayOfWeek())) {
      throw new Error("It's the weekend!");
    }
    const errors = [];
    // more code goes here...
    return errors;
  }
}

export { makeVerifier, PasswordVerifier, Verifier };
