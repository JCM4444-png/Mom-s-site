# DB Cattery website

The website lives in `site/`. Upload that folder to publish it. `Media/` holds the original photos and videos and isn't part of the site.

## Where things are

| What | Where |
|---|---|
| Name, Facebook link, email | `site/assets/js/site.js` (the `SITE` block at the top) |
| Menu links | `site/assets/js/site.js` (the `NAV` list) |
| Colors and fonts | `site/assets/css/site.css` (the `:root` block at the top) |
| Logo | `site/assets/img/logo.svg`, `favicon.svg`, and the `MARK` drawing in `site.js` |
| Cat pages | `site/cats/opal.html`, `iris.html`, `roxy.html` |
| Blog posts | `site/blog/` (list of posts in `blog/index.html`) |
| Web-sized photos and videos | `site/assets/img/cats/`, `site/assets/video/` |

## Placeholders to replace

- Email `hello@example.com` (in `site.js`)
- Facebook link (empty in `site.js`; the button shows "coming soon" until it's filled in)
- Registration and health testing on each cat page ("Coming soon")
- Example kitten photos on `kittens.html` (from Wikimedia Commons)
- The name "DB Cattery" also appears in each page's `<title>`

## Preview locally

```
python -m http.server 8765 --directory site
```

Then open http://localhost:8765.
