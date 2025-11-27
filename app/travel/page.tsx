import PageSection from "@/components/PageSection";
import InfoList from "@/components/InfoList";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Travel() {
  return (
    <PageSection
      title="Travel and Arrival"
      lead="Closest airport is Liberia LIR. About one hour to the villa."
    >
      <Card className="space-y-3 p-5">
        <h3 className="font-sans text-lg font-semibold text-foreground">Flights</h3>
        <InfoList
          items={[
            "Aim to land on Feb 13 before late afternoon if possible",
            "Keep passports valid 6 months",
          ]}
        />
      </Card>

      <Card className="space-y-3 p-5">
        <h3 className="font-sans text-lg font-semibold text-foreground">Transfers</h3>
        <InfoList
          items={[
            "Group shuttles from LIR to the villa",
            "Late arrivals get a dedicated pickup",
            "Return shuttles on Feb 18",
          ]}
        />
      </Card>

      <Card className="space-y-4 p-5">
        <div>
          <h3 className="font-sans text-lg font-semibold text-foreground">Currency</h3>
          <p className="text-sm text-muted">
            USD is accepted almost everywhere. Cash change comes in Costa Rican colones. Best exchange rates are at ATMs or banks—airport kiosks add heavy fees.
          </p>
        </div>
        <div>
          <h3 className="font-sans text-lg font-semibold text-foreground">Driving to the villa</h3>
          <p className="text-sm text-muted">
            From Liberia Airport take Route 21, then Route 155 toward Tamarindo, following signs for Hacienda Pinilla. Expect ~1 hour. Call ahead if arriving after 10pm so the gate knows you’re coming.
          </p>
          <Button
            as="a"
            href="https://maps.google.com/?q=Hacienda+Pinilla"
            target="_blank"
            rel="noopener"
            variant="outline"
            size="sm"
            className="mt-3"
          >
            Open in Maps
          </Button>
        </div>
        <div>
          <h3 className="font-sans text-lg font-semibold text-foreground">Quick tips</h3>
          <InfoList
            items={[
              "Wi-Fi is strong at the villas",
              "Pack light and breathable fabrics",
              "Use sunscreen + bug spray daily",
            ]}
          />
        </div>
      </Card>

      <Card className="space-y-3 p-5">
        <h3 className="font-sans text-lg font-semibold text-foreground">FAQ adds</h3>
        <InfoList
          items={[
            "Smoking: outside only, away from doors/windows.",
            "Laundry: use in-house machines; bring your preferred detergent.",
          ]}
        />
      </Card>
    </PageSection>
  );
}
