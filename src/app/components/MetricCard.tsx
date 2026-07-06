import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  color?: "teal" | "orange" | "green" | "red";
}

export function MetricCard({ icon: Icon, label, value, unit, trend, color = "teal" }: MetricCardProps) {
  const colorClasses = {
    teal: "from-teal-500 to-cyan-400 border-teal-500/30",
    orange: "from-orange-500 to-red-500 border-orange-500/30",
    green: "from-green-500 to-emerald-400 border-green-500/30",
    red: "from-red-500 to-rose-500 border-red-500/30",
  };

  const textColorClasses = {
    teal: "text-teal-400",
    orange: "text-orange-400",
    green: "text-green-400",
    red: "text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`hud-panel border ${colorClasses[color]} rounded-lg p-4`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} rounded flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-slate-900" />
        </div>
        {trend && (
          <span className={`text-xs font-mono ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
      <div className="text-xs font-mono text-gray-400 mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className={`font-mono ${textColorClasses[color]}`}>{value}</span>
        {unit && <span className="text-xs text-gray-500 font-mono">{unit}</span>}
      </div>
    </motion.div>
  );
}
