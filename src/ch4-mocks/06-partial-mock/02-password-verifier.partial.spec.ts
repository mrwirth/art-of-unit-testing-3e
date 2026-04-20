import { describe, expect, test } from "vitest";
import { RealLogger } from "./real-logger";
import { PasswordVerifier } from "./00-password-verifier";

describe("password verifier with interfaces", () => {
  test("verify, with logger, calls logger", () => {
    const testableLogger: RealLogger = new RealLogger();
    let logged = "";
    testableLogger.info = (text: string) => (logged = text);

    const verifier = new PasswordVerifier([], testableLogger);
    verifier.verify("any input");

    expect(logged).toMatch(/PASSED/);
  });
});
