from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())  # <--- ADD THIS LINE

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'priority', 'completed', 'user']
