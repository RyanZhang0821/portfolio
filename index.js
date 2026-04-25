import { fetchJSON, renderProjects, fetchGitHubData } from "./global.js";

const projects = await fetchJSON("./lib/projects.json");
const projectsContainer = document.querySelector(".projects");
if (projectsContainer) {
  renderProjects(projects.slice(0, 3), projectsContainer, "h2");
}

const profileStats = document.querySelector("#profile-stats");
if (profileStats) {
  const githubData = await fetchGitHubData("RyanZhang0821");
  profileStats.replaceChildren();
  for (const key of ["public_repos", "public_gists", "followers", "following"]) {
    const p = document.createElement("p");
    p.textContent = `${key}: ${githubData[key]}`;
    profileStats.append(p);
  }
}
