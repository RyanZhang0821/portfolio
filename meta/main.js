html {
  color-scheme: light dark;
  --color-accent: oklch(65% 50% 0);
  accent-color: var(--color-accent);
}

body {
  font: 100%/1.5 system-ui;
  max-width: 100ch;
  margin-inline: max(1em, (100% - 100ch) / 2);
}

h1 {
  font-size: 400%;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.1;
  text-wrap: balance;
}

nav {
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  --border-color: oklch(50% 10% 200 / 40%);
  border-bottom: 1px solid var(--border-color);
}

nav ul {
  display: contents;
}

nav a {
  flex: 1;
  text-decoration: none;
  color: inherit;
  text-align: center;
  padding: 0.5em;
}

nav a.current {
  border-bottom: 0.4em solid var(--border-color);
  padding-bottom: 0.1em;
}

nav a:hover {
  border-bottom: 0.4em solid var(--color-accent);
  padding-bottom: 0.1em;
  background-color: color-mix(in oklch, var(--color-accent), canvas 85%);
}

/* Theme switcher sits at the end of the nav bar */
.color-scheme {
  margin-left: auto;
  font-size: 80%;
  font-family: inherit;
  white-space: nowrap;
  padding: 0.5em;
}

img {
  max-width: 100%;
  border-radius: 10px;
  margin-top: 20px;
}

input, textarea, button, select {
  font: inherit;
}

form {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1em;
}

label {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}

button {
  grid-column: 1 / -1;
  padding: 10px;
  background-color: canvastext;
  color: canvas;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: var(--color-accent);
  color: canvas;
}

/* ---------- Projects grid ---------- */
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 1em;
}

.projects article {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3;
}

.projects h2 {
  margin: 0;
}

/* The text wrapper holds description + year so they share one grid cell */
.project-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-year {
  margin: 0.5em 0 0 0;
  font-family: Baskerville, "Hoefler Text", Georgia, serif;
  font-variant-numeric: oldstyle-nums;
  font-style: italic;
  color: color-mix(in oklch, canvastext, canvas 35%);
}

/* ---------- Pie chart + legend container ---------- */
.container {
  display: flex;
  align-items: center;
  gap: 2em;
  margin-block: 2em;
}

#projects-pie-plot {
  max-width: 20em;
  flex-shrink: 0;
  overflow: visible;
}

#projects-pie-plot path {
  cursor: pointer;
  transition: 300ms;
  /* Use the wedge's own --color when set, else fill attribute */
  fill: var(--color, currentColor);
}

/* Fade non-hovered wedges when the SVG contains a hovered path */
#projects-pie-plot:has(path:hover) path:not(:hover) {
  opacity: 0.5;
}

/* ---------- Legend ---------- */
.legend {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
  gap: 0.5em;
  list-style: none;
  margin: 0;
  padding: 1em;
  border: 1px solid color-mix(in oklch, canvastext, canvas 80%);
  border-radius: 0.5em;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
}

.swatch {
  display: inline-block;
  width: 1em;
  aspect-ratio: 1 / 1;
  background-color: var(--color);
  border-radius: 50%;
  flex-shrink: 0;
}

/* ---------- Selected wedge / legend item ---------- */
.selected {
  --color: oklch(60% 45% 0) !important;
}

.selected:is(path) {
  fill: var(--color);
}

/* ---------- Search bar ---------- */
.searchBar {
  display: block;
  width: 100%;
  padding: 0.5em 0.75em;
  margin-block: 1em;
  border: 1px solid color-mix(in oklch, canvastext, canvas 80%);
  border-radius: 0.5em;
  font: inherit;
}

/* ---------- Responsive: stack pie + legend on narrow screens ---------- */
@media (max-width: 600px) {
  .container {
    flex-direction: column;
    align-items: stretch;
  }
  #projects-pie-plot {
    max-width: 100%;
    align-self: center;
  }
}
/* ============================================================
   LAB 6 — Meta page styles
   ============================================================ */

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
  gap: 1em 1.5em;
  padding: 1em 1.25em;
  border: 1px solid color-mix(in oklch, canvastext, canvas 85%);
  border-radius: 0.5em;
  margin: 0 0 1.5em 0;
}

.stats > dt {
  grid-row: 1;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: color-mix(in oklch, canvastext, canvas 45%);
  margin: 0;
}

.stats > dd {
  grid-row: 2;
  margin: 0;
  font-size: 1.75rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

#chart {
  margin-block: 1em;
}

#chart svg {
  max-width: 100%;
  height: auto;
}

.gridlines line {
  stroke: color-mix(in oklch, canvastext, canvas 85%);
  stroke-opacity: 0.6;
  shape-rendering: crispEdges;
}

.gridlines path {
  display: none;
}

circle {
  transition: 200ms;
  transform-origin: center;
  transform-box: fill-box;
}

circle:hover {
  transform: scale(1.5);
}

circle.selected {
  fill: #ff6b6b !important;
}

dl.info {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25em 0.75em;
  margin: 0;
  transition-duration: 500ms;
  transition-property: opacity, visibility;
}

dl.info dt {
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: color-mix(in oklch, canvastext, canvas 45%);
  align-self: center;
}

dl.info dd {
  margin: 0;
  font-weight: 500;
}

dl.info[hidden]:not(:hover, :focus-within) {
  opacity: 0;
  visibility: hidden;
}

.tooltip {
  position: fixed;
  top: 1em;
  left: 1em;
  padding: 0.75em 1em;
  background: color-mix(in oklch, canvas, transparent 15%);
  backdrop-filter: blur(6px);
  border: 1px solid color-mix(in oklch, canvastext, canvas 80%);
  border-radius: 0.5em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 1000;
  max-width: 22em;
}

.tooltip a {
  color: var(--color-accent);
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.85em;
}

@keyframes marching-ants {
  to {
    stroke-dashoffset: -8;
  }
}

.selection {
  fill-opacity: 0.1;
  stroke: black;
  stroke-opacity: 0.7;
  stroke-dasharray: 5 3;
  animation: marching-ants 2s linear infinite;
}

#selection-count {
  margin-top: 1em;
  font-weight: 500;
}

#language-breakdown {
  margin-top: 0.5em;
}

/* ============================================================
   LAB 8 — Animation & Scrollytelling
   ============================================================ */

/* Entry transition: new circles animate up from r: 0 */
circle {
  @starting-style {
    r: 0;
  }
}

/* Two-column scrollytelling layout: story scrolls, plot sticks */
#scrolly-1 {
  position: relative;
  display: flex;
  gap: 1rem;
}

#scrolly-1 > * {
  flex: 1;
}

#scatter-story {
  position: relative;
}

#scatter-plot {
  position: sticky;
  top: 0;
  left: 0;
  bottom: auto;
  height: 50vh;
}

/* Space each commit step out so scrolling triggers one at a time */
.step {
  padding-bottom: 50vh;
}

/* Unit visualization of files (the "race for the biggest file") */
#files {
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-block: 2em;
}

#files > div {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
}

#files dt {
  grid-column: 1;
}

#files dd {
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  align-content: start;
  gap: 0.15em;
  padding-top: 0.6em;
  margin-left: 0;
}

/* One dot per line of code, colored by technology */
.loc {
  display: flex;
  width: 0.5em;
  aspect-ratio: 1;
  background: var(--color, steelblue);
  border-radius: 50%;
}