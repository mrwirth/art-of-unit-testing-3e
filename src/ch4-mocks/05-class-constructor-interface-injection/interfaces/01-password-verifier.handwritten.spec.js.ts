import type { ILogger } from "./logger";
import { expect, test } from "vitest";
import { PasswordVerifier } from "../00-password-verifier";

class FakeLogger implements ILogger {
  written: string | undefined;

  info(text: string): void {
    this.written = text;
  }
}

describe("password verifier with interfaces", () => {
  test("verify, with logger, calls logger", () => {
    const mockLogger = new FakeLogger();
    const verifier = new PasswordVerifier([], mockLogger);

    verifier.verify("anything");

    expect(mockLogger.written).toMatch(/PASS/);
  });
});
