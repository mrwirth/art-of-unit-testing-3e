import { describe, expect, test } from "vitest";
import * as samples from "./fetching-samples-callback.js";

describe("Website alive checking", () => {
  test("content matches, returns true", async () => {
    const result = await new Promise((resolve) => {
      samples.processFetchSuccess("Example Domain", resolve);
    });

    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
  });

  test("website content does not match, returns false", async () => {
    const result = await new Promise((resolve) => {
      samples.processFetchSuccess("bad content", resolve);
    });

    expect(result.success).toBe(false);
    expect(result.status).toBe("missing text");
  });

  test("When fetch fails, returns false", async () => {
    const result = await new Promise((resolve) => {
      samples.processFetchError("error text", resolve);
    });

    expect(result.success).toBe(false);
    expect(result.status).toBe("error text");
  });
});
