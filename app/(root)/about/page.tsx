import Container from "@/app/(root)/about/Container";
import Experience from "@/app/(root)/about/Experience";
import Introduce from "@/app/(root)/about/Introduce";
import Projects from "@/app/(root)/about/Projects";
import Skills from "@/app/(root)/about/Skiils";
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
