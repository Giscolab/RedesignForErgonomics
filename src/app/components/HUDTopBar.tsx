import { Activity, Upload, Download, Save, Settings, Radio } from "lucide-react";
import { Button } from "./ui/button";

export function HUDTopBar() {
  return (
    <div className="hud-panel border-b border-teal-500/30 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo & Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-400 rounded flex items-center justify-center">
                <Activity className="w-5 h-5 text-slate-900" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="neon-text-teal font-mono text-sm">CANVAS TO COLORS</h1>
              <p className="text-xs text-teal-400/60 font-mono">MONITORING SYSTEM v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Radio className="w-3 h-3 text-green-500 animate-pulse" />
            <span className="text-xs text-green-400 font-mono">ONLINE</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 font-mono text-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            UPLOAD
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 font-mono text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            EXPORT
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 font-mono text-xs"
          >
            <Save className="w-3.5 h-3.5" />
            SAVE
          </Button>
          <div className="w-px h-6 bg-teal-500/30 mx-2" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
