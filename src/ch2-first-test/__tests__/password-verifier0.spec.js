import { describe, expect, it, test } from "vitest";
import { verifyPassword } from "../password-verifier0.js";

test("v1: badly named test", () => {
  const fakeRule = () => ({ passed: false, reason: "fake reason" });

  const errors = verifyPassword("any value", [fakeRule]);

  expect(errors[0]).toMatch("fake reason");
});

// Named following USE:
//  U - Unit under test,
//  S - Scenario,
//  E - Expectation
// Also uses `.toContain()` instead of `.toMatch()`, using a substring search instead
// of a regex match.
test("v1.1: verifyPassword, given a failing rule, returns errors", () => {
  const fakeRule = () => ({ passed: false, reason: "fake reason" });

  const errors = verifyPassword("any value", [fakeRule]);

  expect(errors[0]).toContain("fake reason");
});

// Use `describe()`.  Also add the input to the reason
// (mentioned in text, but not actually done).
describe("v1.2: verifyPassword", () => {
  test("given a failing rule, returns errors", () => {
    const fakeRule = (input) => ({
      passed: false,
      reason: "fake reason" + input,
    });

    const errors = verifyPassword("any value", [fakeRule]);

    expect(errors[0]).toContain("fake reason");
  });
});

// `describe()`s all the way down.
describe("v1.3: verifyPassword", () => {
  describe("given a failing rule", () => {
    test("returns errors", () => {
      const fakeRule = (input) => ({
        passed: false,
        reason: "fake reason" + input,
      });

      const errors = verifyPassword("any value", [fakeRule]);

      expect(errors[0]).toContain("fake reason");
    });
  });
});

// Move the 'arrange' portion directly under the relevant `describe()`.
describe("v1.4: verifyPassword", () => {
  describe("given a failing rule", () => {
    const fakeRule = (input) => ({
      passed: false,
      reason: "fake reason" + input,
    });

    test("returns errors", () => {
      const errors = verifyPassword("any value", [fakeRule]);

      expect(errors[0]).toContain("fake reason");
    });
  });
});

// Use `it()` in place of `test()`.  Functionally the same, but reads better.
describe("v1.5: verifyPassword", () => {
  describe("given a failing rule", () => {
    it("returns errors", () => {
      const fakeRule = (input) => ({
        passed: false,
        reason: "fake reason" + input,
      });

      const errors = verifyPassword("any value", [fakeRule]);

      expect(errors[0]).toContain("fake reason");
    });
  });
});
