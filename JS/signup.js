const registerFormData = document.getElementById('signup-form')
const errorMessage = document.getElementById('errorMessage')
const successMessage = document.getElementById('successMessage')

registerFormData.addEventListener('submit', async (e) => {
 e.preventDefault();
 
 const firstName = document.getElementById('first-name').value
 const lastName = document.getElementById('last-name').value
 const email = document.getElementById('email').value
 const password = document.getElementById('password').value
 const confirmPassword = document.getElementById('confirm-password').value

 errorMessage.innerHTML =''
 errorMessage.classList.remove('active')
 successMessage.innerHTML = ''
 successMessage.classList.remove('active')

 if(firstName === '') {
  errorMessage.innerHTML = 'Please enter your first name.'
  errorMessage.classList.add('active')
  return;
 }

 if (firstName.length < 5) {
  errorMessage.innerHTML = 'First name should be at least 5 characters long.'
  errorMessage.classList.add('active')
  return;
 }

 if(lastName === '') {
  errorMessage.innerHTML = 'Please enter your last name.'
  errorMessage.classList.add('active')
  return;
 }

 if (lastName.length < 5) {
  errorMessage.innerHTML = 'Last name should be at least 5 characters long.'
  errorMessage.classList.add('active')
  return;
 }
 
 if(email === '') {
  errorMessage.innerHTML = 'Please enter your email address.'
  errorMessage.classList.add('active')
  return;
 }

 if(password === '') {
  errorMessage.innerHTML = 'Please enter a password.'
  errorMessage.classList.add('active')
  return;
 }
 
 if (password.length < 8) {
  errorMessage.innerHTML = 'Password should be at least 8 characters long.'
  errorMessage.classList.add('active')
  return;
 }
 
 if(confirmPassword === '') {
  errorMessage.innerHTML = 'Please confirm your password.'
  errorMessage.classList.add('active')
  return;
 }
 
 if(password!== confirmPassword) {
  errorMessage.innerHTML = 'Passwords do not match.'
  errorMessage.classList.add('active')
  return;
}

 const registerData = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password
 }

 try {
  const response = await fetch('/Register', {
   method: 'Post',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify(registerData)
  })

  const data = await response.json()

  if( data.error) {
   errorMessage.innerHTML = data.error
   errorMessage.classList.add('active')
   return;

  } else {
    errorMessage.innerHTML = ''
    errorMessage.classList.remove('active')
    successMessage.innerHTML = 'Registration successful. <br> You can now log in.'
    successMessage.classList.add('active')
    setTimeout(() => {
     successMessage.innerHTML = ''
     successMessage.classList.remove('active')
    }, 3000);
 }
 } catch (error) {
  errorMessage.innerHTML = 'An error occurred while registering. <br> Please try again later.'
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