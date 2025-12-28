import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { PATH } from "@/utils/path";
import { buttonData } from "@/data/button.data";

export default function ButtonGroupLogged({
  handleLogout,
}: {
  handleLogout: () => Promise<void>;
}) {
  return (
    <>
      <Button asChild size="lg" variant="default">
        <Link to={PATH.TASKS}>{buttonData.getTasks}</Link>
      </Button>
      <Button variant="outline" size="lg" onClick={handleLogout}>
        {buttonData.logoutButton}
      </Button>
    </>
  );
}
