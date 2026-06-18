# Simulador de Digitalización de Imágenes

Este proyecto es una aplicación frontend desarrollada en **React** (utilizando **Vite**) que permite simular y explorar interactivamente los procesos de muestreo espacial y cuantización cromática que intervienen en la digitalización de una imagen óptica.

Forma parte del **Trabajo Práctico Integrador** para la cátedra de *Comunicación de Datos* (UTN FRLP - Grupo 5 - S32).

> [!NOTE]
> A diferencia del simulador de audio, esta aplicación **no requiere un backend (API)**. Todo el procesamiento matemático de la matriz de píxeles, la compresión de colores y el cálculo de la tasa de bits se realiza en tiempo real directamente en el navegador del cliente a través de HTML5 Canvas y TypeScript.

## Requisitos Previos

Necesitas tener instalado en tu computadora:
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)

## ¿Cómo ejecutar la aplicación localmente?

Abre una terminal, navega hacia la carpeta de esta aplicación (`s32-g5-digitalizacion-imagenes`) y sigue estos pasos:

1. **Instalar las dependencias:**
   ```bash
   npm install
   ```

2. **Levantar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   La terminal te indicará una URL local (generalmente `http://localhost:5173` o `http://localhost:5174`). Haz clic en ella o cópiala y pégala en tu navegador.

## Estructura del Proyecto

```text
s32-g5-digitalizacion-imagenes/
├── public/                 # Recursos estáticos
├── src/
│   ├── components/         # Componentes de UI (Header, ControlsPanel, ViewportPanel, TheoryPage)
│   ├── hooks/              # Lógica de procesamiento (useImageSystem.ts)
│   ├── App.tsx             # Componente raíz que maneja el layout y estado
│   ├── index.css           # Estilos base de Tailwind y configuración de pixelado
│   └── main.tsx            # Punto de entrada de React
├── tailwind.config.js      # Configuración de TailwindCSS
├── vite.config.ts          # Configuración del servidor de desarrollo y build
└── package.json            # Dependencias del proyecto (React, Tailwind, Lucide)
```

## Funcionalidades Principales

- **Muestreo Espacial Ajustable:** Reduce drásticamente la resolución física de la imagen para comprender el *Aliasing* espacial.
- **Cuantización Cromática:** Configura la profundidad de color (desde 24 bits True Color hasta 1 bit Blanco/Negro).
- **Métricas Académicas en Tiempo Real:** Calcula el Volumen de Almacenamiento Crudo ($V$) y la Tasa de Transmisión Efectiva de Video ($R$) requerida para enviar un flujo a distintos FPS.
- **Soporte Teórico Integrado:** Página de apuntes basada en las Unidades 1, 2, 4 y 8 de la cátedra para correlacionar la práctica con la teoría.
