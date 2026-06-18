export function TheoryPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#121315] p-8 lg:p-12 text-[#e3e6eb]">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <header className="border-b border-[#2c2e31] pb-6">
          <h1 className="text-3xl font-bold font-mono tracking-wider mb-2">
            Apuntes Teóricos: Digitalización de Imágenes
          </h1>
          <p className="text-[#747a82] font-mono text-sm uppercase tracking-wider">
            Unidades 1, 2, 4 y 8 — Cátedra de Comunicación de Datos
          </p>
        </header>

        {/* Sección 1: Muestreo Espacial */}
        <section className="bg-[#18191b] border border-[#2c2e31] rounded p-6 shadow-lg">
          <h2 className="text-[#00e676] font-mono text-lg uppercase tracking-wider mb-4 border-b border-[#2c2e31] pb-2">
            1. Muestreo Espacial (Matriz Discreta)
          </h2>
          <p className="text-[15px] leading-relaxed mb-4">
            Una imagen óptica en el mundo real es una señal analógica bidimensional; tiene variaciones infinitas de luz y color en un espacio continuo. Para procesarla en un sistema digital, primero debemos aplicar un <strong>Muestreo Espacial</strong>.
          </p>
          <p className="text-[15px] leading-relaxed mb-4">
            Este proceso divide el plano continuo en una cuadrícula o matriz finita. Cada celda de esta cuadrícula es un "punto de muestra", conocido comúnmente como <strong>Píxel</strong> (Picture Element).
          </p>
          <div className="bg-[#121315] p-4 rounded border border-[#2c2e31] mb-4">
            <h3 className="font-mono text-sm text-[#ffaa00] mb-2 uppercase">Aliasing Espacial</h3>
            <p className="text-[14px]">
              Al igual que en el audio, el Teorema de Nyquist aplica a las imágenes (frecuencias espaciales). Si muestreamos una imagen con detalles muy finos usando una grilla de pocos píxeles (resolución muy baja), perderemos información crítica. Visualmente, esto se manifiesta como "bloques" enormes, pérdida de bordes o patrones de interferencia espurios conocidos como Moiré.
            </p>
          </div>
        </section>

        {/* Sección 2: Cuantización Cromática */}
        <section className="bg-[#18191b] border border-[#2c2e31] rounded p-6 shadow-lg">
          <h2 className="text-[#00e676] font-mono text-lg uppercase tracking-wider mb-4 border-b border-[#2c2e31] pb-2">
            2. Cuantización Cromática (Profundidad de Color)
          </h2>
          <p className="text-[15px] leading-relaxed mb-4">
            Una vez que tenemos los píxeles aislados, debemos medir la intensidad de luz y color en cada uno. La cuantización restringe los infinitos tonos naturales a un conjunto finito de niveles ($L$).
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-[15px]">
            <li><strong>24 bits (True Color):</strong> 8 bits por canal RGB. Permite $L = 2^{24}$ (aprox. 16.7 millones) de colores. Inimperceptible al ojo humano.</li>
            <li><strong>8 bits (Color Indexado/Retro):</strong> $L = 2^8 = 256$ colores. Se observan bandas de color.</li>
            <li><strong>1 bit (Monocromo):</strong> $L = 2^1 = 2$ colores (Blanco o Negro). Máximo nivel de distorsión cromática.</li>
          </ul>
        </section>

        {/* Sección 3: Volumen de Almacenamiento */}
        <section className="bg-[#18191b] border border-[#2c2e31] rounded p-6 shadow-lg">
          <h2 className="text-[#ffaa00] font-mono text-lg uppercase tracking-wider mb-4 border-b border-[#2c2e31] pb-2">
            3. Volumen de Información (Capacidad)
          </h2>
          <p className="text-[15px] leading-relaxed mb-4">
            Para almacenar una imagen RAW (sin compresión), necesitamos guardar los bits de cada píxel de la matriz discreta. El cálculo de Volumen ($V$) se obtiene multiplicando la cantidad total de píxeles (Ancho $\times$ Alto) por la cantidad de bits por píxel ($b$).
          </p>
          <div className="bg-[#121315] p-4 rounded border border-[#2c2e31] font-mono text-sm text-center">
            V = W $\times$ H $\times$ (b / 8) [Bytes]
          </div>
        </section>

        {/* Sección 4: Tasa de Transmisión de Video */}
        <section className="bg-[#18191b] border border-[#2c2e31] rounded p-6 shadow-lg">
          <h2 className="text-[#ffaa00] font-mono text-lg uppercase tracking-wider mb-4 border-b border-[#2c2e31] pb-2">
            4. Tasa de Transmisión (Flujo de Video)
          </h2>
          <p className="text-[15px] leading-relaxed mb-4">
            Un video no es más que una secuencia rápida de imágenes fijas o "fotogramas" por segundo (FPS). Para calcular el Ancho de Banda o la Tasa de Bits ($R$) del canal necesaria para transmitir este video en tiempo real (sin compresión), multiplicamos el peso de una imagen por la cantidad de imágenes por segundo.
          </p>
          <div className="bg-[#121315] p-4 rounded border border-[#2c2e31] font-mono text-sm text-center mb-4">
            R = V [Bytes] $\times$ 8 [bits/byte] $\times$ FPS [bps]
          </div>
          <p className="text-[15px] leading-relaxed">
            Las tasas crudas ($R$) calculadas aquí suelen estar en el orden de los Megabits o Gigabits por segundo. En el mundo real, los codecs (como H.264 o H.265) aplican algoritmos matemáticos complejos para reducir drásticamente este flujo antes de enviarlo por la red, explotando la redundancia espacial y temporal del video.
          </p>
        </section>

      </div>
    </div>
  );
}
