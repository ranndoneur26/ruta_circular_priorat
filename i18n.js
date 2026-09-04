/**
 * Travessa del Priorat — capa i18n centralizada
 * ==============================================
 */
(function(){
  const STORAGE_KEY = "travessa_priorat_lang";
  const SUPPORTED = ["ca", "es", "en"];
  const FALLBACK = "ca";
  const dict = {
  "es": {
    "home": {
      "nav": {
        "red": "La red",
        "pueblos": "19 pueblos",
        "mapa": "Mapa",
        "etapas": "Etapas",
        "guia": "Guía",
        "info": "Info práctica",
        "inscripcion": "Inscribirme",
        "finalizados": "Caminantes"
      },
      "hero": {
        "eyebrow": "Gran travesía circular · 100% senderista",
        "h1": "Los 19 pueblos del Priorat, <em>unidos a pie</em>.",
        "lead": "El Priorat es una tierra dura y solitaria, de laderas imposibles y suelos de llicorella donde la vida siempre ha sido una batalla cuerpo a cuerpo con la roca. <span class=\"accent\">Seguir la ruta de sus 19 pueblos es una experiencia épica</span>: un viaje interior entre viñas de viticultura heroica, ermitas y barrancos silenciosos, donde cada curva del camino te invita a sentir más intensamente el paisaje y a descubrir una espiritualidad hecha de esfuerzo, contemplación y belleza extrema.",
        "sub": "Circuito propuesto de 8 etapas que aprovecha tramos del GR‑174 y otros senderos señalizados, enlazados mediante caminos rurales y pistas forestales entre los 19 pueblos del Priorat, con Falset como puerta de entrada y salida. No es un itinerario propio homologado ni señalizado de forma continua.",
        "quick1": "19 pueblos",
        "quick2": "Eje GR‑174",
        "quick3": "Inicio recomendado: Falset",
        "quick4": "Recorrido verificado con GPX real",
        "stat1": "Municipios",
        "stat2": "Etapas",
        "stat3": "Tramos de red existente",
        "stat4": "Circuito cerrado",
        "hub": "nudo central",
        "cta1": "Explorar las etapas",
        "cta2": "Ver mapa interactivo"
      },
      "red": {
        "eyebrow": "Cómo se aprovecha lo existente",
        "h2": "Una red, no un trazado nuevo",
        "p": "El GR‑174 hace de columna vertebral; el PR‑C y los senderos del Montsant cierran los enlaces que faltan.",
        "gr": {
          "h": "GR‑174",
          "p": "Eje principal en Falset, Gratallops, Poboleda, Escaladei y Cornudella. La columna vertebral del circuito."
        },
        "pr": {
          "h": "PR‑C y senderos locales",
          "p": "Enlazan los municipios que no quedan directamente sobre el GR‑174, sin recurrir al asfalto."
        },
        "local": {
          "h": "Caminos y pistas forestales",
          "p": "Caminos históricos, mineros y agrícolas para las conexiones rurales que aún no tienen sendero homologado."
        }
      },
      "pueblos": {
        "eyebrow": "Directorio",
        "h2": "Los 19 municipios",
        "p": "Cada pueblo, con el tipo de conexión senderista recomendada para llegar a él."
      },
      "mapa": {
        "eyebrow": "Primera fase interactiva",
        "h2": "El mapa",
        "p": "Ubicación real de los 19 municipios y trazado real de las 8 etapas, verificado con GPX.",
        "legendGr": "Nudo GR-174",
        "legendPr": "Municipio",
        "note": "Las 8 etapas verificadas con GPX real (línea sólida).",
        "popupConn": "Conexión",
        "statusVerified": "Las 8 etapas verificadas con GPX real",
        "statusShortRoute": "Ruta corta (3 días): las 3 etapas verificadas con GPX real",
        "legendCorta": "Ruta corta (3 días)",
        "shortRouteLabel": "Ruta corta (3 días) — tramo Bellmunt–Falset, verificado con GPX real"
      },
      "etapas": {
        "eyebrow": "Trazado propuesto",
        "h2": "Ocho etapas, un círculo cerrado",
        "p": "Cada uno de los 19 municipios se visita una sola vez. Falset abre y cierra el circuito.",
        "etapaLabel": "Etapa",
        "dist": "Distancia (línea recta)",
        "diff": "Dificultad",
        "time": "Tiempo estimado",
        "diffFacil": "Fácil",
        "diffModerada": "Moderada",
        "diffExigente": "Exigente",
        "tableCaption": "Toca una fila para abrir esa etapa",
        "tableEtapa": "Etapa",
        "tableKm": "Km",
        "tableTiempo": "Tiempo",
        "tableDesnivel": "Desnivel +",
        "tableDificultad": "Dificultad",
        "summary": "Circuito cerrado · 19 municipios, cada uno una vez · <strong>{km} km</strong> reales, verificados con GPX en las 8 etapas",
        "meta": "desnivel y distancia real del sendero — pendientes de trazado GPX verificado",
        "poi": "Qué visitar",
        "eat": "Dónde comer",
        "sleep": "Dónde dormir",
        "noOffer": "Sin oferta registrada — lleva provisiones",
        "distReal": "Distancia (GPX real)",
        "gain": "Desnivel positivo",
        "loss": "Desnivel negativo",
        "gpxVerified": "Track GPX verificado",
        "gpxDownload": "Descargar .gpx",
        "gpxDisclaimer": "Orientativo — no sustituye la señalización oficial ni tu criterio sobre el terreno. Uso bajo tu propia responsabilidad.",
        "elev": "Perfil de elevación (núcleos)",
        "elevNote": "Altitud real de cada núcleo, unida en línea recta — no sigue el perfil real del sendero, pendiente de trazado GPX.",
        "elevNoteReal": "Perfil real extraído del track GPX verificado, punto a punto sobre el sendero.",
        "mapPreview": "Vista previa del trazado",
        "mapExpand": "Ampliar",
        "source": "Comer y dormir: directorio oficial de <a href=\"https://www.turismepriorat.org\" target=\"_blank\" rel=\"noopener\">Turisme Priorat</a>, contrastado puntualmente con reseñas de Google/Tripadvisor/Booking en los establecimientos marcados con ★ (no en los 40 negocios listados). Altitudes: Idescat y Consell Regulador DOQ Priorat. Verifica horarios, disponibilidad y teléfonos antes de salir. Datos de restauración y alojamiento de las 8 etapas revisados y ampliados en agosto de 2026, incorporando opciones en Marçà, El Molar, La Figuera, La Bisbal de Falset, Poboleda y Escaladei."
      },
      "guia": {
        "eyebrow": "Preparación",
        "h2": "Guía práctica del peregrino",
        "p": "Terreno agreste, poca sombra, calor fuerte y muy poca infraestructura turística fuera de fin de semana. Prepárate en consecuencia.",
        "nav1": "Cuándo ir",
        "nav2": "Cómo llegar",
        "nav3": "Agua",
        "nav4": "Comida",
        "nav5": "Calor",
        "nav6": "Terreno y calzado",
        "nav7": "Equipo",
        "cuando": {
          "h": "Cuándo ir",
          "body": "<p><strong>Evita julio y agosto.</strong> El Priorat es una de las comarcas más calurosas del interior de Catalunya; en verano se superan fácilmente los 35–38&nbsp;°C, sin apenas sombra en los tramos entre viñedos y en la sierra del Montsant.</p>\n           <p><strong>Mejor época: abril–junio y septiembre–noviembre.</strong> Temperaturas moderadas, mejor luz y los pueblos suelen tener algo más de vida.</p>\n           <p>Si caminas en verano por fuerza mayor, empieza antes de las 7:00 y para entre las 13:00 y las 17:00. Las etapas 2 y 5 (las más largas y expuestas) son las más peligrosas con calor fuerte.</p>\n           <div class=\"g-warn\"><p>En invierno, Siurana (737&nbsp;m, el punto más alto del recorrido) y la carena del Montsant pueden tener heladas o nieve puntual: riesgo de suelo resbaladizo más que térmico.</p></div>"
        },
        "llegar": {
          "h": "Cómo llegar",
          "intro": "Falset es el nudo del circuito y el mejor punto de entrada y salida. Así se llega:"
        },
        "agua": {
          "h": "Agua: la prioridad número uno",
          "body": "<p>Esta es la carencia real más seria del circuito: muchos tramos no tienen ninguna fuente fiable ni ningún pueblo con servicio abierto, y el terreno es seco casi todo el año.</p>\n           <p><strong>Regla general:</strong> mínimo 2,5–3 litros por persona y etapa en temporada media; 4–5 litros en las etapas largas (2 y 5) o con calor fuerte. Sal siempre con el depósito lleno — no cuentes con reponer por el camino salvo que lo hayas confirmado tú mismo ese mismo día.</p>\n           <p>Lleva electrolitos, no solo agua: con esfuerzo sostenido varios días y calor, la pérdida de sodio pesa tanto como la de agua.</p>\n           <p><strong>Fuentes de referencia</strong> (sin garantía de potabilidad — lleva pastillas potabilizadoras o filtro): Font del Mingot (Poboleda), Font de les Amades (cerca de Falset).</p>"
        },
        "comida": {
          "h": "Comida y restauración",
          "body": "<p>Lleva siempre comida de reserva para un día entero, aunque la ficha de la etapa marque un sitio para comer: en pueblos de 100–300 habitantes, un solo restaurante puede estar cerrado por descanso semanal o fuera de temporada.</p>\n           <p>Las <strong>etapas 3 y 4</strong> (Bellmunt→Cabacés y Cabacés→La Bisbal→Margalef) son las más críticas: apenas hay oferta registrada — revisa el detalle exacto en la ficha de cada etapa, más abajo en esta misma página.</p>\n           <p>Los hornos de pan (forns) abren temprano, antes que cualquier restaurante — son tu mejor opción para desayunar fuerte. El Priorat apenas tiene supermercados fuera de Falset y Cornudella: compra víveres para varios días cuando pases por uno de los dos.</p>"
        },
        "calor": {
          "h": "Gestión del calor",
          "body": "<p>Con etapas de hasta 32,8&nbsp;km y hasta 14,5&nbsp;horas de caminata (etapas 2 y 5, las más largas y expuestas), y con poca sombra en general, el golpe de calor es un riesgo más real en esta ruta que perderse.</p>\n           <p><strong>Agotamiento por calor</strong> (frecuente, se resuelve parando): sudoración excesiva, debilidad, mareo, piel pálida y húmeda. Para, busca sombra, bebe agua con sales, descansa al menos 30 minutos.</p>\n           <div class=\"g-warn\"><p><strong>Golpe de calor</strong> (urgencia médica): piel caliente y seca, confusión, temperatura corporal muy alta. Llama al <strong>112</strong>, enfría a la persona con lo que tengas mientras llega ayuda.</p></div>\n           <p>Señal de alarma temprana: si dejas de sudar con calor fuerte y sigues caminando, es momento de parar, no de continuar.</p>"
        },
        "terreno": {
          "h": "Terreno y calzado",
          "body": "<p>El suelo dominante es <strong>llicorella</strong> (pizarra negra), muy resbaladiza suelta o mojada. Bota de montaña con buena suela de agarre, no zapatilla lisa de trail — hay piedra suelta en la subida a Montsant y en los caminos mineros de Bellmunt.</p>\n           <p>Bastones de trekking muy recomendables en las etapas 2 y 5 (más desnivel acumulado). Polainas ligeras si caminas con vegetación baja y matorral cerrado.</p>"
        },
        "equipo": {
          "h": "Lista de equipo para 8 días"
        },
        "nav8": "Usar los tracks GPX",
        "gpx": {
          "h": "Cómo usar los tracks GPX",
          "body": "<div class=\"g-warn\"><p><strong>Aviso importante:</strong> estos tracks GPX son una ayuda de orientación verificada sobre el terreno, pero no sustituyen la señalización oficial ni tu criterio. La Travessa no está señalizada como itinerario propio ni cuenta con asistencia durante el recorrido: caminarla es responsabilidad exclusiva de quien la realiza. Comprueba siempre las condiciones del día (tiempo, riesgo de incendio, tu propio estado físico) antes de salir.</p></div>\n           <p>Cada ficha de etapa tiene un botón para descargar su track en formato <strong>.gpx</strong>. Un GPX no es un mapa: es solo una lista de coordenadas. Para verlo y seguirlo necesitas una aplicación que lo importe — Google Maps normal no sirve para esto.</p>\n           <p><strong>No hace falta un GPS dedicado.</strong> Cualquier smartphone actual lleva chip GPS de serie, el mismo que usas para la ubicación normal. Un Garmin u otro GPS de montaña es una opción más, no un requisito.</p>\n           <div class=\"gpx-highlight\">\n             <p><strong>Aplicaciones gratuitas que sí leen GPX:</strong> OsmAnd, Organic Maps, Wikiloc, Komoot o Gaia GPS. Todas permiten importar el archivo y seguirlo en directo con tu posición en pantalla.</p>\n             <p><strong>Pasos:</strong> descarga el .gpx de la etapa → ábrelo con la app (opción \"Importar track\" o \"Abrir con\") → antes de salir, descarga también el mapa de esa zona en modo <em>offline</em> desde la propia app.</p>\n             <p>Esto último es imprescindible: como ya se advierte en este mismo circuito, hay tramos largos sin cobertura móvil. Un track offline es la diferencia entre orientarte y no.</p>\n           </div>"
        }
      },
      "terrain": {
        "eyebrow": "Antes de venir",
        "h": "¿Es para ti? Lo esencial en 10 segundos",
        "i1": "166,4 km en 8 etapas (o 53,6 km en 3 etapas) — ruta exigente, llicorella y desniveles fuertes",
        "iSeason": "Mejor época: abril–junio y septiembre–noviembre. Evita julio y agosto (35–38&nbsp;°C)",
        "iAgua": "Agua: 2,5–3&nbsp;L por etapa; 4–5&nbsp;L en las etapas 2 y 5",
        "i2": "Poca sombra, calor intenso en época estival",
        "i3": "Muy poca infraestructura turística fuera de fin de semana",
        "iSenal": "Señalización discontinua: no es un itinerario propio homologado",
        "iGpx": "Imprescindible llevar track GPX offline",
        "link": "Ver la guía práctica completa →"
      },
      "routeopt": {
        "h2": "Dos maneras de recorrerla",
        "fullH": "Travessa completa",
        "fullP": "166,4 km · 8 etapas · circuito cerrado",
        "fullBtn": "Ver las 8 etapas",
        "shortH": "Ruta corta",
        "shortP": "53,6 km · 3 etapas · primera toma de contacto",
        "shortBtn": "Ver ruta corta"
      },
      "falset": {
        "eyebrow": "Punto de entrada y salida",
        "h": "Falset: el nudo del circuito",
        "p": "Falset es la capital del Priorat y el mejor punto para empezar y cerrar la travessa: aquí convergen las conexiones hacia el resto de municipios, y es donde hay más servicios (tren, autobuses, coche, alojamiento).",
        "cta": "Cómo llegar a Falset →",
        "miniLabel": "Acceso rápido",
        "tren": "Tren: RENFE Rodalies R15, estación Marçà-Falset (2 km)",
        "bus": "Autobús: líneas comarcales Domènech, HIFE, Igualadina",
        "coche": "Coche: C-242 (Reus–Falset–Móra d'Ebre)",
        "avion": "Avión: aeropuerto de Reus, a 35 km"
      },
      "closing": {
        "text": "«Un viaje interior entre viñas de viticultura heroica, ermitas y barrancos silenciosos, donde <span class=\"accent\">cada curva del camino te invita a sentir más intensamente el paisaje</span>.»",
        "cta": "Preparar mi travessa"
      },
      "soon": {
        "h": "¿Ya te animas?",
        "p": "Apúntate con tu alias y la fecha en la que empiezas: verás tu nombre en la lista de caminantes junto a los demás.",
        "cta": "Inscribirme →"
      },
      "footer": {
        "left": "Travessa del Priorat — las 8 etapas verificadas sobre el terreno con GPX real.",
        "right": "v1.0 · circuito cerrado, 19 pueblos, 8/8 etapas verificadas"
      },
      "meta": {
        "title": "Travessa del Priorat · Gran travesía circular a pie",
        "description": "La Ruta del Priorat a pie, también llamada la ruta de los eremitas o la ruta del silencio: una travesía circular de 166 km y 8 etapas por los 19 pueblos del Priorat, verificada con GPX real."
      },
      "also": {
        "eyebrow": "También conocida como",
        "h2": "La gran travesía del Priorat: la ruta de los eremitas, la ruta del silencio",
        "p": "Antes de tener nombre oficial, esta travesía circular de <strong>166 km y 8 etapas</strong> ya se conocía de boca en boca de tres maneras. Aspira a ser la gran travesía de referencia en Catalunya y a nivel estatal — al nivel del Camino de Santiago, pero en un territorio mineral, austero y todavía poco pisado.",
        "n1": {
          "h": "La Ruta del Priorat a pie",
          "p": "El nombre más literal: 19 pueblos de la Denominació d'Origen Qualificada, unidos a pie por primera vez en un único circuito cerrado."
        },
        "n2": {
          "h": "La Ruta de los Eremitas",
          "p": "Por la Cartoixa d'Escaladei y la red de ermitas y monasterios —hoy en ruinas casi todos— que poblaron estas montañas antes que los viñedos."
        },
        "n3": {
          "h": "La Ruta del Silencio",
          "p": "Por lo que no hay: apenas infraestructura turística, apenas sombra, apenas ruido. Ocho etapas de llicorella, viento y vacío mineral."
        }
      },
      "backToTop": "Volver arriba",
      "rutacorta": {
        "eyebrow": "Alternativa de 3 días",
        "h2": "Ruta Curta, 3 etapes",
        "p": "Mismo inicio que el circuito completo — etapas 1 y 2 — pero al llegar a Bellmunt del Priorat, un tercer día cierra el círculo directamente hasta Falset, ya verificado con GPX real.",
        "day": "Día",
        "total": "Total de la ruta corta: <strong>{km} km</strong> · +{gain} m / −{loss} m de desnivel acumulado, verificado con GPX real en las 3 etapas."
      }
    },
    "info": {
      "nav": {
        "normativa": "Normativa",
        "patrimonio": "Patrimonio",
        "servicios": "Servicios",
        "back": "← Volver al circuito"
      },
      "hero": {
        "eyebrow": "Antes de salir",
        "h1": "Información práctica",
        "p": "Normativa del parque natural, patrimonio espiritual del Priorat y los servicios que necesitas para planear el circuito: variantes, contacto oficial y de dónde salen estos datos.",
        "back": "← Volver al circuito"
      },
      "normativa": {
        "eyebrow": "Antes de cada etapa",
        "h2": "Normativa y permisos",
        "p": "Buena parte del circuito (etapas 3 a 8) discurre por el Parc Natural de la Serra de Montsant. No es un trámite burocrático: es lo que te mantiene a salvo y protege el espacio.",
        "parc": {
          "h": "Parc Natural de la Serra de Montsant",
          "body": "<p>Declarado por el Decret 131/2002, protege cerca de 9.242 hectáreas repartidas entre 11 municipios: Cabacés, Cornudella de Montsant, La Bisbal de Falset, La Figuera, La Morera de Montsant, La Vilella Alta, La Vilella Baixa, Margalef, Poboleda, Torroja del Priorat y Ulldemolins.</p>\n           <p>No hace falta un permiso individual para caminar por sus senderos homologados, pero sí conviene consultar antes de salir si hay restricciones puntuales de acceso (obras, repoblaciones, riesgo de incendio — ver el Pla Alfa más abajo).</p>\n           <p><a href=\"https://parcsnaturals.gencat.cat/es/xarxa-de-parcs/serra-montsant/\" target=\"_blank\" rel=\"noopener\">Web oficial del parque (Generalitat de Catalunya) →</a></p>"
        },
        "alfa": {
          "h": "Pla Alfa: riesgo diario de incendio",
          "body": "<p>Catalunya regula el acceso a espacios forestales con el Pla Alfa, un mapa que se actualiza cada día según el riesgo real de incendio. En niveles altos, algunas actividades —incluido el senderismo— pueden quedar directamente prohibidas en ciertas zonas.</p>\n           <p><strong>Consúltalo la misma mañana de cada etapa</strong>, no la noche anterior: el nivel puede cambiar con el pronóstico del día.</p>\n           <iframe src='https://experience.arcgis.com/experience/2cf7ebbe492f401db826cb21eae9bfae' title='Mapa del Pla Alfa de riesgo de incendio' frameborder='0' allowfullscreen width='100%' style='height:min(650px, 80vh);'></iframe>",
          "lvl0": "Bajo",
          "lvl1": "Medio",
          "lvl2": "Alto",
          "lvl3": "Extremo — acceso restringido",
          "link": "Consultar el mapa oficial de riesgo de hoy →"
        },
        "normas": {
          "h": "Normas generales dentro del parque",
          "body": "<ul>\n            <li>No encender fuego ni fumar fuera de zonas habilitadas, en ninguna época del año.</li>\n            <li>No acampar fuera de las áreas autorizadas.</li>\n            <li>Respeta los cierres, fincas privadas y masies — el sendero homologado no siempre coincide con el camino más directo.</li>\n            <li>Llévate toda tu basura, incluida la orgánica.</li>\n            <li>Perros siempre atados: hay ganado y fauna protegida en el parque.</li>\n            <li>No salgas del trazado marcado, sobre todo en los tramos de llicorella suelta.</li>\n           </ul>\n           <p>Esta es una guía general de comportamiento en espacios naturales protegidos catalanes; consulta siempre la normativa vigente en la web oficial del parque antes de salir.</p>"
        }
      },
      "patrimonio": {
        "eyebrow": "No es solo un sendero",
        "h2": "Patrimonio espiritual y cultural",
        "p": "La travessa cruza siglos de vida monástica, eremítica y minera. Estos son los lugares con historia documentada — los iremos ampliando a medida que verifiquemos más.",
        "intro": "El patrimonio del Priorat no es un catálogo de edificios sueltos: es una red con un centro de gravedad claro. Durante siglos, <strong>la Cartoixa d'Escaladei</strong> gobernó como prior toda la comarca — de ahí su nombre —, y a su alrededor fue creciendo un cinturón de ermitas y santuarios menores, unos fundados por ermitaños solitarios siglos antes que la propia cartuja, otros construidos después bajo su dominio directo. La Guerra Civil dejó una cicatriz visible en varios de ellos —quemados en 1936, reconstruidos en la posguerra—, y esa capa de memoria reciente convive con balmas ocupadas desde el Paleolítico. A esa red espiritual se suma otra, civil: el castillo de Falset, las minas de plomo de Bellmunt y las «catedrales del vino» modernistas de Falset y Cornudella cuentan la otra mitad de la historia de la comarca — el poder, el trabajo y la tierra. Hemos agrupado los 28 lugares documentados por su cercanía a las etapas del circuito —sumando también los cellers de referencia de cada pueblo—, para que decidas con qué desvío te quedas.",
        "badge": {
          "monasterio": "Monasterio · s. XII",
          "ermita": "Ermita",
          "romanico": "Románico · s. XII"
        },
        "mapsLabel": "Ver en Google Maps",
        "monestirs": {
          "h": "Monasterios del Priorat, en conjunto",
          "body": "<p>Además de la Cartoixa d'Escaladei, la comarca tuvo una pequeña red de comunidades monásticas hoy casi todas en ruinas o reconvertidas: Santa Maria de Bonrepòs y Santa Maria de Montsant (La Morera de Montsant), Santa Maria de Poboleda —el asentamiento eremítico previo a la propia cartuja—, el Monestir de Bíclarum y Santa Maria de Vallclara (Cabacés), y Sant Marçal (Marçà), entre otros. La mayoría solo se conserva como topónimo, muro suelto o masía reconvertida.</p>\n           <p><a href=\"https://www.google.com/maps/d/u/0/viewer?mid=1i9-R9ha4l8mYncpbZEWlM_vBz_Dgux7v&femb=1&ll=40.99018008166303%2C1.0995174463919&z=9\" target=\"_blank\" rel=\"noopener\">Ver el mapa completo de monasterios del Priorat →</a></p>"
        },
        "escaladei": {
          "h": "Cartoixa d'Escaladei",
          "body": "<p>Fundada en 1194, fue la primera cartuja de toda la península ibérica. De su nombre en latín, <em>Prioratus</em> — el territorio gobernado por su prior — deriva el nombre de toda la comarca: Priorat.</p>\n           <p>Hoy es un conjunto en ruinas consolidadas que se puede visitar. Cierra los lunes (salvo festivo). Entrada en torno a 5&nbsp;€, gratuita el último martes de mes de octubre a junio y para menores de 16 años.</p>\n           <p>Está en la etapa 7 del circuito (Poboleda → Escaladei → La Vilella Alta → Torroja del Priorat).</p>"
        },
        "santantoni": {
          "h": "Ermita de Sant Antoni",
          "body": "<p>En el Congost de Fraguerau, cerca de Ulldemolins, es el primer punto de referencia de la ruta que sube por el desfiladero del río Montsant hacia Sant Bartomeu. Punto de partida habitual para explorar la garganta.</p>\n           <p>Está en la etapa 5 del circuito (Margalef → Ulldemolins → Cornudella).</p>"
        },
        "bartomeu": {
          "h": "Sant Bartomeu de Fraguerau",
          "body": "<p>Ermita románica de una sola nave, protegida como Bien Cultural de Interés Local. La fundó hacia 1160 el ermitaño fra Guerau Miquel, que vivía en una balma junto al templo; en 1192 los reyes Alfonso el Casto y Sança le cedieron parte del valle del Montsant.</p>\n           <p>En 1210 pasó a los Balb de Lleida, dando origen al monasterio cisterciense de Santa Maria de Bonrepòs, y más tarde quedó bajo el dominio de la Cartoixa d'Escaladei — su escudo, con la fecha de 1799, todavía se ve en la puerta. Estuvo habitada hasta 1851 y fue restaurada en 1970.</p>\n           <p>Se llega por el GR-65-5 desde Ulldemolins, pasando antes por la ermita de Sant Antoni.</p>"
        },
        "relato": "<p>«El nombre de esta comarca lo puso un prior. Durante siglos, cada bancal de llicorella, cada ermita excavada en la balma, cada mina de plomo de Bellmunt, respondió a la misma cartuja que hoy solo asoma en ruinas entre Cornudella y Poboleda. Caminar el circuito es cruzar ese mapa: del silencio monástico de Escaladei al bullicio minero de Bellmunt, hasta la memoria más reciente de la DOQ, que convirtió la misma tierra pobre en uno de los vinos más caros de España.»</p>"
      },
      "servicios": {
        "eyebrow": "Planea tu paso",
        "h2": "Servicios para el peregrino",
        "p": "No todo el mundo tiene 8 días. Estas son las formas realistas de recorrer el circuito, según el tiempo que tengas.",
        "v1": {
          "label": "Circuito completo",
          "h": "8 días",
          "p": "Los 19 municipios, cada uno una vez. La travessa completa tal como está descrita en las 8 fichas de etapa, verificadas con GPX real."
        },
        "v2": {
          "label": "Ruta corta",
          "h": "3 días",
          "body": "<p>Etapas 1 y 2: Falset → Marçà → Capçanes → Els Guiamets → El Masroig → El Molar → Bellmunt del Priorat. El tercer día cierra el círculo por un tramo directo Bellmunt–Falset, ya verificado con GPX real (14,3 km, dificultad moderada) — <a href=\"index.html#ruta-corta\">ver la ficha completa de las 3 etapas</a>.</p>\n     <p>Las tres etapas empiezan y terminan en Falset, así que no hace falta transporte de vuelta.</p>"
        },
        "registro": {
          "h": "Apúntate y certifica tu paso",
          "body": "<p>Antes de salir, <a href=\"inscripcion.html\">apúntate con tu alias</a>. Cuando termines, <a href=\"certificar.html\">certifica la travessa</a> subiendo 4 fotos en puntos concretos (fin de etapa 2, fin de etapa 5, etapa 7 y el cierre en Falset): alguien las revisa a mano y, si encajan, tu alias queda marcado como verificado en la <a href=\"finalizados.html\">lista pública de caminantes</a>.</p>"
        },
        "sello": "Información de esta página contrastada con el directorio oficial de <a href=\"https://www.turismepriorat.org\" target=\"_blank\" rel=\"noopener\">Turisme Priorat</a> y fuentes patrimoniales citadas (Viquipèdia, enciclopedia.cat, Generalitat de Catalunya). Actualizada por última vez en julio de 2026."
      },
      "footer": {
        "left": "Travessa del Priorat — información práctica, sujeta a cambios normativos.",
        "right": "v1.0 · normativa, patrimonio y servicios"
      },
      "meta": {
        "title": "Información práctica · Travessa del Priorat"
      },
      "backToTop": "Volver arriba"
    },
    "inscripcion": {
      "nav": {
        "back": "← Volver al circuito",
        "list": "Ver caminantes"
      },
      "hero": {
        "eyebrow": "El primer paso ya es tuyo",
        "h1": "Deja tu huella en la llicorella",
        "p": "19 pueblos. 8 etapas. Una tierra que no perdona la improvisación.",
        "kicker": "Apúntate con tu alias y quedará escrito junto al de quienes también <span class=\"accent\">se han atrevido</span>.",
        "h2": "La Ruta del Priorat a pie · la ruta de los eremitas · la ruta del silencio"
      },
      "notice": {
        "text": "Esto es una inscripción informal, tipo libro de firmas: <strong>no hay verificación de identidad ni de que hayas completado realmente la ruta</strong>. Tu correo se guarda solo por si queremos avisarte de novedades — nunca se muestra en la lista pública."
      },
      "section": {
        "who": "Quién eres",
        "route": "Tu travessa"
      },
      "form": {
        "alias": "Alias",
        "aliasErr": "Escribe un alias (2-30 caracteres).",
        "email": "Correo electrónico",
        "emailHint": "No se muestra públicamente, solo tu alias.",
        "emailErr": "Escribe un correo válido.",
        "origen": "¿De dónde vienes?",
        "origenErr": "Escribe de dónde vienes.",
        "optional": "(opcional)",
        "variante": "Variante que vas a caminar",
        "varianteErr": "Elige la variante que vas a hacer.",
        "variantePlaceholder": "Elige una variante…",
        "variante1": "Circuito completo · 8 días · ~166,4 km",
        "variante2": "Ruta corta · 3 días · Falset–Bellmunt–Falset (~53,6 km, verificado con GPX real)",
        "date": "Día de inicio de la ruta",
        "dateErr": "Elige una fecha.",
        "mensaje": "¿Por qué te atreves con el Priorat?",
        "consentRequired": "He leído y acepto la <a href=\"#\" id=\"open-legal-consent\">política de privacidad</a>. Mis datos se usarán únicamente para gestionar mi inscripción y enviarme la información de la ruta.",
        "consentPublic": "Quiero que mi alias, la variante elegida, mi origen y mi mensaje (si los relleno) se muestren públicamente en la lista de caminantes. Mi correo nunca se muestra. <em>Opcional: si lo desmarcas, tu inscripción se guarda igualmente pero no aparecerás en la lista pública.</em>",
        "consentErr": "Marca la casilla para poder inscribirte.",
        "submit": "Inscribirme",
        "submitting": "Guardando…",
        "submitErr": "No hemos podido guardar tu inscripción. Comprueba tu conexión e inténtalo de nuevo.",
        "aliasPlaceholder": "p. ej. Caminante del Montsant",
        "emailPlaceholder": "tú@ejemplo.com",
        "origenPlaceholder": "Ciudad o país",
        "mensajePlaceholder": "Una frase corta — se mostrará junto a tu alias"
      },
      "manifest": {
        "eyebrow": "El código del peregrino",
        "intro": "Esta aventura no es ninguna carrera contra el cronómetro, sino un viaje para el alma.",
        "prep": {
          "h": "Preparación y libertad de ruta",
          "p": "La Travessa no está señalizada ni asistida: cada persona camina bajo su propia responsabilidad, con el equipo, el ritmo y las provisiones que considere necesarias."
        },
        "full": {
          "h": "La experiencia completa: 8 días",
          "p": "El circuito íntegro de 166,4 km por las 19 villas, viviendo el Priorat a fondo, etapa a etapa, de refugio en refugio."
        },
        "short": {
          "h": "La escapada esencial: 3 días",
          "p": "La ruta corta de 53,6 km entre Falset y Bellmunt del Priorat, ideal si dispones de menos tiempo pero quieres sentir el silencio de la llicorella."
        },
        "signature": "El Silencio en ruta. Priorat."
      },
      "success": {
        "h": "¡Listo!",
        "p": "Tu alias ya está en la lista. <a href=\"finalizados.html\" style=\"color:var(--samfaina)\">Ver la lista de caminantes →</a><br>Cuando termines la ruta, <a href=\"certificar.html\" style=\"color:var(--samfaina)\">certifícala con 4 fotos →</a>"
      },
      "footer": {
        "text": "Travessa del Priorat — inscripción informal, sin verificación de identidad."
      },
      "meta": {
        "title": "Inscripción · Travessa del Priorat",
        "description": "Apúntate a la Travessa del Priorat: la Ruta del Priorat a pie, la ruta de los eremitas, la ruta del silencio. 166 km, 8 etapas, 19 pueblos."
      }
    },
    "certificar": {
      "nav": {
        "back": "← Volver al circuito",
        "list": "Ver caminantes"
      },
      "hero": {
        "eyebrow": "Última etapa",
        "h1": "Certifica que la has completado",
        "p": "Sube 4 fotos tomadas en puntos concretos de la ruta. Solo pueden acceder aquí las personas ya inscritas."
      },
      "notice": {
        "gate": "Esta página solo es para quien ya se <a href=\"inscripcion.html\" style=\"color:var(--samfaina)\">inscribió</a>. Escribe el alias y el correo exactos que usaste entonces.",
        "upload": "<strong>Importante:</strong> subir las fotos no te marca como verificado al instante. Alguien las revisará a mano para confirmar que corresponden a los 4 puntos pedidos. Puede tardar unos días."
      },
      "gate": {
        "alias": "Tu alias",
        "email": "Tu correo (el mismo de la inscripción)",
        "submit": "Acceder",
        "err": "No encontramos esa combinación de alias y correo entre las inscripciones. Revisa que los escribiste igual que al inscribirte.",
        "serverErr": "No hemos podido comprobarlo ahora mismo. Comprueba tu conexión e inténtalo de nuevo en un momento.",
        "lock": "Demasiados intentos. Espera {s} segundos antes de volver a probar."
      },
      "welcome": "Hola, {alias} — sube tus 4 fotos cuando quieras.",
      "alreadyCert": {
        "title": "Ya recibimos tu certificación",
        "body": "Este alias y correo ya enviaron sus 4 fotos desde este mismo dispositivo el {date}. Si crees que es un error o necesitas reenviarlas, escríbenos a ruta.silenci@gmail.com."
      },
      "cp": {
        "label1": "Punto 1 · fin etapa 2",
        "h1": "Bellmunt del Priorat",
        "p1": "Foto en el pueblo o en el Museu de les Mines, con algo que identifique el lugar.",
        "label2": "Punto 2 · fin etapa 5",
        "h2": "Cornudella de Montsant",
        "p2": "Foto en el pueblo, idealmente con la Serra de Montsant al fondo.",
        "label3": "Punto 3 · etapa 7",
        "h3": "Cartoixa d'Escaladei",
        "p3": "Foto en las ruinas del monasterio.",
        "label4": "Punto 4 · cierre del circuito",
        "h4": "Falset",
        "p4": "Foto en el Castell de Falset o en la plaza del pueblo, cerrando el círculo.",
        "dzHl": "Toca para elegir",
        "dzOr": "o arrastra una foto aquí",
        "fileErr": "Ese archivo no parece una imagen válida.",
        "compressing": "comprimiendo…",
        "ready": "lista para enviar",
        "remove": "Quitar",
        "submit": "Enviar fotos",
        "submitting": "Enviando…",
        "missing": "Faltan {n} fotos por subir.",
        "submitErr": "No se ha podido enviar. Comprueba tu conexión e inténtalo de nuevo."
      },
      "success": {
        "h": "¡Fotos enviadas!",
        "p": "Las revisaremos y, si todo encaja, tu alias aparecerá marcado como verificado en la lista de caminantes. Esto no es automático: alguien las mira a mano."
      },
      "footer": {
        "text": "Travessa del Priorat — verificación manual, no automática."
      },
      "meta": {
        "title": "Certificar la travessa · Travessa del Priorat"
      }
    },
    "finalizados": {
      "nav": {
        "back": "← Volver al circuito",
        "signup": "Inscribirme"
      },
      "hero": {
        "eyebrow": "Quién ya se ha atrevido",
        "h1": "Caminantes de la travessa",
        "p": "Lista informal, tipo libro de firmas: nadie ha verificado que estos alias hayan completado realmente la ruta. El «Verificado» solo indica que alguien del proyecto ha revisado fotos enviadas por correo."
      },
      "stats": {
        "total": "Inscritos",
        "verified": "Verificados",
        "completo": "Circuito completo",
        "origenes": "Orígenes distintos"
      },
      "toolbar": {
        "search": "Buscar por alias u origen…",
        "allVariants": "Todas las variantes",
        "vCompleto": "Circuito completo",
        "sortRecent": "Más recientes",
        "sortAlias": "Por alias",
        "loading": "Cargando caminantes…",
        "vCorta": "Ruta corta (3 días)"
      },
      "variant": {
        "completo": "Circuito completo",
        "corta": "Ruta corta (3 días)"
      },
      "card": {
        "verified": "✓ Verificado",
        "start": "Inicio"
      },
      "empty": {
        "h": "Todavía nadie se ha apuntado",
        "p": "Sé la primera persona en dejar su alias escrito en esta lista.",
        "cta": "Inscribirme →"
      },
      "footer": {
        "text": "Travessa del Priorat — lista pública informal, sin verificación de identidad. Los correos nunca se muestran."
      },
      "meta": {
        "title": "Caminantes · Travessa del Priorat"
      }
    },
    "admin": {
      "meta": {
        "title": "Admin · Travessa del Priorat"
      },
      "h1": "Travessa del Priorat — admin",
      "sub": "Panel para marcar como verificadas las inscripciones cuyas 4 fotos ya has revisado en tu correo.",
      "hdrList": "Ver caminantes",
      "hdrBack": "← Volver al circuito",
      "notice": {
        "strong": "Esto no es seguridad real.",
        "body": "Es solo una contraseña simple en el propio JavaScript de la página, pensada para que un visitante casual no toque nada por error — cualquiera que mire el código fuente puede verla. No la uses para nada sensible."
      },
      "gate": {
        "placeholder": "Contraseña de administración",
        "btn": "Entrar",
        "err": "Contraseña incorrecta.",
        "checking": "Comprobando…",
        "notConfigured": "Configura primero el backend de Google Sheets (ver INSTRUCCIONES.md)."
      },
      "toolbar": {
        "searchPlaceholder": "Buscar por alias o correo…",
        "all": "Todos los estados",
        "verified": "Solo verificados",
        "pending": "Solo pendientes",
        "export": "↓ Exportar CSV",
        "reload": "↻ Recargar",
        "logout": "Salir"
      },
      "table": {
        "alias": "Alias",
        "email": "Correo",
        "variante": "Variante",
        "inicio": "Inicio",
        "recibido": "Recibido",
        "mensaje": "Mensaje",
        "estado": "Estado",
        "accion": "Acción"
      },
      "badge": {
        "verified": "✓ Verificado",
        "pending": "Pendiente"
      },
      "action": {
        "verify": "Marcar verificado",
        "unverify": "Quitar verificación",
        "saved": "Guardado ✓",
        "notify": "✉ Enviar confirmación",
        "notifying": "Enviando…",
        "notified": "✓ Notificado",
        "notifyError": "No se pudo enviar el correo."
      },
      "count": "{n} inscripciones",
      "empty": "No hay inscripciones que coincidan.",
      "confirm": {
        "h": "¿Quitar la verificación?",
        "text": "\"{alias}\" dejará de aparecer como verificado en la lista pública de caminantes.",
        "cancel": "Cancelar",
        "ok": "Sí, quitarla"
      },
      "variant": {
        "completo": "Circuito completo",
        "corta": "Ruta corta (3 días)"
      }
    }
  },
  "ca": {
    "home": {
      "nav": {
        "red": "La xarxa",
        "pueblos": "19 pobles",
        "mapa": "Mapa",
        "etapas": "Etapes",
        "guia": "Guia",
        "info": "Info pràctica",
        "inscripcion": "Inscriure'm",
        "finalizados": "Caminants"
      },
      "hero": {
        "eyebrow": "Gran travessa circular · 100% senderista",
        "h1": "Els 19 pobles del Priorat, <em>units a peu</em>.",
        "lead": "El Priorat és una terra dura i solitària, de vessants impossibles i sòls de llicorella on la vida sempre ha estat una batalla cos a cos amb la roca. <span class=\"accent\">Seguir la ruta dels seus 19 pobles és una experiència èpica</span>: un viatge interior entre vinyes de viticultura heroica, ermites i barrancs silenciosos, on cada revolt del camí et convida a sentir més intensament el paisatge i a descobrir una espiritualitat feta d'esforç, contemplació i bellesa extrema.",
        "sub": "Circuit proposat de 8 etapes que aprofita trams del GR‑174 i altres senders senyalitzats, enllaçats mitjançant camins rurals i pistes forestals entre els 19 pobles del Priorat, amb Falset com a porta d'entrada i sortida. No és un itinerari propi homologat ni senyalitzat de manera contínua.",
        "quick1": "19 pobles",
        "quick2": "Eix GR‑174",
        "quick3": "Inici recomanat: Falset",
        "quick4": "Recorregut verificat amb GPX real",
        "stat1": "Municipis",
        "stat2": "Etapes",
        "stat3": "Trams de xarxa existent",
        "stat4": "Circuit tancat",
        "hub": "node central",
        "cta1": "Explorar les etapes",
        "cta2": "Veure mapa interactiu"
      },
      "red": {
        "eyebrow": "Com s'aprofita el que ja existeix",
        "h2": "Una xarxa, no un traçat nou",
        "p": "El GR‑174 fa de columna vertebral; el PR‑C i els senders del Montsant tanquen els enllaços que falten.",
        "gr": {
          "h": "GR‑174",
          "p": "Eix principal a Falset, Gratallops, Poboleda, Escaladei i Cornudella. La columna vertebral del circuit."
        },
        "pr": {
          "h": "PR‑C i senders locals",
          "p": "Enllacen els municipis que no queden directament sobre el GR‑174, sense recórrer a l'asfalt."
        },
        "local": {
          "h": "Camins i pistes forestals",
          "p": "Camins històrics, miners i agrícoles per a les connexions rurals que encara no tenen sender homologat."
        }
      },
      "pueblos": {
        "eyebrow": "Directori",
        "h2": "Els 19 municipis",
        "p": "Cada poble, amb el tipus de connexió senderista recomanada per arribar-hi."
      },
      "mapa": {
        "eyebrow": "Primera fase interactiva",
        "h2": "El mapa",
        "p": "Ubicació real dels 19 municipis i traçat real de les 8 etapes, verificat amb GPX.",
        "legendGr": "Node GR-174",
        "legendPr": "Municipi",
        "note": "Les 8 etapes verificades amb GPX real (línia sòlida).",
        "popupConn": "Connexió",
        "statusVerified": "Les 8 etapes verificades amb GPX real",
        "statusShortRoute": "Ruta curta (3 dies): les 3 etapes verificades amb GPX real",
        "legendCorta": "Ruta curta (3 dies)",
        "shortRouteLabel": "Ruta curta (3 dies) — tram Bellmunt–Falset, verificat amb GPX real"
      },
      "etapas": {
        "eyebrow": "Traçat proposat",
        "h2": "Vuit etapes, un cercle tancat",
        "p": "Cada un dels 19 municipis es visita una sola vegada. Falset obre i tanca el circuit.",
        "etapaLabel": "Etapa",
        "dist": "Distància (línia recta)",
        "diff": "Dificultat",
        "time": "Temps estimat",
        "diffFacil": "Fàcil",
        "diffModerada": "Moderada",
        "diffExigente": "Exigent",
        "tableCaption": "Toca una fila per obrir aquesta etapa",
        "tableEtapa": "Etapa",
        "tableKm": "Km",
        "tableTiempo": "Temps",
        "tableDesnivel": "Desnivell +",
        "tableDificultad": "Dificultat",
        "summary": "Circuit tancat · 19 municipis, cadascun una vegada · <strong>{km} km</strong> reals, verificats amb GPX a les 8 etapes",
        "meta": "desnivell i distància real del sender — pendents de traçat GPX verificat",
        "poi": "Què visitar",
        "eat": "On menjar",
        "sleep": "On dormir",
        "noOffer": "Sense oferta registrada — porta provisions",
        "distReal": "Distància (GPX real)",
        "gain": "Desnivell positiu",
        "loss": "Desnivell negatiu",
        "gpxVerified": "Track GPX verificat",
        "gpxDownload": "Descarregar .gpx",
        "gpxDisclaimer": "Orientatiu — no substitueix la senyalització oficial ni el teu criteri sobre el terreny. Ús sota la teva pròpia responsabilitat.",
        "elev": "Perfil d'elevació (nuclis)",
        "elevNote": "Altitud real de cada nucli, unida en línia recta — no segueix el perfil real del sender, pendent de traçat GPX.",
        "elevNoteReal": "Perfil real extret del track GPX verificat, punt a punt sobre el sender.",
        "mapPreview": "Vista prèvia del traçat",
        "mapExpand": "Ampliar",
        "source": "Menjar i dormir: directori oficial de <a href=\"https://www.turismepriorat.org\" target=\"_blank\" rel=\"noopener\">Turisme Priorat</a>, contrastat puntualment amb ressenyes de Google/Tripadvisor/Booking als establiments marcats amb ★ (no als 40 negocis llistats). Altituds: Idescat i Consell Regulador DOQ Priorat. Comprova horaris, disponibilitat i telèfons abans de sortir. Dades de restauració i allotjament de les 8 etapes revisades i ampliades l'agost de 2026, incorporant opcions a Marçà, El Molar, La Figuera, La Bisbal de Falset, Poboleda i Escaladei."
      },
      "guia": {
        "eyebrow": "Preparació",
        "h2": "Guia pràctica del pelegrí",
        "p": "Terreny agrest, poca ombra, calor forta i molt poca infraestructura turística fora de cap de setmana. Prepara't en conseqüència.",
        "nav1": "Quan anar-hi",
        "nav2": "Com arribar-hi",
        "nav3": "Aigua",
        "nav4": "Menjar",
        "nav5": "Calor",
        "nav6": "Terreny i calçat",
        "nav7": "Equipament",
        "cuando": {
          "h": "Quan anar-hi",
          "body": "<p><strong>Evita juliol i agost.</strong> El Priorat és una de les comarques més caloroses de l'interior de Catalunya; a l'estiu se superen fàcilment els 35–38&nbsp;°C, sense gaire ombra als trams entre vinyes i a la serra de Montsant.</p>\n           <p><strong>Millor època: abril–juny i setembre–novembre.</strong> Temperatures moderades, millor llum i els pobles solen tenir una mica més de vida.</p>\n           <p>Si camines a l'estiu per força major, comença abans de les 7:00 i para entre les 13:00 i les 17:00. Les etapes 2 i 5 (les més llargues i exposades) són les més perilloses amb calor forta.</p>\n           <div class=\"g-warn\"><p>A l'hivern, Siurana (737&nbsp;m, el punt més alt del recorregut) i la carena del Montsant poden tenir gelades o neu puntual: risc de terra lliscant més que tèrmic.</p></div>"
        },
        "llegar": {
          "h": "Com arribar-hi",
          "intro": "Falset és el node del circuit i el millor punt d'entrada i sortida. Així s'hi arriba:"
        },
        "agua": {
          "h": "Aigua: la prioritat número u",
          "body": "<p>Aquesta és la mancança real més seriosa del circuit: molts trams no tenen cap font fiable ni cap poble amb servei obert, i el terreny és sec gairebé tot l'any.</p>\n           <p><strong>Regla general:</strong> mínim 2,5–3 litres per persona i etapa en temporada mitjana; 4–5 litres a les etapes llargues (2 i 5) o amb calor forta. Surt sempre amb el dipòsit ple — no comptis reposar pel camí llevat que ho hagis confirmat tu mateix el mateix dia.</p>\n           <p>Porta electròlits, no només aigua: amb esforç sostingut diversos dies i calor, la pèrdua de sodi pesa tant com la d'aigua.</p>\n           <p><strong>Fonts de referència</strong> (sense garantia de potabilitat — porta pastilles potabilitzadores o filtre): Font del Mingot (Poboleda), Font de les Amades (a prop de Falset).</p>"
        },
        "comida": {
          "h": "Menjar i restauració",
          "body": "<p>Porta sempre menjar de reserva per a un dia sencer, encara que la fitxa de l'etapa marqui un lloc per menjar: en pobles de 100–300 habitants, un sol restaurant pot estar tancat per descans setmanal o fora de temporada.</p>\n           <p>Les <strong>etapes 3 i 4</strong> (Bellmunt→Cabacés i Cabacés→la Bisbal→Margalef) són les més crítiques: gairebé no hi ha oferta registrada — revisa el detall exacte a la fitxa de cada etapa, més avall en aquesta mateixa pàgina.</p>\n           <p>Els forns de pa obren d'hora, abans que qualsevol restaurant — són la teva millor opció per esmorzar fort. El Priorat gairebé no té supermercats fora de Falset i Cornudella: compra provisions per a diversos dies quan hi passis.</p>"
        },
        "calor": {
          "h": "Gestió de la calor",
          "body": "<p>Amb etapes de fins a 32,8&nbsp;km i fins a 14,5&nbsp;hores de caminada (etapes 2 i 5, les més llargues i exposades), i amb poca ombra en general, el cop de calor és un risc més real en aquesta ruta que perdre's.</p>\n           <p><strong>Esgotament per calor</strong> (freqüent, es resol parant): suor excessiva, feblesa, marejos, pell pàl·lida i humida. Para, busca ombra, beu aigua amb sals, descansa almenys 30 minuts.</p>\n           <div class=\"g-warn\"><p><strong>Cop de calor</strong> (urgència mèdica): pell calenta i seca, confusió, temperatura corporal molt alta. Truca al <strong>112</strong>, refreda la persona amb el que tinguis mentre arriba ajuda.</p></div>\n           <p>Senyal d'alarma primerenca: si deixes de suar amb calor forta i continues caminant, és moment de parar, no de continuar.</p>"
        },
        "terreno": {
          "h": "Terreny i calçat",
          "body": "<p>El sòl dominant és <strong>llicorella</strong> (pissarra negra), molt lliscant solta o mullada. Bota de muntanya amb bona sola d'agafament, no sabatilla llisa de trail — hi ha pedra solta a la pujada al Montsant i als camins miners de Bellmunt.</p>\n           <p>Bastons de trekking molt recomanables a les etapes 2 i 5 (més desnivell acumulat). Polaines lleugeres si camines amb vegetació baixa i matoll tancat.</p>"
        },
        "equipo": {
          "h": "Llista d'equipament per a 8 dies"
        },
        "nav8": "Fer servir els tracks GPX",
        "gpx": {
          "h": "Com fer servir els tracks GPX",
          "body": "<div class=\"g-warn\"><p><strong>Avís important:</strong> aquests tracks GPX són una ajuda d'orientació verificada sobre el terreny, però no substitueixen la senyalització oficial ni el teu criteri. La Travessa no està senyalitzada com a itinerari propi ni compta amb assistència durant el recorregut: caminar-la és responsabilitat exclusiva de qui la realitza. Comprova sempre les condicions del dia (temps, risc d'incendi, el teu propi estat físic) abans de sortir.</p></div>\n           <p>Cada fitxa d'etapa té un botó per descarregar el seu track en format <strong>.gpx</strong>. Un GPX no és un mapa: només és una llista de coordenades. Per veure'l i seguir-lo necessites una aplicació que l'importi — el Google Maps normal no serveix per a això.</p>\n           <p><strong>No cal un GPS dedicat.</strong> Qualsevol smartphone actual porta xip GPS de sèrie, el mateix que fas servir per a la ubicació normal. Un Garmin o un altre GPS de muntanya és una opció més, no un requisit.</p>\n           <div class=\"gpx-highlight\">\n             <p><strong>Aplicacions gratuïtes que sí que llegeixen GPX:</strong> OsmAnd, Organic Maps, Wikiloc, Komoot o Gaia GPS. Totes permeten importar l'arxiu i seguir-lo en directe amb la teva posició a la pantalla.</p>\n             <p><strong>Passos:</strong> descarrega el .gpx de l'etapa → obre'l amb l'app (opció \"Importar track\" o \"Obrir amb\") → abans de sortir, descarrega també el mapa d'aquella zona en mode <em>offline</em> des de la mateixa app.</p>\n             <p>Això últim és imprescindible: tal com ja s'avisa en aquest mateix circuit, hi ha trams llargs sense cobertura mòbil. Un track offline és la diferència entre orientar-te i no fer-ho.</p>\n           </div>"
        }
      },
      "terrain": {
        "eyebrow": "Abans de venir",
        "h": "És per a tu? L'essencial en 10 segons",
        "i1": "166,4 km en 8 etapes (o 53,6 km en 3 etapes) — ruta exigent, llicorella i desnivells forts",
        "iSeason": "Millor època: abril–juny i setembre–novembre. Evita juliol i agost (35–38&nbsp;°C)",
        "iAgua": "Aigua: 2,5–3&nbsp;L per etapa; 4–5&nbsp;L a les etapes 2 i 5",
        "i2": "Poca ombra, calor intensa en època estival",
        "i3": "Molt poca infraestructura turística fora de cap de setmana",
        "iSenal": "Senyalització discontínua: no és un itinerari propi homologat",
        "iGpx": "Imprescindible portar track GPX offline",
        "link": "Veure la guia pràctica completa →"
      },
      "routeopt": {
        "h2": "Dues maneres de recorrer-la",
        "fullH": "Travessa completa",
        "fullP": "166,4 km · 8 etapes · circuit tancat",
        "fullBtn": "Veure les 8 etapes",
        "shortH": "Ruta curta",
        "shortP": "53,6 km · 3 etapes · primer contacte",
        "shortBtn": "Veure ruta curta"
      },
      "falset": {
        "eyebrow": "Punt d'entrada i sortida",
        "h": "Falset: el node del circuit",
        "p": "Falset és la capital del Priorat i el millor punt per començar i tancar la travessa: aquí convergeixen les connexions cap a la resta de municipis, i és on hi ha més serveis (tren, autobusos, cotxe, allotjament).",
        "cta": "Com arribar a Falset →",
        "miniLabel": "Accés ràpid",
        "tren": "Tren: RENFE Rodalies R15, estació Marçà-Falset (2 km)",
        "bus": "Autobús: línies comarcals Domènech, HIFE, Igualadina",
        "coche": "Cotxe: C-242 (Reus–Falset–Móra d'Ebre)",
        "avion": "Avió: aeroport de Reus, a 35 km"
      },
      "closing": {
        "text": "«Un viatge interior entre vinyes de viticultura heroica, ermites i barrancs silenciosos, on <span class=\"accent\">cada revolt del camí et convida a sentir més intensament el paisatge</span>.»",
        "cta": "Preparar la meva travessa"
      },
      "soon": {
        "h": "Ja t'animes?",
        "p": "Inscriu-te amb el teu àlies i la data en què comences: veuràs el teu nom a la llista de caminants junt amb els altres.",
        "cta": "Inscriure'm →"
      },
      "footer": {
        "left": "Travessa del Priorat — les 8 etapes verificades sobre el terreny amb GPX real.",
        "right": "v1.0 · circuit tancat, 19 pobles, 8/8 etapes verificades"
      },
      "meta": {
        "title": "Travessa del Priorat · Gran travessa circular a peu",
        "description": "La Ruta del Priorat a peu, també anomenada la ruta dels eremites o la ruta del silenci: una travessa circular de 166 km i 8 etapes pels 19 pobles del Priorat, verificada amb GPX real."
      },
      "also": {
        "eyebrow": "També coneguda com",
        "h2": "La gran travessa del Priorat: la ruta dels eremites, la ruta del silenci",
        "p": "Abans de tenir nom oficial, aquesta travessa circular de <strong>166 km i 8 etapes</strong> ja es coneixia de boca en boca de tres maneres. Aspira a ser la gran travessa de referència a Catalunya i a nivell estatal — al nivell del Camí de Santiago, però en un territori mineral, auster i encara poc trepitjat.",
        "n1": {
          "h": "La Ruta del Priorat a peu",
          "p": "El nom més literal: 19 pobles de la Denominació d'Origen Qualificada, units a peu per primera vegada en un únic circuit tancat."
        },
        "n2": {
          "h": "La Ruta dels Eremites",
          "p": "Per la Cartoixa d'Escaladei i la xarxa d'ermites i monestirs —avui en ruïnes gairebé tots— que van poblar aquestes muntanyes abans que les vinyes."
        },
        "n3": {
          "h": "La Ruta del Silenci",
          "p": "Pel que no hi ha: gairebé infraestructura turística, gairebé ombra, gairebé soroll. Vuit etapes de llicorella, vent i buit mineral."
        }
      },
      "backToTop": "Tornar amunt",
      "rutacorta": {
        "eyebrow": "Alternativa de 3 dies",
        "h2": "Ruta Curta, 3 etapes",
        "p": "Mateix inici que el circuit complet — etapes 1 i 2 — però en arribar a Bellmunt del Priorat, un tercer dia tanca el cercle directament fins a Falset, ja verificat amb GPX real.",
        "day": "Dia",
        "total": "Total de la ruta curta: <strong>{km} km</strong> · +{gain} m / −{loss} m de desnivell acumulat, verificat amb GPX real a les 3 etapes."
      }
    },
    "info": {
      "nav": {
        "normativa": "Normativa",
        "patrimonio": "Patrimoni",
        "servicios": "Serveis",
        "back": "← Tornar al circuit"
      },
      "hero": {
        "eyebrow": "Abans de sortir",
        "h1": "Informació pràctica",
        "p": "Normativa del parc natural, patrimoni espiritual del Priorat i els serveis que necessites per planificar el circuit: variants, contacte oficial i d'on surten aquestes dades.",
        "back": "← Tornar al circuit"
      },
      "normativa": {
        "eyebrow": "Abans de cada etapa",
        "h2": "Normativa i permisos",
        "p": "Bona part del circuit (etapes 3 a 8) discorre pel Parc Natural de la Serra de Montsant. No és un tràmit burocràtic: és el que et manté segur i protegeix l'espai.",
        "parc": {
          "h": "Parc Natural de la Serra de Montsant",
          "body": "<p>Declarat pel Decret 131/2002, protegeix prop de 9.242 hectàrees repartides entre 11 municipis: Cabacés, Cornudella de Montsant, la Bisbal de Falset, la Figuera, la Morera de Montsant, la Vilella Alta, la Vilella Baixa, Margalef, Poboleda, Torroja del Priorat i Ulldemolins.</p>\n           <p>No cal cap permís individual per caminar pels seus senders homologats, però convé consultar abans de sortir si hi ha restriccions puntuals d'accés (obres, repoblacions, risc d'incendi — vegeu el Pla Alfa més avall).</p>\n           <p><a href=\"https://parcsnaturals.gencat.cat/es/xarxa-de-parcs/serra-montsant/\" target=\"_blank\" rel=\"noopener\">Web oficial del parc (Generalitat de Catalunya) →</a></p>"
        },
        "alfa": {
          "h": "Pla Alfa: risc diari d'incendi",
          "body": "<p>Catalunya regula l'accés a espais forestals amb el Pla Alfa, un mapa que s'actualitza cada dia segons el risc real d'incendi. En nivells alts, algunes activitats —inclòs el senderisme— poden quedar directament prohibides en certes zones.</p>\n           <p><strong>Consulta'l el mateix matí de cada etapa</strong>, no la nit anterior: el nivell pot canviar amb la previsió del dia.</p>\n           <iframe src='https://experience.arcgis.com/experience/2cf7ebbe492f401db826cb21eae9bfae' title='Mapa del Pla Alfa de risc d&#39;incendi' frameborder='0' allowfullscreen width='100%' style='height:min(650px, 80vh);'></iframe>",
          "lvl0": "Baix",
          "lvl1": "Mitjà",
          "lvl2": "Alt",
          "lvl3": "Extrem — accés restringit",
          "link": "Consultar el mapa oficial de risc d'avui →"
        },
        "normas": {
          "h": "Normes generals dins del parc",
          "body": "<ul>\n            <li>No encendre foc ni fumar fora de zones habilitades, en cap època de l'any.</li>\n            <li>No acampar fora de les àrees autoritzades.</li>\n            <li>Respecta els tancaments, finques privades i masies — el sender homologat no sempre coincideix amb el camí més directe.</li>\n            <li>Emporta't tota la teva brossa, inclosa l'orgànica.</li>\n            <li>Gossos sempre lligats: hi ha bestiar i fauna protegida al parc.</li>\n            <li>No surtis del traçat marcat, sobretot als trams de llicorella solta.</li>\n           </ul>\n           <p>Aquesta és una guia general de comportament en espais naturals protegits catalans; consulta sempre la normativa vigent a la web oficial del parc abans de sortir.</p>"
        }
      },
      "patrimonio": {
        "eyebrow": "No és només un sender",
        "h2": "Patrimoni espiritual i cultural",
        "p": "La travessa creua segles de vida monàstica, eremítica i minera. Aquests són els llocs amb història documentada — els anirem ampliant a mesura que verifiquem més.",
        "intro": "El patrimoni del Priorat no és un catàleg d'edificis solts: és una xarxa amb un centre de gravetat clar. Durant segles, <strong>la Cartoixa d'Escaladei</strong> va governar com a prior tota la comarca — d'aquí el seu nom —, i al seu voltant va anar creixent un cinturó d'ermites i santuaris menors, alguns fundats per ermitans solitaris segles abans que la mateixa cartoixa, d'altres construïts després sota el seu domini directe. La Guerra Civil va deixar una cicatriu visible en diversos d'ells —cremats el 1936, reconstruïts a la postguerra—, i aquesta capa de memòria recent conviu amb balmes ocupades des del Paleolític. A aquesta xarxa espiritual se n'hi suma una altra, civil: el castell de Falset, les mines de plom de Bellmunt i les «catedrals del vi» modernistes de Falset i Cornudella expliquen l'altra meitat de la història de la comarca — el poder, el treball i la terra. Hem agrupat els 28 llocs documentats per la seva proximitat a les etapes del circuit —sumant-hi també els cellers de referència de cada poble—, perquè decideixis amb quina desviació et quedes.",
        "badge": {
          "monasterio": "Monestir · s. XII",
          "ermita": "Ermita",
          "romanico": "Romànic · s. XII"
        },
        "mapsLabel": "Veure a Google Maps",
        "monestirs": {
          "h": "Monestirs del Priorat, en conjunt",
          "body": "<p>A més de la Cartoixa d'Escaladei, la comarca va tenir una petita xarxa de comunitats monàstiques avui gairebé totes en ruïnes o reconvertides: Santa Maria de Bonrepòs i Santa Maria de Montsant (la Morera de Montsant), Santa Maria de Poboleda —l'assentament eremític previ a la mateixa cartoixa—, el Monestir de Bíclarum i Santa Maria de Vallclara (Cabacés), i Sant Marçal (Marçà), entre d'altres. La majoria només es conserva com a topònim, mur solt o masia reconvertida.</p>\n           <p><a href=\"https://www.google.com/maps/d/u/0/viewer?mid=1i9-R9ha4l8mYncpbZEWlM_vBz_Dgux7v&femb=1&ll=40.99018008166303%2C1.0995174463919&z=9\" target=\"_blank\" rel=\"noopener\">Veure el mapa complet de monestirs del Priorat →</a></p>"
        },
        "escaladei": {
          "h": "Cartoixa d'Escaladei",
          "body": "<p>Fundada el 1194, va ser la primera cartoixa de tota la península ibèrica. Del seu nom en llatí, <em>Prioratus</em> — el territori governat pel seu prior — deriva el nom de tota la comarca: Priorat.</p>\n           <p>Avui és un conjunt en ruïnes consolidades que es pot visitar. Tanca els dilluns (llevat de festiu). Entrada al voltant de 5&nbsp;€, gratuïta l'últim dimarts de mes d'octubre a juny i per a menors de 16 anys.</p>\n           <p>És a l'etapa 7 del circuit (Poboleda → Escaladei → la Vilella Alta → Torroja del Priorat).</p>"
        },
        "santantoni": {
          "h": "Ermita de Sant Antoni",
          "body": "<p>Al Congost de Fraguerau, a prop d'Ulldemolins, és el primer punt de referència de la ruta que puja pel congost del riu Montsant cap a Sant Bartomeu. Punt de partida habitual per explorar el congost.</p>\n           <p>És a l'etapa 5 del circuit (Margalef → Ulldemolins → Cornudella).</p>"
        },
        "bartomeu": {
          "h": "Sant Bartomeu de Fraguerau",
          "body": "<p>Ermita romànica d'una sola nau, protegida com a Bé Cultural d'Interès Local. La va fundar cap al 1160 l'ermità fra Guerau Miquel, que vivia en una balma vora el temple; el 1192 els reis Alfons el Cast i Sança li van cedir part de la vall del Montsant.</p>\n           <p>El 1210 va passar als Balb de Lleida, donant origen al monestir cistercenc de Santa Maria de Bonrepòs, i més tard va quedar sota el domini de la Cartoixa d'Escaladei — el seu escut, amb la data de 1799, encara es veu a la porta. Va estar habitada fins al 1851 i va ser restaurada el 1970.</p>\n           <p>S'hi arriba pel GR-65-5 des d'Ulldemolins, passant abans per l'ermita de Sant Antoni.</p>"
        },
        "relato": "<p>«El nom d'aquesta comarca el va posar un prior. Durant segles, cada marge de llicorella, cada ermita excavada a la balma, cada mina de plom de Bellmunt, va respondre a la mateixa cartoixa que avui només treu el cap en ruïnes entre Cornudella i Poboleda. Caminar el circuit és travessar aquest mapa: del silenci monàstic d'Escaladei al bullici miner de Bellmunt, fins a la memòria més recent del DOQ, que va convertir la mateixa terra pobra en un dels vins més cars d'Espanya.»</p>"
      },
      "servicios": {
        "eyebrow": "Planifica el teu pas",
        "h2": "Serveis per al pelegrí",
        "p": "No tothom té 8 dies. Aquestes són les formes realistes de recórrer el circuit, segons el temps que tinguis.",
        "v1": {
          "label": "Circuit complet",
          "h": "8 dies",
          "p": "Els 19 municipis, cadascun una vegada. La travessa completa tal com està descrita a les 8 fitxes d'etapa, verificades amb GPX real."
        },
        "v2": {
          "label": "Ruta curta",
          "h": "3 dies",
          "body": "<p>Etapes 1 i 2: Falset → Marçà → Capçanes → els Guiamets → el Masroig → el Molar → Bellmunt del Priorat. El tercer dia tanca el cercle per un tram directe Bellmunt–Falset, ja verificat amb GPX real (14,3 km, dificultat moderada) — <a href=\"index.html#ruta-corta\">veure la fitxa completa de les 3 etapes</a>.</p>\n     <p>Les tres etapes comencen i acaben a Falset, així que no cal transport de tornada.</p>"
        },
        "registro": {
          "h": "Inscriu-te i certifica el teu pas",
          "body": "<p>Abans de sortir, <a href=\"inscripcion.html\">inscriu-te amb el teu àlies</a>. Quan acabis, <a href=\"certificar.html\">certifica la travessa</a> pujant 4 fotos en punts concrets (final de l'etapa 2, final de l'etapa 5, etapa 7 i el tancament a Falset): algú les revisa a mà i, si encaixen, el teu àlies queda marcat com a verificat a la <a href=\"finalizados.html\">llista pública de caminants</a>.</p>"
        },
        "sello": "Informació d'aquesta pàgina contrastada amb el directori oficial de <a href=\"https://www.turismepriorat.org\" target=\"_blank\" rel=\"noopener\">Turisme Priorat</a> i fonts patrimonials citades (Viquipèdia, enciclopedia.cat, Generalitat de Catalunya). Actualitzada per última vegada el juliol de 2026."
      },
      "footer": {
        "left": "Travessa del Priorat — informació pràctica, subjecta a canvis normatius.",
        "right": "v1.0 · normativa, patrimoni i serveis"
      },
      "meta": {
        "title": "Informació pràctica · Travessa del Priorat"
      },
      "backToTop": "Tornar amunt"
    },
    "inscripcion": {
      "nav": {
        "back": "← Tornar al circuit",
        "list": "Veure caminants"
      },
      "hero": {
        "eyebrow": "El primer pas ja és teu",
        "h1": "Deixa la teva empremta a la llicorella",
        "p": "19 pobles. 8 etapes. Una terra que no perdona la improvisació.",
        "kicker": "Inscriu-te amb el teu àlies i quedarà escrit junt amb el de qui també <span class=\"accent\">s'hi ha atrevit</span>.",
        "h2": "La Ruta del Priorat a peu · la ruta dels eremites · la ruta del silenci"
      },
      "notice": {
        "text": "Això és una inscripció informal, tipus llibre de signatures: <strong>no hi ha verificació d'identitat ni que hagis completat realment la ruta</strong>. El teu correu es guarda només per si volem avisar-te de novetats — mai es mostra a la llista pública."
      },
      "section": {
        "who": "Qui ets",
        "route": "La teva travessa"
      },
      "form": {
        "alias": "Àlies",
        "aliasErr": "Escriu un àlies (2-30 caràcters).",
        "email": "Correu electrònic",
        "emailHint": "No es mostra públicament, només el teu àlies.",
        "emailErr": "Escriu un correu vàlid.",
        "origen": "D'on véns?",
        "origenErr": "Escriu d'on véns.",
        "optional": "(opcional)",
        "variante": "Variant que caminaràs",
        "varianteErr": "Tria la variant que faràs.",
        "variantePlaceholder": "Tria una variant…",
        "variante1": "Circuit complet · 8 dies · ~166,4 km",
        "variante2": "Ruta curta · 3 dies · Falset–Bellmunt–Falset (~53,6 km, verificat amb GPX real)",
        "date": "Dia d'inici de la ruta",
        "dateErr": "Tria una data.",
        "mensaje": "Per què t'atreveixes amb el Priorat?",
        "consentRequired": "He llegit i accepto la <a href=\"#\" id=\"open-legal-consent\">política de privacitat</a>. Les meves dades s'utilitzaran únicament per gestionar la meva inscripció i enviar-me la informació de la ruta.",
        "consentPublic": "Vull que el meu àlies, la variant escollida, el meu origen i el meu missatge (si els emplo) es mostrin públicament a la llista de caminants. El meu correu mai es mostra. <em>Opcional: si el desmarques, la teva inscripció es guarda igualment però no apareixeràs a la llista pública.</em>",
        "consentErr": "Marca la casella per poder inscriure't.",
        "submit": "Inscriure'm",
        "submitting": "Desant…",
        "submitErr": "No hem pogut desar la teva inscripció. Comprova la connexió i torna-ho a provar.",
        "aliasPlaceholder": "p. ex. Caminant del Montsant",
        "emailPlaceholder": "tu@exemple.com",
        "origenPlaceholder": "Ciutat o país",
        "mensajePlaceholder": "Una frase curta — es mostrarà al costat del teu àlies"
      },
      "manifest": {
        "eyebrow": "El codi del pelegrí",
        "intro": "Aquesta aventura no és cap carrera contra el cronòmetre, sinó un viatge per a l'ànima.",
        "prep": {
          "h": "Preparació i llibertat de ruta",
          "p": "La Travessa no està senyalitzada ni assistida: cada persona camina sota la seva pròpia responsabilitat, amb l'equip, el ritme i les provisions que consideri necessàries."
        },
        "full": {
          "h": "L'experiència completa: 8 dies",
          "p": "El circuit íntegre de 166,4 km per les 19 viles, vivint el Priorat a fons, etapa a etapa, de refugi en refugi."
        },
        "short": {
          "h": "L'escapada essencial: 3 dies",
          "p": "La ruta curta de 53,6 km entre Falset i Bellmunt del Priorat, ideal si disposes de menys temps però vols sentir el silenci de la llicorella."
        },
        "signature": "El Silenci en ruta. Priorat."
      },
      "success": {
        "h": "Fet!",
        "p": "El teu àlies ja és a la llista. <a href=\"finalizados.html\" style=\"color:var(--samfaina)\">Veure la llista de caminants →</a><br>Quan acabis la ruta, <a href=\"certificar.html\" style=\"color:var(--samfaina)\">certifica-la amb 4 fotos →</a>"
      },
      "footer": {
        "text": "Travessa del Priorat — inscripció informal, sense verificació d'identitat."
      },
      "meta": {
        "title": "Inscripció · Travessa del Priorat",
        "description": "Inscriu-te a la Travessa del Priorat: la Ruta del Priorat a peu, la ruta dels eremites, la ruta del silenci. 166 km, 8 etapes, 19 pobles."
      }
    },
    "certificar": {
      "nav": {
        "back": "← Tornar al circuit",
        "list": "Veure caminants"
      },
      "hero": {
        "eyebrow": "Última etapa",
        "h1": "Certifica que l'has completat",
        "p": "Puja 4 fotos preses en punts concrets de la ruta. Només hi poden accedir les persones ja inscrites."
      },
      "notice": {
        "gate": "Aquesta pàgina només és per a qui ja es va <a href=\"inscripcion.html\" style=\"color:var(--samfaina)\">inscriure</a>. Escriu l'àlies i el correu exactes que vas fer servir aleshores.",
        "upload": "<strong>Important:</strong> pujar les fotos no et marca com a verificat a l'instant. Algú les revisarà a mà per confirmar que corresponen als 4 punts demanats. Pot trigar uns dies."
      },
      "gate": {
        "alias": "El teu àlies",
        "email": "El teu correu (el mateix de la inscripció)",
        "submit": "Accedir",
        "err": "No hem trobat aquesta combinació d'àlies i correu entre les inscripcions. Revisa que els vas escriure igual que en inscriure't.",
        "serverErr": "No ho hem pogut comprovar ara mateix. Comprova la teva connexió i torna-ho a provar en un moment.",
        "lock": "Massa intents. Espera {s} segons abans de tornar a provar."
      },
      "welcome": "Hola, {alias} — puja les teves 4 fotos quan vulguis.",
      "alreadyCert": {
        "title": "Ja hem rebut la teva certificació",
        "body": "Aquest alies i correu ja van enviar les 4 fotos des d'aquest mateix dispositiu el {date}. Si creus que és un error o necessites tornar-les a enviar, escriu-nos a ruta.silenci@gmail.com."
      },
      "cp": {
        "label1": "Punt 1 · final etapa 2",
        "h1": "Bellmunt del Priorat",
        "p1": "Foto al poble o al Museu de les Mines, amb alguna cosa que identifiqui el lloc.",
        "label2": "Punt 2 · final etapa 5",
        "h2": "Cornudella de Montsant",
        "p2": "Foto al poble, idealment amb la Serra de Montsant al fons.",
        "label3": "Punt 3 · etapa 7",
        "h3": "Cartoixa d'Escaladei",
        "p3": "Foto a les runes del monestir.",
        "label4": "Punt 4 · tancament del circuit",
        "h4": "Falset",
        "p4": "Foto al Castell de Falset o a la plaça del poble, tancant el cercle.",
        "dzHl": "Toca per triar",
        "dzOr": "o arrossega una foto aquí",
        "fileErr": "Aquest arxiu no sembla una imatge vàlida.",
        "compressing": "comprimint…",
        "ready": "llesta per enviar",
        "remove": "Treure",
        "submit": "Enviar fotos",
        "submitting": "Enviant…",
        "missing": "Falten {n} fotos per pujar.",
        "submitErr": "No s'ha pogut enviar. Comprova la teva connexió i torna-ho a provar."
      },
      "success": {
        "h": "Fotos enviades!",
        "p": "Les revisarem i, si tot encaixa, el teu àlies apareixerà marcat com a verificat a la llista de caminants. Això no és automàtic: algú les mira a mà."
      },
      "footer": {
        "text": "Travessa del Priorat — verificació manual, no automàtica."
      },
      "meta": {
        "title": "Certificar la travessa · Travessa del Priorat"
      }
    },
    "finalizados": {
      "nav": {
        "back": "← Tornar al circuit",
        "signup": "Inscriure'm"
      },
      "hero": {
        "eyebrow": "Qui ja s'hi ha atrevit",
        "h1": "Caminants de la travessa",
        "p": "Llista informal, tipus llibre de signatures: ningú ha verificat que aquests àlies hagin completat realment la ruta. El «Verificat» només indica que algú del projecte ha revisat fotos enviades per correu."
      },
      "stats": {
        "total": "Inscrits",
        "verified": "Verificats",
        "completo": "Circuit complet",
        "origenes": "Orígens diferents"
      },
      "toolbar": {
        "search": "Cerca per àlies o origen…",
        "allVariants": "Totes les variants",
        "vCompleto": "Circuit complet",
        "sortRecent": "Més recents",
        "sortAlias": "Per àlies",
        "loading": "Carregant caminants…",
        "vCorta": "Ruta curta (3 dies)"
      },
      "variant": {
        "completo": "Circuit complet",
        "corta": "Ruta curta (3 dies)"
      },
      "card": {
        "verified": "✓ Verificat",
        "start": "Inici"
      },
      "empty": {
        "h": "Encara ningú s'ha apuntat",
        "p": "Sigues la primera persona a deixar el teu àlies escrit en aquesta llista.",
        "cta": "Inscriure'm →"
      },
      "footer": {
        "text": "Travessa del Priorat — llista pública informal, sense verificació d'identitat. Els correus mai es mostren."
      },
      "meta": {
        "title": "Caminants · Travessa del Priorat"
      }
    },
    "admin": {
      "meta": {
        "title": "Admin · Travessa del Priorat"
      },
      "h1": "Travessa del Priorat — admin",
      "sub": "Panell per marcar com a verificades les inscripcions les 4 fotos de les quals ja has revisat al teu correu.",
      "hdrList": "Veure caminants",
      "hdrBack": "← Tornar al circuit",
      "notice": {
        "strong": "Això no és seguretat real.",
        "body": "Només és una contrasenya simple en el propi JavaScript de la pàgina, pensada perquè un visitant casual no toqui res per error — qualsevol que miri el codi font la pot veure. No la facis servir per a res sensible."
      },
      "gate": {
        "placeholder": "Contrasenya d'administració",
        "btn": "Entrar",
        "err": "Contrasenya incorrecta.",
        "checking": "Comprovant…",
        "notConfigured": "Configura primer el backend de Google Sheets (vegeu INSTRUCCIONES.md)."
      },
      "toolbar": {
        "searchPlaceholder": "Cerca per àlies o correu…",
        "all": "Tots els estats",
        "verified": "Només verificats",
        "pending": "Només pendents",
        "export": "↓ Exportar CSV",
        "reload": "↻ Recarregar",
        "logout": "Sortir"
      },
      "table": {
        "alias": "Àlies",
        "email": "Correu",
        "variante": "Variant",
        "inicio": "Inici",
        "recibido": "Rebut",
        "mensaje": "Missatge",
        "estado": "Estat",
        "accion": "Acció"
      },
      "badge": {
        "verified": "✓ Verificat",
        "pending": "Pendent"
      },
      "action": {
        "verify": "Marcar verificat",
        "unverify": "Treure verificació",
        "saved": "Desat ✓",
        "notify": "✉ Enviar confirmació",
        "notifying": "Enviant…",
        "notified": "✓ Notificat",
        "notifyError": "No s'ha pogut enviar el correu."
      },
      "count": "{n} inscripcions",
      "empty": "No hi ha inscripcions que coincideixin.",
      "confirm": {
        "h": "Vols treure la verificació?",
        "text": "\"{alias}\" deixarà d'aparèixer com a verificat a la llista pública de caminants.",
        "cancel": "Cancel·la",
        "ok": "Sí, treu-la"
      },
      "variant": {
        "completo": "Circuit complet",
        "corta": "Ruta curta (3 dies)"
      }
    }
  },
  "en": {
    "home": {
      "nav": {
        "red": "The network",
        "pueblos": "19 villages",
        "mapa": "Map",
        "etapas": "Stages",
        "guia": "Guide",
        "info": "Practical info",
        "inscripcion": "Sign up",
        "finalizados": "Walkers"
      },
      "hero": {
        "eyebrow": "Great circular crossing · 100% on foot",
        "h1": "The 19 villages of Priorat, <em>joined on foot</em>.",
        "lead": "Priorat is a harsh, solitary land, of impossible slopes and llicorella soils where life has always been a hand-to-hand battle with rock. <span class=\"accent\">Walking the route of its 19 villages is an epic experience</span>: an inner journey among vineyards of heroic viticulture, hermitages and silent ravines, where every bend in the path invites you to feel the landscape more intensely and to discover a spirituality made of effort, contemplation and extreme beauty.",
        "sub": "A proposed 8-stage circuit that uses stretches of the GR‑174 and other waymarked trails, linked by rural paths and forest tracks between Priorat's 19 villages, with Falset as the entry and exit point. It is not its own approved route, nor is it waymarked continuously.",
        "quick1": "19 villages",
        "quick2": "GR‑174 axis",
        "quick3": "Recommended start: Falset",
        "quick4": "Route verified with real GPX",
        "stat1": "Municipalities",
        "stat2": "Stages",
        "stat3": "Existing network stretches",
        "stat4": "Closed loop",
        "hub": "central hub",
        "cta1": "Explore the stages",
        "cta2": "View interactive map"
      },
      "red": {
        "eyebrow": "Making the most of what exists",
        "h2": "A network, not a new trail",
        "p": "The GR‑174 forms the backbone; the PR‑C and the Montsant trails close the missing links.",
        "gr": {
          "h": "GR‑174",
          "p": "Main axis through Falset, Gratallops, Poboleda, Escaladei and Cornudella. The backbone of the circuit."
        },
        "pr": {
          "h": "PR‑C and local trails",
          "p": "Link the municipalities that don't sit directly on the GR‑174, without resorting to asphalt."
        },
        "local": {
          "h": "Tracks and forest roads",
          "p": "Historic, mining and farm tracks for the rural connections that still lack an approved trail."
        }
      },
      "pueblos": {
        "eyebrow": "Directory",
        "h2": "The 19 municipalities",
        "p": "Each village, with the recommended type of trail connection to reach it."
      },
      "mapa": {
        "eyebrow": "First interactive phase",
        "h2": "The map",
        "p": "Real location of the 19 municipalities and real track of all 8 stages, verified with GPX.",
        "legendGr": "GR-174 node",
        "legendPr": "Municipality",
        "note": "All 8 stages verified with a real GPX track (solid line).",
        "popupConn": "Connection",
        "statusVerified": "All 8 stages verified with real GPX",
        "statusShortRoute": "Short route (3 days): all 3 stages verified with real GPX",
        "legendCorta": "Short route (3 days)",
        "shortRouteLabel": "Short route (3 days) — Bellmunt–Falset stretch, verified with real GPX"
      },
      "etapas": {
        "eyebrow": "Proposed route",
        "h2": "Eight stages, one closed loop",
        "p": "Each of the 19 municipalities is visited exactly once. Falset opens and closes the circuit.",
        "etapaLabel": "Stage",
        "dist": "Distance (straight line)",
        "diff": "Difficulty",
        "time": "Estimated time",
        "diffFacil": "Easy",
        "diffModerada": "Moderate",
        "diffExigente": "Demanding",
        "tableCaption": "Tap a row to open that stage",
        "tableEtapa": "Stage",
        "tableKm": "Km",
        "tableTiempo": "Time",
        "tableDesnivel": "Elevation +",
        "tableDificultad": "Difficulty",
        "summary": "Closed loop · 19 municipalities, each visited once · <strong>{km} km</strong> real, verified with GPX across all 8 stages",
        "meta": "real elevation gain and trail distance — pending verified GPX track",
        "poi": "What to see",
        "eat": "Where to eat",
        "sleep": "Where to sleep",
        "noOffer": "No listed option — bring provisions",
        "distReal": "Distance (real GPX)",
        "gain": "Elevation gain",
        "loss": "Elevation loss",
        "gpxVerified": "Verified GPX track",
        "gpxDownload": "Download .gpx",
        "gpxDisclaimer": "For guidance only — it doesn't replace official waymarking or your own judgement on the ground. Use at your own risk.",
        "elev": "Elevation profile (villages)",
        "elevNote": "Real altitude of each village, joined in a straight line — does not follow the trail's real profile, pending GPX track.",
        "elevNoteReal": "Real profile extracted from the verified GPX track, point by point along the trail.",
        "mapPreview": "Route preview",
        "mapExpand": "Expand",
        "source": "Eating and sleeping: official directory of <a href=\"https://www.turismepriorat.org\" target=\"_blank\" rel=\"noopener\">Turisme Priorat</a>, spot-checked against Google/Tripadvisor/Booking reviews for the venues marked with ★ (not all 40 businesses listed). Altitudes: Idescat and the DOQ Priorat Regulatory Board. Check opening hours, availability and phone numbers before setting out. Dining and lodging data for all 8 stages reviewed and expanded in August 2026, adding options in Marçà, El Molar, La Figuera, La Bisbal de Falset, Poboleda and Escaladei."
      },
      "guia": {
        "eyebrow": "Preparation",
        "h2": "Practical guide for the pilgrim",
        "p": "Rugged terrain, little shade, strong heat and very little tourist infrastructure outside weekends. Prepare accordingly.",
        "nav1": "When to go",
        "nav2": "How to get there",
        "nav3": "Water",
        "nav4": "Food",
        "nav5": "Heat",
        "nav6": "Terrain and footwear",
        "nav7": "Gear",
        "cuando": {
          "h": "When to go",
          "body": "<p><strong>Avoid July and August.</strong> Priorat is one of the hottest inland counties in Catalonia; in summer temperatures easily exceed 35–38&nbsp;°C, with barely any shade on the stretches between vineyards and on the Montsant range.</p>\n           <p><strong>Best season: April–June and September–November.</strong> Moderate temperatures, better light, and the villages tend to have a bit more life.</p>\n           <p>If you must walk in summer, start before 7:00 and stop between 13:00 and 17:00. Stages 5 and 9 (the longest and most exposed) are the most dangerous in strong heat.</p>\n           <div class=\"g-warn\"><p>In winter, Siurana (737&nbsp;m, the highest point on the route) and the Montsant ridge can have frost or occasional snow: more a risk of slippery ground than of cold.</p></div>"
        },
        "llegar": {
          "h": "How to get there",
          "intro": "Falset is the hub of the circuit and the best entry and exit point. Here's how to reach it:"
        },
        "agua": {
          "h": "Water: priority number one",
          "body": "<p>This is the most serious real shortfall of the circuit: many stretches have no reliable fountain and no village with an open service, and the terrain is dry almost all year round.</p>\n           <p><strong>General rule:</strong> at least 2.5–3 litres per person per stage in mid-season; 4–5 litres on the long stages (2 and 5) or in strong heat. Always set out with a full reservoir — don't count on refilling along the way unless you've confirmed it yourself that same day.</p>\n           <p>Carry electrolytes, not just water: with sustained effort over several days and heat, sodium loss matters as much as water loss.</p>\n           <p><strong>Reference fountains</strong> (no guarantee of potability — carry purification tablets or a filter): Font del Mingot (Poboleda), Font de les Amades (near Falset).</p>"
        },
        "comida": {
          "h": "Food and dining",
          "body": "<p>Always carry backup food for a full day, even if the stage card marks a place to eat: in villages of 100–300 people, the one restaurant can be closed for its weekly rest day or out of season.</p>\n           <p><strong>Stages 3 and 4</strong> (Bellmunt→Cabacés and Cabacés→La Bisbal→Margalef) are the most critical: there's barely any registered option — check the exact detail on each stage card further down this same page.</p>\n           <p>Bakeries (forns) open early, before any restaurant — they're your best bet for a hearty breakfast. Priorat has almost no supermarkets outside Falset and Cornudella: stock up for several days when you pass through one of the two.</p>"
        },
        "calor": {
          "h": "Managing the heat",
          "body": "<p>With stages of up to 32.8&nbsp;km and up to 14.5&nbsp;hours of walking (stages 2 and 5, the longest and most exposed), and with little shade overall, heatstroke is a more real risk on this route than getting lost.</p>\n           <p><strong>Heat exhaustion</strong> (common, resolved by stopping): excessive sweating, weakness, dizziness, pale and clammy skin. Stop, find shade, drink water with salts, rest at least 30 minutes.</p>\n           <div class=\"g-warn\"><p><strong>Heatstroke</strong> (medical emergency): hot, dry skin, confusion, very high body temperature. Call <strong>112</strong>, cool the person with whatever you have while help arrives.</p></div>\n           <p>Early warning sign: if you stop sweating in strong heat and keep walking, it's time to stop, not to continue.</p>"
        },
        "terreno": {
          "h": "Terrain and footwear",
          "body": "<p>The dominant ground is <strong>llicorella</strong> (black slate), very slippery when loose or wet. Wear hiking boots with a good grip sole, not smooth trail shoes — there's loose stone on the climb to Montsant and on Bellmunt's old mining tracks.</p>\n           <p>Trekking poles strongly recommended on stages 2 and 5 (more accumulated elevation change). Light gaiters if you walk through low scrub and dense undergrowth.</p>"
        },
        "equipo": {
          "h": "8-day gear list"
        },
        "nav8": "Using the GPX tracks",
        "gpx": {
          "h": "How to use the GPX tracks",
          "body": "<div class=\"g-warn\"><p><strong>Important notice:</strong> these GPX tracks are a navigation aid verified on the ground, but they don't replace official waymarking or your own judgement. The Travessa isn't waymarked as its own trail and has no support along the way: walking it is entirely the responsibility of the person doing so. Always check the day's conditions (weather, fire risk, your own physical state) before setting out.</p></div>\n           <p>Each stage card has a button to download its track as a <strong>.gpx</strong> file. A GPX isn't a map — it's just a list of coordinates. To see it and follow it you need an app that can import it; regular Google Maps won't do this.</p>\n           <p><strong>You don't need a dedicated GPS device.</strong> Any current smartphone already has a GPS chip built in, the same one used for regular location services. A Garmin or other hiking GPS is one more option, not a requirement.</p>\n           <div class=\"gpx-highlight\">\n             <p><strong>Free apps that read GPX:</strong> OsmAnd, Organic Maps, Wikiloc, Komoot, or Gaia GPS. All of them let you import the file and follow it live with your position on screen.</p>\n             <p><strong>Steps:</strong> download the stage's .gpx file → open it with the app (\"Import track\" or \"Open with\") → before setting out, also download the map for that area in <em>offline</em> mode from within the app.</p>\n             <p>That last step matters: as this same circuit's guide already warns, there are long stretches with no mobile signal. An offline track is the difference between staying oriented and getting lost.</p>\n           </div>"
        }
      },
      "terrain": {
        "eyebrow": "Before you come",
        "h": "Is this for you? The essentials in 10 seconds",
        "i1": "166.4 km over 8 stages (or 53.6 km over 3 stages) — a demanding route with llicorella slate and steep gradients",
        "iSeason": "Best season: April–June and September–November. Avoid July and August (35–38&nbsp;°C)",
        "iAgua": "Water: 2.5–3&nbsp;L per stage; 4–5&nbsp;L on stages 2 and 5",
        "i2": "Little shade, intense heat in summer",
        "i3": "Very little tourist infrastructure outside weekends",
        "iSenal": "Discontinuous waymarking: not an officially approved route of its own",
        "iGpx": "An offline GPX track is essential",
        "link": "See the full practical guide →"
      },
      "routeopt": {
        "h2": "Two ways to walk it",
        "fullH": "Full crossing",
        "fullP": "166.4 km · 8 stages · closed loop",
        "fullBtn": "See the 8 stages",
        "shortH": "Short route",
        "shortP": "53.6 km · 3 stages · first taste of the trail",
        "shortBtn": "See short route"
      },
      "falset": {
        "eyebrow": "Entry and exit point",
        "h": "Falset: the hub of the circuit",
        "p": "Falset is the capital of Priorat and the best point to start and close the crossing: this is where the connections to every other municipality converge, and where you'll find the most services (train, buses, car, lodging).",
        "cta": "How to get to Falset →",
        "miniLabel": "Quick access",
        "tren": "Train: RENFE Rodalies R15, Marçà-Falset station (2 km)",
        "bus": "Bus: Domènech, HIFE and Igualadina regional lines",
        "coche": "Car: C-242 (Reus–Falset–Móra d'Ebre)",
        "avion": "Plane: Reus Airport, 35 km away"
      },
      "closing": {
        "text": "\"An inner journey among vineyards of heroic viticulture, hermitages and silent ravines, where <span class=\"accent\">every bend in the path invites you to feel the landscape more intensely</span>.\"",
        "cta": "Plan my crossing"
      },
      "soon": {
        "h": "Ready to join?",
        "p": "Sign up with your alias and the date you're starting: you'll see your name on the list of walkers alongside everyone else.",
        "cta": "Sign me up →"
      },
      "footer": {
        "left": "Travessa del Priorat — all 8 stages verified on the ground with real GPX.",
        "right": "v1.0 · closed loop, 19 villages, 8/8 stages verified"
      },
      "meta": {
        "title": "Travessa del Priorat · A great circular walking route",
        "description": "The Priorat Walking Route, also known as the hermits' route or the route of silence: a circular 166 km, 8-stage crossing through Priorat's 19 villages, verified with real GPX."
      },
      "also": {
        "eyebrow": "Also known as",
        "h2": "The great crossing of Priorat: the hermits' route, the route of silence",
        "p": "Before it had an official name, this circular <strong>166 km, 8-stage</strong> crossing was already known by word of mouth in three different ways. It aims to become the great reference walking route in Catalonia and Spain — on the scale of the Camino de Santiago, but across a mineral, austere territory still barely walked.",
        "n1": {
          "h": "The Priorat Walking Route",
          "p": "The most literal name: 19 villages of the Denominació d'Origen Qualificada, linked on foot for the first time in a single closed loop."
        },
        "n2": {
          "h": "The Hermits' Route",
          "p": "For the Cartoixa d'Escaladei and the network of hermitages and monasteries —almost all in ruins today— that settled these mountains before the vineyards did."
        },
        "n3": {
          "h": "The Route of Silence",
          "p": "For what isn't there: almost no tourist infrastructure, almost no shade, almost no noise. Eight stages of llicorella, wind, and mineral emptiness."
        }
      },
      "backToTop": "Back to top",
      "rutacorta": {
        "eyebrow": "3-day alternative",
        "h2": "Short Route, 3 Stages",
        "p": "Same start as the full circuit — stages 1 and 2 — but on reaching Bellmunt del Priorat, a third day closes the loop directly back to Falset, now verified with real GPX.",
        "day": "Day",
        "total": "Total for the short route: <strong>{km} km</strong> · +{gain} m / −{loss} m of accumulated elevation, verified with real GPX across all 3 stages."
      }
    },
    "info": {
      "nav": {
        "normativa": "Regulations",
        "patrimonio": "Heritage",
        "servicios": "Services",
        "back": "← Back to the circuit"
      },
      "hero": {
        "eyebrow": "Before you set out",
        "h1": "Practical information",
        "p": "Natural park regulations, the spiritual heritage of Priorat, and the services you need to plan the circuit: route variants, official contact, and where this data comes from.",
        "back": "← Back to the circuit"
      },
      "normativa": {
        "eyebrow": "Before each stage",
        "h2": "Regulations and permits",
        "p": "A large part of the circuit (stages 3 to 8) runs through the Serra de Montsant Natural Park. This isn't red tape — it's what keeps you safe and protects the area.",
        "parc": {
          "h": "Serra de Montsant Natural Park",
          "body": "<p>Declared by Decree 131/2002, it protects around 9,242 hectares across 11 municipalities: Cabacés, Cornudella de Montsant, La Bisbal de Falset, La Figuera, La Morera de Montsant, La Vilella Alta, La Vilella Baixa, Margalef, Poboleda, Torroja del Priorat and Ulldemolins.</p>\n           <p>No individual permit is needed to walk its approved trails, but check before setting out whether there are any temporary access restrictions (works, reforestation, fire risk — see the Pla Alfa below).</p>\n           <p><a href=\"https://parcsnaturals.gencat.cat/es/xarxa-de-parcs/serra-montsant/\" target=\"_blank\" rel=\"noopener\">Official park website (Generalitat de Catalunya) →</a></p>"
        },
        "alfa": {
          "h": "Pla Alfa: daily fire risk",
          "body": "<p>Catalonia regulates access to forest land through the Pla Alfa, a map updated daily according to real fire risk. At high levels, some activities — including hiking — can be directly banned in certain areas.</p>\n           <p><strong>Check it the same morning of each stage</strong>, not the night before: the level can change with the day's forecast.</p>\n           <iframe src='https://experience.arcgis.com/experience/2cf7ebbe492f401db826cb21eae9bfae' title='Pla Alfa fire risk map' frameborder='0' allowfullscreen width='100%' style='height:min(650px, 80vh);'></iframe>",
          "lvl0": "Low",
          "lvl1": "Medium",
          "lvl2": "High",
          "lvl3": "Extreme — access restricted",
          "link": "Check today's official risk map →"
        },
        "normas": {
          "h": "General rules inside the park",
          "body": "<ul>\n            <li>No fires or smoking outside designated areas, at any time of year.</li>\n            <li>No camping outside authorised areas.</li>\n            <li>Respect fences, private farms and masies — the approved trail doesn't always follow the most direct path.</li>\n            <li>Take all your rubbish with you, including organic waste.</li>\n            <li>Dogs always on a leash: there is livestock and protected wildlife in the park.</li>\n            <li>Don't leave the marked route, especially on loose llicorella stretches.</li>\n           </ul>\n           <p>This is a general guide to behaviour in Catalan protected natural areas; always check current regulations on the park's official website before setting out.</p>"
        }
      },
      "patrimonio": {
        "eyebrow": "Not just a trail",
        "h2": "Spiritual and cultural heritage",
        "p": "The crossing runs through centuries of monastic, hermit and mining life. These are the sites with documented history — we'll keep expanding this as we verify more.",
        "intro": "Priorat's heritage isn't a catalogue of scattered buildings: it's a network with a clear centre of gravity. For centuries, <strong>the Escaladei Charterhouse</strong> governed the entire county as prior — hence its name — and around it grew a belt of minor hermitages and sanctuaries, some founded by solitary hermits centuries before the charterhouse itself, others built later under its direct rule. The Civil War left a visible scar on several of them — burned in 1936, rebuilt after the war — and that recent layer of memory sits alongside rock shelters occupied since the Palaeolithic. Alongside that spiritual network runs another, civil one: Falset's castle, Bellmunt's lead mines, and the Modernist «wine cathedrals» of Falset and Cornudella tell the other half of the county's story — power, work and land. We've grouped the 28 documented sites by their closeness to the circuit's stages —also adding each village's benchmark wineries—, so you can decide which detour is worth it.",
        "badge": {
          "monasterio": "Monastery · 12th c.",
          "ermita": "Hermitage",
          "romanico": "Romanesque · 12th c."
        },
        "mapsLabel": "View on Google Maps",
        "monestirs": {
          "h": "The Priorat's monasteries, together",
          "body": "<p>Besides the Cartoixa d'Escaladei, the county had a small network of monastic communities, nearly all of them now in ruins or repurposed: Santa Maria de Bonrepòs and Santa Maria de Montsant (La Morera de Montsant), Santa Maria de Poboleda — the eremitic settlement that preceded the charterhouse itself —, the Monestir de Bíclarum and Santa Maria de Vallclara (Cabacés), and Sant Marçal (Marçà), among others. Most survive only as a place name, a loose wall, or a farmhouse built over their remains.</p>\n           <p><a href=\"https://www.google.com/maps/d/u/0/viewer?mid=1i9-R9ha4l8mYncpbZEWlM_vBz_Dgux7v&femb=1&ll=40.99018008166303%2C1.0995174463919&z=9\" target=\"_blank\" rel=\"noopener\">View the full map of Priorat monasteries →</a></p>"
        },
        "escaladei": {
          "h": "Escaladei Charterhouse",
          "body": "<p>Founded in 1194, it was the first Carthusian charterhouse on the entire Iberian Peninsula. The name of the whole county, Priorat, comes from its Latin name <em>Prioratus</em> — the territory governed by its prior.</p>\n           <p>Today it's a consolidated ruin open to visitors. Closed Mondays (except holidays). Entry around €5, free on the last Tuesday of the month from October to June and for under-16s.</p>\n           <p>It sits on stage 7 of the circuit (Poboleda → Escaladei → La Vilella Alta → Torroja del Priorat).</p>"
        },
        "santantoni": {
          "h": "Ermita de Sant Antoni",
          "body": "<p>In the Fraguerau gorge, near Ulldemolins, it's the first landmark on the route that climbs the Montsant river gorge towards Sant Bartomeu. The usual starting point for exploring the gorge.</p>\n           <p>It sits on stage 5 of the circuit (Margalef → Ulldemolins → Cornudella).</p>"
        },
        "bartomeu": {
          "h": "Sant Bartomeu de Fraguerau",
          "body": "<p>A single-nave Romanesque hermitage, protected as a Local Cultural Heritage Asset. It was founded around 1160 by the hermit friar Guerau Miquel, who lived in a rock shelter next to the chapel; in 1192 King Alfons the Chaste and Queen Sança granted him part of the Montsant valley.</p>\n           <p>In 1210 it passed to the Balb family of Lleida, leading to the founding of the Cistercian monastery of Santa Maria de Bonrepòs, and later came under the Escaladei Charterhouse — its coat of arms, dated 1799, is still visible on the door. It was inhabited until 1851 and restored in 1970.</p>\n           <p>Reached via the GR-65-5 from Ulldemolins, passing the Ermita de Sant Antoni first.</p>"
        },
        "relato": "<p>\"This county took its name from a prior. For centuries, every llicorella terrace, every hermitage carved into a rock shelter, every lead mine in Bellmunt, answered to the same charterhouse that today only shows through in ruins between Cornudella and Poboleda. Walking the circuit is crossing that map: from the monastic silence of Escaladei to the mining bustle of Bellmunt, down to the more recent memory of the DOQ, which turned the same poor soil into one of Spain's most expensive wines.\"</p>"
      },
      "servicios": {
        "eyebrow": "Plan your trip",
        "h2": "Services for the pilgrim",
        "p": "Not everyone has 8 days. These are the realistic ways to cover the circuit, depending on how much time you have.",
        "v1": {
          "label": "Full circuit",
          "h": "8 days",
          "p": "All 19 municipalities, each visited once. The complete crossing as described in the 8 stage cards, verified with real GPX."
        },
        "v2": {
          "label": "Short route",
          "h": "3 days",
          "body": "<p>Stages 1 and 2: Falset → Marçà → Capçanes → Els Guiamets → El Masroig → El Molar → Bellmunt del Priorat. The third day closes the loop via a direct Bellmunt–Falset stretch, now verified with real GPX (14.3 km, moderate difficulty) — <a href=\"index.html#ruta-corta\">see the full 3-stage breakdown</a>.</p>\n     <p>All three stages start and end in Falset, so no return transport is needed.</p>"
        },
        "registro": {
          "h": "Sign up and certify your crossing",
          "body": "<p>Before setting out, <a href=\"inscripcion.html\">sign up with your alias</a>. When you finish, <a href=\"certificar.html\">certify the crossing</a> by uploading 4 photos at specific points (end of stage 2, end of stage 5, stage 7, and the closing point in Falset): someone reviews them by hand and, if they match, your alias gets marked as verified on the <a href=\"finalizados.html\">public list of walkers</a>.</p>"
        },
        "sello": "Information on this page cross-checked against the official directory of <a href=\"https://www.turismepriorat.org\" target=\"_blank\" rel=\"noopener\">Turisme Priorat</a> and cited heritage sources (Viquipèdia, enciclopedia.cat, Generalitat de Catalunya). Last updated July 2026."
      },
      "footer": {
        "left": "Travessa del Priorat — practical information, subject to regulatory changes.",
        "right": "v1.0 · regulations, heritage and services"
      },
      "meta": {
        "title": "Practical information · Travessa del Priorat"
      },
      "backToTop": "Back to top"
    },
    "inscripcion": {
      "nav": {
        "back": "← Back to the circuit",
        "list": "See walkers"
      },
      "hero": {
        "eyebrow": "The first step is already yours",
        "h1": "Leave your mark on the llicorella",
        "p": "19 villages. 8 stages. A land that doesn't forgive improvisation.",
        "kicker": "Sign up with your alias and it will stand written alongside everyone else who has also <span class=\"accent\">dared</span>.",
        "h2": "The Priorat Walking Route · the hermits' route · the route of silence"
      },
      "notice": {
        "text": "This is an informal sign-up, like a guestbook: <strong>there's no identity check and no verification that you actually completed the route</strong>. Your email is stored only in case we want to notify you of updates — it's never shown on the public list."
      },
      "section": {
        "who": "Who you are",
        "route": "Your crossing"
      },
      "form": {
        "alias": "Alias",
        "aliasErr": "Enter an alias (2-30 characters).",
        "email": "Email",
        "emailHint": "Not shown publicly, only your alias.",
        "emailErr": "Enter a valid email.",
        "origen": "Where are you from?",
        "origenErr": "Enter where you're from.",
        "optional": "(optional)",
        "variante": "Variant you'll be walking",
        "varianteErr": "Choose the variant you'll do.",
        "variantePlaceholder": "Choose a variant…",
        "variante1": "Full circuit · 8 days · ~166.4 km",
        "variante2": "Short route · 3 days · Falset–Bellmunt–Falset (~53.6 km, verified with real GPX)",
        "date": "Route start date",
        "dateErr": "Choose a date.",
        "mensaje": "Why are you daring to do the Priorat?",
        "consentRequired": "I have read and accept the <a href=\"#\" id=\"open-legal-consent\">privacy policy</a>. My data will only be used to manage my registration and send me route information.",
        "consentPublic": "I want my alias, chosen variant, origin and message (if filled in) to be shown publicly on the list of walkers. My email is never shown. <em>Optional: if unchecked, your registration is still saved, but you won't appear on the public list.</em>",
        "consentErr": "Check the box to sign up.",
        "submit": "Sign me up",
        "submitting": "Saving…",
        "submitErr": "We couldn't save your sign-up. Check your connection and try again.",
        "aliasPlaceholder": "e.g. Montsant Walker",
        "emailPlaceholder": "you@example.com",
        "origenPlaceholder": "City or country",
        "mensajePlaceholder": "A short line — shown next to your alias"
      },
      "manifest": {
        "eyebrow": "The pilgrim's code",
        "intro": "This adventure is no race against the clock, but a journey for the soul.",
        "prep": {
          "h": "Preparation and route freedom",
          "p": "The Travessa isn't waymarked or assisted: each person walks under their own responsibility, with the gear, pace and supplies they see fit."
        },
        "full": {
          "h": "The full experience: 8 days",
          "p": "The complete 166.4 km circuit through the 19 villages, living the Priorat in depth, stage by stage, shelter by shelter."
        },
        "short": {
          "h": "The essential getaway: 3 days",
          "p": "The 53.6 km short route between Falset and Bellmunt del Priorat, ideal if you have less time but still want to feel the silence of the llicorella."
        },
        "signature": "The Silence on the trail. Priorat."
      },
      "success": {
        "h": "Done!",
        "p": "Your alias is now on the list. <a href=\"finalizados.html\" style=\"color:var(--samfaina)\">See the list of walkers →</a><br>Once you finish the route, <a href=\"certificar.html\" style=\"color:var(--samfaina)\">certify it with 4 photos →</a>"
      },
      "footer": {
        "text": "Travessa del Priorat — informal sign-up, no identity verification."
      },
      "meta": {
        "title": "Sign up · Travessa del Priorat",
        "description": "Sign up for the Travessa del Priorat: the Priorat Walking Route, the hermits' route, the route of silence. 166 km, 8 stages, 19 villages."
      }
    },
    "certificar": {
      "nav": {
        "back": "← Back to the circuit",
        "list": "See walkers"
      },
      "hero": {
        "eyebrow": "Final stage",
        "h1": "Certify that you completed it",
        "p": "Upload 4 photos taken at specific points on the route. Only people already signed up can access this page."
      },
      "notice": {
        "gate": "This page is only for people who already <a href=\"inscripcion.html\" style=\"color:var(--samfaina)\">signed up</a>. Enter the exact alias and email you used then.",
        "upload": "<strong>Important:</strong> uploading photos doesn't mark you as verified instantly. Someone will review them by hand to confirm they match the 4 requested spots. It may take a few days."
      },
      "gate": {
        "alias": "Your alias",
        "email": "Your email (same as sign-up)",
        "submit": "Access",
        "err": "We couldn't find that alias/email combination among sign-ups. Check you typed them exactly as when you registered.",
        "serverErr": "We couldn't check that right now. Check your connection and try again in a moment.",
        "lock": "Too many attempts. Wait {s} seconds before trying again."
      },
      "welcome": "Hi, {alias} — upload your 4 photos whenever you're ready.",
      "alreadyCert": {
        "title": "We already received your certification",
        "body": "This alias and email already sent the 4 photos from this same device on {date}. If you think this is a mistake or need to resend them, email us at ruta.silenci@gmail.com."
      },
      "cp": {
        "label1": "Point 1 · end of stage 2",
        "h1": "Bellmunt del Priorat",
        "p1": "Photo in the village or at the Museu de les Mines, with something that identifies the place.",
        "label2": "Point 2 · end of stage 5",
        "h2": "Cornudella de Montsant",
        "p2": "Photo in the village, ideally with the Serra de Montsant in the background.",
        "label3": "Point 3 · stage 7",
        "h3": "Escaladei Charterhouse",
        "p3": "Photo at the monastery ruins.",
        "label4": "Point 4 · closing the loop",
        "h4": "Falset",
        "p4": "Photo at Falset Castle or the village square, closing the circle.",
        "dzHl": "Tap to choose",
        "dzOr": "or drag a photo here",
        "fileErr": "That file doesn't look like a valid image.",
        "compressing": "compressing…",
        "ready": "ready to send",
        "remove": "Remove",
        "submit": "Send photos",
        "submitting": "Sending…",
        "missing": "{n} photos still missing.",
        "submitErr": "Couldn't send it. Check your connection and try again."
      },
      "success": {
        "h": "Photos sent!",
        "p": "We'll review them and, if everything checks out, your alias will appear marked as verified on the list of walkers. This isn't automatic: someone looks at them by hand."
      },
      "footer": {
        "text": "Travessa del Priorat — manual verification, not automatic."
      },
      "meta": {
        "title": "Certify your crossing · Travessa del Priorat"
      }
    },
    "finalizados": {
      "nav": {
        "back": "← Back to the circuit",
        "signup": "Sign up"
      },
      "hero": {
        "eyebrow": "Who's already dared",
        "h1": "Walkers of the crossing",
        "p": "An informal list, like a guestbook: no one has verified that these aliases actually completed the route. «Verified» only means someone from the project has reviewed photos sent by email."
      },
      "stats": {
        "total": "Signed up",
        "verified": "Verified",
        "completo": "Full circuit",
        "origenes": "Distinct origins"
      },
      "toolbar": {
        "search": "Search by alias or origin…",
        "allVariants": "All variants",
        "vCompleto": "Full circuit",
        "sortRecent": "Most recent",
        "sortAlias": "By alias",
        "loading": "Loading walkers…",
        "vCorta": "Short route (3 days)"
      },
      "variant": {
        "completo": "Full circuit",
        "corta": "Short route (3 days)"
      },
      "card": {
        "verified": "✓ Verified",
        "start": "Start"
      },
      "empty": {
        "h": "No one has signed up yet",
        "p": "Be the first to leave your alias written on this list.",
        "cta": "Sign up →"
      },
      "footer": {
        "text": "Travessa del Priorat — informal public list, no identity verification. Emails are never shown."
      },
      "meta": {
        "title": "Walkers · Travessa del Priorat"
      }
    },
    "admin": {
      "meta": {
        "title": "Admin · Travessa del Priorat"
      },
      "h1": "Travessa del Priorat — admin",
      "sub": "Panel to mark as verified the sign-ups whose 4 photos you've already reviewed by email.",
      "hdrList": "See walkers",
      "hdrBack": "← Back to the circuit",
      "notice": {
        "strong": "This is not real security.",
        "body": "It's just a simple password inside the page's own JavaScript, meant to stop a casual visitor from touching anything by accident — anyone who views the page source can see it. Don't use it for anything sensitive."
      },
      "gate": {
        "placeholder": "Admin password",
        "btn": "Enter",
        "err": "Wrong password.",
        "checking": "Checking…",
        "notConfigured": "Set up the Google Sheets backend first (see INSTRUCCIONES.md)."
      },
      "toolbar": {
        "searchPlaceholder": "Search by alias or email…",
        "all": "All statuses",
        "verified": "Verified only",
        "pending": "Pending only",
        "export": "↓ Export CSV",
        "reload": "↻ Reload",
        "logout": "Log out"
      },
      "table": {
        "alias": "Alias",
        "email": "Email",
        "variante": "Variant",
        "inicio": "Start",
        "recibido": "Received",
        "mensaje": "Message",
        "estado": "Status",
        "accion": "Action"
      },
      "badge": {
        "verified": "✓ Verified",
        "pending": "Pending"
      },
      "action": {
        "verify": "Mark verified",
        "unverify": "Remove verification",
        "saved": "Saved ✓",
        "notify": "✉ Send confirmation",
        "notifying": "Sending…",
        "notified": "✓ Notified",
        "notifyError": "Couldn't send the email."
      },
      "count": "{n} sign-ups",
      "empty": "No sign-ups match.",
      "confirm": {
        "h": "Remove verification?",
        "text": "\"{alias}\" will stop appearing as verified on the public list of walkers.",
        "cancel": "Cancel",
        "ok": "Yes, remove it"
      },
      "variant": {
        "completo": "Full circuit",
        "corta": "Short route (3 days)"
      }
    }
  }
};
  function get(obj, path){
    const val = path.split(".").reduce((o,k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
    if (val === undefined){ console.warn("[i18n] Clave de traducción no encontrada:", path); return null; }
    return val;
  }
  function getStoredLanguage(){ try { const v = localStorage.getItem(STORAGE_KEY); return SUPPORTED.includes(v) ? v : null; } catch(e){ return null; } }
  function detectBrowserLanguage(){
    try {
      const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
      for (const l of langs){ const short = (l || "").slice(0,2).toLowerCase(); if (SUPPORTED.includes(short)) return short; }
    } catch(e){}
    return null;
  }
  function resolveInitialLanguage(){ return getStoredLanguage() || detectBrowserLanguage() || FALLBACK; }
  function setLanguage(lang){
    if (!SUPPORTED.includes(lang)) lang = FALLBACK;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e){}
    document.documentElement.lang = lang === "ca" ? "ca" : lang === "en" ? "en" : "es";
    document.querySelectorAll(".lang-switch button[data-lang]").forEach(b => {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    return lang;
  }
  function applyDom(pageDict, lang){
    const page = pageDict[lang];
    if (!page) return;
    document.querySelectorAll("[data-i18n]").forEach(el => { const val = get(page, el.getAttribute("data-i18n")); if (val !== null) el.textContent = val; });
    document.querySelectorAll("[data-i18n-html]").forEach(el => { const val = get(page, el.getAttribute("data-i18n-html")); if (val !== null) el.innerHTML = val; });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => { const val = get(page, el.getAttribute("data-i18n-placeholder")); if (val !== null) el.setAttribute("placeholder", val); });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(el => { const val = get(page, el.getAttribute("data-i18n-aria-label")); if (val !== null) el.setAttribute("aria-label", val); });
    const titleVal = get(page, "meta.title");
    if (titleVal !== null) document.title = titleVal;
    const descVal = get(page, "meta.description");
    const descTag = document.getElementById("meta-description");
    if (descVal !== null && descTag) descTag.setAttribute("content", descVal);
  }
  window.I18N = { dict, get, getStoredLanguage, detectBrowserLanguage, resolveInitialLanguage, setLanguage, applyDom, SUPPORTED, FALLBACK };
})();
