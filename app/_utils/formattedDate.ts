export default function formattedDate(date: NativeDate) {
  return date.toISOString().split("T")[0];
}
