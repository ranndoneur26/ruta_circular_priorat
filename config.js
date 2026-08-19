/*
 * config.js — configuración compartida del backend (Google Apps Script).
 *
 * ÚNICO lugar donde debe cambiarse SHEETS_API_URL. Todos los HTML del sitio
 * (inscripcion.html, certificar.html, finalizados.html, admin.html) cargan
 * este archivo ANTES de su propio <script>, así que basta con actualizar
 * este valor aquí para que los 4 apunten siempre al mismo deployment.
 *
 * Cuando hagas "Nueva versión" en Apps Script el ID no cambia, así que
 * normalmente no hará falta tocar esto. Solo cambia si alguna vez creas
 * una "Nueva implementación" (deployment) distinta.
 */
window.APP_CONFIG = {
  SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbys7Ig8er3AThbtBR0cK5y2HfmocLKUdbGAFdHl18eKX3r3Yakd5bR06rTGAXQKbi_hYA/exec"
};
