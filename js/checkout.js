const cartItemsDiv = document.getElementById('cart-items');
const totalPriceSpan = document.getElementById('total-price');
const remainingCreditSpan = document.getElementById('remaining-credit');
const purchaseBtn = document.getElementById('purchase-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let credit = parseInt(localStorage.getItem('credit')) || 500;
let total = 0;

function renderCart() {
  credit = parseInt(localStorage.getItem('credit')) || 500;
  cartItemsDiv.innerHTML = '';
  total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'checkout-item';
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.price;
  });

  totalPriceSpan.textContent = total;
  remainingCreditSpan.textContent = credit - total;
}

purchaseBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const updatedCredit = credit - total;
  if (updatedCredit < 0) {
    alert("Not enough credit!");
    return;
  }

  const user_email = prompt("📧 Please enter your email to receive the receipt:");

  if (!user_email) {
    alert("Email is required to complete the purchase.");
    return;
  }

  // Fake receipt confirmation
  cartItemsDiv.innerHTML = `
    <p style="font-size: 1.2em; color: #00ffcc;">
      ✅ Thank you for your purchase!<br/>
      A receipt has been successfully sent to <strong>${user_email}</strong>.
    </p>
  `;

  totalPriceSpan.textContent = 0;
  credit = updatedCredit;
  localStorage.setItem('credit', credit);
  remainingCreditSpan.textContent = credit;
  localStorage.removeItem('cart');
  cart = [];
});

// Reset Credit Button functionality
const resetCreditBtn = document.getElementById('reset-credit-btn');
if (resetCreditBtn) {
  resetCreditBtn.addEventListener('click', () => {
    credit = 500;
    localStorage.setItem('credit', credit);
    remainingCreditSpan.textContent = credit - total;
    alert("Credit has been reset to $500.");
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// 👇 Call it on load
renderCart();