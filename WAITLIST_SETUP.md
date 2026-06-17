# Mobile waitlist setup

The hero on the marketing homepage ([`index.html`](index.html)) has a "Join
mobile waitlist" button that opens a two-step modal. Each signup is POSTed to a
**Google Apps Script Web App** that appends a row to a **Google Sheet**. You can
later export that sheet into Mailchimp (or email directly) when the iOS and
Android apps launch.

No backend server is required — the script URL is the only thing the page needs,
and it exposes no secrets.

## What gets collected

| Column | Source |
| --- | --- |
| Timestamp | submission time (ISO) |
| Email | required |
| Platform | `ios` / `android` / `both` / `unspecified` (optional) |
| Feedback | free text, optional |
| Locale | active site language (e.g. `en`, `zh`) |
| Source | `hero-modal` |
| Page URL | page the user submitted from |
| User Agent | browser/device string |

## 1. Create the Google Sheet

1. Create a new Google Sheet (e.g. "DeepValues — Mobile Waitlist").
2. Optionally rename the first tab to `Waitlist`. The script falls back to the
   first tab and writes a header row automatically on the first submission.

## 2. Add the Apps Script

In the sheet, open **Extensions → Apps Script**, delete the placeholder, paste
the code below, and **Save**.

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Waitlist') || ss.getSheets()[0];

    var data = {};
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter || {};
    }

    // Write a header row on first use.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Email', 'Platform', 'Feedback',
        'Locale', 'Source', 'Page URL', 'User Agent'
      ]);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.email || '',
      data.platform || '',
      data.feedback || '',
      data.locale || '',
      data.source || '',
      data.pageUrl || '',
      data.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Select type **Web app**.
3. **Execute as:** Me.
4. **Who has access:** Anyone.
5. Click **Deploy**, then authorize the script when prompted.
6. Copy the **Web app URL** — it ends in `/exec`.

> If you later change the script, use **Deploy → Manage deployments → Edit** and
> bump the version, or the live URL keeps running the old code.

## 4. Point the page at it

Open [`index.html`](index.html), find the waitlist script near the bottom, and
paste your URL into the `WAITLIST_ENDPOINT` constant:

```javascript
// ===== Mobile waitlist modal =====
(function () {
  var WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/XXXXXXXX/exec';
  ...
```

The URL is not a secret (the endpoint only accepts new signups), so committing it
is fine. Until it's set, the modal shows an error and logs a clear message to the
browser console instead of silently failing.

## 5. Test

Run the site (`npm run dev`), open the homepage, click **Join mobile waitlist**,
submit, and confirm a new row appears in the sheet.

## Notes

- **CORS:** Apps Script Web Apps don't return CORS headers, so the page POSTs
  with `mode: 'no-cors'`. The response is opaque, so the UI treats a completed
  request as success — server-side validation errors won't surface in the
  browser. The sheet is the source of truth.
- **De-duplication:** signups are appended as-is. To dedupe before a launch
  blast, sort by email in the sheet or use `Data → Data cleanup → Remove
  duplicates`.
- **Launch day → Mailchimp:** export the sheet as CSV and import it as a
  Mailchimp audience, or filter by the Platform column to message iOS and
  Android users separately.
- **Translations:** UI strings live in `public/locales/*.json` under the
  `waitlist.*` keys. English (`en.json`) and Chinese (`zh.json`) are filled in;
  the other 10 locales automatically fall back to English until translated.
```
