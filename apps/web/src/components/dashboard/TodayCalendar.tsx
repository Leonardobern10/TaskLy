import { Calendar } from "../ui/calendar";

export default function TodayCalendar() {
  const today = new Date();
  return (
    <Calendar
      mode="single"
      selected={today}
      className="rounded-md border shadow-sm [--cell-size:--spacing(8)] md:[--cell-size:--spacing(12)] mb-5"
      captionLayout="dropdown"
    />
  );
}
