
from django.urls import path
from . import views


urlpatterns = [
    path('', views.landing, name='landing'),
    path('home/', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),
    path('add_expense/', views.add_expense, name='add_expense'),
    # path('add-money/', views.add_money, name='add_money'),
    path("add-income/", views.add_income, name="add_income"),
    path("edit-expense/<int:id>/", views.edit_expense, name="edit_expense"),
    path('profile/', views.profile_view, name='profile'),
    path("reports/", views.reports, name="reports"),

]
