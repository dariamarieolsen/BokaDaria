export function setDocumentTitle(title: string) {
  if (typeof document !== "undefined") {
    document.title = title;
  }
}

export function setMetaDescription(content: string) {
  if (typeof document === "undefined") return;
  let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = content;
}
