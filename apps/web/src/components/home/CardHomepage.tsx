const styles = {
  div: "card-homepage",
  p: "text-sm text-gray-500 mt-2",
};

type CardHomePageProps = {
  title: string;
  description: string;
};

export default function CardHomePage({
  title,
  description,
}: CardHomePageProps) {
  return (
    <article className={styles.div}>
      <h3>{title}</h3>
      <p className={styles.p}>{description}</p>
    </article>
  );
}
