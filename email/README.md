# Caya booking confirmation email

Redesign of the "Your booking is confirmed" email. The goal is that a first-time visitor can get in the door without having to think.

| File | What |
|---|---|
| `booking-confirmation.de.html` | German template (informal *du*) |
| `booking-confirmation.en.html` | English template |
| `previews/` | Phone-width renders with sample data |
| `render.js` | Reference data injector (Node, no dependencies) |
| `data/booking.example.json` | Example data payload |
| `assets/` | Logo file to host |

## Content order

1. **When:** greeting plus date and time, the biggest thing on the page.
2. **How to get in, in 2 steps.** The two steps happen at two places in order:
   - **Step 1, building entrance:** the key safe code shown large and on its own, then three short actions (take the badge, hold it to the reader, put it back).
   - **Step 2, Caya door:** the QR code sits *inside* this step, right where it's needed, on a white tile so it always scans.
3. **First time?** The video link as a button, not a bare URL.
4. **Footer:** change or cancel, contact (email and phone), address with a map link.

Choices behind this:
- One idea per block, numbered in the order things happen, with a location label ("At the building entrance" / "At the Caya door") so people know which step they're on. Step 1 names the street (Postpassage 11), and step 2 tells people to follow the signs inside, as the website does.
- Short imperative sentences, all under one line of thought.
- The emphasis (!!!, 👀) is replaced by layout: the code is the largest text in the email.
- The preheader shows date and time in the inbox. The door code is left out on purpose so it doesn't show on lock-screen notifications.
- Email-safe: table layout, inline styles, 600px max width, system fonts, `prefers-color-scheme` dark mode.

## Connecting the data (for the developer)

Each template has a **"DEVELOPER: DATA TO INJECT"** comment at the top. Every spot where a value goes has a `<!-- ▼ DATA: … -->` comment right above it, so searching for `▼ DATA` finds them all.

Values are in two groups:

**`booking.*`: different in every email, from the booking system**

| Placeholder | Type | Example | Notes |
|---|---|---|---|
| `{{booking.first_name}}` | text | `Nicolas` | |
| `{{booking.date}}` | text | `Mittwoch, 7. Oktober 2026` | Already formatted in the email's language (EN: `Wednesday, 7 October 2026`) |
| `{{booking.time_start}}` | text | `16:45` | 24-hour clock |
| `{{booking.time_end}}` | text | `19:45` | 24-hour clock |
| `{{booking.keysafe_code}}` | text | `2032` | Send as a string so leading zeros survive |
| `{{booking.qr_code_url}}` | URL | `https://…/qr/12345.png` | See QR code below |
| `{{booking.manage_url}}` | URL | `https://…/bookings/12345` | Change or cancel link |

**`settings.*`: set once per deployment**

| Placeholder | Type | Notes |
|---|---|---|
| `{{settings.logo_url}}` | URL | Hosted copy of `assets/logo-caya-boardroom@2x.png` |
| `{{settings.font_base_url}}` | URL | Folder with the licensed fonts (optional, see Fonts) |

Fixed in the template (no data needed): the video link `https://youtu.be/xrKvcYTxS9w`, the address *Postpassage 11, 4052 Basel* (links to Google Maps), and the contact details info@cayaclimb.ch and +41 78 452 83 77, all from cayaclimb.ch.

### How to inject

- **`data/booking.example.json`** is the exact shape of data the template expects.
- **`render.js`** is a working reference with no extra libraries. It fills in the template, HTML-escapes every value, and stops with an error naming any missing field. Its `▼ CONNECT YOUR DATA HERE` comment marks where your API call or database query goes.
  ```js
  const { renderBookingEmail } = require('./render.js');
  const html = renderBookingEmail('de', { booking, settings }); // 'de' or 'en'
  ```
  Try it: `node render.js de data/booking.example.json > out.html`
- The placeholders are standard `{{group.field}}` syntax, so Handlebars, Mustache, Liquid, Jinja and most email platforms (SendGrid, Postmark, Mailchimp…) can use the templates directly instead of `render.js`. HTML-escape the values either way.

### QR code

The email needs the QR as an **image URL**. Gmail blocks images embedded as `data:` URIs.
- If the booking system already gives a QR image URL, use it.
- If it only gives the code's text, render a PNG on your own server (at least 440×440px, at least 2 modules of white border) and pass its URL. Don't send the code to a third-party QR service: it opens the door.
- An inline CID attachment also works if your mail library supports it.

## Brand tokens

From **Brandbook CAYA v4** (the colour page is titled "Ina's Suggestion 1"). If the palette changes, find and replace these in both files:

| Token | Hex | Used for |
|---|---|---|
| Cream | `#FFF8F0` | page, step cards |
| Green | `#2F4A24` | booking summary band |
| Maroon | `#3D1220` | text, card outlines |
| Orange | `#FF5714` | logo, step numbers |
| Pink | `#FFD4EF` | "booked" kicker, first-visit block |
| Yellow | `#FFFA70` | key safe code |
| Lime | `#D5EF02` | button |

## Fonts

The brand book sets **Gatore** for headers and **Agrandir** for main text (letter spacing 1%). Neither is a free web font, so:

- Most email clients (Gmail, Outlook) don't load web fonts at all. They show the fallbacks: Rammetto One or Arial Black for headers, Helvetica or Arial for text.
- Apple Mail and iOS Mail will show the real fonts if the licensed `.woff2` files are hosted and `settings.font_base_url` points at them, with these files: `Gatore-Regular.woff2`, `Agrandir-Regular.woff2`, `Agrandir-Bold.woff2`. Check the font licences allow web/email use first.

## Logo

The header logo is an `<img>` that loads from `{{settings.logo_url}}`. Upload **`assets/logo-caya-boardroom@2x.png`** to a public HTTPS URL and set `settings.logo_url` to it. Gmail blocks images embedded as data URIs.

- **File:** 320×114px PNG, 2.9 KB, transparent background. It's shown at 160×57, so it stays sharp on high-resolution phone screens. The supplied original was 1393×498 and 225 KB.
- **Colour:** kept exactly as supplied, `#FF5741`. This is a bit pinker than the brand book's orange, `#FF5714`, which the step numbers use.
- **If images are blocked:** the alt text "Caya Boardroom" shows in bold logo-orange instead.

The email is fixed to light mode (`color-scheme: light only`) so the brand colours hold up. The QR code always sits on pure white.
