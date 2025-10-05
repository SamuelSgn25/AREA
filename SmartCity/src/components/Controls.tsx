import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Info, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";

export const Controls = () => {
  const showInfo = () => {
    toast.info("Utilisez la souris pour naviguer", {
      description: "Clic gauche + glisser pour tourner, molette pour zoomer, clic droit + glisser pour déplacer la caméra.",
    });
  };

  return (
    <Card className="bg-card/95 backdrop-blur-sm border-border/50">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RotateCw className="w-4 h-4" />
            <span className="hidden sm:inline">Rotation</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ZoomIn className="w-4 h-4" />
            <ZoomOut className="w-4 h-4" />
            <span className="hidden sm:inline">Zoom</span>
          </div>
          <Button
            onClick={showInfo}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Info className="w-4 h-4" />
            <span>Guide</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
