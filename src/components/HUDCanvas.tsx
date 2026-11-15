import { motion } from "motion/react";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Crosshair } from "lucide-react";
import { Button } from "../app/components/ui/button";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HUDCanvasProps {
  mode: string;
}

export function HUDCanvas({ mode }: HUDCanvasProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleReset = () => setZoom(100);

  return (
    <div className="flex-1 flex flex-col relative grid-pattern">
      {/* HUD Overlay - Top */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between p-4">
        {/* Mode Indicator */}
        <div className="hud-panel px-4 py-2 neon-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-teal-400">MODE: {mode.toUpperCase()}</span>
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="hud-panel px-2 py-1 neon-border flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleZoomOut} 
            disabled={zoom <= 50}
            className="h-7 w-7 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="text-xs font-mono text-teal-400 min-w-[45px] text-center">{zoom}%</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleReset}
            className="h-7 w-7 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleZoomIn} 
            disabled={zoom >= 200}
            className="h-7 w-7 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <div className="w-px h-5 bg-teal-500/30 mx-1" />
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-8 scanline">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center',
          }}
        >
          <div className="relative hud-panel neon-border p-2">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1700212964225-d31af38e3e91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBmbG93ZXJzfGVufDF8fHx8MTc2MDg1NzA3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Canvas preview"
              className="max-w-4xl w-full h-auto"
            />
            
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-teal-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal-500" />
          </div>

          {/* Crosshair overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Crosshair className="w-8 h-8 text-teal-500/20" />
          </div>
        </motion.div>
      </div>

      {/* HUD Overlay - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        <div className="hud-panel neon-border px-4 py-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4 text-teal-400/80">
              <span>DIM: 1200×800px</span>
              <span className="text-teal-500/40">|</span>
              <span>COL: 24</span>
              <span className="text-teal-500/40">|</span>
              <span>SIZE: 2.4MB</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-orange-400/80">PROC: 16.57s</span>
              <span className="text-teal-500/40">|</span>
              <span className="text-green-400">STATUS: READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
