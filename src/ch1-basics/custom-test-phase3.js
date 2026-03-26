import { sum, totalSoFar } from "./number-parser2.js";

/**
 * Helper function to assert actual and expected are the same using `===`.
 * @param expected (any)
 * @param actual (any)
 */
const assertEquals = (expected, actual) => {
  if (actual !== expected) {
    throw new Error(
      `Expected ${JSON.stringify(expected)} but was ${JSON.stringify(actual)}`,
    );
  }
};

/**
 * Helper function to conduct the test and report results.
 * @param {string} name
 * @param {function} implementation
 */
const check = (name, implementation) => {
  try {
    implementation();
    console.log(`${name} passed`);
  } catch (e) {
    console.error(`${name} FAILED`, e.stack);
  }
};

/**
 * The tests to run.
 */
check("totalSoFar is 0 by default", () => {
  assertEquals(0, totalSoFar());
});

check("totalSoFar increases after summing", () => {
  sum("1,2");
  sum("1,2");
  assertEquals(6, totalSoFar());
});
