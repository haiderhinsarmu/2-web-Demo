const errorMessage = document.getElementById('errorMessage')
const successMessage = document.getElementById('successMessage')
const forgotForm = document.getElementById('forgotForm')

forgotForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value

  errorMessage.innerHTML = '';
  errorMessage.classList.remove('active');
  successMessage.innerHTML = '';
  successMessage.classList.remove('active');
  
  if (email === '') {
    errorMessage.innerHTML = 'Please enter your email address';
    errorMessage.classList.add('active');
    return;
  }

  const forgotFormData = {
    email: email,
  }

  try {
    const response = await fetch('/Forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(forgotFormData),
    });

    const data = await response.json();
    if (data.error) {
      errorMessage.innerHTML = data.error;
      errorMessage.classList.add('active');
      return;

    } else {
      successMessage.innerHTML = 'An email has been sent to your <br> registered email address. Follow the instructions to reset your password.';
      successMessage.classList.add('active');
      forgotForm.reset();
    }
  } catch (error) {
    errorMessage.innerHTML = 'An error occurred while sending <br> your request. Please try again later.';
    errorMessage.classList.add('active');
    return;
  }
    
})








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

