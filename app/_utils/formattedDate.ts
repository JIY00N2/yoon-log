export default function formattedDate(date: NativeDate) {
  const gmtPlus9h = new Date(
    Number(new Date(date)) + 1000 * 60 * 60 * 9,
  ).toISOString();
  return gmtPlus9h.split("T")[0];
}
