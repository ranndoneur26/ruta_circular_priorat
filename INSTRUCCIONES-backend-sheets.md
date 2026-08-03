# Backend amb Google Sheets — instruccions de desplegament

Això connecta `inscripcion.html`, `certificar.html`, `admin.html` i `finalizados.html` a un
Google Sheet real, perquè les inscripcions quedin desades de veritat (no només al navegador).
Jo no puc crear el full de càlcul ni desplegar el script per tu — són passos que has de fer
al teu compte de Google. Un cop fets, el codi ja està preparat per funcionar-hi.

## 1. Crea el full de càlcul

1. Vés a [sheets.google.com](https://sheets.google.com) i crea un full nou.
2. Anomena'l, per exemple, **"Travessa del Priorat — Inscripcions"**.
3. No cal crear cap columna a mà: l'script les crea soles la primera vegada que s'executa.

## 2. Enganxa el codi

1. Al full, ves a **Extensions → Apps Script**.
2. Esborra el contingut per defecte (`function myFunction() {}`) i enganxa-hi tot el contingut
   de l'arxiu **`codigo-apps-script.gs`** que t'adjunto.
3. Desa (icona de disquet o `Ctrl+S`).

## 3. Publica'l com a aplicació web

1. A dalt a la dreta, clica **Desplegar → Nova implementació**.
2. A "Selecciona el tipus", tria **Aplicació web**.
3. Configuració:
   - **Executa com a:** Jo (el teu compte)
   - **Qui hi té accés:** **Qualsevol persona** (imprescindible; si tries "Qualsevol persona amb
     compte de Google" el formulari deixarà de funcionar per a visitants anònims)
4. Clica **Desplegar**. Google et demanarà autoritzar el script — accepta'ls (és el teu propi
   script, executant-se al teu propi full).
5. Copia la **URL de l'aplicació web** que et dona (comença per
   `https://script.google.com/macros/s/.../exec`).

## 4. Enganxa aquesta URL als 4 fitxers HTML

Busca aquesta línia (hi apareix un cop a cada fitxer) i substitueix-hi el text:

```js
const SHEETS_API_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
```

per:

```js
const SHEETS_API_URL = "https://script.google.com/macros/s/EL_TEU_ID_AQUI/exec";
```

Fitxers on cal fer-ho:
- `inscripcion.html`
- `certificar.html`
- `admin.html`
- `finalizados.html`

## 5. Comprova que la contrasenya coincideix

A `admin.html` hi ha:
```js
const ADMIN_PASS = "priorat2026";
```
I a `codigo-apps-script.gs`:
```js
const ADMIN_TOKEN = "priorat2026";
```
**Han de ser exactament el mateix valor.** Si canvies un, canvia l'altre. Aquest valor és el que
permet marcar/desmarcar verificacions des de `admin.html`; sense que coincideixin, el botó
"Marcar verificado" fallarà silenciosament.

## 6. Prova-ho

1. Obre `inscripcion.html` i inscriu-t'hi amb dades de prova.
2. Obre el teu Google Sheet: hauria d'aparèixer una fila nova a la pestanya **"Inscripcions"**.
3. Obre `admin.html`, entra-hi amb la contrasenya, i marca aquesta inscripció com a verificada.
4. Comprova que la columna `verified` del full de càlcul ha canviat a `TRUE`.
5. Obre `finalizados.html`: hi hauria d'aparèixer amb la insígnia de verificat.

## Com queda l'arquitectura

```
inscripcion.html  ──POST──▶  Google Apps Script  ──▶  Google Sheet ("Inscripcions")
certificar.html   ──GET───▶        (backend)      ◀──   (font de dades real)
admin.html        ──GET/POST──▶
finalizados.html  ──GET───▶
```

Cada fitxer HTML continua tenint una reserva (`window.storage` de l'artifact de Claude, i
`localStorage` del navegador) per si el full de càlcul encara no està configurat o hi ha un
tall de xarxa — així res es trenca mentre fas el desplegament pas a pas.

## Límits honestos

- **No és seguretat real.** El "token" que protegeix l'acció de verificar és el mateix valor
  simple (`ADMIN_PASS`) que ja hi havia — qualsevol que llegeixi el codi font el pot veure. Val
  per evitar que un visitant casual toqui res per error, no per protegir dades sensibles.
- **CORS**: Google Apps Script permet peticions des de qualsevol origen quan es desplega amb
  accés "Qualsevol persona", però si mai Google canvia aquest comportament, la solució estàndard
  és tornar a desplegar (Desplegar → Gestiona desplegaments → Edita) sense canviar la URL.
- **Quotes de Google Apps Script**: al pla gratuït hi ha límits diaris d'execucions (uns quants
  milers al dia), més que suficients per aquest ús, però no il·limitats.
- **Els correus mai es mostren** a `finalizados.html`, tal com ja prometia el formulari — això
  no ha canviat en passar a Sheets.
