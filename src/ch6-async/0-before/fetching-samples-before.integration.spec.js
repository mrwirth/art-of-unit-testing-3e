import { expect, test } from "vitest";
import * as samples from "./fetching-samples-before.js";

test("NETWORK REQUIRED (callback): correct content, true", async () => {
  const result = await new Promise((resolve) => {
    samples.isWebsiteAliveWithCallback(resolve);
  });

  expect(result.success).toBe(true);
  expect(result.status).toBe("ok");
});

test("NETWORK REQUIRED (await): correct content, true", async () => {
  const result = await samples.isWebsiteAliveWithAsyncAwait();
  expect(result.success).toBe(true);
  expect(result.status).toBe("ok");
});
