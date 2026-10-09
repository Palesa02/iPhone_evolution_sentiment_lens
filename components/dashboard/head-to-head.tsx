'use client';

import { useState } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { ArrowRight, Heart, ThumbsDown } from 'lucide-react';
import { IPHONE_MODELS, ASPECTS } from '@/lib/types';
import type { ModelSummary, Aspect } from '@/lib/types';

interface HeadToHeadProps {
  summaries: ModelSummary[];
}

export default function HeadToHead({ summaries }: HeadToHeadProps) {
  const [modelA, setModelA] = useState('iPhone 15 Pro');
  const [modelB, setModelB] = useState('iPhone 17 Pro');

  const summaryA = summaries.find((s) => s.model === modelA);
  const summaryB = summaries.find((s) => s.model === modelB);

  if (!summaryA || !summaryB) return null;

  const radarData = ASPECTS.map((aspect) => ({
    aspect,
    [modelA]: parseFloat(((summaryA.aspectScores[aspect] + 1) / 2 * 100).toFixed(1)),
    [modelB]: parseFloat(((summaryB.aspectScores[aspect] + 1) / 2 * 100).toFixed(1)),
  }));

  const comparisonRows = [
    { label: 'Sentiment Score', a: `${(summaryA.avgSentiment * 100).toFixed(0)}%`, b: `${(summaryB.avgSentiment * 100).toFixed(0)}%` },
    { label: 'Avg Rating', a: `${summaryA.avgRating}★`, b: `${summaryB.avgRating}★` },
    { label: 'Positive Reviews', a: `${summaryA.positivePct}%`, b: `${summaryB.positivePct}%` },
    { label: 'Top Loved Aspect', a: summaryA.topLove, b: summaryB.topLove },
    { label: 'Top Complaint', a: summaryA.topComplaint, b: summaryB.topComplaint },
    { label: 'Amazon Sentiment', a: `${(summaryA.amazonSentiment * 100).toFixed(0)}%`, b: `${(summaryB.amazonSentiment * 100).toFixed(0)}%` },
    { label: 'Takealot Sentiment', a: `${(summaryA.takealotSentiment * 100).toFixed(0)}%`, b: `${(summaryB.takealotSentiment * 100).toFixed(0)}%` },
    { label: 'Release Year', a: summaryA.releaseYear, b: summaryB.releaseYear },
    { label: 'Launch Price', a: `$${summaryA.priceUSD}`, b: `$${summaryB.priceUSD}` },
  ];

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="font-playfair text-lg font-bold text-stone-800">Head-to-Head Comparison</h3>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={modelA}
            onChange={(e) => setModelA(e.target.value)}
            className="rounded-lg border border-rose-200 bg-[#FFFAF9] px-3 py-2 text-sm font-medium text-stone-700 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          >
            {IPHONE_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <ArrowRight className="w-4 h-4 text-rose-400" />
          <select
            value={modelB}
            onChange={(e) => setModelB(e.target.value)}
            className="rounded-lg border border-rose-200 bg-[#FFFAF9] px-3 py-2 text-sm font-medium text-stone-700 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          >
            {IPHONE_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#F9E8E8" />
              <PolarAngleAxis dataKey="aspect" tick={{ fontSize: 10, fill: '#8B7E7E' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#B0A0A0' }} angle={90} />
              <Radar name={modelA} dataKey={modelA} stroke="#A56C75" fill="#A56C75" fillOpacity={0.25} strokeWidth={2} />
              <Radar name={modelB} dataKey={modelB} stroke="#5B9BD5" fill="#5B9BD5" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #F9E8E8', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {/* Side by side cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#F9E8E8] p-4">
              <p className="font-playfair text-sm font-bold text-rose-700">{modelA}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-600" />
                <span className="text-xs text-stone-600">{summaryA.topLove}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <ThumbsDown className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs text-stone-600">{summaryA.topComplaint}</span>
              </div>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="font-playfair text-sm font-bold text-blue-700">{modelB}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs text-stone-600">{summaryB.topLove}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <ThumbsDown className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs text-stone-600">{summaryB.topComplaint}</span>
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="rounded-xl border border-rose-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F9E8E8]">
                  <th className="text-left px-3 py-2 font-medium text-rose-700">Metric</th>
                  <th className="text-right px-3 py-2 font-medium text-rose-700">{modelA.replace('iPhone ', '')}</th>
                  <th className="text-right px-3 py-2 font-medium text-blue-700">{modelB.replace('iPhone ', '')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                    <td className="px-3 py-2 text-stone-600">{row.label}</td>
                    <td className="px-3 py-2 text-right font-medium text-stone-800">{row.a}</td>
                    <td className="px-3 py-2 text-right font-medium text-stone-800">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
