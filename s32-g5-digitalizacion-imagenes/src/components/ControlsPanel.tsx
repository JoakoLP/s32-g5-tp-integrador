import { FolderOpen, TestTube, Download, FileText } from 'lucide-react';
import type { ImageState } from '../hooks/useImageSystem';

interface ControlsPanelProps {
  state: ImageState;
  onFactorChange: (factor: number) => void;
  onBitDepthChange: (bits: number) => void;
  onFpsChange: (fps: number) => void;
  onUpload: (file: File) => void;
  onLoadPattern: () => void;
  onDownload: () => void;
  onExportReport: () => void;
}

export function ControlsPanel({
  state,
  onFactorChange,
  onBitDepthChange,
  onFpsChange,
  onUpload,
  onLoadPattern,
  onDownload,
  onExportReport
}: ControlsPanelProps) {
  return (
    <aside className="p-6 bg-[#141517] border-b lg:border-b-0 lg:border-r-2 border-[#2c2e31] flex flex-col gap-6 overflow-y-auto">
      
      {/* 1. Entrada Óptica */}
      <div className="flex flex-col gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#747a82] border-b border-[#2c2e31] pb-2 mb-1">
          1. Entrada Óptica
        </h2>
        
        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1f2124] hover:bg-[#27292d] border border-[#2c2e31] hover:border-[#4a4d53] text-[#e3e6eb] rounded cursor-pointer transition-colors font-semibold text-[13px]">
          <FolderOpen size={16} />
          <span>Importar Imagen</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
              if (e.target.files?.[0]) onUpload(e.target.files[0]);
            }}
          />
        </label>

        <button 
          onClick={onLoadPattern}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-transparent border border-dashed border-[#4a4d53] hover:border-[#747a82] hover:bg-[#18191b] text-[#e3e6eb] rounded transition-colors font-semibold text-[13px]"
        >
          <TestTube size={16} />
          <span>Cargar Patrón UTN FRLP</span>
        </button>
      </div>

      {/* 2. Muestreo Espacial */}
      <div className="flex flex-col gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#747a82] border-b border-[#2c2e31] pb-2 mb-1">
          2. Muestreo Espacial
        </h2>
        <label className="text-[10px] font-bold text-[#747a82] uppercase tracking-wider">
          Puntos por Grilla (Resolución)
        </label>
        <select 
          value={state.samplingFactor}
          onChange={(e) => onFactorChange(parseFloat(e.target.value))}
          className="font-mono text-[13px] bg-[#1c1e21] text-[#e3e6eb] border border-[#2c2e31] focus:border-[#ffaa00] rounded px-3 py-2.5 outline-none appearance-none cursor-pointer transition-colors"
          style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23747a82'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '10px' }}
        >
          <option value={1.0}>Física Original (100%)</option>
          <option value={0.5}>Matriz Alta (50%)</option>
          <option value={0.25}>Matriz Media (25%)</option>
          <option value={0.125}>Matriz Retro (12.5%)</option>
          <option value={0.0625}>Matriz Baja (6.25%)</option>
          <option value={0.03125}>Umbral Crítico Nyquist (3.12%)</option>
        </select>
      </div>

      {/* 3. Cuantización Cromática */}
      <div className="flex flex-col gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#747a82] border-b border-[#2c2e31] pb-2 mb-1">
          3. Cuantización Cromática
        </h2>
        <label className="text-[10px] font-bold text-[#747a82] uppercase tracking-wider">
          Bits de Amplitud (Color)
        </label>
        <select 
          value={state.bitDepth}
          onChange={(e) => onBitDepthChange(parseInt(e.target.value))}
          className="font-mono text-[13px] bg-[#1c1e21] text-[#e3e6eb] border border-[#2c2e31] focus:border-[#ffaa00] rounded px-3 py-2.5 outline-none appearance-none cursor-pointer transition-colors"
          style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23747a82'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '10px' }}
        >
          <option value={24}>24 bits (True Color - RGB888)</option>
          <option value={12}>12 bits (4096 Colores - RGB444)</option>
          <option value={8}>8 bits (256 Colores - R3G3B2)</option>
          <option value={3}>3 bits (8 Colores Básicos)</option>
          <option value={1}>1 bit (Monocromático Blanco/Negro)</option>
        </select>
      </div>

      {/* 4. Parámetros de Canal */}
      <div className="flex flex-col gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#747a82] border-b border-[#2c2e31] pb-2 mb-1">
          4. Parámetros de Canal
        </h2>
        
        <div className="bg-[#0c0d0e] border border-[#2c2e31] rounded p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-[#747a82] uppercase tracking-wider">Matriz Discreta</span>
            <span className="font-mono text-[13px] font-bold text-[#ffaa00]">{state.pixelResolution.w} x {state.pixelResolution.h} px</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-[#747a82] uppercase tracking-wider">Resolución Efectiva</span>
            <span className="font-mono text-[13px] font-bold text-[#ffaa00]">{state.totalPixels.toLocaleString()} px</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between text-[10px] text-[#747a82] uppercase font-bold tracking-wider">
            <span>Tasa de Muestreo de Video</span>
            <span>{state.fps} FPS</span>
          </div>
          <input 
            type="range" 
            min="1" max="60" step="1" 
            value={state.fps}
            onChange={(e) => onFpsChange(parseInt(e.target.value))}
            className="w-full h-1 bg-[#2c2e31] rounded outline-none appearance-none cursor-pointer"
            style={{ accentColor: '#e3e6eb' }}
          />
        </div>

        <div className="bg-[#0c0d0e] border border-[#2c2e31] rounded p-4 flex flex-col gap-3 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-[#747a82] uppercase tracking-wider">Tasa de Bits ($R$)</span>
            <span className="font-mono text-[14px] font-bold text-[#00e676]">{state.transmissionMbps.toFixed(3)} Mbps</span>
          </div>
        </div>
      </div>

      {/* Acciones de Exportación */}
      <div className="flex flex-col gap-3 mt-auto pt-6">
        <button 
          onClick={onDownload}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[rgba(0,176,255,0.05)] hover:bg-[rgba(0,176,255,0.12)] border border-[#00b0ff] text-[#00b0ff] rounded transition-colors font-semibold text-[13px]"
        >
          <Download size={16} />
          <span>Descargar Digitalización</span>
        </button>
        <button 
          onClick={onExportReport}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1f2124] hover:bg-[#27292d] border border-[#2c2e31] hover:border-[#4a4d53] text-[#e3e6eb] rounded transition-colors font-semibold text-[11px]"
        >
          <FileText size={14} />
          <span>Exportar Reporte (.TXT)</span>
        </button>
      </div>

    </aside>
  );
}
