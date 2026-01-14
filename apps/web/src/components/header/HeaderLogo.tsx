import { PATH } from "@/utils/path";
import { Link } from "@tanstack/react-router";
import { stylesLogo } from "./styles.logo";

const style = {
  p: "text-3xl w-fit",
};

export default function HeaderLogo() {
  return (
    <p className={style.p}>
      <Link className={stylesLogo.main} to={PATH.HOME}>
        Task<span className={stylesLogo.span}>Ly</span>
      </Link>
    </p>
  );
}
