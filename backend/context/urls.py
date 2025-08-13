from django.urls import path
from .views import ContextEntryListCreateView

urlpatterns = [
    path('context/', ContextEntryListCreateView.as_view(), name='context-list-create'),
]
