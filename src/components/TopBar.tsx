import { Palette, Save, Upload, Paintbrush } from "lucide-react";
import { Button } from "./ui/button";

export function TopBar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 paper-texture border-b border-amber-200/50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Paintbrush className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-gray-900">Canvas to Colors</h1>
            <p className="text-xs text-amber-700">Atelier numérique</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 hover:bg-amber-100/50 text-amber-900"
        >
          <Upload className="w-4 h-4" />
          Charger
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 hover:bg-amber-100/50 text-amber-900"
        >
          <Save className="w-4 h-4" />
          Sauvegarder
        </Button>
        <div className="w-px h-6 bg-amber-300/50 mx-2" />
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-amber-100/50 text-amber-900"
        >
          <Palette className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
