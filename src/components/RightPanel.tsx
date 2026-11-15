import { useState } from "react";
import { Palette, Bug, ChevronDown, Copy, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../app/components/ui/tabs";
import { ScrollArea } from "../app/components/ui/scroll-area";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../app/components/ui/table";
import { Progress } from "../app/components/ui/progress";

interface ColorData {
  id: number;
  hex: string;
  count?: number;
}

interface ZoneData {
  id: number;
  color: string;
  pixels: number;
  percentage: number;
}

const extractedColors: ColorData[] = [
  { id: 1, hex: '#8B4513', count: 1245 },
  { id: 2, hex: '#A0522D', count: 987 },
  { id: 3, hex: '#CD853F', count: 856 },
  { id: 4, hex: '#DEB887', count: 743 },
  { id: 5, hex: '#D2691E', count: 698 },
  { id: 6, hex: '#87CEEB', count: 645 },
  { id: 7, hex: '#6495ED', count: 567 },
  { id: 8, hex: '#4682B4', count: 512 },
  { id: 9, hex: '#5F9EA0', count: 445 },
  { id: 10, hex: '#778899', count: 389 },
  { id: 11, hex: '#BC8F8F', count: 334 },
  { id: 12, hex: '#F4A460', count: 298 },
  { id: 13, hex: '#DAA520', count: 267 },
  { id: 14, hex: '#B8860B', count: 234 },
  { id: 15, hex: '#CD5C5C', count: 198 },
  { id: 16, hex: '#FA8072', count: 176 },
  { id: 17, hex: '#E9967A', count: 145 },
  { id: 18, hex: '#FFA07A', count: 123 },
  { id: 19, hex: '#FFB6C1', count: 98 },
  { id: 20, hex: '#FFE4E1', count: 87 },
];

const zoneData: ZoneData[] = [
  { id: 1, color: '#8B4513', pixels: 12450, percentage: 15.2 },
  { id: 2, color: '#A0522D', pixels: 9870, percentage: 12.1 },
  { id: 3, color: '#CD853F', pixels: 8560, percentage: 10.5 },
  { id: 4, color: '#DEB887', pixels: 7430, percentage: 9.1 },
  { id: 5, color: '#87CEEB', pixels: 6450, percentage: 7.9 },
];

export function RightPanel() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (hex: string, id: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Palette Section */}
      <div className="border-b border-slate-700">
        <div className="p-3 flex items-center gap-2 bg-slate-800/50">
          <Palette className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm text-white">Palette extraite</h3>
        </div>
        
        <ScrollArea className="h-48 p-3">
          <div className="grid grid-cols-5 gap-2">
            {extractedColors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleCopy(color.hex, color.id)}
                className="group relative aspect-square rounded border-2 border-slate-600 hover:border-teal-500 transition-all"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  {copiedId === color.id ? (
                    <Check className="w-3 h-3 text-white opacity-0 group-hover:opacity-100" />
                  ) : (
                    <Copy className="w-3 h-3 text-white opacity-0 group-hover:opacity-100" />
                  )}
                </div>
                <div className="absolute -top-1 -left-1 bg-slate-900 text-white text-[9px] px-1 rounded">
                  {color.id}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Debug Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-3 flex items-center gap-2 bg-slate-800/50 border-b border-slate-700">
          <Bug className="w-4 h-4 text-orange-400" />
          <h3 className="text-sm text-white">Mode Debug</h3>
        </div>

        <Tabs defaultValue="global" className="flex-1 flex flex-col">
          <TabsList className="bg-slate-700/50 border-b border-slate-700 rounded-none h-9 px-3">
            <TabsTrigger value="global" className="text-xs data-[state=active]:bg-slate-600 data-[state=active]:text-white">
              Vue globale
            </TabsTrigger>
            <TabsTrigger value="zones" className="text-xs data-[state=active]:bg-slate-600 data-[state=active]:text-white">
              Par zones
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-xs data-[state=active]:bg-slate-600 data-[state=active]:text-white">
              Par couleurs
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="global" className="m-0 p-3 space-y-3">
              <div className="bg-slate-700/50 border border-slate-600 rounded p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Zones détectées</span>
                  <span className="text-white">156</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Couleurs uniques</span>
                  <span className="text-white">32</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Taille moyenne zone</span>
                  <span className="text-white">524 px</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">ΔE moyen</span>
                  <span className="text-white">2.3</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-400">Pipeline d'analyse</p>
                <div className="space-y-2">
                  {[
                    { label: 'Chargement', time: '0.2s', progress: 100 },
                    { label: 'Extraction couleurs', time: '2.4s', progress: 100 },
                    { label: 'Détection contours', time: '3.1s', progress: 100 },
                    { label: 'Segmentation', time: '5.7s', progress: 100 },
                  ].map((step, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300">{step.label}</span>
                        <span className="text-gray-400">{step.time}</span>
                      </div>
                      <Progress value={step.progress} className="h-1 bg-slate-600" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="zones" className="m-0 p-0">
              <Table>
                <TableHeader className="bg-slate-700/50">
                  <TableRow className="border-slate-700 hover:bg-transparent">
                    <TableHead className="text-xs text-gray-400 h-8">#</TableHead>
                    <TableHead className="text-xs text-gray-400 h-8">Couleur</TableHead>
                    <TableHead className="text-xs text-gray-400 h-8">Pixels</TableHead>
                    <TableHead className="text-xs text-gray-400 h-8">%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zoneData.map((zone) => (
                    <TableRow key={zone.id} className="border-slate-700 hover:bg-slate-700/30">
                      <TableCell className="text-xs text-gray-300 py-2">{zone.id}</TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded border border-slate-600"
                            style={{ backgroundColor: zone.color }}
                          />
                          <span className="text-xs text-gray-400">{zone.color}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-gray-300 py-2">
                        {zone.pixels.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-xs text-teal-400 py-2">
                        {zone.percentage}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="colors" className="m-0 p-3 space-y-2">
              {extractedColors.slice(0, 10).map((color) => (
                <div
                  key={color.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-slate-700/30 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded border-2 border-slate-600"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex-1">
                    <div className="text-xs text-white">{color.hex}</div>
                    <div className="text-xs text-gray-400">#{color.id}</div>
                  </div>
                  <div className="text-xs text-gray-400">{color.count} px</div>
                </div>
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
