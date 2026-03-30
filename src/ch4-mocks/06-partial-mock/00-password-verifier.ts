import { RealLogger } from "./real-logger";

export type VerifierRule = (input: string) => boolean;

export class PasswordVerifier {
  private _rules: VerifierRule[];
  private _logger: RealLogger;

  constructor(rules: VerifierRule[], logger: RealLogger) {
    this._rules = rules;
    this._logger = logger;
  }

  verify(input: string): boolean {
    const failed = this._rules
      .map((rule) => rule(input))
      .filter((result) => result === false);

    if (failed.length === 0) {
      this._logger.info("PASSED");
      return true;
    }
    this._logger.info("FAIL");
    return false;
  }
}
