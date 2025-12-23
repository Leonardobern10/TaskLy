import TodayCalendar from "./TodayCalendar";
import TodayTime from "./TodayTime";

export default function DashboardTop() {
  return (
    <section className="flex flex-col md:flex-row items-start md:items-center justify-evenly gap-6">
      <TodayTime />
      <TodayCalendar />
    </section>
  );
}
