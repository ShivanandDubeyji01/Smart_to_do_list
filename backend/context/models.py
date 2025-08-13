from django.db import models
from django.contrib.auth.models import User

class ContextEntry(models.Model):
    SOURCE_TYPES = [
        ('whatsapp', 'WhatsApp'),
        ('email', 'Email'),
        ('notes', 'Notes'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    source_type = models.CharField(max_length=20, choices=SOURCE_TYPES)
    timestamp = models.DateTimeField(auto_now_add=True)
    processed_insights = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.source_type} - {self.content[:30]}"
