import { describe, expect, it } from "vitest";
import {
  getPostExcerpt,
  getPostPlainText,
  getPostReadingTime,
} from "@/lib/post-display";

describe("post display helpers", () => {
  it("extracts readable text without HTML and decodes common entities", () => {
    expect(getPostPlainText("<p>Helpful &amp; safe&nbsp;guidance</p>")).toBe(
      "Helpful & safe guidance"
    );
  });

  it("uses the saved excerpt, or creates a shortened one from article content", () => {
    expect(getPostExcerpt("  Saved summary  ", "<p>Article body</p>")).toBe("Saved summary");
    expect(getPostExcerpt("", `<p>${"word ".repeat(50)}</p>`)).toHaveLength(180);
  });

  it("estimates article reading time from plain words", () => {
    expect(getPostReadingTime("<p>One short article.</p>")).toBe("1 min read");
    expect(getPostReadingTime(`<p>${"word ".repeat(221)}</p>`)).toBe("2 min read");
  });
});
