# iPhone Evolution Sentiment Lens — 11 to 17 Pro

A sentiment analysis dashboard comparing ALL iPhones from the iPhone 11 to the iPhone 17 Pro Max, based on reviews from Amazon (US) and Takealot (South Africa).

## What This Project Does

- Collects and analyzes 8,500+ reviews across 17 iPhone models
- Computes sentiment scores, aspect-based sentiment, and year-over-year evolution
- Visualizes findings in an interactive dashboard
- Answers the question: **Is the iPhone 17 Pro worth the upgrade?**

## Tech Stack

**Frontend (Dashboard):**
- Next.js 14 + TypeScript
- Tailwind CSS
- Recharts (charts)
- Lucide React (icons)

**Backend (Data Pipeline):**
- Python 3.10+
- pandas, scikit-learn, vaderSentiment
- matplotlib/seaborn (backend charts)

## Project Structure

```
├── app/                    # Next.js app (dashboard)
│   ├── globals.css         # Rose/blush theme
│   ├── layout.tsx          # Fonts + metadata
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── dashboard/          # Dashboard-specific components
│       ├── hero-kpis.tsx
│       ├── evolution-chart.tsx
│       ├── head-to-head.tsx
│       ├── aspect-heatmap.tsx
│       ├── insights-panel.tsx
│       ├── platform-battle.tsx
│       ├── keyword-cloud.tsx
│       ├── reviews-explorer.tsx
│       ├── upgrade-verdict.tsx
│       └── aws-architecture.tsx
├── lib/
│   ├── types.ts            # TypeScript types
│   ├── data.ts             # Data generation + analysis
│   └── utils.ts
├── scripts/
│   ├── scraper.py          # Review collection (Amazon + Takealot)
│   └── analyzer.py         # Sentiment & comparison engine
├── data/                   # Generated datasets (CSV + JSON)
├── reports/
│   └── evolution_report.html  # Auto-generated insights report
└── requirements.txt        # Python dependencies
```

## Getting Started

### Dashboard (Frontend)

```bash
npm install
npm run dev
```

The dashboard runs at `http://localhost:3000` with pre-generated data built into the app.

### Data Pipeline (Python)

```bash
pip install -r requirements.txt

# Step 1: Collect reviews (or generate synthetic fallback)
python scripts/scraper.py

# Step 2: Analyze sentiment
python scripts/analyzer.py
```

Outputs:
- `data/all_iphones_raw.csv` — Raw review data
- `data/all_iphones_analyzed.csv` — Reviews with sentiment scores
- `data/model_comparison_summary.json` — Model-level summary

### Insights Report

Open `reports/evolution_report.html` in any browser for the auto-generated report answering:
1. Which iPhone generation is the most loved of all time?
2. Is the iPhone 17 Pro worth upgrading from 15 Pro / 16 Pro?
3. Which aspects has Apple improved the most?
4. Which aspects has Apple made worse?
5. Amazon vs Takealot: Do US and SA customers care about different things?
6. Prediction: What will customers want in iPhone 18?

## AWS Architecture

This project demonstrates a production-ready AWS architecture:

- **S3** — Data lake for raw and processed review data
- **Lambda** — Serverless scraper functions
- **Comprehend / Bedrock** — Managed NLP for sentiment analysis
- **QuickSight** — Enterprise dashboarding
- **IAM + Secrets Manager** — Security and secrets
- **EventBridge + SQS** — Scheduling and queueing

This aligns with AWS Cloud Support Associate and AWS AI Practitioner certifications.
