import { PATH } from "@/utils/path";
import { Link } from "@tanstack/react-router";

const style = {
  p: "text-xl text-secondary w-fit",
};

export default function HeaderLogo() {
  return (
    <p className={style.p}>
      <Link to={PATH.HOME}>TaskLy</Link>
    </p>
  );
}
