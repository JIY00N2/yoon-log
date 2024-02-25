export default function generateFilteredSlug(slug: string) {
  return slug
    .replace(/[^a-zA-Z\s]/g, "")
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, "-");
}
