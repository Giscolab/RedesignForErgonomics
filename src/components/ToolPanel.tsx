import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "../app/components/ui/button";
import { Slider } from "../app/components/ui/slider";
import { Switch } from "../app/components/ui/switch";
import { Label } from "../app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../app/components/ui/select";

interface ToolPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ToolPanel({ isOpen, onToggle }: ToolPanelProps) {
  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className="absolute left-4 top-4 z-10 bg-white shadow-md hover:bg-gray-50"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </Button>

      {/* Panel */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute left-0 top-0 bottom-0 w-80 bg-white border-r z-[5] overflow-y-auto"
      >
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-gray-900 mb-1">Paramètres</h2>
            <p className="text-sm text-gray-500">Ajustez les options de conversion</p>
          </div>

          {/* Niveau de détail */}
          <div className="space-y-3">
            <Label htmlFor="detail-level">Niveau de détail</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="detail-level">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Faible (rapide)</SelectItem>
                <SelectItem value="medium">Moyen</SelectItem>
                <SelectItem value="high">Élevé (précis)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fusion zones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="fusion-zones">Fusion zones</Label>
              <span className="text-sm text-cyan-600">50 px</span>
            </div>
            <Slider
              id="fusion-zones"
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-500">Taille minimale des zones fusionnées</p>
          </div>

          {/* Fusion artistique */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="fusion-artistique">Fusion artistique</Label>
              <Switch id="fusion-artistique" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tolerance-ai" className="text-sm">Tolérance AI</Label>
              <Slider
                id="tolerance-ai"
                defaultValue={[15]}
                max={100}
                step={1}
              />
            </div>
          </div>

          {/* Douceur des bords */}
          <div className="space-y-3">
            <Label>Douceur des bords</Label>
            <Slider defaultValue={[0]} max={100} step={1} />
          </div>

          {/* Nombre de couleurs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="color-count">Nombre de couleurs</Label>
              <span className="text-sm text-cyan-600">24</span>
            </div>
            <Slider
              id="color-count"
              defaultValue={[24]}
              min={8}
              max={64}
              step={1}
            />
          </div>

          {/* Palette intelligente */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="palette-intelligente">Palette intelligente</Label>
              <Switch id="palette-intelligente" defaultChecked />
            </div>
            <p className="text-xs text-gray-500">Sélection automatique des couleurs</p>
          </div>

          {/* Activer le profiler */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="profiler">Activer le profiler</Label>
              <Switch id="profiler" defaultChecked />
            </div>
          </div>

          {/* Generate Button */}
          <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white gap-2">
            <Sparkles className="w-4 h-4" />
            Générer le modèle
          </Button>
        </div>
      </motion.div>
    </>
  );
}
