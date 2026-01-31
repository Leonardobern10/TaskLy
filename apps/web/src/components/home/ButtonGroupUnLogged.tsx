import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { PATH } from "@/utils/path";
import { buttonData } from "@/data/button.data";

const styles = {
  button: "button-header",
};

const buttonProps = (
  variant: "default" | "outline",
): {
  className: string;
  asChild: boolean;
  variant: "default" | "outline";
  size: "lg";
} => ({
  className: styles.button,
  asChild: true,
  variant: variant,
  size: "lg",
});

export default function ButtonGroupUnLogged() {
  return (
    <>
      <Button {...buttonProps("default")}>
        <Link to={PATH.LOGIN}>{buttonData.login}</Link>
      </Button>

      <Button {...buttonProps("outline")}>
        <Link to={PATH.REGISTER}>{buttonData.register}</Link>
      </Button>
    </>
  );
}
