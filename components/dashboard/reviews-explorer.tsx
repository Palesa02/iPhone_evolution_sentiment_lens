'use client';

import { useState, useMemo } from 'react';
import { Search, Star, CheckCircle2, MessageSquare } from 'lucide-react';
import { IPHONE_MODELS, ASPECTS } from '@/lib/types';
import type { Review, SentimentLabel } from '@/lib/types';

interface ReviewsExplorerProps {
  reviews: Review[];
}

const SENTIMENT_OPTIONS: SentimentLabel[] = ['Positive', 'Neutral', 'Negative'];

export default function ReviewsExplorer({ reviews }: ReviewsExplorerProps) {
  const [model, setModel] = useState('all');
  const [platform, setPlatform] = useState('all');
  const [sentiment, setSentiment] = useState('all');
  const [aspect, setAspect] = useState('all');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => {
    let result = reviews;

    if (model !== 'all') result = result.filter((r) => r.iphoneModel === model);
    if (platform !== 'all') result = result.filter((r) => r.platform === platform);
    if (sentiment !== 'all') result = result.filter((r) => r.sentimentLabel === sentiment);
    if (aspect !== 'all') {
      result = result.filter((r) => {
        const score = r.aspects[aspect as keyof typeof r.aspects];
        return score !== undefined && score < -0.1;
      });
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) => r.reviewText.toLowerCase().includes(q));
    }

    return result;
  }, [reviews, model, platform, sentiment, aspect, search]);

  const visible = filtered.slice(0, visibleCount);

  const sentimentColor = (label: SentimentLabel) => {
    if (label === 'Positive') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (label === 'Negative') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const selectClass = "rounded-lg border border-rose-200 bg-[#FFFAF9] px-3 py-2 text-sm font-medium text-stone-700 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200";

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="font-playfair text-lg font-bold text-stone-800">Reviews Explorer</h3>
        <p className="text-sm text-stone-500 mt-1">Filter and search through all reviews</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={model} onChange={(e) => setModel(e.target.value)} className={selectClass}>
          <option value="all">All Models</option>
          {IPHONE_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={selectClass}>
          <option value="all">All Platforms</option>
          <option value="Amazon">Amazon</option>
          <option value="Takealot">Takealot</option>
        </select>
        <select value={sentiment} onChange={(e) => setSentiment(e.target.value)} className={selectClass}>
          <option value="all">All Sentiments</option>
          {SENTIMENT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={aspect} onChange={(e) => setAspect(e.target.value)} className={selectClass}>
          <option value="all">All Aspects</option>
          {ASPECTS.map((a) => <option key={a} value={a}>{a} (negative)</option>)}
        </select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-rose-200 bg-[#FFFAF9] pl-9 pr-3 py-2 text-sm text-stone-700 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
      </div>

      <p className="text-xs text-stone-500 mb-3">
        Showing {visible.length} of {filtered.length.toLocaleString()} reviews
      </p>

      {/* Reviews list */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto scroll-thin pr-2">
        {visible.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-rose-50 bg-[#FFFAF9] p-4 hover:border-rose-200 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-stone-700">{review.iphoneModel}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${sentimentColor(review.sentimentLabel)}`}>
                  {review.sentimentLabel}
                </span>
                <span className="text-xs text-stone-400">{review.platform}</span>
                {review.verified && (
                  <span className="flex items-center gap-0.5 text-xs text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-amber-500 whitespace-nowrap">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400' : 'fill-stone-200'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">{review.reviewText}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-stone-400">
              <span>{review.date}</span>
              <span>{review.variant}</span>
              <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" /> {review.helpful} helpful</span>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="text-center py-12 text-stone-400">
            <p className="text-sm">No reviews match your filters.</p>
          </div>
        )}
        {visibleCount < filtered.length && (
          <button
            onClick={() => setVisibleCount((c) => c + 20)}
            className="w-full rounded-lg border border-rose-200 bg-[#F9E8E8] py-2 text-sm font-medium text-rose-700 hover:bg-rose-100 transition-colors"
          >
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  );
}
