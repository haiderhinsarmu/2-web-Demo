const errorMessage = document.getElementById('errorMessage')
const successMessage = document.getElementById('successMessage')
const resetForm = document.getElementById('resetForm')

resetForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value
  const newPassword = document.getElementById('newPassword').value
  const confirmPassword = document.getElementById('confirmPassword').value

  errorMessage.innerHTML = ''
  errorMessage.classList.remove('active')
  successMessage.innerHTML = ''
  successMessage.classList.remove('active')

  if (email === '') {
    errorMessage.innerHTML = 'Please enter your email address.';
    errorMessage.classList.add('active');
    return;
  }

  if (newPassword === '') {
    errorMessage.innerHTML = 'Please enter a new password.';
    errorMessage.classList.add('active');
    return;
  }
  
  if (newPassword.length < 8) {
    errorMessage.innerHTML = 'Password should be at least 8 characters long.';
    errorMessage.classList.add('active');
    return;
  }
  
  if (confirmPassword === '') {
    errorMessage.innerHTML = 'Please confirm your new password.';
    errorMessage.classList.add('active');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    errorMessage.innerHTML = 'Passwords do not match.';
    errorMessage.classList.add('active');
    return;
  }

  const resetFormData = {
    email,
    newPassword,
  }

  try {
    const response = await fetch('/Reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetFormData),
    });

    const data = await response.json();

    if (data.error) {
      errorMessage.innerHTML = data.error;
      errorMessage.classList.add('active');
    } else {
      successMessage.innerHTML = 'Password reset successful. Please check your email for further instructions.';
      successMessage.classList.add('active');
      resetForm.reset();
    }
  } catch (error) {
    errorMessage.innerHTML = 'An error occurred while resetting your password. Please try again later.';
    errorMessage.classList.add('active');
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
