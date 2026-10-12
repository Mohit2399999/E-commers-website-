/**
 * NEXUS TECH - Main Application Controller
 * Handles UI interactions, filtering, search, modals, drawers, themes & checkout
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initHeroCarousel();
  initCategoryPills();
  initEventListeners();
  renderProducts();
  renderTestimonials();
  initDealCountdown();
  syncCartUI();
  syncWishlistUI();
});

// Global UI State
let currentCategory = "all";
let currentSearchTerm = "";
let currentMaxPrice = 2500;
let currentSort = "featured";
let currentSlideIndex = 0;
let heroSlideTimer = null;
let currentQuickViewProduct = null;
let selectedQVColor = null;
let selectedPaymentMethod = "card";
let activeOrderData = null;

// ==========================================================================
// 1. Theme Management (Dark / Light)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem("nexus_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = activeTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("nexus_theme", newTheme);
      updateThemeIcon(newTheme);
      showToast("Theme Updated", `Switched to ${newTheme} mode`, "info");
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (!icon) return;
  if (theme === "dark") {
    icon.className = "fa-solid fa-moon";
  } else {
    icon.className = "fa-solid fa-sun";
  }
}

// ==========================================================================
// 2. Hero Carousel Controller
// ==========================================================================
function initHeroCarousel() {
  const slider = document.getElementById("heroSlider");
  const dots = document.querySelectorAll("#carouselDots .dot");
  const prevBtn = document.getElementById("prevSlideBtn");
  const nextBtn = document.getElementById("nextSlideBtn");

  function goToSlide(index) {
    currentSlideIndex = (index + 2) % 2;
    if (slider) {
      slider.style.transform = `translateX(-${currentSlideIndex * 50}%)`;
    }
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlideIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { goToSlide(currentSlideIndex - 1); resetHeroTimer(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { goToSlide(currentSlideIndex + 1); resetHeroTimer(); });

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const targetIndex = parseInt(e.target.dataset.index, 10);
      goToSlide(targetIndex);
      resetHeroTimer();
    });
  });

  function startHeroTimer() {
    heroSlideTimer = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, 6500);
  }

  function resetHeroTimer() {
    clearInterval(heroSlideTimer);
    startHeroTimer();
  }

  startHeroTimer();
}

// ==========================================================================
// 3. Category Pills & Filtering
// ==========================================================================
function initCategoryPills() {
  const container = document.getElementById("categoryPillsBar");
  if (!container) return;

  container.innerHTML = PRODUCT_CATEGORIES.map(cat => {
    const isActive = cat.id === currentCategory ? "active" : "";
    return `
      <button type="button" class="category-pill ${isActive}" data-category="${cat.id}" onclick="filterByCategory('${cat.id}')">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.label}</span>
        ${isActive ? '<span class="active-dot"></span>' : ''}
      </button>
    `;
  }).join("");
}

function filterByCategory(categoryId) {
  currentCategory = categoryId;
  initCategoryPills();
  renderProducts();

  // Scroll to catalog section if not in view
  const catalogSection = document.getElementById("catalog");
  if (catalogSection && window.scrollY < catalogSection.offsetTop - 120) {
    catalogSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================================================================
// 4. Products Catalog Rendering & Logic
// ==========================================================================
function getFilteredAndSortedProducts() {
  let list = [...PRODUCTS_DATA];

  const hasSearch = currentSearchTerm.trim().length > 0;
  if (hasSearch) {
    const q = currentSearchTerm.toLowerCase();
    const searchedList = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
    if (searchedList.length > 0) {
      if (currentCategory !== "all") {
        const inCat = searchedList.filter(p => p.category === currentCategory);
        list = inCat.length > 0 ? inCat : searchedList;
      } else {
        list = searchedList;
      }
    } else {
      list = [];
    }
  } else {
    if (currentCategory !== "all") {
      list = list.filter(p => p.category === currentCategory);
    }
  }

  // Price Range
  list = list.filter(p => p.price <= currentMaxPrice);

  // Sorting
  switch (currentSort) {
    case "price-low":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      list.sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) : 0;
        return discB - discA;
      });
      break;
    default:
      // Featured: default order
      break;
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const countDisplay = document.getElementById("itemsCountDisplay");
  if (!grid) return;

  const products = getFilteredAndSortedProducts();

  if (countDisplay) {
    countDisplay.textContent = `Showing ${products.length} of ${PRODUCTS_DATA.length} products`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="no-products-msg">
        <i class="fa-solid fa-box-open"></i>
        <h3 style="font-family: var(--font-brand); margin-bottom: 0.5rem;">No Products Match Your Criteria</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Try adjusting your search keywords, price slider, or category filters.</p>
        <button type="button" class="btn-primary" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(product => {
    const discountPercent = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
      : 0;

    const inWishlist = window.nexusCart.isInWishlist(product.id);

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-image-wrap" onclick="quickViewProduct(${product.id})" style="cursor: pointer;">
          <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy">
          
          ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ""}
          ${discountPercent > 0 ? `<span class="card-badge badge-discount" style="top: ${product.badge ? '2.7rem' : '1rem'}">-${discountPercent}%</span>` : ""}
          
          <div class="card-floating-actions" onclick="event.stopPropagation()">
            <button type="button" class="action-round-btn ${inWishlist ? 'in-wishlist' : ''}" 
              onclick="toggleWishlistAction(${product.id})" 
              title="${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}"
              aria-label="Wishlist">
              <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            <button type="button" class="action-round-btn" 
              onclick="quickViewProduct(${product.id})" 
              title="Quick Specifications View"
              aria-label="Quick View">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
        </div>

        <div class="card-body">
          <span class="card-category">${product.categoryLabel}</span>
          <h3 class="card-title" onclick="quickViewProduct(${product.id})">${product.name}</h3>
          <p class="card-tagline">${product.tagline}</p>

          <div class="card-rating-wrap">
            <div class="stars-list">
              ${renderStarRating(product.rating)}
            </div>
            <span class="rating-num">${product.rating.toFixed(1)}</span>
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>

          <div class="card-footer">
            <div class="card-price-box">
              <div class="price-current">$${product.price.toFixed(2)}</div>
              ${product.originalPrice ? `<span class="price-old">$${product.originalPrice.toFixed(2)}</span>` : ""}
            </div>

            <button type="button" class="btn-add-cart" onclick="quickAddToCart(${product.id})">
              <i class="fa-solid fa-plus"></i> Add
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderStarRating(rating) {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += `<i class="fa-solid fa-star"></i>`;
    } else if (i === fullStars && hasHalf) {
      stars += `<i class="fa-solid fa-star-half-stroke"></i>`;
    } else {
      stars += `<i class="fa-regular fa-star"></i>`;
    }
  }
  return stars;
}

// ==========================================================================
// 5. Cart Management & Drawer UI
// ==========================================================================
function quickAddToCart(productId) {
  const success = window.nexusCart.addItem(productId, 1);
  if (success) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    showToast("Added to Cart", `${product ? product.name : 'Item'} added to shopping bag.`, "success");
    animateCartIconBadge();
    syncCartUI();
  }
}

function animateCartIconBadge() {
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.classList.add("bounce");
    setTimeout(() => badge.classList.remove("bounce"), 350);
  }
}

function syncCartUI() {
  const totalCount = window.nexusCart.getTotalItemsCount();
  const summary = window.nexusCart.getSummary();
  const detailedItems = window.nexusCart.getDetailedCartItems();

  // Update Badges
  const cartBadge = document.getElementById("cartCountBadge");
  const drawerCount = document.getElementById("cartDrawerItemCount");
  if (cartBadge) {
    cartBadge.textContent = totalCount;
    cartBadge.style.display = totalCount > 0 ? "flex" : "none";
  }
  if (drawerCount) drawerCount.textContent = totalCount;

  // Free shipping meter
  const meterText = document.getElementById("shippingMeterText");
  const meterPercent = document.getElementById("shippingMeterPercent");
  const meterFill = document.getElementById("shippingMeterFill");
  
  if (summary.amountNeededForFreeShipping === 0) {
    if (meterText) meterText.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--success);"></i> You unlocked <strong>FREE Express Shipping</strong>!`;
    if (meterPercent) meterPercent.textContent = "100%";
    if (meterFill) meterFill.style.width = "100%";
  } else {
    if (meterText) meterText.innerHTML = `Add <strong>$${summary.amountNeededForFreeShipping.toFixed(2)}</strong> more for Free Shipping`;
    if (meterPercent) meterPercent.textContent = `${summary.freeShippingProgress}%`;
    if (meterFill) meterFill.style.width = `${summary.freeShippingProgress}%`;
  }

  // Render Items List
  const itemsContainer = document.getElementById("cartItemsList");
  const checkoutBtn = document.getElementById("checkoutTriggerBtn");

  if (!itemsContainer) return;

  if (detailedItems.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-cart-arrow-down" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 1rem;"></i>
        <h4>Your Shopping Cart is Empty</h4>
        <p style="font-size: 0.825rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">Discover our latest tech releases and gear up today.</p>
        <button type="button" class="btn-primary" onclick="closeCartDrawer(); filterByCategory('all');">Explore Shop</button>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    if (checkoutBtn) checkoutBtn.disabled = false;
    itemsContainer.innerHTML = detailedItems.map(item => `
      <div class="cart-item-card">
        <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.product.name}</h4>
          ${item.selectedColor ? `
            <div class="cart-item-variant">
              <span>Color:</span>
              <span class="color-dot-mini" style="background-color: ${item.selectedColor};"></span>
            </div>
          ` : ''}
          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button type="button" class="qty-btn" onclick="modifyCartQty(${item.id}, ${item.quantity - 1}, '${item.selectedColor}')">-</button>
              <span class="qty-display">${item.quantity}</span>
              <button type="button" class="qty-btn" onclick="modifyCartQty(${item.id}, ${item.quantity + 1}, '${item.selectedColor}')">+</button>
            </div>
            <div class="cart-item-price">$${item.lineTotal.toFixed(2)}</div>
            <button type="button" class="cart-item-remove" onclick="removeCartItem(${item.id}, '${item.selectedColor}')" title="Remove item">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Update Summary Figures
  const subtotalEl = document.getElementById("cartSubtotalVal");
  const discountRow = document.getElementById("discountRow");
  const discountEl = document.getElementById("cartDiscountVal");
  const shippingEl = document.getElementById("cartShippingVal");
  const taxEl = document.getElementById("cartTaxVal");
  const totalEl = document.getElementById("cartTotalVal");

  if (subtotalEl) subtotalEl.textContent = `$${summary.subtotal.toFixed(2)}`;
  
  if (summary.discountAmount > 0) {
    if (discountRow) discountRow.style.display = "flex";
    if (discountEl) discountEl.textContent = `-$${summary.discountAmount.toFixed(2)}`;
  } else {
    if (discountRow) discountRow.style.display = "none";
  }

  if (shippingEl) shippingEl.textContent = summary.shippingCost === 0 ? "FREE" : `$${summary.shippingCost.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${summary.taxAmount.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${summary.grandTotal.toFixed(2)}`;

  // Coupon state
  const couponInputWrap = document.getElementById("couponInputWrap");
  const activeCouponTag = document.getElementById("activeCouponTag");
  const activeCouponLabel = document.getElementById("activeCouponLabel");

  if (summary.coupon) {
    if (couponInputWrap) couponInputWrap.style.display = "none";
    if (activeCouponTag) activeCouponTag.style.display = "flex";
    if (activeCouponLabel) activeCouponLabel.textContent = `Applied: ${summary.coupon.code} (${summary.coupon.label})`;
  } else {
    if (couponInputWrap) couponInputWrap.style.display = "flex";
    if (activeCouponTag) activeCouponTag.style.display = "none";
  }
}

function modifyCartQty(id, qty, color) {
  window.nexusCart.updateQuantity(id, qty, color);
  syncCartUI();
}

function removeCartItem(id, color) {
  window.nexusCart.removeItem(id, color);
  syncCartUI();
  showToast("Item Removed", "Product removed from cart", "info");
}

function handleApplyCoupon() {
  const input = document.getElementById("couponCodeInput");
  if (!input) return;
  const result = window.nexusCart.applyCoupon(input.value);
  if (result.success) {
    showToast("Coupon Applied", result.message, "success");
    input.value = "";
    syncCartUI();
  } else {
    showToast("Invalid Promo Code", result.message, "warning");
  }
}

function handleRemoveCoupon() {
  window.nexusCart.removeCoupon();
  showToast("Coupon Removed", "Discount has been removed.", "info");
  syncCartUI();
}

function applyPromoCodeFromBanner(code) {
  const result = window.nexusCart.applyCoupon(code);
  showToast(result.success ? "Coupon Activated!" : "Promo Code Notice", result.message, result.success ? "success" : "info");
  openCartDrawer();
  syncCartUI();
}

// Drawer Open/Close controls
function openCartDrawer() {
  closeAllDrawers();
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer && backdrop) {
    drawer.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  syncCartUI();
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// 6. Wishlist Management & Drawer UI
// ==========================================================================
function toggleWishlistAction(productId) {
  const added = window.nexusCart.toggleWishlist(productId);
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (added) {
    showToast("Added to Wishlist", `${product ? product.name : 'Item'} saved to your favorites.`, "success");
  } else {
    showToast("Removed from Wishlist", `${product ? product.name : 'Item'} removed from favorites.`, "info");
  }
  syncWishlistUI();
  renderProducts(); // Refresh heart states on cards
}

function syncWishlistUI() {
  const wishlistItems = window.nexusCart.getWishlistItems();
  const badge = document.getElementById("wishlistCountBadge");
  const drawerCount = document.getElementById("wishlistDrawerItemCount");
  const listContainer = document.getElementById("wishlistItemsList");

  if (badge) {
    badge.textContent = wishlistItems.length;
    badge.style.display = wishlistItems.length > 0 ? "flex" : "none";
  }
  if (drawerCount) drawerCount.textContent = wishlistItems.length;

  if (!listContainer) return;

  if (wishlistItems.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-regular fa-heart" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 1rem;"></i>
        <h4>Your Wishlist is Empty</h4>
        <p style="font-size: 0.825rem; margin-top: 0.5rem; margin-bottom: 1.5rem;">Save your favorite gadgets here to purchase later.</p>
        <button type="button" class="btn-primary" onclick="closeWishlistDrawer(); filterByCategory('all');">Browse Products</button>
      </div>
    `;
  } else {
    listContainer.innerHTML = wishlistItems.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <span style="font-size: 0.8rem; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem;">$${item.price.toFixed(2)}</span>
          <div style="display: flex; gap: 0.5rem; margin-top: auto;">
            <button type="button" class="btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.775rem;" onclick="moveWishlistToCart(${item.id})">
              <i class="fa-solid fa-cart-plus"></i> Move to Cart
            </button>
            <button type="button" class="cart-item-remove" onclick="toggleWishlistAction(${item.id})" title="Remove from wishlist">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

function moveWishlistToCart(productId) {
  window.nexusCart.addItem(productId, 1);
  window.nexusCart.toggleWishlist(productId);
  showToast("Moved to Cart", "Product moved from wishlist to your cart.", "success");
  syncWishlistUI();
  syncCartUI();
  renderProducts();
}

function openWishlistDrawer() {
  closeAllDrawers();
  const drawer = document.getElementById("wishlistDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer && backdrop) {
    drawer.classList.add("active");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  syncWishlistUI();
}

function closeWishlistDrawer() {
  const drawer = document.getElementById("wishlistDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) drawer.classList.remove("active");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

function closeAllDrawers() {
  closeCartDrawer();
  closeWishlistDrawer();
}

// ==========================================================================
// 7. Quick View Product Modal
// ==========================================================================
function quickViewProduct(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  currentQuickViewProduct = product;
  selectedQVColor = product.colors ? product.colors[0] : null;

  const content = document.getElementById("quickViewContent");
  if (!content) return;

  const galleryThumbs = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  content.innerHTML = `
    <!-- Left: Gallery Preview -->
    <div class="qv-gallery-box">
      <div class="qv-main-img-box">
        <img src="${product.image}" id="qvMainImage" alt="${product.name}" class="qv-main-img">
      </div>
      <div class="qv-thumbs-row">
        ${galleryThumbs.map((img, idx) => `
          <img src="${img}" class="qv-thumb-img ${idx === 0 ? 'active' : ''}" onclick="switchQVImage('${img}', this)" alt="Thumbnail ${idx + 1}">
        `).join("")}
      </div>
    </div>

    <!-- Right: Specs & Buy Options -->
    <div class="qv-details-box">
      <span class="qv-tag">${product.categoryLabel}</span>
      <h2 class="qv-title">${product.name}</h2>
      
      <div class="card-rating-wrap">
        <div class="stars-list">
          ${renderStarRating(product.rating)}
        </div>
        <span class="rating-num">${product.rating.toFixed(1)}</span>
        <span class="rating-count">(${product.reviewsCount} verified reviews)</span>
      </div>

      <div class="qv-price-row">
        <span class="qv-price">$${product.price.toFixed(2)}</span>
        ${product.originalPrice ? `<span class="price-old" style="font-size: 1rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
        <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.15); color: var(--success); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-weight: 700;">
          <i class="fa-solid fa-circle-check"></i> In Stock (${product.stockCount} units)
        </span>
      </div>

      <p class="qv-desc">${product.description}</p>

      ${product.colors ? `
        <div class="qv-colors-group">
          <div class="qv-colors-label">Available Finishes:</div>
          <div class="swatches-list">
            ${product.colors.map((color, idx) => `
              <button type="button" class="color-swatch-btn ${idx === 0 ? 'selected' : ''}" onclick="selectQVColor('${color}', this)" title="Finish ${color}">
                <div class="color-swatch-inner" style="background-color: ${color};"></div>
              </button>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <!-- Specifications Table -->
      <table class="qv-specs-table">
        <tbody>
          ${Object.entries(product.specs || {}).map(([key, value]) => `
            <tr>
              <td>${key}</td>
              <td>${value}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 0.85rem; margin-top: auto;">
        <button type="button" class="btn-primary" onclick="addQVToCart(false)" style="flex: 1;">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
        <button type="button" class="btn-outline" onclick="addQVToCart(true)" style="flex: 1; border-color: var(--primary);">
          <i class="fa-solid fa-bolt"></i> Buy Now
        </button>
      </div>
    </div>
  `;

  const modal = document.getElementById("quickViewModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function switchQVImage(src, thumbElement) {
  const main = document.getElementById("qvMainImage");
  if (main) main.src = src;
  document.querySelectorAll(".qv-thumb-img").forEach(el => el.classList.remove("active"));
  if (thumbElement) thumbElement.classList.add("active");
}

function selectQVColor(color, btn) {
  selectedQVColor = color;
  document.querySelectorAll(".color-swatch-btn").forEach(el => el.classList.remove("selected"));
  if (btn) btn.classList.add("selected");
}

function addQVToCart(buyNow = false) {
  if (!currentQuickViewProduct) return;
  window.nexusCart.addItem(currentQuickViewProduct.id, 1, selectedQVColor);
  showToast("Product Added", `${currentQuickViewProduct.name} added to cart.`, "success");
  closeQuickViewModal();
  syncCartUI();
  animateCartIconBadge();

  if (buyNow) {
    openCheckoutModal();
  } else {
    openCartDrawer();
  }
}

function closeQuickViewModal() {
  const modal = document.getElementById("quickViewModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// 8. Checkout Flow & Order Processing
// ==========================================================================
function openCheckoutModal() {
  const items = window.nexusCart.getDetailedCartItems();
  if (items.length === 0) {
    showToast("Cart Empty", "Please add items to your cart before proceeding.", "warning");
    return;
  }

  closeAllDrawers();
  goToCheckoutStep(1);

  const summary = window.nexusCart.getSummary();
  const step1Total = document.getElementById("checkoutStep1Total");
  const finalTotal = document.getElementById("checkoutFinalTotal");
  if (step1Total) step1Total.textContent = `$${summary.grandTotal.toFixed(2)}`;
  if (finalTotal) finalTotal.textContent = `$${summary.grandTotal.toFixed(2)}`;

  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function goToCheckoutStep(step) {
  const stepNode1 = document.getElementById("stepNode1");
  const stepNode2 = document.getElementById("stepNode2");
  const stepNode3 = document.getElementById("stepNode3");

  const shippingForm = document.getElementById("shippingForm");
  const paymentStep = document.getElementById("paymentStep");
  const orderSuccessStep = document.getElementById("orderSuccessStep");

  if (step === 1) {
    if (stepNode1) { stepNode1.className = "step-node active"; }
    if (stepNode2) { stepNode2.className = "step-node"; }
    if (stepNode3) { stepNode3.className = "step-node"; }
    if (shippingForm) shippingForm.style.display = "block";
    if (paymentStep) paymentStep.style.display = "none";
    if (orderSuccessStep) orderSuccessStep.style.display = "none";
  } else if (step === 2) {
    if (stepNode1) { stepNode1.className = "step-node completed"; }
    if (stepNode2) { stepNode2.className = "step-node active"; }
    if (stepNode3) { stepNode3.className = "step-node"; }
    if (shippingForm) shippingForm.style.display = "none";
    if (paymentStep) paymentStep.style.display = "block";
    if (orderSuccessStep) orderSuccessStep.style.display = "none";
  } else if (step === 3) {
    if (stepNode1) { stepNode1.className = "step-node completed"; }
    if (stepNode2) { stepNode2.className = "step-node completed"; }
    if (stepNode3) { stepNode3.className = "step-node active"; }
    if (shippingForm) shippingForm.style.display = "none";
    if (paymentStep) paymentStep.style.display = "none";
    if (orderSuccessStep) orderSuccessStep.style.display = "block";
  }
}

function handleShippingSubmit(e) {
  e.preventDefault();
  const firstName = document.getElementById("shipFirstName").value;
  const lastName = document.getElementById("shipLastName").value;
  const email = document.getElementById("shipEmail").value;
  const address = document.getElementById("shipAddress").value;
  const city = document.getElementById("shipCity").value;
  const zip = document.getElementById("shipZip").value;

  activeOrderData = {
    customerName: `${firstName} ${lastName}`,
    email,
    address: `${address}, ${city} - ${zip}`,
    createdAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  };

  goToCheckoutStep(2);
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;

  const cardTab = document.getElementById("payMethodCard");
  const upiTab = document.getElementById("payMethodUPI");
  const codTab = document.getElementById("payMethodCOD");

  const cardBox = document.getElementById("cardPaymentBox");
  const upiBox = document.getElementById("upiPaymentBox");
  const codBox = document.getElementById("codPaymentBox");

  if (cardTab) cardTab.classList.toggle("selected", method === "card");
  if (upiTab) upiTab.classList.toggle("selected", method === "upi");
  if (codTab) codTab.classList.toggle("selected", method === "cod");

  if (cardBox) cardBox.style.display = method === "card" ? "block" : "none";
  if (upiBox) upiBox.style.display = method === "upi" ? "block" : "none";
  if (codBox) codBox.style.display = method === "cod" ? "block" : "none";
}

function updateCardPreview() {
  const numberInput = document.getElementById("ccInputNumber");
  const expiryInput = document.getElementById("ccInputExpiry");
  const displayNum = document.getElementById("ccDisplayNumber");
  const displayExpiry = document.getElementById("ccDisplayExpiry");

  if (displayNum && numberInput) {
    displayNum.textContent = numberInput.value || "•••• •••• •••• 4242";
  }
  if (displayExpiry && expiryInput) {
    displayExpiry.textContent = expiryInput.value || "12/28";
  }
}

function placeOrderFinal() {
  const summary = window.nexusCart.getSummary();
  const orderId = "NX-" + Math.floor(10000 + Math.random() * 90000);

  activeOrderData = {
    ...activeOrderData,
    orderId: orderId,
    totalPaid: summary.grandTotal,
    items: window.nexusCart.getDetailedCartItems()
  };

  // Populate Step 3 details
  const confirmedOrderIdEl = document.getElementById("confirmedOrderIdBadge");
  const recipientEl = document.getElementById("invoiceRecipient");
  const amountEl = document.getElementById("invoiceAmountPaid");
  const trackingEl = document.getElementById("invoiceTrackingId");

  if (confirmedOrderIdEl) confirmedOrderIdEl.textContent = `ORDER #${orderId}`;
  if (recipientEl) recipientEl.textContent = activeOrderData.customerName || "Priyanshu Kumar";
  if (amountEl) amountEl.textContent = `$${summary.grandTotal.toFixed(2)}`;
  if (trackingEl) trackingEl.textContent = orderId;

  // Clear cart
  window.nexusCart.clearCart();
  syncCartUI();

  goToCheckoutStep(3);
  showToast("Order Placed!", `Payment confirmed for ${orderId}.`, "success");
}

function printInvoice() {
  if (!activeOrderData) return;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice - ${activeOrderData.orderId}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 40px; color: #1e293b; }
        .invoice-box { max-width: 800px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 30px; border-radius: 8px; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #06b6d4; padding-bottom: 15px; margin-bottom: 25px; }
        .brand { font-size: 24px; font-weight: bold; color: #0f172a; }
        .meta { text-align: right; font-size: 14px; color: #64748b; }
        table { width: 100%; border-collapse: collapse; margin: 25px 0; }
        th { background: #f8fafc; text-align: left; padding: 10px; border-bottom: 1px solid #cbd5e1; }
        td { padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .total-box { text-align: right; font-size: 18px; font-weight: bold; color: #0284c7; margin-top: 20px; }
        .footer { margin-top: 40px; font-size: 12px; color: #94a3b8; text-align: center; }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <div class="header">
          <div>
            <div class="brand">NEXUS TECH STORE</div>
            <p>Official Purchase Receipt &bull; College Project Demo</p>
          </div>
          <div class="meta">
            <div><strong>Invoice:</strong> #${activeOrderData.orderId}</div>
            <div><strong>Date:</strong> ${activeOrderData.createdAt}</div>
            <div><strong>Recipient:</strong> ${activeOrderData.customerName}</div>
          </div>
        </div>
        <p><strong>Shipping Address:</strong> ${activeOrderData.address}</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Line Total</th>
            </tr>
          </thead>
          <tbody>
            ${(activeOrderData.items || []).map(i => `
              <tr>
                <td>${i.product.name}</td>
                <td>${i.quantity}</td>
                <td>$${i.lineTotal.toFixed(2)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        <div class="total-box">
          Grand Total Paid: $${(activeOrderData.totalPaid || 0).toFixed(2)}
        </div>
        <div class="footer">
          Thank you for choosing NEXUS TECH! For support reach out to priyanshu.project@nexus.edu
        </div>
      </div>
      <script>window.onload = function() { window.print(); }<\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function trackFromOrderSuccess() {
  if (activeOrderData && activeOrderData.orderId) {
    closeCheckoutModal();
    openTrackingModal(activeOrderData.orderId);
  }
}

// ==========================================================================
// 9. Shipment Tracking Controller
// ==========================================================================
function openTrackingModal(trackingId = "NX-9824") {
  const modal = document.getElementById("trackingModal");
  const label = document.getElementById("trackingModalIdLabel");
  if (label) label.textContent = `Tracking ID: ${trackingId.toUpperCase()}`;
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeTrackingModal() {
  const modal = document.getElementById("trackingModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function handleTrackOrderSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("trackingCodeInput");
  if (input && input.value.trim()) {
    openTrackingModal(input.value.trim());
  }
}

function quickFillTracking(code) {
  const input = document.getElementById("trackingCodeInput");
  if (input) input.value = code;
  openTrackingModal(code);
}

// ==========================================================================
// 10. User Account Modal Simulation
// ==========================================================================
function openAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("authEmail").value;
  const userNameLabel = document.getElementById("userNameLabel");
  const userAvatarMini = document.getElementById("userAvatarMini");

  if (userNameLabel) userNameLabel.textContent = "Priyanshu K.";
  if (userAvatarMini) userAvatarMini.innerHTML = `<i class="fa-solid fa-user-check"></i>`;

  showToast("Welcome Back!", `Successfully signed in as ${email}`, "success");
  closeAuthModal();
}

// ==========================================================================
// 11. Flash Deal Countdown Timer
// ==========================================================================
function initDealCountdown() {
  let totalSeconds = (18 * 3600) + (42 * 60) + 59;

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 3600; // Reset
    }
    totalSeconds--;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const elH = document.getElementById("countHours");
    const elM = document.getElementById("countMinutes");
    const elS = document.getElementById("countSeconds");

    if (elH) elH.textContent = String(hours).padStart(2, "0");
    if (elM) elM.textContent = String(minutes).padStart(2, "0");
    if (elS) elS.textContent = String(seconds).padStart(2, "0");
  }, 1000);
}

// ==========================================================================
// 12. Testimonials Rendering
// ==========================================================================
function renderTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  if (!grid) return;

  grid.innerHTML = TESTIMONIALS_DATA.map(item => `
    <article class="testimonial-card">
      <div class="testimonial-header">
        <img src="${item.avatar}" alt="${item.name}" class="testimonial-avatar">
        <div class="testimonial-author">
          <h4>${item.name}</h4>
          <p>${item.role}</p>
        </div>
      </div>
      <div class="stars-list" style="margin-bottom: 0.75rem;">
        ${renderStarRating(item.rating)}
      </div>
      <p class="testimonial-text">"${item.review}"</p>
      <div class="testimonial-verified">
        <i class="fa-solid fa-circle-check"></i> Verified Purchase &bull; ${item.productName}
      </div>
    </article>
  `).join("");
}

// ==========================================================================
// 13. Toast Notification Engine
// ==========================================================================
function showToast(title, message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-item";

  let iconClass = "fa-solid fa-circle-info info";
  if (type === "success") iconClass = "fa-solid fa-circle-check success";
  if (type === "warning") iconClass = "fa-solid fa-triangle-exclamation warning";
  if (type === "error") iconClass = "fa-solid fa-circle-xmark error";

  toast.innerHTML = `
    <i class="toast-icon ${iconClass}"></i>
    <div class="toast-body">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("removing");
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// ==========================================================================
// 14. Event Listeners & Reset Handlers
// ==========================================================================
function resetAllFilters() {
  currentCategory = "all";
  currentSearchTerm = "";
  currentMaxPrice = 2500;
  currentSort = "featured";

  const searchInput = document.getElementById("headerSearchInput");
  const priceSlider = document.getElementById("priceRangeSlider");
  const priceDisplay = document.getElementById("priceValDisplay");
  const sortSelect = document.getElementById("sortSelect");

  if (searchInput) searchInput.value = "";
  if (priceSlider) priceSlider.value = 2500;
  if (priceDisplay) priceDisplay.textContent = "$2,500";
  if (sortSelect) sortSelect.value = "featured";

  const clearBtn = document.getElementById("clearSearchBtn");
  if (clearBtn) clearBtn.style.display = "none";
  const dropdown = document.getElementById("searchDropdownResults");
  if (dropdown) dropdown.style.display = "none";

  initCategoryPills();
  renderProducts();
  showToast("Filters Cleared", "Catalog reset to default view.", "info");
}

// Live Search Dropdown Controller
function updateSearchDropdown(query) {
  const dropdown = document.getElementById("searchDropdownResults");
  const clearBtn = document.getElementById("clearSearchBtn");
  if (!dropdown) return;

  const q = (query || "").trim().toLowerCase();

  if (clearBtn) {
    clearBtn.style.display = q ? "flex" : "none";
  }

  if (!q) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
    return;
  }

  const matches = PRODUCTS_DATA.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    p.categoryLabel.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    dropdown.style.display = "block";
    dropdown.innerHTML = `
      <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-magnifying-glass" style="margin-bottom: 0.5rem; opacity: 0.5; display: block; font-size: 1.25rem;"></i>
        No products found matching "<strong>${escapeHtml(query)}</strong>"
      </div>
    `;
    return;
  }

  const topMatches = matches.slice(0, 5);
  dropdown.style.display = "block";
  dropdown.innerHTML = `
    ${topMatches.map(p => `
      <div class="search-result-item" onclick="selectSearchResult(${p.id})">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" class="search-result-thumb">
        <div class="search-result-info">
          <div class="search-result-name">${escapeHtml(p.name)}</div>
          <div class="search-result-meta">
            <span>${escapeHtml(p.categoryLabel)}</span>
            <span class="search-result-price">$${p.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `).join("")}
    <div class="search-dropdown-footer" onclick="viewAllSearchResults()">
      <i class="fa-solid fa-arrow-down"></i> View all ${matches.length} matching items in catalog
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function selectSearchResult(productId) {
  const dropdown = document.getElementById("searchDropdownResults");
  if (dropdown) dropdown.style.display = "none";
  quickViewProduct(productId);
}

function viewAllSearchResults() {
  const dropdown = document.getElementById("searchDropdownResults");
  if (dropdown) dropdown.style.display = "none";
  scrollToCatalog();
}

function clearSearchInput() {
  const input = document.getElementById("headerSearchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const dropdown = document.getElementById("searchDropdownResults");

  if (input) input.value = "";
  if (clearBtn) clearBtn.style.display = "none";
  if (dropdown) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
  }
  currentSearchTerm = "";
  renderProducts();
}

function handleSearchSubmit(e) {
  if (e) e.preventDefault();
  const dropdown = document.getElementById("searchDropdownResults");
  if (dropdown) dropdown.style.display = "none";
  scrollToCatalog();
}

function scrollToCatalog() {
  const catalogSection = document.getElementById("catalog");
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: "smooth" });
  }
}

function initEventListeners() {
  // Header scroll shadow
  window.addEventListener("scroll", () => {
    const header = document.getElementById("siteHeader");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  });

  // Search input events
  const searchInput = document.getElementById("headerSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value;
      renderProducts();
      updateSearchDropdown(currentSearchTerm);
    });

    searchInput.addEventListener("focus", () => {
      if (currentSearchTerm.trim()) {
        updateSearchDropdown(currentSearchTerm);
      }
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchSubmit();
      }
    });
  }

  // Close search dropdown on click outside
  document.addEventListener("click", (e) => {
    const searchContainer = document.getElementById("searchContainer");
    const dropdown = document.getElementById("searchDropdownResults");
    if (searchContainer && dropdown && !searchContainer.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });

  // Price range slider
  const priceSlider = document.getElementById("priceRangeSlider");
  const priceDisplay = document.getElementById("priceValDisplay");
  if (priceSlider) {
    priceSlider.addEventListener("input", (e) => {
      currentMaxPrice = parseFloat(e.target.value);
      if (priceDisplay) priceDisplay.textContent = `$${currentMaxPrice.toLocaleString()}`;
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Reset button
  const resetBtn = document.getElementById("resetFiltersBtn");
  if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);

  // Announcement bar coupon click copy
  const couponBtn = document.getElementById("announcementCouponBtn");
  if (couponBtn) {
    couponBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("PRI23").then(() => {
        showToast("Coupon Copied!", "Code PRI23 copied to clipboard.", "success");
      }).catch(() => {
        showToast("Coupon Code", "Use code: PRI23 at checkout.", "info");
      });
    });
  }

  // Drawer buttons
  const cartBtn = document.getElementById("cartDrawerBtn");
  if (cartBtn) cartBtn.addEventListener("click", openCartDrawer);

  const wishlistBtn = document.getElementById("wishlistDrawerBtn");
  if (wishlistBtn) wishlistBtn.addEventListener("click", openWishlistDrawer);

  const userBtn = document.getElementById("userAuthBtn");
  if (userBtn) userBtn.addEventListener("click", openAuthModal);

  // Header segmented nav active switcher
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function() {
      if (this.getAttribute("target") === "_blank") return;
      document.querySelectorAll(".nav-link").forEach(l => {
        l.classList.remove("active");
        const dot = l.querySelector(".active-dot");
        if (dot) dot.remove();
      });
      this.classList.add("active");
      if (!this.querySelector(".active-dot")) {
        const dot = document.createElement("span");
        dot.className = "active-dot";
        this.appendChild(dot);
      }
    });
  });

  const trackNavBtn = document.getElementById("navTrackOrderBtn");
  if (trackNavBtn) trackNavBtn.addEventListener("click", () => openTrackingModal("NX-9824"));

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    // Press '/' to search
    if (e.key === "/" && document.activeElement !== searchInput && !document.activeElement.matches("input, textarea")) {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
    // Press Escape to close all open dialogs
    if (e.key === "Escape") {
      closeAllDrawers();
      closeQuickViewModal();
      closeCheckoutModal();
      closeTrackingModal();
      closeAuthModal();
    }
  });
}
