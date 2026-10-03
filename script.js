const defaultResources = [
  {
    id: 1,
    title: "MDN Web Docs",
    category: "Web Dev",
    description: "Documentation and guides for HTML, CSS, JavaScript and modern web APIs.",
    link: "https://developer.mozilla.org/",
    votes: 12
  },
  {
    id: 2,
    title: "React",
    category: "Web Dev",
    description: "A JavaScript library for building user interfaces and component-based web apps.",
    link: "https://react.dev/",
    votes: 10
  },
  {
    id: 3,
    title: "Flutter",
    category: "App Dev",
    description: "A framework for building cross-platform mobile, web and desktop applications.",
    link: "https://flutter.dev/",
    votes: 8
  },
  {
    id: 4,
    title: "Kaggle",
    category: "AI/ML",
    description: "Datasets, notebooks, competitions and learning resources for data science and machine learning.",
    link: "https://www.kaggle.com/",
    votes: 15
  },
  {
    id: 5,
    title: "GitHub",
    category: "Tools",
    description: "Platform for hosting code, collaborating with developers and managing projects with Git.",
    link: "https://github.com/",
    votes: 20
  },
  {
    id: 6,
    title: "Figma",
    category: "Tools",
    description: "Collaborative design and prototyping tool useful for UI/UX and product development.",
    link: "https://www.figma.com/",
    votes: 9
  }
];

const STORAGE_KEY = "developerResourceHub.resources";
const THEME_KEY = "developerResourceHub.theme";

let resources = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultResources;

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resourceGrid = document.getElementById("resourceGrid");
const emptyState = document.getElementById("emptyState");
const resourceCount = document.getElementById("resourceCount");
const formSection = document.getElementById("formSection");
const resourceForm = document.getElementById("resourceForm");

function saveResources() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
}

function renderResources() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = resources.filter(resource => {
    const matchesCategory = category === "All" || resource.category === category;
    const text = `${resource.title} ${resource.description} ${resource.category}`.toLowerCase();
    return matchesCategory && text.includes(search);
  });

  resourceGrid.innerHTML = filtered.map(resource => `
    <article class="resource-card">
      <span class="badge">${escapeHTML(resource.category)}</span>
      <h3>${escapeHTML(resource.title)}</h3>
      <p>${escapeHTML(resource.description)}</p>
      <div class="card-actions">
        <a class="visit" href="${safeURL(resource.link)}" target="_blank" rel="noopener noreferrer">Visit</a>
        <button class="upvote" data-id="${resource.id}">▲ ${resource.votes || 0}</button>
      </div>
    </article>
  `).join("");

  emptyState.hidden = filtered.length !== 0;
  resourceCount.textContent = resources.length;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function safeURL(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

searchInput.addEventListener("input", renderResources);
categoryFilter.addEventListener("change", renderResources);

resourceGrid.addEventListener("click", event => {
  const button = event.target.closest(".upvote");
  if (!button) return;

  const id = Number(button.dataset.id);
  const resource = resources.find(item => item.id === id);
  if (resource) {
    resource.votes = (resource.votes || 0) + 1;
    saveResources();
    renderResources();
  }
});

document.getElementById("showFormBtn").addEventListener("click", () => {
  formSection.hidden = false;
  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("closeFormBtn").addEventListener("click", () => {
  formSection.hidden = true;
});

resourceForm.addEventListener("submit", event => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  const link = document.getElementById("link").value.trim();

  try {
    const url = new URL(link);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error();
  } catch {
    alert("Please enter a valid http/https link.");
    return;
  }

  resources.unshift({
    id: Date.now(),
    title,
    category,
    description,
    link,
    votes: 0
  });

  saveResources();
  resourceForm.reset();
  formSection.hidden = true;
  renderResources();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  localStorage.setItem(THEME_KEY, theme);
}

themeToggle.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("dark") ? "light" : "dark");
});

applyTheme(localStorage.getItem(THEME_KEY) || "light");
renderResources();
