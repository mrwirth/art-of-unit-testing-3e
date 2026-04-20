import { describe, expect, test } from "vitest";
import { oneUpperCaseRule } from "../password-rules.js";

describe("v1: one uppercase rule", function () {
  test("given no uppercase, it fails", () => {
    const result = oneUpperCaseRule("abc");
    expect(result.passed).toEqual(false);
  });
  test("given one uppercase, it passes", () => {
    const result = oneUpperCaseRule("Abc");
    expect(result.passed).toEqual(true);
  });
  test("given a different uppercase, it passes", () => {
    const result = oneUpperCaseRule("aBc");
    expect(result.passed).toEqual(true);
  });
});

// Parameterize the near-duplicate test with `test.each()`
describe("v2: one uppercase rule", function () {
  test("given no uppercase, it fails", () => {
    const result = oneUpperCaseRule("abc");
    expect(result.passed).toEqual(false);
  });
  test.each(["Abc", "aBc"])("given one uppercase, it passes", (input) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(true);
  });
});

// Parameterize both the input and the expectation.
describe("v3: one uppercase rule", function () {
  test.each([
    ["Abc", true],
    ["aBc", true],
    ["abc", false],
  ])("given %s, %s ", (input, expected) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(expected);
  });
});

// Parameterize with vanilla JavaScript.
describe("v4: one uppercase rule", function () {
  const tests = {
    Abc: true,
    aBc: true,
    abc: false,
  };
  for (const [input, expected] of Object.entries(tests)) {
    test(`given ${input}, ${expected} `, () => {
      const result = oneUpperCaseRule(input);
      expect(result.passed).toEqual(expected);
    });
  }
});
