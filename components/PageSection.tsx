export default function PageSection({
  title,
  lead,
  children,
  id,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="section grid gap-3">
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
      <div className="grid gap-3">{children}</div>
    </section>
  );
}

