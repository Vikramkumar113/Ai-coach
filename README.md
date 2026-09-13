# 🤖  AI Career Coach

**Ai coach** is an all-in-one AI-powered career guidance platform designed to accelerate professional success. Powered by Next.js 15, Google Gemini 3.6 Flash, Prisma, and Clerk, AI-Coach provides personalized industry insights, intelligent cover letter generation, interactive interview prep quizzes, and AI resume optimization.

---

## ✨ Features

### 📊 1. Industry Insights & Market Analytics
- Real-time salary benchmark ranges (Min, Median, Max) across roles with interactive **Recharts** visualizations.
- Market outlook tracking (Positive, Neutral, Negative) and industry growth percentage metrics.
- Identification of top in-demand skills and trending industry topics tailored to your specialization.

### ✉️ 2. AI Cover Letter Generator
- Generate tailored, ATS-friendly cover letters tailored to specific company names and job descriptions.
- Instant markdown previews with **Copy to Clipboard** and document management capabilities.
- Persistent saved library of past cover letters.

### 🎯 3. Technical Interview Preparation & Quizzes
- Dynamic AI-generated 10-question technical interview prep quizzes matched to your specific industry and technical skills.
- Immediate scoring feedback, wrong answer explanations, and AI-powered learning tips.
- **Performance Trend Tracking**: Visual line charts tracking quiz score progression over time.

### 📝 4. AI Resume Builder & Content Enhancer
- Smart AI resume section improvement (action verbs, quantifiable metrics, and industry keywords).
- ATS compliance feedback and structured markdown layout.

### 🔐 5. Authentication & Onboarding
- Secure authentication via **Clerk**.
- Tailored onboarding flow capturing industry selection, specialization, years of experience, core skills, and professional bio.

### ⚡ 6. Background Jobs & Scheduled Cron Tasks
- Automated weekly background updates for industry analytics using **Inngest**.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Server Actions) |
| **Language** | JavaScript (ES6+) |
| **AI Model** | [Google Gemini 3.6 Flash](https://ai.google.dev/) (`@google/generative-ai`) |
| **Styling** | Tailwind CSS v4, Radix UI, Lucide Icons, Glassmorphic Dark Palette |
| **Database** | PostgreSQL (Neon Serverless) |
| **ORM** | [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [Clerk Auth](https://clerk.com/) |
| **Background Jobs** | [Inngest](https://www.inngest.com/) |
| **Charts & Data Visualization** | [Recharts](https://recharts.org/) |
| **Form Handling** | React Hook Form + Zod Schema Validation |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher)
- **npm**, **pnpm**, or **yarn**
- **PostgreSQL Database** (e.g. Neon, Supabase, or local instance)
- **Google Gemini API Key**
- **Clerk Application Keys**

---

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd my-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# PostgreSQL Database (Neon / Prisma)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Google Gemini AI Key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Database Setup & Synchronization
Sync your PostgreSQL database schema with Prisma:

```bash
npx prisma db push
```

*(Optional)* Launch Prisma Studio to inspect database models:
```bash
npx prisma studio
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Run Inngest Background Worker (Optional)
In a separate terminal window:

```bash
npx inngest-cli@latest dev
```
Open [http://localhost:8288](http://localhost:8288) to access the Inngest Dev Dashboard.

---

## 📁 Project Structure

```
my-app/
├── actions/             # Next.js Server Actions (interview, cover-letter, dashboard, resume)
├── app/                 # App Router pages & layouts
│   ├── (auth)/          # Clerk Authentication pages (sign-in, sign-up)
│   ├── (main)/          # Core Application Routes
│   │   ├── ai-cover-letter/ # Cover Letter builder pages & components
│   │   ├── dashboard/       # Industry Insights dashboard
│   │   ├── interview/       # Interview prep & quiz simulator
│   │   ├── onboarding/      # User onboarding workflow
│   │   └── resume/          # Resume builder & enhancer
│   ├── api/             # API routes (Inngest endpoints)
│   ├── globals.css      # Custom OKLCH color system & gradients
│   └── layout.js        # Root layout with providers & theme
├── components/          # Reusable UI components & navigation header
│   └── ui/              # Radix UI / Shadcn UI base primitives
├── data/                # Static application data (features, FAQs, testimonials)
├── hooks/               # Custom React hooks (useFetch)
├── lib/                 # Utility libraries, Prisma client & Inngest client
├── prisma/              # Prisma schema definition & migrations
└── public/              # Static assets & logos
```

---

## 👤 Author

Made with 💗 by **Vikram**

---

## 📜 License

This project is licensed under the MIT License.
