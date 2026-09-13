# Tools

Small command-line scripts for maintaining the photo galleries after
they're built and deployed. These edit local files only — you (or Claude,
in a session with access to your repo's files) still need to commit/push
or upload the changed files to GitHub afterward for the change to go live.

## remove-photo.js

Removes one or more photos from a gallery's `index.html`.

**Requires Node.js** to run yourself. If you don't have Node installed and
don't want to, you can also just ask Claude to run this for you in a
conversation — hand it the gallery's `index.html` and the photo ID(s) to
remove, and it can run this script (or do the equivalent edit) and hand
back the updated file, the same as before this tool existed. This script
mainly exists so that edit is fast and consistent rather than being
hand-rolled differently each time.

### Usage

```
node remove-photo.js <path-to-gallery-index.html> <photo-id> [more-ids...] [--delete-image] [--dry-run]
```

### Finding a photo's ID

The "id" is usually the original source filename without its extension —
e.g. a photo saved as `images/IMG_1607.jpg` has the id `IMG_1607`. If
you're not sure, open the gallery's `index.html` in a text editor and
search for the photo's title (e.g. "Comparing the Electrics") — the `"id"`
field is right next to it in the same object.

### Examples

Remove one photo:
```
node remove-photo.js seal-cove-auto-museum/index.html IMG_1607
```

Remove several at once:
```
node remove-photo.js seal-cove-auto-museum/index.html IMG_1607 IMG_1610
```

Also delete the image file itself (not just remove it from the gallery
data — by default the file is left in place, harmless but unused):
```
node remove-photo.js seal-cove-auto-museum/index.html IMG_1607 --delete-image
```

Preview what would happen without changing anything:
```
node remove-photo.js seal-cove-auto-museum/index.html IMG_1607 --dry-run
```

### What it does NOT do

- Doesn't touch the portfolio landing page, even if the removed photo was
  used as that gallery's cover image there — update that separately if so.
- Doesn't commit, push, or upload anything anywhere. Purely a local file
  edit — you still need to get the changed file(s) into your GitHub repo
  (see the main project status doc for that workflow).
