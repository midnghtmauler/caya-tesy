// Reference injector for the Caya booking confirmation email.
// Plain Node.js, no dependencies. Use it as-is, or copy the logic into your
// own backend / email service. Any template engine that understands
// {{booking.x}} (Handlebars, Mustache, Liquid, Jinja…) also works directly.
//
//   node render.js de data/booking.example.json > out.html

const fs = require('fs');
const path = require('path');

const escapeHtml = (v) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/**
 * @param {'de'|'en'} lang
 * @param {{ booking: object, settings: object }} data  shape: data/booking.example.json
 * @returns {string} ready-to-send HTML
 */
function renderBookingEmail(lang, data) {
  const file = path.join(__dirname, `booking-confirmation.${lang}.html`);
  const template = fs.readFileSync(file, 'utf8');
  const missing = new Set();

  const html = template.replace(/\{\{(booking|settings)\.(\w+)\}\}/g, (match, group, field) => {
    const value = data?.[group]?.[field];
    if (value === undefined || value === null || value === '') {
      missing.add(`${group}.${field}`);
      return match;
    }
    return escapeHtml(value);
  });

  if (missing.size) {
    throw new Error(`Missing email data: ${[...missing].join(', ')}`);
  }
  return html;
}

module.exports = { renderBookingEmail };

if (require.main === module) {
  const [lang = 'de', dataFile = path.join(__dirname, 'data/booking.example.json')] = process.argv.slice(2);

  // ▼ CONNECT YOUR DATA HERE
  // Replace this file read with your API call / database query, e.g.
  //   const data = { booking: await getBooking(id), settings: EMAIL_SETTINGS };
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

  process.stdout.write(renderBookingEmail(lang, data));
}
