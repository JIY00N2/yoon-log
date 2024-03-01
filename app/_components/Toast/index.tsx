import stylex from "@stylexjs/stylex";
import Image from "next/image";

export function Success({ message }: { message: string }) {
  return (
    <div {...stylex.props(styles.default)}>
      <div {...stylex.props(styles.success)}>
        <Image
          src={"/images/success.svg"}
          alt="success"
          width={20}
          height={20}
        />
      </div>
      <span>{message}</span>
    </div>
  );
}

export function Error({ message }: { message: string }) {
  return (
    <div {...stylex.props(styles.default)}>
      <div {...stylex.props(styles.error)}>
        <Image
          src={"/images/error.svg"}
          alt="error"
          width={20}
          height={20}
        />
      </div>
      <span>{message}</span>
    </div>
  );
}

const styles = stylex.create({
  default: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  success: {
    display: "flex",
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "#35dd65",
    borderRadius: "50%",
  },
  error: {
    display: "flex",
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "#fa4d47",
    borderRadius: "50%",
  },
});
