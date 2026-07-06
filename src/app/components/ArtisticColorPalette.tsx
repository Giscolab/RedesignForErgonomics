import { motion } from "motion/react";
import { Palette, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface ArtisticColorPaletteProps {
  colors: Array<{ id: number; hex: string; label?: string }>;
}

export function ArtisticColorPalette({ colors }: ArtisticColorPaletteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl p-6 shadow-lg border-amber-200/50"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
          <Palette className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900">Palette de l'artiste</h3>
          <p className="text-xs text-amber-700">{colors.length} teintes extraites</p>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-2 mb-4">
        {colors.map((color, index) => (
          <motion.button
            key={color.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.02,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="aspect-square rounded-lg paint-swatch relative group border border-amber-900/10"
            style={{ backgroundColor: color.hex }}
            title={color.hex}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] bg-black/90 text-white px-2 py-1 rounded-md font-mono">
                #{color.id}
              </span>
            </div>
            {/* Paint drip effect */}
            <div 
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-2 opacity-50 group-hover:h-3 transition-all"
              style={{ backgroundColor: color.hex }}
            />
          </motion.button>
        ))}
      </div>
      
      <div className="pt-4 border-t border-amber-200/50 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-amber-700 hover:bg-amber-100/50 gap-2"
        >
          <Sparkles className="w-3 h-3" />
          Ajuster la palette
        </Button>
      </div>
    </motion.div>
  );
}
