import { useClock } from "@/hooks/useClock";

const style = {
  clock: "text-muted-foreground text-2xl",
};

export default function Clock() {
  const hour = useClock();
  return <p className={style.clock}>{hour}</p>;
}
