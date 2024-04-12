export default function generateBackgroundColor(date: NativeDate) {
  const dateLastNumber = date.toISOString().slice(-2, -1); // 0~9
  const color: Record<string, string> = {
    0: "var(--gbbg100)",
    1: "var(--gbbg100)",
    2: "var(--gbbg200)",
    3: "var(--gbbg200)",
    4: "var(--gbbg300)",
    5: "var(--gbbg300)",
    6: "var(--gbbg400)",
    7: "var(--gbbg400)",
    8: "var(--gbbg500)",
    9: "var(--gbbg500)",
  };
  return color[dateLastNumber];
}
