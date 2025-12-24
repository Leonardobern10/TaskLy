import { PATH } from "@/utils/path";
import NavBarListItem from "./NavBarListItem";

export default function HeaderUnLogged() {
  return (
    <>
      <NavBarListItem name="Login" path={PATH.LOGIN} />
      <NavBarListItem name="Cadastro" path={PATH.REGISTER} />
    </>
  );
}
