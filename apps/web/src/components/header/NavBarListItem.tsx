import type { NavBarListItemProps } from "@/types/props/NavBarListItemProps";
import { useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function NavBarListItem({
  name,
  path,
  variant = "default",
}: NavBarListItemProps) {
  const router = useRouter();
  return (
    <li>
      <Button variant={variant} onClick={() => router.navigate({ to: path })}>
        {name}
      </Button>
    </li>
  );
}
