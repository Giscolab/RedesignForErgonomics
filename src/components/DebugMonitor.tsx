import { motion } from "motion/react";
import { Bug, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Progress } from "../app/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";
import { Badge } from "../app/components/ui/badge";

interface DebugEntry {
  id: number;
  step: string;
  duration: string;
  status: "success" | "warning" | "error";
  progress: number;
  memory: string;
  timestamp: string;
}

const debugData: DebugEntry[] = [
  { id: 1, step: "Image Loading", duration: "0.23s", status: "success", progress: 100, memory: "4.2 MB", timestamp: "10:23:15.234" },
  { id: 2, step: "Color Extraction", duration: "2.45s", status: "success", progress: 100, memory: "12.8 MB", timestamp: "10:23:17.684" },
  { id: 3, step: "Edge Detection", duration: "3.12s", status: "success", progress: 100, memory: "18.3 MB", timestamp: "10:23:20.804" },
  { id: 4, step: "Region Segmentation", duration: "5.67s", status: "warning", progress: 100, memory: "32.1 MB", timestamp: "10:23:26.474" },
  { id: 5, step: "Number Assignment", duration: "1.89s", status: "success", progress: 100, memory: "8.7 MB", timestamp: "10:23:28.364" },
  { id: 6, step: "Palette Optimization", duration: "2.21s", status: "success", progress: 100, memory: "6.4 MB", timestamp: "10:23:30.574" },
  { id: 7, step: "Contour Drawing", duration: "4.33s", status: "success", progress: 100, memory: "15.2 MB", timestamp: "10:23:34.904" },
  { id: 8, step: "Final Rendering", duration: "1.67s", status: "success", progress: 100, memory: "9.8 MB", timestamp: "10:23:36.574" },
];

export function DebugMonitor() {
  return (
    <div className="h-full hud-bg overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hud-panel neon-border p-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-400 rounded flex items-center justify-center">
            <Bug className="w-6 h-6 text-slate-900" />
          </div>
          <div className="flex-1">
            <h2 className="font-mono neon-text-teal">DEBUG MONITOR</h2>
            <p className="text-xs text-teal-400/60 font-mono">System Diagnostics & Performance Log</p>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-gray-400">TOTAL TIME</div>
            <div className="font-mono text-orange-400">17.57s</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: CheckCircle, label: "COMPLETED", value: "8/8", color: "green" },
          { icon: Clock, label: "AVG TIME", value: "2.69s", color: "teal" },
          { icon: AlertCircle, label: "WARNINGS", value: "1", color: "orange" },
          { icon: Bug, label: "ERRORS", value: "0", color: "red" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            green: "from-green-500 to-emerald-400 border-green-500/30 text-green-400",
            teal: "from-teal-500 to-cyan-400 border-teal-500/30 text-teal-400",
            orange: "from-orange-500 to-red-500 border-orange-500/30 text-orange-400",
            red: "from-red-500 to-rose-500 border-red-500/30 text-red-400",
          };
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`hud-panel border ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[1]} rounded-lg p-4`}
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[1].replace('border-', '')} rounded flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-slate-900" />
              </div>
              <div className="text-xs font-mono text-gray-400 mb-1">{stat.label}</div>
              <div className={`font-mono ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[2]}`}>{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Process Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hud-panel neon-border-orange rounded-lg overflow-hidden"
      >
        <div className="p-4 border-b border-orange-500/20">
          <h3 className="text-sm font-mono text-orange-400">PROCESS LOG</h3>
        </div>
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-orange-500/20 hover:bg-transparent">
                <TableHead className="text-xs font-mono text-teal-400">#</TableHead>
                <TableHead className="text-xs font-mono text-teal-400">STEP</TableHead>
                <TableHead className="text-xs font-mono text-teal-400">PROGRESS</TableHead>
                <TableHead className="text-xs font-mono text-teal-400">DURATION</TableHead>
                <TableHead className="text-xs font-mono text-teal-400">MEMORY</TableHead>
                <TableHead className="text-xs font-mono text-teal-400">STATUS</TableHead>
                <TableHead className="text-xs font-mono text-teal-400">TIMESTAMP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {debugData.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="border-orange-500/10 hover:bg-orange-500/5"
                >
                  <TableCell className="text-xs font-mono text-gray-400">{entry.id}</TableCell>
                  <TableCell className="text-xs font-mono text-gray-300">{entry.step}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={entry.progress} 
                        className="h-1.5 w-20 bg-slate-800"
                      />
                      <span className="text-xs font-mono text-teal-400">{entry.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-orange-400">{entry.duration}</TableCell>
                  <TableCell className="text-xs font-mono text-gray-400">{entry.memory}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={entry.status === "success" ? "default" : entry.status === "warning" ? "secondary" : "destructive"}
                      className={`text-xs font-mono ${
                        entry.status === "success" ? "bg-green-500/20 text-green-400 border-green-500/40" :
                        entry.status === "warning" ? "bg-orange-500/20 text-orange-400 border-orange-500/40" :
                        "bg-red-500/20 text-red-400 border-red-500/40"
                      }`}
                    >
                      {entry.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-gray-500">{entry.timestamp}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
}
