import { useState, useEffect, useRef, useCallback } from 'react';

export interface ImageState {
  imageSrc: string | null;
  loadedFileSize: number; // Bytes
  samplingFactor: number; // 1.0 to 0.03125
  bitDepth: number; // 24 to 1
  fps: number; // 1 to 60
  
  pixelResolution: { w: number, h: number };
  totalPixels: number;
  rawBytes: number;
  transmissionMbps: number;
  isAliasing: boolean;
}

export function useImageSystem() {
  const analogCanvasRef = useRef<HTMLCanvasElement>(null);
  const digitalCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageObjRef = useRef<HTMLImageElement>(new Image());

  const [state, setState] = useState<ImageState>({
    imageSrc: null,
    loadedFileSize: 0,
    samplingFactor: 0.125,
    bitDepth: 24,
    fps: 25,
    pixelResolution: { w: 0, h: 0 },
    totalPixels: 0,
    rawBytes: 0,
    transmissionMbps: 0,
    isAliasing: false,
  });

  // Generar Patrón UTN
  const loadUTNPattern = useCallback(() => {
    const testCanvas = document.createElement('canvas');
    testCanvas.width = 800;
    testCanvas.height = 600;
    const tCtx = testCanvas.getContext('2d');
    if (!tCtx) return;

    const bgGrad = tCtx.createLinearGradient(0, 0, 800, 600);
    bgGrad.addColorStop(0, '#0d0e10');
    bgGrad.addColorStop(1, '#00e676');
    tCtx.fillStyle = bgGrad;
    tCtx.fillRect(0, 0, 800, 600);

    const bars = ['#ffffff', '#ffff00', '#00ffff', '#00ff00', '#ff00ff', '#ff0000', '#0000ff', '#000000'];
    const barWidth = 800 / bars.length;
    for (let i = 0; i < bars.length; i++) {
      tCtx.fillStyle = bars[i];
      tCtx.fillRect(i * barWidth, 60, barWidth, 240);
    }

    tCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    tCtx.lineWidth = 1;
    const spacing = 20;
    for (let x = 0; x < 800; x += spacing) {
      tCtx.beginPath(); tCtx.moveTo(x, 0); tCtx.lineTo(x, 600); tCtx.stroke();
    }
    for (let y = 0; y < 600; y += spacing) {
      tCtx.beginPath(); tCtx.moveTo(0, y); tCtx.lineTo(800, y); tCtx.stroke();
    }

    tCtx.strokeStyle = '#ffffff';
    tCtx.lineWidth = 3;
    tCtx.beginPath(); tCtx.arc(400, 300, 120, 0, 2 * Math.PI); tCtx.stroke();

    tCtx.strokeStyle = '#ffaa00';
    tCtx.lineWidth = 2;
    tCtx.beginPath();
    tCtx.moveTo(400, 0); tCtx.lineTo(400, 600);
    tCtx.moveTo(0, 300); tCtx.lineTo(800, 300);
    tCtx.stroke();

    tCtx.fillStyle = '#ffffff';
    tCtx.font = 'bold 24px "JetBrains Mono", monospace';
    tCtx.textAlign = 'center';
    tCtx.fillText('UTN FRLP - CÁTEDRA COMUNICACIONES', 400, 520);

    const dataUrl = testCanvas.toDataURL();
    setState(s => ({ ...s, imageSrc: dataUrl, loadedFileSize: 134 * 1024 }));
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setState(s => ({ 
          ...s, 
          imageSrc: e.target!.result as string, 
          loadedFileSize: file.size 
        }));
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // Motor de Digitalización
  useEffect(() => {
    const processImage = () => {
      const img = imageObjRef.current;
      if (!img.src || !analogCanvasRef.current || !digitalCanvasRef.current) return;

      const analogCanvas = analogCanvasRef.current;
      const digitalCanvas = digitalCanvasRef.current;
      const ctxAnalog = analogCanvas.getContext('2d');
      const ctxDigital = digitalCanvas.getContext('2d', { willReadFrequently: true });
      if (!ctxAnalog || !ctxDigital) return;

      const aspectRatio = img.width / img.height;
      const viewWidth = 800;
      const viewHeight = Math.round(viewWidth / aspectRatio);

      analogCanvas.width = viewWidth;
      analogCanvas.height = viewHeight;
      ctxAnalog.drawImage(img, 0, 0, viewWidth, viewHeight);

      const factorMuestreo = state.samplingFactor;
      const bitsAmplitud = state.bitDepth;

      const sampleW = Math.max(1, Math.round(viewWidth * factorMuestreo));
      const sampleH = Math.max(1, Math.round(viewHeight * factorMuestreo));

      const auxCanvas = document.createElement('canvas');
      auxCanvas.width = sampleW;
      auxCanvas.height = sampleH;
      const auxCtx = auxCanvas.getContext('2d', { willReadFrequently: true });
      if (!auxCtx) return;

      auxCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = auxCtx.getImageData(0, 0, sampleW, sampleH);
      const pixels = imgData.data;

      for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i+1];
        let b = pixels[i+2];

        if (bitsAmplitud === 12) {
          r = Math.round(r / 17) * 17;
          g = Math.round(g / 17) * 17;
          b = Math.round(b / 17) * 17;
        } else if (bitsAmplitud === 8) {
          r = Math.round(r / 255 * 7) * (255 / 7);
          g = Math.round(g / 255 * 7) * (255 / 7);
          b = Math.round(b / 255 * 3) * (255 / 3);
        } else if (bitsAmplitud === 3) {
          r = r > 127 ? 255 : 0;
          g = g > 127 ? 255 : 0;
          b = b > 127 ? 255 : 0;
        } else if (bitsAmplitud === 1) {
          const gray = 0.299*r + 0.587*g + 0.114*b;
          const val = gray > 127 ? 255 : 0;
          r = val; g = val; b = val;
        }

        pixels[i] = r;
        pixels[i+1] = g;
        pixels[i+2] = b;
      }

      auxCtx.putImageData(imgData, 0, 0);

      digitalCanvas.width = viewWidth;
      digitalCanvas.height = viewHeight;

      ctxDigital.imageSmoothingEnabled = false;
      // @ts-expect-error browser compat
      ctxDigital.mozImageSmoothingEnabled = false;
      // @ts-expect-error browser compat
      ctxDigital.webkitImageSmoothingEnabled = false;
      // @ts-expect-error browser compat
      ctxDigital.msImageSmoothingEnabled = false;

      ctxDigital.drawImage(auxCanvas, 0, 0, viewWidth, viewHeight);

      const rawBytes = sampleW * sampleH * (bitsAmplitud / 8);
      const bps = rawBytes * 8 * state.fps;
      const mbps = bps / 1_000_000;

      setState(s => ({
        ...s,
        pixelResolution: { w: sampleW, h: sampleH },
        totalPixels: sampleW * sampleH,
        rawBytes,
        transmissionMbps: mbps,
        isAliasing: factorMuestreo <= 0.125
      }));
    };

    if (state.imageSrc) {
      if (imageObjRef.current.src !== state.imageSrc) {
        imageObjRef.current.src = state.imageSrc;
        imageObjRef.current.onload = processImage;
      } else {
        processImage();
      }
    }
  }, [state.imageSrc, state.samplingFactor, state.bitDepth, state.fps]);

  useEffect(() => {
    loadUTNPattern();
  }, [loadUTNPattern]);

  const downloadDigitalImage = () => {
    if (!digitalCanvasRef.current) return;
    const tempLink = document.createElement('a');
    tempLink.download = 'imagen_digitalizada_utn.png';
    tempLink.href = digitalCanvasRef.current.toDataURL('image/png');
    tempLink.click();
  };

  const exportReport = () => {
    if (!analogCanvasRef.current) return;
    const w = state.pixelResolution.w;
    const h = state.pixelResolution.h;
    
    const reporteText = `===========================================================
    REPORTE TÉCNICO DE LABORATORIO: CONVERSIÓN ANALÓGICO-DIGITAL (ÓPTICA)
    CÁTEDRA DE COMUNICACIÓN DE DATOS - UTN FRLP
===========================================================

1. PARÁMETROS DEL MUESTREO ESPACIAL:
   - Factor de Muestreo: ${(state.samplingFactor * 100).toFixed(2)} %
   - Dimensiones de la Matriz Discreta: ${w} x ${h} píxeles
   - Cantidad de Puntos de Muestra (N): ${state.totalPixels.toLocaleString()} puntos

2. PARÁMETROS DE LA CUANTIZACIÓN CROMÁTICA:
   - Profundidad de Color (b): ${state.bitDepth} bits/píxel
   - Niveles de Cuantización (L = 2^b): ${Math.pow(2, state.bitDepth)} niveles por canal

3. CÁLCULO DE VOLUMEN DE ALMACENAMIENTO (TP1):
   - Fórmula: V = Ancho x Alto x (Bits de Color / 8) [Bytes]
   - Volumen RAW Calculado: ${state.rawBytes.toFixed(2)} Bytes

4. EVALUACIÓN DE TRANSMISIÓN DE FLUJO CONTINUO (TP4):
   - Tasa de Refresco de Video: ${state.fps} FPS
   - Fórmula de Tasa de Bits: R = V [Bytes] x 8 [bits/byte] x FPS
   - Ancho de Banda Efectivo de Canal: ${state.transmissionMbps.toFixed(3)} Mbps

===========================================================
PROYECTO INTEGRADOR - GRUPO 5 - S32 UTN FRLP
===========================================================`;

    const blob = new Blob([reporteText], { type: 'text/plain;charset=utf-8' });
    const reportLink = document.createElement('a');
    reportLink.download = 'reporte_digitalizacion_utn.txt';
    reportLink.href = URL.createObjectURL(blob);
    reportLink.click();
  };

  return {
    state,
    setState,
    refs: { analogCanvasRef, digitalCanvasRef },
    actions: { loadUTNPattern, handleFileUpload, downloadDigitalImage, exportReport }
  };
}
