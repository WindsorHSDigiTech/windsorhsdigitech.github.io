let cart = [];

// DOM Elements
const shopPage = document.getElementById('shop-page');
const cartPage = document.getElementById('cart-page');
const navShopBtn = document.getElementById('nav-shop-btn');
const navCartBtn = document.getElementById('nav-cart-btn');

// --- 1. PAGE TABS TOGGLING SYSTEM ---
navShopBtn.addEventListener('click', () => {
  shopPage.classList.remove('hidden');
  cartPage.classList.add('hidden');
  navShopBtn.classList.add('active');
  navCartBtn.classList.remove('active');
});

navCartBtn.addEventListener('click', () => {
  cartPage.classList.remove('hidden');
  shopPage.classList.add('hidden');
  navCartBtn.classList.add('active');
  navShopBtn.classList.remove('active');
  renderCart(); // Refresh view
});


// --- 2. ADD TO CART LOGIC ---
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const id = card.getAttribute('data-id');
    const name = card.getAttribute('data-name');
    const price = parseFloat(card.getAttribute('data-price'));

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    updateCartCount();

    // Feedback visual
    button.textContent = "Added! ✨";
    setTimeout(() => { button.textContent = "Add to Cart 🛍️"; }, 800);
  });
});


// --- 3. RENDER CART LOGIC ---
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

function renderCart() {
  const listContainer = document.getElementById('cart-items-list');
  listContainer.innerHTML = '';

  if (cart.length === 0) {
    listContainer.innerHTML = '<p style="padding:20px;">Your cart is empty! 🎈</p>';
    document.getElementById('summary-qty').textContent = '0';
    document.getElementById('summary-price').textContent = '$0.00';
    return;
  }

  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalQty += item.quantity;
    totalPrice += (item.price * item.quantity);

    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <small>$${item.price.toFixed(2)}</small>
      </div>
      <div>
        <button class="qty-btn" onclick="window.changeQty(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" onclick="window.changeQty(${index}, 1)">+</button>
      </div>
      <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
    `;
    listContainer.appendChild(row);
  });

  document.getElementById('summary-qty').textContent = totalQty;
  document.getElementById('summary-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Make changeQty accessible to JSFiddle dynamic buttons
window.changeQty = function(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCartCount();
  renderCart();
};

document.getElementById('clear-btn').addEventListener('click', () => {
  cart = [];
  updateCartCount();
  renderCart();
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  alert("Please go to the TAS office and order those product names");
});


