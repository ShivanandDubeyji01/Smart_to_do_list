# Create your models here.
from django.db import models
from django.contrib.auth.models import User  # Using Django's built-in User model

class Task(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,      # If a user is deleted, delete their tasks
        related_name='tasks'           # Allows reverse lookup: user.tasks.all()
    )
    title = models.CharField(max_length=200)  # Short title of the task
    description = models.TextField(blank=True)  # Optional longer description
    due_date = models.DateTimeField()          # When task should be done
    priority = models.IntegerField(default=1)  # Could be 1=Low, 2=Medium, 3=High
    completed = models.BooleanField(default=False)  # Task status
    created_at = models.DateTimeField(auto_now_add=True)  # Auto set when created
    updated_at = models.DateTimeField(auto_now=True)      # Auto update on edits

    def __str__(self):
        return f"{self.title} ({'Done' if self.completed else 'Pending'})"
