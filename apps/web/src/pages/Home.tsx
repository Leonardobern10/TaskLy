import { stylesLogo } from "@/components/header/styles.logo";
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
        <div className={homeStyles.mainTexts}>
          <h1 className={stylesLogo.main}>{homepageHeading.title}</h1>
          <p className={homeStyles.descriptionHomepage}>
            {homepageHeading.description}
          </p>
        </div>

        <div className={homeStyles.containerButtons}>
          {user ? (
            <ButtonGroupLogged handleLogout={handleLogout} />
          ) : (
            <ButtonGroupUnLogged />
          )}
        </div>

        <section className={homeStyles.containerCards}>
          {cardHomepageData.map((el: CardHomepage) => (
            <CardHomePage
              key={el.title}
              title={el.title}
              description={el.description}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
