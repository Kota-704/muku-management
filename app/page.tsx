import Image from "next/image";
import CalendarBody from "@/components/calendarBody";

export default function Home() {
  return (
    <div className="wrapper p-3 min-h-screen">
      <h1 className="text-center mt-4">椋の管理アプリ</h1>
      <button className="absolute top-6 right-3">
        <Image
          src="/settings-2-svgrepo-com.svg"
          width={32}
          height={32}
          alt="Settings Icon"
        ></Image>
      </button>
      <div className="calendar">
        <div className="calendar-header"></div>
        <div className="calendar-body">
          <CalendarBody />
        </div>
      </div>
    </div>
  );
}
