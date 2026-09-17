/**
 * Solmae waitlist + Founding 50 → Google Sheet
 *
 * How to use (Jen / Lauren / John):
 * 1. Create a Google Sheet. Share it with the people who should see signups.
 * 2. Name the first tab "Waitlist". Header row: Timestamp | Email | Source
 * 3. Optional second tab "Founding 50". Header row:
 *    Timestamp | Email | Name | What you know | What you want to know | Source
 * 4. Extensions → Apps Script. Delete the stub and paste this entire file.
 * 5. Optional secret: Project Settings (gear) → Script properties →
 *    Add WEBHOOK_SECRET = the same value you put in Vercel as WAITLIST_SHEET_WEBHOOK_SECRET.
 * 6. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone  (the Vercel server posts here; treat the URL as a secret)
 * 7. Copy the Web app URL into Vercel as WAITLIST_SHEET_WEBHOOK_URL.
 *
 * The Next.js app POSTs JSON: { email, source, createdAt, kind?, secret?, name?, ... }
 * Duplicate emails (case-insensitive) are not appended again.
 *
 * If you moved this script off the Sheet (standalone project), paste the Sheet ID below.
 */
var SPREADSHEET_ID = "";

var WAITLIST_SHEET_NAME = "Waitlist";
var FOUNDING_SHEET_NAME = "Founding 50";

var WAITLIST_HEADERS = ["Timestamp", "Email", "Source"];
var FOUNDING_HEADERS = [
  "Timestamp",
  "Email",
  "Name",
  "What you know",
  "What you want to know",
  "Source",
];

function doGet() {
  return jsonResponse({ ok: true, service: "solmae-waitlist-sheet" });
}

function doPost(e) {
  try {
    var payload = parsePayload(e);
    if (!isAuthorized(payload)) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    var email = normalizeEmail(payload.email);
    if (!email) {
      return jsonResponse({ ok: false, error: "Missing email" });
    }

    var kind = payload.kind === "founding-50" ? "founding-50" : "waitlist";
    var sheet = getOrCreateSheet(kind);
    var headers = kind === "founding-50" ? FOUNDING_HEADERS : WAITLIST_HEADERS;
    ensureHeaders(sheet, headers);

    if (findEmailRow(sheet, email) !== -1) {
      return jsonResponse({ ok: true, duplicate: true });
    }

    var createdAt = payload.createdAt || new Date().toISOString();
    var source = payload.source || (kind === "founding-50" ? "founding-50" : "landing");

    if (kind === "founding-50") {
      sheet.appendRow([
        createdAt,
        email,
        payload.name || "",
        payload.whatYouKnow || "",
        payload.whatYouWantToKnow || "",
        source,
      ]);
    } else {
      sheet.appendRow([createdAt, email, source]);
    }

    return jsonResponse({ ok: true, duplicate: false });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function parsePayload(e) {
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }
  return {};
}

function isAuthorized(payload) {
  var expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
  if (!expected) return true;
  return payload && payload.secret === expected;
}

function normalizeEmail(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getSpreadsheet() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error("Open this script from the Google Sheet, or set SPREADSHEET_ID.");
  }
  return active;
}

function getOrCreateSheet(kind) {
  var spreadsheet = getSpreadsheet();
  var name = kind === "founding-50" ? FOUNDING_SHEET_NAME : WAITLIST_SHEET_NAME;
  var sheet = spreadsheet.getSheetByName(name);
  if (sheet) return sheet;

  if (kind === "waitlist") {
    var first = spreadsheet.getSheets()[0];
    if (first && first.getLastRow() === 0) {
      first.setName(WAITLIST_SHEET_NAME);
      return first;
    }
  }

  return spreadsheet.insertSheet(name);
}

function ensureHeaders(sheet, headers) {
  var existing = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  var empty = existing.every(function (cell) {
    return String(cell).trim() === "";
  });
  if (empty) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function findEmailRow(sheet, email) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  var values = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (normalizeEmail(values[i][0]) === email) return i + 2;
  }
  return -1;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
