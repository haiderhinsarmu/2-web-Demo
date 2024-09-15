const cartIcon = document.querySelector('.cart-icon');
const cartBody = document.querySelector('.cartBody');
const closeBtn = document.querySelector('.close-cart-btn');
const body = document.body;

cartIcon.addEventListener('click', () => {
  cartBody.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  cartBody.classList.remove('active');
});


//// humburger toggle 
const toggler = document.getElementById('toggle')
const lines = document.querySelectorAll('.line')
const navLink = document.querySelector('.header-nav')

toggler.addEventListener('click', () => {
  lines.forEach(line => line.classList.toggle('active'));
  navLink.classList.toggle('active');
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


// Select all filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterButtons.forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
  });
});


window.addEventListener('DOMContentLoaded', () => {
  productData();
  displayProduct();
  displayCart();
  updateCartCounter();
  updateTotalPrice();
})


/// carts und Carts counter in localstorage speichern
let carts = JSON.parse(localStorage.getItem('cart')) || []

let cartIconCounter = (localStorage.getItem('cart-count'))
if(cartIconCounter === null){
  cartIconCounter = 0;
  document.querySelector('.cart-count').style.display = 'none'
} else {
  document.querySelector('.cart-count').textContent = cartIconCounter.length
  document.querySelector('.cart-count').style.display = 'inline-block'
  cartIconCounter = JSON.stringify(cartIconCounter)
}

let products = []
/// die items in display laden
const productListContainerHTML = document.querySelector('.productList')
/// display product 
const displayProduct = () => {
  productListContainerHTML.innerHTML = '';
  if(products.length > 0){
    products.forEach((product) => {
      const newProduct = document.createElement('div');
      newProduct.classList.add('productItem');
      newProduct.innerHTML = `
        <img src="${product.img}" alt="${product.alt}">
        <h3 id="name">${product.name}</h3>
        <h3 id="category">${product.category}</h3>
        <h3 id="price">${product.price}</h3>
        <p id="description">${product.desc}</p>
        <button type="button" data-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
      `;
      productListContainerHTML.appendChild(newProduct);
    });
  }
   //// adding event listner to add to cart btn
   const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.id)
      const cartIconCounter = document.querySelector('.cart-count')
      cartIconCounter.textContent = parseInt(cartIconCounter.textContent) + 1;
      localStorage.setItem('cart-count', JSON.stringify(cartIconCounter.textContent));
      const product = products.find(item => item.id === productId);
      addToCart(product);
      localStorage.setItem('cart', JSON.stringify(carts));
    })
  });
};

/// search product 
const searchInput = document.querySelector('.search-input');
const exTheSerch = document.querySelector('.fa-times');
searchInput.addEventListener('keyup', () => {
  const searchValue = searchInput.value.toLowerCase();
  const sercheddProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchValue) || 
    product.category.toLowerCase().includes(searchValue)
  );

  productListContainerHTML.innerHTML = '';
  if ( sercheddProducts.length > 0) {
    sercheddProducts.forEach((product) => {
      const newSearchedProduct = document.createElement('div');
      newSearchedProduct.classList.add('productItem');
      newSearchedProduct.innerHTML = `
        <img src="${product.img}" alt="${product.alt}">
        <h3 id="name">${product.name}</h3>
        <h3 id="category">${product.category}</h3>
        <h3 id="price">${product.price}</h3>
        <p id="description">${product.desc}</p>
        <button type="button" data-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
      `;
      productListContainerHTML.appendChild(newSearchedProduct);
    });
  } else {
    productListContainerHTML.innerHTML = `
      <div class="product-empty">
        <h2>No results found.</h2>
      </div>
    `;
  }
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.id)
      const product = products.find(item => item.id === productId);
      addToCart(product);
      localStorage.setItem('cart', JSON.stringify(carts));
    })
  })
});

/// ex the holething back
exTheSerch.addEventListener('click', () => {
  searchInput.value = '';
  displayProduct();
});

/// filter btns 
const filterBtns = document.querySelectorAll('.filter-btn')
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const category = e.target.dataset.id;
    const filteredProducts = products.filter(product => product.category === category);
    productListContainerHTML.innerHTML = '';
    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const newFilteredProduct = document.createElement('div');
        newFilteredProduct.classList.add('productItem');
        newFilteredProduct.innerHTML = `
          <img src="${product.img}" alt="${product.alt}">
          <h3 id="name">${product.name}</h3>
          <h3 id="category">${product.category}</h3>
          <h3 id="price">${product.price}</h3>
          <p id="description">${product.desc}</p>
          <button type="button" data-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
        `;
        productListContainerHTML.appendChild(newFilteredProduct);
      })
    }
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id)
        const product = products.find(item => item.id === productId);
        addToCart(product);
        localStorage.setItem('cart', JSON.stringify(carts));
      })
    })
  })
})

/// display i tame in shoping cart 
const cartsContainerHTML = document.querySelector('.cartList');
const displayCart = () => {
  cartsContainerHTML.innerHTML = '';
  if (carts.length > 0) {
    carts.forEach((cart) => {
      const newCart = document.createElement('div');
      newCart.classList.add('cartItem');
      newCart.innerHTML = `
        <div class="image">
          <img src="${cart.img}" alt="${cart.alt}">
        </div>
        <div class="name">
          <h3 id="cartItemName">${cart.name}</h3>
        </div>
        <div class="price">
          <p><span id="cartItemPrice">${cart.price}</span></p>
        </div>
        <div class="remove">
          <i data-id="${cart.id}" class="fa fa-trash" aria-hidden="true"></i>
        </div>
        <div class="itemControl">
          <i data-id="${cart.id}"  class="fa fa-chevron-up" aria-hidden="true"></i>
          <span data-id="${cart.id}" id="cartItemQuantity">${cart.quantity}</span>
          <i data-id="${cart.id}" class="fa fa-chevron-down" aria-hidden="true"></i>
        </div>
      `;
      cartsContainerHTML.appendChild(newCart);
    });
  } else {
    cartsContainerHTML.innerHTML = `
    <div 
    class="cart-empty"
    style="text-align: center; padding: 20px;">
    <h2>Your cart is empty</h2>
    <p>Start shopping by adding items to your cart.</p>
    </div>
    `;
  }
};

/// remove from cart 
cartsContainerHTML.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-trash') || e.target.parentElement.classList.contains('fa-trash')) {
    const productId = parseInt(e.target.dataset.id || e.target.parentElement.dataset.id)
    carts.forEach(item => {
      if(item.id === productId){
        carts = carts.filter(item => item.id!== productId);
      }
    })
    localStorage.setItem('cart', JSON.stringify(carts));
    displayCart();
    updateCartCounter();
    updateTotalPrice();
  }
})

//// quantity hin zufügen
cartsContainerHTML.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-chevron-up') || e.target.parentElement.classList.contains('fa-chevron-up')){
    const productId = parseInt(e.target.dataset.id || e.target.parentElement.dataset.id)
    carts.forEach(item => {
      if(item.id === productId){
        item.quantity += 1;
      }
    })   
    localStorage.setItem('cart', JSON.stringify(carts));
    displayCart();
    updateCartCounter();
    updateTotalPrice();
  }
})

// quantity abziehen
cartsContainerHTML.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-chevron-down') || e.target.parentElement.classList.contains('fa-chevron-down')) {
    const productId = parseInt(e.target.dataset.id || e.target.parentElement.dataset.id)
    carts.forEach(item => {
      if(item.id === productId && item.quantity > 0){
        item.quantity -= 1;
      }
      if(item.quantity === 0){
        carts = carts.filter(item => item.id!== productId);
      }
    })
    localStorage.setItem('cart', JSON.stringify(carts));
    displayCart();
    updateCartCounter();
    updateTotalPrice();
  }
})

 /// udaten cart icon counter 
const updateCartCounter = () => {
  const cartIconCounter = document.querySelector('.cart-count');
  if (!cartIconCounter) {
    console.error('Cart icon counter element not found');
    return;
  }

  let cartCount = carts.reduce((total, item) => {
    if (typeof item.quantity === 'number' && !isNaN(item.quantity)) {
      return total += item.quantity;
    } else {
      console.error(`Invalid quantity for product ${item.id}: ${item.quantity}`);
      return total;
    }
  }, 0);

  cartIconCounter.textContent = cartCount;
  if (cartCount === 0) {
    cartIconCounter.style.display = 'none';
  } else {
    cartIconCounter.style.display = 'block';
  }

  localStorage.setItem('cart-count', JSON.stringify(cartIconCounter.textContent));
  localStorage.setItem('cart', JSON.stringify(carts));
  displayCart();
};


/// add to cart 
const addToCart = (product) => {
  const existingProduct = carts.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    carts.push({...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(carts));
  updateTotalPrice();
  updateCartCounter();
  displayCart();
};


 /// updating total price 
const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector('.totalPrice');
 
  let total = 0;
  carts.forEach(item => {
    let price = parseFloat(item.price.replace('$', ''));
    if (!isNaN(price) && typeof item.quantity === 'number') {
      total += price * item.quantity;
    } else {
      console.error('Invalid price or quantity:', item.price, item.quantity);
    }
  });

  totalPriceElement.textContent = total.toFixed(2);
  localStorage.setItem('cart', JSON.stringify(carts));
  localStorage.setItem('totalPrice', JSON.stringify(totalPriceElement.textContent));
  updateCartCounter();
};



// clear cart button
  const clearAll = document.querySelector('.clear-cart-btn')
  clearAll.addEventListener('click', () => {
    clearAllItem();
});

const clearAllItem = () => {
  carts = [];
  localStorage.removeItem('cart');
  localStorage.removeItem('cart-count');
  localStorage.removeItem('totalPrice');
  displayCart();
  updateCartCounter();
  updateTotalPrice();
  localStorage.setItem('cart', JSON.stringify(carts.length));
  localStorage.setItem('cart-count', JSON.stringify(cartIconCounter.textContent));
}


// fetch product data from json file
const productData = () => {
  fetch('/JSON/productLists.json')
  .then(res => res.json())
  .then(data => {
    products = data
    displayProduct(products)
    displayCart(carts);
    updateCartCounter();
    updateTotalPrice();
    localStorage.setItem('listOfProducts', JSON.stringify(products));
    localStorage.setItem('cart', JSON.stringify(carts));
    localStorage.setItem('cart-count', JSON.stringify(cartIconCounter.textContent));
    updateTotalPrice();
  })
}

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