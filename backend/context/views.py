from rest_framework import generics, permissions
from .models import ContextEntry
from .serializers import ContextEntrySerializer

class ContextEntryListCreateView(generics.ListCreateAPIView):
    serializer_class = ContextEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ContextEntry.objects.filter(user=self.request.user).order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
