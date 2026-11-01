
// COOKIE HAVEN WEBSITE

// 1. COOKIE PRODUCTS
const products = [
  {
    id: 1,
    name: "Chocolate Chip",
    description: "Classic cookie filled with chocolate chips.",
    price: 45,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600"
  },
  {
    id: 2,
    name: "Red Velvet",
    description: "Soft red velvet cookie with a sweet flavor.",
    price: 50,
    image: "https://images.unsplash.com/photo-1610149620371-3535e9f0d5d7?w=600"
  },
  {
    id: 3,
    name: "Double Chocolate",
    description: "A rich and delicious chocolate cookie.",
    price: 55,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
  },
  {
    id: 4,
    name: "Butter Cookies",
    description: "A simple, sweet, and buttery treat.",
    price: 40,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600"
  }
];

// 2. CART
let cart = [];

// 3. DISPLAY PRODUCTS
const productGrid = document.getElementById("productGrid");

function displayProducts() {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = `₱${product.price.toFixed(2)}`;

    const button = document.createElement("button");
    button.className = "add-button";
    button.textContent = "Add to Cart";

    button.addEventListener("click", () => {
      addToCart(product.id);
    });

    info.append(name, description, price, button);
    card.append(image, info);
    productGrid.appendChild(card);
  });
}

// 4. ADD PRODUCTS TO CART
function addToCart(productId) {
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  updateCart();
}

// 5. REMOVE PRODUCTS
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// 6. UPDATE CART
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is currently empty.";
  }

  cart.forEach((item) => {
    const product = products.find(p => p.id === item.id);

    const subtotal = product.price * item.quantity;

    total += subtotal;
    count += item.quantity;

    const row = document.createElement("div");
    row.className = "cart-row";

    const details = document.createElement("span");
    details.textContent =
      `${product.name} × ${item.quantity} = ₱${subtotal.toFixed(2)}`;

    const remove = document.createElement("button");
    remove.className = "remove-button";
    remove.textContent = "Remove";

    remove.addEventListener("click", () => {
      removeFromCart(item.id);
    });

    row.append(details, remove);
    cartItems.appendChild(row);
  });

  cartCount.textContent = count;
  cartTotal.textContent = `₱${total.toFixed(2)}`;
}

// 7. CART BUTTON
document.getElementById("cartButton").addEventListener("click", () => {
  document.getElementById("cart").scrollIntoView({
    behavior: "smooth"
  });
});

// 8. SAMPLE ORDER
document.getElementById("orderButton").addEventListener("click", () => {
  const message = document.getElementById("orderMessage");

  if (cart.length === 0) {
    message.textContent = "Please add a cookie before placing an order.";
    return;
  }

  message.textContent =
    "Your sample order has been completed! Thank you for visiting Cookie Haven.";

  cart = [];
  updateCart();
});

// 9. CURRENT YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();

// START THE WEBSITE
displayProducts();
updateCart();
