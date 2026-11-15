// Keep theme and menu behavior small and easy to follow.
const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Use a saved choice when available; otherwise follow the device preference.
let savedTheme = null;
try {
  savedTheme = localStorage.getItem('sardor-theme');
} catch (error) {
  // Storage can be unavailable in private or restricted browsing contexts.
}

function setTheme(theme) {
  const dark = theme === 'dark';
  document.body.classList.toggle('dark', dark);
  themeIcon.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
}

setTheme(savedTheme || (systemPrefersDark.matches ? 'dark' : 'light'));

themeButton.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(nextTheme);
  try {
    localStorage.setItem('sardor-theme', nextTheme);
  } catch (error) {
    // The theme still works for this visit even when it cannot be saved.
  }
});

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

// Close the mobile menu after choosing a destination.
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
