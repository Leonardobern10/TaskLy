type InfoDetailsContainerProps = {
  title: string;
  value: string | Date;
};

const styles = {
  p: "text-muted-foreground",
  span: "font-medium text-foreground",
};

export default function InfoDetailsContainer({
  title,
  value,
}: InfoDetailsContainerProps) {
  return (
    <p className={styles.p}>
      {`${title}: `}
      <span className={styles.span}>
        {typeof value === "string" ? value : value.toLocaleDateString("pt-BR")}
      </span>
    </p>
  );
}
