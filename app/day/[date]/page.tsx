interface DayDetailProps {
  params: Promise<{ date: string }>;
}

export default async function DayDetailPage({ params }: DayDetailProps) {
  const resolvedParams = await params;
  const { date } = resolvedParams;

  return <div>Selected date: {date}</div>;
}
