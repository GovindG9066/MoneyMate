from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.landing, name='landing'),
    path('home/', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),
    path('add_expense/', views.add_expense, name='add_expense'),
    path("add-income/", views.add_income, name="add_income"),
    path("edit-expense/<int:id>/", views.edit_expense, name="edit_expense"),
    path('profile/', views.profile_view, name='profile'),
    path("reports/", views.reports, name="reports"),
    path('download-history/', views.download_history_pdf, name='download_history'),

    # =======================
    # 🔐 Password Reset URLs
    # =======================

    path(
        "forgot-password/",
        auth_views.PasswordResetView.as_view(
            template_name="registration/password_reset_form.html"
        ),
        name="password_reset"
    ),

    path(
        "password-reset-done/",
        auth_views.PasswordResetDoneView.as_view(
            template_name="registration/password_reset_done.html"
        ),
        name="password_reset_done"
    ),

    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            template_name="registration/password_reset_confirm.html"
        ),
        name="password_reset_confirm"
    ),

    path(
        "reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            template_name="registration/password_reset_complete.html"
        ),
        name="password_reset_complete"
    ),
]
