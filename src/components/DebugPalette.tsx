import { motion } from "motion/react";
import { Activity, Clock, Zap, HardDrive, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "./ui/progress";

interface StepData {
  name: string;
  duration: string;
  status: "success" | "warning";
  percentage: number;
  memory: string;
}

const steps: StepData[] = [
  { name: "Chargement", duration: "0.23s", status: "success", percentage: 95, memory: "4.2 MB" },
  { name: "Extraction couleurs", duration: "2.45s", status: "success", percentage: 88, memory: "12.8 MB" },
  { name: "Détection contours", duration: "3.12s", status: "success", percentage: 92, memory: "18.3 MB" },
  { name: "Segmentation", duration: "5.67s", status: "warning", percentage: 76, memory: "32.1 MB" },
  { name: "Attribution numéros", duration: "1.89s", status: "success", percentage: 94, memory: "8.7 MB" },
  { name: "Optimisation", duration: "2.21s", status: "success", percentage: 90, memory: "6.4 MB" },
  { name: "Rendu final", duration: "1.67s", status: "success", percentage: 97, memory: "9.8 MB" },
];

export function DebugPalette() {
  return (
    <div className="canvas-texture min-h-full p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-6 shadow-lg border-amber-200/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900">Palette de Debug</h2>
              <p className="text-sm text-amber-700">Analyse des performances artistiques</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Temps total", value: "17.24s", color: "from-blue-500 to-cyan-500" },
            { icon: Zap, label: "Efficacité", value: "89%", color: "from-green-500 to-emerald-500" },
            { icon: HardDrive, label: "Mémoire max", value: "32.1 MB", color: "from-orange-500 to-red-500" },
            { icon: CheckCircle, label: "Étapes réussies", value: "7/7", color: "from-purple-500 to-pink-500" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-xl p-4 shadow-lg border-amber-200/50"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs text-amber-700 mb-1">{stat.label}</div>
                <div className="text-gray-900">{stat.value}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Steps Palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-2xl p-6 shadow-lg border-amber-200/50"
        >
          <h3 className="text-gray-900 mb-4">Palette des étapes</h3>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-amber-50/30 transition-colors group"
              >
                {/* Color swatch */}
                <div className="relative">
                  <div 
                    className="w-12 h-12 rounded-lg paint-swatch flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, 
                        hsl(${30 + index * 20}, ${70 + step.percentage / 5}%, ${50 + step.percentage / 5}%),
                        hsl(${40 + index * 20}, ${60 + step.percentage / 5}%, ${40 + step.percentage / 5}%)
                      )`
                    }}
                  >
                    <span className="text-white text-xs">{index + 1}</span>
                  </div>
                  {step.status === "success" ? (
                    <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-green-600 bg-white rounded-full" />
                  ) : (
                    <AlertCircle className="absolute -top-1 -right-1 w-5 h-5 text-amber-600 bg-white rounded-full" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900">{step.name}</span>
                    <div className="flex items-center gap-3 text-xs text-amber-700">
                      <span>⏱️ {step.duration}</span>
                      <span>💾 {step.memory}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={step.percentage} className="flex-1 h-2" />
                    <span className="text-xs text-amber-600 min-w-[40px]">{step.percentage}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-panel rounded-2xl p-6 shadow-lg border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-orange-50/50"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🎨</div>
            <div>
              <h4 className="text-gray-900 mb-1">Analyse terminée</h4>
              <p className="text-sm text-amber-700">
                Toutes les étapes ont été exécutées avec succès. Votre œuvre numérique est prête à être exportée.
                Performance globale : <span className="text-green-600">Excellente</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
