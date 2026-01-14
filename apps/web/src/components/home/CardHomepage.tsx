const styles = {
  div: "card-homepage",
  p: "text-body text-gray-500 mt-2",
  h3: "text-purple",
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
      <h3 className={styles.h3}>{title}</h3>
      <p className={styles.p}>{description}</p>
    </article>
  );
}
