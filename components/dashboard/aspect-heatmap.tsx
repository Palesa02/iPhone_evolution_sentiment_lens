'use client';

import { IPHONE_MODELS, ASPECTS } from '@/lib/types';
import type { ModelSummary, Aspect } from '@/lib/types';

interface HeatmapProps {
  summaries: ModelSummary[];
}

function scoreToColor(score: number): { bg: string; text: string } {
  const normalized = (score + 1) / 2;
  if (normalized > 0.75) return { bg: '#7FB069', text: 'white' };
  if (normalized > 0.6) return { bg: '#A8D08D', text: '#2d4a1f' };
  if (normalized > 0.5) return { bg: '#D5E8B3', text: '#3d5a2a' };
  if (normalized > 0.4) return { bg: '#FFF3CD', text: '#6b5b12' };
  if (normalized > 0.3) return { bg: '#FFE0B2', text: '#7a5a2a' };
  if (normalized > 0.2) return { bg: '#FFCCB2', text: '#7a3a2a' };
  return { bg: '#F4A7A0', text: 'white' };
}

export default function AspectHeatmap({ summaries }: HeatmapProps) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm overflow-x-auto scroll-thin">
      <div className="mb-4">
        <h3 className="font-playfair text-lg font-bold text-stone-800">Aspect Evolution Heatmap</h3>
        <p className="text-sm text-stone-500 mt-1">How each aspect's sentiment has evolved across iPhone generations</p>
      </div>

      <div className="min-w-[800px]">
        {/* Column headers */}
        <div className="grid gap-1 mb-2" style={{ gridTemplateColumns: `130px repeat(${ASPECTS.length}, 1fr)` }}>
          <div></div>
          {ASPECTS.map((aspect) => (
            <div key={aspect} className="text-center text-xs font-medium text-stone-600 px-1">
              {aspect}
            </div>
          ))}
        </div>

        {/* Rows */}
        {IPHONE_MODELS.map((model) => {
          const summary = summaries.find((s) => s.model === model);
          if (!summary) return null;
          return (
            <div
              key={model}
              className="grid gap-1 mb-1 items-center"
              style={{ gridTemplateColumns: `130px repeat(${ASPECTS.length}, 1fr)` }}
            >
              <div className="text-xs font-medium text-stone-700 truncate pr-2">{model.replace('iPhone ', '')}</div>
              {ASPECTS.map((aspect) => {
                const score = summary.aspectScores[aspect];
                const { bg, text } = scoreToColor(score);
                return (
                  <div
                    key={aspect}
                    className="heatmap-cell rounded-lg flex items-center justify-center cursor-default"
                    style={{ backgroundColor: bg, color: text, height: 36, fontSize: 10, fontWeight: 600 }}
                    title={`${model} - ${aspect}: ${score.toFixed(2)}`}
                  >
                    {score > 0 ? '+' : ''}{score.toFixed(2)}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex items-center gap-3 mt-4 text-xs text-stone-500">
          <span>Worse</span>
          <div className="flex gap-0.5">
            {['#F4A7A0', '#FFCCB2', '#FFE0B2', '#FFF3CD', '#D5E8B3', '#A8D08D', '#7FB069'].map((c) => (
              <div key={c} className="w-5 h-3 rounded" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span>Better</span>
        </div>
      </div>
    </div>
  );
}
