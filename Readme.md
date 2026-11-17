## OneAI — Multi-Agent AI Platform

**One Platform, Multiple Tasks.** 
*A full-stack, microservices-based AI platform that brings conversational AI, web research, coding assistance, document creation, image generation, and document understanding together in one application.*

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [AI agents](#ai-agents)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Project View](#project-view)
- [Creator](#creator)

---

## Overview

**OneAI** is an AI-powered workspace designed to make multiple specialized AI capabilities available through a single interface. Instead of requiring users to open separate tools for chatting, researching, coding, analyzing documents, or generating content, OneAI brings these workflows together.

The application follows a **microservices architecture**. A frontend communicates with an API gateway, which routes requests to independent backend services. The AI layer uses a routing/decision component to select an appropriate agent and language model for a task. Supporting services handle authentication, conversations, billing, file processing, and other application responsibilities.

The platform is built around these ideas:

- **One interface:** access different AI capabilities from a unified chat experience.
- **Specialized agents:** route tasks to agents designed for particular jobs.
- **Modular backend:** keep major application responsibilities in separate services.
- **Persistent experience:** maintain user sessions and conversation history.
- **Extensible design:** add or improve agents and services without redesigning the whole application.

## Features

### AI-powered workspace

- Chat with AI through a unified interface.
- Use automatic agent selection or choose a specialized agent when available.
- Maintain conversations and revisit previous chat history.
- Render formatted responses, including Markdown and code snippets.

### Specialized AI capabilities

- General-purpose conversational assistance.
- Web/search-oriented responses using a search agent and search provider integration.
- Coding assistance for programming questions and code generation.
- PDF/document question answering and retrieval-augmented generation (RAG) workflows.
- Image understanding and analysis.
- AI image generation with generated assets stored in cloud object storage.
- PDF and presentation generation workflows.


### Application infrastructure

- API gateway for routing frontend requests to backend services.
- Independent backend services for application domains.
- *Redis* for session and other short-lived application data.
- *MongoDB Atlas* for application records such as users, conversations, and payment records.
- *Amazon Web Srvice* for faster and better deployment

## AI agents

OneAI uses an agent-oriented design. Agent service is the brain of this application.

1. *Chat agent* | for general conversation. |
2. *Search agent* | for web serach and real time data fetching. |
3. *Coding agent* | for code generation. |
4. *PDF analyzer agent* | for pdf processing and generating responses according to it. |
5. *Image analyzer agent* | for image processing and generating responses according to it. |
6. *Image generation agent* | for image generation. |
7. *PDF agent* | for pdf generation. |
8. *PPT agent* | for ppt generation. |

The current model integrations include **Groq**, **OpenAi**, **Google Gemini** AI models.

## Technology stack

1. *Frontend* | React, Vite, Tailwind CSS, Redux Toolkit, Axios |
2. *Backend* | Node.js, Express.js |
3. *Database* | MongoDB, Mongoose |
4. *Session* | Redis |
5. *Authentication* | Firebase Authentication |
6. *AI orchestration* | LangChain, LangGraph |
7. *AI Models* | Groq, OpenAI, Google Gemini, OpenRouter |
8. *Search* | Tavily (where configured) |
9. *Payments* | Razorpay |
10. *File and image storage* | Amazon S3 |
11. *Document generation and analysation* | PDFKit, PptxGenJS, Rag, VectorDB |
12. *Containerise* | Docker |
12. *Deployment* | Amazon Web Service, GitHub Actions CI/CD |


## Project structure

```text
OneAI/
├── frontend/                 # React + Vite client application
│   ├── src/
│   │   ├── components/       # Shared UI components
│   │   ├── pages/            # Application pages
│   │   ├── redux/            # Redux slices and store
│   │   ├── services/         # API clients / request helpers
│   │   └── ...
│   ├── public/
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── gateway/              # API gateway and proxy configuration
│   └── services/
|       ├── agent/             # AI agents
│       ├── auth/              # Authentication, users, sessions
│       ├── chat/              # Conversations 
│       └── billing/           # Razorpay order and payment verification
│
├── .github/
│   └── workflows/            # CI/CD workflows
├── README.md
└── ...
```

## Getting started

### Prerequisites

Install the following before running the project:

- VS Code or any other code editor.
- Node.js
- MongoDB instance or MongoDB connection string.
- Redis instance or Redis connection URL.
- Firebase project with Google Authentication enabled.
- API credentials for the AI providers you intend to use (Groq, OpenAI, Google Gemini etc.).
- Credentials for optional integrations such as Tavily, Razorpay, and AWS.

### 1. Clone the repository

```bash
git clone https://github.com/naskar-akash/OneAI.git
cd OneAI
```

### 2. Install dependencies

Install frontend service:

```bash
cd frontend
npm install
```

Then install backend services seperately:

```bash
cd backend/gateway
npm install

cd backend/services/agent
npm install

cd backend/services/auth
npm install

cd backend/services/chat
npm install

cd backend/services/billing
npm install
``` 

## Deployment

OneAI is deployed in *Amazon Web Service*
Deployed version of this application is: [https://oneai.com](https://d108iamaxsxeou.cloudfront.net/)

## Project View

[Google drive link](https://drive.google.com/drive/folders/1Oa9lSlwsv2pcOLhBv27n88AKGC_5b5oQ)

## Creator

OneAI is developed and maintained by Akash Naskar
