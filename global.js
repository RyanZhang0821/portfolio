console.log("IT'S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/"
    : "/portfolio/";

let pages = [
  { url: "", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "contact/", title: "Contact" },
  { url: "resume/", title: "CV" },
  { url: "https://github.com/RyanZhang0821", title: "GitHub" },
];

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  if (!url.startsWith("http")) {
    url = BASE_PATH + url;
  }

  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;

  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === location.pathname
  );

  if (a.host !== location.host) {
    a.target = "_blank";
  }

  nav.append(a);
}

// Insert the theme switcher INSIDE the nav, at the end
nav.insertAdjacentHTML(
  "beforeend",
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

function setColorScheme(value) {
  document.documentElement.style.setProperty("color-scheme", value);
  select.value = value;
}

if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

select.addEventListener("input", function (event) {
  const value = event.target.value;
  localStorage.colorScheme = value;
  setColorScheme(value);
});

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

export async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export function renderProjects(
  projects,
  containerElement,
  headingLevel = "h2"
) {
  containerElement.replaceChildren();
  for (const project of projects) {
    const article = document.createElement("article");

    const heading = document.createElement(headingLevel);
    heading.textContent = project.title ?? "";

    const img = document.createElement("img");
    img.src = project.image ?? "";
    img.alt = project.title ?? "";

    // Wrap description and year in the same <div> so they share the grid cell
    const textWrap = document.createElement("div");
    textWrap.classList.add("project-text");

    const p = document.createElement("p");
    p.textContent = project.description ?? "";

    const yearEl = document.createElement("p");
    yearEl.classList.add("project-year");
    yearEl.textContent = project.year ? `c. ${project.year}` : "";

    textWrap.append(p, yearEl);

    article.append(heading, img, textWrap);
    containerElement.append(article);
  }
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${encodeURIComponent(username)}`);
}