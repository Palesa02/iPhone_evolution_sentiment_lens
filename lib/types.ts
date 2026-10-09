export const IPHONE_MODELS = [
  'iPhone 11',
  'iPhone 12',
  'iPhone 12 Pro',
  'iPhone 13',
  'iPhone 13 Pro',
  'iPhone 14',
  'iPhone 14 Pro',
  'iPhone 14 Pro Max',
  'iPhone 15',
  'iPhone 15 Pro',
  'iPhone 15 Pro Max',
  'iPhone 16',
  'iPhone 16 Pro',
  'iPhone 16 Pro Max',
  'iPhone 17',
  'iPhone 17 Pro',
  'iPhone 17 Pro Max',
] as const;

export type IPhoneModel = (typeof IPHONE_MODELS)[number];

export const ASPECTS = [
  'Battery Life',
  'Camera Quality',
  'Performance',
  'Display',
  'Heating',
  'Price Value',
  'Build Quality',
  'iOS Experience',
] as const;

export type Aspect = (typeof ASPECTS)[number];

export type Platform = 'Amazon' | 'Takealot';

export type SentimentLabel = 'Positive' | 'Neutral' | 'Negative';

export interface Review {
  id: string;
  iphoneModel: IPhoneModel;
  platform: Platform;
  rating: number;
  reviewText: string;
  date: string;
  variant: string;
  verified: boolean;
  sentimentScore: number;
  sentimentLabel: SentimentLabel;
  aspects: Partial<Record<Aspect, number>>;
  helpful: number;
}

export interface ModelSummary {
  model: IPhoneModel;
  avgSentiment: number;
  avgRating: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  amazonSentiment: number;
  takealotSentiment: number;
  amazonPositivePct: number;
  takealotPositivePct: number;
  aspectScores: Record<Aspect, number>;
  topLove: Aspect;
  topComplaint: Aspect;
  dominantKeywords: { keyword: string; weight: number }[];
  reviewCount: number;
  releaseYear: number;
  priceUSD: number;
}

export interface EvolutionInsight {
  aspect: Aspect;
  change: number;
  direction: 'improved' | 'declined';
  fromModel: string;
  toModel: string;
  description: string;
}

export interface PlatformDifference {
  model: IPhoneModel;
  amazonSentiment: number;
  takealotSentiment: number;
  delta: number;
  amazonTopAspect: Aspect;
  takealotTopAspect: Aspect;
  amazonTopComplaint: Aspect;
  takealotTopComplaint: Aspect;
  insight: string;
}
