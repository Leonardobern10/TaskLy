import ButtonGroupLogged from "@/components/home/ButtonGroupLogged";
import ButtonGroupUnLogged from "@/components/home/ButtonGroupUnLogged";
import CardHomePage from "@/components/home/CardHomepage";
import { cardHomepageData, homepageHeading } from "@/data/homepage.data";
import { useHome } from "@/hooks/useHome";
import type { CardHomepage } from "@/types/CardHomepageType";

const styles = {
  homeContainer:
    "h-full md:h-full flex flex-col items-center justify-center bg-gray-50 px-4 py-12",
  bodyContainer: "max-w-2xl text-center space-y-6",
  descriptionHomepage: "text-lg text-gray-600",
  containerButtons:
    "flex flex-col sm:flex-row gap-4 items-center justify-center mt-6",
  containerCards:
    "mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 place-items-center",
};

export default function Home() {
  const { user, handleLogout } = useHome();

  return (
    <div className={styles.homeContainer}>
      <div className={styles.bodyContainer}>
        <h1>{homepageHeading.title}</h1>

        <p className={styles.descriptionHomepage}>
          {homepageHeading.description}
        </p>

        <div className={styles.containerButtons}>
          {user ? (
            <ButtonGroupLogged handleLogout={handleLogout} />
          ) : (
            <ButtonGroupUnLogged />
          )}
        </div>

        <div className={styles.containerCards}>
          {cardHomepageData.map((el: CardHomepage) => (
            <CardHomePage
              key={el.title}
              title={el.title}
              description={el.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
