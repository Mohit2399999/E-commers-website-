from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/products/', views.api_products, name='api_products'),
    path('api/coupons/apply/', views.api_apply_coupon, name='api_apply_coupon'),
    path('api/orders/create/', views.api_create_order, name='api_create_order'),
    path('api/orders/track/<str:order_id>/', views.api_track_order, name='api_track_order'),
]
