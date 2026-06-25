\# Forge 2 Qualifier — Kanban Board



A Trello-style Kanban board built by AI agents (OpenClaw + Hermes) through Slack.



\## Live URL

\- Frontend: https://YOUR-VERCEL-URL.vercel.app

\- Backend: https://YOUR-RENDER-URL.onrender.com



\## Models Used

\- Hermes (brain): Google Gemini 3.1 Flash Lite (free tier)

\- OpenClaw (hands): Groq llama-3.1-8b-instant (free tier)



\## Features

\- Create boards, lists, cards

\- Move cards between lists

\- Add colored tags to cards

\- Assign members to cards

\- Due dates with overdue highlighting in red



\## Run Locally



\### Backend

cd backend

composer install

cp .env.example .env

php artisan key:generate

touch database/database.sqlite

php artisan migrate

php artisan serve



\### Frontend

cd frontend

npm install

npm run dev

