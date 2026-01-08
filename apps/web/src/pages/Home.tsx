import ButtonGroupLogged from "@/components/home/ButtonGroupLogged";
import ButtonGroupUnLogged from "@/components/home/ButtonGroupUnLogged";
import CardHomePage from "@/components/home/CardHomepage";
import { homeStyles } from "@/components/home/home.styles";
import { cardHomepageData, homepageHeading } from "@/data/homepage.data";
import { useHome } from "@/hooks/useHome";
import type { CardHomepage } from "@/types/CardHomepageType";

export default function Home() {
  const { user, handleLogout } = useHome();

  return (
    <div className={homeStyles.homeContainer}>
      <div className={homeStyles.bodyContainer}>
        <h1>{homepageHeading.title}</h1>

        <p className={homeStyles.descriptionHomepage}>
          {homepageHeading.description}
        </p>

        <div className={homeStyles.containerButtons}>
          {user ? (
            <ButtonGroupLogged handleLogout={handleLogout} />
          ) : (
            <ButtonGroupUnLogged />
          )}
        </div>

        <div className={homeStyles.containerCards}>
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
