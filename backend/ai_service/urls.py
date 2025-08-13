from django.urls import path
from .views import SmartTaskView
from .views import ContextAnalysisView

urlpatterns = [
    path('smart-task/', SmartTaskView.as_view(), name='smart-task'),
    path('context-analysis/', ContextAnalysisView.as_view(), name='context-analysis'),
]
