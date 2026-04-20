import { expect, test, vi } from "vitest";
import { makeVerifier } from "./00-password-verifier00.js";

test("given logger and passing scenario", () => {
  const mockLog = { info: vi.fn() };
  const verify = makeVerifier([], mockLog);

  verify("any input");

  expect(mockLog.info).toHaveBeenCalledWith(expect.stringMatching(/PASS/));
});
