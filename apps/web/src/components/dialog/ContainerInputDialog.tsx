import type { ReactElement } from "react";

const styles = { containerInput: "grid gap-3" };

export default function ContainerInputDialog({
  children,
}: {
  children: ReactElement;
}) {
  return <div className={styles.containerInput}>{children}</div>;
}
