// Using dayjs as moment is deprecated, apparently with good reason.
import dayjs from "dayjs";
import {
  verifyPassword,
  verifyPassword2,
  verifyPassword3,
} from "./password-verifier-time00.js";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

describe("verifier", () => {
  const TODAY = dayjs().day();

  // test is always executed, but might not do anything.
  test("on weekends, throws exceptions", () => {
    if ([SATURDAY, SUNDAY].includes(TODAY)) {
      expect(() => verifyPassword("anything", [])).toThrow("It's the weekend!");
    }
  });
  // test is not executed on weekdays at all
  if ([SATURDAY, MONDAY].includes(TODAY)) {
    test("on a weekend, throws an error", () => {
      expect(() => verifyPassword("anything", [])).toThrow("It's the weekend!");
    });
  }
});

// Pass the day into the function instead of having it
// figure out the day itself - a "dummy"/"dummy object".
describe("verifier2 - dummy object", () => {
  test("on weekends, throws exceptions", () => {
    expect(() => verifyPassword2("anything", [], SUNDAY)).toThrow(
      "It's the weekend!",
    );
  });
});

// Use a dummy function instead of a dummy object.
describe("verifier3 - dummy function", () => {
  test("on weekends, throws exceptions", () => {
    const alwaysSunday = () => SUNDAY;
    expect(() => verifyPassword3("anything", [], alwaysSunday)).toThrow(
      "It's the weekend!",
    );
  });
});
