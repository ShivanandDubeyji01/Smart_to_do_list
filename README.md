Title: Smart To‑Do List with AI Context Integration
Description:
A full‑stack task management application built with Django REST Framework (backend) and React + Tailwind CSS (frontend) featuring:

AI‑powered task prioritization, enhancement, and deadline suggestions via Google Gemini

Daily Context integration (WhatsApp messages, emails, notes) into AI analysis

Modern, responsive dark‑mode UI

Tech Stack
Layer	Technology Used
Frontend	React, Tailwind CSS, React Router
Backend	Django, Django REST Framework
Database	PostgreSQL
AI	Google Gemini API (gemini-2.0-flash)
Auth	JWT (SimpleJWT)
API Client	Axios
Features
Core:

User authentication (Register/Login/Logout)

Create, read, edit, delete tasks

Task priority, due dates, completion status

AI Features:

AI‑powered suggestions for priority, description, deadlines

AI enhancement of task descriptions

Context‑aware reasoning

Daily Context:

Store text from WhatsApp, email, notes
Installation & Setup
Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Frontend
cd frontend
npm install
npm run dev    



Usage Flow
Register or Login

Add Tasks via Dashboard

Use "✨ Get AI Suggestions" in TaskForm to auto‑enhance tasks

Add Daily Context from /context page

Click "✨ Analyze Context with AI" to get actionable multi‑task insights

Apply new tasks or updates manually (future: one‑click add)


ScreenShots of UI
<img width="1893" height="879" alt="image" src="https://github.com/user-attachments/assets/7591b36c-6c3d-4230-b39c-18673328b62c" />
<img width="1912" height="885" alt="image" src="https://github.com/user-attachments/assets/0b7d0ad6-edae-4656-8905-7e6ae1489319" />

<img width="1901" height="875" alt="image" src="https://github.com/user-attachments/assets/8a6d4e64-0fc7-4e0a-93a0-2775a86148e1" />

<img width="1880" height="700" alt="image" src="https://github.com/user-attachments/assets/8ec3cef4-6dfa-4f73-ad6e-ff2db82334c6" />
<img width="1899" height="885" alt="image" src="https://github.com/user-attachments/assets/e66f7540-9b48-4858-9192-ef47894223e5" />




