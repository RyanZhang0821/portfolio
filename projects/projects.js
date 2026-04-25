import { fetchJSON, renderProjects } from "../global.js";

const projects = await fetchJSON("../lib/projects.json");
const container = document.querySelector(".projects");
const titleEl = document.querySelector(".projects-title");

if (container) {
  renderProjects(projects, container, "h2");
}

if (titleEl) {
  titleEl.textContent = `${projects.length} Projects`;
}
