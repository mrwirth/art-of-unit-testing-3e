import { DaysOfWeek } from "../DaysOfWeek.js";

// Class with constructor injection pattern and injected object.
class PasswordVerifier {
  constructor(rules, timeProvider) {
    this.rules = rules;
    this.timeProvider = timeProvider;
  }

  verify() {
    if (
      [DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(
        this.timeProvider.getDay(),
      )
    ) {
      throw new Error("It's the weekend!");
    }
    const errors = [];
    // more code goes here...
    return errors;
  }
}

export { PasswordVerifier };
