import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowUpDown, Search, Filter } from "lucide-react";

interface DebugEntry {
  id: number;
  step: string;
  duration: string;
  status: "success" | "warning" | "error";
  memory: string;
  timestamp: string;
}

const debugData: DebugEntry[] = [
  { id: 1, step: "Image Loading", duration: "0.23s", status: "success", memory: "4.2 MB", timestamp: "10:23:15" },
  { id: 2, step: "Color Extraction", duration: "2.45s", status: "success", memory: "12.8 MB", timestamp: "10:23:17" },
  { id: 3, step: "Edge Detection", duration: "3.12s", status: "success", memory: "18.3 MB", timestamp: "10:23:20" },
  { id: 4, step: "Region Segmentation", duration: "5.67s", status: "warning", memory: "32.1 MB", timestamp: "10:23:26" },
  { id: 5, step: "Number Assignment", duration: "1.89s", status: "success", memory: "8.7 MB", timestamp: "10:23:28" },
  { id: 6, step: "Palette Optimization", duration: "2.21s", status: "success", memory: "6.4 MB", timestamp: "10:23:30" },
  { id: 7, step: "Contour Drawing", duration: "4.33s", status: "success", memory: "15.2 MB", timestamp: "10:23:34" },
  { id: 8, step: "Final Rendering", duration: "1.67s", status: "success", memory: "9.8 MB", timestamp: "10:23:36" },
];

export function DebugTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof DebugEntry | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof DebugEntry) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredData = debugData.filter((entry) =>
    entry.step.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = sortKey
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (sortOrder === "asc") {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      })
    : filteredData;

  const getStatusBadge = (status: DebugEntry["status"]) => {
    const variants: Record<DebugEntry["status"], { variant: "default" | "secondary" | "destructive"; label: string }> = {
      success: { variant: "default", label: "Succès" },
      warning: { variant: "secondary", label: "Attention" },
      error: { variant: "destructive", label: "Erreur" },
    };
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900">Journal de debug</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrer
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher une étape..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("step")}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Étape
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("duration")}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Durée
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("memory")}
                  className="flex items-center gap-1 hover:text-gray-900"
                >
                  Mémoire
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="text-gray-500">{entry.id}</TableCell>
                <TableCell>{entry.step}</TableCell>
                <TableCell>{entry.duration}</TableCell>
                <TableCell>{getStatusBadge(entry.status)}</TableCell>
                <TableCell>{entry.memory}</TableCell>
                <TableCell className="text-gray-500">{entry.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t text-sm text-gray-600">
        Affichage de {sortedData.length} sur {debugData.length} entrées
      </div>
    </div>
  );
}
