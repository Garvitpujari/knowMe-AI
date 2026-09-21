# KnowMe AI — Personal Knowledge Assistant

KnowMe AI is a personal AI assistant that allows users to ask questions about **Garvit Pujari** and receive answers based on his personal, academic, technical, project, and professional information.

The project combines a **React frontend**, **FastAPI backend**, **Retrieval-Augmented Generation (RAG)**, and an **LLM** to create an interactive personal knowledge assistant.

## 🚀 Live Demo

👉 https://know-me-ai-qgcb-git-main-garvitpujaris-projects.vercel.app/

---

## ✨ Features

- 🤖 AI chatbot for asking questions about Garvit
- 🧠 Retrieval-Augmented Generation (RAG)
- 📚 Answers based on personal knowledge/document data
- 💬 Interactive chat interface
- 💾 Chat history stored in browser `localStorage`
- 🔄 Persistent conversations after page refresh
- 🧹 Clear chat functionality
- ⌨️ Press `Enter` to send messages
- 🏠 Navigation between portfolio and chatbot
- 🌐 React frontend deployed on Vercel
- ⚡ FastAPI backend deployed on Render

---

## 🏗️ Architecture

```text
                    User
                      │
                      ▼
             React Portfolio
                      │
                      │
               Ask KnowMe AI
                      │
                      ▼
                Chat Interface
                      │
                      │ POST /chat
                      ▼
              FastAPI Backend
                      │
                      ▼
                  RAG Chain
                      │
          ┌───────────┴───────────┐
          │                       │
     Knowledge Base          LLM / Model
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
                AI Response
                      │
                      ▼
               React Chat UI
