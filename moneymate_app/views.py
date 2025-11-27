from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Expense, Wallet
from .models import Expense, Wallet, Income, Profile



# --------------------------------------------
# Landing Page 
# --------------------------------------------
def landing(request):
    return render(request, 'landingPage.html')


# --------------------------------------------
# Home Page (Only after login)
# --------------------------------------------

# HOME 2

@login_required(login_url='login')
def home(request):
    wallet, created = Wallet.objects.get_or_create(user=request.user)

    expenses = Expense.objects.filter(user=request.user).order_by('-date')
    incomes = Income.objects.filter(user=request.user).order_by('-date')

    total_spent = sum(exp.amount for exp in expenses)

    return render(request, "index.html", {
        "wallet": wallet,
        "expenses": expenses,
        "incomes": incomes,       # <-- IMPORTANT
        "total_spent": total_spent,
    })



from django.utils.text import slugify
import random
import string

def _generate_unique_username(base):
    base = slugify(base)[:30] or "user"
    username = base
    counter = 0
    while User.objects.filter(username=username).exists():
        counter += 1
        # try base + counter; ensure length <= 30
        suffix = str(counter)
        username = (base[:30 - len(suffix)]) + suffix
    return username

def register_view(request):
    if request.method == "POST":
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip().lower()
        phone = request.POST.get('phone', '').strip()
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        # Basic checks
        if not email or not password or not confirm_password:
            messages.error(request, "Please fill all required fields.")
            return redirect('register')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect('register')

        # Create a safe username (use email local part but ensure uniqueness)
        local_part = email.split('@')[0]
        username = _generate_unique_username(local_part.lower())

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=name,
        )
        user.save()

        # Optionally create Wallet & Profile right away to avoid missing profile later
        Wallet.objects.get_or_create(user=user)
        Profile.objects.get_or_create(user=user)

        messages.success(request, "Account created successfully! Please login.")
        return redirect('login')

    return render(request, 'Registration.html')


# --------------------------------------------
# Login Logic
# --------------------------------------------

# Third

from django.contrib.auth import authenticate

def login_view(request):
    if request.method == "POST":
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password')

        if not email or not password:
            messages.error(request, "Please enter email and password.")
            return redirect('login')

        # Step 1: find user by email
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "Invalid email or password.")
            return redirect('login')

        # Step 2: authenticate using their username
        user = authenticate(request, username=user_obj.username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid email or password.")
            return redirect('login')

    return render(request, 'login.html')




def logout_view(request):
    logout(request)
    return redirect('login')




@login_required(login_url='login')
def add_expense(request):
    if request.method == "POST":
        title = request.POST.get('title')
        amount = request.POST.get('amount')
        category = request.POST.get('category')
        date = request.POST.get('date')

        # ---------------------- Validation ----------------------
        if not title or not amount or not date:
            messages.error(request, "Please fill all required fields.")
            return redirect("home")

        try:
            amount = int(amount)
            if amount <= 0:
                messages.error(request, "Amount must be greater than 0.")
                return redirect("home")
        except ValueError:
            messages.error(request, "Invalid amount entered.")
            return redirect("home")

        # ---------------------- Wallet Logic ----------------------
        wallet, created = Wallet.objects.get_or_create(user=request.user)

        if wallet.balance < amount:
            messages.error(request, "Insufficient wallet balance!")
            return redirect("home")

        wallet.balance -= amount
        wallet.save()

        # ---------------------- Save Expense ----------------------
        Expense.objects.create(
            user=request.user,
            title=title,
            amount=amount,
            category=category,
            date=date
        )

        messages.success(request, "Expense added successfully!")
        return redirect('home')

    return redirect('home')


from .models import Income

@login_required(login_url='login')
def add_income(request):
    if request.method == "POST":
        amount = request.POST.get("amount")
        source = request.POST.get("source")
        date = request.POST.get("date")
        description = request.POST.get("description")

        if not amount or not source or not date:
            messages.error(request, "Please fill all required fields.")
            return redirect('home')

        try:
            amount = int(amount)
        except:
            messages.error(request, "Invalid amount.")
            return redirect('home')

        wallet, _ = Wallet.objects.get_or_create(user=request.user)
        wallet.balance += amount
        wallet.save()

        Income.objects.create(
            user=request.user,
            amount=amount,
            source=source,
            date=date,
            description=description
        )

        messages.success(request, "Money added successfully!")
        return redirect("home")

    return redirect("home")


@login_required(login_url='login')
def edit_expense(request, id):
    expense = Expense.objects.get(id=id, user=request.user)
    wallet = Wallet.objects.get(user=request.user)

    if request.method == "POST":
        new_title = request.POST.get("title")
        new_amount = int(request.POST.get("amount"))
        new_category = request.POST.get("category")
        new_date = request.POST.get("date")

        old_amount = expense.amount
        difference = new_amount - old_amount

        # If new amount > old amount → extra money need
        if difference > 0:
            if wallet.balance < difference:
                messages.error(request, "Insufficient balance for update!")
                return redirect("edit_expense", id=id)
            wallet.balance -= difference

        else:
            # If reduced amount → refund the difference
            wallet.balance += abs(difference)

        wallet.save()

        # Update expense
        expense.title = new_title
        expense.amount = new_amount
        expense.category = new_category
        expense.date = new_date
        expense.save()

        messages.success(request, "Expense updated successfully!")
        return redirect("home")

    return render(request, "edit.html", {"expense": expense})

from .models import Profile


@login_required(login_url='login')
def profile_view(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    user = request.user

    if request.method == "POST":

        # Update only editable fields
        user.first_name = request.POST.get("first_name", user.first_name)
        user.last_name  = request.POST.get("last_name", user.last_name)


        user.save()

        # Profile info
        profile.dob = request.POST.get("dob", profile.dob)

        if request.FILES.get("profile_image"):
            profile.profile_image = request.FILES["profile_image"]

        profile.save()

        return redirect("home")

    return render(request, "profile.html", {"profile": profile})


# Charts

from django.db.models import Sum
from datetime import datetime, timedelta

@login_required
def reports(request):
    user = request.user
    today = datetime.today()
    last_30 = today - timedelta(days=30)

    # Last 30 days expenses
    expenses = Expense.objects.filter(user=user, date__gte=last_30)
    incomes = Income.objects.filter(user=user, date__gte=last_30)

    # Doughnut chart → total income & total expense
    total_income = incomes.aggregate(Sum("amount"))["amount__sum"] or 0
    total_expense = expenses.aggregate(Sum("amount"))["amount__sum"] or 0

    # Category-wise Bar chart
    categories = {}
    for e in expenses:
        categories[e.category] = categories.get(e.category, 0) + e.amount

    category_labels = list(categories.keys())
    category_values = list(categories.values())

    # Monthly line chart (last 6 months)
    month_labels = []
    income_monthly = []
    expense_monthly = []

    for i in range(6):
        month_date = today - timedelta(days=30 * i)
        month_str = month_date.strftime("%b %Y")
        month_labels.append(month_str)

        income_total = Income.objects.filter(
            user=user,
            date__month=month_date.month,
            date__year=month_date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

        expense_total = Expense.objects.filter(
            user=user,
            date__month=month_date.month,
            date__year=month_date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

        income_monthly.append(income_total)
        expense_monthly.append(expense_total)

    month_labels.reverse()
    income_monthly.reverse()
    expense_monthly.reverse()

    return render(request, "reports.html", {
        "total_income": total_income,
        "total_expense": total_expense,
        "category_labels": category_labels,
        "category_values": category_values,
        "month_labels": month_labels,
        "income_monthly": income_monthly,
        "expense_monthly": expense_monthly,
    })
