🧑‍⚖️ AI Judge — Backend

The AI Judge Backend is a Node.js + Express + MongoDB server that powers an AI-driven mock trial system.
It processes document uploads, extracts text from files, stores case data, and generates AI verdicts using Google Gemini 2.0 Flash Thinking.

This backend is fully modular, API-driven, and integrates with the React frontend.

🚀 Tech Stack

Node.js (ES Modules)

Express.js

MongoDB + Mongoose

Multer (file uploads)

pdf-parse (PDF text extraction)

mammoth (DOCX text extraction)

Google Gemini 2.x API (@google/genai)

CORS + dotenv

📁 Folder Structure
backend/
│
├── src/
│   ├── server.js
│   ├── config/
│   │    └── db.js
│   ├── models/
│   │    └── Case.js
│   ├── routes/
│   │    ├── upload.js
│   │    └── cases.js
│   ├── controllers/
│   │    ├── uploadController.js
│   │    └── caseController.js
│   ├── utils/
│   │    ├── parseFile.js
│   │    └── ai.js
│   └── uploads/   (auto-created for storing files)
│
├── .env
├── package.json
└── README.md