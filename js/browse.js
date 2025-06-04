const gameList = document.getElementById('game-list');
const creditDisplay = document.getElementById('credit');

let credit = localStorage.getItem('credit') ? parseInt(localStorage.getItem('credit')) : 500;
creditDisplay.textContent = credit;

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(game) {
  if (credit < game.price) {
    alert("Not enough credit!");
    return;
  }
  cart.push(game);
  credit -= game.price;

  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('credit', credit);
  creditDisplay.textContent = credit;

  alert(`${game.name} added to cart!`);
  location.reload(); // To re-render button state
}

games.forEach((game, index) => {
  const card = document.createElement('div');
  card.className = 'game-card';

  const inCart = cart.some(item => item.id === game.id);
  const buttonText = inCart ? 'Remove from Cart' : 'Add to Cart';
  const buttonAction = inCart
    ? `removeFromCart(${index})`
    : `addToCart(${JSON.stringify(game)})`;

  card.innerHTML = `
    <img src="${game.image}" alt="${game.name}" />
    <h3>${game.name}</h3>
    <p>Price: $${game.price}</p>
    <button onclick='${buttonAction}'>${buttonText}</button>
  `;
  gameList.appendChild(card);
});

function removeFromCart(index) {
  const removedGame = cart.splice(index, 1)[0];
  credit += removedGame.price;
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('credit', credit);
  creditDisplay.textContent = credit;
  alert(`${removedGame.name} removed from cart!`);
  location.reload(); // To re-render button state
}