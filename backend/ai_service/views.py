import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
import re

class SmartTaskView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # Configure Gemini with your API key
        genai.configure(api_key="Your API Key")  # Replace with your actual key
        
        # ✅ Use the correct model name for Gemini 2.0 Flash
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        task_title = request.data.get('title', '')
        task_description = request.data.get('description', '')
        
        prompt = f"""
        Analyze this task and provide smart suggestions:
        Title: {task_title}
        Description: {task_description}
        
        Return ONLY a valid JSON object with:
        {{
            "priority": <number 1-5, where 5 is most urgent>,
            "enhanced_description": "<improved detailed description>",
            "suggested_due_days": <number of days from now, or null>,
            "category": "<Work|Personal|Health|Shopping|Study|Other>",
            "subtasks": ["<subtask1>", "<subtask2>", "<subtask3>"],
            "reasoning": "<brief explanation of suggestions>"
        }}
        """
        
        try:
            response = model.generate_content(prompt)
            # Clean and parse the response
            response_text = response.text.strip()
            
            # Extract JSON from response (remove any markdown formatting)
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                json_str = json_match.group()
                ai_data = json.loads(json_str)
                return Response({"success": True, "ai_suggestions": ai_data})
            else:
                return Response({"success": False, "error": "Could not parse AI response"})
                
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=500)

class ContextAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        import google.generativeai as genai
        import json, re

        genai.configure(api_key="Your API Key")  # Replace with your key
        model = genai.GenerativeModel('gemini-2.0-flash')

        context_entries = request.data.get('context', [])
        tasks = request.data.get('tasks', [])

        prompt = f"""
        Analyze the user's daily context and current tasks.
        Context: {context_entries}
        Tasks: {tasks}

        Provide a JSON with:
        {{
            "new_task_suggestions": ["<title1>", "<title2>"],
            "priority_updates": [{{"task_title": "<title>", "new_priority": <1-5>}}],
            "deadline_recommendations": [{{"task_title": "<title>", "suggested_days": <number>}}],
            "productivity_insights": ["<insight1>", "<insight2>"]
        }}
        """

        try:
            response = model.generate_content(prompt)
            text = response.text.strip()
            match = re.search(r'\{.*\}', text, re.DOTALL)
            if not match:
                return Response({"success": False, "error": "Invalid AI Output"})
            data = json.loads(match.group())
            return Response({"success": True, "analysis": data})
        except Exception as e:
            return Response({"success": False, "error": str(e)}, status=500)
