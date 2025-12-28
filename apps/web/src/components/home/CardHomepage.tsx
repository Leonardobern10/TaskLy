const styles = {
  div: "card-homepage",
  h3: "font-semibold text-lg",
  p: "text-sma text-gray-500 mt-2",
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
    <div className={styles.div}>
      <h3 className={styles.h3}>{title}</h3>
      <p className={styles.p}>{description}</p>
    </div>
  );
}
