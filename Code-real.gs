const SHEET_NAME = 'inscripciones';

/*
 * Google Apps Script - backend de inscripciones
 *
 * Endpoints:
 *   POST { action: 'add', ... }
 *   POST { action: 'login', password: '...' }
 *   POST { action: 'verify', token: '...', id: 'row-2', verified: true }
 *   POST { action: 'notify', token: '...', id: 'row-2' }
 *   POST { action: 'notify', token: '...', id: 'row-2', force: true }
 *   GET  ?action=list
 *
 * CONFIGURACIÓN:
 * 1. En Apps Script > Configuración del proyecto > Propiedades de secuencia
 *    de comandos, crea:
 *
 *       ADMIN_PASSWORD = tu contraseña
 *
 * 2. La contraseña NO debe quedar escrita en el código.
 *
 * NOTA:
 * El endpoint público "list" no devuelve el correo electrónico.
 */

/* -------------------------------------------------------------------------- */
/* ENTRADA / SALIDA                                                           */
/* -------------------------------------------------------------------------- */

function doPost(e) {
  try {
    if (!e || !e.postData || typeof e.postData.contents !== 'string') {
      return jsonResponse_({
        ok: false,
        error: 'Cuerpo de la petición vacío'
      });
    }

    const raw = e.postData.contents.trim();

    if (!raw) {
      return jsonResponse_({
        ok: false,
        error: 'Cuerpo de la petición vacío'
      });
    }

    let data;

    try {
      data = JSON.parse(raw);
    } catch (parseError) {
      return jsonResponse_({
        ok: false,
        error: 'JSON inválido'
      });
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return jsonResponse_({
        ok: false,
        error: 'Datos inválidos'
      });
    }

    const action = String(data.action || '').trim().toLowerCase();

    switch (action) {
      case 'add':
        return handleAdd_(data);

      case 'login':
        return handleLogin_(data);

      case 'checkwalker':
        return handleCheckWalker_(data);

      case 'verify':
        return handleVerify_(data);

      case 'notify':
        return handleNotify_(data);

      case 'adminlist':
        return handleAdminList_(data);

      default:
        return jsonResponse_({
          ok: false,
          error: 'Acción inválida'
        });
    }
  } catch (err) {
    console.error(err);

    return jsonResponse_({
      ok: false,
      error: getErrorMessage_(err)
    });
  }
}

function doGet(e) {
  try {
    const action = e && e.parameter
      ? String(e.parameter.action || '').trim().toLowerCase()
      : '';

    if (action === 'list') {
      return jsonResponse_({
        ok: true,
        rows: listInscripciones_()
      });
    }

    return jsonResponse_({
      ok: true,
      service: 'travessa-priorat-inscripcions'
    });
  } catch (err) {
    console.error(err);

    return jsonResponse_({
      ok: false,
      error: getErrorMessage_(err)
    });
  }
}

/* -------------------------------------------------------------------------- */
/* INSCRIPCIONES                                                              */
/* -------------------------------------------------------------------------- */

function handleAdd_(data) {
  const validation = validateSubmission_(data);

  if (!validation.ok) {
    return jsonResponse_({
      ok: false,
      error: validation.error
    });
  }

  const sheet = getSheet_();
  const header = ensureColumns_(sheet);
  const idx = headerIndex_(header);

  const alias = validation.values.alias;
  const email = validation.values.email;
  const origen = validation.values.origen;
  const variante = validation.values.variante;
  const startDate = validation.values.startDate;
  const lang = validation.values.lang;
  const mensaje = validation.values.mensaje;
  const pageUrl = validation.values.pageUrl;
  const userAgent = validation.values.userAgent;

  /*
   * Idempotencia básica:
   * si el navegador reintenta exactamente la misma inscripción, evitamos
   * crear duplicados inmediatos.
   */
  const existingRow = findRecentDuplicateRow_(
    sheet,
    idx,
    email,
    alias,
    startDate,
    variante
  );

  if (existingRow) {
    return jsonResponse_({
      ok: true,
      duplicate: true,
      rowId: 'row-' + existingRow,
      emailSent: false,
      message: 'La inscripción ya estaba registrada'
    });
  }

  const row = new Array(header.length).fill('');

  row[idx.submittedAt] = new Date();
  row[idx.alias] = alias;
  row[idx.email] = email;
  row[idx.origen] = origen;
  row[idx.variante] = variante;
  row[idx.startDate] = startDate;
  row[idx.mensaje] = mensaje;
  row[idx.lang] = lang;
  row[idx.pageUrl] = pageUrl;
  row[idx.userAgent] = userAgent;
  row[idx.verified] = false;
  row[idx.notified] = false;
  row[idx.publicDisplay] = data.publicDisplay === false ? false : true;

  const lock = LockService.getScriptLock();
  let rowNumber = null;

  try {
    lock.waitLock(10000);

    /*
     * Volvemos a comprobar después de adquirir el lock para evitar una
     * carrera entre dos peticiones simultáneas.
     */
    const duplicateAfterLock = findRecentDuplicateRow_(
      sheet,
      idx,
      email,
      alias,
      startDate,
      variante
    );

    if (duplicateAfterLock) {
      return jsonResponse_({
        ok: true,
        duplicate: true,
        rowId: 'row-' + duplicateAfterLock,
        emailSent: false,
        message: 'La inscripción ya estaba registrada'
      });
    }

    sheet.appendRow(rowNumberArray_(row));

    rowNumber = sheet.getLastRow();
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {
      // No hacer nada.
    }
  }

  let emailResult = {
    sent: false,
    messageId: null,
    error: null
  };

  try {
    emailResult = sendThankYouEmail_({
      alias: alias,
      email: email,
      origen: origen,
      variante: variante,
      startDate: startDate,
      mensaje: mensaje,
      lang: lang,
      pageUrl: pageUrl,
      userAgent: userAgent
    });
  } catch (err) {
    emailResult = {
      sent: false,
      messageId: null,
      error: getErrorMessage_(err)
    };

    console.error(err);
  }

  return jsonResponse_({
    ok: true,
    rowId: rowNumber ? 'row-' + rowNumber : null,
    emailSent: !!emailResult.sent,
    messageId: emailResult.messageId || null,
    emailError: emailResult.error || null
  });
}

/*
 * Devuelve una copia segura de la fila.
 * La función existe para mantener explícita la intención de escribir una fila
 * de longitud idéntica a la cabecera.
 */
function rowNumberArray_(row) {
  return row.slice();
}

function findRecentDuplicateRow_(sheet, idx, email, alias, startDate, variante) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return null;
  }

  const firstDataRow = Math.max(2, lastRow - 20 + 1);
  const numRows = lastRow - firstDataRow + 1;

  const values = sheet
    .getRange(firstDataRow, 1, numRows, sheet.getLastColumn())
    .getValues();

  const normalizedEmail = email.toLowerCase();
  const normalizedAlias = alias.toLowerCase();
  const normalizedDate = startDate.toLowerCase();
  const normalizedVariant = normalizeVariant_(variante).key;

  for (let i = values.length - 1; i >= 0; i--) {
    const row = values[i];

    const rowEmail = String(row[idx.email] || '').trim().toLowerCase();
    const rowAlias = String(row[idx.alias] || '').trim().toLowerCase();
    const rowDate = String(row[idx.startDate] || '').trim().toLowerCase();
    const rowVariant = normalizeVariant_(
      String(row[idx.variante] || '')
    ).key;

    if (
      rowEmail === normalizedEmail &&
      rowAlias === normalizedAlias &&
      rowDate === normalizedDate &&
      rowVariant === normalizedVariant
    ) {
      return firstDataRow + i;
    }
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* AUTENTICACIÓN                                                              */
/* -------------------------------------------------------------------------- */

function getAdminPassword_() {
  const password = PropertiesService
    .getScriptProperties()
    .getProperty('ADMIN_PASSWORD');

  if (!password) {
    throw new Error(
      'Falta la propiedad ADMIN_PASSWORD en las propiedades del proyecto de Apps Script.'
    );
  }

  return password;
}

function checkAuth_(token) {
  if (typeof token !== 'string' || !token) {
    return false;
  }

  return token === getAdminPassword_();
}

function handleLogin_(data) {
  try {
    if (checkAuth_(String(data.password || ''))) {
      return jsonResponse_({
        ok: true
      });
    }

    return jsonResponse_({
      ok: false,
      error: 'Contraseña incorrecta'
    });
  } catch (err) {
    console.error(err);

    return jsonResponse_({
      ok: false,
      error: getErrorMessage_(err)
    });
  }
}

/* -------------------------------------------------------------------------- */
/* VERIFICACIÓN DE CAMINANTE (para certificar.html)                          */
/* -------------------------------------------------------------------------- */

/*
 * Verifica alias + email en el servidor sin exponer nunca la lista de
 * correos al cliente. listInscripciones_() (el listado público) omite el
 * email a propósito por privacidad, así que esta comprobación debe hacerse
 * aquí, no en el navegador.
 */
function handleCheckWalker_(data) {
  try {
    const alias = normalizeText_(data.alias).toLowerCase();
    const email = normalizeEmail_(data.email);

    if (!alias || !email) {
      return jsonResponse_({
        ok: true,
        found: false
      });
    }

    const rateLimitKey = 'checkwalker_' + email;
    const cache = CacheService.getScriptCache();
    const attempts = Number(cache.get(rateLimitKey) || 0);

    if (attempts >= 5) {
      return jsonResponse_({
        ok: false,
        error: 'Demasiados intentos. Espera un minuto antes de volver a intentarlo.'
      });
    }

    const sheet = getSheet_();
    const header = ensureColumns_(sheet);
    const idx = headerIndex_(header);
    const values = sheet.getDataRange().getValues();

    let match = null;

    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const rowAlias = String(row[idx.alias] || '').trim().toLowerCase();
      const rowEmail = String(row[idx.email] || '').trim().toLowerCase();

      if (rowAlias === alias && rowEmail === email) {
        match = {
          alias: String(row[idx.alias] || '').trim(),
          origen: String(row[idx.origen] || ''),
          variante: String(row[idx.variante] || ''),
          startDate: serializeCell_(row[idx.startDate]),
          lang: normalizeLanguage_(row[idx.lang])
        };
        break;
      }
    }

    if (!match) {
      cache.put(rateLimitKey, String(attempts + 1), 60);
    } else {
      cache.remove(rateLimitKey);
    }

    return jsonResponse_({
      ok: true,
      found: !!match,
      data: match
    });
  } catch (err) {
    console.error(err);

    return jsonResponse_({
      ok: false,
      error: getErrorMessage_(err)
    });
  }
}

/* -------------------------------------------------------------------------- */
/* VERIFICAR                                                                   */
/* -------------------------------------------------------------------------- */

function rowNumberFromId_(id) {
  const match = /^row-(\d+)$/.exec(String(id || '').trim());

  if (!match) {
    return null;
  }

  const rowNumber = Number(match[1]);

  return Number.isInteger(rowNumber) ? rowNumber : null;
}

function getValidRow_(sheet, rowNum) {
  return (
    Number.isInteger(rowNum) &&
    rowNum >= 2 &&
    rowNum <= sheet.getLastRow()
  );
}

function handleVerify_(data) {
  try {
    if (!checkAuth_(String(data.token || ''))) {
      return jsonResponse_({
        ok: false,
        error: 'No autorizado'
      });
    }

    const rowNum = rowNumberFromId_(data.id);

    if (!rowNum) {
      return jsonResponse_({
        ok: false,
        error: 'ID inválido'
      });
    }

    const sheet = getSheet_();
    const header = ensureColumns_(sheet);
    const idx = headerIndex_(header);

    if (!getValidRow_(sheet, rowNum)) {
      return jsonResponse_({
        ok: false,
        error: 'Fila fuera de rango'
      });
    }

    const verified = toBool_(data.verified);

    sheet
      .getRange(rowNum, idx.verified + 1)
      .setValue(verified);

    /*
     * Si se desmarca la verificación, no mantenemos el estado de notificado
     * como verdadero. Así el estado de la fila vuelve a ser coherente.
     */
    if (!verified) {
      sheet
        .getRange(rowNum, idx.notified + 1)
        .setValue(false);
    }

    return jsonResponse_({
      ok: true,
      verified: verified
    });
  } catch (err) {
    console.error(err);

    return jsonResponse_({
      ok: false,
      error: getErrorMessage_(err)
    });
  }
}

/* -------------------------------------------------------------------------- */
/* NOTIFICAR                                                                   */
/* -------------------------------------------------------------------------- */

function handleNotify_(data) {
  try {
    if (!checkAuth_(String(data.token || ''))) {
      return jsonResponse_({
        ok: false,
        error: 'No autorizado'
      });
    }

    const rowNum = rowNumberFromId_(data.id);

    if (!rowNum) {
      return jsonResponse_({
        ok: false,
        error: 'ID inválido'
      });
    }

    const sheet = getSheet_();
    const header = ensureColumns_(sheet);
    const idx = headerIndex_(header);

    if (!getValidRow_(sheet, rowNum)) {
      return jsonResponse_({
        ok: false,
        error: 'Fila fuera de rango'
      });
    }

    const rowValues = sheet
      .getRange(rowNum, 1, 1, header.length)
      .getValues()[0];

    const alias = String(rowValues[idx.alias] || '').trim();
    const email = String(rowValues[idx.email] || '').trim();
    const lang = normalizeLanguage_(rowValues[idx.lang]);
    const verified = toBool_(rowValues[idx.verified]);
    const alreadyNotified = toBool_(rowValues[idx.notified]);
    const force = toBool_(data.force);

    if (!alias || !email) {
      return jsonResponse_({
        ok: false,
        error: 'La inscripción no tiene alias o correo'
      });
    }

    /*
     * Solo se envía el correo de verificación cuando el administrador ha
     * marcado la inscripción como verificada.
     */
    if (!verified) {
      return jsonResponse_({
        ok: false,
        error: 'La inscripción todavía no está verificada'
      });
    }

    /*
     * Evitamos envíos accidentales repetidos. Se puede forzar con:
     * { force: true }
     */
    if (alreadyNotified && !force) {
      return jsonResponse_({
        ok: true,
        alreadyNotified: true,
        message: 'La notificación ya había sido enviada'
      });
    }

    sendVerifiedEmail_(alias, email, lang);

    sheet
      .getRange(rowNum, idx.notified + 1)
      .setValue(true);

    return jsonResponse_({
      ok: true,
      alreadyNotified: false,
      forced: force
    });
  } catch (err) {
    console.error(err);

    return jsonResponse_({
      ok: false,
      error: getErrorMessage_(err)
    });
  }
}

/* -------------------------------------------------------------------------- */
/* LISTADO ADMIN (todas las filas, incluidas las que no aparecen en público) */
/* -------------------------------------------------------------------------- */

function handleAdminList_(data) {
  try {
    if (!checkAuth_(String(data.token || ''))) {
      return jsonResponse_({
        ok: false,
        error: 'No autorizado'
      });
    }

    const sheet = getSheet_();
    const header = ensureColumns_(sheet);
    const idx = headerIndex_(header);
    const values = sheet.getDataRange().getValues();

    const rows = [];

    for (let i = 1; i < values.length; i++) {
      const row = values[i];

      const alias = String(row[idx.alias] || '').trim();
      const email = String(row[idx.email] || '').trim();

      if (!alias || !email) {
        continue;
      }

      rows.push({
        id: 'row-' + (i + 1),
        alias: alias,
        email: email,
        origen: String(row[idx.origen] || ''),
        variante: String(row[idx.variante] || ''),
        startDate: serializeCell_(row[idx.startDate]),
        lang: normalizeLanguage_(row[idx.lang]),
        verified: toBool_(row[idx.verified]),
        notified: toBool_(row[idx.notified]),
        publicDisplay: toBool_(
          row[idx.publicDisplay] === '' || row[idx.publicDisplay] == null
            ? true
            : row[idx.publicDisplay]
        )
      });
    }

    return jsonResponse_({
      ok: true,
      rows: rows
    });
  } catch (err) {
    console.error(err);

    return jsonResponse_({
      ok: false,
      error: getErrorMessage_(err)
    });
  }
}

/* -------------------------------------------------------------------------- */
/* LISTADO PÚBLICO                                                             */
/* -------------------------------------------------------------------------- */

function listInscripciones_() {
  const sheet = getSheet_();
  const header = ensureColumns_(sheet);
  const idx = headerIndex_(header);
  const values = sheet.getDataRange().getValues();

  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];

    const alias = String(row[idx.alias] || '').trim();
    const email = String(row[idx.email] || '').trim();

    if (!alias || !email) {
      continue;
    }

    const publicCell = row[idx.publicDisplay];
    const isPublic = (publicCell === '' || publicCell == null) ? true : toBool_(publicCell);

    if (!isPublic) {
      continue;
    }

    /*
     * El correo NO se devuelve en el listado público.
     */
    rows.push({
      id: 'row-' + (i + 1),
      alias: alias,
      origen: String(row[idx.origen] || ''),
      variante: String(row[idx.variante] || ''),
      startDate: serializeCell_(row[idx.startDate]),
      lang: normalizeLanguage_(row[idx.lang]),
      verified: toBool_(row[idx.verified]),
      notified: toBool_(row[idx.notified])
    });
  }

  return rows;
}

/* -------------------------------------------------------------------------- */
/* HOJA                                                                        */
/* -------------------------------------------------------------------------- */

function getRequiredColumns_() {
  return [
    'submittedAt',
    'alias',
    'email',
    'origen',
    'variante',
    'startDate',
    'mensaje',
    'lang',
    'pageUrl',
    'userAgent',
    'verified',
    'notified',
    'publicDisplay'
  ];
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error(
      'No se ha encontrado el Spreadsheet activo. Vincula este script a la hoja de cálculo.'
    );
  }

  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);

    const columns = getRequiredColumns_();

    sheet
      .getRange(1, 1, 1, columns.length)
      .setValues([columns]);
  }

  return sheet;
}

function ensureColumns_(sheet) {
  const requiredColumns = getRequiredColumns_();
  let lastCol = sheet.getLastColumn();

  if (lastCol === 0) {
    sheet
      .getRange(1, 1, 1, requiredColumns.length)
      .setValues([requiredColumns]);

    return requiredColumns.slice();
  }

  let header = sheet
    .getRange(1, 1, 1, lastCol)
    .getValues()[0]
    .map(function(value) {
      return String(value || '').trim();
    });

  /*
   * Si existe una cabecera antigua con columnas vacías, no las eliminamos:
   * preservamos los datos del usuario.
   */
  requiredColumns.forEach(function(column) {
    if (header.indexOf(column) === -1) {
      header.push(column);
    }
  });

  if (header.length > lastCol) {
    sheet
      .getRange(
        1,
        lastCol + 1,
        1,
        header.length - lastCol
      )
      .setValues([
        header.slice(lastCol)
      ]);
  }

  return header;
}

function headerIndex_(header) {
  const idx = {};

  header.forEach(function(name, index) {
    if (name) {
      idx[name] = index;
    }
  });

  const required = getRequiredColumns_();

  required.forEach(function(column) {
    if (!Object.prototype.hasOwnProperty.call(idx, column)) {
      throw new Error(
        'Falta la columna requerida "' + column + '" en la hoja.'
      );
    }
  });

  return idx;
}

/* -------------------------------------------------------------------------- */
/* VALIDACIÓN                                                                  */
/* -------------------------------------------------------------------------- */

function validateSubmission_(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      ok: false,
      error: 'Datos inválidos'
    };
  }

  const alias = normalizeText_(data.alias);
  const email = normalizeEmail_(data.email);
  const origen = normalizeText_(data.origen);
  const variantResult = normalizeVariant_(data.variante);
  const startDate = normalizeText_(data.startDate);
  const mensaje = normalizeText_(data.mensaje);
  const lang = normalizeLanguageStrict_(data.lang);
  const pageUrl = normalizeText_(data.pageUrl);
  const userAgent = normalizeText_(data.userAgent);

  const consent =
    data.consent === true ||
    String(data.consent || '').trim().toLowerCase() === 'true' ||
    String(data.consent || '').trim() === '1';

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (alias.length < 2 || alias.length > 30) {
    return {
      ok: false,
      error: 'El alias debe tener entre 2 y 30 caracteres'
    };
  }

  if (!emailOk || email.length > 254) {
    return {
      ok: false,
      error: 'Correo electrónico inválido'
    };
  }

  if (!origen) {
    return {
      ok: false,
      error: 'Falta el origen'
    };
  }

  if (!variantResult.ok) {
    return {
      ok: false,
      error: 'Variante de ruta inválida'
    };
  }

  if (!startDate) {
    return {
      ok: false,
      error: 'Falta la fecha de inicio'
    };
  }

  if (!consent) {
    return {
      ok: false,
      error: 'Es necesario aceptar el consentimiento'
    };
  }

  if (!lang.ok) {
    return {
      ok: false,
      error: 'Idioma inválido'
    };
  }

  return {
    ok: true,
    values: {
      alias: alias,
      email: email,
      origen: origen,
      variante: variantResult.display,
      startDate: startDate,
      mensaje: mensaje,
      lang: lang.value,
      pageUrl: pageUrl,
      userAgent: userAgent
    }
  };
}

function normalizeText_(value) {
  return String(value == null ? '' : value)
    .trim()
    .replace(/\s+/g, ' ');
}

function normalizeEmail_(value) {
  return normalizeText_(value).toLowerCase();
}

function normalizeLanguageStrict_(value) {
  const lang = String(value == null ? '' : value)
    .trim()
    .toLowerCase();

  if (['es', 'ca', 'en'].indexOf(lang) === -1) {
    return {
      ok: false,
      value: null
    };
  }

  return {
    ok: true,
    value: lang
  };
}

function normalizeLanguage_(value) {
  const result = normalizeLanguageStrict_(value);

  return result.ok ? result.value : 'es';
}

function normalizeVariant_(value) {
  const original = normalizeText_(value);

  if (!original) {
    return {
      ok: false,
      key: null,
      display: ''
    };
  }

  const compact = original
    .toLowerCase()
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ');

  /*
   * Variantes cortas aceptadas para compatibilidad con formularios existentes.
   */
  const shortValues = [
    'corta',
    'corto',
    'ruta corta',
    'short',
    '3 dias',
    '3 días',
    '4 dias',
    '4 días',
    '3-4 dias',
    '3-4 días',
    '3/4 días',
    '3/4 dias',
    '3–4 días',
    '3–4 dias'
  ];

  if (shortValues.indexOf(compact) !== -1) {
    return {
      ok: true,
      key: 'corta',
      display: original
    };
  }

  const longValues = [
    'larga',
    'largo',
    'ruta larga',
    'long',
    'completo',
    'completa',
    'complete',
    'circuito completo',
    'full',
    '8 dias',
    '8 días',
    '8-9 dias',
    '8-9 días',
    '8–9 días',
    '8–9 dias'
  ];

  if (longValues.indexOf(compact) !== -1) {
    return {
      ok: true,
      key: 'larga',
      display: original
    };
  }

  return {
    ok: false,
    key: null,
    display: original
  };
}

function isShortRoute_(variant) {
  return normalizeVariant_(variant).key === 'corta';
}

function toBool_(value) {
  if (value === true || value === 1) {
    return true;
  }

  const text = String(value == null ? '' : value)
    .trim()
    .toLowerCase();

  return text === 'true' || text === '1' || text === 'si' || text === 'sí';
}

/* -------------------------------------------------------------------------- */
/* EMAIL DE VERIFICACIÓN                                                      */
/* -------------------------------------------------------------------------- */

function sendVerifiedEmail_(alias, email, lang) {
  const safeAlias = escapeHtml_(alias || '');
  const walkersUrl =
    'https://ruta-circular-priorat.vercel.app/finalizados.html';

  const chosenLang = normalizeLanguage_(lang);

  const templates = {
    es: {
      subject: '¡Tu Travessa del Priorat está verificada!',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#28251d;max-width:640px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#7a1f2b;">¡Enhorabuena, ${safeAlias}!</h2>
          <p>Hemos revisado tus 4 fotografías y confirmamos que has completado la Travessa del Priorat. Tu alias ya aparece marcado como <strong>verificado</strong> en la lista de caminantes.</p>
          <p><a href="${walkersUrl}">→ Ver la lista de caminantes</a></p>
          <p style="margin-top:28px;">Gracias por recorrer la Ruta del Silencio,<br>Travessa del Priorat</p>
        </div>`
    },

    ca: {
      subject: 'La teva Travessa del Priorat ja està verificada!',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#28251d;max-width:640px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#7a1f2b;">Enhorabona, ${safeAlias}!</h2>
          <p>Hem revisat les teves 4 fotografies i confirmem que has completat la Travessa del Priorat. El teu alias ja apareix marcat com a <strong>verificat</strong> a la llista de caminants.</p>
          <p><a href="${walkersUrl}">→ Veure la llista de caminants</a></p>
          <p style="margin-top:28px;">Gràcies per recórrer la Ruta del Silenci,<br>Travessa del Priorat</p>
        </div>`
    },

    en: {
      subject: 'Your Travessa del Priorat is verified!',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#28251d;max-width:640px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#7a1f2b;">Congratulations, ${safeAlias}!</h2>
          <p>We've reviewed your 4 photos and confirmed you completed the Travessa del Priorat. Your alias is now marked as <strong>verified</strong> on the walkers list.</p>
          <p><a href="${walkersUrl}">→ View the walkers list</a></p>
          <p style="margin-top:28px;">Thanks for walking the Route of Silence,<br>Travessa del Priorat</p>
        </div>`
    }
  };

  const chosen = templates[chosenLang] || templates.es;

  MailApp.sendEmail({
    to: email,
    subject: chosen.subject,
    htmlBody: chosen.html,
    name: 'Travessa del Priorat'
  });

  return {
    sent: true,
    messageId: Utilities.getUuid(),
    error: null
  };
}

/* -------------------------------------------------------------------------- */
/* EMAIL DE CONFIRMACIÓN DE INSCRIPCIÓN                                       */
/* -------------------------------------------------------------------------- */

function sendThankYouEmail_(data) {
  const lang = normalizeLanguage_(data.lang);
  const alias = escapeHtml_(normalizeText_(data.alias));
  const email = normalizeEmail_(data.email);
  const safeEmail = escapeHtml_(email);
  const isCorta = isShortRoute_(data.variante);

  const routeUrl =
    'https://ruta-circular-priorat.vercel.app/travessa-priorat.html';
  const walkersUrl =
    'https://ruta-circular-priorat.vercel.app/finalizados.html';
  const inscriptionUrl =
    'https://ruta-circular-priorat.vercel.app/inscripcion.html';
  const guideUrl =
    'https://ruta-circular-priorat.vercel.app/#guia';
  const stagesUrl =
    'https://ruta-circular-priorat.vercel.app/#etapas';
  const certifyUrl =
    'https://ruta-circular-priorat.vercel.app/certificar.html';

  const templates = {
    es: {
      subject: 'Gracias por inscribirte en la Ruta del Silencio',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#28251d;max-width:640px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#7a1f2b;">Gracias por inscribirte, ${alias}</h2>

          <p>Hemos recibido tu inscripción en la Travessa del Priorat.</p>

          <p>Aquí puedes encontrar la información útil para preparar la ruta:</p>

          <ul>
            <li><a href="${routeUrl}">Ver la ruta</a></li>
            <li><a href="${walkersUrl}">Ver caminantes inscritos</a></li>
            <li><a href="${inscriptionUrl}">Volver a la inscripción</a></li>
          </ul>

          <hr style="border:none;border-top:1px solid #e3ddce;margin:24px 0;">

          <p style="font-size:12px;color:#7a1f2b;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">No elimines este correo</p>

          <p>Esta aventura no es una carrera contra el cronómetro, sino un viaje para el alma. Te invitamos a disfrutar de una travesía introspectiva, paso a paso, por parajes solitarios, salvajes y profundamente auténticos; paisajes dominados antiguamente por monjes y ermitaños que han sabido preservar toda su esencia mágica.</p>

          <p>Para disfrutar plenamente de la &ldquo;Ruta del Silencio&rdquo; y fluir con el entorno, solo te pedimos que sigas unas pequeñas normas de orden, convivencia y sentido común, tal como hacían los antiguos habitantes de estas tierras.</p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">Preparación y libertad de ruta</h3>

          <p>Antes de dar el primer paso, es fundamental que leas la información práctica de nuestra web y la Guía Práctica del Peregrino. Recuerda que <strong>tú eres el dueño de tu viaje</strong>: las etapas están planificadas con un kilometraje recomendado, pero tienes total libertad para adaptarlo a tu ritmo de caminata. Si te apetece detenerte a pasar la noche en un pueblecito que no estaba marcado como final de etapa, ¡adelante!</p>

          <p>Eso sí, te aconsejamos <strong>buscar y reservar tus alojamientos con antelación</strong>. En nuestra web encontrarás algunas recomendaciones, pero te animamos a hacer tu propia búsqueda para diseñar la aventura a tu medida.</p>

          <p><a href="${guideUrl}">→ Guía de la Ruta del Silencio</a></p>

          ${
            !isCorta
              ? `
                <h3 style="color:#7a1f2b;margin:28px 0 8px;">La experiencia completa: 8–9 días</h3>

                <p>Esta es la opción de inmersión total. Tendrás entre 8 y 9 días para completar todo el recorrido a pie. Puedes organizar las jornadas como quieras, con dos únicas reglas innegociables: <strong>cumplir con los días establecidos</strong> y <strong>respetar siempre el sentido original de la ruta</strong>.</p>

                <p>Además, esta modalidad tiene un pequeño reto añadido: deberás hacer <strong>4 fotografías específicas</strong> durante el trayecto. Cuando llegues a la meta en Falset, envíalas por correo a nuestro centro de verificación. Estas imágenes serán tu pasaporte para recibir un obsequio exclusivo que acreditará que has conquistado la Ruta del Silencio del Priorat.</p>

                <p><a href="${stagesUrl}">→ Ruta del Silencio 8 días</a></p>

                <p><strong>Importante:</strong> recuerda tu &ldquo;Alias&rdquo; (<strong>${alias}</strong>) y tu correo electrónico (${safeEmail}). Cuando termines la ruta larga, envíanos las fotos para poder verificar tu recorrido.</p>

                <p><a href="${certifyUrl}">→ Enviar las 4 fotos</a></p>
              `
              : `
                <h3 style="color:#7a1f2b;margin:28px 0 8px;">La escapada esencial: 3–4 días</h3>

                <p>¿Dispones de menos tiempo pero necesitas desconectar? La ruta corta es una variante perfecta de 3 o 4 días pensada para quienes quieren dedicarse un tiempo para sí mismos sin prisas.</p>

                <p>Aquí la libertad es absoluta: <strong>puedes caminarla en el sentido que prefieras</strong> y puedes adaptar las distancias a tus necesidades.</p>

                <p>Esta modalidad no requiere realizar fotografías en lugares concretos y no incluye el obsequio final de verificación.</p>

                <p><strong>Importante:</strong> recuerda tu &ldquo;Alias&rdquo; (<strong>${alias}</strong>) y tu correo electrónico (${safeEmail}).</p>
              `
          }

          <p style="margin-top:28px;">Buen camino,<br>Travessa del Priorat</p>
        </div>`
    },

    ca: {
      subject: 'Gràcies per inscriure’t a la Travessa del Priorat',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#28251d;max-width:640px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#7a1f2b;">Gràcies per inscriure’t, ${alias}</h2>

          <p>Hem rebut la teva inscripció a la Ruta del Silenci.</p>

          <p>Aquí tens la informació útil per preparar la ruta:</p>

          <ul>
            <li><a href="${routeUrl}">Veure la ruta</a></li>
            <li><a href="${walkersUrl}">Veure caminants inscrits</a></li>
            <li><a href="${inscriptionUrl}">Tornar a la inscripció</a></li>
          </ul>

          <hr style="border:none;border-top:1px solid #e3ddce;margin:24px 0;">

          <p style="font-size:12px;color:#7a1f2b;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">No eliminis aquest correu</p>

          <p>Aquesta aventura no és cap cursa contra el cronòmetre, sinó un viatge per a l’ànima. Et convidem a gaudir d’una travessa introspectiva, pas a pas, per paratges solitaris, feréstecs i profundament autèntics; paisatges dominats antigament per monjos i ermitans que n’han sabut preservar tota l’essència màgica.</p>

          <p>Per gaudir plenament de la &ldquo;Ruta del Silenci&rdquo; i fluir amb l’entorn, només et demanem que segueixis unes petites normes d’ordre, convivència i sentit comú.</p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">Preparació i llibertat de ruta</h3>

          <p>Abans de fer el primer pas, és fonamental que llegeixis la informació pràctica de la nostra web i la Guia Pràctica del Pelegrí. Recorda que <strong>tu ets l’amo del teu viatge</strong>: les etapes estan planificades amb un quilometratge recomanat, però tens total llibertat per adaptar-lo al teu ritme de caminada. Si et ve de gust aturar-te a fer nit en un poblet que no estava marcat com a final d’etapa, endavant!</p>

          <p>Això sí, t’aconsellem <strong>buscar i reservar els teus allotjaments amb antelació</strong>.</p>

          <p><a href="${guideUrl}">→ Guia de la Ruta del Silenci</a></p>

          ${
            !isCorta
              ? `
                <h3 style="color:#7a1f2b;margin:28px 0 8px;">L’experiència completa: 8–9 dies</h3>

                <p>Aquesta és l’opció d’immersió total. Tindràs entre 8 i 9 dies per completar tot el recorregut a peu. Pots organitzar les jornades com vulguis, amb dues úniques regles innegociables: <strong>complir amb els dies establerts</strong> i <strong>respectar sempre el sentit original de la ruta</strong>.</p>

                <p>A més, hauràs de fer <strong>4 fotografies específiques</strong> durant el trajecte. Quan arribis a la meta a Falset, envia-les al nostre centre de verificació.</p>

                <p><a href="${stagesUrl}">→ Ruta del Silenci 8 dies</a></p>

                <p><strong>Important:</strong> recorda el teu &ldquo;Alias&rdquo; (<strong>${alias}</strong>) i el teu correu electrònic (${safeEmail}). Quan acabis la ruta llarga, envia’ns les fotos perquè puguem verificar el teu recorregut.</p>

                <p><a href="${certifyUrl}">→ Enviar les 4 fotos</a></p>
              `
              : `
                <h3 style="color:#7a1f2b;margin:28px 0 8px;">L’escapada essencial: 3–4 dies</h3>

                <p>Disposes de menys temps però necessites desconnectar? La ruta curta és una variant perfecta de 3 o 4 dies pensada per als que volen dedicar-se un temps per a ells mateixos sense presses.</p>

                <p>Aquí la llibertat és absoluta: <strong>pots caminar-la en el sentit que prefereixis</strong> i adaptar les distàncies a les teves necessitats.</p>

                <p>Aquesta modalitat no requereix fer fotografies en llocs concrets i no inclou l’obsequi final de verificació.</p>

                <p><strong>Important:</strong> recorda el teu &ldquo;Alias&rdquo; (<strong>${alias}</strong>) i el teu correu electrònic (${safeEmail}).</p>
              `
          }

          <p style="margin-top:28px;">Bon camí,<br>Travessa del Priorat</p>
        </div>`
    },

    en: {
      subject: 'Thanks for registering for the Silence Route',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#28251d;max-width:640px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#7a1f2b;">Thanks for registering, ${alias}</h2>

          <p>We have received your registration for the Travessa del Priorat.</p>

          <p>Here are the useful links to prepare your route:</p>

          <ul>
            <li><a href="${routeUrl}">View the route</a></li>
            <li><a href="${walkersUrl}">View registered walkers</a></li>
            <li><a href="${inscriptionUrl}">Back to registration</a></li>
          </ul>

          <hr style="border:none;border-top:1px solid #e3ddce;margin:24px 0;">

          <p style="font-size:12px;color:#7a1f2b;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">Do not delete this email</p>

          <p>This adventure is not a race against the clock, but a journey for the soul. We invite you to enjoy an introspective trek, step by step, through solitary, wild and deeply authentic landscapes; places once inhabited by monks and hermits who have preserved their magical essence.</p>

          <p>To fully enjoy the Route of Silence, we only ask that you follow a few simple rules of order, coexistence and common sense.</p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">Preparation and freedom of route</h3>

          <p>Before taking the first step, it is essential that you read the practical information on our website and the Pilgrim's Practical Guide. Remember that <strong>you are the master of your journey</strong>: the stages are planned with a recommended mileage, but you have total freedom to adapt them to your walking pace.</p>

          <p>We recommend that you <strong>search for and book your accommodation in advance</strong>.</p>

          <p><a href="${guideUrl}">→ Route of Silence Guide</a></p>

          ${
            !isCorta
              ? `
                <h3 style="color:#7a1f2b;margin:28px 0 8px;">The full experience: 8–9 days</h3>

                <p>This is the full-immersion option. You will have between 8 and 9 days to complete the entire route on foot. You can organise the days as you wish, with two non-negotiable rules: <strong>stick to the established number of days</strong> and <strong>always respect the original direction of the route</strong>.</p>

                <p>You must also take <strong>4 specific photographs</strong> along the way. When you reach Falset, send them to our verification centre.</p>

                <p><a href="${stagesUrl}">→ Route of Silence – 8 days</a></p>

                <p><strong>Important:</strong> remember your &ldquo;Alias&rdquo; (<strong>${alias}</strong>) and your email address (${safeEmail}). When you finish the long route, send us the photos so we can verify your journey.</p>

                <p><a href="${certifyUrl}">→ Send the 4 photos</a></p>
              `
              : `
                <h3 style="color:#7a1f2b;margin:28px 0 8px;">The essential getaway: 3–4 days</h3>

                <p>Do you have less time but need to disconnect? The short route is a perfect 3- or 4-day option designed for those who want some time for themselves without rushing.</p>

                <p>Your freedom is absolute: <strong>you can walk it in whichever direction you prefer</strong> and adapt the distances to your needs.</p>

                <p>This option does not require photographs at specific locations and does not include the final verification gift.</p>

                <p><strong>Important:</strong> remember your &ldquo;Alias&rdquo; (<strong>${alias}</strong>) and your email address (${safeEmail}).</p>
              `
          }

          <p style="margin-top:28px;">Have a great walk,<br>Travessa del Priorat</p>
        </div>`
    }
  };

  const chosen = templates[lang] || templates.es;

  MailApp.sendEmail({
    to: email,
    subject: chosen.subject,
    htmlBody: chosen.html,
    name: 'Travessa del Priorat'
  });

  return {
    sent: true,
    messageId: Utilities.getUuid(),
    error: null
  };
}

/* -------------------------------------------------------------------------- */
/* UTILIDADES                                                                  */
/* -------------------------------------------------------------------------- */

function serializeCell_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(
      value,
      Session.getScriptTimeZone() || 'Europe/Madrid',
      'yyyy-MM-dd'
    );
  }

  return String(value == null ? '' : value);
}

function escapeHtml_(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getErrorMessage_(err) {
  if (!err) {
    return 'Error desconocido';
  }

  if (err.message) {
    return String(err.message);
  }

  return String(err);
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* -------------------------------------------------------------------------- */
/* PRUEBAS MANUALES                                                           */
/* -------------------------------------------------------------------------- */

/*
 * Ejecuta testValidation_() desde el editor de Apps Script si quieres
 * comprobar rápidamente la validación sin enviar ningún correo.
 */
function testValidation_() {
  const example = {
    alias: 'Caminante',
    email: 'test@example.com',
    origen: 'web',
    variante: 'corta',
    startDate: '2026-09-01',
    mensaje: '',
    lang: 'es',
    consent: true
  };

  const result = validateSubmission_(example);
  console.log(JSON.stringify(result, null, 2));

  if (!result.ok) {
    throw new Error('La prueba de validación ha fallado: ' + result.error);
  }

  return result;
}
