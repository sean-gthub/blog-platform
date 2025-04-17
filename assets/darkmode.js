const toggleButton = document.getElementById('darkModeToggle');
const prefersDark = localStorage.getItem('darkMode') === 'true';

if (prefersDark) {
  document.body.classList.add('dark');
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
});
