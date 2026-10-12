/**
 * NEXUS TECH - Cart & Wishlist State Management
 * Persistent store with localStorage support, coupon discounts & checkout totals
 */

class CartManager {
  constructor() {
    this.cartKey = "nexus_tech_cart_v1";
    this.wishlistKey = "nexus_tech_wishlist_v1";
    this.couponKey = "nexus_tech_applied_coupon_v1";
    
    this.cart = this.loadFromStorage(this.cartKey, []);
    this.wishlist = this.loadFromStorage(this.wishlistKey, []);
    this.appliedCouponCode = this.loadFromStorage(this.couponKey, null);
    
    this.freeShippingThreshold = 150.0;
    this.standardShippingCost = 15.0;
    this.taxRate = 0.08; // 8% sales tax
  }

  loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Storage error:", e);
      return fallback;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("Error saving to storage:", e);
    }
  }

  // --- Cart Operations ---

  addItem(productId, quantity = 1, selectedColor = null) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return false;

    const existingIndex = this.cart.findIndex(
      item => item.id === productId && item.selectedColor === selectedColor
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        quantity: quantity,
        selectedColor: selectedColor || (product.colors ? product.colors[0] : null),
        addedAt: Date.now()
      });
    }

    this.saveToStorage(this.cartKey, this.cart);
    this.triggerUpdate();
    return true;
  }

  updateQuantity(productId, newQty, selectedColor = null) {
    const itemIndex = this.cart.findIndex(
      item => item.id === productId && (!selectedColor || item.selectedColor === selectedColor)
    );

    if (itemIndex > -1) {
      if (newQty <= 0) {
        this.cart.splice(itemIndex, 1);
      } else {
        this.cart[itemIndex].quantity = newQty;
      }
      this.saveToStorage(this.cartKey, this.cart);
      this.triggerUpdate();
    }
  }

  removeItem(productId, selectedColor = null) {
    this.cart = this.cart.filter(
      item => !(item.id === productId && (!selectedColor || item.selectedColor === selectedColor))
    );
    this.saveToStorage(this.cartKey, this.cart);
    this.triggerUpdate();
  }

  clearCart() {
    this.cart = [];
    this.saveToStorage(this.cartKey, this.cart);
    this.triggerUpdate();
  }

  getTotalItemsCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getDetailedCartItems() {
    return this.cart.map(item => {
      const product = PRODUCTS_DATA.find(p => p.id === item.id);
      return {
        ...item,
        product: product || {
          name: "Unknown Tech Item",
          price: 0,
          image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80"
        },
        lineTotal: product ? product.price * item.quantity : 0
      };
    });
  }

  // --- Financial Calculations ---

  calculateSubtotal() {
    return this.cart.reduce((sum, item) => {
      const product = PRODUCTS_DATA.find(p => p.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (!cleanCode) return { success: false, message: "Please enter a valid coupon code." };

    if (DISCOUNT_COUPONS[cleanCode]) {
      const coupon = DISCOUNT_COUPONS[cleanCode];
      const subtotal = this.calculateSubtotal();

      if (cleanCode === "NEXUS50" && subtotal < 200) {
        return { success: false, message: "Coupon NEXUS50 requires a minimum order of $200." };
      }

      this.appliedCouponCode = cleanCode;
      this.saveToStorage(this.couponKey, this.appliedCouponCode);
      this.triggerUpdate();
      return { success: true, message: `Coupon ${cleanCode} successfully applied!`, coupon };
    }

    return { success: false, message: "Invalid promo code. Try TECH20 or COLLEGE10." };
  }

  removeCoupon() {
    this.appliedCouponCode = null;
    this.saveToStorage(this.couponKey, null);
    this.triggerUpdate();
  }

  getAppliedCoupon() {
    if (this.appliedCouponCode && DISCOUNT_COUPONS[this.appliedCouponCode]) {
      return {
        code: this.appliedCouponCode,
        ...DISCOUNT_COUPONS[this.appliedCouponCode]
      };
    }
    return null;
  }

  getSummary() {
    const subtotal = this.calculateSubtotal();
    const coupon = this.getAppliedCoupon();
    let discountAmount = 0;
    let shippingCost = subtotal >= this.freeShippingThreshold || subtotal === 0 ? 0 : this.standardShippingCost;

    if (coupon) {
      if (coupon.type === "percent") {
        discountAmount = (subtotal * coupon.discount) / 100;
      } else if (coupon.type === "fixed") {
        discountAmount = Math.min(coupon.discount, subtotal);
      } else if (coupon.type === "shipping") {
        shippingCost = 0;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const taxAmount = discountedSubtotal > 0 ? discountedSubtotal * this.taxRate : 0;
    const grandTotal = discountedSubtotal + (discountedSubtotal > 0 ? shippingCost : 0) + taxAmount;

    const freeShippingProgress = Math.min(100, Math.round((subtotal / this.freeShippingThreshold) * 100));
    const amountNeededForFreeShipping = Math.max(0, this.freeShippingThreshold - subtotal);

    return {
      subtotal,
      discountAmount,
      shippingCost,
      taxAmount,
      grandTotal,
      freeShippingProgress,
      amountNeededForFreeShipping,
      coupon
    };
  }

  // --- Wishlist Operations ---

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    let added = false;
    if (index > -1) {
      this.wishlist.splice(index, 1);
      added = false;
    } else {
      this.wishlist.push(productId);
      added = true;
    }
    this.saveToStorage(this.wishlistKey, this.wishlist);
    this.triggerUpdate();
    return added;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  getWishlistItems() {
    return this.wishlist
      .map(id => PRODUCTS_DATA.find(p => p.id === id))
      .filter(Boolean);
  }

  // --- Subscriptions & Dispatchers ---

  triggerUpdate() {
    window.dispatchEvent(new CustomEvent("nexus_cart_updated", {
      detail: {
        cartCount: this.getTotalItemsCount(),
        wishlistCount: this.wishlist.length,
        summary: this.getSummary()
      }
    }));
  }
}

// Global Cart Manager Instance
window.nexusCart = new CartManager();
