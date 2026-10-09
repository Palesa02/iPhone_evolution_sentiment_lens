'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Globe } from 'lucide-react';
import { IPHONE_MODELS } from '@/lib/types';
import type { PlatformDifference } from '@/lib/types';

interface PlatformBattleProps {
  differences: PlatformDifference[];
}

export default function PlatformBattle({ differences }: PlatformBattleProps) {
  const chartData = differences.map((d) => ({
    model: d.model.replace('iPhone ', ''),
    Amazon: parseFloat((d.amazonSentiment * 100).toFixed(1)),
    Takealot: parseFloat((d.takealotSentiment * 100).toFixed(1)),
    Delta: parseFloat((d.delta * 100).toFixed(1)),
  }));

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#F9E8E8] flex items-center justify-center">
          <Globe className="w-5 h-5 text-rose-600" />
        </div>
        <div>
          <h3 className="font-playfair text-lg font-bold text-stone-800">Platform Battle: Amazon (US) vs Takealot (SA)</h3>
          <p className="text-sm text-stone-500">Do American and South African customers feel differently?</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 60 }} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="#F9E8E8" />
          <XAxis
            dataKey="model"
            angle={-40}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 10, fill: '#8B7E7E' }}
            stroke="#E8D0D0"
          />
          <YAxis
            domain={[30, 90]}
            tick={{ fontSize: 11, fill: '#8B7E7E' }}
            stroke="#E8D0D0"
          />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #F9E8E8', fontSize: 12 }}
            labelStyle={{ color: '#A56C75', fontWeight: 600 }}
            cursor={{ fill: '#F9E8E840' }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="Amazon" fill="#A56C75" radius={[4, 4, 0, 0]} barSize={10} />
          <Bar dataKey="Takealot" fill="#5B9BD5" radius={[4, 4, 0, 0]} barSize={10} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {differences.filter((_, i) => i % 3 === 0).slice(0, 6).map((d) => (
          <div key={d.model} className="rounded-xl border border-rose-50 bg-[#FFFAF9] p-4">
            <p className="font-playfair text-sm font-bold text-stone-800 mb-2">{d.model}</p>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-rose-600">US: {(d.amazonSentiment * 100).toFixed(0)}%</span>
              <span className="text-blue-600">SA: {(d.takealotSentiment * 100).toFixed(0)}%</span>
              <span className={`font-bold ${d.delta > 0 ? 'text-rose-500' : 'text-blue-500'}`}>
                Δ{d.delta > 0 ? '+' : ''}{(d.delta * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">{d.insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
