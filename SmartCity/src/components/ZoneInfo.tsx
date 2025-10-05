import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Leaf, Droplets, Sun } from "lucide-react";

interface ZoneData {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
}

const zones: ZoneData[] = [
  {
    id: "residential",
    title: "Maisons & Bâtiments Écologiques",
    description: "60% maisons + 40% bâtiments durables",
    icon: Leaf,
    features: [
      "Maisons authentiques : toits pentus, cheminées, garages",
      "Entreprises modernes : façades vitrées, enseignes LED",
      "Panneaux solaires 100% réalistes avec cellules",
      "Brassage urbain intelligent centre/périphérie",
      "15 commerces proximité + 12 stations recharge",
    ],
  },
  {
    id: "lagoon",
    title: "Zone Sans Pollution",
    description: "Air pur certifié par capteurs",
    icon: Droplets,
    features: [
      "6 capteurs qualité air (LED vertes)",
      "Fontaines à énergie solaire",
      "Eau 100% propre et recyclée",
      "Aucune émission de CO2",
      "Biodiversité préservée",
    ],
  },
  {
    id: "downtown",
    title: "Énergies Renouvelables",
    description: "100% énergie verte et durable",
    icon: Sun,
    features: [
      "5 éoliennes communautaires géantes",
      "Panneaux solaires sur 60% des toits",
      "8 stations de recharge électrique",
      "Transport 100% électrique",
      "Réseau énergétique intelligent",
    ],
  },
];

export const ZoneInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {zones.map((zone) => {
        const Icon = zone.icon;
        return (
          <Card key={zone.id} className="bg-card/95 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{zone.title}</CardTitle>
                  <CardDescription>{zone.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {zone.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
