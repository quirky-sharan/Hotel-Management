const KEY = "theme";

export function getTheme() {
  return localStorage.getItem(KEY) || "light";
}

export function setTheme(theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  localStorage.setItem(KEY, theme);
}

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.classList.contains("dark") ? "light" : "dark";
  setTheme(next);
  return next;
}
