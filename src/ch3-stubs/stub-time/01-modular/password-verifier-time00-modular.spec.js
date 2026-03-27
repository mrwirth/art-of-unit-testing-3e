import {
  DaysOfWeek,
  inject,
  verifyPassword,
} from "./password-verifier-time00-modular.js";

// Helper function for injecting the day we want to test into verifyPassword.
const injectDate = (newDay) => {
  return inject({
    dayjs: function () {
      // we're faking the dayjs API here
      // Seems pretty fragile and/or like we need to know too much.
      return {
        day: () => newDay,
      };
    },
  });
};

describe("verifyPassword", () => {
  describe("when it's the weekend", () => {
    it("throws an error", () => {
      const reset = injectDate(DaysOfWeek.SATURDAY);

      expect(() => verifyPassword("any input")).toThrow("It's the weekend!");

      reset();
    });
  });
});
