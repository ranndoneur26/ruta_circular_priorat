const SHEET_NAME = 'inscripciones';
const ALLOWED_ORIGINS = [
  'https://ruta-circular-priorat.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:5500'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    if (data.action !== 'add') return jsonResponse({ ok: false, error: 'Invalid action' });

    if (!isValidSubmission(data)) {
      return jsonResponse({ ok: false, error: 'Validation failed' });
    }

    const sheet = getSheet_();
    const submittedAt = new Date();
    sheet.appendRow([
      submittedAt,
      data.alias || '',
      data.email || '',
      data.origen || '',
      data.variante || '',
      data.startDate || '',
      data.mensaje || '',
      data.lang || 'es',
      data.pageUrl || '',
      data.userAgent || ''
    ]);

    const mailResult = sendThankYouEmail_(data);

    return jsonResponse({
      ok: true,
      emailSent: !!mailResult.sent,
      messageId: mailResult.messageId || null
    });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'travessa-priorat-inscripcions' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'submittedAt',
      'alias',
      'email',
      'origen',
      'variante',
      'startDate',
      'mensaje',
      'lang',
      'pageUrl',
      'userAgent'
    ]);
  }
  return sheet;
}

function isValidSubmission(data) {
  const alias = String(data.alias || '').trim();
  const email = String(data.email || '').trim();
  const origen = String(data.origen || '').trim();
  const variante = String(data.variante || '').trim();
  const startDate = String(data.startDate || '').trim();
  const consent = data.consent === true || data.consent === 'true';
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const lang = ['es', 'ca', 'en'].indexOf(String(data.lang || '').toLowerCase()) !== -1;
  return alias.length >= 2 && alias.length <= 30 && emailOk && !!origen && !!variante && !!startDate && consent && lang;
}

function sendThankYouEmail_(data) {
  const lang = String(data.lang || 'es').toLowerCase();
  const alias = escapeHtml_(String(data.alias || '').trim());
  const email = String(data.email || '').trim();
  const routeUrl = 'https://ruta-circular-priorat.vercel.app/travessa-priorat.html';
  const walkersUrl = 'https://ruta-circular-priorat.vercel.app/finalizados.html';
  const inscriptionUrl = 'https://ruta-circular-priorat.vercel.app/inscripcion.html';

  const templates = {
    es: {
      subject: 'Gracias por inscribirte en la Travessa del Priorat',
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
          <p>Aquí puedes pegar tu texto completo de agradecimiento en español, con los enlaces y el tono que ya tengas preparados.</p>
          <p>Buen camino,<br>Travessa del Priorat</p>
        </div>`
    },
    ca: {
      subject: 'Gràcies per inscriure’t a la Travessa del Priorat',
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#28251d;max-width:640px;margin:0 auto;padding:24px;">
          <h2 style="margin:0 0 16px;color:#7a1f2b;">Gràcies per inscriure’t, ${alias}</h2>
          <p>Hem rebut la teva inscripció a la Travessa del Priorat.</p>
          <p>Aquí tens la informació útil per preparar la ruta:</p>
          <ul>
            <li><a href="${routeUrl}">Veure la ruta</a></li>
            <li><a href="${walkersUrl}">Veure caminants inscrits</a></li>
            <li><a href="${inscriptionUrl}">Tornar a la inscripció</a></li>
          </ul>
          <p>Aquí pots enganxar el teu text complet d’agraïment en català, amb els enllaços i el to que ja tinguis preparats.</p>
          <p>Bon camí,<br>Travessa del Priorat</p>
        </div>`
    },
    en: {
      subject: 'Thanks for registering for the Travessa del Priorat',
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
          <p>You can paste here your full thank-you message in English, with the links and wording you want to send.</p>
          <p>Have a great walk,<br>Travessa del Priorat</p>
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
  return { sent: true, messageId: Utilities.getUuid() };
}

function escapeHtml_(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}