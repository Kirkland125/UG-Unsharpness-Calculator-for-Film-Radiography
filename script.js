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

function toMm(value, unit) {
  return unit === "in" ? value * MM_PER_INCH : value;
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  resultBox.hidden = true;
}

function clearError() {
  errorBox.hidden = true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  const f = parseFloat(fields.focalSpot.input.value);
  const d = parseFloat(fields.objectFilm.input.value);
  const D = parseFloat(fields.sourceObject.input.value);

  if (Number.isNaN(f) || Number.isNaN(d) || Number.isNaN(D)) {
    showError("Please fill in all three fields with numeric values.");
    return;
  }

  const fMm = toMm(f, fields.focalSpot.unit.value);
  const dMm = toMm(d, fields.objectFilm.unit.value);
  const DMm = toMm(D, fields.sourceObject.unit.value);

  if (DMm <= 0) {
    showError("Source-to-Object Distance (D) must be greater than zero.");
    return;
  }

  const ugMm = (fMm * dMm) / DMm;
  const ugIn = ugMm / MM_PER_INCH;

  resultMm.textContent = ugMm.toFixed(3);
  resultIn.textContent = ugIn.toFixed(4);
  resultBox.hidden = false;
});

form.addEventListener("reset", () => {
  clearError();
  resultBox.hidden = true;
});
