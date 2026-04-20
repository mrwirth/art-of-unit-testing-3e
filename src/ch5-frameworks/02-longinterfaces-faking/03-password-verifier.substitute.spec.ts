import { describe, test } from "vitest";
import { Substitute, Arg } from "@fluffy-spoon/substitute";
import type { IComplicatedLogger } from "./interfaces/complicated-logger.ts";
import { PasswordVerifier } from "./00-password-verifier.ts";

describe("working with long interfaces", () => {
  describe("password verifier", () => {
    test("verify, w/ logger & passing, calls logger w/ PASS", () => {
      const mockLogger = Substitute.for<IComplicatedLogger>();

      const verifier = new PasswordVerifier([], mockLogger);
      verifier.verify("anything");

      mockLogger.received().info(
        Arg.is((x) => x.includes("PASSED")),
        "verify",
      );
    });
  });
});
