# Trabajo Práctico Integrador - Etapa 2
**Proyecto Grupo 5 (S32)**  
*Cátedra de Comunicación de Datos - UTN FRLP*

## 👥 Integrantes del Grupo
- **Esperanza Franco**
- **Tachi Joaquin**
- **Takara Joaquin**
- **Veliz Condori Ruben**

Este repositorio contiene los simuladores desarrollados para el Trabajo Práctico Integrador de la materia Comunicación de Datos. El objetivo de este proyecto es visualizar, experimentar y aplicar los conceptos teóricos de conversión analógico-digital y modulación de manera práctica mediante herramientas interactivas.

## 📂 Estructura del Proyecto

```text
Proyecto G5 S32/
├── s32-g5-analogico-digital/      # Simulador de Audio (ADC y PCM)
│   ├── api/                       # Motor Backend de simulación (FastAPI)
│   ├── docs/                      # Material de la cátedra y referencias
│   ├── public/                    # Archivos estáticos y audios de prueba
│   └── src/                       # Código fuente de UI y lógica
├── s32-g5-digitalizacion-imagenes/# Simulador de Imágenes (Píxeles y Color)
└── README.md                      # Este archivo
```

El proyecto está dividido en submódulos (simuladores independientes):

### 1. [Simulador de Audio (ADC y Modulación PCM)](./s32-g5-analogico-digital)
Un laboratorio virtual en tiempo real que permite capturar audio continuo (ondas generadas, micrófono o archivos locales) y someterlo al proceso de digitalización (Muestreo, Cuantización y Retención ZOH).
- **Frontend:** React + Vite
- **Backend:** FastAPI (Python)
- **Conceptos Abordados:** Teorema de Nyquist, Aliasing, Cuantización Lineal, Tasa de Bits ($R$), Relación Señal/Ruido (SQNR).

### 2. [Simulador de Imágenes (Digitalización Bidimensional)](./s32-g5-digitalizacion-imagenes)
Herramienta enfocada en la compresión espacial de matrices de píxeles y reducción de profundidad de color, permitiendo experimentar con el *Aliasing Espacial* y explorar en tiempo real las métricas de capacidad bruta ($V$) y de flujo de video para transmisión continua ($R$).
- **Frontend:** React + Vite (Sin backend, procesamiento por Canvas HTML5)
- **Conceptos Abordados:** Muestreo de Imagen, Cuantización Cromática (True Color, Indexado, Monocromo), Tasa de Refresco (FPS).

---
**Documentación Adicional:** Puedes encontrar la documentación específica y las instrucciones de instalación dentro de la carpeta `README.md` de cada simulador.
