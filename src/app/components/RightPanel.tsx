import { useState } from "react";
import { Palette, Bug, Copy, Check, Lock, LockOpen, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { Progress } from "./ui/progress";

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
  const [lockedColors, setLockedColors] = useState<Set<number>>(new Set());
  const [hiddenColors, setHiddenColors] = useState<Set<number>>(new Set());

  const handleCopy = (hex: string, id: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLock = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLockedColors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleHide = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHiddenColors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const visibleColors = extractedColors.filter(c => !hiddenColors.has(c.id));

  return (
    <aside className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col" aria-label="Palette et diagnostics">
      {/* Palette Section */}
      <div className="border-b border-slate-700">
        <div className="p-3 flex items-center justify-between bg-slate-800/50">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-teal-400" aria-hidden="true" />
            <h3 className="text-sm text-white">Palette extraite</h3>
          </div>
          <span className="text-xs text-gray-400">{visibleColors.length} couleurs</span>
        </div>
        
        <ScrollArea className="h-48 p-3">
          <div className="grid grid-cols-5 gap-2">
            {visibleColors.map((color) => (
              <div
                key={color.id}
                className="group relative aspect-square rounded border-2 border-slate-600 hover:border-teal-500 transition-all overflow-hidden"
                style={{ backgroundColor: color.hex }}
              >
                {/* Numéro superposé */}
                <div className="absolute top-1 left-1 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                  #{color.id}
                </div>

                {/* Badge locked */}
                {lockedColors.has(color.id) && (
                  <div className="absolute top-1 right-1">
                    <Lock className="w-3 h-3 text-yellow-400" aria-label="Couleur verrouillée" />
                  </div>
                )}

                {/* Actions au hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-colors flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleCopy(color.hex, color.id)}
                    className="flex items-center gap-1 bg-teal-600 hover:bg-teal-500 text-white text-[10px] px-2 py-1 rounded"
                    aria-label={`Copier ${color.hex}`}
                  >
                    {copiedId === color.id ? (
                      <>
                        <Check className="w-3 h-3" aria-hidden="true" />
                        <span>Copié!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" aria-hidden="true" />
                        <span>HEX</span>
                      </>
                    )}
                  </button>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => toggleLock(color.id, e)}
                      className="bg-slate-600 hover:bg-slate-500 text-white p-1 rounded"
                      aria-label={lockedColors.has(color.id) ? "Déverrouiller" : "Verrouiller"}
                    >
                      {lockedColors.has(color.id) ? (
                        <Lock className="w-3 h-3" aria-hidden="true" />
                      ) : (
                        <LockOpen className="w-3 h-3" aria-hidden="true" />
                      )}
                    </button>
                    
                    <button
                      onClick={(e) => toggleHide(color.id, e)}
                      className="bg-slate-600 hover:bg-slate-500 text-white p-1 rounded"
                      aria-label="Masquer"
                    >
                      <EyeOff className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </div>
                  
                  <span className="text-white text-[9px] font-mono">{color.hex}</span>
                </div>
              </div>
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

              {/* Pipeline par phases avec stats P50/P95 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">Pipeline d'analyse</p>
                  <span className="text-xs text-teal-400">Total: 16.57 ms</span>
                </div>

                {/* Phase 1: Chargement */}
                <div className="bg-slate-700/30 border border-slate-600/50 rounded p-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">Phase 1: Chargement</span>
                    <span className="text-xs text-orange-400">0.23 ms (1.4%)</span>
                  </div>
                  <Progress value={100} className="h-1 bg-slate-600" />
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>P50: 0.21 ms</span>
                    <span>P95: 0.28 ms</span>
                  </div>
                </div>

                {/* Phase 2: Extraction */}
                <div className="bg-slate-700/30 border border-slate-600/50 rounded p-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">Phase 2: Extraction couleurs</span>
                    <span className="text-xs text-orange-400">2.45 ms (14.8%)</span>
                  </div>
                  <Progress value={100} className="h-1 bg-slate-600" />
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>P50: 2.31 ms</span>
                    <span>P95: 2.67 ms</span>
                  </div>
                </div>

                {/* Phase 3: Détection */}
                <div className="bg-slate-700/30 border border-slate-600/50 rounded p-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">Phase 3: Détection contours</span>
                    <span className="text-xs text-orange-400">3.12 ms (18.8%)</span>
                  </div>
                  <Progress value={100} className="h-1 bg-slate-600" />
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>P50: 2.98 ms</span>
                    <span>P95: 3.34 ms</span>
                  </div>
                </div>

                {/* Phase 4: Segmentation */}
                <div className="bg-slate-700/30 border border-slate-600/50 rounded p-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">Phase 4: Segmentation</span>
                    <span className="text-xs text-orange-400">5.67 ms (34.2%)</span>
                  </div>
                  <Progress value={100} className="h-1 bg-slate-600" />
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>P50: 5.45 ms</span>
                    <span>P95: 6.01 ms</span>
                  </div>
                </div>

                {/* Phase 5: Optimisation */}
                <div className="bg-slate-700/30 border border-slate-600/50 rounded p-2 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">Phase 5: Optimisation</span>
                    <span className="text-xs text-orange-400">5.10 ms (30.8%)</span>
                  </div>
                  <Progress value={100} className="h-1 bg-slate-600" />
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>P50: 4.89 ms</span>
                    <span>P95: 5.43 ms</span>
                  </div>
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
    </aside>
  );
}
