export default function DayCard({
  date,
  title,
  detail,
  note,
}: {
  date: string;
  title: string;
  detail: string;
  note?: string;
}) {
  return (
    <div className="card">
      <div className="text-sm text-neutral-600">{date}</div>
      <div className="font-semibold">{title}</div>
      <p className="text-sm mt-1">{detail}</p>
      {note && <p className="text-xs mt-2 text-neutral-600">{note}</p>}
    </div>
  );
}

