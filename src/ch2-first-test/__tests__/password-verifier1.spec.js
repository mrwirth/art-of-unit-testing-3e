import { PasswordVerifier1 } from "../password-verifier1.js";

describe("v1: PasswordVerifier1", () => {
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = (input) => ({
        passed: false,
        reason: "fake reason" + input,
      });

      verifier.addRule(fakeRule);
      const errors = verifier.verify("any value");

      expect(errors[0]).toContain("fake reason");
    });
  });
});

// Add an extra assertion.  Bad pattern, can lead to "assertion roulette".
describe("v2: PasswordVerifier1", () => {
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = (input) => ({
        passed: false,
        reason: "fake reason" + input,
      });

      verifier.addRule(fakeRule);
      const errors = verifier.verify("any value");

      expect(errors.length).toBe(1);
      expect(errors[0]).toContain("fake reason");
    });
  });
});

// Split the new assertion out into a separate test, but same unit and scenario.
// Downside: a lot of duplication.
describe("v3: PasswordVerifier1", () => {
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = (input) => ({
        passed: false,
        reason: "fake reason" + input,
      });

      verifier.addRule(fakeRule);
      const errors = verifier.verify("any value");

      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = (input) => ({
        passed: false,
        reason: "fake reason" + input,
      });

      verifier.addRule(fakeRule);
      const errors = verifier.verify("any value");

      expect(errors.length).toBe(1);
    });
  });
});

// Use `beforeEach()` to reduce duplication.
// Mistakes/problems:
// - `errors` isn't reset.
// - tests are run in parallel, which may lead to shared state problems
//   like overwriting each others values.  (Said by the book for jest, but
//   is that actually the case there and/or for vitest?)
describe("v4: PasswordVerifier1", () => {
  let verifier;
  beforeEach(() => (verifier = new PasswordVerifier1()));
  describe("with a failing rule", () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = (input) => ({ passed: false, reason: "fake reason" + input });
      verifier.addRule(fakeRule);
    });

    it("has an error message based on the rule.reason", () => {
      errors = verifier.verify("any value");

      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      errors = verifier.verify("any value");

      expect(errors.length).toBe(1);
    });
  });
});
