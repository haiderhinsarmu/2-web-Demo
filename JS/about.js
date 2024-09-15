
// Get user and token from localStorage
let user = localStorage.getItem('user');
let token = localStorage.getItem('token');
let userName = localStorage.getItem('userName')
// Select login and logout buttons und userName
const loginBtn = document.querySelector('.login');
const logoutBtn = document.querySelector('.logout');
const username = document.querySelector('.user');

// Check if user exists in localStorage
if (user) {
  loginBtn.style.display = 'none';
  logoutBtn.style.display = 'block';
  username.textContent = userName;
} else {
  loginBtn.style.display = 'block';
  logoutBtn.style.display = 'none';
  username.style.display = 'none';
}

// Add event listener to logout button
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  userName.textContent = '';
  location.reload();
});

//// humburger toggle 
const toggler = document.getElementById('toggle')
const lines = document.querySelectorAll('.line')
const navLink = document.querySelector('.header-nav')

toggler.addEventListener('click', () => {
  lines.forEach(line => line.classList.toggle('active'));
  navLink.classList.toggle('active');
})




/// copy right date 
const copyRightear = document.getElementById('year');
const now = new Date();
copyRightear.textContent = now.getFullYear();

/// croll up to top  
const scrollUpAllow = document.querySelector('.fa-arrow-up');
scrollUpAllow.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior:'smooth' });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollUpAllow.style.display = 'block';
    } else {
      scrollUpAllow.style.display = 'none';
    }
  });
})