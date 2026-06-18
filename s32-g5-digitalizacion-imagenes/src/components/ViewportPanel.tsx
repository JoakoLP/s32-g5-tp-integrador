import React from 'react';
import type { ImageState } from '../hooks/useImageSystem';

interface ViewportPanelProps {
  state: ImageState;
  analogRef: React.RefObject<HTMLCanvasElement | null>;
  digitalRef: React.RefObject<HTMLCanvasElement | null>;
}

export function ViewportPanel({ state, analogRef, digitalRef }: ViewportPanelProps) {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#121315] overflow-y-auto">
      
      {/* Espectro Analógico (Original) */}
      <section className="bg-[#0b0c0d] border border-[#2c2e31] rounded flex flex-col justify-between p-4 h-full">
        <div className="flex justify-between items-center mb-3 border-b border-[#1a1c1e] pb-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#747a82] font-medium">
            Señal Óptica Continua (Original)
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#00e676]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]"></span>
            Espectro Total
          </span>
        </div>
        
        <div className="w-full aspect-[4/3] bg-[#060708] border border-[#191b1d] rounded-sm flex items-center justify-center relative overflow-hidden mb-4">
          <canvas ref={analogRef} className="max-w-full max-h-full object-contain" />
        </div>
        
        <div className="bg-[#141517] border border-[#202225] rounded p-2.5 flex justify-between items-center mt-auto">
          <span className="text-[10px] text-[#747a82] uppercase font-semibold tracking-wider">Tamaño del archivo</span>
          <span className="font-mono text-[13px] font-bold text-[#00e676]">{formatSize(state.loadedFileSize)}</span>
        </div>
      </section>

      {/* Espectro Digital (Procesado) */}
      <section className="bg-[#0b0c0d] border border-[#2c2e31] rounded flex flex-col justify-between p-4 h-full">
        <div className="flex justify-between items-center mb-3 border-b border-[#1a1c1e] pb-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#747a82] font-medium">
            Señal Óptica Discreta (Digitalizada)
          </span>
          <div className="flex items-center gap-2">
            {state.isAliasing && (
              <span className="bg-[rgba(255,170,0,0.1)] text-[#ffaa00] border border-[#ffaa00] px-1.5 py-0.5 rounded-sm font-mono text-[9px] font-bold tracking-wider">
                ALIASING
              </span>
            )}
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#ffaa00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa00]"></span>
              Muestra Cuantizada
            </span>
          </div>
        </div>
        
        <div className="w-full aspect-[4/3] bg-[#060708] border border-[#191b1d] rounded-sm flex items-center justify-center relative overflow-hidden mb-4">
          <canvas ref={digitalRef} className="max-w-full max-h-full object-contain" />
        </div>
        
        <div className="bg-[#141517] border border-[#202225] rounded p-2.5 flex justify-between items-center mt-auto">
          <span className="text-[10px] text-[#747a82] uppercase font-semibold tracking-wider">Volumen RAW Calculado ($V$)</span>
          <span className="font-mono text-[13px] font-bold text-[#ffaa00]">{formatSize(state.rawBytes)}</span>
        </div>
      </section>

    </main>
  );
}
