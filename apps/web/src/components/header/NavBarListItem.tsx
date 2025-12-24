import type { NavBarListItemProps } from "@/types/props/NavBarListItemProps";
import { Link } from "@tanstack/react-router";

const styles = {
  link: "text-md font-light text-secondary",
};

export default function NavBarListItem({ name, path }: NavBarListItemProps) {
  return (
    <li>
      <Link className={styles.link} to={path}>
        {name}
      </Link>
    </li>
  );
}
