import { useHeader } from "@/hooks/useHeader";
import HeaderLogged from "./HeaderLogged";
import HeaderUnLogged from "./HeaderUnLogged";

const styles = {
  nav: "w-fit flex flex-row justify-center",
  ul: "flex flex-row justify-between gap-x-4 md:gap-x-8 items-center h-fit w-fit",
};

export default function HeaderNav() {
  const { handleLogout, isLogged } = useHeader();
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {isLogged ? (
          <HeaderLogged handleLogout={handleLogout} />
        ) : (
          <HeaderUnLogged />
        )}
      </ul>
    </nav>
  );
}
