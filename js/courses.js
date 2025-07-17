/* courses.js */

// ----- Course Data -----
const COURSES = [
  { id:"web-found",  title:"Web Development Fundamentals", cat:"web",    desc:"HTML, CSS, JS — build responsive pages.",        duration:"6 wks",  level:"Beginner" },
  { id:"web-full",   title:"Full‑Stack Web Bootcamp",      cat:"web",    desc:"Frontend + Node basics + DB mini project.",     duration:"10 wks", level:"Intermediate" },
  { id:"dsa-basic",  title:"Data Structures & Algorithms", cat:"dsa",    desc:"Arrays, stacks, trees, graphs, complexity.",    duration:"8 wks",  level:"Intermediate" },
  { id:"ai-ml",      title:"AI / Machine Learning Intro",  cat:"ai",     desc:"Python, pandas, scikit-learn, mini models.",    duration:"8 wks",  level:"Intermediate" },
  { id:"data-anal",  title:"Data Analytics (Excel+Py)",    cat:"data",   desc:"Clean, analyze, visualize data. Excel + Python.",duration:"5 wks", level:"Beginner" },
  { id:"office-ms",  title:"MS Office Productivity",       cat:"office", desc:"Word, Excel, PowerPoint for workplace.",        duration:"4 wks",  level:"Beginner" },
  { id:"soft-skills",title:"Soft Skills & Interview Prep", cat:"other",  desc:"Resume, communication, mock interviews.",      duration:"2 wks",  level:"All" }
];

// ----- State -----
let activeFilter = "all";
let searchQuery  = "";
let favs = new Set(JSON.parse(localStorage.getItem("courseFavs") || "[]"));

// ----- Utils -----
const saveFavs = () =>
  localStorage.setItem("courseFavs", JSON.stringify([...favs]));
const getUsername = () => localStorage.getItem("username");

// ----- Render -----
function renderCourses() {
  const grid = document.getElementById("coursesGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const q = searchQuery.toLowerCase();

  const filtered = COURSES.filter(c => {
    const matchFilter = activeFilter === "all" || c.cat === activeFilter;
    const matchSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.cat.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  if (!filtered.length) {
    grid.innerHTML = `<p style="text-align:center;opacity:.8;">No courses found.</p>`;
    return;
  }

  const loggedIn = !!getUsername();

  filtered.forEach(c => {
    const card = document.createElement("article");
    card.className = "course-card glass-card";
    card.dataset.cat = c.cat;

    card.innerHTML = `
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="course-meta">Duration: ${c.duration} • Level: ${c.level}</div>
      <div class="course-actions">
        <button class="course-btn ${loggedIn ? "continue" : "enroll"}" data-id="${c.id}">
          ${loggedIn ? "Continue" : "Enroll"}
        </button>
        <button class="fav-btn ${favs.has(c.id) ? "active" : ""}" data-fav="${c.id}" aria-label="Toggle favourite">
          ★
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  attachCourseEvents();
}

// ----- Add Events -----
function attachCourseEvents() {
  // Enroll/Continue
  document.querySelectorAll(".course-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.currentTarget.dataset.id;
      if (!getUsername()) {
        window.location.href = "login.html";
        return;
      }
      window.location.href = `course-detail.html?id=${encodeURIComponent(id)}`;
    });
  });

  // Favorites
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.currentTarget.dataset.fav;
      if (favs.has(id)) favs.delete(id);
      else favs.add(id);
      saveFavs();
      renderCourses();
    });
  });
}

// ----- Init Filters + Search -----
document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter;
      renderCourses();
    });
  });

  const searchEl = document.getElementById("courseSearch");
  if (searchEl) {
    searchEl.addEventListener("input", () => {
      searchQuery = searchEl.value.trim();
      renderCourses();
    });
  }

  renderCourses();
});
