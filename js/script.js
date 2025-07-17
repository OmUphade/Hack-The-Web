// // Toggle mobile menu
// const hamburger = document.getElementById("hamburger");
// const navLinks = document.getElementById("nav-links");
// hamburger.addEventListener("click", () => {
//   navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
// });

// // Back to top button
// const backToTop = document.getElementById("backToTop");
// window.addEventListener("scroll", () => {
//   backToTop.style.display = window.scrollY > 200 ? "block" : "none";
// });
// backToTop.addEventListener("click", () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// });

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
