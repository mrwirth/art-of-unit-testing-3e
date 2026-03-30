import type { ILogger } from "./interfaces/logger";

export type VerifierRule = (input: string) => boolean;

export class PasswordVerifier {
  private _rules: VerifierRule[];
  private _logger: ILogger;

  constructor(rules: VerifierRule[], logger: ILogger) {
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
