import { useState } from "react";
import { MenuBar } from "./components/MenuBar";
import { TabBar } from "./components/TabBar";
import { VerticalToolbar } from "./components/VerticalToolbar";
import { LeftPanel } from "./components/LeftPanel";
import { CanvasWorkspace } from "./components/CanvasWorkspace";
import { RightPanel } from "./components/RightPanel";

export default function App() {
  const [activeTab, setActiveTab] = useState('original');
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-gray-100">
      {/* Top Menu Bar */}
      <MenuBar />
      
      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Vertical Toolbar */}
        <VerticalToolbar />
        
        {/* Left Panel (Collapsible) */}
        <div className="relative">
          <LeftPanel 
            isOpen={isLeftPanelOpen} 
            onToggle={() => setIsLeftPanelOpen(!isLeftPanelOpen)} 
          />
        </div>
        
        {/* Canvas Workspace */}
        <CanvasWorkspace activeTab={activeTab} />
        
        {/* Right Panel */}
        <RightPanel />
      </div>
    </div>
  );
}
