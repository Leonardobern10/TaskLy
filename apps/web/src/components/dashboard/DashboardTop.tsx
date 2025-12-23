import TodayCalendar from "./TodayCalendar";
import TodayTime from "./TodayTime";

const styles = {
  container:
    "flex flex-col md:flex-row items-start md:items-center justify-evenly gap-6",
};

export default function DashboardTop() {
  return (
    <section className={styles.container}>
      <TodayTime />
      <TodayCalendar />
    </section>
  );
}
