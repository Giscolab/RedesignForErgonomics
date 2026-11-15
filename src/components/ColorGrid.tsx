import { motion } from "motion/react";
import { Palette, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ColorGridProps {
  colors: Array<{ id: number; hex: string }>;
}

export function ColorGrid({ colors }: ColorGridProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (hex: string, id: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <div className="hud-panel neon-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-5 h-5 text-teal-400" />
          <h3 className="font-mono text-sm neon-text-teal">COLOR PALETTE</h3>
        </div>
        <p className="text-xs text-teal-400/60 font-mono">{colors.length} Colors Extracted</p>
      </div>

      {/* Color Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hud-panel neon-border-orange rounded-lg p-4"
      >
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color, index) => (
            <motion.button
              key={color.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCopy(color.hex, color.id)}
              className="group relative aspect-square rounded-lg overflow-hidden border-2 border-slate-700 hover:border-teal-500 transition-all"
              style={{ backgroundColor: color.hex }}
            >
              {/* ID Badge */}
              <div className="absolute top-1 left-1 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                #{color.id}
              </div>
              
              {/* Hex Code */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/90 text-white text-[10px] font-mono px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                <span>{color.hex}</span>
                {copiedId === color.id ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Color Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="hud-panel neon-border rounded-lg p-4 space-y-3"
      >
        <h4 className="text-xs font-mono text-teal-400">STATISTICS</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Total Colors</span>
            <span className="text-teal-400">{colors.length}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Unique Hues</span>
            <span className="text-teal-400">{Math.floor(colors.length * 0.85)}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Saturation Avg</span>
            <span className="text-teal-400">72%</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">Brightness Avg</span>
            <span className="text-teal-400">58%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
