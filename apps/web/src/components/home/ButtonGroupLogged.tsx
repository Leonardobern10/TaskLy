import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { PATH } from "@/utils/path";

export default function ButtonGroupLogged({
  handleLogout,
}: {
  handleLogout: () => Promise<void>;
}) {
  return (
    <>
      <Button asChild size="lg" variant="default">
        <Link to={PATH.TASKS}>Acessar Tarefas</Link>
      </Button>
      <Button variant="outline" size="lg" onClick={handleLogout}>
        Sair
      </Button>
    </>
  );
}
