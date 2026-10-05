import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PostEditorForm from "@/components/PostEditorForm";

const { router } = vi.hoisted(() => ({
  router: { push: vi.fn(), refresh: vi.fn() },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => router,
}));

const initialData = {
  title: "Existing post",
  category: "Updates",
  content: "<p>Original <strong>formatted</strong> content.</p>",
  thumbnail: "https://example.com/cover.jpg",
  extraImages: [],
  excerpt: "Short description.",
  tags: ["News", "Update"],
  slug: "existing-post",
  status: "published" as const,
  featured: true,
  theme: "ocean" as const,
  contentWidth: "standard" as const,
  fontSize: "medium" as const,
  paragraphSpacing: "comfortable" as const,
  lineHeight: "comfortable" as const,
  fontFamily: "sans" as const,
};

describe("PostEditorForm", () => {
  beforeEach(() => {
    router.push.mockClear();
    router.refresh.mockClear();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("loads and saves formatted content when editing a post", async () => {
    render(<PostEditorForm postId="post-123" initialData={initialData} />);

    const editor = screen.getByRole("textbox", { name: "Post Content" });
    expect(editor.innerHTML).toBe(initialData.content);

    editor.innerHTML = "<p>First paragraph.</p><p>Important <strong>words</strong>.</p>";
    fireEvent.submit(screen.getByRole("button", { name: "Save Changes" }).closest("form")!);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const [, request] = vi.mocked(fetch).mock.calls[0];
    expect(request?.method).toBe("PUT");
    expect(JSON.parse(String(request?.body))).toMatchObject({
      content: "<p>First paragraph.</p><p>Important <strong>words</strong>.</p>",
      thumbnail: initialData.thumbnail,
      excerpt: initialData.excerpt,
      tags: initialData.tags,
      slug: initialData.slug,
      status: initialData.status,
      featured: initialData.featured,
    });
    expect(router.push).toHaveBeenCalledWith(
      "/admin/posts?message=Post%20updated%20successfully."
    );
    expect(router.refresh).toHaveBeenCalledOnce();
  });

  it("requires content before saving", async () => {
    render(<PostEditorForm postId="post-123" initialData={initialData} />);

    const editor = screen.getByRole("textbox", { name: "Post Content" });
    editor.innerHTML = "<p><br></p>";
    fireEvent.submit(screen.getByRole("button", { name: "Save Changes" }).closest("form")!);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Write some post content before publishing."
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("shows the initial word count for an existing post", () => {
    render(<PostEditorForm postId="post-123" initialData={initialData} />);

    expect(screen.getByText("3", { selector: "strong" })).toBeInTheDocument();
  });

  it("opens a sanitized content preview", () => {
    render(<PostEditorForm postId="post-123" initialData={initialData} />);

    const editor = screen.getByRole("textbox", { name: "Post Content" });
    editor.innerHTML = '<p onclick="alert(1)">Preview <strong>content</strong></p>';
    fireEvent.click(screen.getByRole("button", { name: "Preview Post" }));

    const previewModal = screen.getByText("Post Preview").closest(".fixed");
    expect(previewModal).not.toBeNull();
    expect(within(previewModal as HTMLElement).getByText("Preview")).toBeInTheDocument();
    expect(
      within(previewModal as HTMLElement).getByText("content", { selector: "strong" })
    ).toBeInTheDocument();
    expect(
      within(previewModal as HTMLElement).getByText("Preview").closest("p")
    ).not.toHaveAttribute("onclick");
  });

  it.each([
    ["Bold", "bold", undefined],
    ["Italic", "italic", undefined],
    ["Underline", "underline", undefined],
    ["Highlight", "hiliteColor", "#fef08a"],
    ["Heading 2", "formatBlock", "<h2>"],
    ["Heading 3", "formatBlock", "<h3>"],
    ["Paragraph", "formatBlock", "<p>"],
    ["Bulleted list", "insertUnorderedList", undefined],
    ["Numbered list", "insertOrderedList", undefined],
    ["Quote", "formatBlock", "<blockquote>"],
    ["Clear", "removeFormat", undefined],
  ])("runs the correct command for %s", (label, command, value) => {
    const execCommand = vi.fn();
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommand,
    });

    render(<PostEditorForm postId="post-123" initialData={initialData} />);

    fireEvent.click(screen.getByRole("button", { name: label }));
    expect(execCommand).toHaveBeenCalledWith(command, false, value);
  });

  it("restores the selected text before applying block formatting", () => {
    let selectedText = "";
    const execCommand = vi.fn(() => {
      selectedText = window.getSelection()?.toString() ?? "";
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommand,
    });

    render(<PostEditorForm postId="post-123" initialData={initialData} />);

    const editor = screen.getByRole("textbox", { name: "Post Content" });
    const textNode = editor.querySelector("strong")?.firstChild;
    expect(textNode).not.toBeNull();
    const range = document.createRange();
    range.setStart(textNode!, 0);
    range.setEnd(textNode!, textNode!.textContent!.length);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    fireEvent.mouseUp(editor);
    window.getSelection()?.removeAllRanges();

    fireEvent.click(screen.getByRole("button", { name: "Heading 2" }));

    expect(execCommand).toHaveBeenCalledWith("formatBlock", false, "<h2>");
    expect(selectedText).toBe("formatted");
  });

  it.each(["https://example.com/article", "mailto:editor@example.com"])(
    "inserts a valid link: %s",
    (url) => {
      const execCommand = vi.fn();
      Object.defineProperty(document, "execCommand", {
        configurable: true,
        value: execCommand,
      });
      vi.spyOn(window, "prompt").mockReturnValue(url);

      render(<PostEditorForm postId="post-123" initialData={initialData} />);

      fireEvent.click(screen.getByRole("button", { name: "Link" }));

      expect(execCommand).toHaveBeenCalledWith("createLink", false, url);
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    }
  );

  it("rejects unsupported links without running a formatting command", () => {
    const execCommand = vi.fn();
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommand,
    });
    vi.spyOn(window, "prompt").mockReturnValue("javascript:alert(1)");

    render(<PostEditorForm postId="post-123" initialData={initialData} />);

    fireEvent.click(screen.getByRole("button", { name: "Link" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a valid web address or email link."
    );
    expect(execCommand).not.toHaveBeenCalled();
  });

  it("does nothing when link entry is cancelled", () => {
    const execCommand = vi.fn();
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommand,
    });
    vi.spyOn(window, "prompt").mockReturnValue(null);

    render(<PostEditorForm postId="post-123" initialData={initialData} />);

    fireEvent.click(screen.getByRole("button", { name: "Link" }));
    expect(execCommand).not.toHaveBeenCalled();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
