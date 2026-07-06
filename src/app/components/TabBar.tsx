import { useEffect } from "react";
import { Image, Palette, Grid3x3, Hash, ArrowLeftRight, Activity } from "lucide-react";
import { StickyGenerateButton } from "./StickyGenerateButton";

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
  // Navigation clavier ← → pour les onglets
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        if (currentIndex === -1) return;
        
        let newIndex;
        if (e.key === 'ArrowLeft') {
          newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        } else {
          newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
        }
        
        onTabChange(tabs[newIndex].id);
        // Focus sur le nouveau tab
        document.querySelector(`[data-tab-id="${tabs[newIndex].id}"]`)?.focus();
      }
    };

    const tablist = document.querySelector('[role="tablist"]');
    if (tablist) {
      tablist.addEventListener('keydown', handleKeyDown as any);
      return () => tablist.removeEventListener('keydown', handleKeyDown as any);
    }
  }, [activeTab, onTabChange]);

  return (
    <nav 
      className="h-10 bg-slate-800 border-b border-slate-700 flex items-center px-2 gap-1"
      aria-label="Navigation des vues"
    >
      <div 
        role="tablist" 
        aria-label="Modes de visualisation"
        className="flex items-center gap-1"
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              className={`
                h-8 px-3 rounded flex items-center gap-2 text-xs transition-colors
                ${isActive 
                  ? 'bg-slate-700 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>
      
      <div className="ml-auto">
        <StickyGenerateButton />
      </div>
    </nav>
  );
}
