import { info, debug } from "./complicated-logger.js";
import { getLogLevel } from "./configuration-service.js";

const log = (text) => {
  const level = getLogLevel();
  switch (level) {
    case "info":
      info(text);
      break;
    case "debug":
      debug(text);
      break;
    default:
      info(text);
      break;
  }
};

export const verifyPassword = (input, rules) => {
  const failed = rules
    .map((rule) => rule(input))
    .filter((result) => result === false);

  if (failed.length === 0) {
    log("PASSED");
    return true;
  }

  log("FAIL");
  return false;
};
