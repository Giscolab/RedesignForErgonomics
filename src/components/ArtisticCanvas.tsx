import { motion } from "motion/react";
import { Download, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";
import { Button } from "../app/components/ui/button";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ArtisticCanvasProps {
  mode: string;
}

export function ArtisticCanvas({ mode }: ArtisticCanvasProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleReset = () => setZoom(100);

  return (
    <div className="flex-1 flex flex-col canvas-texture">
      {/* Canvas Controls - Floating */}
      <div className="absolute top-6 right-6 z-10">
        <div className="glass-panel rounded-xl p-2 flex items-center gap-1 shadow-lg">
          <span className="text-xs text-amber-800 px-2">{zoom}%</span>
          <div className="w-px h-5 bg-amber-300/50" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleZoomOut} 
            disabled={zoom <= 50}
            className="h-8 w-8 hover:bg-amber-100/50"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleReset}
            className="h-8 w-8 hover:bg-amber-100/50"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleZoomIn} 
            disabled={zoom >= 200}
            className="h-8 w-8 hover:bg-amber-100/50"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 hover:bg-amber-100/50"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Export Button - Floating */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          className="glass-panel gap-2 text-amber-900 hover:bg-amber-100/50 shadow-lg border-amber-300/50"
          variant="outline"
        >
          <Download className="w-4 h-4" />
          Exporter l'œuvre
        </Button>
      </div>

      {/* Canvas with Frame */}
      <div className="flex-1 flex items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative canvas-frame bg-white p-4"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center',
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1700212964225-d31af38e3e91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBmbG93ZXJzfGVufDF8fHx8MTc2MDg1NzA3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Canvas artwork"
            className="max-w-4xl w-full h-auto shadow-inner"
          />
          
          {/* Mode Badge */}
          {mode !== 'original' && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="glass-panel px-4 py-1.5 rounded-full shadow-lg border-amber-300/50">
                <span className="text-sm text-amber-900">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
              </div>
            </div>
          )}
          
          {/* Canvas signature */}
          <div className="absolute bottom-6 right-8 text-xs text-gray-400 italic font-serif">
            Canvas to Colors '25
          </div>
        </motion.div>
      </div>

      {/* Status Bar - Artistic */}
      <div className="glass-panel mx-6 mb-6 rounded-xl px-6 py-3 flex items-center justify-between text-sm border-amber-200/50">
        <div className="flex items-center gap-4 text-amber-800">
          <span>📐 1200 × 800 px</span>
          <span className="text-amber-400">•</span>
          <span>🎨 24 couleurs</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-amber-600">⏱️ 16.57s</span>
          <span className="text-amber-400">•</span>
          <span className="text-green-600">✓ Prêt</span>
        </div>
      </div>
    </div>
  );
}
