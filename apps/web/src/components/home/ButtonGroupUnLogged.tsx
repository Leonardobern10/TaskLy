import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { PATH } from "@/utils/path";

export default function ButtonGroupUnLogged() {
  return (
    <>
      <Button asChild variant="outline" size="lg">
        <Link to={PATH.LOGIN}>Login</Link>
      </Button>

      <Button asChild variant="outline" size="lg">
        <Link to={PATH.REGISTER}>Criar Conta</Link>
      </Button>
    </>
  );
}
