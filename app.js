const products = [
  {
    id: "nano-dock",
    name: "Nano Work Dock",
    category: "Hardware",
    price: 89,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
    description: "A compact USB-C dock for small workstations and edge AI benches."
  },
  {
    id: "quiet-keys",
    name: "Quiet Keys",
    category: "Desk",
    price: 124,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
    description: "Low-profile mechanical keys for late-night coding sessions."
  },
  {
    id: "thermal-stand",
    name: "Thermal Stand",
    category: "Hardware",
    price: 58,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    description: "A ventilated aluminum riser for laptops and mini workstations."
  },
  {
    id: "field-notes",
    name: "Build Notes Kit",
    category: "Planning",
    price: 32,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    description: "Project notebooks and cards for release planning and QA passes."
  },
  {
    id: "cable-grid",
    name: "Cable Grid",
    category: "Desk",
    price: 27,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    description: "Reusable cable tags and rails for keeping prototype desks readable."
  },
  {
    id: "starter-pack",
    name: "Maker Starter Pack",
    category: "Planning",
    price: 149,
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80",
    description: "A bundled kit for documenting, staging, and shipping small products."
  }
];

const state = {
  category: "All",
  query: "",
  cart: new Map()
};

const productGrid = document.querySelector("#productGrid");
const filters = document.querySelector("#filters");
const searchInput = document.querySelector("#searchInput");
const cartButton = document.querySelector("#cartButton");
const cartDrawer = document.querySelector("#cartDrawer");
const closeCart = document.querySelector("#closeCart");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function categories() {
  return ["All", ...new Set(products.map((product) => product.category))];
}

function filteredProducts() {
  return products.filter((product) => {
    const matchesCategory = state.category === "All" || product.category === state.category;
    const matchesQuery = `${product.name} ${product.description} ${product.category}`
      .toLowerCase()
      .includes(state.query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
}

function renderFilters() {
  filters.innerHTML = categories()
    .map((category) => {
      const active = category === state.category ? " active" : "";
      return `<button class="filter-button${active}" type="button" data-category="${category}">${category}</button>`;
    })
    .join("");
}

function renderProducts() {
  const visibleProducts = filteredProducts();
  productGrid.innerHTML = visibleProducts.length
    ? visibleProducts.map(productCard).join("")
    : `<p>No products match this search.</p>`;
}

function productCard(product) {
  return `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-body">
        <div class="product-meta">
          <span>${product.category}</span>
          <span>In stock</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-action">
          <span class="price">${money.format(product.price)}</span>
          <button class="add-button" type="button" data-product="${product.id}">Add</button>
        </div>
      </div>
    </article>
  `;
}

function addToCart(productId) {
  const current = state.cart.get(productId) || 0;
  state.cart.set(productId, current + 1);
  renderCart();
}

function changeQuantity(productId, delta) {
  const next = (state.cart.get(productId) || 0) + delta;
  if (next <= 0) {
    state.cart.delete(productId);
  } else {
    state.cart.set(productId, next);
  }
  renderCart();
}

function renderCart() {
  const entries = [...state.cart.entries()];
  const totalQuantity = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  const total = entries.reduce((sum, [productId, quantity]) => {
    const product = products.find((item) => item.id === productId);
    return sum + product.price * quantity;
  }, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = money.format(total);
  cartItems.innerHTML = entries.length ? entries.map(cartItem).join("") : `<p>Your cart is empty.</p>`;
}

function cartItem([productId, quantity]) {
  const product = products.find((item) => item.id === productId);
  return `
    <article class="cart-item">
      <div>
        <h3>${product.name}</h3>
        <p>${money.format(product.price)} each</p>
      </div>
      <div class="qty" aria-label="Quantity controls for ${product.name}">
        <button class="qty-button" type="button" data-qty="-1" data-product="${product.id}">-</button>
        <strong>${quantity}</strong>
        <button class="qty-button" type="button" data-qty="1" data-product="${product.id}">+</button>
      </div>
    </article>
  `;
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderFilters();
  renderProducts();
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-product]");
  if (!button) return;
  addToCart(button.dataset.product);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-qty]");
  if (!button) return;
  changeQuantity(button.dataset.product, Number(button.dataset.qty));
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderProducts();
});

cartButton.addEventListener("click", () => {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
});

closeCart.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
});

cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  }
});

renderFilters();
renderProducts();
renderCart();
