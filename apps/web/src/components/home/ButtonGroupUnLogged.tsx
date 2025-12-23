import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function ButtonGroupUnLogged() {
  return (
    <>
      <Button asChild variant="outline" size="lg">
        <Link to="/auth/login">Login</Link>
      </Button>

      <Button asChild variant="outline" size="lg">
        <Link to="/auth/register">Criar Conta</Link>
      </Button>
    </>
  );
}
