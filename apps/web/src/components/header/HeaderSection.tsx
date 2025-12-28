import { buttonData } from "@/data/button.data";
import type { HeaderSectionProps } from "@/types/props/HeaderSectionProps";
import { Link } from "@tanstack/react-router";

const styles = {
  div: "header-section text-primary",
  h1: "text-2xl",
  p: "text-xs",
  em: "text-blue-500",
};

export default function HeaderSection({
  title,
  text,
  linkTo,
}: HeaderSectionProps) {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>{title}</h1>
      <p className={styles.p}>
        {text}{" "}
        <em className={styles.em}>
          <Link to={linkTo}>{buttonData.linkHere}</Link>
        </em>
        .
      </p>
    </div>
  );
}
