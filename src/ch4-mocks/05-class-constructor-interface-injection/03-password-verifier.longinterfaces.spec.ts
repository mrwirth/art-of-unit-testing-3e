import { describe, expect, test } from "vitest";
import type { IComplicatedLogger } from "./interfaces/complicated-logger";
import { PasswordVerifier2 } from "./00-password-verifier2";

describe("working with long interfaces", () => {
  describe("password verifier", () => {
    class FakeComplicatedLogger implements IComplicatedLogger {
      infoWritten = "";
      debugWritten = "";
      warnWritten = "";
      errorWritten = "";

      debug(text: string): void {
        this.debugWritten = text;
      }

      error(text: string): void {
        this.errorWritten = text;
      }

      info(text: string): void {
        this.infoWritten = text;
      }

      warn(text: string): void {
        this.warnWritten = text;
      }
    }

    test("verify passing, with logger, calls logger with PASS", () => {
      const mockLogger = new FakeComplicatedLogger();

      const verifier = new PasswordVerifier2([], mockLogger);
      verifier.verify("anything");

      expect(mockLogger.infoWritten).toMatch(/PASSED/);
    });

    test("A more JS oriented variation on this test using duck typing", () => {
      const mockLogger = {} as IComplicatedLogger;
      let logged = "";
      mockLogger.info = (text: string) => (logged = text);

      const verifier = new PasswordVerifier2([], mockLogger);
      verifier.verify("anything");

      expect(logged).toMatch(/PASSED/);
    });
  });
});
