export default function generateSlug(title: string) {
  let slug = title
    .replaceAll(/[^\w\s\uAC00-\uD7A3]/gu, "")
    .replaceAll(/\s+/g, "-")
    .toLocaleLowerCase()
    .trim();
  if (slug.endsWith("-")) {
    slug.slice(0, -1);
  }
  return slug;
}
