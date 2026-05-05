from django.shortcuts import render
from .models import Book

def home(request):
    return render(request, 'index.html')

def borrowed_books(request):
    return render(request, 'borrowed_books.html')

def user_books(request):
    return render(request, 'user_books.html')

def search(request):
    title = request.GET.get('title', '')
    author = request.GET.get('author', '')
    category = request.GET.get('category', 'Any')
    availability = request.GET.get('availability', 'Any')

    books = Book.objects.all()

    if title:
        books = books.filter(title__icontains=title)

    if author:
        books = books.filter(author__icontains=author)

    if category != 'Any':
        books = books.filter(category=category)

    if availability != 'Any':
        books = books.filter(availability=availability)

    return render(request, 'search.html', {
        'books': books,
        'title': title,
        'author': author,
        'category': category,
        'availability': availability,
    })
