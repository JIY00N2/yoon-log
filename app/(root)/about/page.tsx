import Container from "@/app/_components/AboutComponent/Container";
import Experience from "@/app/_components/AboutComponent/Experience";
import Introduce from "@/app/_components/AboutComponent/Introduce";
import Projects from "@/app/_components/AboutComponent/Projects";
import Skills from "@/app/_components/AboutComponent/Skiils";
import stylex from "@stylexjs/stylex";

export default function AboutPage() {
  return (
    <div {...stylex.props(styles.layout)}>
      <Container title={"Introduce"}>
        <Introduce />
      </Container>
      <Container title={"Skills"}>
        <Skills />
      </Container>
      <Container title={"Projects"}>
        <Projects />
      </Container>
      <Container title={"Experience"}>
        <Experience />
      </Container>
    </div>
  );
}

const styles = stylex.create({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "768px",
    paddingHorizontal: "1rem",
    paddingVertical: "2rem",
    gap: "2rem",
  },
});
