console.log("IT'S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// ─── BASE PATH (works locally AND on GitHub Pages) ───────────────────────────
const BASE_PATH =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/"
    : "/portfolio/"; // ← change "portfolio" to your actual GitHub repo name

// ─── STEP 3 & 2: Automatic nav menu + current-page highlighting ───────────────
let pages = [
  { url: "", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "contact/", title: "Contact" },
  { url: "cv/", title: "CV" },
  { url: "https://github.com/RyanZhang0821", title: "GitHub" },
];

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Prefix relative URLs with BASE_PATH so links work on every page
  if (!url.startsWith("http")) {
    url = BASE_PATH + url;
  }

  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;

  // Highlight current page
  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === location.pathname
  );

  // Open external links in a new tab
  if (a.host !== location.host) {
    a.target = "_blank";
  }

  nav.append(a);
}

// ─── STEP 4.2 – 4.5: Dark mode switcher ──────────────────────────────────────
document.body.insertAdjacentHTML(
  "afterbegin",
  `<label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>`
);

const select = document.querySelector(".color-scheme select");

// Helper – sets color-scheme on <html> AND syncs the <select>
function setColorScheme(value) {
  document.documentElement.style.setProperty("color-scheme", value);
  select.value = value;
}

// Restore saved preference on page load
if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

// React to user changes
select.addEventListener("input", function (event) {
  const value = event.target.value;
  localStorage.colorScheme = value;
  setColorScheme(value);
});

// ─── STEP 5 (Optional): Better contact form ───────────────────────────────────
const form = document.querySelector("form");

form?.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = new FormData(form);
  let url = form.action + "?";
  let params = [];

  for (let [name, value] of data) {
    params.push(`${name}=${encodeURIComponent(value)}`);
  }

  url += params.join("&");
  location.href = url;
});