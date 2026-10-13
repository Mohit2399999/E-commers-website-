"""
NEXUS TECH - Database Models (store/models.py)
---------------------------------------------
This file defines the database structure using Django ORM.
Each Python class corresponds to a database table:
  1. Category   - Groups products (e.g., Audio, Smartphones, Laptops)
  2. Product    - Tech gadget items with price, rating, and stock
  3. Coupon     - Discount promotional codes (e.g., PRI23)
  4. Order      - Customer checkout orders with shipping and totals
  5. OrderItem  - Individual products linked to an Order
"""

from django.db import models


# ==============================================================================
# 1. CATEGORY MODEL
# ==============================================================================
class Category(models.Model):
    """Represents a product category (e.g. Audio, Smartphones)."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, default='fa-boxes-stacked')

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


# ==============================================================================
# 2. PRODUCT MODEL
# ==============================================================================
class Product(models.Model):
    """Represents a tech gadget product in the store catalog."""
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    tagline = models.CharField(max_length=255, blank=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    reviews_count = models.PositiveIntegerField(default=0)
    badge = models.CharField(max_length=50, blank=True)
    in_stock = models.BooleanField(default=True)
    stock_count = models.PositiveIntegerField(default=15)
    image = models.CharField(max_length=500)
    description = models.TextField()
    specs = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    @property
    def discount_percentage(self):
        """Calculates discount percentage if an original price is provided."""
        if self.original_price and self.original_price > self.price:
            return round(((self.original_price - self.price) / self.original_price) * 100)
        return 0


# ==============================================================================
# 3. COUPON MODEL
# ==============================================================================
class Coupon(models.Model):
    """Stores promotional discount codes like PRI23."""
    COUPON_TYPES = (
        ('percent', 'Percentage (%)'),
        ('fixed', 'Fixed Amount ($)'),
        ('shipping', 'Free Shipping'),
    )

    code = models.CharField(max_length=50, unique=True)
    discount = models.DecimalField(max_digits=6, decimal_places=2)
    discount_type = models.CharField(max_length=20, choices=COUPON_TYPES, default='percent')
    min_order = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    label = models.CharField(max_length=150, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} ({self.discount} {self.discount_type})"


# ==============================================================================
# 4. ORDER MODEL
# ==============================================================================
class Order(models.Model):
    """Stores customer orders and checkout information."""
    STATUS_CHOICES = (
        ('Processing', 'Processing'),
        ('Packed', 'Packed & Sealed'),
        ('In Transit', 'In Transit (Express Air)'),
        ('Delivered', 'Delivered'),
    )

    order_id = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=150)
    email = models.EmailField()
    address = models.TextField()
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, default='card')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='In Transit')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.order_id} - {self.customer_name}"


# ==============================================================================
# 5. ORDER ITEM MODEL
# ==============================================================================
class OrderItem(models.Model):
    """Stores individual line items within an Order."""
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    product_name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    selected_color = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.quantity}x {self.product_name}"
