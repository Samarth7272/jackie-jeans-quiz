# 👖 Jackie Jeans Fit Quiz

### AI-Powered Onboarding with Manual and Voice Flows (Next.js · Groq AI · Web Speech API)

*A fast, conversational fit-quiz that guides a shopper through onboarding either by tapping answers or by simply talking. Groq AI turns free-form answers into structured results, and the browser's Web Speech API powers the hands-free voice flow.*

[

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)

](https://nextjs.org)
[

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

](https://www.typescriptlang.org)
[

![Groq](https://img.shields.io/badge/Groq-AI-F55036)

](https://groq.com)
[

![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)

](https://jackie-jeans-quiz-nine.vercel.app)

[🚀 Live Demo](https://jackie-jeans-quiz-nine.vercel.app) · [📧 Hire Me](mailto:samarthworldwide@gmail.com) · [💼 LinkedIn](https://www.linkedin.com/in/samarth-shukla-b72003293) · [🐙 GitHub](https://github.com/Samarth7272)

---

## 📌 TL;DR (for recruiters)

- **What:** An AI-powered onboarding quiz for a denim brand, with two ways to answer: a classic manual flow and a voice flow.
- **Why it matters:** It shows I can ship a complete, deployed product: modern frontend, an LLM integration, browser speech APIs and production hosting.
- **Stack:** Next.js (App Router), TypeScript, Groq AI, Web Speech API, Tailwind CSS, deployed on Vercel.
- **Try it:** The live demo is linked above. No sign-up needed.

---

## 🎯 The Problem

Online onboarding forms are long, static and easy to abandon. Shoppers who are unsure about fit often give up halfway through, and brands lose the data they need to personalize recommendations.

This project replaces the form with a short, guided conversation. People can answer by tapping, or just speak naturally and let AI do the interpreting.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧭 **Manual flow** | Step-by-step quiz with tappable answers for quick, predictable onboarding |
| 🎙️ **Voice flow** | Speak your answers hands-free using the browser's Web Speech API |
| 🤖 **AI-powered understanding** | Groq AI interprets free-form answers and maps them to structured quiz data |
| ⚡ **Fast responses** | Groq's low-latency inference keeps the conversation feeling real-time |
| 📱 **Responsive UI** | Works on mobile and desktop |
| 🔒 **Secrets via environment** | API keys live in `.env.local`, never in the repo |
| ☁️ **Production deployment** | Continuously deployed on Vercel |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js (App Router)** | Full-stack React framework |
| **TypeScript** | Type-safe code across the app (98% of the codebase) |
| **Groq AI** | LLM inference for understanding answers |
| **Web Speech API** | Speech recognition for the voice flow |
| **Tailwind CSS** | Styling (via PostCSS) |
| **ESLint** | Code quality and linting |
| **Vercel** | Hosting and deployment |
| **Git & GitHub** | Version control |

---

## 🏗️ Architecture

```
          User (tap or speak)
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
   Manual flow          Voice flow
 (tappable steps)    (Web Speech API)
        └─────────┬─────────┘
                  ▼
        Next.js app (app/)
                  │
                  ▼
     Server-side Groq AI call (lib/)
                  │
                  ▼
     Structured answer → next quiz step / result
```

---

## 📁 Project Structure

```
jackie-jeans-quiz/
├── app/                  # Next.js App Router: pages, layouts and UI
├── lib/                  # Shared helpers, including AI integration logic
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # Tailwind / PostCSS setup
├── eslint.config.mjs     # Linting rules
├── tsconfig.json         # TypeScript configuration
├── package.json
└── README.md
```

---

## 🚀 Setup

### 1. Clone and install

```bash
git clone https://github.com/Samarth7272/jackie-jeans-quiz.git
cd jackie-jeans-quiz
npm install
```

### 2. Configure credentials

Create a `.env.local` file in the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free key from the [Groq Console](https://console.groq.com).

> 🔒 Keys are read from environment variables, so they are never committed or exposed to the browser.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

> 🎙️ The voice flow uses the Web Speech API, which works best in Chromium-based browsers (Chrome, Edge) and requires microphone permission.

---

## ☁️ Deployment

The app is deployed on **Vercel**. To deploy your own copy:

1. Import the repo into [Vercel](https://vercel.com).
2. Add `GROQ_API_KEY` under **Settings → Environment Variables**.
3. Deploy.

---

## 🎓 Skills Demonstrated

- Building and shipping a **full-stack Next.js app** with TypeScript
- Integrating an **LLM API (Groq)** into a real user flow
- Using **browser APIs** (Web Speech) for voice-first interaction
- Designing **two interaction modes** (manual and voice) for accessibility and convenience
- **Secure secret management** with environment variables
- **CI/CD-style deployment** on Vercel
- Clean project structure, linting and type safety

---

## 🔮 Roadmap

- [ ] 🧪 Unit and end-to-end tests with CI
- [ ] 🌍 Multi-language voice support
- [ ] 📊 Analytics on quiz completion and drop-off
- [ ] 🛍️ Product recommendations based on quiz results
- [ ] ♿ Further accessibility improvements (keyboard and screen-reader support)

---

## ⚠️ Disclaimer

This project is for **educational and demonstration purposes**. Never commit API keys.

---

## 👨‍💻 About the Author

**Samarth Shukla** is a B.Tech Computer Science student and Software Engineer Intern at LV8, building full-stack and AI-powered applications.

**Skills:** Python · JavaScript/TypeScript · React/Next.js · FastAPI · Flask · Django · SQL · LangChain · Hugging Face · Groq AI · OpenAI API · Docker · AWS · Git

### 💼 Open to Opportunities

I'm actively looking for **Software Engineer, Full-Stack and AI/ML** roles (full-time and internships). If this project caught your eye, I'd love to talk.

[

![Email](https://img.shields.io/badge/Email-samarthworldwide%40gmail.com-D14836?logo=gmail&logoColor=white)

](mailto:samarthworldwide@gmail.com)
[

![LinkedIn](https://img.shields.io/badge/LinkedIn-Samarth%20Shukla-0A66C2?logo=linkedin&logoColor=white)

](https://www.linkedin.com/in/samarth-shukla-b72003293)
[

![GitHub](https://img.shields.io/badge/GitHub-Samarth7272-181717?logo=github&logoColor=white)

](https://github.com/Samarth7272)

---

⭐ If you found this project useful, please give it a star!
