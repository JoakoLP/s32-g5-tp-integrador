import { Code, Activity } from 'lucide-react';

interface HeaderProps {
  currentView: 'simulator' | 'theory';
  onToggleView: () => void;
}

export function Header({ currentView, onToggleView }: HeaderProps) {
  return (
    <header className="px-6 py-4 bg-[#0f1011] border-b-2 border-[#2c2e31] flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#ffaa00] shadow-[0_0_8px_#ffaa00]"></span>
          <h1 className="font-mono text-[13px] uppercase tracking-[0.15em] font-bold text-[#e3e6eb]">
            Módulo de Análisis y Digitalización Óptica // VDC-400
          </h1>
        </div>
        <button
          onClick={onToggleView}
          className="ml-4 px-3 py-1 bg-[#1f2124] hover:bg-[#27292d] border border-[#2c2e31] hover:border-[#4a4d53] text-xs text-[#e3e6eb] rounded font-mono uppercase tracking-wider transition-colors"
        >
          {currentView === 'simulator' ? '📖 Ver Apuntes Teóricos' : '🔬 Volver al Simulador'}
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="font-mono text-[11px] text-[#747a82] tracking-[0.05em]">
          UTN-FRLP // COMUNICACIÓN DE DATOS
        </div>
        
        <div className="flex items-center gap-2">
          <a 
            href="https://github.com/JoakoLP/s32-g5-tp-integrador" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-[#18191b] hover:bg-[#1f2124] border border-[#2c2e31] hover:border-[#4a4d53] text-[#e3e6eb] rounded transition-colors"
            title="Ver Repositorio en GitHub"
          >
            <Code size={14} />
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">GitHub</span>
          </a>

          <a 
            href="https://adc-cdd.joaquintakara.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-[#18191b] hover:bg-[#1f2124] border border-[#2c2e31] hover:border-[#4a4d53] text-[#e3e6eb] rounded transition-colors"
            title="Ver Simulador de Audio"
          >
            <Activity size={14} />
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold">App Audio</span>
          </a>
        </div>
      </div>
    </header>
  );
}
