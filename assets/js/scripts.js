// Open Mini Cart
const miniCart = document.querySelector('#js-mini-cart');

let enableMiniCartTap = function() {
  if (screen.width <= 767) {

    miniCart.onclick = function() {
      this.closest('li').classList.toggle('dropdown-open');
    }
  }
}

enableMiniCartTap();

window.onresize = function() {
  enableMiniCartTap();
}


// Choose Sizes
const sizes = document.querySelectorAll('.js-size .box');
let sizePick = document.querySelector('.size-pick');

for (size of sizes) {
  size.onclick = function() {

    sizes.forEach(function(e) {
      e.classList.remove('selected');
    });

    this.classList.add('selected');
    sizePick.innerHTML = this.innerHTML;
  }
}

// Set Default Cart Content
let defaultCart = [
  { size: 'S'},
  { size: 'L'}
];

localStorage.setItem('cart', JSON.stringify(defaultCart));

// Get Cart Content
let cart = localStorage.getItem('cart');
cart = JSON.parse(cart);

// Add To Cart
const addToCart = document.querySelector('#js-add-to-cart');

addToCart.onclick = function() {
  // get selected size
  if (sizePick.innerHTML == '') {
    alert('Please select size');
    sizes.forEach(function(e) {
      e.classList.add('border-danger');

      setTimeout(function() {
        e.classList.remove('border-danger');
      },500);
    });
  } else {
    // add to cart
    cart.push({ size: sizePick.innerHTML });
    localStorage.setItem('cart', JSON.stringify(cart));

    fetchCart();
  }
}

// Fetch Cart
let fetchCart = function() {
  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart);

  // set cart item count
  document.querySelector('#js-cart-item-count').innerHTML = ' ( ' + cart.length + ' ) ';

  let itemHTML = '';

  let item = function(count, size) {
    return `
      <li>
        <div class="d-flex">
          <div>
            <img src="assets/images/classic-tee.jpg">
          </div>
          <div>
            <h4>Classic Tee</h4>
            <p>${count}x <strong>$75.00</strong></p>
            <p>Size: ${size}</p>
          </div>
        </div>
      </li>
    `;
  }

  let s, m, l;
  [s,m,l] = [0,0,0];

  // items
  cart.forEach((item, i) => {
    if ( item.size == 'S' ) s++;
    if ( item.size == 'M' ) m++;
    if ( item.size == 'L' ) l++;
  });

  if ( s != 0 ) { itemHTML += item(s,'S') }
  if ( m != 0 ) { itemHTML += item(m,'M') }
  if ( l != 0 ) { itemHTML += item(l,'L') }

  document.querySelector('#js-display-items').innerHTML = itemHTML;
}

fetchCart();
