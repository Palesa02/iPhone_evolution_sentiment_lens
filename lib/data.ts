import {
  IPHONE_MODELS,
  ASPECTS,
  type IPhoneModel,
  type Aspect,
  type Platform,
  type SentimentLabel,
  type Review,
  type ModelSummary,
  type EvolutionInsight,
  type PlatformDifference,
} from './types';

interface ModelProfile {
  releaseYear: number;
  priceUSD: number;
  baseSentiment: number;
  amazonSentimentBias: number;
  takealotSentimentBias: number;
  aspectAdjustments: Partial<Record<Aspect, number>>;
  keywords: { keyword: string; weight: number }[];
  reviewTemplates: { text: string; rating: number; sentiment: number; aspects: Partial<Record<Aspect, number>> }[];
}

const MODEL_PROFILES: Record<IPhoneModel, ModelProfile> = {
  'iPhone 11': {
    releaseYear: 2019,
    priceUSD: 699,
    baseSentiment: 0.68,
    amazonSentimentBias: 0.04,
    takealotSentimentBias: -0.02,
    aspectAdjustments: { 'Battery Life': 0.15, Display: -0.1, 'Price Value': 0.1, 'Camera Quality': 0.05 },
    keywords: [
      { keyword: 'innovative', weight: 0.9 },
      { keyword: 'affordable', weight: 0.7 },
      { keyword: 'reliable', weight: 0.6 },
      { keyword: 'LCD', weight: 0.5 },
      { keyword: 'dual camera', weight: 0.55 },
    ],
    reviewTemplates: [
      { text: 'The iPhone 11 was such an innovative phone for the price. The dual camera system exceeded my expectations and battery life is great.', rating: 5, sentiment: 0.82, aspects: { 'Camera Quality': 0.8, 'Battery Life': 0.7, 'Price Value': 0.75 } },
      { text: 'Love the iPhone 11 but the LCD display is a bit disappointing compared to OLED on competitors. Still a reliable daily driver.', rating: 4, sentiment: 0.55, aspects: { Display: -0.2, 'Build Quality': 0.4, 'Price Value': 0.6 } },
      { text: 'Great value iPhone. Battery lasts all day and the camera is surprisingly good for the price point.', rating: 5, sentiment: 0.78, aspects: { 'Battery Life': 0.85, 'Camera Quality': 0.65, 'Price Value': 0.8 } },
      { text: 'The display is not great. LCD just does not pop like OLED. Otherwise a solid phone.', rating: 3, sentiment: 0.15, aspects: { Display: -0.4, Performance: 0.3 } },
      { text: 'Best budget iPhone ever. Reliable performance and the camera punches above its weight.', rating: 5, sentiment: 0.8, aspects: { Performance: 0.6, 'Camera Quality': 0.7, 'Price Value': 0.85 } },
    ],
  },
  'iPhone 12': {
    releaseYear: 2020,
    priceUSD: 799,
    baseSentiment: 0.58,
    amazonSentimentBias: 0.02,
    takealotSentimentBias: -0.05,
    aspectAdjustments: { 'Battery Life': -0.2, Display: 0.15, 'Build Quality': 0.1 },
    keywords: [
      { keyword: '5G', weight: 0.85 },
      { keyword: 'flat edges', weight: 0.7 },
      { keyword: 'battery drain', weight: 0.65 },
      { keyword: 'OLED', weight: 0.6 },
      { keyword: 'MagSafe', weight: 0.55 },
    ],
    reviewTemplates: [
      { text: 'The OLED display is gorgeous and 5G is fast, but battery life is noticeably worse than the iPhone 11. Disappointing drain.', rating: 3, sentiment: 0.1, aspects: { Display: 0.7, 'Battery Life': -0.5, Performance: 0.4 } },
      { text: 'Love the flat edge design and OLED screen. MagSafe is cool but battery drain is a real issue.', rating: 4, sentiment: 0.45, aspects: { 'Build Quality': 0.6, Display: 0.65, 'Battery Life': -0.3 } },
      { text: '5G speeds are incredible and the display upgrade is huge. But I need to charge by 3pm which is frustrating.', rating: 3, sentiment: 0.2, aspects: { Performance: 0.5, Display: 0.6, 'Battery Life': -0.45 } },
      { text: 'Beautiful redesign with flat edges. The OLED finally brings iPhone up to par with competitors.', rating: 5, sentiment: 0.75, aspects: { 'Build Quality': 0.7, Display: 0.75 } },
      { text: 'Battery life is a major step backwards from iPhone 11. Otherwise a great phone with 5G.', rating: 3, sentiment: 0.15, aspects: { 'Battery Life': -0.55, Performance: 0.4 } },
    ],
  },
  'iPhone 12 Pro': {
    releaseYear: 2020,
    priceUSD: 999,
    baseSentiment: 0.62,
    amazonSentimentBias: 0.03,
    takealotSentimentBias: -0.03,
    aspectAdjustments: { 'Camera Quality': 0.1, Display: 0.15, 'Price Value': -0.1, 'Battery Life': -0.15 },
    keywords: [
      { keyword: 'LiDAR', weight: 0.8 },
      { keyword: 'Pro camera', weight: 0.7 },
      { keyword: 'battery', weight: 0.6 },
      { keyword: 'telephoto', weight: 0.55 },
      { keyword: 'premium', weight: 0.5 },
    ],
    reviewTemplates: [
      { text: 'The LiDAR scanner and telephoto lens make this a proper pro camera phone. Display is stunning.', rating: 5, sentiment: 0.78, aspects: { 'Camera Quality': 0.8, Display: 0.7 } },
      { text: 'Premium build and the pro camera system is excellent. Battery could be better though.', rating: 4, sentiment: 0.5, aspects: { 'Build Quality': 0.7, 'Camera Quality': 0.75, 'Battery Life': -0.25 } },
      { text: 'Great phone but expensive for what you get. The LiDAR is cool but not a game changer yet.', rating: 4, sentiment: 0.4, aspects: { 'Price Value': -0.2, 'Camera Quality': 0.6 } },
      { text: 'Telephoto lens is a huge upgrade for photography. Display is the best yet on an iPhone.', rating: 5, sentiment: 0.72, aspects: { 'Camera Quality': 0.8, Display: 0.75 } },
    ],
  },
  'iPhone 13': {
    releaseYear: 2021,
    priceUSD: 799,
    baseSentiment: 0.72,
    amazonSentimentBias: 0.03,
    takealotSentimentBias: 0.01,
    aspectAdjustments: { 'Battery Life': 0.2, 'Camera Quality': 0.1, 'Price Value': 0.05 },
    keywords: [
      { keyword: 'battery champion', weight: 0.8 },
      { keyword: 'cinematic mode', weight: 0.75 },
      { keyword: 'value', weight: 0.65 },
      { keyword: 'refined', weight: 0.6 },
      { keyword: 'brighter display', weight: 0.55 },
    ],
    reviewTemplates: [
      { text: 'The battery life on the 13 is incredible, easily the best iPhone battery yet. Lasts well over a day.', rating: 5, sentiment: 0.85, aspects: { 'Battery Life': 0.9, Performance: 0.6 } },
      { text: 'Cinematic mode is a fun addition and the brighter display is noticeable outdoors. Great value phone.', rating: 5, sentiment: 0.78, aspects: { 'Camera Quality': 0.7, Display: 0.6, 'Price Value': 0.7 } },
      { text: 'Apple really refined everything here. Battery is a champion, performance is snappy, and it feels polished.', rating: 5, sentiment: 0.82, aspects: { 'Battery Life': 0.85, Performance: 0.7, 'iOS Experience': 0.65 } },
      { text: 'Solid upgrade from the 12. Battery life alone makes it worth it. Display is brighter too.', rating: 4, sentiment: 0.65, aspects: { 'Battery Life': 0.8, Display: 0.5 } },
    ],
  },
  'iPhone 13 Pro': {
    releaseYear: 2021,
    priceUSD: 999,
    baseSentiment: 0.75,
    amazonSentimentBias: 0.03,
    takealotSentimentBias: 0.02,
    aspectAdjustments: { 'Camera Quality': 0.15, 'Battery Life': 0.15, Display: 0.1, Performance: 0.1 },
    keywords: [
      { keyword: 'ProMotion', weight: 0.9 },
      { keyword: '120Hz', weight: 0.85 },
      { keyword: 'macro', weight: 0.65 },
      { keyword: 'battery', weight: 0.6 },
      { keyword: 'smooth', weight: 0.7 },
    ],
    reviewTemplates: [
      { text: 'ProMotion 120Hz is a game changer. Everything feels so smooth and responsive. Best iPhone display ever.', rating: 5, sentiment: 0.85, aspects: { Display: 0.9, Performance: 0.75 } },
      { text: 'The 120Hz display and macro photography make this the best Pro yet. Battery life is also excellent.', rating: 5, sentiment: 0.82, aspects: { Display: 0.85, 'Camera Quality': 0.75, 'Battery Life': 0.7 } },
      { text: 'ProMotion alone is worth the upgrade. So smooth. Battery life finally matches the 13.', rating: 5, sentiment: 0.8, aspects: { Display: 0.9, 'Battery Life': 0.65 } },
      { text: 'Great pro camera with macro mode. 120Hz makes scrolling buttery smooth.', rating: 5, sentiment: 0.75, aspects: { 'Camera Quality': 0.7, Display: 0.85 } },
    ],
  },
  'iPhone 14': {
    releaseYear: 2022,
    priceUSD: 799,
    baseSentiment: 0.6,
    amazonSentimentBias: 0.0,
    takealotSentimentBias: -0.03,
    aspectAdjustments: { 'Price Value': -0.15, Performance: 0.0, 'Camera Quality': 0.05 },
    keywords: [
      { keyword: 'incremental', weight: 0.7 },
      { keyword: 'not worth upgrading', weight: 0.6 },
      { keyword: 'same as 13', weight: 0.65 },
      { keyword: 'safety features', weight: 0.5 },
      { keyword: 'boring', weight: 0.45 },
    ],
    reviewTemplates: [
      { text: 'Honestly this is basically the same as the iPhone 13. Hard to justify the upgrade. Very incremental.', rating: 3, sentiment: 0.1, aspects: { 'Price Value': -0.4, Performance: 0.2 } },
      { text: 'The safety features like crash detection are nice but not something I will use daily. Feels like a minor refresh.', rating: 3, sentiment: 0.15, aspects: { 'Price Value': -0.2, 'iOS Experience': 0.3 } },
      { text: 'Good phone but boring. If you have a 13, skip this. Camera is slightly better but not noticeable.', rating: 4, sentiment: 0.35, aspects: { 'Camera Quality': 0.3, 'Price Value': -0.3 } },
      { text: 'Solid performer but not worth upgrading from 13. Apple played it too safe here.', rating: 3, sentiment: 0.2, aspects: { 'Price Value': -0.35, Performance: 0.3 } },
    ],
  },
  'iPhone 14 Pro': {
    releaseYear: 2022,
    priceUSD: 999,
    baseSentiment: 0.7,
    amazonSentimentBias: 0.03,
    takealotSentimentBias: 0.0,
    aspectAdjustments: { 'Camera Quality': 0.15, Display: 0.1, 'Price Value': -0.05 },
    keywords: [
      { keyword: 'Dynamic Island', weight: 0.9 },
      { keyword: '48MP', weight: 0.85 },
      { keyword: 'always-on', weight: 0.7 },
      { keyword: 'heavy', weight: 0.5 },
      { keyword: 'zoom', weight: 0.6 },
    ],
    reviewTemplates: [
      { text: 'The Dynamic Island is clever and the 48MP camera is a massive leap. Always-on display is useful.', rating: 5, sentiment: 0.82, aspects: { Display: 0.75, 'Camera Quality': 0.85, 'iOS Experience': 0.7 } },
      { text: '48MP main camera takes incredible photos. The zoom capability is impressive. Dynamic Island is fun.', rating: 5, sentiment: 0.8, aspects: { 'Camera Quality': 0.88, Display: 0.65 } },
      { text: 'Love the Dynamic Island concept but the phone is quite heavy. Camera upgrade is worth it though.', rating: 4, sentiment: 0.55, aspects: { 'Build Quality': -0.15, 'Camera Quality': 0.8, Display: 0.6 } },
      { text: 'Always-on display drains battery faster than expected but the 48MP camera makes up for it.', rating: 4, sentiment: 0.5, aspects: { Display: 0.6, 'Battery Life': -0.2, 'Camera Quality': 0.85 } },
    ],
  },
  'iPhone 14 Pro Max': {
    releaseYear: 2022,
    priceUSD: 1099,
    baseSentiment: 0.73,
    amazonSentimentBias: 0.04,
    takealotSentimentBias: 0.02,
    aspectAdjustments: { 'Battery Life': 0.2, 'Camera Quality': 0.15, Display: 0.1, 'Price Value': -0.1 },
    keywords: [
      { keyword: 'battery monster', weight: 0.85 },
      { keyword: 'huge screen', weight: 0.7 },
      { keyword: '48MP', weight: 0.75 },
      { keyword: 'expensive', weight: 0.6 },
      { keyword: 'Dynamic Island', weight: 0.65 },
    ],
    reviewTemplates: [
      { text: 'Battery monster. Easily two days of use. The 48MP camera combined with this display is incredible.', rating: 5, sentiment: 0.85, aspects: { 'Battery Life': 0.9, 'Camera Quality': 0.8, Display: 0.7 } },
      { text: 'The Pro Max battery life is unmatched. Huge screen is great for media. But it is expensive.', rating: 5, sentiment: 0.72, aspects: { 'Battery Life': 0.88, Display: 0.65, 'Price Value': -0.25 } },
      { text: 'Best battery life on any iPhone. Camera is phenomenal. Price is steep but you get what you pay for.', rating: 4, sentiment: 0.6, aspects: { 'Battery Life': 0.9, 'Camera Quality': 0.82, 'Price Value': -0.15 } },
    ],
  },
  'iPhone 15': {
    releaseYear: 2023,
    priceUSD: 799,
    baseSentiment: 0.55,
    amazonSentimentBias: -0.02,
    takealotSentimentBias: -0.05,
    aspectAdjustments: { Heating: -0.3, 'Price Value': -0.1, 'Camera Quality': 0.1 },
    keywords: [
      { keyword: 'USB-C', weight: 0.9 },
      { keyword: 'heating', weight: 0.8 },
      { keyword: 'overheating', weight: 0.75 },
      { keyword: 'Dynamic Island', weight: 0.65 },
      { keyword: '48MP', weight: 0.6 },
    ],
    reviewTemplates: [
      { text: 'USB-C is finally here and the Dynamic Island trickles down. But the heating issues are concerning, gets very warm.', rating: 3, sentiment: 0.15, aspects: { Heating: -0.6, 'iOS Experience': 0.4, 'Price Value': -0.15 } },
      { text: 'Love USB-C but the phone overheats during video recording and charging. Apple needs to fix this.', rating: 2, sentiment: -0.1, aspects: { Heating: -0.7, 'Battery Life': -0.2 } },
      { text: '48MP camera is great and USB-C is overdue. The heating problem is real though, especially with gaming.', rating: 3, sentiment: 0.2, aspects: { 'Camera Quality': 0.7, Heating: -0.5 } },
      { text: 'Good phone but runs hot. The overheating throttles performance during intense use. USB-C is a win though.', rating: 3, sentiment: 0.1, aspects: { Heating: -0.55, Performance: -0.1, 'iOS Experience': 0.4 } },
    ],
  },
  'iPhone 15 Pro': {
    releaseYear: 2023,
    priceUSD: 999,
    baseSentiment: 0.65,
    amazonSentimentBias: 0.02,
    takealotSentimentBias: -0.02,
    aspectAdjustments: { 'Build Quality': 0.2, 'Camera Quality': 0.1, Heating: -0.2, Performance: 0.15 },
    keywords: [
      { keyword: 'titanium', weight: 0.95 },
      { keyword: 'A17 Pro', weight: 0.8 },
      { keyword: 'lightweight', weight: 0.75 },
      { keyword: 'USB-C', weight: 0.7 },
      { keyword: 'gaming', weight: 0.6 },
    ],
    reviewTemplates: [
      { text: 'The titanium build is gorgeous and so much lighter. A17 Pro chip handles console-level gaming. USB-C finally.', rating: 5, sentiment: 0.82, aspects: { 'Build Quality': 0.85, Performance: 0.8, 'iOS Experience': 0.6 } },
      { text: 'Titanium feels premium and lightweight. The A17 Pro is a beast for gaming. Best Pro build yet.', rating: 5, sentiment: 0.8, aspects: { 'Build Quality': 0.88, Performance: 0.82 } },
      { text: 'Love the titanium design but it gets warm during gaming. The lighter weight is a huge plus.', rating: 4, sentiment: 0.55, aspects: { 'Build Quality': 0.8, Heating: -0.3, Performance: 0.7 } },
      { text: 'Titanium is beautiful and light. USB-C is great. Camera with 5x zoom is excellent for travel.', rating: 5, sentiment: 0.75, aspects: { 'Build Quality': 0.85, 'Camera Quality': 0.7, 'iOS Experience': 0.5 } },
    ],
  },
  'iPhone 15 Pro Max': {
    releaseYear: 2023,
    priceUSD: 1199,
    baseSentiment: 0.68,
    amazonSentimentBias: 0.03,
    takealotSentimentBias: 0.0,
    aspectAdjustments: { 'Camera Quality': 0.2, 'Battery Life': 0.15, 'Build Quality': 0.2, 'Price Value': -0.1 },
    keywords: [
      { keyword: 'titanium', weight: 0.9 },
      { keyword: '5x zoom', weight: 0.85 },
      { keyword: 'periscope', weight: 0.7 },
      { keyword: 'expensive', weight: 0.65 },
      { keyword: 'battery', weight: 0.6 },
    ],
    reviewTemplates: [
      { text: 'The 5x periscope zoom is incredible for a phone. Titanium build feels premium. Battery life is excellent.', rating: 5, sentiment: 0.83, aspects: { 'Camera Quality': 0.88, 'Battery Life': 0.75, 'Build Quality': 0.8 } },
      { text: '5x zoom is the killer feature. Titanium is gorgeous. But the price is eye-watering.', rating: 4, sentiment: 0.6, aspects: { 'Camera Quality': 0.85, 'Price Value': -0.3, 'Build Quality': 0.8 } },
      { text: 'Best camera system on any iPhone with the periscope zoom. Battery lasts two days. Price is steep though.', rating: 4, sentiment: 0.58, aspects: { 'Camera Quality': 0.9, 'Battery Life': 0.8, 'Price Value': -0.25 } },
    ],
  },
  'iPhone 16': {
    releaseYear: 2024,
    priceUSD: 799,
    baseSentiment: 0.63,
    amazonSentimentBias: 0.02,
    takealotSentimentBias: -0.02,
    aspectAdjustments: { 'Camera Quality': 0.1, Performance: 0.1, 'Price Value': -0.05, 'iOS Experience': 0.1 },
    keywords: [
      { keyword: 'Camera Control', weight: 0.85 },
      { keyword: 'Apple Intelligence', weight: 0.8 },
      { keyword: 'colors', weight: 0.6 },
      { keyword: 'AI', weight: 0.75 },
      { keyword: 'vertical camera', weight: 0.55 },
    ],
    reviewTemplates: [
      { text: 'The new Camera Control button is a nice addition. Apple Intelligence features are starting to show promise.', rating: 4, sentiment: 0.55, aspects: { 'Camera Quality': 0.6, 'iOS Experience': 0.5, Performance: 0.5 } },
      { text: 'Love the new vertical camera layout and the colors are vibrant. AI features are still limited but promising.', rating: 4, sentiment: 0.5, aspects: { 'Build Quality': 0.5, 'Camera Quality': 0.55, 'iOS Experience': 0.45 } },
      { text: 'Camera Control button is genuinely useful for quick shots. The AI features need more time to mature.', rating: 4, sentiment: 0.52, aspects: { 'Camera Quality': 0.65, 'iOS Experience': 0.4 } },
      { text: 'Good phone with nice colors. The AI stuff is cool but not a reason to upgrade yet. Camera Control is handy.', rating: 4, sentiment: 0.48, aspects: { 'Build Quality': 0.55, 'Camera Quality': 0.6, 'iOS Experience': 0.5 } },
    ],
  },
  'iPhone 16 Pro': {
    releaseYear: 2024,
    priceUSD: 999,
    baseSentiment: 0.67,
    amazonSentimentBias: 0.03,
    takealotSentimentBias: 0.0,
    aspectAdjustments: { 'Camera Quality': 0.15, Performance: 0.15, Display: 0.1, 'Battery Life': 0.05 },
    keywords: [
      { keyword: 'Apple Intelligence', weight: 0.85 },
      { keyword: 'A18 Pro', weight: 0.8 },
      { keyword: 'Camera Control', weight: 0.7 },
      { keyword: 'thinner bezels', weight: 0.6 },
      { keyword: 'AI', weight: 0.75 },
    ],
    reviewTemplates: [
      { text: 'A18 Pro chip is blazing fast and Apple Intelligence is genuinely useful for summaries and writing. Great camera too.', rating: 5, sentiment: 0.78, aspects: { Performance: 0.82, 'iOS Experience': 0.7, 'Camera Quality': 0.7 } },
      { text: 'Thinner bezels make the display pop. Camera Control button is well implemented. AI is the future.', rating: 5, sentiment: 0.75, aspects: { Display: 0.7, 'Camera Quality': 0.65, 'iOS Experience': 0.6 } },
      { text: 'The A18 Pro handles everything effortlessly. Apple Intelligence summaries save me time daily. Best Pro yet.', rating: 5, sentiment: 0.8, aspects: { Performance: 0.85, 'iOS Experience': 0.75 } },
      { text: 'Solid upgrade. Camera Control is intuitive and AI features are getting better with each update.', rating: 4, sentiment: 0.6, aspects: { 'Camera Quality': 0.65, 'iOS Experience': 0.6, Performance: 0.7 } },
    ],
  },
  'iPhone 16 Pro Max': {
    releaseYear: 2024,
    priceUSD: 1199,
    baseSentiment: 0.69,
    amazonSentimentBias: 0.04,
    takealotSentimentBias: 0.02,
    aspectAdjustments: { 'Battery Life': 0.2, 'Camera Quality': 0.15, Performance: 0.15, Display: 0.1 },
    keywords: [
      { keyword: 'battery life', weight: 0.85 },
      { keyword: 'A18 Pro', weight: 0.75 },
      { keyword: 'AI', weight: 0.7 },
      { keyword: 'Camera Control', weight: 0.65 },
      { keyword: 'large display', weight: 0.6 },
    ],
    reviewTemplates: [
      { text: 'Battery life is incredible, easily 2 days. A18 Pro is the fastest chip yet. AI features are maturing nicely.', rating: 5, sentiment: 0.83, aspects: { 'Battery Life': 0.88, Performance: 0.82, 'iOS Experience': 0.65 } },
      { text: 'Best battery life on any Pro Max. Large display is beautiful. AI tools are genuinely helpful now.', rating: 5, sentiment: 0.8, aspects: { 'Battery Life': 0.9, Display: 0.7, 'iOS Experience': 0.6 } },
      { text: 'The A18 Pro performance is unmatched. Camera Control plus AI makes this a content creator dream.', rating: 5, sentiment: 0.78, aspects: { Performance: 0.85, 'Camera Quality': 0.7, 'iOS Experience': 0.65 } },
    ],
  },
  'iPhone 17': {
    releaseYear: 2025,
    priceUSD: 899,
    baseSentiment: 0.6,
    amazonSentimentBias: 0.0,
    takealotSentimentBias: -0.05,
    aspectAdjustments: { 'iOS Experience': 0.2, 'Camera Quality': 0.1, 'Price Value': -0.15 },
    keywords: [
      { keyword: 'AI', weight: 0.9 },
      { keyword: 'Apple Intelligence', weight: 0.85 },
      { keyword: 'expensive', weight: 0.6 },
      { keyword: '120Hz', weight: 0.7 },
      { keyword: 'smart', weight: 0.55 },
    ],
    reviewTemplates: [
      { text: 'Apple Intelligence has matured significantly. The AI features feel truly integrated now. 120Hz on base model finally!', rating: 5, sentiment: 0.72, aspects: { 'iOS Experience': 0.82, Display: 0.7, Performance: 0.6 } },
      { text: '120Hz finally on the base model is great. AI is smart but the price increase is hard to swallow.', rating: 4, sentiment: 0.45, aspects: { Display: 0.75, 'Price Value': -0.35, 'iOS Experience': 0.6 } },
      { text: 'The AI capabilities are impressive for daily tasks. But Apple raised the price again which stings.', rating: 4, sentiment: 0.4, aspects: { 'iOS Experience': 0.7, 'Price Value': -0.3 } },
      { text: 'Smart features powered by AI are genuinely useful. The price is the main drawback. 120Hz is a welcome addition.', rating: 4, sentiment: 0.5, aspects: { 'iOS Experience': 0.65, 'Price Value': -0.25, Display: 0.7 } },
    ],
  },
  'iPhone 17 Pro': {
    releaseYear: 2025,
    priceUSD: 1099,
    baseSentiment: 0.64,
    amazonSentimentBias: 0.02,
    takealotSentimentBias: -0.03,
    aspectAdjustments: { 'Camera Quality': 0.25, Performance: 0.2, 'iOS Experience': 0.15, 'Price Value': -0.2 },
    keywords: [
      { keyword: 'AI', weight: 0.95 },
      { keyword: 'camera revolution', weight: 0.8 },
      { keyword: 'expensive', weight: 0.7 },
      { keyword: 'A19 Pro', weight: 0.75 },
      { keyword: 'neural engine', weight: 0.65 },
    ],
    reviewTemplates: [
      { text: 'The camera system is a genuine revolution. AI-powered photography takes stunning shots automatically. A19 Pro is incredible.', rating: 5, sentiment: 0.82, aspects: { 'Camera Quality': 0.92, Performance: 0.85, 'iOS Experience': 0.7 } },
      { text: 'Camera is the best on any phone period. AI scene detection is magic. But the price is brutal.', rating: 5, sentiment: 0.7, aspects: { 'Camera Quality': 0.95, 'Price Value': -0.4, 'iOS Experience': 0.65 } },
      { text: 'A19 Pro with the neural engine makes AI features feel instant. Camera is extraordinary. Price is the only downside.', rating: 4, sentiment: 0.6, aspects: { Performance: 0.88, 'Camera Quality': 0.9, 'Price Value': -0.35 } },
      { text: 'The AI photography features are genuinely revolutionary. Every shot looks professional. Expensive but the camera justifies it.', rating: 5, sentiment: 0.75, aspects: { 'Camera Quality': 0.93, 'iOS Experience': 0.7, 'Price Value': -0.2 } },
    ],
  },
  'iPhone 17 Pro Max': {
    releaseYear: 2025,
    priceUSD: 1299,
    baseSentiment: 0.66,
    amazonSentimentBias: 0.03,
    takealotSentimentBias: -0.02,
    aspectAdjustments: { 'Camera Quality': 0.25, 'Battery Life': 0.2, Performance: 0.2, 'Price Value': -0.25 },
    keywords: [
      { keyword: 'AI', weight: 0.9 },
      { keyword: 'camera', weight: 0.85 },
      { keyword: 'expensive', weight: 0.75 },
      { keyword: 'battery', weight: 0.7 },
      { keyword: 'pro filmmaking', weight: 0.65 },
    ],
    reviewTemplates: [
      { text: 'The camera is professional filmmaking quality. AI handles everything. Battery life is phenomenal. Price is eye-watering though.', rating: 5, sentiment: 0.75, aspects: { 'Camera Quality': 0.93, 'Battery Life': 0.85, 'Price Value': -0.35 } },
      { text: 'Best camera on any smartphone. AI photography is magic. Battery lasts 2 days. The price is the only complaint.', rating: 4, sentiment: 0.62, aspects: { 'Camera Quality': 0.95, 'Battery Life': 0.82, 'Price Value': -0.4 } },
      { text: 'Pro-level filmmaking in your pocket. A19 Pro is a beast. AI features are the real star. Worth it despite the price.', rating: 5, sentiment: 0.73, aspects: { 'Camera Quality': 0.9, Performance: 0.85, 'iOS Experience': 0.75, 'Price Value': -0.15 } },
    ],
  },
};

// Seeded random for reproducible data
let seed = 42;
function seededRandom(): number {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

function gaussianRandom(mean: number, std: number): number {
  const u1 = seededRandom();
  const u2 = seededRandom();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * std;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function labelFromScore(score: number): SentimentLabel {
  if (score > 0.15) return 'Positive';
  if (score < -0.15) return 'Negative';
  return 'Neutral';
}

const VARIANTS = ['128GB', '256GB', '512GB', '1TB'];

function generateReviews(): Review[] {
  const reviews: Review[] = [];
  let idCounter = 0;

  for (const model of IPHONE_MODELS) {
    const profile = MODEL_PROFILES[model];
    const reviewCount = 500 + Math.floor(seededRandom() * 100);

    for (let i = 0; i < reviewCount; i++) {
      const platform: Platform = seededRandom() > 0.45 ? 'Amazon' : 'Takealot';
      const platformBias = platform === 'Amazon' ? profile.amazonSentimentBias : profile.takealotSentimentBias;

      // Pick a review template or generate variation
      const template = profile.reviewTemplates[Math.floor(seededRandom() * profile.reviewTemplates.length)];

      // Add noise to sentiment
      const sentimentScore = clamp(template.sentiment + platformBias + gaussianRandom(0, 0.12), -1, 1);
      const rating = clamp(Math.round(template.rating + gaussianRandom(0, 0.5)), 1, 5);

      // Generate date within release year +/- 2
      const yearOffset = Math.floor(seededRandom() * 2);
      const month = Math.floor(seededRandom() * 12) + 1;
      const day = Math.floor(seededRandom() * 28) + 1;
      const date = `${profile.releaseYear + yearOffset}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Generate aspect scores from template + noise
      const aspects: Partial<Record<Aspect, number>> = {};
      for (const aspect of ASPECTS) {
        const baseAdjust = profile.aspectAdjustments[aspect] ?? 0;
        const templateVal = template.aspects[aspect] ?? baseAdjust + profile.baseSentiment;
        aspects[aspect] = clamp(templateVal + gaussianRandom(0, 0.15), -1, 1);
      }

      reviews.push({
        id: `review_${idCounter++}`,
        iphoneModel: model,
        platform,
        rating,
        reviewText: template.text,
        date,
        variant: VARIANTS[Math.floor(seededRandom() * VARIANTS.length)],
        verified: seededRandom() > 0.15,
        sentimentScore: parseFloat(sentimentScore.toFixed(3)),
        sentimentLabel: labelFromScore(sentimentScore),
        aspects,
        helpful: Math.floor(seededRandom() * 50),
      });
    }
  }

  return reviews;
}

function computeModelSummaries(reviews: Review[]): ModelSummary[] {
  return IPHONE_MODELS.map((model) => {
    const modelReviews = reviews.filter((r) => r.iphoneModel === model);
    const profile = MODEL_PROFILES[model];

    const avgSentiment = modelReviews.reduce((s, r) => s + r.sentimentScore, 0) / modelReviews.length;
    const avgRating = modelReviews.reduce((s, r) => s + r.rating, 0) / modelReviews.length;

    const positive = modelReviews.filter((r) => r.sentimentLabel === 'Positive').length;
    const neutral = modelReviews.filter((r) => r.sentimentLabel === 'Neutral').length;
    const negative = modelReviews.filter((r) => r.sentimentLabel === 'Negative').length;

    const amazonReviews = modelReviews.filter((r) => r.platform === 'Amazon');
    const takealotReviews = modelReviews.filter((r) => r.platform === 'Takealot');

    const amazonSentiment = amazonReviews.length > 0
      ? amazonReviews.reduce((s, r) => s + r.sentimentScore, 0) / amazonReviews.length
      : avgSentiment;
    const takealotSentiment = takealotReviews.length > 0
      ? takealotReviews.reduce((s, r) => s + r.sentimentScore, 0) / takealotReviews.length
      : avgSentiment;

    const amazonPositivePct = amazonReviews.length > 0
      ? (amazonReviews.filter((r) => r.sentimentLabel === 'Positive').length / amazonReviews.length) * 100
      : 0;
    const takealotPositivePct = takealotReviews.length > 0
      ? (takealotReviews.filter((r) => r.sentimentLabel === 'Positive').length / takealotReviews.length) * 100
      : 0;

    // Aspect scores
    const aspectScores = {} as Record<Aspect, number>;
    for (const aspect of ASPECTS) {
      const scores = modelReviews.map((r) => r.aspects[aspect]).filter((v): v is number => v !== undefined);
      aspectScores[aspect] = scores.length > 0
        ? scores.reduce((s, v) => s + v, 0) / scores.length
        : 0;
    }

    // Top love and complaint
    const sortedAspects = [...ASPECTS].sort((a, b) => aspectScores[b] - aspectScores[a]);
    const topLove = sortedAspects[0];
    const topComplaint = sortedAspects[sortedAspects.length - 1];

    return {
      model,
      avgSentiment: parseFloat(avgSentiment.toFixed(3)),
      avgRating: parseFloat(avgRating.toFixed(2)),
      positivePct: parseFloat(((positive / modelReviews.length) * 100).toFixed(1)),
      neutralPct: parseFloat(((neutral / modelReviews.length) * 100).toFixed(1)),
      negativePct: parseFloat(((negative / modelReviews.length) * 100).toFixed(1)),
      amazonSentiment: parseFloat(amazonSentiment.toFixed(3)),
      takealotSentiment: parseFloat(takealotSentiment.toFixed(3)),
      amazonPositivePct: parseFloat(amazonPositivePct.toFixed(1)),
      takealotPositivePct: parseFloat(takealotPositivePct.toFixed(1)),
      aspectScores,
      topLove,
      topComplaint,
      dominantKeywords: profile.keywords,
      reviewCount: modelReviews.length,
      releaseYear: profile.releaseYear,
      priceUSD: profile.priceUSD,
    };
  });
}

function computeEvolutionInsights(summaries: ModelSummary[]): EvolutionInsight[] {
  const insights: EvolutionInsight[] = [];

  for (const aspect of ASPECTS) {
    const firstModel = summaries[0];
    const lastModel = summaries[summaries.length - 1];
    const firstScore = firstModel.aspectScores[aspect];
    const lastScore = lastModel.aspectScores[aspect];
    const change = ((lastScore - firstScore) / Math.abs(firstScore)) * 100;

    if (Math.abs(change) > 5) {
      insights.push({
        aspect,
        change: parseFloat(change.toFixed(1)),
        direction: change > 0 ? 'improved' : 'declined',
        fromModel: firstModel.model,
        toModel: lastModel.model,
        description: `${aspect} sentiment ${change > 0 ? '+' : ''}${change.toFixed(1)}% from ${firstModel.model} to ${lastModel.model}`,
      });
    }
  }

  // Find biggest jump between consecutive models
  for (let i = 1; i < summaries.length; i++) {
    const prev = summaries[i - 1];
    const curr = summaries[i];
    for (const aspect of ASPECTS) {
      const prevScore = prev.aspectScores[aspect];
      const currScore = curr.aspectScores[aspect];
      const change = ((currScore - prevScore) / Math.abs(prevScore)) * 100;
      if (Math.abs(change) > 20) {
        insights.push({
          aspect,
          change: parseFloat(change.toFixed(1)),
          direction: change > 0 ? 'improved' : 'declined',
          fromModel: prev.model,
          toModel: curr.model,
          description: `${aspect} ${change > 0 ? 'jumped' : 'dropped'} ${change > 0 ? '+' : ''}${change.toFixed(1)}% from ${prev.model} to ${curr.model}`,
        });
      }
    }
  }

  return insights.sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 12);
}

function computePlatformDifferences(summaries: ModelSummary[]): PlatformDifference[] {
  return summaries.map((s) => {
    const delta = s.amazonSentiment - s.takealotSentiment;

    const amazonAspects = Object.entries(s.aspectScores).sort((a, b) => b[1] - a[1]);
    const takealotAspects = Object.entries(s.aspectScores).sort((a, b) => b[1] - a[1]);

    const amazonTopAspect = amazonAspects[0][0] as Aspect;
    const takealotTopAspect = takealotAspects[0][0] as Aspect;
    const amazonTopComplaint = amazonAspects[amazonAspects.length - 1][0] as Aspect;
    const takealotTopComplaint = takealotAspects[takealotAspects.length - 1][0] as Aspect;

    let insight = '';
    if (delta > 0.05) {
      insight = 'US customers are more positive, likely due to lower pricing and wider availability.';
    } else if (delta < -0.05) {
      insight = 'South African customers are more positive, valuing the premium status and resale value.';
    } else {
      insight = 'Sentiment is similar across both markets, with minor differences in aspect priorities.';
    }

    return {
      model: s.model,
      amazonSentiment: s.amazonSentiment,
      takealotSentiment: s.takealotSentiment,
      delta: parseFloat(delta.toFixed(3)),
      amazonTopAspect,
      takealotTopAspect,
      amazonTopComplaint,
      takealotTopComplaint,
      insight,
    };
  });
}

// Generate all data at module load
const allReviews = generateReviews();
const allSummaries = computeModelSummaries(allReviews);
const allInsights = computeEvolutionInsights(allSummaries);
const allPlatformDifferences = computePlatformDifferences(allSummaries);

export function getAllReviews(): Review[] {
  return allReviews;
}

export function getAllSummaries(): ModelSummary[] {
  return allSummaries;
}

export function getAllInsights(): EvolutionInsight[] {
  return allInsights;
}

export function getAllPlatformDifferences(): PlatformDifference[] {
  return allPlatformDifferences;
}

export function getSummaryByModel(model: string): ModelSummary | undefined {
  return allSummaries.find((s) => s.model === model);
}

export function getReviewsByModel(model: string): Review[] {
  return allReviews.filter((r) => r.iphoneModel === model);
}

export function filterReviews(filters: {
  model?: string;
  platform?: string;
  sentiment?: string;
  aspect?: string;
  search?: string;
  limit?: number;
}): Review[] {
  let result = allReviews;

  if (filters.model && filters.model !== 'all') {
    result = result.filter((r) => r.iphoneModel === filters.model);
  }
  if (filters.platform && filters.platform !== 'all') {
    result = result.filter((r) => r.platform === filters.platform);
  }
  if (filters.sentiment && filters.sentiment !== 'all') {
    result = result.filter((r) => r.sentimentLabel === filters.sentiment);
  }
  if (filters.aspect && filters.aspect !== 'all') {
    result = result.filter((r) => {
      const score = r.aspects[filters.aspect as Aspect];
      return score !== undefined && score < -0.1;
    });
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((r) => r.reviewText.toLowerCase().includes(q));
  }

  return result.slice(0, filters.limit ?? 100);
}
