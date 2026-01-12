import type { ButtonCardActionProps } from "@/types/props/ButtonCardActionProps";
import { Button } from "../ui/button";

type FontSize = "sm" | "lg" | "xs" | "xl";

const styles = {
  button: (fontSize: FontSize, full: boolean) =>
    ` ${fontSize} cursor-pointer text-gray-600 border-2 sm:text-sm max-w-120 font-medium px-1 sm:px-5 py-0.5 sm:py-1 ${
      full ? "w-full md:w-1/5" : "w-fit"
    }`,
};

export default function ButtonCardAction({
  onClick,
  buttonName,
  full = false,
  variant = "ghost",
  size = "default",
  fontSize = "sm",
}: ButtonCardActionProps) {
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      className={styles.button(fontSize, full)}
    >
      {buttonName}
    </Button>
  );
}
