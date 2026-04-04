import type { IComplicatedLogger } from "./interfaces/complicated-logger.ts";

export type RuleType = (input: string) => boolean;

export class PasswordVerifier {
  private _rules: RuleType[];
  private _logger: IComplicatedLogger;

  constructor(rules: RuleType[], logger: IComplicatedLogger) {
    this._rules = rules;
    this._logger = logger;
  }

  verify(input: string): boolean {
    const failed = this._rules
      .map((rule) => rule(input))
      .filter((result) => !result);

    if (failed.length === 0) {
      this._logger.info("PASSED", "verify");
      return true;
    }

    this._logger.info("FAILED", "verify");
    return false;
  }
}
