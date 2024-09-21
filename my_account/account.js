const menu = document.getElementById('menu');
const menuOptions = document.getElementById('menu-options');
document.getElementById('username').textContent = "A_TimeTraveler";

menu.addEventListener('click', () => {
    menuOptions.classList.toggle('visible');
    menuOptions.classList.toggle('hidden');
});

