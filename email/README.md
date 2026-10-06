# Caya booking confirmation email

Redesign of the "Your booking is confirmed" email. The goal is that a first-time visitor can get in the door without having to think.

| File | What |
|---|---|
| `booking-confirmation.de.html` | German template (informal *du*) |
| `booking-confirmation.en.html` | English template |
| `previews/` | Phone-width renders, light + dark mode |

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

## Brand tokens (to confirm)

cayaclimb.ch couldn't be reached while this was built, so the colours are neutral placeholders. Find and replace them in both files:

| Token | Hex |
|---|---|
| Ink (text, button) | `#141414` |
| Accent (step numbers) | `#FF5A1F` |
| Page background | `#F3F1ED` |
| Muted text | `#6B6B6B` |

The "CAYA" text in the header can be swapped for a hosted logo `<img>` (PNG, about 120px wide, with `alt="Caya"`).
