import { motion } from "motion/react";
import { Activity, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { step: "Load", time: 0.23, memory: 4.2 },
  { step: "Extract", time: 2.45, memory: 12.8 },
  { step: "Detect", time: 3.12, memory: 18.3 },
  { step: "Segment", time: 5.67, memory: 32.1 },
  { step: "Assign", time: 1.89, memory: 8.7 },
  { step: "Optimize", time: 2.21, memory: 6.4 },
  { step: "Render", time: 1.67, memory: 9.8 },
];

const cpuData = [
  { time: "0s", cpu: 45 },
  { time: "2s", cpu: 78 },
  { time: "4s", cpu: 92 },
  { time: "6s", cpu: 87 },
  { time: "8s", cpu: 65 },
  { time: "10s", cpu: 54 },
  { time: "12s", cpu: 48 },
  { time: "14s", cpu: 42 },
  { time: "16s", cpu: 38 },
];

export function PerformanceMonitor() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <div className="hud-panel neon-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-teal-400" />
          <h3 className="font-mono text-sm neon-text-teal">PERFORMANCE MONITOR</h3>
        </div>
        <p className="text-xs text-teal-400/60 font-mono">Real-time Analytics</p>
      </div>

      {/* Processing Time Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hud-panel neon-border-orange rounded-lg p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-orange-400" />
          <h4 className="text-xs font-mono text-orange-400">PROCESSING TIME</h4>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
            <XAxis 
              dataKey="step" 
              stroke="#00D9FF" 
              style={{ fontSize: '10px', fontFamily: 'monospace' }}
            />
            <YAxis 
              stroke="#00D9FF" 
              style={{ fontSize: '10px', fontFamily: 'monospace' }}
              label={{ value: 'Time (s)', angle: -90, position: 'insideLeft', style: { fill: '#00D9FF', fontSize: '10px' } }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(15, 23, 42, 0.95)', 
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'monospace'
              }}
              labelStyle={{ color: '#00D9FF' }}
            />
            <Bar dataKey="time" fill="#FF6B35" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Memory Usage Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hud-panel neon-border-orange rounded-lg p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-orange-400" />
          <h4 className="text-xs font-mono text-orange-400">MEMORY USAGE</h4>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
            <XAxis 
              dataKey="step" 
              stroke="#00D9FF" 
              style={{ fontSize: '10px', fontFamily: 'monospace' }}
            />
            <YAxis 
              stroke="#00D9FF" 
              style={{ fontSize: '10px', fontFamily: 'monospace' }}
              label={{ value: 'MB', angle: -90, position: 'insideLeft', style: { fill: '#00D9FF', fontSize: '10px' } }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(15, 23, 42, 0.95)', 
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'monospace'
              }}
              labelStyle={{ color: '#00D9FF' }}
            />
            <Line 
              type="monotone" 
              dataKey="memory" 
              stroke="#00D9FF" 
              strokeWidth={2}
              dot={{ fill: '#00D9FF', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* CPU Usage Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hud-panel neon-border-orange rounded-lg p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-orange-400" />
          <h4 className="text-xs font-mono text-orange-400">CPU UTILIZATION</h4>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={cpuData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="#00D9FF" 
              style={{ fontSize: '10px', fontFamily: 'monospace' }}
            />
            <YAxis 
              stroke="#00D9FF" 
              style={{ fontSize: '10px', fontFamily: 'monospace' }}
              label={{ value: '%', angle: -90, position: 'insideLeft', style: { fill: '#00D9FF', fontSize: '10px' } }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(15, 23, 42, 0.95)', 
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '4px',
                fontSize: '11px',
                fontFamily: 'monospace'
              }}
              labelStyle={{ color: '#00D9FF' }}
            />
            <Line 
              type="monotone" 
              dataKey="cpu" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
