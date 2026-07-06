import { useState } from "react";
import { ChevronLeft, ChevronRight, Sliders, Palette, Layers, Sparkles, Info, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface LeftPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function LeftPanel({ isOpen, onToggle }: LeftPanelProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? "Masquer le panneau" : "Afficher le panneau"}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-4 h-16 bg-slate-700 hover:bg-slate-600 border-r border-slate-600 flex items-center justify-center transition-colors"
      >
        {isOpen ? (
          <ChevronLeft className="w-3 h-3 text-gray-400" aria-hidden="true" />
        ) : (
          <ChevronRight className="w-3 h-3 text-gray-400" aria-hidden="true" />
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <aside className="w-72 bg-slate-800 border-r border-slate-700 flex flex-col" aria-label="Panneau de configuration">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm text-white">Paramètres de génération</h3>
              </div>

              {/* Analysis Info */}
              <div className="bg-slate-700/50 border border-slate-600 rounded p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-300">Analyse de l'image</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Palette de couleurs : <span className="text-white">32</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Résolution : <span className="text-white">200px</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Complexité : <span className="text-orange-400">Élevée</span>
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Color Count */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-teal-400" />
                  <Label className="text-xs text-gray-300">Nombre de couleurs</Label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Min: 8</span>
                  <span className="text-sm text-white">32</span>
                  <span className="text-xs text-gray-400">Max: 64</span>
                </div>
                <Slider
                  defaultValue={[32]}
                  min={8}
                  max={64}
                  step={1}
                  className="[&_[role=slider]]:bg-teal-500 [&_[role=slider]]:border-teal-400"
                />
                <div className="flex items-center justify-between pt-2">
                  <Label className="text-xs text-gray-400">Palette intelligente</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-teal-500" />
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Zone Fusion */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-400" />
                  <Label className="text-xs text-gray-300">Fusion des zones</Label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Précis</span>
                  <span className="text-sm text-white">Moyen</span>
                  <span className="text-xs text-gray-400">Groupé</span>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
                />
              </div>

              <Separator className="bg-slate-700" />

              {/* Edge Smoothing */}
              <div className="space-y-3">
                <Label className="text-xs text-gray-300">Douceur des contours</Label>
                <Slider
                  defaultValue={[25]}
                  max={100}
                  step={1}
                  className="[&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-purple-400"
                />
              </div>

              <Separator className="bg-slate-700" />

              {/* Section Avancé - Progressive Disclosure */}
              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-slate-700/30 rounded px-2 transition-colors">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-purple-400" />
                    <Label className="text-xs text-gray-300 cursor-pointer">Paramètres avancés</Label>
                  </div>
                  <ChevronRight 
                    className={`w-4 h-4 text-gray-400 transition-transform ${isAdvancedOpen ? 'rotate-90' : ''}`} 
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-4 pt-3">
                  {/* Quantization Method */}
                  <div className="space-y-3">
                    <Label className="text-xs text-gray-300">Méthode de quantification</Label>
                    <Select defaultValue="kmeans">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-xs text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="kmeans" className="text-xs text-gray-300">K-Means</SelectItem>
                        <SelectItem value="median" className="text-xs text-gray-300">Median Cut</SelectItem>
                        <SelectItem value="octree" className="text-xs text-gray-300">Octree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Effects */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <Label className="text-xs text-gray-300">Effets</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2">
                        <Label className="text-xs text-gray-400">Effet aquarelle</Label>
                        <Switch className="data-[state=checked]:bg-purple-500" />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <Label className="text-xs text-gray-400">Contours épais</Label>
                        <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <Label className="text-xs text-gray-400">Numéros automatiques</Label>
                        <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Recommendations */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <p className="text-xs text-blue-400">
                  💡 Recommandation : Pour cette image complexe, utilisez 32-48 couleurs avec fusion moyenne.
                </p>
              </div>
            </div>
          </ScrollArea>
        </aside>
      )}
    </>
  );
}
