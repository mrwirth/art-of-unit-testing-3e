import * as stubConfig from "./configuration-service.js";
import * as mockLogger from "./complicated-logger.js";
import { verifyPassword } from "./password-verifier.js";

vi.mock("./complicated-logger.js");
vi.mock("./configuration-service.js");

describe("password verifier", () => {
  afterEach(vi.clearAllMocks);

  test("with info log level and no rules, it calls the logger with PASSED", () => {
    vi.mocked(stubConfig.getLogLevel).mockReturnValue("info");

    verifyPassword("anything", []);

    expect(mockLogger.info).toHaveBeenCalledWith(expect.stringMatching(/PASS/));
  });

  test("with debug log level and no rules, it calls the logger with PASSED", () => {
    vi.mocked(stubConfig.getLogLevel).mockReturnValue("debug");

    verifyPassword("anything", []);

    expect(mockLogger.debug).toHaveBeenCalledWith(
      expect.stringMatching(/PASS/),
    );
  });
});
