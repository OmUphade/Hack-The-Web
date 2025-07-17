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

let currentIndex = 0;

function scrollTestimonials() {
  const wrapper = document.getElementById("testimonialWrapper");
  const totalCards = wrapper.children.length;
  const cardWidth = wrapper.clientWidth;

  currentIndex++;

  if (currentIndex >= totalCards) {
    currentIndex = 0;
  }

  wrapper.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
}

// Auto-slide every 3 seconds
setInterval(scrollTestimonials, 1200);
