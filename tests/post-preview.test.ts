import { describe, expect, it } from "vitest";
import { sanitizePostPreview } from "@/lib/post-preview";

describe("sanitizePostPreview", () => {
  it("preserves the supported formatting in preview content", () => {
    expect(
      sanitizePostPreview(
        '<h2>Heading</h2><p>Text <strong>bold</strong> <span style="background-color: rgb(254, 240, 138)">highlighted</span></p><ul><li>Item</li></ul>'
      )
    ).toContain("<h2>Heading</h2>");
    expect(sanitizePostPreview("<p>Text <strong>bold</strong></p>")).toContain(
      "<strong>bold</strong>"
    );
    expect(sanitizePostPreview("<ul><li>Item</li></ul>")).toContain(
      "<ul><li>Item</li></ul>"
    );
  });

  it("removes scripts, event handlers, and unsafe links", () => {
    expect(
      sanitizePostPreview(
        '<p onclick="alert(1)">Safe<script>alert(1)</script><a href="javascript:alert(1)">link</a></p>'
      )
    ).toBe("<p>Safe<a>link</a></p>");
  });
});
