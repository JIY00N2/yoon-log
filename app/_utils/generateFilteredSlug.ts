export default function generateFilteredSlug(slug: string) {
  return slug
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, "-");
}
