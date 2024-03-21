export function slugify(text: string): string {
  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // Replace spaces with -
      .replace(/\s+/g, "-")
      // Remove all non-word chars
      .replace(/[^\w\-]+/g, "")
      // Replace multiple - with single -
      .replace(/\-\-+/g, "-")
      // Trim - from start of text
      .replace(/^-+/, "")
      // Trim - from end of text
      .replace(/-+$/, "")
  );
}
