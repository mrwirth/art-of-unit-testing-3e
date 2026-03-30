import * as configs from "./app-config.json";

const getLogLevel = () => {
  return configs.logLevel;
};

export { getLogLevel };
