
const CONFIG = {
  terminalOutputText:
    "Desarrolladora backend Jr. especializada en Python, ROS 2 y APIs REST, con experiencia en robótica aplicada.",
  typingSpeedMs: 28,
};

function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initScrollSpy() {
  const links = document.querySelectorAll(".nav-link");
  const sections = Array.from(links)
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(
          `.nav-link[data-section="${entry.target.id}"]`
        );
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initTypewriter() {
  const output = document.getElementById("typeOutput");
  const cursor = document.getElementById("typeCursor");
  if (!output) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    output.textContent = CONFIG.terminalOutputText;
    return;
  }

  const text = CONFIG.terminalOutputText;
  let i = 0;

  function typeChar() {
    if (i < text.length) {
      output.textContent += text.charAt(i);
      i += 1;
      setTimeout(typeChar, CONFIG.typingSpeedMs);
    } else if (cursor) {
      cursor.style.opacity = "0";
    }
  }

  setTimeout(typeChar, 500);
}

function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const root = document.documentElement;
  if (!btn) return;

  function updateButton(theme) {
    const isDark = theme === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute(
      "aria-label",
      isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
    );
  }

  updateButton(root.getAttribute("data-theme") || "light");

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateButton(next);
  });
}

function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initBackToTop() {
  const btn = document.getElementById("backTop");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initScrollSpy();
  initTypewriter();
  initYear();
  initBackToTop();
  initThemeToggle();
});