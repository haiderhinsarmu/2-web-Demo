const errorMessage = document.getElementById('errorMessage')
const successMessage = document.getElementById('successMessage')
const personInfoForm = document.getElementById('personInfo')


personInfoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('first-name').value
  const lastName = document.getElementById('last-name').value
  const email = document.getElementById('email').value
  const country = document.getElementById('country').value
  const address = document.getElementById('address').value
  const phone = document.getElementById('phone').value
  const zipCode = document.getElementById('zip-code').value
  const cardNumber = document.getElementById('card-number').value
  const expiryDate = document.getElementById('expiry-date').value
  const cvv = document.getElementById('cvv').value
  const nameOnCard = document.getElementById('name-on-card').value
  console.log(errorMessage)
  
  errorMessage.innerHTML = '';
  errorMessage.classList.remove('active')
  successMessage.innerHTML = '';
  successMessage.classList.remove('active')

  if (firstName === '') {
    errorMessage.textContent = 'Please enter your first name.';
    errorMessage.classList.add('active');
    return;
  }
  if (lastName === '') {
    errorMessage.innerHTML = 'Please enter your last name.';
    errorMessage.classList.add('active');
    return;
  }
  if (email === '') {
    errorMessage.innerHTML = 'Please enter your email address.';
    errorMessage.classList.add('active');
    return;
  }
  if (country === '') {
    errorMessage.innerHTML = 'Please select your country.';
    errorMessage.classList.add('active');
    return;
  }
  if (address === '') {
    errorMessage.innerHTML = 'Please enter your address.';
    errorMessage.classList.add('active');
    return;
  }
  if (phone === '') {
    errorMessage.innerHTML = 'Please enter your phone number.';
    errorMessage.classList.add('active');
    return;
  }
  if (zipCode === '') {
    errorMessage.innerHTML = 'Please enter your zip code.';
    errorMessage.classList.add('active');
    return;
  }
  if (cardNumber === '') {
    errorMessage.innerHTML = 'Please enter your credit card number.';
    errorMessage.classList.add('active');
    return;
  }
  if (expiryDate === '') {
    errorMessage.innerHTML = 'Please enter your expiry date.';
    errorMessage.classList.add('active');
    return;
  }
  if (cvv === '') {
    errorMessage.innerHTML = 'Please enter your CVV.';
    errorMessage.classList.add('active');
    return;
  }
  if (nameOnCard === '') {
    errorMessage.innerHTML = 'Please enter the name on your credit card.';
    errorMessage.classList.add('active');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMessage.innerHTML = 'Please enter a valid email address.';
    errorMessage.classList.add('active');
    return;
  }

  const personData = {
    firstName,
    lastName,
    email,
    country,
    address,
    phone,
    zipCode,
    cardNumber,
    expiryDate,
    cvv,
    nameOnCard,
  }
  
  try {
    const response = await fetch('/Checkout', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({personData})
    })
    const data = await response.json();
    if (data.error) {
      errorMessage.innerHTML(data.error)
      errorMessage.classList.add('active');
      return;

    } else {
      localStorage.removeItem('cart');
      window.location.href = '/HTML/Success.html';
      localStorage.removeItem('totalPrice');
      successMessage.innerHTML = 'Payment successful! Your order has been placed.';
      successMessage.classList.add('active');
      personInfoForm.reset();
      setTimeout(() => {
        errorMessage.innerHTML = '';
        errorMessage.classList.remove('active');
        successMessage.innerHTML = '';
        successMessage.classList.remove('active');
      }, 5000)
    }
  } catch (error) {
    errorMessage.innerHTML = 'An error occurred while trying to checkout.';
    errorMessage.classList.add('active');
    return;
  }
})


/// get total price fron localstorage and displait in hier 
const totalPriceElement = document.querySelector('.EndTotalPrice')
let cartItems = localStorage.getItem('cart');

if (cartItems) {
    cartItems = JSON.parse(cartItems);

    let totalPrice = cartItems.reduce((total, item) => {
        let price = parseFloat(item.price.replace('$', ''));
        return total += (price * item.quantity);
    }, 0);

    totalPriceElement.textContent = `Total Price: €${totalPrice.toFixed(2)}`;
} else {
    totalPriceElement.textContent = 'Total Price: €0.00';
}

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
  username.innerHTML = `${user.userName}`;
} else {
  loginBtn.style.display = 'block';
  logoutBtn.style.display = 'none';
  username.style.display = 'none';
}

// Add event listener to logout button
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  userName.innerHTML = '';
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