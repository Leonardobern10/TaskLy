import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { PATH } from "@/utils/path";
import { buttonData } from "@/data/button.data";

export default function ButtonGroupUnLogged() {
  return (
    <>
      <Button className="md:text-lg" asChild variant="default" size="lg">
        <Link to={PATH.LOGIN}>{buttonData.login}</Link>
      </Button>

      <Button className="md:text-lg" asChild variant="outline" size="lg">
        <Link to={PATH.REGISTER}>{buttonData.register}</Link>
      </Button>
    </>
  );
}
