# Hue & Cry: the coming-soon site

A static site with no build step. Upload this folder as it is to any static host
(Netlify, Cloudflare Pages, GitHub Pages, Vercel) and point the domain at it.

| Address | Page |
|---|---|
| `/` | **The Court Roll** (main page) |
| `/psalter/` | The Psalter Page |
| `/night-watch/` | The Night Watch |
| any missing page | `404.html`, "Non est inventus" |

Every page links to the other two in its footer ("The same news in other hands").

## Before it goes live

1. **Mailing list.** Open `assets/signup.js` and set `SIGNUP_ENDPOINT` to your list
   service's form endpoint (Formspree, Buttondown, etc.). The field name is `email`.
   Until that's done, the form says sign-up isn't open yet and collects nothing.
2. **Domain in the share preview.** The `og:image` line in each page points to
   `https://hueandcrygame.com/assets/archers.jpg`. Change it if the site lives on a
   different domain.
3. **Swapping the main page.** To make another design the front page, swap the files:
   for example, move `index.html` to `court-roll/index.html` and change its
   `assets/` paths to `../assets/` and its footer links. Then move
   `psalter/index.html` to the top and change its `../` paths the other way.

## Publishing on GitHub Pages

The game repo (`Dithilli/hue-and-cry`) is private, and Pages on a private repo needs
a paid plan. You also wouldn't want the game public. So the site goes in its own
small **public** repo, for example `Dithilli/hueandcrygame.com`. This folder stays
the master copy, and one command sends it there:

    git subtree push --prefix site pages main

Here `pages` is a git remote pointing at the public repo. Then go to that repo's
Settings › Pages and set Source to "Deploy from a branch", `main`, `/ (root)`.
`CNAME` already names the domain, and `.nojekyll` tells GitHub to serve the files
as they are.

**DNS at Cloudflare** for hueandcrygame.com. Set every record to "DNS only" (grey
cloud), or GitHub can't issue the HTTPS certificate:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 (and 8001, 8002, 8003) |
| CNAME | www | dithilli.github.io |

Once the certificate appears, tick "Enforce HTTPS" in Settings › Pages. Also verify
the domain under your GitHub profile (Settings › Pages › Add a domain, which uses a
TXT record) so nobody else can claim it.

**The other domains.** hueandcry.uk and hutesium.com should redirect to
hueandcrygame.com. Set this up with a Cloudflare Redirect Rule (301) on each. A
redirect rule needs a *proxied* (orange-cloud) record to act on, so add a
placeholder `A @ 192.0.2.1`. GitHub Pages serves only one custom domain per repo.

## Preview locally

    cd site && python3 -m http.server 8000

Then open http://localhost:8000. Folder links like `psalter/` need a server.
Opening the files directly from disk won't follow them.

## What's in it

- Images (`assets/`): Luttrell Psalter, British Library Add MS 42130, c. 1325–40.
  All are public domain and copied from Wikimedia Commons:
  - `archers.jpg`: archery at the butts, f. 147v.
  - `grotesque.png`: a marginal beast, f. 27r.
  - `sheepfold.jpg`: the sheepfold, f. 163v.
- Fonts come from Google Fonts: EB Garamond, IM Fell English, Grenze Gotisch,
  Cormorant Garamond and Spectral. All are under the SIL Open Font License.
- The designs came from Claude Design (three directions, 18 October 2026). The
  Librarian converted them to plain HTML and corrected the history:
  - The Folvilles were active in the 1320s *and* 30s.
  - The duty to follow the hue is cited to the Statute of Winchester rather than
    "since 1285". The duty is older than the statute.
  - The roll's felons are no longer "unknown", since unknown men can't be pardoned.
    The pardon is now *habuerunt cartam de perdonacione*.
  - "Compline has rung" became "The fires are covered" (curfew).
  - "Coram rege" was dropped from the roll's heading.
  - The roll's footer says its entries are invented, in the manner of the plea rolls.
