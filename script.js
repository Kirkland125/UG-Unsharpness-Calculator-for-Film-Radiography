const MM_PER_INCH = 25.4;

const themeToggle = document.getElementById("theme-toggle");
const THEME_KEY = "ug-calculator-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

const savedTheme =
  localStorage.getItem(THEME_KEY) ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

const form = document.getElementById("ug-form");
const resultBox = document.getElementById("result");
const resultMm = document.getElementById("result-mm");
const resultIn = document.getElementById("result-in");
const errorBox = document.getElementById("error");

const fields = {
  focalSpot: {
    input: document.getElementById("focal-spot"),
    unit: document.getElementById("focal-spot-unit"),
  },
  objectFilm: {
    input: document.getElementById("object-film"),
    unit: document.getElementById("object-film-unit"),
  },
  sourceObject: {
    input: document.getElementById("source-object"),
    unit: document.getElementById("source-object-unit"),
  },
};
