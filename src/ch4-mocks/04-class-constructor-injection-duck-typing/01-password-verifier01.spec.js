import { PasswordVerifier } from "./00-password-verifier00.js";

class FakeLogger {
  logged = "";

  info(text) {
    this.logged = text;
  }
}

test("logger + passing scenario, calls logger with PASSED", () => {
  let logged = "";
  const mockLog = new FakeLogger();
  const verifier = new PasswordVerifier([], mockLog);
  verifier.verify("any input");

  expect(mockLog.logged).toMatch(/PASSED/);
});
