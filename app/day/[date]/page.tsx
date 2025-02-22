import dayjs from "dayjs";

interface DayDetailProps {
  params: { date: string };
}

export default function DayDetail({ params }: DayDetailProps) {
  const formattedDate = dayjs(params.date).format("D日");

  return (
    <div>
      <h1 className="text-center mt-4">{formattedDate}</h1>
    </div>
  );
}
