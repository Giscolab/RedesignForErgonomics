import { motion } from "motion/react";
import { X, Sparkles, Sliders, Layers, Droplet, Brush } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface FloatingToolPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FloatingToolPanel({ isOpen, onClose }: FloatingToolPanelProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed left-8 top-24 w-80 glass-panel rounded-2xl z-50 shadow-2xl"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Sliders className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900">Paramètres</h3>
              <p className="text-xs text-amber-700">Outils de l'artiste</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-amber-100/50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Détail du pinceau */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Brush className="w-4 h-4 text-amber-700" />
            <Label className="text-gray-700">Détail du pinceau</Label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-600">Faible</span>
            <span className="text-xs text-amber-600">Élevé</span>
          </div>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Fusion des zones */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-700" />
            <Label className="text-gray-700">Fusion des zones</Label>
          </div>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
          />
          <p className="text-xs text-amber-600/80">Regrouper les petites zones</p>
        </div>

        {/* Effet aquarelle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4 text-amber-700" />
              <Label className="text-gray-700">Effet aquarelle</Label>
            </div>
            <Switch defaultChecked />
          </div>
          <Slider
            defaultValue={[15]}
            max={100}
            step={1}
          />
        </div>

        {/* Nombre de couleurs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-gray-700">Palette de couleurs</Label>
            <span className="text-sm text-amber-700">24 teintes</span>
          </div>
          <Slider
            defaultValue={[24]}
            min={8}
            max={64}
            step={1}
          />
        </div>

        {/* Palette intelligente */}
        <div className="flex items-center justify-between py-2 px-3 bg-amber-50/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <Label className="text-gray-700">Palette intelligente</Label>
          </div>
          <Switch defaultChecked />
        </div>

        {/* Generate Button */}
        <Button className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 hover:from-amber-700 hover:via-orange-600 hover:to-red-600 text-white gap-2 shadow-lg">
          <Sparkles className="w-4 h-4" />
          Créer le modèle
        </Button>
      </div>
    </motion.div>
  );
}
