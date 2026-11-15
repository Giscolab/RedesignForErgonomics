import { motion } from "motion/react";
import { Clock, Database, Layers, HardDrive } from "lucide-react";

const stats = [
  { icon: Clock, label: 'Temps Total', value: '16.57s', color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
  { icon: Database, label: 'Cache Hit', value: '87%', color: 'text-green-600', bgColor: 'bg-green-50' },
  { icon: Layers, label: 'Étapes', value: '8', subtitle: 'mesurées', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { icon: HardDrive, label: 'Mémoire', value: '32.1 MB', subtitle: 'max usage', color: 'text-orange-600', bgColor: 'bg-orange-50' },
];

export function PerformanceStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-3"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded ${stat.bgColor}`}>
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
              </div>
              <span className="text-xs text-gray-600">{stat.label}</span>
            </div>
            <div className="text-gray-900">{stat.value}</div>
            {stat.subtitle && (
              <div className="text-xs text-gray-500 mt-0.5">{stat.subtitle}</div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
