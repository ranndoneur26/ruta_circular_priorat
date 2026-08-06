/**
 * Travessa del Priorat — backend con Google Sheets
 * ================================================
 * Pega este código en el editor de Apps Script de tu Google Sheet
 * (Extensiones → Apps Script), sustituye ADMIN_PASSWORD si quieres,
 * y despliega como aplicación web (ver instrucciones adjuntas).
 *
 * Crea automáticamente una hoja llamada "Inscripcions" con las columnas:
 * id | alias | email | origen | variante | startDate | mensaje | verified | submittedAt | notified
 *
 * NOVEDAD — Email de confirmación al caminante:
 * Cuando marcas una inscripción como verificada en admin.html, puedes además
 * enviarle un correo de confirmación automático (usa MailApp, gratis, sin
 * necesidad de ningún servicio externo). Edita EMAIL_SUBJECT y EMAIL_BODY_
 * más abajo con el texto real que quieras enviar.
 */

const SHEET_NAME = "Inscripcions";

// Contraseña real del panel de administración. Vive SOLO aquí, en el servidor
// (Apps Script) — nunca se descarga al navegador, así que no puede verse
// viendo el código fuente de admin.html. Cámbiala cuando quieras: solo hace
// falta editar esta línea y volver a desplegar (ver INSTRUCCIONES.md).
const ADMIN_PASSWORD = "v3mxFSUZa9EJDnDyCN6X";

// --- Plantilla del correo de confirmación (cuando el admin marca "verificado"). ---
const EMAIL_SUBJECT = "Tu Travessa del Priorat está verificada ✓";
const EMAIL_BODY_ = (alias) =>
  "Hola " + alias + ",\n\n" +
  "Hemos revisado tus 4 fotos y confirmamos que has completado la Travessa del Priorat. " +
  "Tu alias ya aparece como verificado en la lista pública de caminantes.\n\n" +
  "Gracias por recorrerla y por compartirlo con nosotros.\n\n" +
  "— Travessa del Priorat";

// --- Plantilla del correo de BIENVENIDA, se envía automáticamente al inscribirse.
// Se elige según el idioma con el que el caminante estaba usando la web (lang).
// {alias} se sustituye automáticamente. La versión HTML lleva negritas/destacados;
// WELCOME_TEXT_ es el texto plano de reserva para clientes de correo sin HTML. ---
const SITE_BASE = "https://ruta-circular-priorat.vercel.app";

const WELCOME_SUBJECT_ = {
  ca: "Benvingut/da a la Ruta del Silenci del Priorat 🌿",
  es: "¡Bienvenido/a a la Ruta del Silencio del Priorat 🌿!",
  en: "Welcome to Priorat's Route of Silence 🌿"
};

function welcomeLinksHtml_(t) {
  const rows = [
    [t.l1h, t.l1p, SITE_BASE + "/finalizados.html"],
    [t.l2h, t.l2p, SITE_BASE + "/certificar.html"],
    [t.l3h, t.l3p, SITE_BASE + "/info-practica.html"],
    [t.l4h, t.l4p, SITE_BASE + "/travessa-priorat.html#guia"]
  ];
  return rows.map(function(r) {
    return '<tr><td style="padding:14px 0;border-top:1px solid #e6ddc8;">' +
      '<div style="font-family:monospace;font-size:12px;letter-spacing:.03em;text-transform:uppercase;color:#c69214;font-weight:700;margin-bottom:4px;">' + r[0] + '</div>' +
      '<div style="font-size:14px;color:#3a332c;line-height:1.55;margin-bottom:6px;">' + r[1] + '</div>' +
      '<a href="' + r[2] + '" style="font-size:13px;color:#7a1f2b;font-weight:700;text-decoration:none;">' + r[2].replace("https://","") + ' &rarr;</a>' +
      '</td></tr>';
  }).join("");
}

const WELCOME_TEXT_ = {
  ca: function(alias) {
    return "Hola, " + alias + ",\n\n" +
      "T'has registrat per fer la Ruta del Silenci, i ens fa molta il·lusió donar-te la benvinguda.\n\n" +
      "Has escollit un camí especial: paisatges de vinyes i oliveres, ermites, abraçats pel Montsant, pobles que semblen aturats en el temps i, sobretot, un silenci que només la natura sabia guardar. Esperem que la disfrutis a fons, pas a pas, i que tornis a casa amb la mirada plena.\n\n" +
      "Abans de calçar-te les botes, tingues en compte aquesta informació important: NO llencis aquest correu. Conté enllaços i informació que et caldran durant i després de la ruta.\n\n" +
      "CAMINANTS DE LA RUTA — Aquí pots veure la llista de caminants que ja han fet la ruta o hi són ara mateix:\n" + SITE_BASE + "/finalizados.html\n\n" +
      "CERTIFICA LA TEVA RUTA — Guarda aquest enllaç, el necessitaràs un cop l'hagis acabat per enviar-nos les 4 fotos que necessitem per certificar que has fet la Ruta Circular del Silenci:\n" + SITE_BASE + "/certificar.html\n\n" +
      "PLANIFICA BÉ LA RUTA — Trobaràs tota la informació pràctica aquí:\n" + SITE_BASE + "/info-practica.html\n\n" +
      "GUIA DE LA TRAVESSA — I per acompanyar-te en el camí, aquí tens la guia completa:\n" + SITE_BASE + "/travessa-priorat.html#guia\n\n" +
      "Que el vent et sigui favorable i el silenci et parli ben fort.\n\n" +
      "Bon camí!\n" +
      "L'equip de la Ruta del Silenci del Priorat";
  },
  es: function(alias) {
    return "Hola, " + alias + ",\n\n" +
      "Te has registrado para hacer la Ruta del Silencio, y nos hace mucha ilusión darte la bienvenida.\n\n" +
      "Has elegido un camino especial: paisajes de viñas y olivos, ermitas, abrazados por el Montsant, pueblos que parecen detenidos en el tiempo y, sobre todo, un silencio que solo la naturaleza sabía guardar. Esperamos que lo disfrutes a fondo, paso a paso, y que vuelvas a casa con la mirada llena.\n\n" +
      "Antes de calzarte las botas, ten en cuenta esta información importante: NO borres este correo. Contiene enlaces e información que necesitarás durante y después de la ruta.\n\n" +
      "CAMINANTES DE LA RUTA — Aquí puedes ver la lista de caminantes que ya han hecho la ruta o están en ella ahora mismo:\n" + SITE_BASE + "/finalizados.html\n\n" +
      "CERTIFICA TU RUTA — Guarda este enlace, lo necesitarás una vez la hayas terminado para enviarnos las 4 fotos que necesitamos para certificar que has hecho la Ruta Circular del Silencio:\n" + SITE_BASE + "/certificar.html\n\n" +
      "PLANIFICA BIEN LA RUTA — Encontrarás toda la información práctica aquí:\n" + SITE_BASE + "/info-practica.html\n\n" +
      "GUÍA DE LA TRAVESÍA — Y para acompañarte en el camino, aquí tienes la guía completa:\n" + SITE_BASE + "/travessa-priorat.html#guia\n\n" +
      "Que el viento te sea favorable y el silencio te hable bien alto.\n\n" +
      "¡Buen camino!\n" +
      "El equipo de la Ruta del Silencio del Priorat";
  },
  en: function(alias) {
    return "Hello, " + alias + ",\n\n" +
      "You've signed up for the Route of Silence, and we're delighted to welcome you.\n\n" +
      "You've chosen a special path: landscapes of vineyards and olive groves, hermitages embraced by the Montsant, villages that seem frozen in time, and above all, a silence that only nature knew how to keep. We hope you enjoy it fully, step by step, and come home with your eyes full.\n\n" +
      "Before lacing up your boots, keep this important information in mind: do NOT delete this email. It contains links and information you'll need during and after the route.\n\n" +
      "WALKERS OF THE ROUTE — Here you can see the list of walkers who have already done the route or are on it right now:\n" + SITE_BASE + "/finalizados.html\n\n" +
      "CERTIFY YOUR ROUTE — Save this link, you'll need it once you've finished to send us the 4 photos we need to certify you've completed the Circular Route of Silence:\n" + SITE_BASE + "/certificar.html\n\n" +
      "PLAN THE ROUTE WELL — You'll find all the practical information here:\n" + SITE_BASE + "/info-practica.html\n\n" +
      "GUIDE TO THE CROSSING — And to accompany you along the way, here's the complete guide:\n" + SITE_BASE + "/travessa-priorat.html#guia\n\n" +
      "May the wind be at your back and the silence speak loudly to you.\n\n" +
      "Good trail!\n" +
      "The Route of Silence of Priorat team";
  }
};

const WELCOME_LINK_LABELS_ = {
  ca: { l1h:"Caminants de la ruta", l1p:"Aquí pots veure la llista de caminants que ja han fet la ruta o hi són ara mateix.",
        l2h:"Certifica la teva ruta", l2p:"Guarda aquest enllaç: el necessitaràs quan acabis, per enviar-nos les 4 fotos que certifiquen la Ruta Circular del Silenci.",
        l3h:"Planifica bé la ruta", l3p:"Tota la informació pràctica abans de sortir.",
        l4h:"Guia de la travessa", l4p:"La guia completa per acompanyar-te pel camí." },
  es: { l1h:"Caminantes de la ruta", l1p:"Aquí puedes ver la lista de caminantes que ya han hecho la ruta o están en ella ahora mismo.",
        l2h:"Certifica tu ruta", l2p:"Guarda este enlace: lo necesitarás cuando termines, para enviarnos las 4 fotos que certifican la Ruta Circular del Silencio.",
        l3h:"Planifica bien la ruta", l3p:"Toda la información práctica antes de salir.",
        l4h:"Guía de la travesía", l4p:"La guía completa para acompañarte en el camino." },
  en: { l1h:"Walkers of the route", l1p:"See the list of walkers who have already done the route or are on it right now.",
        l2h:"Certify your route", l2p:"Save this link: you'll need it once you finish, to send us the 4 photos that certify the Circular Route of Silence.",
        l3h:"Plan the route well", l3p:"All the practical information before setting out.",
        l4h:"Guide to the crossing", l4p:"The complete guide to accompany you along the way." }
};

function welcomeHtml_(lang, alias) {
  const L = WELCOME_LINK_LABELS_[lang] || WELCOME_LINK_LABELS_.ca;
  const intro = {
    ca: ["T'has registrat per fer la <strong>Ruta del Silenci</strong>, i ens fa molta il·lusió donar-te la benvinguda.",
         "Has escollit un camí especial: paisatges de vinyes i oliveres, ermites, abraçats pel Montsant, pobles que semblen aturats en el temps i, sobretot, un <strong>silenci</strong> que només la natura sabia guardar. Esperem que la disfrutis a fons, pas a pas, i que tornis a casa amb la mirada plena.",
         "⚠️ <strong>No llencis aquest correu.</strong> Conté enllaços i informació que et caldran durant i després de la ruta.",
         "Que el vent et sigui favorable i el silenci et parli ben fort.<br><strong>Bon camí!</strong>",
         "L'equip de la Ruta del Silenci del Priorat"],
    es: ["Te has registrado para hacer la <strong>Ruta del Silencio</strong>, y nos hace mucha ilusión darte la bienvenida.",
         "Has elegido un camino especial: paisajes de viñas y olivos, ermitas, abrazados por el Montsant, pueblos que parecen detenidos en el tiempo y, sobre todo, un <strong>silencio</strong> que solo la naturaleza sabía guardar. Esperamos que lo disfrutes a fondo, paso a paso, y que vuelvas a casa con la mirada llena.",
         "⚠️ <strong>No borres este correo.</strong> Contiene enlaces e información que necesitarás durante y después de la ruta.",
         "Que el viento te sea favorable y el silencio te hable bien alto.<br><strong>¡Buen camino!</strong>",
         "El equipo de la Ruta del Silencio del Priorat"],
    en: ["You've signed up for the <strong>Route of Silence</strong>, and we're delighted to welcome you.",
         "You've chosen a special path: landscapes of vineyards and olive groves, hermitages embraced by the Montsant, villages that seem frozen in time, and above all, a <strong>silence</strong> that only nature knew how to keep. We hope you enjoy it fully, step by step, and come home with your eyes full.",
         "⚠️ <strong>Don't delete this email.</strong> It contains links and information you'll need during and after the route.",
         "May the wind be at your back and the silence speak loudly to you.<br><strong>Good trail!</strong>",
         "The Route of Silence of Priorat team"]
  }[lang] || null;
  const t = intro || {}; // fallback safety, unreachable if lang resolved to ca/es/en
  const p = intro;

  return '<div style="font-family:Georgia,\'Times New Roman\',serif;max-width:560px;margin:0 auto;background:#faf7ef;color:#3a332c;">' +
    '<div style="background:#1a1715;padding:28px 30px;text-align:center;">' +
      '<div style="font-family:Georgia,serif;font-size:20px;color:#ede6d6;letter-spacing:.02em;">Travessa del <span style="color:#c69214;">Priorat</span></div>' +
    '</div>' +
    '<div style="padding:32px 30px;">' +
      '<p style="font-size:16px;margin:0 0 18px;">Hola, <strong>' + alias + '</strong>,</p>' +
      '<p style="font-size:15px;line-height:1.65;margin:0 0 18px;">' + p[0] + '</p>' +
      '<p style="font-size:15px;line-height:1.65;margin:0 0 22px;">' + p[1] + '</p>' +
      '<div style="background:#fff3d9;border-left:3px solid #c69214;padding:14px 16px;font-size:13.5px;line-height:1.5;margin:0 0 26px;">' + p[2] + '</div>' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">' +
        welcomeLinksHtml_(L) +
      '</table>' +
      '<p style="font-size:14px;line-height:1.7;margin:28px 0 4px;font-style:italic;">' + p[3] + '</p>' +
      '<p style="font-size:13px;color:#8a8074;margin:18px 0 0;">' + p[4] + '</p>' +
    '</div>' +
    '<div style="background:#1a1715;padding:16px 30px;text-align:center;font-family:monospace;font-size:11px;color:#8a8074;">Travessa del Priorat &middot; ' + SITE_BASE.replace("https://","") + '</div>' +
  '</div>';
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["id", "alias", "email", "origen", "variante", "startDate", "mensaje", "verified", "submittedAt", "notified"]);
    sheet.setFrozenRows(1);
  } else {
    // Migración suave: si la hoja es de antes de esta función, añade la columna "notified".
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (headers.indexOf("notified") === -1) {
      sheet.getRange(1, headers.length + 1).setValue("notified");
    }
  }
  return sheet;
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const action = (e.parameter && e.parameter.action) || "list";
  if (action === "list") {
    return jsonOut_(listEntries_());
  }
  return jsonOut_({ error: "unknown action" });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOut_({ error: "bad json" });
  }

  if (body.action === "add") {
    return jsonOut_(addEntry_(body));
  }
  if (body.action === "login") {
    // Pequeña pausa para dificultar intentos automatizados de adivinar la contraseña.
    Utilities.sleep(300);
    return jsonOut_({ ok: body.password === ADMIN_PASSWORD });
  }
  if (body.action === "verify") {
    if (body.token !== ADMIN_PASSWORD) return jsonOut_({ error: "unauthorized" });
    return jsonOut_(setVerified_(body.id, !!body.verified));
  }
  if (body.action === "notify") {
    if (body.token !== ADMIN_PASSWORD) return jsonOut_({ error: "unauthorized" });
    return jsonOut_(notifyWalker_(body.id));
  }
  return jsonOut_({ error: "unknown action" });
}

function listEntries_() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  const rows = values.slice(1);
  return rows
    .filter(row => row.some(cell => cell !== "")) // skip completely empty rows
    .map(row => {
      const o = {};
      headers.forEach((h, i) => (o[h] = row[i]));
      o.verified = o.verified === true || String(o.verified).toUpperCase() === "TRUE";
      o.notified = o.notified === true || String(o.notified).toUpperCase() === "TRUE";
      if (o.submittedAt instanceof Date) o.submittedAt = o.submittedAt.toISOString();
      if (o.startDate instanceof Date) o.startDate = Utilities.formatDate(o.startDate, Session.getScriptTimeZone(), "yyyy-MM-dd");
      return o;
    });
}

function addEntry_(body) {
  // Validación mínima en servidor: nunca confíes solo en el HTML del cliente.
  const alias = String(body.alias || "").trim().slice(0, 30);
  const email = String(body.email || "").trim().slice(0, 100);
  if (alias.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid alias or email" };
  }
  const lang = ["ca", "es", "en"].indexOf(body.lang) !== -1 ? body.lang : "ca";
  const sheet = getSheet_();
  const id = Utilities.getUuid();
  sheet.appendRow([
    id,
    alias,
    email,
    String(body.origen || "").trim().slice(0, 40),
    String(body.variante || "").trim(),
    String(body.startDate || "").trim(),
    String(body.mensaje || "").trim().slice(0, 140),
    false,
    new Date().toISOString()
  ]);

  // El correo de bienvenida nunca debe romper la inscripción si falla.
  try {
    MailApp.sendEmail({
      to: email,
      subject: WELCOME_SUBJECT_[lang],
      body: WELCOME_TEXT_[lang](alias),
      htmlBody: welcomeHtml_(lang, alias),
      name: "Travessa del Priorat"
    });
  } catch (err) {
    // La inscripción ya se ha guardado igualmente; solo falla el correo.
  }

  return { ok: true, id };
}

function setVerified_(id, verified) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idCol = headers.indexOf("id");
  const verifiedCol = headers.indexOf("verified");
  for (let r = 1; r < values.length; r++) {
    if (values[r][idCol] === id) {
      sheet.getRange(r + 1, verifiedCol + 1).setValue(verified);
      return { ok: true };
    }
  }
  return { ok: false, error: "not found" };
}

function notifyWalker_(id) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idCol = headers.indexOf("id");
  const emailCol = headers.indexOf("email");
  const aliasCol = headers.indexOf("alias");
  const notifiedCol = headers.indexOf("notified");
  for (let r = 1; r < values.length; r++) {
    if (values[r][idCol] === id) {
      const email = values[r][emailCol];
      const alias = values[r][aliasCol];
      try {
        MailApp.sendEmail({
          to: email,
          subject: EMAIL_SUBJECT,
          body: EMAIL_BODY_(alias),
          name: "Travessa del Priorat"
        });
      } catch (err) {
        return { ok: false, error: "email failed: " + err.message };
      }
      sheet.getRange(r + 1, notifiedCol + 1).setValue(true);
      return { ok: true };
    }
  }
  return { ok: false, error: "not found" };
}
