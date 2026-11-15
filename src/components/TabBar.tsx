import { Image, Palette, Grid3x3, Hash, ArrowLeftRight, Activity } from "lucide-react";
import { Button } from "./ui/button";

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface TabBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'original', label: 'Original', icon: Image },
  { id: 'colorise', label: 'Colorisé', icon: Palette },
  { id: 'contours', label: 'Contours', icon: Grid3x3 },
  { id: 'numerote', label: 'Numéroté', icon: Hash },
  { id: 'comparer', label: 'Comparer', icon: ArrowLeftRight },
  { id: 'profiler', label: 'Profiler', icon: Activity },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-2 gap-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              h-8 px-3 rounded flex items-center gap-2 text-xs transition-colors
              ${isActive 
                ? 'bg-slate-700 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        );
      })}
      
      <div className="ml-auto">
        <Button 
          className="h-8 text-xs bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white gap-2"
        >
          🎨 Générer le modèle
        </Button>
      </div>
    </div>
  );
}
