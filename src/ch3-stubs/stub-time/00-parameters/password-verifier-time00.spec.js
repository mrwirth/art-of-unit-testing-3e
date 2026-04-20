// Using dayjs as moment is deprecated, apparently with good reason.
import { describe, expect, test } from "vitest";
import dayjs from "dayjs";
import {
  verifyPassword,
  verifyPassword2,
  verifyPassword3,
} from "./password-verifier-time00.js";
import { DaysOfWeek } from "../DaysOfWeek.js";

describe("verifier", () => {
  const TODAY = dayjs().day();

  // test is always executed, but might not do anything.
  test("on weekends, throws exceptions", () => {
    if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(TODAY)) {
      expect(() => verifyPassword("anything", [])).toThrow("It's the weekend!");
    }
  });
  // test is not executed on weekdays at all
  if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(TODAY)) {
    test("on a weekend, throws an error", () => {
      expect(() => verifyPassword("anything", [])).toThrow("It's the weekend!");
    });
  }
});

// Pass the day into the function instead of having it
// figure out the day itself - a "dummy"/"dummy object".
describe("verifier2 - dummy object", () => {
  test("on weekends, throws exceptions", () => {
    expect(() => verifyPassword2("anything", [], DaysOfWeek.SUNDAY)).toThrow(
      "It's the weekend!",
    );
  });
});

// Use a dummy function instead of a dummy object.
describe("verifier3 - dummy function", () => {
  test("on weekends, throws exceptions", () => {
    const alwaysSunday = () => DaysOfWeek.SUNDAY;
    expect(() => verifyPassword3("anything", [], alwaysSunday)).toThrow(
      "It's the weekend!",
    );
  });
  test("on weekdays, works fine", () => {
    const alwaysMonday = () => DaysOfWeek.MONDAY;

    const result = verifyPassword3("anything", [], alwaysMonday);
    expect(result.length).toBe(0);
  });
});
