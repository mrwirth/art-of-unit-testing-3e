import { describe, expect, test } from "vitest";
import type { IComplicatedLogger } from "./interfaces/complicated-logger.ts";
import { PasswordVerifier } from "./00-password-verifier.ts";

describe("working with long interfaces", () => {
  describe("password verifier", () => {
    test("verify, w/ logger & passing, calls logger with PASS", () => {
      const mockLogger: IComplicatedLogger = {
        info: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
        error: vi.fn(),
      };

      const verifier = new PasswordVerifier([], mockLogger);
      verifier.verify("anything");

      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringMatching(/PASSED/),
        expect.stringMatching(/verify/),
      );
    });
  });
});
