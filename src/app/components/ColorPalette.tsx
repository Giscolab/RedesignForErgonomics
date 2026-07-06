import { motion } from "motion/react";
import { Palette } from "lucide-react";

interface ColorPaletteProps {
  colors: Array<{ id: number; hex: string; label?: string }>;
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Palette className="w-4 h-4 text-cyan-600" />
        <h3 className="text-gray-900">Palette extraite</h3>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color, index) => (
          <motion.button
            key={color.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow relative group border border-gray-200"
            style={{ backgroundColor: color.hex }}
            title={color.hex}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] bg-black/80 text-white px-1.5 py-0.5 rounded">
                {color.id}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs">
        <span className="text-gray-500">{colors.length} couleurs</span>
        <button className="text-cyan-600 hover:text-cyan-700">Éditer</button>
      </div>
    </motion.div>
  );
}
