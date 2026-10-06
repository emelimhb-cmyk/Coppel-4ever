export interface Smartphone {
  id: string;
  modelo: string;
  marca: 'Samsung' | 'Motorola' | 'Xiaomi' | 'Apple' | 'Honor' | 'Realme' | 'POCO';
  precio_contado: string;
  precio_contado_num: number;
  abono_quincenal_estimado: {
    plazo: '24 quincenas' | '36 quincenas' | '48 quincenas';
    monto: string;
    monto_num: number;
  }[];
  por_que_es_ideal: string;
  puntos_fuertes: string[];
  imagen: string;
  color_destacado: string;
  etiqueta_destacada?: string;
  specs: {
    pantalla: string;
    camara_principal: string;
    camara_frontal: string;
    bateria: string;
    carga_rapida: string;
    procesador: string;
    ram_rom: string;
    conectividad: string;
    resistencia: string;
  };
  puntuacion_uso: {
    conciertos_noche: number; // 1 - 100
    bateria_duracion: number; // 1 - 100
    gaming_potencia: number; // 1 - 100
    calidad_precio: number; // 1 - 100
  };
}

export const CATALOGO_SMARTPHONES: Smartphone[] = [
  {
    id: 'samsung-galaxy-a55',
    modelo: 'Samsung Galaxy A55 5G',
    marca: 'Samsung',
    precio_contado: '$8,999 MXN',
    precio_contado_num: 8999,
    abono_quincenal_estimado: [
      { plazo: '24 quincenas', monto: '$438 MXN', monto_num: 438 },
      { plazo: '36 quincenas', monto: '$325 MXN', monto_num: 325 }
    ],
    por_que_es_ideal: 'Es una de las mejores opciones para conciertos gracias a su estabilización óptica (OIS) que evita fotos borrosas mientras bailas. Su procesador gestiona increíblemente la energía para que grabes todo el evento sin miedo a que se apague, y su pantalla Super AMOLED brilla incluso bajo las luces del escenario.',
    puntos_fuertes: [
      'Cámara de 50 MP con Modo Noche mejorado y OIS',
      'Resistencia al agua y polvo con certificación IP67',
      'Batería duradera de 5,000 mAh para más de 24 horas',
      'Estructura de aluminio y marco premium'
    ],
    imagen: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    color_destacado: 'Azul Hielo / Grafito',
    etiqueta_destacada: 'Más vendido en Coppel',
    specs: {
      pantalla: '6.6" Super AMOLED FHD+ 120Hz Vision Booster',
      camara_principal: '50 MP (OIS) + 12 MP Ultra Gran Angular + 5 MP Macro',
      camara_frontal: '32 MP con grabación 4K',
      bateria: '5,000 mAh',
      carga_rapida: 'Carga rápida 25W',
      procesador: 'Exynos 1480 con GPU AMD Xclipse 530',
      ram_rom: '8 GB RAM + 128 GB / 256 GB',
      conectividad: '5G, Wi-Fi 6, NFC Coppel Pay',
      resistencia: 'IP67 sumergible hasta 1m por 30 min'
    },
    puntuacion_uso: {
      conciertos_noche: 94,
      bateria_duracion: 92,
      gaming_potencia: 86,
      calidad_precio: 95
    }
  },
  {
    id: 'motorola-edge-50-fusion',
    modelo: 'Motorola Edge 50 Fusion',
    marca: 'Motorola',
    precio_contado: '$6,999 MXN',
    precio_contado_num: 6999,
    abono_quincenal_estimado: [
      { plazo: '24 quincenas', monto: '$342 MXN', monto_num: 342 },
      { plazo: '36 quincenas', monto: '$255 MXN', monto_num: 255 }
    ],
    por_que_es_ideal: 'Este equipo es perfecto si buscas estilo y rendimiento. Su sensor de cámara Sony LYTIA es especialista en captar luz en condiciones oscuras (como un concierto), asegurando fotos nítidas. Además, su carga ultra rápida TurboPower de 68W te garantiza que con solo unos minutos de carga tendrás batería para todo el día.',
    puntos_fuertes: [
      'Sensor Sony LYTIA 700C con OIS de alta sensibilidad',
      'Pantalla curva pOLED fluida de 144Hz',
      'Carga ultrarrápida TurboPower de 68W incluida en caja',
      'Diseño delgado, liviano con acabado en cuero vegano'
    ],
    imagen: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    color_destacado: 'Azul Ártico / Magenta Viva',
    etiqueta_destacada: 'Favorito en Tienda',
    specs: {
      pantalla: '6.7" Curva pOLED FHD+ 144Hz 1600 nits',
      camara_principal: '50 MP Sony LYTIA (OIS) + 13 MP Ultra Gran Angular / Macro',
      camara_frontal: '32 MP con tecnología Quad Pixel',
      bateria: '5,000 mAh',
      carga_rapida: 'TurboPower 68W (cargador incluido)',
      procesador: 'Snapdragon 7s Gen 2',
      ram_rom: '8 GB RAM + 256 GB',
      conectividad: '5G, Wi-Fi Dual Band, Bluetooth 5.2',
      resistencia: 'IP68 máxima protección contra agua y polvo'
    },
    puntuacion_uso: {
      conciertos_noche: 92,
      bateria_duracion: 90,
      gaming_potencia: 88,
      calidad_precio: 96
    }
  },
  {
    id: 'xiaomi-redmi-note-13-pro-plus',
    modelo: 'Xiaomi Redmi Note 13 Pro+ 5G',
    marca: 'Xiaomi',
    precio_contado: '$9,499 MXN',
    precio_contado_num: 9499,
    abono_quincenal_estimado: [
      { plazo: '24 quincenas', monto: '$462 MXN', monto_num: 462 },
      { plazo: '36 quincenas', monto: '$395 MXN', monto_num: 395 }
    ],
    por_que_es_ideal: 'Si quieres ver al artista de cerca aunque estés lejos del escenario, su cámara de 200MP es tu mejor aliada para hacer zoom 4x sin pérdida de calidad. Es un guerrero de la batería y su carga de 120W HyperCharge es de las más veloces en Coppel: carga de 0 a 100% en menos de 19 minutos antes de salir al show.',
    puntos_fuertes: [
      'Cámara estelar de 200 MP con Sensor Samsung HP3 y OIS',
      'Carga Hiper Rápida de 120W (0-100% en 19 minutos)',
      'Pantalla curva CrystalRes 1.5K de 120Hz ultra nítida',
      'Protección Corning Gorilla Glass Victus y resistencia IP68'
    ],
    imagen: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    color_destacado: 'Morado Aurora / Negro Medianoche',
    etiqueta_destacada: 'Cámara 200 MP',
    specs: {
      pantalla: '6.67" AMOLED Curva 1.5K (2712 x 1220) 120Hz Dolby Vision',
      camara_principal: '200 MP (OIS) + 8 MP Gran Angular + 2 MP Macro',
      camara_frontal: '16 MP con Modo Retrato AI',
      bateria: '5,000 mAh',
      carga_rapida: '120W HyperCharge (cargador incluido en caja)',
      procesador: 'MediaTek Dimensity 7200-Ultra (4nm)',
      ram_rom: '12 GB RAM + 512 GB',
      conectividad: '5G Dual SIM, Wi-Fi 6, Bluetooth 5.3, NFC',
      resistencia: 'IP68 contra polvo y agua'
    },
    puntuacion_uso: {
      conciertos_noche: 96,
      bateria_duracion: 91,
      gaming_potencia: 93,
      calidad_precio: 94
    }
  },
  {
    id: 'honor-magic-6-lite',
    modelo: 'Honor Magic 6 Lite 5G',
    marca: 'Honor',
    precio_contado: '$7,499 MXN',
    precio_contado_num: 7499,
    abono_quincenal_estimado: [
      { plazo: '24 quincenas', monto: '$365 MXN', monto_num: 365 },
      { plazo: '36 quincenas', monto: '$272 MXN', monto_num: 272 }
    ],
    por_que_es_ideal: 'El teléfono indestructible con pantalla anticaídas ultra resistente Honor Ultra-Bounce. Tiene una descomunal batería de 5,800 mAh que aguanta hasta 2 días completos de uso continuo, ideal para jornadas largas de trabajo, viajes o festivales de música.',
    puntos_fuertes: [
      'Batería gigante de 5,800 mAh certificada DXOMARK Gold',
      'Pantalla anticaídas con protección de 360 grados',
      'Cámara de 108 MP para tomas con alto detalle',
      'Diseño sumamente delgado (7.98mm) a pesar de su gran batería'
    ],
    imagen: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80',
    color_destacado: 'Verde Esmeralda / Plata Titanio',
    etiqueta_destacada: 'Batería 2 Días',
    specs: {
      pantalla: '6.78" AMOLED Curva 1.5K 120Hz 1200 nits',
      camara_principal: '108 MP con zoom 3x sin pérdida + 5 MP Gran Angular + 2 MP Macro',
      camara_frontal: '16 MP',
      bateria: '5,800 mAh',
      carga_rapida: 'Honor SuperCharge 35W',
      procesador: 'Qualcomm Snapdragon 6 Gen 1 (4nm)',
      ram_rom: '8 GB RAM (+8 GB Turbo) + 256 GB',
      conectividad: '5G, Wi-Fi 5, Bluetooth 5.1, NFC',
      resistencia: 'Certificación 5 estrellas SGS anticaídas'
    },
    puntuacion_uso: {
      conciertos_noche: 85,
      bateria_duracion: 99,
      gaming_potencia: 84,
      calidad_precio: 93
    }
  },
  {
    id: 'poco-x6-pro',
    modelo: 'POCO X6 Pro 5G',
    marca: 'POCO',
    precio_contado: '$7,299 MXN',
    precio_contado_num: 7299,
    abono_quincenal_estimado: [
      { plazo: '24 quincenas', monto: '$355 MXN', monto_num: 355 },
      { plazo: '36 quincenas', monto: '$265 MXN', monto_num: 265 }
    ],
    por_que_es_ideal: 'La bestia gamer por excelencia en Coppel. Su procesador Dimensity 8300-Ultra rinde a nivel de gama alta, ideal para juegos como Call of Duty Mobile, Genshin Impact y Free Fire a 60-120 FPS sin calentamiento.',
    puntos_fuertes: [
      'Procesador Dimensity 8300-Ultra con más de 1.4 millones en AnTuTu',
      'Pantalla Flow AMOLED CrystalRes de 120Hz',
      'Carga Turbo de 67W con 5,000 mAh',
      'Sistema de refrigeración LiquidCool 2.0'
    ],
    imagen: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    color_destacado: 'Amarillo POCO / Negro',
    etiqueta_destacada: 'Rendimiento Gamer',
    specs: {
      pantalla: '6.67" Flow AMOLED 1.5K 120Hz HDR10+ 1800 nits',
      camara_principal: '64 MP (OIS) + 8 MP Gran Angular + 2 MP Macro',
      camara_frontal: '16 MP',
      bateria: '5,000 mAh',
      carga_rapida: '67W Turbo Charge (cargador incluido)',
      procesador: 'MediaTek Dimensity 8300-Ultra (4nm)',
      ram_rom: '8 GB / 12 GB RAM LPDDR5X + 256 GB / 512 GB UFS 4.0',
      conectividad: '5G, Wi-Fi 6, Bluetooth 5.4, Infrarrojos',
      resistencia: 'IP54 resistente a salpicaduras'
    },
    puntuacion_uso: {
      conciertos_noche: 83,
      bateria_duracion: 89,
      gaming_potencia: 98,
      calidad_precio: 97
    }
  },
  {
    id: 'samsung-galaxy-a35',
    modelo: 'Samsung Galaxy A35 5G',
    marca: 'Samsung',
    precio_contado: '$5,999 MXN',
    precio_contado_num: 5999,
    abono_quincenal_estimado: [
      { plazo: '24 quincenas', monto: '$292 MXN', monto_num: 292 },
      { plazo: '36 quincenas', monto: '$218 MXN', monto_num: 218 }
    ],
    por_que_es_ideal: 'La opción más equilibrada y económica con resistencia al agua IP67 y pantalla Super AMOLED. Ideal para quienes buscan un abono quincenal menor a $300 sin renunciar a una gran cámara de 50 MP con OIS y 4 años de actualizaciones garantizadas por Samsung.',
    puntos_fuertes: [
      'Abono súper accesible de menos de $300 a la quincena',
      'Pantalla Super AMOLED fluida de 120Hz con protección Gorilla Glass Victus+',
      'Cámara de 50 MP con OIS y Nightography',
      'Resistencia IP67 contra agua y accidentes cotidianos'
    ],
    imagen: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    color_destacado: 'Azul Marino / Lila / Lima',
    etiqueta_destacada: 'Abono < $300',
    specs: {
      pantalla: '6.6" Super AMOLED FHD+ 120Hz 1000 nits',
      camara_principal: '50 MP (OIS) + 8 MP Gran Angular + 5 MP Macro',
      camara_frontal: '13 MP',
      bateria: '5,000 mAh',
      carga_rapida: 'Carga rápida 25W',
      procesador: 'Exynos 1380 (5nm)',
      ram_rom: '6 GB / 8 GB RAM + 128 GB / 256 GB',
      conectividad: '5G, Wi-Fi 6, Bluetooth 5.3, NFC',
      resistencia: 'IP67 contra agua y polvo'
    },
    puntuacion_uso: {
      conciertos_noche: 86,
      bateria_duracion: 90,
      gaming_potencia: 81,
      calidad_precio: 96
    }
  },
  {
    id: 'motorola-moto-g84',
    modelo: 'Motorola Moto G84 5G',
    marca: 'Motorola',
    precio_contado: '$4,999 MXN',
    precio_contado_num: 4999,
    abono_quincenal_estimado: [
      { plazo: '24 quincenas', monto: '$244 MXN', monto_num: 244 },
      { plazo: '36 quincenas', monto: '$182 MXN', monto_num: 182 }
    ],
    por_que_es_ideal: 'El rey de la gama media económica en Coppel con un abono quincenal de apenas $244 MXN. Viene equipado con 256 GB de memoria de fábrica, pantalla pOLED a 120Hz y cámara de 50 MP con estabilización óptica OIS para fotos bien enfocadas.',
    puntos_fuertes: [
      '256 GB de almacenamiento masivo incluido',
      'Abono quincenal ultrabajo desde $182 a $244 MXN',
      'Pantalla pOLED cinematográfica con mil millones de colores',
      'Sonido estéreo Dolby Atmos de gran volumen'
    ],
    imagen: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80',
    color_destacado: 'Viva Magenta / Azul Ártico',
    etiqueta_destacada: 'Super Precio',
    specs: {
      pantalla: '6.55" pOLED FHD+ 120Hz 1300 nits',
      camara_principal: '50 MP (OIS) + 8 MP Ultra Gran Angular / Macro',
      camara_frontal: '16 MP',
      bateria: '5,000 mAh',
      carga_rapida: 'TurboPower 30W',
      procesador: 'Qualcomm Snapdragon 695 5G',
      ram_rom: '8 GB RAM + 256 GB',
      conectividad: '5G, Wi-Fi Dual Band, Bluetooth 5.1, NFC',
      resistencia: 'IP54 repelente al agua'
    },
    puntuacion_uso: {
      conciertos_noche: 82,
      bateria_duracion: 89,
      gaming_potencia: 78,
      calidad_precio: 98
    }
  },
  {
    id: 'apple-iphone-13',
    modelo: 'Apple iPhone 13 (128 GB)',
    marca: 'Apple',
    precio_contado: '$12,499 MXN',
    precio_contado_num: 12499,
    abono_quincenal_estimado: [
      { plazo: '24 quincenas', monto: '$608 MXN', monto_num: 608 },
      { plazo: '36 quincenas', monto: '$520 MXN', monto_num: 520 }
    ],
    por_que_es_ideal: 'Para amantes de Apple y video cinematográfico en conciertos y eventos. Su procesador A15 Bionic y su sensor con estabilización óptica por desplazamiento de sensor logran la mejor calidad de video 4K en Instagram y TikTok.',
    puntos_fuertes: [
      'Grabación de video 4K HDR con Modo Cine y Dolby Vision',
      'Chip A15 Bionic con potencia de sobra por años',
      'Resistencia al agua IP68 y Ceramic Shield ultra resistente',
      'Ecosistema iOS y Coppel Pay disponible'
    ],
    imagen: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    color_destacado: 'Azul Medianoche / Blanco Estrella',
    etiqueta_destacada: 'Gama Alta Coppel',
    specs: {
      pantalla: '6.1" Super Retina XDR OLED HDR10 1200 nits',
      camara_principal: '12 MP Dual (Sensor-shift OIS) + 12 MP Ultra Gran Angular',
      camara_frontal: '12 MP TrueDepth con Face ID y 4K60',
      bateria: '3,240 mAh con optimización iOS líder',
      carga_rapida: 'Carga rápida 20W + MagSafe inalámbrico 15W',
      procesador: 'Apple A15 Bionic (6 núcleos)',
      ram_rom: '4 GB RAM + 128 GB',
      conectividad: '5G, Wi-Fi 6, Bluetooth 5.0, UWB',
      resistencia: 'IP68 sumergible hasta 6 metros'
    },
    puntuacion_uso: {
      conciertos_noche: 95,
      bateria_duracion: 87,
      gaming_potencia: 96,
      calidad_precio: 90
    }
  }
];

export interface RecommendationResponse {
  recomendaciones: {
    modelo: string;
    por_que_es_ideal: string;
    precio_contado: string;
    abono_quincenal_estimado: {
      plazo: string;
      monto: string;
    }[];
    puntos_fuertes: string[];
    // Extended fields if provided
    id_coincidente?: string;
  }[];
  mensaje_asesor: string;
}

export function generateSmartFallback(userQuery: string): RecommendationResponse {
  const queryLower = (userQuery || '').toLowerCase();

  if (
    queryLower.includes('concierto') ||
    queryLower.includes('foto') ||
    queryLower.includes('cámara') ||
    queryLower.includes('camara')
  ) {
    const selected = CATALOGO_SMARTPHONES.filter(p =>
      ['samsung-galaxy-a55', 'motorola-edge-50-fusion', 'xiaomi-redmi-note-13-pro-plus'].includes(p.id)
    );
    return {
      recomendaciones: selected.map(p => ({
        modelo: p.modelo,
        por_que_es_ideal: p.por_que_es_ideal,
        precio_contado: p.precio_contado,
        abono_quincenal_estimado: p.abono_quincenal_estimado.map(a => ({ plazo: a.plazo, monto: a.monto })),
        puntos_fuertes: p.puntos_fuertes.slice(0, 3),
      })),
      mensaje_asesor:
        '¡Hola! Entiendo perfectamente lo que buscas: quieres capturar esos momentos épicos en los conciertos sin preocuparte por la batería y cuidando tu bolsillo. Estos tres modelos son los favoritos de nuestros clientes en Coppel por su equilibrio entre cámaras profesionales y pagos quincenales muy cómodos. ¡Espero que disfrutes mucho tu próximo evento con tu nuevo smartphone!',
    };
  }

  if (
    queryLower.includes('juego') ||
    queryLower.includes('game') ||
    queryLower.includes('free fire') ||
    queryLower.includes('poten')
  ) {
    const selected = CATALOGO_SMARTPHONES.filter(p =>
      ['poco-x6-pro', 'xiaomi-redmi-note-13-pro-plus', 'samsung-galaxy-a55'].includes(p.id)
    );
    return {
      recomendaciones: selected.map(p => ({
        modelo: p.modelo,
        por_que_es_ideal: p.por_que_es_ideal,
        precio_contado: p.precio_contado,
        abono_quincenal_estimado: p.abono_quincenal_estimado.map(a => ({ plazo: a.plazo, monto: a.monto })),
        puntos_fuertes: p.puntos_fuertes.slice(0, 3),
      })),
      mensaje_asesor:
        '¡Qué onda! Para gaming necesitas procesadores que no se sobrecalienten y pantallas de 120Hz sin tirones. Estos modelos tienen la mejor tasa de refresco y chipsets de alto rendimiento para subir a rango Heroico en Free Fire o ganar partidas en Call of Duty con un abono súper accesible en Coppel.',
    };
  }

  if (
    queryLower.includes('batería') ||
    queryLower.includes('bateria') ||
    queryLower.includes('dure') ||
    queryLower.includes('rudo') ||
    queryLower.includes('repart')
  ) {
    const selected = CATALOGO_SMARTPHONES.filter(p =>
      ['honor-magic-6-lite', 'samsung-galaxy-a55', 'motorola-edge-50-fusion'].includes(p.id)
    );
    return {
      recomendaciones: selected.map(p => ({
        modelo: p.modelo,
        por_que_es_ideal: p.por_que_es_ideal,
        precio_contado: p.precio_contado,
        abono_quincenal_estimado: p.abono_quincenal_estimado.map(a => ({ plazo: a.plazo, monto: a.monto })),
        puntos_fuertes: p.puntos_fuertes.slice(0, 3),
      })),
      mensaje_asesor:
        '¡Un gusto saludarte! En Coppel sabemos que la batería y la resistencia son clave para tu día a día sin tener que andar buscando enchufes. Estos equipos cuentan con hasta 5,800 mAh y protección contra caídas para que trabajes o viajes con total tranquilidad.',
    };
  }

  if (
    queryLower.includes('econ') ||
    queryLower.includes('barat') ||
    queryLower.includes('260') ||
    queryLower.includes('300')
  ) {
    const selected = CATALOGO_SMARTPHONES.filter(p =>
      ['motorola-moto-g84', 'samsung-galaxy-a35', 'motorola-edge-50-fusion'].includes(p.id)
    );
    return {
      recomendaciones: selected.map(p => ({
        modelo: p.modelo,
        por_que_es_ideal: p.por_que_es_ideal,
        precio_contado: p.precio_contado,
        abono_quincenal_estimado: p.abono_quincenal_estimado.map(a => ({ plazo: a.plazo, monto: a.monto })),
        puntos_fuertes: p.puntos_fuertes.slice(0, 3),
      })),
      mensaje_asesor:
        '¡Excelente elección! En Coppel cuidar tu quincena es prioridad. Con estos modelos tienes abonos sumamente accesibles desde $182 a $292 MXN quincenales, sin sacrificar pantallas fluidas, cámaras de 50 MP y excelente memoria.',
    };
  }

  // General fallback (Top 3 in Coppel)
  const top3 = CATALOGO_SMARTPHONES.slice(0, 3);
  return {
    recomendaciones: top3.map(p => ({
      modelo: p.modelo,
      por_que_es_ideal: p.por_que_es_ideal,
      precio_contado: p.precio_contado,
      abono_quincenal_estimado: p.abono_quincenal_estimado.map(a => ({ plazo: a.plazo, monto: a.monto })),
      puntos_fuertes: p.puntos_fuertes.slice(0, 3),
    })),
    mensaje_asesor:
      '¡Bienvenido a Coppel 4ever! Aquí tienes nuestras 3 mejores recomendaciones adaptadas con el mejor balance de precio de contado y abonos quincenales a tu medida. ¡Llévatelo hoy mismo con tu Crédito Coppel!',
  };
}

export const PRESET_CONSULTAS = [
  {
    id: 'conciertos',
    titulo: 'Conciertos y Festivales 🎸',
    subtitulo: 'Fotos de noche, zoom nítido y batería para todo el show',
    prompt: 'Busco un celular con excelente cámara de fotos para conciertos, batería para 24 horas y que el abono quincenal en Coppel no supere los $450.',
    abono_max: 450,
    tags: ['Cámara Nocturna', 'Zoom', 'Batería 24h', 'Abono < $450']
  },
  {
    id: 'gaming',
    titulo: 'Gaming y Free Fire 🎮',
    subtitulo: 'Procesador veloz, 120Hz sin lag y refrigeración',
    prompt: 'Quiero un smartphone potente para jugar Free Fire, COD Mobile y Genshin Impact a altos FPS, con buena batería y que los pagos quincenales en Coppel sean menores a $400.',
    abono_max: 400,
    tags: ['Snapdragon / Dimensity', '120Hz', 'Gaming', 'Abono < $400']
  },
  {
    id: 'creador_tiktok',
    titulo: 'Creador de Contenido y TikTok 📱',
    subtitulo: 'Video estabilizado 4K, cámara frontal nítida y 256GB+',
    prompt: 'Necesito un teléfono para grabar videos de TikTok e historias de Instagram con cámara muy estabilizada, buena cámara frontal y al menos 256GB de memoria, con abono quincenal no mayor a $500.',
    abono_max: 500,
    tags: ['Video 4K', 'Frontal 32MP', '256GB+', 'Abono < $500']
  },
  {
    id: 'bateria_ruda',
    titulo: 'Batería Monstruo 2 Días 🔋',
    subtitulo: 'Para repartidores, ruta o trabajo pesado que no se apague',
    prompt: 'Busco un celular resistente a caídas y salpicaduras con batería que dure 2 días enteros para trabajar todo el día fuera de casa, con abono quincenal de máximo $380 en Coppel.',
    abono_max: 380,
    tags: ['5,800 mAh', 'Pantalla Anticaídas', 'Trabajo Rudo', 'Abono < $380']
  },
  {
    id: 'economico',
    titulo: 'Abono Súper Económico 💵',
    subtitulo: 'Menos de $260 a la quincena con excelente pantalla y memoria',
    prompt: 'Quiero el mejor celular calidad-precio disponible en Coppel que tenga abonos quincenales de menos de $260, con buena memoria para WhatsApp, fotos familiares y redes sociales.',
    abono_max: 260,
    tags: ['Económico', 'Abono < $260', 'Redes Sociales', 'Calidad-Precio']
  }
];
