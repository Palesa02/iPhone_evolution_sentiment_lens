'use client';

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { IPHONE_MODELS } from '@/lib/types';
import type { ModelSummary } from '@/lib/types';

interface EvolutionChartProps {
  summaries: ModelSummary[];
}

export default function EvolutionChart({ summaries }: EvolutionChartProps) {
  const lineData = summaries.map((s) => ({
    model: s.model.replace('iPhone ', ''),
    Amazon: parseFloat((s.amazonSentiment * 100).toFixed(1)),
    Takealot: parseFloat((s.takealotSentiment * 100).toFixed(1)),
    Overall: parseFloat((s.avgSentiment * 100).toFixed(1)),
  }));

  const barData = summaries.map((s) => ({
    model: s.model.replace('iPhone ', ''),
    rating: s.avgRating,
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="font-playfair text-lg font-bold text-stone-800">Sentiment Evolution: Amazon vs Takealot</h3>
          <p className="text-sm text-stone-500 mt-1">Sentiment score (%) across all iPhone models, by platform</p>
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={lineData} margin={{ top: 10, right: 10, left: -15, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F9E8E8" />
            <XAxis
              dataKey="model"
              angle={-40}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 10, fill: '#8B7E7E' }}
              stroke='#E8D0D0'
            />
            <YAxis
              domain={[30, 90]}
              tick={{ fontSize: 11, fill: '#8B7E7E' }}
              stroke='#E8D0D0'
              label={{ value: 'Sentiment %', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#8B7E7E' } }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #F9E8E8', fontSize: 12 }}
              labelStyle={{ color: '#A56C75', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <ReferenceLine y={50} stroke="#D4B0B0" strokeDasharray="5 5" label={{ value: 'Neutral', fontSize: 10, fill: '#B0A0A0' }} />
            <Line type="monotone" dataKey="Amazon" stroke="#A56C75" strokeWidth={2.5} dot={{ r: 3, fill: '#A56C75' }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="Takealot" stroke="#5B9BD5" strokeWidth={2.5} dot={{ r: 3, fill: '#5B9BD5' }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="Overall" stroke="#7FB069" strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="font-playfair text-lg font-bold text-stone-800">Average Star Rating by Model</h3>
          <p className="text-sm text-stone-500 mt-1">Average customer rating out of 5 stars</p>
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={barData} margin={{ top: 10, right: 10, left: -15, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F9E8E8" />
            <XAxis
              dataKey="model"
              angle={-40}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 10, fill: '#8B7E7E' }}
              stroke='#E8D0D0'
            />
            <YAxis
              domain={[3, 5]}
              tick={{ fontSize: 11, fill: '#8B7E7E' }}
              stroke='#E8D0D0'
              label={{ value: 'Rating', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#8B7E7E' } }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #F9E8E8', fontSize: 12 }}
              labelStyle={{ color: '#A56C75', fontWeight: 600 }}
              cursor={{ fill: '#F9E8E840' }}
            />
            <Bar dataKey="rating" fill="#A56C75" radius={[6, 6, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
