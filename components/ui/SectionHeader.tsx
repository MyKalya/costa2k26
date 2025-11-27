export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="section-header">
      <h2 className="section-header-title">{title}</h2>
      {subtitle ? <p className="section-header-subtitle">{subtitle}</p> : null}
      <div className="section-divider" />
    </div>
  );
}
