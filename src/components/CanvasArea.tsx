import { motion } from "motion/react";
import { Download, ZoomIn, ZoomOut, Maximize2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CanvasAreaProps {
  mode: string;
}

export function CanvasArea({ mode }: CanvasAreaProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleReset = () => setZoom(100);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Mode:</span>
          <span className="text-sm text-cyan-600 capitalize">{mode}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 min-w-[50px]">{zoom}%</span>
          <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={zoom <= 50}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={zoom >= 200}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize2 className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          <Button variant="outline" size="sm" className="gap-2 text-cyan-600 border-cyan-200 hover:bg-cyan-50">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center',
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1752302112804-428ddd5a89e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGxhbmRzY2FwZSUyMHBhaW50aW5nfGVufDF8fHx8MTc2MDg1Njg0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Canvas preview"
            className="max-w-4xl w-full h-auto"
          />
          
          {/* Mode Badge */}
          {mode !== 'original' && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1.5 rounded-lg text-sm shadow-md">
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </div>
          )}
        </motion.div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-white border-t text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>Dimensions: 1200 × 800 px</span>
          <span className="text-gray-300">•</span>
          <span>24 couleurs</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Temps: 16.57s</span>
          <span className="text-gray-300">•</span>
          <span className="text-cyan-600">Prêt</span>
        </div>
      </div>
    </div>
  );
}
