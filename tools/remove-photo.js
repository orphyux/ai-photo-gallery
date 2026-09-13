#!/usr/bin/env node
/**
 * remove-photo.js — remove one or more photos from a gallery built with
 * the photo-gallery-builder pattern (a single index.html containing a
 * GALLERY_DATA array of photo objects).
 *
 * USAGE
 *   node remove-photo.js <path-to-gallery-index.html> <photo-id> [more-ids...]
 *
 * OPTIONS
 *   --delete-image     Also delete the corresponding image file(s) from
 *                       disk (resolved relative to the gallery's folder).
 *                       Off by default — removing a photo from the data
 *                       array is enough to make it disappear from the
 *                       site; the leftover image file is harmless.
 *   --dry-run          Show what would be removed without writing
 *                       anything or deleting any files.
 *
 * EXAMPLES
 *   node remove-photo.js seal-cove-auto-museum/index.html IMG_1607
 *   node remove-photo.js seal-cove-auto-museum/index.html IMG_1607 IMG_1610 --delete-image
 *   node remove-photo.js seal-cove-auto-museum/index.html IMG_1607 --dry-run
 *
 * WHAT IT DOES
 *   1. Reads the gallery's index.html.
 *   2. Finds the `const GALLERY_DATA = [...]` array (works whether it's
 *      pretty-printed or minified onto one line).
 *   3. Parses it as JSON, removes every object whose "id" matches one of
 *      the given photo IDs, and reports which ones were actually found.
 *   4. Writes the file back with the array re-serialized (compact, single
 *      line, matching how the build pipeline originally emits it).
 *   5. Optionally deletes the matching image file(s) on disk.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 *   - It does not touch any other photo's hotspots or "placard" data, even
 *     if they referenced the removed photo's placard via a shared
 *     sign_title — that's a display-time concern, not a data-integrity one,
 *     since each photo's placard is a full copy, not a live reference, by
 *     the time it's in the final GALLERY_DATA (see
 *     references/technical-build-notes.md, "Placard/data cross-references"
 *     — cross-references are resolved once at build time, before this
 *     point).
 *   - It does not touch the portfolio landing page. If the removed photo
 *     was used as a gallery's cover image there, update that separately.
 *   - It does not commit or push anything — this only edits local files.
 *     Commit and push (or upload via GitHub's web UI) the changed file(s)
 *     yourself afterward.
 */

const fs = require('fs');
const path = require('path');

function fail(msg) {
  console.error('Error: ' + msg);
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error(
    'Usage: node remove-photo.js <path-to-gallery-index.html> <photo-id> [more-ids...] [--delete-image] [--dry-run]'
  );
  process.exit(1);
}

const deleteImage = args.includes('--delete-image');
const dryRun = args.includes('--dry-run');
const positional = args.filter((a) => !a.startsWith('--'));
const [htmlPath, ...idsToRemove] = positional;

if (idsToRemove.length === 0) {
  fail('No photo IDs given.');
}

if (!fs.existsSync(htmlPath)) {
  fail(`File not found: ${htmlPath}`);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Find `const GALLERY_DATA = [ ... ];` by locating the opening bracket and
// then tracking bracket depth to find its true matching close — safe even
// though the array contains nested [] for hotspots and lines arrays.
const marker = 'const GALLERY_DATA = [';
const markerIdx = html.indexOf(marker);
if (markerIdx === -1) {
  fail('Could not find "const GALLERY_DATA = [" in this file. Is this a photo-gallery-builder gallery?');
}
const arrayStart = markerIdx + marker.length - 1; // position of the '['

let depth = 0;
let arrayEnd = -1;
let inString = false;
let stringChar = null;
for (let i = arrayStart; i < html.length; i++) {
  const c = html[i];
  const prev = html[i - 1];
  if (inString) {
    if (c === stringChar && prev !== '\\') inString = false;
    continue;
  }
  if (c === '"' || c === "'") {
    inString = true;
    stringChar = c;
    continue;
  }
  if (c === '[') depth++;
  else if (c === ']') {
    depth--;
    if (depth === 0) {
      arrayEnd = i + 1;
      break;
    }
  }
}
if (arrayEnd === -1) {
  fail('Could not find the matching closing bracket for GALLERY_DATA — the file may be malformed.');
}

const arrayStr = html.slice(arrayStart, arrayEnd);

let data;
try {
  data = JSON.parse(arrayStr);
} catch (e) {
  fail('GALLERY_DATA did not parse as valid JSON: ' + e.message);
}

const idSet = new Set(idsToRemove);
const found = [];
const notFound = new Set(idsToRemove);
const kept = [];

for (const item of data) {
  if (idSet.has(item.id)) {
    found.push(item);
    notFound.delete(item.id);
  } else {
    kept.push(item);
  }
}

if (found.length === 0) {
  fail(
    `None of the given photo ID(s) were found in this gallery: ${idsToRemove.join(', ')}\n` +
      `(Check the "id" field in the gallery's data — it's usually the source filename without extension, e.g. IMG_1607.)`
  );
}

console.log(`Found ${found.length} of ${idsToRemove.length} requested photo(s):`);
for (const item of found) {
  console.log(`  - ${item.id}  "${item.title}"  (${item.data})`);
}
if (notFound.size > 0) {
  console.log(`\nNot found (skipped, no error): ${Array.from(notFound).join(', ')}`);
}

if (dryRun) {
  console.log('\n--dry-run set: no files were changed.');
  process.exit(0);
}

// Re-serialize compactly, same style the build pipeline originally emits.
const newArrayStr = JSON.stringify(kept);
const newHtml = html.slice(0, arrayStart) + newArrayStr + html.slice(arrayEnd);
fs.writeFileSync(htmlPath, newHtml);
console.log(`\nUpdated ${htmlPath}: ${data.length} -> ${kept.length} photos.`);

if (deleteImage) {
  const galleryDir = path.dirname(htmlPath);
  for (const item of found) {
    if (!item.data) continue;
    const imgPath = path.join(galleryDir, item.data);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
      console.log(`Deleted image file: ${imgPath}`);
    } else {
      console.log(`Image file not found on disk (already gone?): ${imgPath}`);
    }
  }
}

console.log(
  '\nDone. Remember: this only changed local files — upload/commit the ' +
    'changed index.html (and any deleted image, if using --delete-image) ' +
    'to your GitHub repo to actually publish the change.'
);
