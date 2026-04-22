import { expect, test } from "vitest";
import * as samples from "./fetching-samples-callback.js";

test("NETWORK REQUIRED (callback): correct content, true", async () => {
  const result = await new Promise((resolve) => {
    samples.isWebsiteAlive(resolve);
  });

  expect(result.success).toBe(true);
  expect(result.status).toBe("ok");
});
