import sanitizeHtml from "sanitize-html";

export function getPostPlainText(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPostReadingTime(content: string): string {
  const words = getPostPlainText(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

export function getPostExcerpt(excerpt: string | undefined, content: string): string {
  const savedExcerpt = excerpt?.trim();
  if (savedExcerpt) return savedExcerpt;

  const plainText = getPostPlainText(content);
  if (plainText.length <= 180) return plainText;
  return `${plainText.slice(0, 177).trimEnd()}...`;
}
