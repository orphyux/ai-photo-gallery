# Jennifer L. DeVries — Photo Galleries — Project Status

## Current structure

```
/index.html                         ← portfolio/base landing page (pure HTML/CSS, no JS)
/seal-cove-cover.jpg                ← cover photo used on the portfolio card
/seal-cove-auto-museum/
  ├── index.html                    ← the Seal Cove gallery (71 photos)
  ├── styles.css
  ├── og-image.jpg
  └── images/                       ← all 71 photos
```

This is live on Netlify (site name: `brass-chrome-quiet-machines`,
default URL `https://brass-chrome-quiet-machines.netlify.app`), confirmed
working. The plan now is to point your real domain,
**`www.jenniferldevries.com`** (registered at GoDaddy, no existing site),
directly at this Netlify site — the portfolio page becomes your homepage.

## Step 1: Add the domain in Netlify

1. Open your site (`brass-chrome-quiet-machines`) in the Netlify dashboard.
2. Go to **Domain management** (Site settings → Domain management, or a
   left-sidebar link depending on Netlify's current layout).
3. Click **Add a domain** → **Add a domain you already own**.
4. Enter `jenniferldevries.com`, click **Verify**, then confirm **Add
   domain** even though it says the domain is already registered elsewhere
   — that's expected, it just means GoDaddy owns the registration, not that
   anyone else is using it.
5. Also add `www.jenniferldevries.com` the same way, so both the bare
   domain and the `www` version work. Netlify lets you pick which one is
   "primary" (the other will redirect to it) — pick `www` as primary to
   match what you've been calling it.
6. Netlify will now show **Pending DNS verification** next to each domain.
   Click it — it shows the exact DNS records you need, customized for your
   site. They'll look like this:
   - For `jenniferldevries.com` (the apex/root domain): an **A record**,
     host `@`, pointing to Netlify's load balancer IP — currently
     `75.2.60.5` (double-check the exact value Netlify shows you, in case
     it's changed).
   - For `www.jenniferldevries.com`: a **CNAME record**, host `www`,
     pointing to `brass-chrome-quiet-machines.netlify.app`.

## Step 2: Set those records at GoDaddy

1. Log in to **godaddy.com**.
2. Go to **My Products** → find `jenniferldevries.com` → click **DNS** (or
   **Manage DNS**).
3. GoDaddy often ships a domain with a default "parked page" A record
   already sitting on `@` — you'll need to **edit or delete that existing A
   record** and replace it with the one Netlify gave you (host `@`, value
   `75.2.60.5`).
4. Add a new **CNAME record**: host `www`, value
   `brass-chrome-quiet-machines.netlify.app`, TTL default.
5. Save. GoDaddy sometimes has a separate "Forwarding" section too (for
   domain forwarding/parking) — make sure nothing there is still redirecting
   the domain elsewhere; turn any of that off if present.

## Step 3: Wait, then verify

- DNS changes can take anywhere from a few minutes to about 48 hours to
  fully propagate, though it's usually much faster.
- Back in Netlify, the "Pending DNS verification" status should flip to
  verified once it detects the records.
- Netlify then automatically issues a free HTTPS certificate (via Let's
  Encrypt) — this can take a little while after verification, be patient.
- Once done, `https://www.jenniferldevries.com` should load the portfolio
  page directly, and `https://www.jenniferldevries.com/seal-cove-auto-museum/`
  should load the gallery.

## Adding a new gallery later

1. Build the new gallery as its own self-contained folder (e.g.
   `/some-new-gallery/index.html` + its own `images/` folder), the same
   pattern as `seal-cove-auto-museum/`.
2. Add one new `<a class="card">` block to the top-level `index.html`
   (there's a comment marking exactly where) pointing at
   `/some-new-gallery/`.
3. Drag the whole updated site folder into Netlify's Deploys tab again.

Just ask me to build the next one and I'll follow this same pattern — same
photo processing, placard transcription, and site structure, so it matches.

## Files

Everything is packaged in **`portfolio-site.zip`** — drag its unzipped
contents into Netlify's Deploys tab (this replaces the previous deploy
with the updated URLs; content is otherwise unchanged).
