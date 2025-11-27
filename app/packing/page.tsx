import PageSection from "@/components/PageSection";
import InfoList from "@/components/InfoList";
import { Card } from "@/components/ui/Card";

export default function Packing() {
  return (
    <PageSection title="Packing and Outfits" lead="Keep it light. Sun ready.">
      <Card className="p-5">
        <h3 className="font-sans text-lg font-semibold text-foreground">Essentials</h3>
        <InfoList
          items={[
            "Passport, meds, travel insurance",
            "Sunscreen, bug spray, sunglasses, hat",
            "Flip flops and one pair of closed-toe shoes",
            "Light layers for evenings",
          ]}
        />
      </Card>

      <Card className="p-5">
        <h3 className="font-sans text-lg font-semibold text-foreground">Event outfits</h3>
        <InfoList
          items={[
            "Welcome night: tropical casual",
            "Catamaran: swimwear + cover-up + sandals",
            "Main party: theme TBA",
          ]}
        />
      </Card>

      <Card className="p-5">
        <h3 className="font-sans text-lg font-semibold text-foreground">Nice to have</h3>
        <InfoList
          items={[
            "Reusable water bottle",
            "Small speaker",
            "Motion sickness tabs",
            "GoPro or phone pouch",
          ]}
        />
      </Card>
    </PageSection>
  );
}
