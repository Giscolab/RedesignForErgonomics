import { 
  MousePointer2, 
  Hand, 
  ZoomIn, 
  Paintbrush, 
  Eraser, 
  Move,
  Droplet,
  Type
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../app/components/ui/tooltip";
import { useState } from "react";

interface Tool {
  id: string;
  icon: React.ElementType;
  label: string;
  shortcut: string;
}

const tools: Tool[] = [
  { id: 'select', icon: MousePointer2, label: 'Sélection', shortcut: 'V' },
  { id: 'move', icon: Move, label: 'Déplacer', shortcut: 'M' },
  { id: 'hand', icon: Hand, label: 'Main', shortcut: 'H' },
  { id: 'zoom', icon: ZoomIn, label: 'Zoom', shortcut: 'Z' },
  { id: 'brush', icon: Paintbrush, label: 'Pinceau', shortcut: 'B' },
  { id: 'eraser', icon: Eraser, label: 'Gomme', shortcut: 'E' },
  { id: 'fill', icon: Droplet, label: 'Remplissage', shortcut: 'G' },
  { id: 'text', icon: Type, label: 'Texte', shortcut: 'T' },
];

export function VerticalToolbar() {
  const [activeTool, setActiveTool] = useState('select');

  return (
    <div className="w-12 bg-slate-800 border-r border-slate-700 flex flex-col items-center py-2 gap-1">
      <TooltipProvider delayDuration={300}>
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          
          return (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTool(tool.id)}
                  className={`
                    w-9 h-9 rounded flex items-center justify-center transition-colors
                    ${isActive 
                      ? 'bg-slate-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-slate-700'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-700 border-slate-600 text-xs">
                <p>{tool.label}</p>
                <p className="text-gray-400">({tool.shortcut})</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
