import { PATH } from "@/utils/path";
import { Button } from "../ui/button";
import NavBarListItem from "./NavBarListItem";
import { buttonData } from "@/data/button.data";

type HeaderLoggedProps = {
  handleLogout: () => Promise<void>;
};

export default function HeaderLogged({ handleLogout }: HeaderLoggedProps) {
  return (
    <>
      <NavBarListItem name="Tasks" path={PATH.DASHBOARD} />
      <Button variant="outline" onClick={handleLogout}>
        {buttonData.logoutButton}
      </Button>
    </>
  );
}
