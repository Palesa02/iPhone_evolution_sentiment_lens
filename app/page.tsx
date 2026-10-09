import HeroKPIs from '@/components/dashboard/hero-kpis';
import EvolutionChart from '@/components/dashboard/evolution-chart';
import HeadToHead from '@/components/dashboard/head-to-head';
import AspectHeatmap from '@/components/dashboard/aspect-heatmap';
import InsightsPanel from '@/components/dashboard/insights-panel';
import PlatformBattle from '@/components/dashboard/platform-battle';
import ReviewsExplorer from '@/components/dashboard/reviews-explorer';
import AWSArchitecture from '@/components/dashboard/aws-architecture';
import KeywordCloud from '@/components/dashboard/keyword-cloud';
import UpgradeVerdict from '@/components/dashboard/upgrade-verdict';
import {
  getAllSummaries,
  getAllInsights,
  getAllPlatformDifferences,
  getAllReviews,
} from '@/lib/data';

export default function Home() {
  const summaries = getAllSummaries();
  const insights = getAllInsights();
  const platformDifferences = getAllPlatformDifferences();
  const reviews = getAllReviews();

  const totalReviews = reviews.length;

  return (
    <main className="min-h-screen bg-[#FFFAF9]">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
              <span className="font-playfair text-white font-bold text-lg">i</span>
            </div>
            <div>
              <h1 className="font-playfair text-base font-bold text-stone-800 leading-tight">iPhone Evolution Sentiment Lens</h1>
              <p className="text-xs text-stone-500">11 → 17 Pro Max · {totalReviews.toLocaleString()}+ reviews analyzed</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Amazon
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> Takealot
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-6">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-3">
            How Has the iPhone Evolved?
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-sm sm:text-base">
            A sentiment analysis journey from the iPhone 11 to the 17 Pro Max.
            Discover which model customers love most, what Apple improved, what got worse,
            and whether the latest iPhone is worth your money.
          </p>
        </section>

        {/* KPI Row */}
        <section>
          <HeroKPIs summaries={summaries} />
        </section>

        {/* Evolution Charts */}
        <section>
          <EvolutionChart summaries={summaries} />
        </section>

        {/* Head to Head */}
        <section>
          <HeadToHead summaries={summaries} />
        </section>

        {/* Heatmap + Keyword Cloud */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AspectHeatmap summaries={summaries} />
          </div>
          <div className="xl:col-span-1">
            <KeywordCloud summaries={summaries} />
          </div>
        </section>

        {/* Insights */}
        <section>
          <InsightsPanel insights={insights} />
        </section>

        {/* Platform Battle */}
        <section>
          <PlatformBattle differences={platformDifferences} />
        </section>

        {/* Upgrade Verdict */}
        <section>
          <UpgradeVerdict summaries={summaries} />
        </section>

        {/* Reviews Explorer */}
        <section>
          <ReviewsExplorer reviews={reviews} />
        </section>

        {/* AWS Architecture */}
        <section>
          <AWSArchitecture />
        </section>

        {/* Footer */}
        <footer className="border-t border-rose-100 pt-6 pb-12 text-center">
          <p className="font-playfair text-sm font-medium text-stone-700">
            iPhone Evolution Sentiment Lens
          </p>
          <p className="text-xs text-stone-400 mt-1">
            Built with Next.js, Recharts & sentiment analysis · {totalReviews.toLocaleString()} reviews across {summaries.length} iPhone models
          </p>
        </footer>
      </div>
    </main>
  );
}
