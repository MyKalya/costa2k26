export default function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 text-sm text-muted">
      {items.map((i) => (
        <li key={i}>• {i}</li>
      ))}
    </ul>
  );
}

