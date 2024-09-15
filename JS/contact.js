const contactFormData = document.getElementById('contactFormData')

contactFormData.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const message = document.getElementById('message')
  const errorMessage = document.getElementById('errorMessage')
  const successMessage = document.getElementById('successMessage')

  errorMessage.innerHTML = ''
  errorMessage.classList.remove('active')
  successMessage.innerHTML = ''
  successMessage.classList.remove('active')

  if (name === '') {
    errorMessage.innerHTML = 'Please enter your name.';
    errorMessage.classList.add('active');
    return;
  }

  if (name.length < 5) {
    errorMessage.innerHTML = 'Name should be at least 5 characters long.';
    errorMessage.classList.add('active');
    return;
  }

  if (email === '') {
    errorMessage.innerHTML = 'Please enter your email.';
    errorMessage.classList.add('active');
    return;
  }

  if (message === '') {
    errorMessage.innerHTML = 'Please enter your message.';
    errorMessage.classList.add('active');
    return;
  }


  const contactData = {
    name: name,
    email: email,
    message: message
  }

  try {
    const response = await fetch('/Contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    })

    const data = await response.json()

    if (data.error) {
      errorMessage.innerHTML = data.error;
      errorMessage.classList.add('active');
      return;

    } else {
      successMessage.innerHTML = 'Thank you for contacting us. We will <br> respond to your message soon.';
      successMessage.classList.add('active');
      contactFormData.reset();
      setTimeout(() => {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('active');
        successMessage.innerHTML = '';
        successMessage.classList.remove('active');
      }, 5000)
    }
  } catch (error) {
    errorMessage.innerHTML = 'An error occurred while sending your <br> message. Please try again later.';
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