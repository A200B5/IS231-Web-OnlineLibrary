from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('search/', views.search, name='search'),
    path('borrowed_books/', views.borrowed_books, name='borrowed_books'),
    path('user_books/', views.user_books, name='user_books'),
]