/**
 * Travessa del Priorat — backend con Google Sheets
 * ================================================
 * Pega este código en el editor de Apps Script de tu Google Sheet
 * (Extensiones → Apps Script), sustituye ADMIN_TOKEN si quieres,
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

// Mismo espíritu que el ADMIN_PASS de admin.html: no es seguridad real,
// solo evita que cualquiera que encuentre la URL pueda marcar verificaciones.
// Cámbialo aquí y también en admin.html (variable ADMIN_PASS) para que coincidan.
const ADMIN_TOKEN = "priorat2026";

// --- Plantilla del correo de confirmación. {alias} se sustituye automáticamente. ---
// Cuando tengas el texto definitivo, sustitúyelo aquí (o pídemelo y te lo actualizo).
const EMAIL_SUBJECT = "Tu Travessa del Priorat está verificada ✓";
const EMAIL_BODY_ = (alias) =>
  "Hola " + alias + ",\n\n" +
  "Hemos revisado tus 4 fotos y confirmamos que has completado la Travessa del Priorat. " +
  "Tu alias ya aparece como verificado en la lista pública de caminantes.\n\n" +
  "Gracias por recorrerla y por compartirlo con nosotros.\n\n" +
  "— Travessa del Priorat";

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
  if (body.action === "verify") {
    if (body.token !== ADMIN_TOKEN) return jsonOut_({ error: "unauthorized" });
    return jsonOut_(setVerified_(body.id, !!body.verified));
  }
  if (body.action === "notify") {
    if (body.token !== ADMIN_TOKEN) return jsonOut_({ error: "unauthorized" });
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
