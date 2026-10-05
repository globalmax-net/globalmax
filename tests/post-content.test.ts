import { describe, expect, it } from "vitest";
import { sanitizePostContent } from "@/lib/post-content";

describe("sanitizePostContent", () => {
  it("preserves formatted paragraphs and line breaks", () => {
    expect(
      sanitizePostContent(
        "<p>First <strong>important</strong> paragraph.</p><p>Second<br>line.</p>"
      )
    ).toBe("<p>First <strong>important</strong> paragraph.</p><p>Second<br />line.</p>");
  });

  it("removes scripts, event handlers, and unsafe links", () => {
    expect(
      sanitizePostContent(
        '<p onclick="alert(1)">Safe <script>alert(1)</script>text <a href="javascript:alert(1)">link</a></p>'
      )
    ).toBe('<p>Safe text <a>link</a></p>');
  });

  it("allows safe highlight colors", () => {
    expect(sanitizePostContent('<span style="background-color:#fef08a">Highlighted</span>')).toBe(
      '<span style="background-color:#fef08a">Highlighted</span>'
    );
  });
});
