from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .models import Profile
import re


def home(request):
    return render(request, 'index.html')


def signup_view(request):

    if request.method == "POST":

        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        role = 'user'

        # username exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists!")
            return redirect('signup')

        # email exists
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists!")
            return redirect('signup')

        # password strength
        pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$'

        if not re.match(pattern, password):

            messages.error(
            request,
            "Password must contain uppercase, lowercase, number, and be at least 8 characters!"
            )

            return redirect('signup')
        
        # password match
        if password != confirm_password:
            messages.error(request, "Passwords do not match!")
            return redirect('signup')

        # create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        user.save()

        Profile.objects.create(
            user=user,
            role=role
        )

        messages.success(request, "Account created successfully!")

        return redirect('login')

    return render(request, 'signup.html')


def login_view(request):

    if request.method == "POST":
        
        username_email = request.POST.get('username_email')
        password = request.POST.get('password')

        # check if input is email
        if '@' in username_email:

            try:
                user_obj = User.objects.get(email=username_email)
                username = user_obj.username

            except User.DoesNotExist:
                messages.error(
                    request,
                    "Invalid username/email or password!"
                )
                return redirect('login')

        else:
            username = username_email

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)
            messages.success(request, "Login Successful!")
            return redirect('user_books')

        else:
            messages.error(
                request,
                "Invalid username/email or password!"
            )
            return redirect('login')

    return render(request, 'login.html')


def logout_view(request):
    logout(request)
    return redirect('login')

from django.contrib.auth.decorators import login_required
@login_required
def user_books(request):
    return render(request, 'user_books.html')
