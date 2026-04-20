import { afterEach, describe, expect, it } from "vitest";
import {
  injectDependencies,
  resetDependencies,
  verifyPassword,
} from "./password-verifier-injectable.js";

describe("password verifier", () => {
  afterEach(resetDependencies);

  describe("given logger and passing scenario", () => {
    it("calls the logger with PASSED", () => {
      let logged = "";
      const mockLog = { info: (text) => (logged = text) };
      injectDependencies({ log: mockLog });

      verifyPassword("anything", []);

      expect(logged).toMatch(/PASSED/);
    });
  });
});
