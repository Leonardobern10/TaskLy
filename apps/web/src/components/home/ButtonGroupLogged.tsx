import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { PATH } from "@/utils/path";
import { buttonData } from "@/data/button.data";
import { homeStyles } from "./home.styles";

type HandleLogoutProps = {
  handleLogout: () => Promise<void>;
};

export default function ButtonGroupLogged({ handleLogout }: HandleLogoutProps) {
  return (
    <>
      <Button
        className={homeStyles.buttonHome}
        asChild
        size="lg"
        variant="default"
      >
        <Link to={PATH.DASHBOARD}>{buttonData.getTasks}</Link>
      </Button>
      <Button
        className={homeStyles.buttonHome}
        variant="outline"
        size="lg"
        onClick={handleLogout}
      >
        {buttonData.logoutButton}
      </Button>
    </>
  );
}
