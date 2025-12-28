import type { ReactElement } from "react";

const styles = { containerInput: "grid gap-3" };

type ContainerInputDialogProps = {
  children: ReactElement;
};

export default function ContainerInputDialog({
  children,
}: ContainerInputDialogProps) {
  return <div className={styles.containerInput}>{children}</div>;
}
