import { motion } from "motion/react";
import { Sliders, Layers, Droplet, Palette, Sparkles, ChevronRight } from "lucide-react";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

interface ControlCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

function ControlCard({ title, icon: Icon, children, defaultExpanded = true }: ControlCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hud-panel neon-border-orange rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-orange-500/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded flex items-center justify-center">
            <Icon className="w-4 h-4 text-slate-900" />
          </div>
          <span className="text-sm font-mono text-orange-400">{title}</span>
        </div>
        <ChevronRight className={`w-4 h-4 text-orange-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 space-y-4 border-t border-orange-500/20">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ControlPanel() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <div className="hud-panel neon-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-5 h-5 text-teal-400" />
          <h3 className="font-mono text-sm neon-text-teal">CONTROL PANEL</h3>
        </div>
        <p className="text-xs text-teal-400/60 font-mono">System Parameters</p>
      </div>

      {/* Detail Level */}
      <ControlCard title="DETAIL LEVEL" icon={Layers}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-mono text-gray-400">Resolution</Label>
            <span className="text-xs font-mono text-orange-400">HIGH</span>
          </div>
          <Slider
            defaultValue={[75]}
            max={100}
            className="[&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-gray-500">
            <span>LOW</span>
            <span>MEDIUM</span>
            <span>HIGH</span>
          </div>
        </div>
      </ControlCard>

      {/* Zone Fusion */}
      <ControlCard title="ZONE FUSION" icon={Droplet}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-mono text-gray-400">Threshold</Label>
            <span className="text-xs font-mono text-orange-400">50px</span>
          </div>
          <Slider
            defaultValue={[50]}
            max={100}
            className="[&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
          />
          
          <div className="flex items-center justify-between pt-2 border-t border-orange-500/20">
            <Label className="text-xs font-mono text-gray-400">AI Fusion</Label>
            <Switch 
              defaultChecked 
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-mono text-gray-400">Tolerance</Label>
              <span className="text-xs font-mono text-orange-400">15%</span>
            </div>
            <Slider
              defaultValue={[15]}
              max={100}
              className="[&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
            />
          </div>
        </div>
      </ControlCard>

      {/* Color Palette */}
      <ControlCard title="COLOR PALETTE" icon={Palette}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-mono text-gray-400">Color Count</Label>
            <span className="text-xs font-mono text-orange-400">24</span>
          </div>
          <Slider
            defaultValue={[24]}
            min={8}
            max={64}
            className="[&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
          />
          
          <div className="flex items-center justify-between pt-2 border-t border-orange-500/20">
            <Label className="text-xs font-mono text-gray-400">Smart Palette</Label>
            <Switch 
              defaultChecked 
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </div>
      </ControlCard>

      {/* Edge Smoothing */}
      <ControlCard title="EDGE PROCESSING" icon={Sparkles} defaultExpanded={false}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-mono text-gray-400">Smoothness</Label>
            <span className="text-xs font-mono text-orange-400">0%</span>
          </div>
          <Slider
            defaultValue={[0]}
            max={100}
            className="[&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-400"
          />
        </div>
      </ControlCard>

      {/* Generate Button */}
      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white gap-2 font-mono text-xs neon-border-orange">
        <Sparkles className="w-4 h-4" />
        GENERATE MODEL
      </Button>
    </div>
  );
}
