import json
import random
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Category, Product, Coupon, Order, OrderItem

def index(request):
    categories = Category.objects.all()
    products = Product.objects.filter(in_stock=True)
    coupons = Coupon.objects.filter(active=True)
    context = {
        'categories': categories,
        'products': products,
        'coupons': coupons,
    }
    return render(request, 'store/index.html', context)

def api_products(request):
    category_slug = request.GET.get('category', 'all')
    search_query = request.GET.get('search', '').strip()
    max_price = request.GET.get('max_price', None)
    sort_by = request.GET.get('sort', 'featured')

    products = Product.objects.filter(in_stock=True)

    if category_slug != 'all':
        products = products.filter(category__slug=category_slug)

    if search_query:
        products = products.filter(name__icontains=search_query)

    if max_price:
        try:
            products = products.filter(price__lte=float(max_price))
        except ValueError:
            pass

    if sort_by == 'price-low':
        products = products.order_by('price')
    elif sort_by == 'price-high':
        products = products.order_by('-price')
    elif sort_by == 'rating':
        products = products.order_by('-rating')

    data = []
    for p in products:
        data.append({
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
        })

    return JsonResponse({'products': data})

@csrf_exempt
def api_apply_coupon(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            code = body.get('code', '').strip().upper()
            subtotal = float(body.get('subtotal', 0))

            coupon = Coupon.objects.filter(code=code, active=True).first()
            if not coupon:
                return JsonResponse({'success': False, 'message': 'Invalid or expired coupon code.'})

            if subtotal < float(coupon.min_order):
                return JsonResponse({
                    'success': False,
                    'message': f'Minimum order amount of ${coupon.min_order:.2f} required for coupon {coupon.code}.'
                })

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

    return JsonResponse({'error': 'POST required'}, status=405)

@csrf_exempt
def api_create_order(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            order_id = "NX-" + str(random.randint(10000, 99999))

            customer_name = body.get('customer_name', 'Customer')
            email = body.get('email', '')
            address = body.get('address', '')
            city = body.get('city', '')
            zip_code = body.get('zip_code', '')
            subtotal = body.get('subtotal', 0)
            discount_amount = body.get('discount_amount', 0)
            shipping_cost = body.get('shipping_cost', 0)
            tax_amount = body.get('tax_amount', 0)
            total_amount = body.get('total_amount', 0)
            payment_method = body.get('payment_method', 'card')

            order = Order.objects.create(
                order_id=order_id,
                customer_name=customer_name,
                email=email,
                address=address,
                city=city,
                zip_code=zip_code,
                subtotal=subtotal,
                discount_amount=discount_amount,
                shipping_cost=shipping_cost,
                tax_amount=tax_amount,
                total_amount=total_amount,
                payment_method=payment_method,
                status='In Transit'
            )

            # Create items
            items_data = body.get('items', [])
            for item in items_data:
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

            return JsonResponse({
                'success': True,
                'order_id': order_id,
                'customer_name': customer_name,
                'total_amount': total_amount,
                'created_at': order.created_at.strftime('%b %d, %Y')
            })
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)

    return JsonResponse({'error': 'POST required'}, status=405)

def api_track_order(request, order_id):
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
    else:
        # Provide default mock tracking response for sample IDs
        return JsonResponse({
            'success': True,
            'order_id': order_id.upper(),
            'status': 'In Transit (Express Air)',
            'customer_name': 'Verified Customer',
            'total_amount': 349.99,
            'created_at': 'Today, 09:15 AM'
        })
