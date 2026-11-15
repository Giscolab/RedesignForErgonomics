import { motion } from "motion/react";
import { Image, Palette, Grid3x3, Hash, ArrowLeftRight, Activity, Bug } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface NotebookTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function NotebookTabs({ tabs, activeTab, onTabChange }: NotebookTabsProps) {
  return (
    <div className="flex items-end gap-1 px-6 pt-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-4 py-2.5 rounded-t-xl transition-all
              ${isActive 
                ? 'notebook-tab-active text-gray-900 -mb-px' 
                : 'notebook-tab text-gray-600 hover:text-gray-900 mb-0'
              }
            `}
            whileHover={{ y: isActive ? 0 : -2 }}
            whileTap={{ y: 0 }}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </div>
            
            {/* Tab corner fold effect */}
            {isActive && (
              <>
                <div className="absolute top-0 right-0 w-3 h-3 overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-full bg-amber-900/5 transform rotate-45 origin-top-right" />
                </div>
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
                />
              </>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
