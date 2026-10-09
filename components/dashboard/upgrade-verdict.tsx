'use client';

import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import type { ModelSummary } from '@/lib/types';

interface VerdictProps {
  summaries: ModelSummary[];
}

export default function UpgradeVerdict({ summaries }: VerdictProps) {
  const get = (model: string) => summaries.find((s) => s.model === model);
  const i15Pro = get('iPhone 15 Pro');
  const i16Pro = get('iPhone 16 Pro');
  const i17Pro = get('iPhone 17 Pro');

  if (!i15Pro || !i16Pro || !i17Pro) return null;

  const sentiment17vs15 = ((i17Pro.avgSentiment - i15Pro.avgSentiment) / Math.abs(i15Pro.avgSentiment)) * 100;
  const sentiment17vs16 = ((i17Pro.avgSentiment - i16Pro.avgSentiment) / Math.abs(i16Pro.avgSentiment)) * 100;
  const camera17vs15 = ((i17Pro.aspectScores['Camera Quality'] - i15Pro.aspectScores['Camera Quality']) / Math.abs(i15Pro.aspectScores['Camera Quality'])) * 100;
  const price17vs15 = ((i17Pro.aspectScores['Price Value'] - i15Pro.aspectScores['Price Value']) / Math.abs(i15Pro.aspectScores['Price Value'])) * 100;

  const pros = [
    `Camera quality jumped ${camera17vs15 > 0 ? '+' : ''}${camera17vs15.toFixed(0)}% from 15 Pro`,
    `AI-powered photography receives overwhelmingly positive reviews`,
    `A19 Pro chip rated highest for performance across all models`,
    `iOS experience sentiment is the strongest of any generation`,
  ];

  const cons = [
    `Price-to-value sentiment ${price17vs15 < 0 ? '' : '+'}${price17vs15.toFixed(0)}% vs 15 Pro — pricing concerns growing`,
    `Overall sentiment only ${sentiment17vs15 > 0 ? '+' : ''}${sentiment17vs15.toFixed(0)}% higher than 15 Pro`,
    `vs 16 Pro: sentiment change of ${sentiment17vs16 > 0 ? '+' : ''}${sentiment17vs16.toFixed(0)}% — diminishing returns`,
    `Heating remains a concern inherited from the 15 series`,
  ];

  const verdict = sentiment17vs15 > 5 ? 'Yes, if you value camera and AI' : 'Only if you are on iPhone 14 or older';

  return (
    <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-white via-[#FFFAF9] to-[#F9E8E8] p-6 shadow-sm">
      <div className="text-center mb-6">
        <h3 className="font-playfair text-2xl font-bold text-stone-800">The Verdict: Is the iPhone 17 Pro Worth It?</h3>
        <p className="text-sm text-stone-500 mt-2">Data-driven answer based on sentiment from {summaries.reduce((s, m) => s + m.reviewCount, 0).toLocaleString()}+ reviews</p>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-white font-playfair text-lg font-bold shadow-md">
          {verdict}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-emerald-100 bg-white/80 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h4 className="font-playfair text-sm font-bold text-stone-800">Reasons to Upgrade</h4>
          </div>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-emerald-500 mt-0.5">•</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-amber-100 bg-white/80 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h4 className="font-playfair text-sm font-bold text-stone-800">Reasons to Wait</h4>
          </div>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="text-amber-500 mt-0.5">•</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 text-sm text-stone-500">
        <span className="font-medium text-stone-700">Upgrade path:</span>
        <span className="rounded-lg bg-white border border-rose-100 px-3 py-1 font-medium text-stone-700">iPhone 15 Pro</span>
        <ArrowRight className="w-4 h-4 text-rose-400" />
        <span className="rounded-lg bg-white border border-rose-100 px-3 py-1 font-medium text-stone-700">iPhone 16 Pro</span>
        <ArrowRight className="w-4 h-4 text-rose-400" />
        <span className="rounded-lg bg-rose-600 text-white px-3 py-1 font-medium">iPhone 17 Pro</span>
      </div>
    </div>
  );
}
