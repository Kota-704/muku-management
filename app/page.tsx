import CalendarBody from "@/components/calendarBody";

export default function Home() {
  return (
    <div className="calendar">
      <div className="calendar-header"></div>
      <div className="calendar-body">
        <CalendarBody />
      </div>
    </div>
  );
}
