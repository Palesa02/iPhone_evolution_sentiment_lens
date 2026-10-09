'use client';

import { Cloud, Database, Cpu, BarChart3, Zap, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: Database,
    name: 'Amazon S3',
    purpose: 'Store raw review data (CSV) and processed sentiment results as versioned objects',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    icon: Zap,
    name: 'AWS Lambda',
    purpose: 'Serverless scraper functions triggered on schedule — no server to manage',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
  {
    icon: Cpu,
    name: 'Amazon Comprehend / Bedrock',
    purpose: 'Managed NLP for sentiment scoring and aspect extraction without training models',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: BarChart3,
    name: 'Amazon QuickSight',
    purpose: 'Enterprise dashboarding with SPICE engine for interactive sentiment visualizations',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    icon: ShieldCheck,
    name: 'IAM + Secrets Manager',
    purpose: 'Least-privilege roles for Lambda, API keys stored securely, encrypted at rest',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    icon: Cloud,
    name: 'EventBridge + SQS',
    purpose: 'Schedule daily scrapes and queue review batches for reliable parallel processing',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
];

export default function AWSArchitecture() {
  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-playfair text-lg font-bold text-stone-800">Built with AWS Architecture</h3>
        </div>
        <p className="text-sm text-stone-500">
          This dashboard demonstrates a production-ready cloud architecture. Here is how it would scale on AWS,
          leveraging skills from AWS Cloud Support Associate and AWS AI Practitioner certifications.
        </p>
      </div>

      {/* Architecture flow */}
      <div className="mb-6 rounded-xl bg-[#FFFAF9] border border-rose-50 p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500">
          <span className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-amber-700">EventBridge Schedule</span>
          <span className="text-rose-300">→</span>
          <span className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-1.5 text-rose-700">Lambda Scraper</span>
          <span className="text-rose-300">→</span>
          <span className="rounded-lg bg-teal-50 border border-teal-200 px-3 py-1.5 text-teal-700">SQS Queue</span>
          <span className="text-rose-300">→</span>
          <span className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-blue-700">Comprehend / Bedrock</span>
          <span className="text-rose-300">→</span>
          <span className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-amber-700">S3 Data Lake</span>
          <span className="text-rose-300">→</span>
          <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-emerald-700">QuickSight Dashboard</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.name}
              className={`animate-fade-in-up rounded-xl border ${svc.border} ${svc.bg} p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${svc.color}`} />
                <h4 className="font-playfair text-sm font-bold text-stone-800">{svc.name}</h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{svc.purpose}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl bg-gradient-to-r from-[#F9E8E8] to-amber-50 border border-rose-100 p-4">
        <p className="text-xs text-stone-600 leading-relaxed">
          <span className="font-semibold text-rose-700">Certification Alignment:</span> This architecture maps to
          competencies from the AWS Cloud Support Associate certification (troubleshooting, networking, system
          administration) and AWS AI Practitioner certification (managed ML services, responsible AI, model selection).
          The Lambda + SQS pattern demonstrates event-driven design, while Comprehend/Bedrock shows practical
          AI service integration.
        </p>
      </div>
    </div>
  );
}
