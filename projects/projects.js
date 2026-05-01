import { fetchJSON, renderProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// ---------- Load data ----------
const projects = await fetchJSON("../lib/projects.json");
const projectsContainer = document.querySelector(".projects");
const titleEl = document.querySelector(".projects-title");

// Initial render
if (projectsContainer) {
  renderProjects(projects, projectsContainer, "h2");
}
if (titleEl) {
  titleEl.textContent = `${projects.length} Projects`;
}

// ---------- State ----------
let query = "";
let selectedIndex = -1;

// ---------- D3 setup ----------
const colors = d3.scaleOrdinal(d3.schemeTableau10);
const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
const sliceGenerator = d3.pie().value((d) => d.value);

// ---------- Pie chart renderer ----------
// Takes a list of projects, rolls them up by year, and draws/redraws the pie + legend.
function renderPieChart(projectsGiven) {
  // Roll up: count projects per year
  const rolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year
  );

  // Sort by year ascending so colors are stable across renders
  rolledData.sort((a, b) => a[0] - b[0]);

  // Convert into { value, label } objects for the pie generator
  const data = rolledData.map(([year, count]) => ({
    value: count,
    label: year,
  }));

  // Compute slice angles + arc paths
  const arcData = sliceGenerator(data);
  const arcs = arcData.map((d) => arcGenerator(d));

  // Clear previous SVG paths and legend items
  const svg = d3.select("#projects-pie-plot");
  svg.selectAll("path").remove();

  const legend = d3.select(".legend");
  legend.selectAll("li").remove();

  // Draw wedges
  arcs.forEach((arc, i) => {
    svg
      .append("path")
      .attr("d", arc)
      .attr("fill", colors(i))
      .attr("class", i === selectedIndex ? "selected" : "")
      .on("click", () => {
        selectedIndex = selectedIndex === i ? -1 : i;

        // Update wedge classes
        svg
          .selectAll("path")
          .attr("class", (_, idx) => (idx === selectedIndex ? "selected" : ""));

        // Update legend classes
        legend
          .selectAll("li")
          .attr("class", (_, idx) =>
            idx === selectedIndex ? "legend-item selected" : "legend-item"
          );

        // Apply combined filtering (search + selected wedge)
        applyFilters(data);
      });
  });

  // Draw legend
  data.forEach((d, idx) => {
    legend
      .append("li")
      .attr("style", `--color:${colors(idx)}`)
      .attr(
        "class",
        idx === selectedIndex ? "legend-item selected" : "legend-item"
      )
      .html(
        `<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`
      );
  });
}

// ---------- Filtering ----------
// Apply BOTH the search query AND the selected pie wedge year.
// `pieData` is the {value, label} array from the most recent pie render —
// we need it so we can map selectedIndex -> year label.
function applyFilters(pieData) {
  // 1. Filter by search query first
  let filtered = projects.filter((project) => {
    const values = Object.values(project).join("\n").toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // 2. Then narrow further by the selected year (if any)
  if (selectedIndex !== -1 && pieData && pieData[selectedIndex]) {
    const selectedYear = pieData[selectedIndex].label;
    filtered = filtered.filter((p) => p.year === selectedYear);
  }

  // Render the resulting projects
  renderProjects(filtered, projectsContainer, "h2");

  // Update count in heading
  if (titleEl) {
    titleEl.textContent = `${filtered.length} Projects`;
  }
}

// Helper: get the current pie data array (recomputed from the search-filtered
// projects). The pie always reflects what's *visible* given the search query.
function getPieDataFromSearch() {
  const searchFiltered = projects.filter((project) => {
    const values = Object.values(project).join("\n").toLowerCase();
    return values.includes(query.toLowerCase());
  });

  const rolled = d3.rollups(
    searchFiltered,
    (v) => v.length,
    (d) => d.year
  );
  rolled.sort((a, b) => a[0] - b[0]);

  return rolled.map(([year, count]) => ({ value: count, label: year }));
}

// ---------- Initial pie render ----------
renderPieChart(projects);

// ---------- Search bar wiring ----------
const searchInput = document.querySelector(".searchBar");

searchInput.addEventListener("input", (event) => {
  query = event.target.value;

  // Search-filter the projects (without applying year filter yet — pie does that)
  const searchFiltered = projects.filter((project) => {
    const values = Object.values(project).join("\n").toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // Reset selectedIndex when the search changes — the pie wedge indices
  // may no longer correspond to the same years if some years vanish.
  // (Comment out this line if you'd rather preserve selection across searches.)
  selectedIndex = -1;

  // Re-render pie based on what's currently visible from the search
  renderPieChart(searchFiltered);

  // Apply combined filter (in this case selectedIndex is -1, so it's just search)
  const pieData = getPieDataFromSearch();
  applyFilters(pieData);
});