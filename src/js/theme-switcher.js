import { refs } from './refs';
export function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  refs.main.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}
refs.inputEl.addEventListener('change', toggleTheme);
// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
    refs.inputEl.checked = false;
  } else {
    setTheme('theme-light');
    refs.inputEl.checked = true;
  }
})();
