import { useState } from 'react';
import { useImageSystem } from './hooks/useImageSystem';
import { Header } from './components/Header';
import { ControlsPanel } from './components/ControlsPanel';
import { ViewportPanel } from './components/ViewportPanel';
import { TheoryPage } from './components/TheoryPage';

export default function App() {
  const { state, setState, refs, actions } = useImageSystem();
  const [currentView, setCurrentView] = useState<'simulator' | 'theory'>('simulator');

  return (
    <div className="w-full h-screen bg-[#161719] flex flex-col overflow-hidden font-sans">
      
      <Header 
        currentView={currentView}
        onToggleView={() => setCurrentView(currentView === 'simulator' ? 'theory' : 'simulator')}
      />

      {/* Renderizado condicional del simulador interactivo o la pagina de teoria */}
      {currentView === 'simulator' ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[340px_1fr] overflow-hidden">
          
          {/* Panel lateral con los controles de parametros para el experimento */}
          <ControlsPanel 
            state={state}
            onFactorChange={(f) => setState(s => ({ ...s, samplingFactor: f }))}
            onBitDepthChange={(b) => setState(s => ({ ...s, bitDepth: b }))}
            onFpsChange={(f) => setState(s => ({ ...s, fps: f }))}
            onUpload={actions.handleFileUpload}
            onLoadPattern={actions.loadUTNPattern}
            onDownload={actions.downloadDigitalImage}
            onExportReport={actions.exportReport}
          />

          <ViewportPanel 
            state={state}
            analogRef={refs.analogCanvasRef}
            digitalRef={refs.digitalCanvasRef}
          />
          
        </div>
      ) : (
        <TheoryPage />
      )}
      
    </div>
  );
}
