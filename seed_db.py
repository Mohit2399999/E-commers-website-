import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nexus_project.settings')
django.setup()

from django.contrib.auth import get_user_model
from store.models import Category, Product, Coupon, Order, OrderItem

def seed():
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@nexus.edu', 'admin123')
        print("Created superuser: admin / admin123")

    categories_data = [
        {"name": "Audio & Sound", "slug": "audio", "icon": "fa-headphones"},
        {"name": "Smart Wearables", "slug": "wearables", "icon": "fa-clock"},
        {"name": "Laptops & PCs", "slug": "laptops", "icon": "fa-laptop"},
        {"name": "Smartphones", "slug": "phones", "icon": "fa-mobile-screen-button"},
        {"name": "Gaming Gear", "slug": "gaming", "icon": "fa-gamepad"},
        {"name": "Accessories", "slug": "accessories", "icon": "fa-bolt"},
    ]

    cat_map = {}
    for c in categories_data:
        cat, _ = Category.objects.get_or_create(slug=c['slug'], defaults={'name': c['name'], 'icon': c['icon']})
        cat_map[c['slug']] = cat

    coupons_data = [
        {"code": "PRI23", "discount": 20, "discount_type": "percent", "label": "20% Special Discount (PRI23)", "min_order": 0},
        {"code": "TECH20", "discount": 20, "discount_type": "percent", "label": "20% Flash College Discount", "min_order": 0},
        {"code": "COLLEGE10", "discount": 10, "discount_type": "percent", "label": "10% Student Special", "min_order": 0},
        {"code": "NEXUS50", "discount": 50, "discount_type": "fixed", "label": "$50 Flat Voucher (Min $200)", "min_order": 200},
        {"code": "FREESHIP", "discount": 15, "discount_type": "shipping", "label": "Free Express Shipping", "min_order": 0},
    ]

    for cp in coupons_data:
        Coupon.objects.get_or_create(
            code=cp['code'],
            defaults={
                'discount': cp['discount'],
                'discount_type': cp['discount_type'],
                'label': cp['label'],
                'min_order': cp['min_order'],
                'active': True
            }
        )

    products_data = [
        {
            "name": "Nebula Aurora NC Wireless Headphones",
            "slug": "nebula-aurora-nc",
            "tagline": "Titanium Noise-Canceling Audiophile Headset",
            "category": "audio",
            "price": 349.99,
            "original_price": 429.99,
            "rating": 4.9,
            "reviews_count": 384,
            "badge": "BESTSELLER",
            "image": "/static/assets/hero_headphones.jpg",
            "description": "Equipped with aerospace-grade titanium drivers and active dual-core neural noise cancellation, delivering studio-master acoustics with 60-hour continuous battery.",
            "specs": {
                "Driver": "40mm Beryllium Acoustic Diaphragm",
                "Battery Life": "60 Hours with ANC Active",
                "Connectivity": "Bluetooth 5.4 + Low Latency 2.4GHz"
            }
        },
        {
            "name": "Aether Chronos X1 Titanium Smartwatch",
            "slug": "aether-chronos-x1",
            "tagline": "Sapphire Crystal Ultra-Fitness Companion",
            "category": "wearables",
            "price": 279.99,
            "original_price": 349.99,
            "rating": 4.8,
            "reviews_count": 219,
            "badge": "NEW ARRIVAL",
            "image": "/static/assets/hero_smartwatch.jpg",
            "description": "Crafted from Grade-5 forged titanium with an always-on 1.5-inch micro-OLED display, dual-frequency GPS, biometric ECG monitoring, and 100-meter diving resistance.",
            "specs": {
                "Display": "1.5\" LTPO Micro-OLED 2000 Nits",
                "Water Resistance": "10 ATM (100 Meters Diving Grade)",
                "Battery": "14 Days Typical Use / 48h GPS"
            }
        },
        {
            "name": "Vortex Pro 16 Ultrabook M-Pro",
            "slug": "vortex-pro-16",
            "tagline": "Liquid Metal Cooled 3.2K OLED Workstation",
            "category": "laptops",
            "price": 1899.99,
            "original_price": 2199.99,
            "rating": 5.0,
            "reviews_count": 142,
            "badge": "FLAGSHIP",
            "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
            "description": "Engineered for elite software engineering, 3D rendering, and video creation with 14-core high performance silicon and 32GB unified RAM.",
            "specs": {
                "Processor": "14-Core High Performance Silicon Chip",
                "Memory": "32GB High-Speed Unified RAM",
                "Display": "16.2\" 3.2K Liquid OLED 120Hz ProMotion"
            }
        },
        {
            "name": "CyberBlade Neo 5G Flagship Smartphone",
            "slug": "cyberblade-neo-5g",
            "tagline": "200MP Periscope Camera & Snapdragon Elite",
            "category": "phones",
            "price": 899.99,
            "original_price": 1049.99,
            "rating": 4.8,
            "reviews_count": 512,
            "badge": "HOT DEAL",
            "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
            "description": "The peak of smartphone engineering with an aerospace ceramic back, 200MP optical zoom stabilization, and lightning 120W HyperCharge.",
            "specs": {
                "Display": "6.8\" AMOLED 2K curved 144Hz HDR10+",
                "Camera": "200MP Primary + 50MP Ultra-wide",
                "Charging": "120W Wired + 50W Wireless"
            }
        },
        {
            "name": "Apex Pulse RGB Mechanical Keyboard",
            "slug": "apex-pulse-rgb",
            "tagline": "Hall Effect Magnetic Rapid Trigger Switches",
            "category": "gaming",
            "price": 159.99,
            "original_price": 199.99,
            "rating": 4.9,
            "reviews_count": 420,
            "badge": "GAMING PICK",
            "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
            "description": "Dominate every match with adjustable 0.1mm actuation Hall-Effect magnetic switches, PBT double-shot keycaps, and CNC aluminum frame.",
            "specs": {
                "Switches": "Magnetic Hall-Effect Rapid Trigger",
                "Polling Rate": "8,000 Hz Hyper-Polling Speed"
            }
        },
        {
            "name": "VoltCharge 140W GaN 4-Port Fast Hub",
            "slug": "voltcharge-140w-gan",
            "tagline": "Gallium Nitride Multi-Device Power Station",
            "category": "accessories",
            "price": 69.99,
            "original_price": 89.99,
            "rating": 4.8,
            "reviews_count": 620,
            "badge": "ESSENTIAL",
            "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
            "description": "Compact GaN III technology charging brick capable of powering two laptops, a phone, and a smartwatch concurrently.",
            "specs": {
                "Total Wattage": "140W Maximum Continuous Output",
                "Technology": "Navitas GaNFast III Semiconductor"
            }
        }
    ]

    for p in products_data:
        Product.objects.get_or_create(
            slug=p['slug'],
            defaults={
                'name': p['name'],
                'tagline': p['tagline'],
                'category': cat_map[p['category']],
                'price': p['price'],
                'original_price': p['original_price'],
                'rating': p['rating'],
                'reviews_count': p['reviews_count'],
                'badge': p['badge'],
                'image': p['image'],
                'description': p['description'],
                'specs': p['specs'],
                'in_stock': True,
                'stock_count': 20
            }
        )

    # Create Sample Order for Tracker demo
    if not Order.objects.filter(order_id='NX-9824').exists():
        demo_order = Order.objects.create(
            order_id='NX-9824',
            customer_name='Priyanshu Kumar',
            email='priyanshu.project@nexus.edu',
            address='Campus Innovation Park, Tech Block 4',
            city='New Delhi',
            zip_code='110001',
            subtotal=349.99,
            discount_amount=70.00,
            shipping_cost=0.00,
            tax_amount=22.40,
            total_amount=302.39,
            payment_method='Credit Card (Visa)',
            status='In Transit'
        )
        prod = Product.objects.first()
        OrderItem.objects.create(
            order=demo_order,
            product=prod,
            product_name=prod.name if prod else 'Aurora NC Headphones',
            quantity=1,
            price=349.99,
            selected_color='#1e293b'
        )
        print("Created demo order: NX-9824")

    print("Database successfully seeded with categories, products, coupons & orders!")

if __name__ == '__main__':
    seed()
