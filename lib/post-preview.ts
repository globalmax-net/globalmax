const allowedTags = new Set([
  "A",
  "B",
  "BLOCKQUOTE",
  "BR",
  "CODE",
  "DD",
  "DIV",
  "DL",
  "DT",
  "EM",
  "FIGCAPTION",
  "FIGURE",
  "H1",
  "H2",
  "H3",
  "H4",
  "HR",
  "I",
  "IMG",
  "LI",
  "MARK",
  "OL",
  "P",
  "PRE",
  "S",
  "SPAN",
  "STRONG",
  "SUB",
  "SUP",
  "TABLE",
  "TBODY",
  "TD",
  "TH",
  "THEAD",
  "TR",
  "U",
  "UL",
]);

const removedTags = new Set(["IFRAME", "MATH", "OBJECT", "SCRIPT", "STYLE", "SVG"]);
const safeColorPattern = /^(?:#[\da-f]{3,8}|rgb\(\s*[\d\s,%]+\))$/i;

export function sanitizePostPreview(html: string): string {
  const source = new DOMParser().parseFromString(html, "text/html");
  const result = source.createElement("div");

  const cleanNode = (node: Node): Node[] => {
    if (node.nodeType === Node.TEXT_NODE) {
      return [source.createTextNode(node.textContent ?? "")];
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return [];

    const element = node as Element;
    if (removedTags.has(element.tagName)) return [];

    if (!allowedTags.has(element.tagName)) {
      return Array.from(element.childNodes).flatMap(cleanNode);
    }

    const cleanElement = source.createElement(element.tagName.toLowerCase());
    const allowedAttributes =
      element.tagName === "A"
        ? ["href", "title"]
        : element.tagName === "IMG"
          ? ["alt", "height", "title", "width"]
          : ["colspan", "rowspan", "start"];

    for (const attribute of allowedAttributes) {
      const value = element.getAttribute(attribute);
      if (value === null) continue;

      if (attribute === "href") {
        try {
          const url = new URL(value, source.baseURI);
          if (["http:", "https:", "mailto:"].includes(url.protocol)) {
            cleanElement.setAttribute(attribute, value);
          }
        } catch {
          continue;
        }
      } else if (
        element.tagName === "IMG" &&
        attribute === "src"
      ) {
        try {
          const url = new URL(value, source.baseURI);
          if (["http:", "https:"].includes(url.protocol)) {
            cleanElement.setAttribute(attribute, value);
          }
        } catch {
          continue;
        }
      } else {
        cleanElement.setAttribute(attribute, value);
      }
    }

    if (element.tagName === "IMG") {
      const src = element.getAttribute("src");
      if (src) {
        try {
          const url = new URL(src, source.baseURI);
          if (["http:", "https:"].includes(url.protocol)) {
            cleanElement.setAttribute("src", src);
          }
        } catch {
          // Invalid image URLs are omitted from the preview.
        }
      }
    }

    if (element.tagName === "SPAN") {
      const style = (element as HTMLElement).style;
      for (const property of ["color", "backgroundColor"] as const) {
        const value = style[property];
        if (value && safeColorPattern.test(value)) {
          cleanElement.style[property] = value;
        }
      }
    }

    for (const child of Array.from(element.childNodes)) {
      for (const cleanChild of cleanNode(child)) {
        cleanElement.appendChild(cleanChild);
      }
    }

    return [cleanElement];
  };

  for (const child of Array.from(source.body.childNodes)) {
    for (const cleanChild of cleanNode(child)) {
      result.appendChild(cleanChild);
    }
  }

  return result.innerHTML;
}
