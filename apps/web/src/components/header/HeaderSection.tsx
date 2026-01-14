import { buttonData } from "@/data/button.data";
import type { HeaderSectionProps } from "@/types/props/HeaderSectionProps";
import { Link } from "@tanstack/react-router";

const styles = {
  div: "header-section text-primary",
  p: "text-sm md:text-lg text-center",
  em: "text-purple",
};

export default function HeaderSection({
  title,
  text,
  linkTo,
}: HeaderSectionProps) {
  return (
    <div className={styles.div}>
      <h2>{title}</h2>
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
