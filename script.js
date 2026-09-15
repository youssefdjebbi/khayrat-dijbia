// ===========================
// Global Variables
// ===========================
let currentProduct = null;
let currentQuantity = 1;
let filteredProducts = PRODUCTS;

// ===========================
// DOM Elements
// ===========================
const productsGrid = document.getElementById('productsGrid');
const filterBar = document.getElementById('filterBar');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalProductName = document.getElementById('modalProductName');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalOldPrice = document.getElementById('modalOldPrice');
const modalDiscount = document.getElementById('modalDiscount');
const qtyValue = document.getElementById('qtyValue');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const modalTotal = document.getElementById('modalTotal');
const modalOrderBtn = document.getElementById('modalOrderBtn');
const headerWhatsapp = document.getElementById('headerWhatsapp');
const stickyWhatsapp = document.getElementById('stickyWhatsapp');

// ===========================
// Initialization
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initializeStore();
  renderProducts(PRODUCTS);
  setupEventListeners();
  updateFooter();
});

// ===========================
// Store Initialization
// ===========================
function initializeStore() {
  // Update store name
  document.querySelectorAll('.js-store-name').forEach(el => {
    el.textContent = STORE_CONFIG.storeName;
  });

  // Setup WhatsApp links
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  headerWhatsapp.href = whatsappUrl;
  stickyWhatsapp.href = whatsappUrl;

  // Update contact info
  const contactPhone = document.getElementById('contactPhone');
  const contactEmail = document.getElementById('contactEmail');
  const contactAddress = document.getElementById('contactAddress');

  if (STORE_CONFIG.contact.phone) {
    contactPhone.href = `tel:${STORE_CONFIG.contact.phone}`;
    contactPhone.textContent = STORE_CONFIG.contact.phone;
  } else {
    document.getElementById('contactPhoneRow').style.display = 'none';
  }

  if (STORE_CONFIG.contact.email) {
    contactEmail.href = `mailto:${STORE_CONFIG.contact.email}`;
    contactEmail.textContent = STORE_CONFIG.contact.email;
  } else {
    document.getElementById('contactEmailRow').style.display = 'none';
  }

  if (STORE_CONFIG.contact.address) {
    contactAddress.textContent = STORE_CONFIG.contact.address;
  } else {
    document.getElementById('contactAddressRow').style.display = 'none';
  }

  // Update delivery, payment, hours
  document.getElementById('contactDelivery').textContent = STORE_CONFIG.delivery;
  document.getElementById('contactPayment').textContent = STORE_CONFIG.paymentMethod;
  document.getElementById('contactHours').textContent = STORE_CONFIG.businessHours;

  // Update social links
  const socialFacebook = document.getElementById('socialFacebook');
  const socialInstagram = document.getElementById('socialInstagram');
  const socialTiktok = document.getElementById('socialTiktok');

  if (STORE_CONFIG.social.facebook) {
    socialFacebook.href = STORE_CONFIG.social.facebook;
  } else {
    socialFacebook.style.display = 'none';
  }

  if (STORE_CONFIG.social.instagram) {
    socialInstagram.href = STORE_CONFIG.social.instagram;
  } else {
    socialInstagram.style.display = 'none';
  }

  if (STORE_CONFIG.social.tiktok) {
    socialTiktok.href = STORE_CONFIG.social.tiktok;
  } else {
    socialTiktok.style.display = 'none';
  }

  // Hide social section if all are hidden
  if (!STORE_CONFIG.social.facebook && !STORE_CONFIG.social.instagram && !STORE_CONFIG.social.tiktok) {
    document.getElementById('footerSocialRow').style.display = 'none';
  }

  // Update year in footer
  document.getElementById('footerYear').textContent = new Date().getFullYear();
}

// ===========================
// Product Rendering
// ===========================
function renderProducts(products) {
  productsGrid.innerHTML = '';

  if (products.length === 0) {
    productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">لا توجد منتجات</p>';
    return;
  }

  products.forEach(product => {
    const card = createProductCard(product);
    productsGrid.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-pricing">
        <span class="price-now">${formatPrice(product.price)}</span>
        ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
        ${product.discount ? `<span class="price-discount">-${product.discount}%</span>` : ''}
      </div>
    </div>
  `;

  card.addEventListener('click', () => openProductModal(product));
  return card;
}

// ===========================
// Filtering
// ===========================
function setupEventListeners() {
  // Filter buttons
  const filterButtons = filterBar.querySelectorAll('.filter-chip');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      const filter = button.dataset.filter;
      applyFilter(filter);
    });
  });

  // Modal controls
  modalClose.addEventListener('click', closeProductModal);
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeProductModal();
    }
  });

  // Quantity controls
  qtyMinus.addEventListener('click', () => {
    if (currentQuantity > 0.5) {
      currentQuantity -= 0.5;
      updateQuantityDisplay();
    }
  });

  qtyPlus.addEventListener('click', () => {
    currentQuantity += 0.5;
    updateQuantityDisplay();
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (productModal.classList.contains('is-active')) {
      if (e.key === 'Escape') closeProductModal();
    }
  });
}

function applyFilter(filter) {
  if (filter === 'all') {
    filteredProducts = PRODUCTS;
  } else if (filter === 'deals') {
    filteredProducts = PRODUCTS.filter(p => p.oldPrice !== null);
  }
  renderProducts(filteredProducts);
}

// ===========================
// Modal Management
// ===========================
function openProductModal(product) {
  currentProduct = product;
  currentQuantity = 1;

  modalImg.src = product.image;
  modalImg.alt = product.name;
  modalProductName.textContent = product.name;
  modalCategory.textContent = product.category;
  modalPrice.textContent = formatPrice(product.price);

  if (product.oldPrice) {
    modalOldPrice.textContent = formatPrice(product.oldPrice);
    modalOldPrice.style.display = 'inline';
  } else {
    modalOldPrice.style.display = 'none';
  }

  if (product.discount) {
    modalDiscount.textContent = `-${product.discount}%`;
    modalDiscount.style.display = 'inline';
  } else {
    modalDiscount.style.display = 'none';
  }

  updateQuantityDisplay();
  updateModalTotal();
  updateOrderButton();

  productModal.classList.add('is-active');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModal.classList.remove('is-active');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
  currentProduct = null;
}

// ===========================
// Quantity & Total
// ===========================
function updateQuantityDisplay() {
  qtyValue.textContent = currentQuantity.toFixed(1);
  updateModalTotal();
  updateOrderButton();
}

function updateModalTotal() {
  if (currentProduct) {
    const total = currentProduct.price * currentQuantity;
    modalTotal.textContent = formatPrice(total);
  }
}

// ===========================
// Order Generation
// ===========================
function updateOrderButton() {
  if (!currentProduct) return;

  const total = (currentProduct.price * currentQuantity).toFixed(2);
  const message = `مرحبا، أود طلب:\n\n${currentProduct.name}\nالكمية: ${currentQuantity.toFixed(1)} كغ\nالسعر الإجمالي: ${total} دينار تونسي\n\nشكراً`;

  const encodedMessage = encodeURIComponent(message);
  modalOrderBtn.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

// ===========================
// Utilities
// ===========================
function formatPrice(price) {
  return `${price.toFixed(2)} د.ت`;
}

function updateFooter() {
  const deliveryText = document.getElementById('contactDelivery');
  const paymentText = document.getElementById('contactPayment');
  const hoursText = document.getElementById('contactHours');

  deliveryText.textContent = STORE_CONFIG.delivery;
  paymentText.textContent = STORE_CONFIG.paymentMethod;
  hoursText.textContent = STORE_CONFIG.businessHours;
}

// ===========================
// Accessibility
// ===========================
document.addEventListener('click', (e) => {
  if (e.target.closest('.product-card')) {
    const card = e.target.closest('.product-card');
    card.focus();
  }
});