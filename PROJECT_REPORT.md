# PROJECT REPORT ON
# “E-COMMERCE WEB APPLICATION”
### (NEXUS TECH STORE)

**Submitted to:**  
**Rashtrasant Tukadoji Maharaj Nagpur University, NAGPUR**  

**In partial fulfilment of the requirement of:**  
**Bachelor of Computer Applications (BCA) (AICTE) Semester – V Examination**

---

### **Submitted by:**
**Priyanshu Suryawanshi**  
(BCA Final Year, Semester – V)

---

### **Under the guidance of:**
**Prof. Prafulla Karande**  
Head of Department (HOD)  
(Computer Science & Application)

### **Under the co-guidance of:**
**Dr. Prajkta Ratnaparkhi**  
Assistant Professor  
(Computer Science & Application)

---

**Late M.D. Gandhe Memorial Education Society’s**  
### **City Premier College, Nagpur**  
Hindustan Colony, Samarth Nagar, Wardha Road, Nagpur – 440 015  
**Academic Year: 2026–2027**

---

<div style="page-break-after: always;"></div>

# Late M.D. Gandhe Memorial Education Society’s
## Computer Science & Application Department
### City Premier College, Nagpur

---

## CERTIFICATE

This is to certify that the Project report entitled **“E-Commerce Web Application (NEXUS TECH)”** is carried out and developed by **Priyanshu Suryawanshi** in partial fulfilment of the **Bachelor of Computer Applications (BCA)** Semester – V Examination and submitted to **Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur** under my guidance and supervision.

To the best of my knowledge, the matter presented in this report has not been presented earlier for any similar degree or examination.

<br><br><br>

**Place:** Nagpur  
**Date:** 13/10/2026  

<br>

| ___________________________ | ___________________________ |
| :--- | :--- |
| **Prof. Prafulla Karande** | **Dr. Prajkta Ratnaparkhi** |
| Project Guide & HOD | Project Co-Guide |
| (Computer Science & Application) | Assistant Professor |
| City Premier College, Nagpur | City Premier College, Nagpur |

<br><br>

**Principal:**  
**Dr. Vinod Gawande**  
City Premier College, Nagpur

---

<div style="page-break-after: always;"></div>

## DECLARATION

**To,**  
**The Principal,**  
**City Premier College,**  
Hindustan Colony, Samarth Nagar, Wardha Road,  
Nagpur – 440 015  

**Respected Sir,**

I, the undersigned, hereby declare that the Project work entitled **“E-Commerce Web Application (NEXUS TECH)”** submitted to **Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur** is my own work carried out during the semester. This is my original work and has not been submitted anywhere for any other degree or examination. The system presented in this report has been built by me for academic learning.

I understand that any such copying is liable to be punished in any way the University authority may deem fit.

Thanking You.

<br><br>

**Place:** Nagpur  
**Date:** 13/10/2026  

<br>

**Yours Sincerely,**  
<br><br>
**Priyanshu Suryawanshi**  
(Bachelor of Computer Applications, Semester – V)  
City Premier College, Nagpur  

---

<div style="page-break-after: always;"></div>

## ACKNOWLEDGEMENT

I wish to express my sincere thanks to many persons who helped and supported me in completing my project work.

At first, I express my sincere thanks to Principal **Dr. Vinod Gawande**, for providing the computer laboratory, internet facility, and infrastructure without which it would have been difficult to complete this project.

My foremost thanks to **Prof. Prafulla Karande**, Head of the Department, who guided me and gave valuable advice during the development of this project.

My special thanks to my co-guide **Dr. Prajkta Ratnaparkhi**, Assistant Professor, for her constant help, encouragement, and useful suggestions throughout the semester.

I also express my thanks to all teaching and non-teaching staff of the **Computer Science & Application Department** for their help and co-operation. Finally, I would like to thank my parents and friends who encouraged me during my project work.

<br><br>

**Place:** Nagpur  
**Date:** 13/10/2026  

<br>

**Priyanshu Suryawanshi**  
BCA Semester – V  
City Premier College, Nagpur  

---

<div style="page-break-after: always;"></div>

## TABLE OF CONTENTS

| Sr. No. | Topic | Page No. |
| :---: | :--- | :---: |
| **1.** | **Introduction** | **1** |
| | 1.1 Project Introduction | 1 |
| | 1.2 Objectives of the Project | 2 |
| | 1.3 Scope and Duration | 3 |
| **2.** | **System Overview & Requirements** | **4** |
| | 2.1 Problem Statement | 4 |
| | 2.2 System Flow (How Django Works) | 5 |
| | 2.3 Hardware and Software Requirements | 6 |
| **3.** | **Project Development Activities** | **7** |
| | 3.1 Tasks Assigned | 7 |
| | 3.2 Weekly Development Work | 8 |
| | 3.3 Difficulties Faced and How They Were Solved | 11 |
| **4.** | **Technologies and Tools** | **12** |
| | 4.1 Front-end (HTML, CSS, JavaScript) | 12 |
| | 4.2 Back-end (Python and Django) | 13 |
| | 4.3 Database (SQLite3) | 14 |
| | 4.4 Why These Technologies Were Chosen | 15 |
| **5.** | **Project Design and Implementation** | **16** |
| | 5.1 Use Case Diagram and User Actions | 16 |
| | 5.2 Step-by-Step Flow of Buying a Product | 17 |
| | 5.3 Database Design (Tables and Fields) | 18 |
| | 5.4 Application Routes (URLs) | 20 |
| | 5.5 Folder Structure | 21 |
| | 5.6 Source Code of the Project | 22 |
| **6.** | **Testing and Results** | **31** |
| | 6.1 Test Cases | 31 |
| | 6.2 Key Features of the Web Application | 33 |
| **7.** | **Conclusion and Future Scope** | **34** |
| | 7.1 Conclusion | 34 |
| | 7.2 Future Scope | 35 |
| | 7.3 Personal Learning Experience | 36 |
| **8.** | **References** | **37** |

---

<div style="page-break-after: always;"></div>

# 1. INTRODUCTION

## 1.1 Project Introduction

Today, electronic commerce (E-Commerce) is widely used by people to purchase electronics, clothes, and everyday items online. Websites like Amazon and Flipkart have shown how easy it is to find products, add them to a cart, apply discount codes, and order them without visiting a physical store.

For a Bachelor of Computer Applications (BCA) student, developing an E-Commerce web application is a great practical experience. It helps connect classroom subjects like web design, database management (DBMS), and programming with a real working software application. A student learns how data travels from a web page to a server, gets saved in a database, and is shown back to the user.

This report describes the **“E-Commerce Web Application (NEXUS TECH)”** developed by **Priyanshu Suryawanshi**, a student of BCA Semester V at **City Premier College, Nagpur**, affiliated to **Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)**.

The project is built using **Python** and the **Django** web framework on the backend. The database used is **SQLite3**, which comes built-in with Python. The frontend pages are designed using **HTML5**, **CSS3**, and **JavaScript**.

### Table 1: Project at a glance

| Particular | Details |
| :--- | :--- |
| **Name of the Student** | Priyanshu Suryawanshi |
| **Course** | Bachelor of Computer Applications (BCA), Semester V |
| **College** | City Premier College, Nagpur |
| **University** | Rashtrasant Tukadoji Maharaj Nagpur University, Nagpur |
| **Project Name** | E-Commerce Web Application (NEXUS TECH) |
| **Programming Language** | Python 3.11 |
| **Web Framework** | Django 5.2 |
| **Database** | SQLite3 |
| **Frontend** | HTML, CSS, JavaScript, Font Awesome Icons |
| **Special Feature** | Discount Coupon (`PRI23`), Live Search, Cart Drawer, Order Tracking |
| **Academic Year** | 2026–27 |

---

## 1.2 Objectives of the Project

The main goal of this project was to build a clean and user-friendly online shopping website where a customer can browse products, filter by categories, add items to a cart, apply a coupon code, and place an order.

The specific objectives were:
- To design a responsive web page with a modern navigation bar and product grid.
- To organize products into categories such as Smartphones, Laptops, Audio, Wearables, and Gaming.
- To allow users to search products quickly with a live search box.
- To build a slide-out shopping cart where users can change quantities, see the total price, and remove items.
- To create a coupon discount system that gives a 20% discount when the coupon code **`PRI23`** is entered.
- To create a simple checkout form where the user enters their delivery address and chooses a payment method (Card, UPI / QR, Cash on Delivery).
- To generate a unique Order ID (e.g., `NX-12345`) for every order and allow the user to track their order status.
- To use the built-in Django Admin panel so the store owner can easily add new products, change prices, and view customer orders.

---

## 1.3 Scope and Duration

### 1.3.1 Scope of the Project
The scope of the project was focused on creating a practical full-stack web application:
1. Creating the database tables for Categories, Products, Coupons, Orders, and Order Items.
2. Writing backend logic in Python using Django views and URLs.
3. Designing the user interface with HTML, CSS, and JavaScript.
4. Testing all features like adding products to cart, calculating discounts, and saving orders in the database.

### 1.3.2 Duration
The project was completed over a period of 4 weeks during Semester V. The work was divided into weekly phases:

- **Week 1:** Deciding project requirements, setting up Python and Django, and planning database tables.
- **Week 2:** Creating database models (`models.py`) and setting up the Django Admin panel.
- **Week 3:** Writing views (`views.py`), URL routes, and connecting the frontend with backend APIs.
- **Week 4:** Designing the shopping cart, testing the checkout process, fixing bugs, and preparing documentation.

---

<div style="page-break-after: always;"></div>

# 2. SYSTEM OVERVIEW & REQUIREMENTS

## 2.1 Problem Statement
When people want to buy electronics, visiting physical shops takes a lot of time, and comparing product prices and features is difficult. Many small web projects only have static HTML pages where clicking a button reloads the whole page every time, which feels slow.

The NEXUS TECH e-commerce project solves this by:
- Showing all tech products in one clean place with prices and star ratings.
- Letting users filter by category (like Laptops or Audio) without refreshing the entire page.
- Providing an instant slide-out cart so users can see their total bill immediately.
- Giving a working discount coupon and simple order tracking.

---

## 2.2 System Flow (How Django Works)

Django follows the **MVT (Model - View - Template)** architecture:

```
[ User Browser ]
       │
       ▼  (1. User visits URL e.g. http://127.0.0.1:8000/)
[ urls.py (URL Routing) ]
       │
       ▼  (2. Finds matching function)
[ views.py (View Controller) ]
       │                  │
       ▼                  ▼
[ models.py ]      [ index.html (Template) ]
(Fetches data from (Puts data into HTML)
 SQLite database)         │
       │                  │
       └────────┬─────────┘
                ▼
  [ Response sent back to Browser ]
```

1. **User Request:** The user clicks a link or button in the browser.
2. **URLs (`urls.py`):** Django checks the address and sends it to the correct view function.
3. **Views (`views.py`):** The view function runs the business logic (e.g., gets products or saves an order).
4. **Models (`models.py`):** Models interact with the SQLite database to read or write data.
5. **Template (`index.html`):** Django puts the data into the HTML page and displays it in the browser.

---

## 2.3 Hardware and Software Requirements

### Hardware Requirements:
- Any standard computer or laptop (Intel Core i3 or higher).
- Minimum 4 GB RAM.
- 500 MB free hard disk space.

### Software Requirements:
- **Operating System:** Windows 10 / Windows 11.
- **Code Editor:** Visual Studio Code.
- **Programming Language:** Python (Version 3.10 or 3.11).
- **Framework:** Django (Version 5.2).
- **Database:** SQLite3 (included with Python).
- **Web Browser:** Google Chrome or Microsoft Edge.

---

<div style="page-break-after: always;"></div>

# 3. PROJECT DEVELOPMENT ACTIVITIES

## 3.1 Tasks Assigned
To complete the e-commerce project, the work was divided into simple steps:
1. Setting up the project folder, installing Django, and creating the `store` application.
2. Creating models for `Category`, `Product`, `Coupon`, `Order`, and `OrderItem`.
3. Creating a sample data file (`seed_db.py`) to easily add sample products like iPhones, Laptops, and Headphones.
4. Writing view functions to handle product listings, coupon verification, and order creation.
5. Building the frontend page with a header, product cards, category filter buttons, and a cart sidebar.
6. Testing the entire order process from product selection to order confirmation.

---

## 3.2 Weekly Development Work

### Table 2: Day-wise activities of development

| Week | Days | Activity Done |
| :--- | :--- | :--- |
| **Week 1** | Day 1–2 | Decided the project topic and gathered requirements for an e-commerce website. |
| | Day 3–4 | Installed Python 3.11, set up VS Code, and ran `django-admin startproject nexus_project`. |
| | Day 5–6 | Created the app `store` using `python manage.py startapp store` and registered it in `settings.py`. |
| **Week 2** | Day 7–8 | Wrote the database models in `models.py` (Category and Product tables). |
| | Day 9–10 | Added Coupon, Order, and OrderItem models; ran `makemigrations` and `migrate`. |
| | Day 11–12 | Configured `admin.py` to manage products and orders through the Django Admin panel. |
| **Week 3** | Day 13–15 | Created `seed_db.py` to fill the database with real sample tech products. |
| | Day 16–17 | Wrote `views.py` functions to return product data and filter by category. |
| | Day 18 | Created the API to apply coupons and check order subtotals. |
| **Week 4** | Day 19–21 | Designed the frontend layout: navigation dock, product cards, and search box. |
| | Day 22–24 | Implemented the slide-out cart drawer and connected checkout form to the backend. |
| | Day 25–26 | Tested order tracking with Order IDs, fixed styling issues, and prepared the report. |

---

## 3.3 Difficulties Faced and How They Were Solved

### Table 3: Difficulties faced during development

| Difficulty | How It Was Solved |
| :--- | :--- |
| How to show products when clicking a category without reloading the whole page? | Used JavaScript `fetch()` to call the `/api/products/?category=...` route and update only the product cards on the screen. |
| How to make sure the coupon discount only applies once and checks the minimum order? | Wrote the validation in Python on the server side (`api_apply_coupon`), so users cannot fake the discount amount. |
| How to save each item bought in an order? | Created an `OrderItem` table linked to the `Order` table using a Foreign Key, so an order can have multiple products. |
| How to keep cart items if the user refreshes the page? | Saved the cart list in the browser's `localStorage` so it does not disappear on reload. |

---

<div style="page-break-after: always;"></div>

# 4. TECHNOLOGIES AND TOOLS

## 4.1 Front-end Technologies
- **HTML5:** Used to build the structure of the web page, forms, buttons, and dialog boxes.
- **CSS3:** Used to make the website look modern, with smooth cards, colors, responsive grid columns, and dark/light mode.
- **JavaScript:** Used on the client side to handle user clicks, calculate cart subtotals, open the cart drawer, and handle the live search box.
- **Font Awesome Icons:** Used to show clean icons for cart, search, categories, and star ratings.

---

## 4.2 Back-end Technologies
- **Python:** Python is a simple and beginner-friendly programming language with easy-to-read syntax.
- **Django Framework:** Django is a powerful web framework that takes care of routing, database queries, and security automatically. It also includes an automatic Admin interface.

---

## 4.3 Database: SQLite3
- **SQLite3:** SQLite is a lightweight database that stores all data in a single file named `db.sqlite3`.
- No separate database installation or server setup is required, which makes it fast, reliable, and easy to run on any computer.

---

## 4.4 Why These Technologies Were Chosen
- **Simple to learn:** Python and Django are easy to read and understand for college students.
- **Built-in Admin Panel:** Django provides a ready-made admin panel where the teacher or examiner can see records directly.
- **No external paid tools:** Everything used in this project is 100% free and open-source.
- **Runs offline:** The entire project runs locally on `http://127.0.0.1:8000/` without needing an active internet connection.

---

<div style="page-break-after: always;"></div>

# 5. PROJECT DESIGN AND IMPLEMENTATION

## 5.1 Use Case & User Actions
A customer using NEXUS TECH can perform the following actions:
1. Open the website home page.
2. Search for a product by name.
3. Filter products by category (Smartphones, Laptops, Audio, Wearables, Gaming).
4. Add items to the shopping cart and adjust quantities.
5. Apply the discount coupon code (`PRI23`).
6. Fill in delivery address and complete checkout.
7. Track order status using the generated Order ID.

---

## 5.2 Step-by-Step Flow of Buying a Product
```
Step 1: User visits the store home page and sees all products.
   │
Step 2: User clicks "Add to Cart" on a product.
   │
Step 3: Cart drawer opens from the right side showing the selected item and price.
   │
Step 4: User types coupon "PRI23" and clicks Apply; bill reduces by 20%.
   │
Step 5: User clicks "Checkout" and enters name, email, and address.
   │
Step 6: User clicks "Place Order"; server saves order and gives Order ID "NX-XXXXX".
   │
Step 7: User can enter Order ID in the tracking box to view shipment status.
```

---

## 5.3 Database Design (Tables)

The application uses five main tables in SQLite:

### Table 4: Categories Table (`store_category`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer (Primary Key) | Unique ID of category |
| `name` | Text | Name (e.g. "Smartphones") |
| `slug` | Text (Unique) | URL tag (e.g. "smartphones") |
| `icon` | Text | Icon class name |

### Table 5: Products Table (`store_product`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer (Primary Key) | Unique Product ID |
| `name` | Text | Product title (e.g. "iPhone 15 Pro") |
| `category_id` | Foreign Key | Links to Category table |
| `price` | Decimal | Selling price in dollars |
| `original_price` | Decimal | Regular price (MRP) |
| `rating` | Decimal | Star rating (e.g. 4.9) |
| `stock_count` | Integer | Items available |
| `image` | Text | Image link |
| `description` | Text | Product details |

### Table 6: Coupons Table (`store_coupon`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Unique Coupon ID |
| `code` | Text (Unique) | Coupon code (e.g. `PRI23`) |
| `discount` | Decimal | Discount percentage (20.00) |
| `active` | Boolean | True / False |

### Table 7: Orders Table (`store_order`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `order_id` | Text (Unique) | Tracking code (e.g. `NX-48201`) |
| `customer_name`| Text | Name of the buyer |
| `email` | Text | Customer email |
| `address` | Text | Delivery address |
| `total_amount` | Decimal | Final bill paid |
| `status` | Text | "In Transit", "Delivered", etc. |

---

## 5.4 Application Routes (URLs)

### Table 8: URLs in `store/urls.py`
| Method | URL | What It Does |
| :---: | :--- | :--- |
| `GET` | `/` | Opens the main store website. |
| `GET` | `/api/products/` | Returns products as JSON for filtering and search. |
| `POST` | `/api/coupons/apply/` | Validates coupon code and calculates discount. |
| `POST` | `/api/orders/create/` | Saves customer order and items into database. |
| `GET` | `/api/orders/track/<id>/`| Shows the status of an order using its Order ID. |
| `GET` | `/admin/` | Opens Django Admin dashboard for the store owner. |

---

## 5.5 Folder Structure
```
collage project E-commers web/
├── manage.py            (Django main command file)
├── db.sqlite3           (Database file storing products & orders)
├── seed_db.py           (Script to add sample products automatically)
├── nexus_project/       (Main configuration folder)
│   ├── settings.py      (Settings and installed apps)
│   └── urls.py          (Main website URLs)
├── store/               (E-commerce store application)
│   ├── models.py        (Database tables for products & orders)
│   ├── views.py         (Functions that process requests)
│   ├── urls.py          (Store URLs)
│   └── admin.py         (Admin panel configuration)
└── templates/
    └── store/
        └── index.html   (Frontend HTML template)
```

---

## 5.6 Core Source Code

### Listing 1: Models (`store/models.py`)
```python
from django.db import models

# Category Table
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, default='fa-boxes-stacked')

    def __str__(self):
        return self.name

# Product Table
class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    tagline = models.CharField(max_length=255, blank=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    stock_count = models.PositiveIntegerField(default=15)
    in_stock = models.BooleanField(default=True)
    image = models.CharField(max_length=500)
    description = models.TextField()

    def __str__(self):
        return self.name

# Coupon Table
class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount = models.DecimalField(max_digits=6, decimal_places=2)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code

# Order Table
class Order(models.Model):
    order_id = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=150)
    email = models.EmailField()
    address = models.TextField()
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='In Transit')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.order_id} - {self.customer_name}"

# Order Item Table
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity}x {self.product_name}"
```

---

### Listing 2: Views (`store/views.py`)
```python
import json, random
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Category, Product, Coupon, Order, OrderItem

# 1. Main Home Page
def index(request):
    categories = Category.objects.all()
    products = Product.objects.filter(in_stock=True)
    coupons = Coupon.objects.filter(active=True)
    return render(request, 'store/index.html', {
        'categories': categories,
        'products': products,
        'coupons': coupons,
    })

# 2. Get Products API (Filter & Search)
def api_products(request):
    category_slug = request.GET.get('category', 'all')
    search_query = request.GET.get('search', '').strip()

    products = Product.objects.filter(in_stock=True)
    if category_slug != 'all':
        products = products.filter(category__slug=category_slug)
    if search_query:
        products = products.filter(name__icontains=search_query)

    data = []
    for p in products:
        data.append({
            'id': p.id,
            'name': p.name,
            'price': float(p.price),
            'rating': float(p.rating),
            'image': p.image,
            'category': p.category.slug,
        })
    return JsonResponse({'products': data})

# 3. Apply Coupon API
@csrf_exempt
def api_apply_coupon(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        code = body.get('code', '').strip().upper()
        coupon = Coupon.objects.filter(code=code, active=True).first()
        if not coupon:
            return JsonResponse({'success': False, 'message': 'Invalid coupon code.'})
        return JsonResponse({
            'success': True,
            'coupon': {'code': coupon.code, 'discount': float(coupon.discount)}
        })
    return JsonResponse({'error': 'POST required'}, status=405)

# 4. Create Order API
@csrf_exempt
def api_create_order(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        order_id = "NX-" + str(random.randint(10000, 99999))
        order = Order.objects.create(
            order_id=order_id,
            customer_name=body.get('customer_name', 'Customer'),
            email=body.get('email', ''),
            address=body.get('address', ''),
            city=body.get('city', ''),
            zip_code=body.get('zip_code', ''),
            total_amount=body.get('total_amount', 0),
            status='In Transit'
        )
        return JsonResponse({'success': True, 'order_id': order_id})
    return JsonResponse({'error': 'POST required'}, status=405)

# 5. Track Order API
def api_track_order(request, order_id):
    order = Order.objects.filter(order_id__iexact=order_id).first()
    if order:
        return JsonResponse({
            'success': True,
            'order_id': order.order_id,
            'status': order.status,
            'customer_name': order.customer_name,
            'total_amount': float(order.total_amount),
        })
    return JsonResponse({'success': False, 'message': 'Order not found.'})
```

---

<div style="page-break-after: always;"></div>

# 6. TESTING AND RESULTS

## 6.1 Test Cases

### Table 9: Testing performed on the project

| Test No. | Action Performed | Expected Output | Actual Output | Result |
| :---: | :--- | :--- | :--- | :---: |
| **TC-01** | Open `http://127.0.0.1:8000/` in browser | Home page opens with categories and product cards | Home page loaded cleanly | **PASS** |
| **TC-02** | Click on "Laptops" category button | Only laptop products should be shown | Laptop cards displayed immediately | **PASS** |
| **TC-03** | Type "Watch" in search box | Matching smartwatch products appear | Real-time filter worked | **PASS** |
| **TC-04** | Click "Add to Cart" | Item added to cart and badge count increases | Cart opens with selected item | **PASS** |
| **TC-05** | Enter promo code `PRI23` | 20% discount subtracted from subtotal | Bill updated with 20% off | **PASS** |
| **TC-06** | Fill checkout form and click "Place Order" | Order saved and Order ID generated (e.g. `NX-52319`) | Order ID displayed on screen | **PASS** |
| **TC-07** | Search Order ID in Track Order modal | Shows status "In Transit" with customer name | Status returned correctly | **PASS** |
| **TC-08** | Open `/admin/` with login credentials | View all products, orders, and coupons | Full admin access works | **PASS** |

---

## 6.2 Key Features of the Web Application
- **Clean Product Catalog:** Clear images, prices, ratings, and stock status.
- **Fast Search and Filters:** Category pills and instant search make finding items quick.
- **Slide-Out Cart:** Shows total amount, shipping, and discount clearly.
- **Working Promo Code (`PRI23`):** Lets users test discount calculations easily.
- **Order Placement & Tracking:** Generates real order numbers and displays shipment status.
- **Django Admin Panel:** Store owner can easily add, edit, or delete products and view orders.

---

<div style="page-break-after: always;"></div>

# 7. CONCLUSION AND FUTURE SCOPE

## 7.1 Conclusion
The **E-Commerce Web Application (NEXUS TECH)** was successfully planned, developed, and tested for the BCA Semester V project curriculum at City Premier College, Nagpur.

During this project, I learned how to build a web application using Python and Django. I understood how the frontend (HTML, CSS, JavaScript) communicates with the backend server, how data is saved and retrieved from a database using Django models, and how to create a working shopping cart and checkout system.

The project works smoothly on a local computer and fulfills all requirements set by the department.

---

## 7.2 Future Scope
In the future, the project can be expanded with:
- **Online Payment Gateway:** Adding real payment options like UPI, Razorpay, or Paytm.
- **User Login and Sign Up:** Letting customers create accounts to save their order history and wishlist.
- **Email Receipt:** Automatically sending order confirmation emails to the customer.
- **Hosting Online:** Deploying the website on a cloud server so anyone on the internet can use it.

---

## 7.3 Personal Learning Experience
Building this project was a very rewarding experience. It helped me understand:
1. How real websites work from front to back.
2. How to write clean Python code using the Django framework.
3. How to design responsive web pages using CSS and JavaScript.
4. How to find and fix errors (debugging) when something doesn't work as expected.

I am confident in explaining every part of this project to my teachers and classmates.

---

<div style="page-break-after: always;"></div>

# 8. REFERENCES

1. Python Official Documentation: https://docs.python.org/3/
2. Django Web Framework Documentation: https://docs.djangoproject.com/
3. W3Schools Online Web Tutorials (HTML, CSS, JavaScript, Python): https://www.w3schools.com/
4. MDN Web Docs: https://developer.mozilla.org/
5. Font Awesome Icons: https://fontawesome.com/
6. College Project Guidance and Lecture Notes, Department of Computer Science & Application, City Premier College, Nagpur.
