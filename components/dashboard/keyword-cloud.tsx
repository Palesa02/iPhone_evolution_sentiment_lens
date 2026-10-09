'use client';

import { IPHONE_MODELS } from '@/lib/types';
import type { ModelSummary } from '@/lib/types';
import { useState } from 'react';

interface KeywordCloudProps {
  summaries: ModelSummary[];
}

export default function KeywordCloud({ summaries }: KeywordCloudProps) {
  const [selectedModel, setSelectedModel] = useState('iPhone 17 Pro');
  const summary = summaries.find((s) => s.model === selectedModel);
  if (!summary) return null;

  const maxWeight = Math.max(...summary.dominantKeywords.map((k) => k.weight));

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-playfair text-lg font-bold text-stone-800">Keyword Trends</h3>
          <p className="text-sm text-stone-500 mt-1">What words dominate each generation's reviews</p>
        </div>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="rounded-lg border border-rose-200 bg-[#FFFAF9] px-3 py-2 text-sm font-medium text-stone-700 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
        >
          {IPHONE_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-center py-6 min-h-[160px]">
        {summary.dominantKeywords.map((kw, i) => {
          const sizeRatio = kw.weight / maxWeight;
          const fontSize = 14 + sizeRatio * 28;
          const opacity = 0.5 + sizeRatio * 0.5;
          return (
            <span
              key={kw.keyword}
              className="animate-fade-in font-playfair font-semibold transition-all duration-300 hover:scale-110 cursor-default"
              style={{
                fontSize: `${fontSize}px`,
                color: '#A56C75',
                opacity: 0,
                animationDelay: `${i * 80}ms`,
              }}
            >
              {kw.keyword}
            </span>
          );
        })}
      </div>

      <div className="rounded-xl bg-[#F9E8E8] p-4 mt-2">
        <p className="text-xs text-stone-600 leading-relaxed">
          <span className="font-semibold text-rose-700">{selectedModel}</span> — Released {summary.releaseYear} at ${summary.priceUSD}.
          Reviewers most frequently discuss these themes, with larger text representing higher frequency.
        </p>
      </div>
    </div>
  );
}
