import { useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Hand, Maximize2 } from "lucide-react";
import { Button } from "../app/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../app/components/ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CanvasWorkspaceProps {
  activeTab: string;
}

export function CanvasWorkspace({ activeTab }: CanvasWorkspaceProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 300));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 25));
  const handleReset = () => setZoom(100);

  const zoomOptions = ['25%', '50%', '75%', '100%', '150%', '200%', '300%'];

  return (
    <div className="flex-1 bg-slate-900 flex flex-col">
      {/* Canvas Toolbar */}
      <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-3">
        {/* Left - Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 25}
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          
          <Select value={`${zoom}%`} onValueChange={(val) => setZoom(parseInt(val))}>
            <SelectTrigger className="h-7 w-20 bg-slate-700 border-slate-600 text-xs text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              {zoomOptions.map((opt) => (
                <SelectItem key={opt} value={opt} className="text-xs text-gray-300">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 300}
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Center - View Mode */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Mode:</span>
          <span className="text-xs text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
        </div>

        {/* Right - View Options */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <Hand className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-400 hover:text-white hover:bg-slate-700"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>

          <Select defaultValue="normal">
            <SelectTrigger className="h-7 w-24 bg-slate-700 border-slate-600 text-xs text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="normal" className="text-xs text-gray-300">Normal</SelectItem>
              <SelectItem value="grid" className="text-xs text-gray-300">Grille</SelectItem>
              <SelectItem value="rulers" className="text-xs text-gray-300">Règles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <div className="flex items-center justify-center min-h-full">
          {/* Canvas with checkered background */}
          <div 
            className="relative bg-white shadow-2xl"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center',
            }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1635148040718-acf281233b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBtb3VudGFpbnMlMjBuYXR1cmV8ZW58MXx8fHwxNzYwODU5MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Canvas preview"
              className="max-w-4xl w-full h-auto"
            />
            
            {/* Canvas Info Overlay */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded text-xs text-white space-y-1">
              <div>Dimensions: 1920 × 1080 px</div>
              <div className="text-teal-400">Zoom: {zoom}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-slate-800 border-t border-slate-700 flex items-center justify-between px-3 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>Document: sans titre</span>
          <span className="text-slate-600">|</span>
          <span>1920 × 1080 px</span>
          <span className="text-slate-600">|</span>
          <span>RVB/8</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Mémoire: 45.2 MB</span>
          <span className="text-slate-600">|</span>
          <span className="text-green-400">Prêt</span>
        </div>
      </div>
    </div>
  );
}
