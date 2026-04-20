import dayjs from "dayjs";
import { DaysOfWeek } from "../DaysOfWeek.js";

const verifyPassword = () => {
  const dayOfWeek = dayjs().day();
  if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(dayOfWeek)) {
    throw Error("It's the weekend!");
  }
  // more code goes here
  // return list of errors found...
  return [];
};

const verifyPassword2 = (input, rules, currentDay) => {
  if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(currentDay)) {
    throw Error("It's the weekend!");
  }
  // more code goes here
  // return list of errors found...
  return [];
};

const verifyPassword3 = (input, rules, getDayFn) => {
  const dayOfWeek = getDayFn();
  if ([DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].includes(dayOfWeek)) {
    throw Error("It's the weekend!");
  }
  // more code goes here
  // return list of errors found...
  return [];
};

export { verifyPassword, verifyPassword2, verifyPassword3 };
