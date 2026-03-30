import { RealLogger } from "./real-logger";
import { PasswordVerifier } from "./00-password-verifier";
import { expect } from "vitest";

class TestableLogger extends RealLogger {
  logged = "";

  info(text: string) {
    this.logged = text;
  }
  // the `error` and `debug` functions are still "real".
}

describe("password verifier with interfaces", () => {
  test("verify, with logger, calls logger", () => {
    const testableLogger: TestableLogger = new TestableLogger();

    const verifier = new PasswordVerifier([], testableLogger);
    verifier.verify("any input");

    expect(testableLogger.logged).toMatch(/PASSED/);
  });
});
