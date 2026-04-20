import { describe, test } from "vitest";
import type { TimeProviderInterface } from "./time-provider-interface";
import { DaysOfWeek } from "../DaysOfWeek";
import { PasswordVerifier } from "./password-verifier-time03";
import { expect } from "vitest";

class FakeTimeProvider implements TimeProviderInterface {
  fakeDay: number | undefined;
  getDay(): number | undefined {
    return this.fakeDay;
  }
}

describe("password verifier with interfaces", () => {
  test("on weekends, throws exceptions", () => {
    const stubTimeProvider = new FakeTimeProvider();
    stubTimeProvider.fakeDay = DaysOfWeek.SUNDAY;
    const verifier = new PasswordVerifier([], stubTimeProvider);

    expect(() => verifier.verify("anything")).toThrow("It's the weekend!");
  });
});
