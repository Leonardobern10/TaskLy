import { Skeleton } from "../ui/skeleton";

const styles = {
  container:
    "sm:w-5/6 flex flex-col gap-y-5 h-50 rounded-xl bg-neutral-400/50 p-4 px-6",
  group1: "flex flex-col",
  group2: "w-full flex justify-start gap-x-2",
  item2: "w-5/6 h-7 rounded-full",
  item1: "skeleton-item",
};

export default function TaskComponentSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.group1}>
        <Skeleton className={styles.item2} />
        <Skeleton className={styles.item1} />
      </div>
      <div className={styles.group2}>
        <Skeleton className={styles.item1} />
        <Skeleton className={styles.item1} />
      </div>
      <div>
        <Skeleton className={styles.item1} />
      </div>
    </div>
  );
}
