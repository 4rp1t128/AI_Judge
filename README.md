🧑‍⚖️ AI Judge — Full Project (MERN + Gemini 2.0)

A complete MERN application that simulates a mock court trial between two parties (Side A & Side B). Both sides upload documents and arguments, while the AI Judge (powered by Google Gemini 2.x) generates a verdict and allows up to 5 follow-up rounds.


🚀 Features
🟦 Frontend (React + Vite + Tailwind)

Clean 3-panel UI (Side A, AI Judge, Side B)

File uploads (PDF, DOCX, TXT)

Send arguments per side

View verdict history

Submit up to 5 follow-up rounds

Global loading + error handling

State management using Context API

🟥 Backend (Node.js + Express + MongoDB)

File upload using Multer

Text extraction:

pdf-parse (PDF)

mammoth (DOCX)

fs (TXT)

Google Gemini AI:

Model: gemini-2.0-flash-thinking

Retry system for overload (503)

Graceful fallback responses

Case storage in MongoDB (Documents, arguments, verdicts)

Follow-up limit control

🧩 Tech Stack

Frontend:
React, Vite, TailwindCSS, Axios, Context API

Backend:
Node.js, Express, MongoDB, Mongoose, Multer, dotenv

AI Engine:
Google Gemini (via @google/genai)

🛠️ Installation (Backend + Frontend)

Clone the repository:

git clone https://github.com/your-username/ai-judge.git
cd ai-judge

🔧 1. Backend Setup
Step 1 — Go to backend folder
 - cd backend

Step 2 — Install dependencies
 - npm install

Step 3 — Add .env file

Create a file named .env in backend/:

PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/ai_judge
GEMINI_API_KEY=your_google_api_key_here

Step 4 — Run the backend
 - npm run dev



🎨 2. Frontend Setup
Step 1 — Open terminal and go to frontend folder
 - cd frontend

Step 2 — Install dependencies
 - npm install

Step 3 — Run the React app
 - npm run dev

Youtube Link - https://youtu.be/NuVp11Kdz_w
