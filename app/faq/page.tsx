import PageSection from "@/components/PageSection";
import { Card } from "@/components/ui/Card";

function QA({ q, a }: { q: string; a: string }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer items-center justify-between rounded-card border border-border bg-surface px-5 py-4 text-left font-sans text-sm font-semibold text-foreground transition-colors duration-200 ease-natural group-open:bg-background-subtle">
        {q}
        <span className="text-muted transition-transform duration-200 ease-natural group-open:rotate-90">›</span>
      </summary>
      <Card className="mt-2 space-y-2 border border-border/80 bg-background-subtle p-4 text-sm text-muted">
        <p>{a}</p>
      </Card>
    </details>
  );
}

export default function FAQ() {
  return (
    <PageSection title="FAQs and Guest Info">
      <QA q="How are rooms assigned?" a="We will assign rooms closer to the trip." />
      <QA q="What meals are included?" a="Daily breakfast at the villa. We will plan a few group dinners." />
      <QA q="Is the water safe?" a="Filtered at the villa. Bottled available if you prefer." />
      <QA q="How do payments work?" a="Split evenly across guests. We will share details in the group chat." />
    </PageSection>
  );
}
