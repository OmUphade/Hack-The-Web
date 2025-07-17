/* events.js */

document.addEventListener("DOMContentLoaded", () => {
  // --------- Event Data (edit these!) ----------
  // date format: YYYY-MM-DD
  const events = [
    {
      id: "hackathon-jan",
      title: "Hackathon: Rural Tech Challenge",
      desc: "Build tech solutions for rural education & governance.",
      date: "2025-08-05",
      time: "09:00 AM",
      where: "KKERS Main Lab",
      cat: "hackathon",
      registerUrl: "#"
    },
    {
      id: "cp-monthly",
      title: "Competitive Programming Contest",
      desc: "DSA battle! Solve timed coding problems in C++/Java/Python.",
      date: "2025-07-28",
      time: "07:00 PM",
      where: "Online",
      cat: "coding",
      registerUrl: "#"
    },
    {
      id: "annual-day",
      title: "Annual Tech & Talent Day",
      desc: "Showcase projects, awards, cultural performances.",
      date: "2025-12-12",
      time: "10:00 AM",
      where: "KKERS Auditorium",
      cat: "annual",
      registerUrl: "#"
    },
    {
      id: "ai-bootcamp",
      title: "AI/ML Hands‑On Bootcamp",
      desc: "Intro to ML workflows, data prep & model training.",
      date: "2025-09-15",
      time: "02:00 PM",
      where: "Lab 2 + Online",
      cat: "workshop",
      registerUrl: "#"
    },
    {
      id: "community-cleanup",
      title: "Community Digital Literacy Drive",
      desc: "Teach basic computing to rural learners. Volunteer now!",
      date: "2025-07-30",
      time: "08:00 AM",
      where: "Village Center",
      cat: "community",
      registerUrl: "#"
    }
  ];

  // --------- State ---------
  let activeFilter = "all";
  let searchQuery = "";
  const reminders = new Set(JSON.parse(localStorage.getItem("eventReminders") || "[]"));

  const grid    = document.getElementById("eventsGrid");
  const chips   = document.querySelectorAll(".events-filters .chip");
  const search  = document.getElementById("eventSearch");

  // ----- Helpers -----
  const saveReminders = () =>
    localStorage.setItem("eventReminders", JSON.stringify([...reminders]));

  const formatDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, {month:"short", day:"numeric", year:"numeric"});
  };

  // Returns "upcoming" / "today" / "done"
  const getStatus = (iso) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const d = new Date(iso + "T00:00:00");
    if (d.getTime() === today.getTime()) return "today";
    return d > today ? "upcoming" : "done";
  };

  // ----- Render -----
  function renderEvents() {
    if (!grid) return;
    grid.innerHTML = "";

    const q = searchQuery.toLowerCase();
    const today = new Date(); today.setHours(0,0,0,0);

    const filtered = events.filter(ev => {
      // category filter logic
      let catPass = true;
      if (activeFilter === "upcoming") {
        const evDate = new Date(ev.date + "T00:00:00");
        catPass = evDate >= today;
      } else if (activeFilter !== "all") {
        catPass = ev.cat === activeFilter;
      }

      // text search
      const searchPass =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.desc.toLowerCase().includes(q) ||
        ev.cat.toLowerCase().includes(q) ||
        ev.where.toLowerCase().includes(q);

      return catPass && searchPass;
    });

    if (!filtered.length) {
      grid.innerHTML = `<p style="text-align:center;opacity:.8;">No events found.</p>`;
      return;
    }

    filtered.forEach(ev => {
      const status = getStatus(ev.date);
      const badgeText = formatDate(ev.date);
      const statusLabel =
        status === "today" ? "TODAY" :
        status === "upcoming" ? "UPCOMING" : "COMPLETED";
      const statusClass =
        status === "today" ? "status-today" :
        status === "upcoming" ? "status-upcoming" : "status-done";

      const card = document.createElement("article");
      card.className = "event-card";
      card.innerHTML = `
        <div class="event-date-badge">${badgeText}</div>
        <div class="event-status ${statusClass}">${statusLabel}</div>
        <div class="event-card-body" style="padding:24px;text-align:center;">
          <h3>${ev.title}</h3>
          <p>${ev.desc}</p>
          <div class="event-meta">
            <div>${ev.time}</div>
            <div>${ev.where}</div>
          </div>
          <div class="event-actions">
            <button class="event-btn register" data-register="${ev.id}">Register</button>
            <button class="event-btn details"  data-details="${ev.id}">Details</button>
            <button
              class="remind-btn ${reminders.has(ev.id) ? "active" : ""}"
              data-remind="${ev.id}"
              aria-label="Toggle reminder"
              title="Remind me">
              ★
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    attachEventCardListeners();
  }

  // ----- Card Actions -----
  function attachEventCardListeners() {
    // Register
    document.querySelectorAll("[data-register]").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.dataset.register;
        // redirect to event-specific register URL
        const ev = events.find(ev => ev.id === id);
        if (!ev) return;
        if (ev.registerUrl && ev.registerUrl !== "#") {
          window.location.href = ev.registerUrl;
        } else {
          // fallback: if user not logged in go to login
          const user = localStorage.getItem("username");
          if (!user) window.location.href = "login.html";
          else alert(`Registered for ${ev.title}! (demo)`);
        }
      });
    });

    // Details (stub)
    document.querySelectorAll("[data-details]").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.dataset.details;
        window.location.href = `event-detail.html?id=${encodeURIComponent(id)}`;
      });
    });

    // Reminder star
    document.querySelectorAll("[data-remind]").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.currentTarget.dataset.remind;
        if (reminders.has(id)) reminders.delete(id);
        else reminders.add(id);
        saveReminders();
        renderEvents();
      });
    });
  }

  // ----- Filters -----
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.dataset.filter;
      renderEvents();
    });
  });

  // ----- Search -----
  if (search) {
    search.addEventListener("input", () => {
      searchQuery = search.value.trim();
      renderEvents();
    });
  }

  renderEvents();
});
