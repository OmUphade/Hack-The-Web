/* global-auth.js */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks   = document.getElementById("navLinks");
  const hamburger  = document.getElementById("hamburger");
  const authArea   = document.getElementById("authArea");
  const username   = localStorage.getItem("username");

  // Mobile nav
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("show");
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Auth UI
  if (authArea) {
    if (username) {
      authArea.innerHTML = `
        <div class="user-menu">
          <span class="user-name">Hi, ${username} ▾</span>
          <div class="dropdown">
            <button class="logout-btn" id="logoutBtn">Logout</button>
          </div>
        </div>
      `;
      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("username");
        location.reload();
      });
    } else {
      authArea.innerHTML = `<a href="login.html" class="login-btn">Login</a>`;
    }
  }

  // Back to top
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }
});
