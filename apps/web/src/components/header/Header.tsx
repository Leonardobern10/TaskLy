import { Link } from "@tanstack/react-router";
import NavBarListItem from "./NavBarListItem";
import { Button } from "../ui/button";
import { useHeader } from "@/hooks/useHeader";

export default function Header() {
  const { handleLogout, isLogged } = useHeader();
  return (
    <header className="w-full flex justify-between items-center px-6 md:px-40 py-4 bg-foreground/80">
      <p className="text-xl text-secondary w-fit">
        <Link to="/">TaskLy</Link>
      </p>
      <nav className="w-fit flex flex-row justify-center ">
        <ul className="flex flex-row justify-between gap-x-4 md:gap-x-8 items-center h-fit w-fit">
          {isLogged ? (
            <>
              <NavBarListItem name="Tasks" path="/tasks/dashboard" />
              <Button onClick={handleLogout}>Sair</Button>
            </>
          ) : (
            <>
              <NavBarListItem name="Login" path="/auth/login" />
              <NavBarListItem name="Cadastro" path="/auth/register" />
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
