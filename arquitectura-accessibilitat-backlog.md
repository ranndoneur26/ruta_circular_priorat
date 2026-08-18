# Travessa del Priorat — Arquitectura, accessibilitat i backlog

> Estat: els punts crítics i d'alt impacte de l'auditoria original (contradicció de verificació, avís de calor fals, disclaimer GPX, flux de certificació trencat, consentiment granular, SEO bàsic) **ja estan implementats**, no només documentats. Aquest document cobreix el que queda: arquitectura completa, accessibilitat component a component, i el backlog per sprints.

---

## 1. Arquitectura actual (real, no proposada)

```
/                       → index.html (home, contingut principal)
/travessa-priorat.html  → DUPLICAT gairebé exacte d'index.html (canonical → /)
/info-practica.html     → guia pràctica (calor, aigua, GPX, equip...)
/inscripcion.html       → formulari d'inscripció
/finalizados.html       → llista pública de caminants
/certificar.html        → pujar 4 fotos per certificar la ruta
/admin.html             → panell privat (noindex, requereix contrasenya)
/i18n.js                → diccionari CA/ES/EN compartit
```

Backend: Google Apps Script (Google Sheets com a base de dades) + FormSubmit.co per a l'enviament de fotos amb adjunts.

### 1.1 — Decisió pendent sobre `travessa-priorat.html`

Té el 99,9% del contingut idèntic a `index.html` (ho vaig comprovar amb `diff`: només difereixen 4 línies de coordenades SVG i un paràmetre d'animació). Tres opcions, tries tu:

| Opció | Quan té sentit |
|---|---|
| **A. Eliminar-la** i redirigir (`vercel.json` → redirect 301 a `/`) | Si no aporta cap contingut diferenciat — la més neta per SEO |
| **B. Mantenir-la com a àlies intencionat** (p. ex. per a una campanya amb un nom de pàgina diferent) | Si l'has creat expressament per a algun enllaç extern concret |
| **C. Diferenciar-la de veritat** (contingut únic, per exemple centrada en SEO de "travessa" com a paraula clau) | Si vols dues pàgines amb intenció de cerca diferent |

Amb l'arquitectura actual (opció per defecte, sense fer res més), el `canonical` ja evita el problema de contingut duplicat als ulls de Google — però és pes mort al repositori si no s'usa enlloc.

---

## 2. Checklist d'accessibilitat WCAG 2.1 AA — component a component

### ✅ Ja compleix
| Component | Verificat |
|---|---|
| Skip-link a `#main-content` | Present a `index.html`, `inscripcion.html`, `certificar.html` |
| `alt` a totes les `<img>` | Cap imatge sense text alternatiu |
| Focus visible (`:focus-visible`) global | Consistent a tot arreu |
| Labels de formulari (`<label for>`) | Tots els inputs associats correctament |
| Botó de tancar modal amb `aria-label` | `legal-modal-close` |
| Missatges d'error/èxit amb `aria-live` | **Corregit aquesta sessió** |

### ⚠️ Pendent de revisar (no verificable sense navegador real)

| # | Problema | Com solucionar-ho |
|---|---|---|
| 1 | **Contrast de color no verificat** | Les variables `--pergami-dim` (#cfc6b2) sobre `--llicorella` (#1a1715) probablement passen AA, però el text de `.gpx-disclaimer` que vaig afegir (10.5px, opacity:0.8) podria quedar just al límit. Comprova amb l'extensió [axe DevTools](https://www.deque.com/axe/devtools/) o Lighthouse abans de publicar. |
| 2 | **Mapa Leaflet — alternativa textual** | Els usuaris de lector de pantalla no poden "veure" el mapa interactiu. Falta un resum textual proper (p. ex. una taula amb poble → coordenades aproximades, o com a mínim confirmar que Leaflet ja posa `role="application"` i `aria-label` al contenidor — revisa'l al codi de Leaflet que estàs usant). |
| 3 | **Perfils d'elevació (SVG)** | Si hi ha gràfics SVG de desnivell per etapa, necessiten `<title>`/`aria-label` amb el resum (p. ex. "Perfil d'elevació: puja 1.200m en els primers 8km, després baixa..."). |
| 4 | **Estats de càrrega (loading)** | Quan `admin.html`/`finalizados.html` carreguen dades del backend, comprova que hi hagi algun indicador (`aria-busy="true"` al contenidor, o un missatge "Carregant...") — actualment no ho he vist explícitament. |
| 5 | **Idioma dels botons ES/CA/ENG** | El selector d'idioma (`ES` `CA` `ENG`) hauria de tenir `lang` i `aria-label` per idioma real, no només el text visible, perquè un lector de pantalla en digui "canviar a anglès" i no lletregi "E-N-G". |
| 6 | **Ordre de tabulació al formulari de certificació** | Amb 4 dropzones + inputs de fitxer, comprova manualment amb `Tab` que l'ordre és lògic (dalt a baix) i que cap element queda "atrapat". |

### 🔴 No verificable sense eines de navegador
Contrast exacte, comportament real de lector de pantalla (NVDA/VoiceOver), i zoom al 200% són coses que necessiten proves manuals — no me les puc inventar. Recomano una passada amb Lighthouse + un lector de pantalla real abans de donar-ho per tancat.

---

## 3. Backlog priorizat

### ✅ Ja fet (aquesta sessió)
- Contradicció "verificat" vs "maqueta sense verificar" (footer + mapa, 3 idiomes)
- Avís de calor amb xifra falsa (18km → 32,8km real, 3 idiomes)
- Disclaimer legal de responsabilitat GPX (secció + sota cada botó de descàrrega, 3 idiomes)
- Flux de certificació: verificació alias+correu que era impossible de superar → nou endpoint `checkwalker`
- Enviament de fotos: sortia del lloc web → convertit a AJAX, es queda a la pàgina
- Consentiment granular: 2 checkboxes (obligatori + opcional), nova columna `publicDisplay`, panell admin actualitzat
- `PASTE_YOUR_SITE_URL_HERE` corregit (canonical trencat)
- Meta description/OG/canonical afegits a 3 pàgines que no en tenien
- `noindex` a `admin.html`
- `aria-live` als missatges d'error/èxit
- `robots.txt` + `sitemap.xml` creats

### Quick wins (1-2 dies) — encara pendents
- [ ] Decidir el destí de `travessa-priorat.html` (secció 1.1 d'aquest document)
- [ ] Verificar contrast de color amb Lighthouse/axe abans de publicar
- [ ] Afegir `lang`/`aria-label` reals als botons de canvi d'idioma (ES/CA/ENG)
- [ ] Comprovar `aria-busy` / indicadors de càrrega a `admin.html` i `finalizados.html`

### Sprint 1 — Confiança i dades
- [ ] Decidir si vols una data de "última revisión" real per track GPX (jo no me la puc inventar — la vas deixar pendent)
- [ ] Moure les fotos de certificació de FormSubmit (email) a un lloc consultable (Drive o similar) si vols un panell de revisió
- [ ] Alternativa textual per al mapa Leaflet i els perfils d'elevació SVG (punt 2, taula "pendent")

### Sprint 2 — SEO més profund
- [ ] Decisió d'arquitectura: URLs separades per idioma (`/ca/`, `/es/`, `/en/`) si vols `hreflang` real i indexació per idioma
- [ ] Fitxes d'etapa com a pàgines pròpies (`/etapa-1.html`...) si vols que cada etapa sigui indexable i enllaçable individualment — ara mateix són seccions dins d'`index.html`, no URLs pròpies
- [ ] Enllaçat intern: revisar que totes les pàgines s'enllacen entre si de forma coherent (per exemple, `certificar.html` hauria d'enllaçar a `info-practica.html`)

### Sprint 3 — Polish i manteniment
- [ ] Auditoria de rendiment (mida d'imatges, lazy loading del mapa Leaflet)
- [ ] Test manual amb lector de pantalla real (NVDA o VoiceOver)
- [ ] Documentar el procés de "Nueva versión" a Apps Script en un README perquè no torni a passar l'error de desplegament que hem anat arreglant aquests dies
