import { useState } from "react";
import { Sparkles, Loader2, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

type GenerateState = 'ready' | 'processing' | 'completed';

export function StickyGenerateButton() {
  const [state, setState] = useState<GenerateState>('ready');

  const handleGenerate = () => {
    setState('processing');
    // Simulation du traitement
    setTimeout(() => {
      setState('completed');
      setTimeout(() => setState('ready'), 3000);
    }, 5000);
  };

  const stateConfig = {
    ready: {
      icon: Sparkles,
      label: "Générer le modèle",
      className: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
      disabled: false,
    },
    processing: {
      icon: Loader2,
      label: "Génération en cours...",
      className: "bg-orange-600 hover:bg-orange-600",
      disabled: true,
    },
    completed: {
      icon: CheckCircle,
      label: "Terminé !",
      className: "bg-green-600 hover:bg-green-600",
      disabled: true,
    },
  };

  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky right-0"
    >
      <Button
        onClick={handleGenerate}
        disabled={config.disabled}
        className={`h-8 text-xs text-white gap-2 ${config.className} transition-all`}
        aria-live="polite"
        aria-label={config.label}
      >
        <Icon className={`w-4 h-4 ${state === 'processing' ? 'animate-spin' : ''}`} />
        {config.label}
      </Button>
    </motion.div>
  );
}
