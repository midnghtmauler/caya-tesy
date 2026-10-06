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
   - **Step 2, Caya door:** the QR code sits *inside* this step, right where it's needed, on a white tile so it still scans in dark mode.
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

Rename these to whatever syntax your booking tool uses.

## Brand tokens

Taken from cayaclimb.ch. Find and replace them in both files if they change:

| Token | Hex | Used for |
|---|---|---|
| Cream | `#FDF6F0` | page, step cards |
| Forest green | `#384A2B` | booking summary band |
| Maroon | `#3A1424` | text, card outlines |
| Coral | `#EE6A45` | logo, step numbers |
| Pink | `#F6D3EE` | "booked" kicker, first-visit block |
| Lime | `#DCEB4B` | key safe code, button |

The display font is **Rammetto One**, the closest Google Font to the site's headings. It loads in Apple Mail and iOS Mail. Gmail and Outlook fall back to Arial Black. Swap in the real font name if it's known.

The logo is set as text in the display font. For an exact match in every client, replace it with a hosted PNG of the wordmark (about 240px wide, shown at 120px, `alt="Caya Boardroom"`).

The email is fixed to light mode (`color-scheme: light only`) so the brand colours hold up. The QR code always sits on pure white.
