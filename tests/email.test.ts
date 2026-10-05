import { describe, expect, it } from "vitest";
import { isValidEmailAddress } from "@/lib/email";

describe("isValidEmailAddress", () => {
  it.each([
    "admin@example.com",
    "admin+recovery@example.co.uk",
    "first.last@example-domain.org",
  ])("accepts a well-formed email address: %s", (email) => {
    expect(isValidEmailAddress(email)).toBe(true);
  });

  it.each([
    "admin",
    "admin@localhost",
    "admin@@example.com",
    ".admin@example.com",
    "admin..user@example.com",
    "admin@example..com",
    "admin@example.c",
    `${"a".repeat(65)}@example.com`,
    `${"a".repeat(245)}@example.com`,
  ])("rejects a malformed email address: %s", (email) => {
    expect(isValidEmailAddress(email)).toBe(false);
  });
});
