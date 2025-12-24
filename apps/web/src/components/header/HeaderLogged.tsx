import { PATH } from "@/utils/path";
import { Button } from "../ui/button";
import NavBarListItem from "./NavBarListItem";

export default function HeaderLogged({
  handleLogout,
}: {
  handleLogout: () => Promise<void>;
}) {
  return (
    <>
      <NavBarListItem name="Tasks" path={PATH.DASHBOARD} />
      <Button onClick={handleLogout}>Sair</Button>
    </>
  );
}
