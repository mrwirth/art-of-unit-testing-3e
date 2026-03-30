// impossible to fake with traditional injection techniques
import * as log from "./complicated-logger.js";

const verifyPassword = (input, rules) => {
  const failed = rules
    .map((rule) => rule(input))
    .filter((result) => result === false);
  if (failed.length === 0) {
    // impossible to test with traditional injection techniques
    log.info("PASSED");
    return true;
  }
  // impossible to test with traditional injection techniques
  log.info("FAIL");
  return false;
};

// Pass logger as parameter
const verifyPassword2 = (input, rules, logger) => {
  const failed = rules
    .map((rule) => rule(input))
    .filter((result) => result === false);
  if (failed.length === 0) {
    // impossible to test with traditional injection techniques
    logger.info("PASSED");
    return true;
  }
  // impossible to test with traditional injection techniques
  logger.info("FAIL");
  return false;
};

export { verifyPassword, verifyPassword2 };
