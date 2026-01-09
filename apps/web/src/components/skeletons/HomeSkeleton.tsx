import { homeStyles } from "../home/home.styles";
import { Skeleton } from "../ui/skeleton";

const SKELETON_CARDS = 3;

const styles = {
  skeletonTitle: "h-10 w-3/4 mx-auto",
  skeletonDescription: "h-5 w-full mx-auto",
  skeletonButtons: "h-10 w-32 rounded-md",
  skeletonCards: "h-40 w-56 rounded-xl",
};

export default function HomeSkeleton() {
  return (
    <div className={homeStyles.homeContainer}>
      <div className={homeStyles.bodyContainer}>
        {/* Title */}
        <Skeleton className={styles.skeletonTitle} />

        {/* Description */}
        <Skeleton className={styles.skeletonDescription} />

        {/* Buttons */}
        <div className={homeStyles.containerButtons}>
          <Skeleton className={styles.skeletonButtons} />
          <Skeleton className={styles.skeletonButtons} />
        </div>

        {/* Cards */}
        <div className={homeStyles.containerCards}>
          {Array.from({ length: SKELETON_CARDS }).map((_, index) => (
            <Skeleton key={index} className={styles.skeletonCards} />
          ))}
        </div>
      </div>
    </div>
  );
}
