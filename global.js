console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// --- STEP 3: Automatic Navigation Menu ---
let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'resume/', title: 'Resume' },
  { url: 'https://github.com/RyanZhang0821', title: 'GitHub' }
];

let nav = document.createElement('nav');
document.body.prepend(nav);

// Detect if we are local or on GitHub Pages to fix paths
const BASE_PATH = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? '/' : '/portfolio/';

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Adjust relative URLs based on environment
  if (!url.startsWith('http')) {
    url = BASE_PATH + url;
  }

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  // Highlight current page
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }

  // Open external links in a new tab
  if (a.host !== location.host) {
    a.target = '_blank';
  }

  nav.append(a);
}

// --- STEP 4: Dark Mode Switcher ---
document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>`
);

let select = document.querySelector('.color-scheme select');

// Check if there is a saved preference
if ("colorScheme" in localStorage) {
  document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
  select.value = localStorage.colorScheme;
}

// Listen for theme changes
select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value; // Save to local storage
});

// --- STEP 5: Better Contact Form ---
let form = document.querySelector('form');
form?.addEventListener('submit', function (event) {
  event.preventDefault(); // Stop the default form submission
  
  let data = new FormData(form);
  let url = form.action + "?";
  
  for (let [name, value] of data) {
    url += `${name}=${encodeURIComponent(value)}&`; // Encode spaces properly
  }
  
  // Open the mail client with the encoded URL
  location.href = url.slice(0, -1); 
});