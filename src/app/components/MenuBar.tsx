import { 
  Menu, 
  ChevronDown,
  Maximize2,
  Minimize2,
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function MenuBar() {
  return (
    <div className="h-10 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-2">
      {/* Left - Menus */}
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-300 hover:text-white hover:bg-slate-800">
              Fichier
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Nouveau...
              <span className="ml-auto text-xs text-gray-500">Ctrl+N</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Ouvrir une image...
              <span className="ml-auto text-xs text-gray-500">Ctrl+O</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Enregistrer
              <span className="ml-auto text-xs text-gray-500">Ctrl+S</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Enregistrer sous...
              <span className="ml-auto text-xs text-gray-500">Ctrl+Shift+S</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Exporter...
              <span className="ml-auto text-xs text-gray-500">Ctrl+E</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-300 hover:text-white hover:bg-slate-800">
              Édition
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Annuler
              <span className="ml-auto text-xs text-gray-500">Ctrl+Z</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Rétablir
              <span className="ml-auto text-xs text-gray-500">Ctrl+Shift+Z</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Préférences...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-300 hover:text-white hover:bg-slate-800">
              Affichage
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Zoom avant
              <span className="ml-auto text-xs text-gray-500">Ctrl++</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Zoom arrière
              <span className="ml-auto text-xs text-gray-500">Ctrl+-</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Taille réelle
              <span className="ml-auto text-xs text-gray-500">Ctrl+0</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-300 hover:text-white hover:bg-slate-800">
              Espace de travail
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Par défaut
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Analyse
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Debug
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Réinitialiser
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-300 hover:text-white hover:bg-slate-800">
              Aide
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Documentation
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              Raccourcis clavier
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-xs text-gray-300 hover:text-white">
              À propos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center - Title */}
      <div className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-400">
        Image2Canvas Pro
      </div>

      {/* Right - Window controls */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white hover:bg-slate-800">
          <Minimize2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white hover:bg-slate-800">
          <Maximize2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-red-500/10">
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
