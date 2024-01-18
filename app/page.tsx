import stylex from "@stylexjs/stylex";

export default function Home() {
  return (
    <main>
      <div {...stylex.props(styles.first)}>why</div>
    </main>
  );
}

const styles = stylex.create({
  first: {
    color: "red",
    backgroundColor: "blue",
  },
  second: {
    backgroundColor: "skyblue",
  },
});
