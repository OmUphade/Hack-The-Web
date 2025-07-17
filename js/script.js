document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  hamburger.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  });

  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 50 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("testimonialWrapper");
  const cards = Array.from(wrapper.children);

  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    wrapper.appendChild(clone);
  });
});
