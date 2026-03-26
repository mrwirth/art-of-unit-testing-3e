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
// - Tests are run in parallel, which may lead to shared state problems
//   like overwriting each other's values.
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

// As before, but now we're also putting the Act (of arrange-act-assert)
// into the `beforeEach()` as well.
describe("v5: PasswordVerifier1", () => {
  let verifier;
  beforeEach(() => (verifier = new PasswordVerifier1()));
  describe("with a failing rule", () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = (input) => ({ passed: false, reason: "fake reason" + input });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    it("has an error message based on the rule.reason", () => {
      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      expect(errors.length).toBe(1);
    });
  });
});

// As before, but with even more scenarios.
// New problems raising their heads:
// - Duplication has returned.
// - Scroll fatigue: have to scroll up repeatedly to get test contexts.  It's
//   also easier to mix up which state goes with each `it()`.
describe("v6: PasswordVerifier1", () => {
  let verifier;
  beforeEach(() => (verifier = new PasswordVerifier1()));
  describe("with a failing rule", () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = (input) => ({ passed: false, reason: "fake reason" + input });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    it("has an error message based on the rule.reason", () => {
      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      expect(errors.length).toBe(1);
    });
  });
  describe("with a passing rule", () => {
    let fakeRule, errors;
    beforeEach(() => {
      fakeRule = (input) => ({ passed: true, reason: "" });
      verifier.addRule(fakeRule);
      errors = verifier.verify("any value");
    });

    it("has no errors", () => {
      expect(errors.length).toBe(0);
    });
  });
  describe("with a failing and a passing rule", () => {
    let fakeRulePass, fakeRuleFail, errors;
    beforeEach(() => {
      fakeRulePass = (input) => ({ passed: true, reason: "fake success" });
      fakeRuleFail = (input) => ({
        passed: false,
        reason: "fake reason" + input,
      });
      verifier.addRule(fakeRulePass);
      verifier.addRule(fakeRuleFail);
      errors = verifier.verify("any value");
    });

    it("has one error", () => {
      expect(errors.length).toBe(1);
    });

    it("error text belongs to failed rule", () => {
      expect(errors[0]).toContain("fake reason");
    });
  });
});

// As before, but with factory methods replacing some of the
// `beforeEach()`s, making it a bit more readable.
describe("v7: PasswordVerifier1", () => {
  let verifier;
  beforeEach(() => (verifier = new PasswordVerifier1()));
  describe("with a failing rule", () => {
    let errors;
    beforeEach(() => {
      verifier.addRule(makeFailingRule("fake reason"));
      errors = verifier.verify("any value");
    });
    it("has an error message based on the rule.reason", () => {
      expect(errors[0]).toContain("fake reason");
    });
    it("has exactly one error", () => {
      expect(errors.length).toBe(1);
    });
  });
  describe("with a passing rule", () => {
    let errors;
    beforeEach(() => {
      verifier.addRule(makePassingRule());
      errors = verifier.verify("any value");
    });
    it("has no errors", () => {
      expect(errors.length).toBe(0);
    });
  });
  describe("with a failing and a passing rule", () => {
    let errors;
    beforeEach(() => {
      verifier.addRule(makePassingRule());
      verifier.addRule(makeFailingRule("fake reason"));
      errors = verifier.verify("any value");
    });
    it("has one error", () => {
      expect(errors.length).toBe(1);
    });
    it("error text belongs to failed rule", () => {
      expect(errors[0]).toContain("fake reason");
    });
  });

  // Placed internally so as not to collide with other examples.
  const makeFailingRule = (reason) => {
    return (input) => ({ passed: false, reason: `${reason} | ${input}` });
  };

  const makePassingRule = () => (input) => {
    return { passed: true, reason: "" };
  };
});

// As before, but with factory methods replacing all of the
// `beforeEach()`s, making it a bit more readable.
const makeVerifier = () => new PasswordVerifier1();
const passingRule = (input) => ({ passed: true, reason: "" });

const makeVerifierWithPassingRule = () => {
  const verifier = makeVerifier();
  verifier.addRule(passingRule);
  return verifier;
};

const makeVerifierWithFailedRule = (reason) => {
  const verifier = makeVerifier();
  const fakeRule = (input) => ({
    passed: false,
    reason: `${reason} | ${input}`,
  });
  verifier.addRule(fakeRule);
  return verifier;
};

describe("v8: PasswordVerifier1", () => {
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any value");
      expect(errors[0]).toContain("fake reason");
    });
    it("has exactly one error", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(1);
    });
  });
  describe("with a passing rule", () => {
    it("has no errors", () => {
      const verifier = makeVerifierWithPassingRule();
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(0);
    });
  });
  describe("with a failing and a passing rule", () => {
    it("has one error", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRule(passingRule);
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(1);
    });
    it("error text belongs to failed rule", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRule(passingRule);
      const errors = verifier.verify("any value");
      expect(errors[0]).toContain("fake reason");
    });
  });
});

// v9: Abandon `describe()`, return to `test()`.
test("PasswordVerifier1, with a failing rule, has an error message based on the rule.reason", () => {
  const verifier = makeVerifierWithFailedRule("fake reason");
  const errors = verifier.verify("any value");
  expect(errors[0]).toContain("fake reason");
});
test("PasswordVerifier1, with a failing rule, has exactly one error", () => {
  const verifier = makeVerifierWithFailedRule("fake reason");
  const errors = verifier.verify("any value");
  expect(errors.length).toBe(1);
});
test("PasswordVerifier1, with a passing rule, has no errors", () => {
  const verifier = makeVerifierWithPassingRule();
  const errors = verifier.verify("any value");
  expect(errors.length).toBe(0);
});
test("PasswordVerifier1, with a failing and a passing rule, has one error", () => {
  const verifier = makeVerifierWithFailedRule("fake reason");
  verifier.addRule(passingRule);
  const errors = verifier.verify("any value");
  expect(errors.length).toBe(1);
});
test("PasswordVerifier1, with a failing and a passing rule, error text belongs to failed rule", () => {
  const verifier = makeVerifierWithFailedRule("fake reason");
  verifier.addRule(passingRule);
  const errors = verifier.verify("any value");
  expect(errors[0]).toContain("fake reason");
});
