import {
  DaysOfWeek,
  makeVerifier,
  Verifier,
} from "./password-verifier-time01.js";

// Do dependency injection via factory method.
describe("verifier", () => {
  test("factory method: on weekends, throws exceptions", () => {
    const alwaysSunday = () => DaysOfWeek.SUNDAY;
    const verifyPassword = makeVerifier([], alwaysSunday);

    expect(() => verifyPassword("anything")).toThrow("It's the weekend!");
  });
});

// Do dependency injection via constructor function.
test("constructor function: on weekends, throws exception", () => {
  const alwaysSunday = () => DaysOfWeek.SUNDAY;
  const verifier = new Verifier([], alwaysSunday);

  expect(() => verifier.verify("anything")).toThrow("It's the weekend!");
});
