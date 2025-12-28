import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { PATH } from "@/utils/path";
import { buttonData } from "@/data/button.data";

type HandleLogoutType = {
  handleLogout: () => Promise<void>;
};

export default function ButtonGroupLogged({ handleLogout }: HandleLogoutType) {
  return (
    <>
      <Button asChild size="lg" variant="default">
        <Link to={PATH.DASHBOARD}>{buttonData.getTasks}</Link>
      </Button>
      <Button variant="outline" size="lg" onClick={handleLogout}>
        {buttonData.logoutButton}
      </Button>
    </>
  );
}
