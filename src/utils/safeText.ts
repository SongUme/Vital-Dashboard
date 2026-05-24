export function safeText(value: any): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(safeText).filter(Boolean).join(", ");
  if (typeof value === "object") {
    return String(value.name ?? value.keyword ?? value.category ?? value.label ?? value.title ?? value.content ?? value.review_text ?? "");
  }
  return String(value);
}
