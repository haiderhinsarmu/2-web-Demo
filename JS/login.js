const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  errorMessage.innerHTML = '';
  errorMessage.classList.remove('active');
  successMessage.innerHTML = '';
  successMessage.classList.remove('active');

  if (email === '') {
    errorMessage.innerHTML = 'Please enter your email address';
    errorMessage.classList.add('active');
    return;
  }

  if (password === '') {
    errorMessage.innerHTML = 'Please enter your password';
    errorMessage.classList.add('active');
    return;
  }


  const loginData = {
   email: email,
    password: password,
  };

  try {
    const response = await fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (data.error) {
      errorMessage.innerHTML = data.error;
      errorMessage.classList.add('active');
      return;
    } else {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user);
      userName = data.user.username;
      window.location.href = '/';
      successMessage.innerHTML = 'Login successful!';
      successMessage.classList.add('active');
      setTimeout(() => {
        successMessage.classList.remove('active');
      }, 2000);
    }
  } catch (error) {
    errorMessage.innerHTML = 'An error occurred while trying to login';
    errorMessage.classList.add('active');
  }
});


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