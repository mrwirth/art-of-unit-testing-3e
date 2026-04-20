import { describe, expect, test } from "vitest";
import {
  makeVerifier,
  PasswordVerifier,
  Verifier,
} from "./password-verifier-time01.js";
import { DaysOfWeek } from "../DaysOfWeek.js";

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

// Use class constructor injection with a dummy function.
test("class constructor: on weekends, throws exception", () => {
  const alwaysSunday = () => DaysOfWeek.SUNDAY;
  const verifier = new PasswordVerifier([], alwaysSunday);

  expect(() => verifier.verify("anything")).toThrow("It's the weekend!");
});

// As before, but use a factory function to instantiate the class for the tests.
describe("refactored with constructor", () => {
  const makeVerifier = (rules, dayFn) => {
    return new PasswordVerifier(rules, dayFn);
  };

  test("class constructor: on weekends, throws exception", () => {
    const alwaysSunday = () => DaysOfWeek.SUNDAY;
    const verifier = makeVerifier([], alwaysSunday);

    expect(() => verifier.verify("anything")).toThrow("It's the weekend!");
  });
  test("class constructor: on weekdays, with no rules, passes", () => {
    const alwaysMonday = () => DaysOfWeek.MONDAY;
    const verifier = makeVerifier([], alwaysMonday);

    const result = verifier.verify("anything");
    expect(result.length).toBe(0);
  });
});
