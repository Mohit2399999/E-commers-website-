# 🎓 Django Backend Explained (Simple College Guide)

This guide breaks down the backend of **Nexus Tech** in plain, simple English so you can easily understand and explain it to your professors and examiners.

---

## 🏗️ 1. How Django Works: The M-V-T Architecture

Django uses **M-V-T** (Model - View - Template) pattern:

```text
Browser / User
     │
     ▼ (HTTP Request)
[ urls.py ]        ───► Directs URL to correct function
     │
     ▼
[ views.py ]       ───► The "Brain" (processes logic & requests)
    ▲     │
    │     ▼
    │   [ models.py ] ───► Fetches or saves data in SQLite DB
    │     │
    ▼     ▼
[ templates / JSON ]  ───► Returns HTML or JSON back to the browser
```

---

## 📁 2. The 4 Key Backend Files

### 1. `store/models.py` — The Database Tables
Each Python class in this file is a table in your SQLite database:
- **`Category`**: Stores categories (`Audio`, `Smartphones`, `Laptops`).
- **`Product`**: Stores each gadget (`name`, `price`, `rating`, `stock_count`, `image`).
- **`Coupon`**: Stores promo codes like `PRI23` (gives 20% discount).
- **`Order`**: Stores customer checkout info (`customer_name`, `address`, `total_amount`, `payment_method`).
- **`OrderItem`**: Stores each individual item purchased inside an order.

---

### 2. `store/views.py` — The Brain (Logic Layer)
Handles incoming requests and returns responses. It contains 5 simple functions:

| View Function | What It Does in 1 Sentence |
| :--- | :--- |
| **`index(request)`** | Loads categories, products, and active coupons and displays the home page. |
| **`api_products(request)`** | Filters products by category/search/price and returns them as JSON. |
| **`api_apply_coupon(request)`** | Checks if coupon code (e.g. `PRI23`) is valid and calculates discount. |
| **`api_create_order(request)`** | Saves customer order + purchased items into the database. |
| **`api_track_order(request, id)`** | Searches database for an Order ID and returns current shipment status. |

---

### 3. `store/urls.py` — The Traffic Police (Routing)
Connects browser URLs to functions in `views.py`:
- `''` ➡️ `views.index`
- `'api/products/'` ➡️ `views.api_products`
- `'api/coupons/apply/'` ➡️ `views.api_apply_coupon`
- `'api/orders/create/'` ➡️ `views.api_create_order`
- `'api/orders/track/<id>/'` ➡️ `views.api_track_order`

---

### 4. `store/admin.py` — Admin Management
Registers the models with Django's built-in Admin panel (`/admin`):
- Allows you to add, edit, or delete products and coupons via a graphical UI.
- Displays incoming orders and ordered items with status filters.

---

## ⚡ 3. How to Run the Project Easily (1-Click)

Simply **double-click** the file:
```
run.bat
```
This batch file will:
1. Verify Python is installed.
2. Run database migrations automatically.
3. Open your browser directly to `http://127.0.0.1:8000/`.
4. Start the Django development server.

---

## 🎯 4. Top 5 Viva Questions & Simple Answers

**Q1: What database are you using?**
> *"I am using SQLite3, which is the lightweight default database bundled with Django. Because Django uses an Object-Relational Mapper (ORM), we can easily switch to MySQL or PostgreSQL without rewriting code."*

**Q2: How does the frontend communicate with Django?**
> *"The frontend uses JavaScript `fetch()` API calls to send asynchronous JSON requests to Django REST endpoints (e.g., `/api/products/`, `/api/orders/create/`)."*

**Q3: What is Django ORM?**
> *"ORM stands for Object-Relational Mapping. It lets us write Python classes and queries (like `Product.objects.filter(in_stock=True)`) instead of writing raw SQL commands like `SELECT * FROM store_product`."*

**Q4: How are orders saved when a customer buys something?**
> *"When the checkout form is submitted, the frontend sends a POST request to `/api/orders/create/`. Django reads the JSON payload, creates an `Order` record, creates associated `OrderItem` records with a foreign key, and returns the generated Order ID."*

**Q5: What is the admin panel credentials?**
> - URL: `http://127.0.0.1:8000/admin`
> - Username: `admin`
> - Password: `admin123`
