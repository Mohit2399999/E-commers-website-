"""
NEXUS TECH - Backend Views (store/views.py)
------------------------------------------
This file acts as the controller/logic layer of the Django application:
  1. index            - Renders the main storefront HTML page
  2. api_products     - Returns filtered & sorted products as JSON
  3. api_apply_coupon - Validates discount coupons and returns savings
  4. api_create_order - Processes checkout and saves orders into the database
  5. api_track_order  - Queries order shipment status by Order ID
"""

import json
import random
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Category, Product, Coupon, Order, OrderItem


# ==============================================================================
# HELPER FUNCTIONS
# ==============================================================================
def product_to_dict(p):
    """Converts a Product database model instance into a clean Python dictionary."""
    return {
        'id': p.id,
        'name': p.name,
        'tagline': p.tagline,
        'category': p.category.slug,
        'categoryLabel': p.category.name,
        'price': float(p.price),
        'originalPrice': float(p.original_price) if p.original_price else None,
        'rating': float(p.rating),
        'reviewsCount': p.reviews_count,
        'badge': p.badge,
        'inStock': p.in_stock,
        'stockCount': p.stock_count,
        'image': p.image,
        'description': p.description,
        'specs': p.specs,
    }


# ==============================================================================
# 1. MAIN STORE HOMEPAGE VIEW
# ==============================================================================
def index(request):
    """
    Renders the main storefront HTML page.
    Passes categories, products, and active coupons to the template context.
    """
    context = {
        'categories': Category.objects.all(),
        'products': Product.objects.filter(in_stock=True),
        'coupons': Coupon.objects.filter(active=True),
    }
    return render(request, 'store/index.html', context)


# ==============================================================================
# 2. PRODUCT CATALOG REST API
# ==============================================================================
def api_products(request):
    """
    Returns products as JSON with optional filtering and sorting.
    Query parameters supported:
      - category: slug of category (default: 'all')
      - search: keyword to search by name
      - max_price: upper price ceiling
      - sort: 'price-low', 'price-high', or 'rating'
    """
    # 1. Start with all in-stock products
    products = Product.objects.filter(in_stock=True)

    # 2. Filter by category if specified
    category_slug = request.GET.get('category', 'all')
    if category_slug != 'all':
        products = products.filter(category__slug=category_slug)

    # 3. Filter by search query if provided
    search_query = request.GET.get('search', '').strip()
    if search_query:
        products = products.filter(name__icontains=search_query)

    # 4. Filter by maximum price if provided
    max_price = request.GET.get('max_price')
    if max_price:
        try:
            products = products.filter(price__lte=float(max_price))
        except ValueError:
            pass

    # 5. Apply sorting
    sort_by = request.GET.get('sort', 'featured')
    if sort_by == 'price-low':
        products = products.order_by('price')
    elif sort_by == 'price-high':
        products = products.order_by('-price')
    elif sort_by == 'rating':
        products = products.order_by('-rating')

    # 6. Convert QuerySet to list of dictionaries
    data = [product_to_dict(p) for p in products]
    return JsonResponse({'products': data})


# ==============================================================================
# 3. COUPON VALIDATION API
# ==============================================================================
@csrf_exempt
def api_apply_coupon(request):
    """
    Validates a promotional coupon code sent via POST JSON.
    Checks:
      1. Does coupon exist and is active?
      2. Does the order subtotal satisfy minimum order requirements?
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)

    try:
        data = json.loads(request.body)
        code = data.get('code', '').strip().upper()
        subtotal = float(data.get('subtotal', 0))

        # Look up coupon in database
        coupon = Coupon.objects.filter(code=code, active=True).first()
        if not coupon:
            return JsonResponse({'success': False, 'message': 'Invalid or expired coupon code.'})

        # Check minimum order condition
        if subtotal < float(coupon.min_order):
            return JsonResponse({
                'success': False,
                'message': f'Minimum order of ${coupon.min_order:.2f} required for coupon {coupon.code}.'
            })

        # Return successful coupon discount info
        return JsonResponse({
            'success': True,
            'message': f'Coupon {coupon.code} applied successfully!',
            'coupon': {
                'code': coupon.code,
                'discount': float(coupon.discount),
                'type': coupon.discount_type,
                'label': coupon.label or f'{coupon.discount} discount'
            }
        })
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)


# ==============================================================================
# 4. ORDER CREATION API (CHECKOUT)
# ==============================================================================
@csrf_exempt
def api_create_order(request):
    """
    Receives customer checkout info via POST JSON, saves the Order
    and OrderItem records to the SQLite database, and returns the Order ID.
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'POST method required'}, status=405)

    try:
        data = json.loads(request.body)
        order_id = f"NX-{random.randint(10000, 99999)}"

        # 1. Create the parent Order record
        order = Order.objects.create(
            order_id=order_id,
            customer_name=data.get('customer_name', 'Customer'),
            email=data.get('email', ''),
            address=data.get('address', ''),
            city=data.get('city', ''),
            zip_code=data.get('zip_code', ''),
            subtotal=data.get('subtotal', 0),
            discount_amount=data.get('discount_amount', 0),
            shipping_cost=data.get('shipping_cost', 0),
            tax_amount=data.get('tax_amount', 0),
            total_amount=data.get('total_amount', 0),
            payment_method=data.get('payment_method', 'card'),
            status='In Transit'
        )

        # 2. Create the associated OrderItem records
        for item in data.get('items', []):
            product_id = item.get('id')
            product = Product.objects.filter(id=product_id).first()
            OrderItem.objects.create(
                order=order,
                product=product,
                product_name=item.get('name') or (product.name if product else 'Tech Product'),
                quantity=item.get('quantity', 1),
                price=item.get('price', 0),
                selected_color=item.get('selectedColor', '')
            )

        # 3. Return confirmation response
        return JsonResponse({
            'success': True,
            'order_id': order_id,
            'customer_name': order.customer_name,
            'total_amount': order.total_amount,
            'created_at': order.created_at.strftime('%b %d, %Y')
        })
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)


# ==============================================================================
# 5. ORDER TRACKING API
# ==============================================================================
def api_track_order(request, order_id):
    """
    Looks up an order by order_id and returns its live shipment status.
    Falls back gracefully to a mock transit status for demo IDs.
    """
    order = Order.objects.filter(order_id__iexact=order_id).first()
    if order:
        return JsonResponse({
            'success': True,
            'order_id': order.order_id,
            'status': order.status,
            'customer_name': order.customer_name,
            'total_amount': float(order.total_amount),
            'created_at': order.created_at.strftime('%b %d, %Y, %I:%M %p')
        })

    # Fallback for demo or sample IDs during college presentations
    return JsonResponse({
        'success': True,
        'order_id': order_id.upper(),
        'status': 'In Transit (Express Air)',
        'customer_name': 'Verified Customer',
        'total_amount': 349.99,
        'created_at': 'Today, 09:15 AM'
    })
