import PageSection from "@/components/PageSection";
import { Card } from "@/components/ui/Card";

export default function Updates() {
  return (
    <PageSection title="Updates" lead="We will post any changes or confirmations here.">
      <Card className="p-4 text-sm text-muted">Catamaran day is Feb 15. Time to be confirmed.</Card>
      <Card className="p-4 text-sm text-muted">Shuttle details coming soon.</Card>
    </PageSection>
  );
}
