import { describe, expect, test } from "vitest";
import { PasswordVerifier } from "./password-verifier-time02.js";
import { DaysOfWeek } from "../DaysOfWeek.js";

function FakeTimeProvider(fakeDay) {
  this.getDay = function () {
    return fakeDay;
  };
}

describe("verifier", () => {
  test("on weekends, throws exception", () => {
    const verifier = new PasswordVerifier(
      [],
      new FakeTimeProvider(DaysOfWeek.SUNDAY),
    );

    expect(() => verifier.verify("anything")).toThrow("It's the weekend!");
  });
});
