import TaskComponentSkeleton from "../skeletons/TaskComponentSkeleton";

const styles = {
  containerSkeleton: "grid grid-cols-1 md:grid-cols-3 gap-4",
};

export default function SkeletonsContainer() {
  return (
    <div className={styles.containerSkeleton}>
      {Array.from({ length: 15 }, (_, i) => (
        <TaskComponentSkeleton key={i} />
      ))}
    </div>
  );
}
