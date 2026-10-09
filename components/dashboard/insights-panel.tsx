'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import type { EvolutionInsight } from '@/lib/types';

interface InsightsPanelProps {
  insights: EvolutionInsight[];
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  const improved = insights.filter((i) => i.direction === 'improved');
  const declined = insights.filter((i) => i.direction === 'declined');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-playfair text-lg font-bold text-stone-800">What Got Better</h3>
        </div>
        <div className="space-y-2">
          {improved.slice(0, 6).map((insight, i) => (
            <div
              key={i}
              className="animate-fade-in-up flex items-center justify-between rounded-lg bg-emerald-50/50 px-4 py-3 border border-emerald-100"
              style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}
            >
              <span className="text-sm text-stone-700">{insight.description}</span>
              <span className="text-sm font-bold text-emerald-600 whitespace-nowrap ml-2">+{insight.change}%</span>
            </div>
          ))}
          {improved.length === 0 && (
            <p className="text-sm text-stone-500 italic">No significant improvements detected.</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="font-playfair text-lg font-bold text-stone-800">What Got Worse</h3>
        </div>
        <div className="space-y-2">
          {declined.slice(0, 6).map((insight, i) => (
            <div
              key={i}
              className="animate-fade-in-up flex items-center justify-between rounded-lg bg-rose-50/50 px-4 py-3 border border-rose-100"
              style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}
            >
              <span className="text-sm text-stone-700">{insight.description}</span>
              <span className="text-sm font-bold text-rose-600 whitespace-nowrap ml-2">{insight.change}%</span>
            </div>
          ))}
          {declined.length === 0 && (
            <p className="text-sm text-stone-500 italic">No significant declines detected.</p>
          )}
        </div>
      </div>
    </div>
  );
}
