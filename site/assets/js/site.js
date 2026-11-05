/* DB Cattery: shared header, footer and photo viewer for every page.
   Change the name, Facebook link or contact details here and every page updates. */

const SITE = {
  name: "DB Cattery",
  tagline: "Maine Coons in Daytona Beach",
  // Paste the Facebook page address between the quotes when it's ready.
  facebookUrl: "",
  email: "hello@example.com", // placeholder: replace with the real address
  location: "Daytona Beach, Florida",
};

const NAV = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  {
    href: "cats/index.html", label: "Our cats",
    children: [
      { href: "cats/opal.html", label: "Opal" },
      { href: "cats/iris.html", label: "Iris" },
      { href: "cats/roxy.html", label: "Roxy" },
    ],
  },
  { href: "kittens.html", label: "Kittens" },
  { href: "blog/index.html", label: "Blog" },
];

// Pages in sub-folders set data-root="../" on <body> so links still resolve.
const ROOT = document.body.dataset.root || "";
const HERE = document.body.dataset.page || "";

const MARK = `<svg viewBox="0 0 128 132" aria-hidden="true">
  <path d="M4 128V64a60 60 0 0 1 120 0v64z" fill="#1F6673"/>
  <circle cx="64" cy="88" r="46" fill="#D9B45A"/>
  <path d="M4 104h120v24H4z" fill="#174E58"/>
  <path fill="#F2F5F4" fill-rule="evenodd" d="M36 128L30 116L35 113L29 102L34 98L33 84L40 46L39 36L44 48L52 62H76L84 48L89 36L88 46L95 84L94 98L99 102L93 113L98 116L92 128ZM48 86q6-5 12 0q-6 5-12 0ZM80 86q-6-5-12 0q6 5 12 0ZM59 97h10l-5 5Z"/>
</svg>`;

const FB_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.4V14h2.7v8z"/></svg>`;

const facebookHref = SITE.facebookUrl || "#facebook-coming-soon";
const facebookTitle = SITE.facebookUrl ? "Follow us on Facebook" : "Our Facebook page is coming soon";

function link(item) {
  const current = item.href.replace(/\/index\.html$/, "") === HERE ||
                  item.href.replace(/\.html$/, "") === HERE;
  return `<a href="${ROOT}${item.href}"${current ? ' aria-current="page"' : ""}>${item.label}</a>`;
}

function brand() {
  return `<a class="brand" href="${ROOT}index.html">${MARK}
    <span><span class="brand-name">${SITE.name}</span><span class="brand-tag">${SITE.tagline}</span></span></a>`;
}

function renderHeader() {
  const items = NAV.map((item) => item.children
    ? `<li class="has-sub">${link(item)}<ul class="sub">${item.children.map((c) => `<li>${link(c)}</li>`).join("")}</ul></li>`
    : `<li>${link(item)}</li>`).join("");

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `<div class="wrap">
    ${brand()}
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="nav" id="site-nav" aria-label="Main">
      <ul>${items}</ul>
      <a class="btn" href="${facebookHref}" title="${facebookTitle}" ${SITE.facebookUrl ? 'target="_blank" rel="noopener"' : ""}>${FB_ICON}Facebook</a>
    </nav>
  </div>`;
  document.body.prepend(header);

  const skip = document.createElement("a");
  skip.className = "skip";
  skip.href = "#main";
  skip.textContent = "Skip to content";
  document.body.prepend(skip);

  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "Close" : "Menu";
  });
}

function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<div class="wrap">
    <div>
      ${brand()}
      <p style="margin-top:1rem">A small, home-based Maine Coon cattery in ${SITE.location}.</p>
    </div>
    <div>
      <h2>Visit</h2>
      <ul>
        <li><a href="${ROOT}cats/index.html">Our cats</a></li>
        <li><a href="${ROOT}kittens.html">Kittens and waitlist</a></li>
        <li><a href="${ROOT}blog/index.html">Blog</a></li>
      </ul>
    </div>
    <div>
      <h2>Get in touch</h2>
      <ul>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li><a href="${facebookHref}" title="${facebookTitle}">Facebook</a></li>
        <li>${SITE.location}</li>
      </ul>
    </div>
    <p class="fine">© ${new Date().getFullYear()} ${SITE.name}. Photos are of our own cats unless noted.</p>
  </div>`;
  document.body.append(footer);
}

// Clicking a photo in a gallery opens it full size instead of leaving the page.
function setupViewer() {
  const links = document.querySelectorAll("[data-viewer]");
  if (!links.length || !window.HTMLDialogElement) return;

  const dialog = document.createElement("dialog");
  dialog.className = "viewer";
  dialog.innerHTML = `<img alt=""><button type="button">Close photo</button>`;
  document.body.append(dialog);
  const img = dialog.querySelector("img");

  links.forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    img.src = a.href;
    img.alt = a.querySelector("img")?.alt || "";
    dialog.showModal();
  }));
  dialog.querySelector("button").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
}

renderHeader();
renderFooter();
setupViewer();
