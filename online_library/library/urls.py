from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('search/', views.search, name='search'),
    path('borrowed_books/', views.borrowed_books, name='borrowed_books'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('books/', views.user_books, name='user_books'),
    path('admin/books/', views.admin_books, name='admin_books'),
    path('admin/book_details/<int:id>/', views.admin_book_details, name='admin_book_details'),
    path('admin/increase_copies/<int:id>/', views.increase_copies, name='increase_copies'),
    path('admin/decrease_copies/<int:id>/', views.decrease_copies, name='decrease_copies'),
    path('admin/delete_book/<int:id>/', views.delete_book, name='delete_book'),
]
