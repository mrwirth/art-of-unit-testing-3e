import { describe, test } from "vitest";
import type { MaintenanceWindow } from "./maintenance-window.ts";
import { PasswordVerifier3 } from "./00-password-verifier3.ts";
import type { IComplicatedLogger } from "../02-longinterfaces-faking/interfaces/complicated-logger.ts";
import { Substitute } from "@fluffy-spoon/substitute";

const makeVerifierWithNoRules = (
  log: IComplicatedLogger,
  maintenanceWindow: MaintenanceWindow,
) => new PasswordVerifier3([], log, maintenanceWindow);

describe("working with substitute part 2", () => {
  test("verify, during maintenance, calls logger", () => {
    const stubMaintenanceWindow = Substitute.for<MaintenanceWindow>();
    stubMaintenanceWindow.isUnderMaintenance().returns(true);

    const mockLogger = Substitute.for<IComplicatedLogger>();
    const verifier = makeVerifierWithNoRules(mockLogger, stubMaintenanceWindow);

    verifier.verify("anything");

    mockLogger.received().info("Under Maintenance", "verify");
  });

  test("verify, outside maintenance, calls logger", () => {
    const stubMaintenanceWindow = Substitute.for<MaintenanceWindow>();
    stubMaintenanceWindow.isUnderMaintenance().returns(false);

    const mockLogger = Substitute.for<IComplicatedLogger>();
    const verifier = makeVerifierWithNoRules(mockLogger, stubMaintenanceWindow);

    verifier.verify("anything");

    mockLogger.received().info("PASSED", "verify");
  });
});
