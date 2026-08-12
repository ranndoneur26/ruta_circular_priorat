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
  const guideUrl = 'https://ruta-circular-priorat.vercel.app/#guia';
  const stagesUrl = 'https://ruta-circular-priorat.vercel.app/#etapas';
  const certifyUrl = 'https://ruta-circular-priorat.vercel.app/certificar.html';

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
          <hr style="border:none;border-top:1px solid #e3ddce;margin:24px 0;">
          <p style="font-size:12px;color:#7a1f2b;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">No elimines este correo</p>
          <p>Esta aventura no es una carrera contra el cronómetro, sino un viaje para el alma. Te invitamos a disfrutar de una travesía introspectiva, paso a paso, por parajes solitarios, salvajes y profundamente auténticos; paisajes dominados antiguamente por monjes y ermitaños que han sabido preservar toda su esencia mágica.</p>
          <p>Para disfrutar plenamente de la &ldquo;Ruta del Silencio&rdquo; y fluir con el entorno, solo te pedimos que sigas unas pequeñas normas de orden, convivencia y sentido común, tal como hacían los antiguos habitantes de estas tierras.</p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">Preparación y libertad de ruta</h3>
          <p>Antes de dar el primer paso, es fundamental que leas la información práctica de nuestra web y la Guía Práctica del Peregrino. Recuerda que <strong>tú eres el dueño de tu viaje</strong>: las etapas están planificadas con un kilometraje recomendado, pero tienes total libertad para adaptarlo a tu ritmo de caminata. Si te apetece detenerte a pasar la noche en un pueblecito que no estaba marcado como final de etapa, ¡adelante!</p>
          <p>Eso sí, te aconsejamos <strong>buscar y reservar tus alojamientos con antelación</strong>. En nuestra web encontrarás algunas recomendaciones, pero te animamos a hacer tu propia búsqueda para diseñar la aventura a tu medida.</p>
          <p><a href="${guideUrl}">→ Guía de la Ruta del Silencio</a></p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">La experiencia completa: 8–9 días</h3>
          <p>Si quieres vivir la inmersión total, esta es tu opción. Tendrás entre 8 y 9 días para completar todo el recorrido a pie. Puedes organizar las jornadas como quieras, con dos únicas reglas innegociables: <strong>cumplir con los días establecidos</strong> y <strong>respetar siempre el sentido original de la ruta</strong>.</p>
          <p>Además, esta modalidad tiene un pequeño reto añadido: deberás hacer <strong>4 fotografías específicas</strong> durante el trayecto. Cuando llegues a la meta en Falset, envíalas por correo a nuestro centro de verificación. Estas imágenes serán tu pasaporte para recibir un obsequio exclusivo que acreditará que has conquistado la Ruta del Silencio del Priorat.</p>
          <p><a href="${stagesUrl}">→ Ruta del Silencio 8 días</a></p>
          <p><strong>Importante:</strong> recuerda tu &ldquo;Alias&rdquo; (<strong>${alias}</strong>) y tu correo electrónico (${email}) y, cuando termines la ruta de 8 días, envíanos las fotos.</p>
          <p><a href="${certifyUrl}">→ Enviar las 4 fotos</a></p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">La escapada esencial: 3–4 días</h3>
          <p>¿Dispones de menos tiempo pero necesitas desconectar? La ruta corta es una variante perfecta de 3 o 4 días pensada para quienes quieren dedicarse un tiempo para sí mismos sin prisas. Igual que en la versión larga, puedes adaptar las distancias a tus necesidades, pero aquí la libertad es absoluta: <strong>puedes caminarla en el sentido que prefieras</strong> y no hace falta preocuparse por hacer fotos en lugares concretos.</p>
          <p>Aunque esta opción no incluye el obsequio final de verificación, te garantizará una experiencia igualmente inolvidable y te permitirá disfrutar de toda la paz del entorno en cada paso.</p>

          <p style="margin-top:28px;">Buen camino,<br>Travessa del Priorat</p>
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
          <hr style="border:none;border-top:1px solid #e3ddce;margin:24px 0;">
          <p style="font-size:12px;color:#7a1f2b;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">No eliminis aquest correu</p>
          <p>Aquesta aventura no és cap cursa contra el cronòmetre, sinó un viatge per a l'ànima. Et convidem a gaudir d'una travessa introspectiva, pas a pas, per paratges solitaris, feréstecs i profundament autèntics; paisatges dominats antigament per monjos i ermitans que n'han sabut preservar tota l'essència màgica.</p>
          <p>Per gaudir plenament de la &ldquo;Ruta del Silenci&rdquo; i fluir amb l'entorn, només et demanem que segueixis unes petites normes d'ordre, convivència i sentit comú, tal com feien els antics estadants d'aquestes terres.</p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">Preparació i llibertat de ruta</h3>
          <p>Abans de fer el primer pas, és fonamental que llegeixis la informació pràctica de la nostra web i la Guia Pràctica del Pelegrí. Recorda que <strong>tu ets l'amo del teu viatge</strong>: les etapes estan planificades amb un quilometratge recomanat, però tens total llibertat per adaptar-lo al teu ritme de caminada. Si et ve de gust aturar-te a fer nit en un poblet que no estava marcat com a final d'etapa, endavant!</p>
          <p>Això sí, t'aconsellem <strong>buscar i reservar els teus allotjaments amb antelació</strong>. A la nostra web hi trobaràs algunes recomanacions, però t'animem a fer la teva pròpia recerca per dissenyar l'aventura a la teva mida.</p>
          <p><a href="${guideUrl}">→ Guia de la Ruta del Silenci</a></p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">L'experiència completa: 8-9 dies</h3>
          <p>Si vols viure la immersió total, aquesta és la teva opció. Tindràs entre 8 i 9 dies per completar tot el recorregut a peu. Pots modelar les jornades com vulguis, amb dues úniques regles innegociables: <strong>complir amb els dies establerts</strong> i <strong>respectar sempre el sentit original de la ruta</strong>.</p>
          <p>A més, aquesta modalitat té un petit repte afegit: hauràs de fer <strong>4 fotografies específiques</strong> durant el trajecte. Quan arribis a la meta a Falset, envia-les per correu al nostre centre de verificació. Aquestes imatges seran el teu passaport per rebre un obsequi exclusiu que acreditarà que has conquerit la Ruta del Silenci del Priorat!</p>
          <p><a href="${stagesUrl}">→ Ruta del Silenci 8 dies</a></p>
          <p><strong>Important:</strong> recorda el teu &ldquo;Alias&rdquo; (<strong>${alias}</strong>) i el teu correu electrònic (${email}) i, quan acabis la ruta de 8 dies, envia'ns les fotos.</p>
          <p><a href="${certifyUrl}">→ Enviar les 4 fotos</a></p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">L'escapada essencial: 3-4 dies</h3>
          <p>Disposes de menys temps però necessites desconnectar? La ruta curta és una variant perfecta de 3 o 4 dies pensada per als que volen dedicar-se un temps per a ells mateixos sense presses. Igual que en la versió llarga, pots adaptar les distàncies a les teves necessitats, però aquí la llibertat és absoluta: <strong>pots caminar-la en el sentit que prefereixis</strong> i no cal patir per fer fotos a llocs concrets.</p>
          <p>Tot i que aquesta opció no inclou l'obsequi final de verificació, et garantirà una experiència igualment inoblidable i et permetrà gaudir de tota la pau de l'entorn a cada passa.</p>

          <p style="margin-top:28px;">Bon camí,<br>Travessa del Priorat</p>
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
          <hr style="border:none;border-top:1px solid #e3ddce;margin:24px 0;">
          <p style="font-size:12px;color:#7a1f2b;font-weight:bold;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 20px;">Do not delete this email</p>
          <p>This adventure is not a race against the clock, but a journey for the soul. We invite you to enjoy an introspective trek, step by step, through solitary, wild and deeply authentic landscapes; places once inhabited by monks and hermits who have managed to preserve all their magical essence.</p>
          <p>To fully enjoy the &ldquo;Route of Silence&rdquo; and flow with the surroundings, we only ask that you follow a few simple rules of order, coexistence and common sense, just as the former dwellers of these lands did.</p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">Preparation and freedom of route</h3>
          <p>Before taking the first step, it is essential that you read the practical information on our website and the Pilgrim's Practical Guide. Remember that <strong>you are the master of your journey</strong>: the stages are planned with a recommended mileage, but you have total freedom to adapt it to your walking pace. If you feel like stopping to spend the night in a small village that was not marked as a stage finish, go ahead!</p>
          <p>However, we recommend that you <strong>search for and book your accommodation in advance</strong>. On our website you will find some suggestions, but we encourage you to do your own research to design an adventure tailored to you.</p>
          <p><a href="${guideUrl}">→ Route of Silence Guide</a></p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">The full experience: 8–9 days</h3>
          <p>If you want to experience total immersion, this is your option. You will have between 8 and 9 days to complete the entire route on foot. You can organise the days as you wish, with two non-negotiable rules: <strong>stick to the established number of days</strong> and <strong>always respect the original direction of the route</strong>.</p>
          <p>In addition, this option includes a small extra challenge: you must take <strong>4 specific photographs</strong> along the way. When you reach the finish line in Falset, send them by email to our verification centre. These images will be your passport to receive an exclusive gift that certifies that you have conquered the Route of Silence of the Priorat.</p>
          <p><a href="${stagesUrl}">→ Route of Silence – 8 days</a></p>
          <p><strong>Important:</strong> remember your &ldquo;Alias&rdquo; (<strong>${alias}</strong>) and your email address (${email}) and, when you finish the 8-day route, send us the photos.</p>
          <p><a href="${certifyUrl}">→ Send the 4 photos</a></p>

          <h3 style="color:#7a1f2b;margin:28px 0 8px;">The essential getaway: 3–4 days</h3>
          <p>Do you have less time but need to disconnect? The short route is a perfect 3- or 4-day variant designed for those who want to devote some time to themselves without rushing. As in the long version, you can adapt the distances to your needs, but here your freedom is absolute: <strong>you can walk it in whichever direction you prefer</strong> and you don't need to worry about taking photos at specific spots.</p>
          <p>Although this option does not include the final verification gift, it will still guarantee you an unforgettable experience and allow you to enjoy all the peace of the surroundings with every step.</p>

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
