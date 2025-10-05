import { Suspense } from "react";
import { CityScene } from "@/components/CityScene";
import { ZoneInfo } from "@/components/ZoneInfo";
import { Controls } from "@/components/Controls";
import { Loader2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Ville Écologique Sans Pollution 3D
          </h1>
          <p className="text-muted-foreground">
            60 maisons + 40 bâtiments avec énergies 100% renouvelables et air pur certifié
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Scène 3D */}
        <div className="relative">
          <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-gradient-to-b from-sky-blue/20 to-background">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Chargement de la ville durable...</p>
                  </div>
                </div>
              }
            >
              <CityScene />
            </Suspense>
          </div>
          
          {/* Contrôles superposés */}
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto">
            <Controls />
          </div>
        </div>

        {/* Informations sur les zones */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Ville 100% Écologique et Sans Pollution
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez 60 vraies maisons résidentielles et 40 bâtiments commerciaux alimentés par 
              énergies renouvelables, avec capteurs de qualité d'air et véhicules 100% électriques.
            </p>
          </div>
          <ZoneInfo />
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            À propos de cette maquette
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Caractéristiques techniques</h4>
              <ul className="space-y-1">
                <li>• Brassage urbain maisons/entreprises/commerces</li>
                <li>• Panneaux solaires 100% réalistes sur tous toits</li>
                <li>• 12 stations recharge + 15 commerces proximité</li>
                <li>• Styles architecturaux authentiques distincts</li>
                <li>• Performance fluide optimisée</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Objectif pédagogique</h4>
              <ul className="space-y-1">
                <li>• Visualiser une ville sans pollution</li>
                <li>• Comprendre les solutions durables</li>
                <li>• Inspirer l'urbanisme de demain</li>
                <li>• Sensibiliser à l'écologie urbaine</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
