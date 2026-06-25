# Architecture

## Agent Roles
- **Hermes** (brain): Plans tasks, remembers context, runs cron jobs, orchestrates via Slack
- **OpenClaw** (hands): Writes and runs code, reports back in Slack channels

## Slack Channel Scheme
- #sprint-main: Human posts goals → Hermes plans and responds
- #agent-coder: Hermes assigns coding tasks → OpenClaw works and reports
- #agent-log: Autonomous cron job output and raw agent logs

## Model Routing
- Hermes: google/gemini-3.1-flash-lite (planning, memory, orchestration)
- OpenClaw: groq/llama-3.1-8b-instant (coding, execution)
- Routing rationale: Stronger model for planning, faster/cheaper model for code execution

## Stack
- Backend: Laravel 13 + SQLite REST API
- Frontend: React 19 + Vite + Tailwind CSS + Axios
- Agent 1: OpenClaw (coding agent via Slack Socket Mode)
- Agent 2: Hermes (orchestrator with memory + skills + cron)
- Deploy: Vercel (frontend) + Render (backend)

## Human-in-the-loop Flow
1. Human posts goal in #sprint-main
2. Hermes posts plan and breaks into tasks
3. Hermes assigns task to OpenClaw in #agent-coder
4. OpenClaw writes code, runs it, reports: What I Did / What's Left / What Needs Your Call
5. Human reviews and approves in Slack