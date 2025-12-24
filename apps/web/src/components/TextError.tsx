import { Label } from "@radix-ui/react-label";

const styles = {
  label: "text-sm text-red-500",
};

export default function TextError({ error }: { error: any }) {
  return <Label className={styles.label}>{error.message}</Label>;
}
