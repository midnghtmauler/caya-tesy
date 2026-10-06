# Caya booking confirmation email

Redesign of the "Your booking is confirmed" email. The goal is that a first-time visitor can get in the door without having to think.

| File | What |
|---|---|
| `booking-confirmation.de.html` | German template (informal *du*) |
| `booking-confirmation.en.html` | English template |
| `previews/` | Phone-width renders with sample data |

## Content order

1. **When:** greeting plus date and time, the biggest thing on the page.
2. **How to get in, in 2 steps.** The two steps happen at two places in order:
   - **Step 1, building entrance:** the key safe code shown large and on its own, then three short actions (take the badge, hold it to the reader, put it back).
   - **Step 2, Caya door:** the QR code sits *inside* this step, right where it's needed, on a white tile so it always scans.
3. **First time?** The video link as a button, not a bare URL.
4. **Footer:** change or cancel, reply for questions, address.

Choices behind this:
- One idea per block, numbered in the order things happen, with a location label ("At the building entrance" / "At the Caya door") so people know which step they're on.
- Short imperative sentences, all under one line of thought.
- The emphasis (!!!, 👀) is replaced by layout: the code is the largest text in the email.
- The preheader shows date and time in the inbox. The door code is left out on purpose so it doesn't show on lock-screen notifications.
- Email-safe: table layout, inline styles, 600px max width, system fonts, `prefers-color-scheme` dark mode.

## Placeholders

| Placeholder | Example |
|---|---|
| `{{first_name}}` | Nicolas |
| `{{date}}` | Mittwoch, 7. Oktober 2026 / Wednesday, 7 October 2026 |
| `{{time_start}}` / `{{time_end}}` | 16:45 / 19:45 |
| `{{keysafe_code}}` | 2032 |
| `{{qr_code_url}}` | URL of the booking's QR image (at least 440×440px) |
| `{{video_url}}` | https://youtu.be/xrKvcYTxS9w |
| `{{manage_booking_url}}` | link to change or cancel the booking |
| `{{address}}` | street, postcode, city |
| `{{logo_url}}` | public URL of `assets/logo-caya-boardroom@2x.png` (see Logo) |
| `{{font_base_url}}` | URL of the folder holding the brand font files (see Fonts) |

Rename these to whatever syntax your booking tool uses.

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
- Apple Mail and iOS Mail will show the real fonts if the licensed `.woff2` files are hosted and `{{font_base_url}}` points at them, with these files: `Gatore-Regular.woff2`, `Agrandir-Regular.woff2`, `Agrandir-Bold.woff2`. Check the font licences allow web/email use first.

## Logo

The header logo is an `<img>` that loads from `{{logo_url}}`. Upload **`assets/logo-caya-boardroom@2x.png`** to a public HTTPS URL and set `{{logo_url}}` to it. Gmail blocks images embedded as data URIs.

- **File:** 320×114px PNG, 2.9 KB, transparent background. It's shown at 160×57, so it stays sharp on high-resolution phone screens. The supplied original was 1393×498 and 225 KB.
- **Colour:** kept exactly as supplied, `#FF5741`. This is a bit pinker than the brand book's orange, `#FF5714`, which the step numbers use.
- **If images are blocked:** the alt text "Caya Boardroom" shows in bold logo-orange instead.

The email is fixed to light mode (`color-scheme: light only`) so the brand colours hold up. The QR code always sits on pure white.
