'use client';

import { Heart, ThumbsDown, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import type { ModelSummary } from '@/lib/types';

interface HeroKPIsProps {
  summaries: ModelSummary[];
}

export default function HeroKPIs({ summaries }: HeroKPIsProps) {
  const sorted = [...summaries].sort((a, b) => b.avgSentiment - a.avgSentiment);
  const mostLoved = sorted[0];
  const mostComplained = sorted[sorted.length - 1];

  // Biggest jump between consecutive models
  let biggestJumpModel = summaries[0];
  let biggestJumpValue = 0;
  for (let i = 1; i < summaries.length; i++) {
    const jump = summaries[i].avgSentiment - summaries[i - 1].avgSentiment;
    if (Math.abs(jump) > Math.abs(biggestJumpValue)) {
      biggestJumpValue = jump;
      biggestJumpModel = summaries[i];
    }
  }

  const firstSentiment = summaries[0].avgSentiment;
  const lastSentiment = summaries[summaries.length - 1].avgSentiment;
  const trendChange = ((lastSentiment - firstSentiment) / Math.abs(firstSentiment)) * 100;
  const trendDirection = trendChange > 0;

  const kpis = [
    {
      label: 'Most Loved iPhone',
      value: mostLoved.model,
      sub: `${(mostLoved.avgSentiment * 100).toFixed(0)}% sentiment`,
      icon: Heart,
      color: 'text-rose-600',
      bg: 'bg-[#F9E8E8]',
      border: 'border-rose-200',
    },
    {
      label: 'Most Complained About',
      value: mostComplained.model,
      sub: `Top issue: ${mostComplained.topComplaint}`,
      icon: ThumbsDown,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      label: 'Biggest Sentiment Jump',
      value: biggestJumpModel.model,
      sub: `${biggestJumpValue > 0 ? '+' : ''}${(biggestJumpValue * 100).toFixed(0)}% from previous`,
      icon: biggestJumpValue > 0 ? TrendingUp : TrendingDown,
      color: biggestJumpValue > 0 ? 'text-emerald-700' : 'text-rose-700',
      bg: biggestJumpValue > 0 ? 'bg-emerald-50' : 'bg-rose-50',
      border: biggestJumpValue > 0 ? 'border-emerald-200' : 'border-rose-200',
    },
    {
      label: 'Overall Trend (11 → 17 Pro Max)',
      value: trendDirection ? 'Improving' : 'Declining',
      sub: `${trendDirection ? '+' : ''}${trendChange.toFixed(1)}% over 6 years`,
      icon: Sparkles,
      color: trendDirection ? 'text-emerald-700' : 'text-rose-700',
      bg: trendDirection ? 'bg-emerald-50' : 'bg-rose-50',
      border: trendDirection ? 'border-emerald-200' : 'border-rose-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className={`animate-fade-in-up rounded-2xl border ${kpi.border} ${kpi.bg} p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
            style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
          >
            <div className="flex items-start justify-between mb-3">
              <Icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <p className="text-xs uppercase tracking-wider text-stone-500 mb-1">{kpi.label}</p>
            <p className="font-playfair text-xl font-bold text-stone-800 leading-tight">{kpi.value}</p>
            <p className="text-sm text-stone-500 mt-1">{kpi.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
