"""
iPhone Evolution Sentiment Lens - Sentiment & Comparison Engine
================================================================
Analyzes review data and computes sentiment scores, aspect-based
sentiment, year-over-year changes, platform deltas, and keyword trends.

Usage:
    python scripts/analyzer.py

Inputs:
    data/all_iphones_raw.csv  (from scraper.py)

Outputs:
    data/all_iphones_analyzed.csv
    data/model_comparison_summary.json
"""

import csv
import json
import os
import sys
from collections import Counter, defaultdict

# Try importing sentiment analysis libraries
try:
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    VADER = SentimentIntensityAnalyzer()
    HAS_VADER = True
except ImportError:
    HAS_VADER = False
    print("Warning: vaderSentiment not installed. Using pre-computed sentiment scores.")

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    HAS_SKLEARN = True
except ImportError:
    HAS_SKLEARN = False

IPHONE_MODELS = [
    "iPhone 11", "iPhone 12", "iPhone 12 Pro", "iPhone 13", "iPhone 13 Pro",
    "iPhone 14", "iPhone 14 Pro", "iPhone 14 Pro Max", "iPhone 15", "iPhone 15 Pro",
    "iPhone 15 Pro Max", "iPhone 16", "iPhone 16 Pro", "iPhone 16 Pro Max",
    "iPhone 17", "iPhone 17 Pro", "iPhone 17 Pro Max",
]

ASPECTS = [
    "Battery Life", "Camera Quality", "Performance", "Display",
    "Heating", "Price Value", "Build Quality", "iOS Experience",
]

ASPECT_KEYWORDS = {
    "Battery Life": ["battery", "charge", "charging", "drain", "battery life", "power"],
    "Camera Quality": ["camera", "photo", "lens", "zoom", "portrait", "photo quality", "picture"],
    "Performance": ["speed", "fast", "performance", "lag", "snappy", "chip", "processor", "a17", "a18", "a19"],
    "Display": ["display", "screen", "oled", "lcd", "bright", "refresh rate", "120hz", "promotion"],
    "Heating": ["heat", "hot", "overheat", "warm", "temperature", "throttle"],
    "Price Value": ["price", "expensive", "value", "worth", "cost", "overpriced", "affordable"],
    "Build Quality": ["build", "design", "titanium", "aluminum", "glass", "durability", "weight", "heavy", "light"],
    "iOS Experience": ["ios", "software", "ai", "intelligence", "features", "interface", "smooth", "update"],
}


def load_reviews(filepath):
    """Load reviews from CSV file."""
    reviews = []
    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Parse aspect scores
            for aspect in ASPECTS:
                key = f"aspect_{aspect.replace(' ', '_').lower()}"
                if key in row and row[key]:
                    row[key] = float(row[key])

            if "sentiment_score" in row:
                row["sentiment_score"] = float(row["sentiment_score"])
            if "rating" in row:
                row["rating"] = int(row["rating"])
            if "verified" in row:
                row["verified"] = row["verified"] == "True"

            reviews.append(row)
    return reviews


def compute_vader_sentiment(text):
    """Compute sentiment using VADER if available."""
    if HAS_VADER:
        scores = VADER.polarity_scores(text)
        return scores["compound"]
    return 0.0


def label_from_score(score):
    """Convert sentiment score to label."""
    if score > 0.15:
        return "Positive"
    elif score < -0.15:
        return "Negative"
    return "Neutral"


def analyze_aspect_sentiment(text, sentiment_score):
    """
    Compute aspect-based sentiment by checking if aspect keywords
    appear in the review and weighting by overall sentiment.
    """
    text_lower = text.lower()
    aspect_scores = {}

    for aspect, keywords in ASPECT_KEYWORDS.items():
        matches = sum(1 for kw in keywords if kw in text_lower)
        if matches > 0:
            # Weight sentiment by keyword presence
            aspect_scores[aspect] = sentiment_score * min(1.0, matches / 2)
        else:
            aspect_scores[aspect] = None  # Not mentioned

    return aspect_scores


def extract_keywords(reviews, top_n=5):
    """Extract dominant keywords for a set of reviews using TF-IDF."""
    texts = [r["review_text"] for r in reviews]

    if HAS_SKLEARN and len(texts) > 1:
        vectorizer = TfidfVectorizer(max_features=100, stop_words="english", ngram_range=(1, 2))
        try:
            tfidf = vectorizer.fit_transform(texts)
            feature_names = vectorizer.get_feature_names_out()
            scores = tfidf.sum(axis=0).A1
            ranked = sorted(zip(feature_names, scores), key=lambda x: x[1], reverse=True)
            return [{"keyword": kw, "weight": round(score / scores.max(), 2)} for kw, score in ranked[:top_n]]
        except Exception:
            pass

    # Fallback: word frequency
    words = []
    for text in texts:
        words.extend(text.lower().split())
    word_counts = Counter(words)
    # Filter common words
    stop_words = set("the a an and or but is are was were to of in for with on at by from this that it its as be".split())
    filtered = {w: c for w, c in word_counts.items() if w not in stop_words and len(w) > 3}
    top = sorted(filtered.items(), key=lambda x: x[1], reverse=True)[:top_n]
    max_count = top[0][1] if top else 1
    return [{"keyword": w, "weight": round(c / max_count, 2)} for w, c in top]


def compute_model_summary(model, reviews):
    """Compute summary statistics for a single iPhone model."""
    model_reviews = [r for r in reviews if r["iphone_model"] == model]
    if not model_reviews:
        return None

    n = len(model_reviews)

    # Overall sentiment
    sentiments = [r.get("sentiment_score", compute_vader_sentiment(r["review_text"])) for r in model_reviews]
    avg_sentiment = sum(sentiments) / n

    # Average rating
    avg_rating = sum(r["rating"] for r in model_reviews) / n

    # Sentiment distribution
    labels = [label_from_score(s) for s in sentiments]
    label_counts = Counter(labels)
    positive_pct = (label_counts.get("Positive", 0) / n) * 100
    neutral_pct = (label_counts.get("Neutral", 0) / n) * 100
    negative_pct = (label_counts.get("Negative", 0) / n) * 100

    # Platform breakdown
    amazon_reviews = [r for r in model_reviews if r["platform"] == "Amazon"]
    takealot_reviews = [r for r in model_reviews if r["platform"] == "Takealot"]

    amazon_sentiment = sum(r.get("sentiment_score", 0) for r in amazon_reviews) / max(len(amazon_reviews), 1)
    takealot_sentiment = sum(r.get("sentiment_score", 0) for r in takealot_reviews) / max(len(takealot_reviews), 1)

    amazon_pos = sum(1 for r in amazon_reviews if label_from_score(r.get("sentiment_score", 0)) == "Positive")
    takealot_pos = sum(1 for r in takealot_reviews if label_from_score(r.get("sentiment_score", 0)) == "Positive")

    amazon_pos_pct = (amazon_pos / max(len(amazon_reviews), 1)) * 100
    takealot_pos_pct = (takealot_pos / max(len(takealot_reviews), 1)) * 100

    # Aspect scores
    aspect_scores = {}
    for aspect in ASPECTS:
        key = f"aspect_{aspect.replace(' ', '_').lower()}"
        scores = [r[key] for r in model_reviews if key in r and r[key] is not None]
        aspect_scores[aspect] = round(sum(scores) / max(len(scores), 1), 3) if scores else 0.0

    # Top love and complaint
    sorted_aspects = sorted(aspect_scores.items(), key=lambda x: x[1], reverse=True)
    top_love = sorted_aspects[0][0]
    top_complaint = sorted_aspects[-1][0]

    # Keywords
    keywords = extract_keywords(model_reviews)

    return {
        "model": model,
        "avg_sentiment": round(avg_sentiment, 3),
        "avg_rating": round(avg_rating, 2),
        "positive_pct": round(positive_pct, 1),
        "neutral_pct": round(neutral_pct, 1),
        "negative_pct": round(negative_pct, 1),
        "amazon_sentiment": round(amazon_sentiment, 3),
        "takealot_sentiment": round(takealot_sentiment, 3),
        "amazon_pos": round(amazon_pos_pct, 1),
        "takealot_pos": round(takealot_pos_pct, 1),
        "aspect_scores": aspect_scores,
        "top_love": top_love,
        "top_complaint": top_complaint,
        "dominant_keywords": keywords,
        "review_count": n,
    }


def compute_evolution_insights(summaries):
    """Compute year-over-year sentiment changes."""
    insights = []

    for i in range(1, len(summaries)):
        prev = summaries[i - 1]
        curr = summaries[i]
        for aspect in ASPECTS:
            prev_score = prev["aspect_scores"][aspect]
            curr_score = curr["aspect_scores"][aspect]
            if abs(prev_score) > 0.01:
                change = ((curr_score - prev_score) / abs(prev_score)) * 100
                if abs(change) > 15:
                    insights.append({
                        "aspect": aspect,
                        "change": round(change, 1),
                        "direction": "improved" if change > 0 else "declined",
                        "from_model": prev["model"],
                        "to_model": curr["model"],
                        "description": f"{aspect} sentiment {'+' if change > 0 else ''}{change:.1f}% from {prev['model']} to {curr['model']}",
                    })

    return sorted(insights, key=lambda x: abs(x["change"]), reverse=True)[:12]


def compute_platform_differences(summaries):
    """Compute Amazon vs Takealot sentiment differences."""
    differences = []
    for s in summaries:
        delta = s["amazon_sentiment"] - s["takealot_sentiment"]
        sorted_aspects = sorted(s["aspect_scores"].items(), key=lambda x: x[1], reverse=True)

        if delta > 0.05:
            insight = "US customers are more positive, likely due to lower pricing and wider availability."
        elif delta < -0.05:
            insight = "South African customers are more positive, valuing premium status and resale value."
        else:
            insight = "Sentiment is similar across both markets, with minor differences in aspect priorities."

        differences.append({
            "model": s["model"],
            "amazon_sentiment": s["amazon_sentiment"],
            "takealot_sentiment": s["takealot_sentiment"],
            "delta": round(delta, 3),
            "amazon_top_aspect": sorted_aspects[0][0],
            "takealot_top_aspect": sorted_aspects[0][0],
            "amazon_top_complaint": sorted_aspects[-1][0],
            "takealot_top_complaint": sorted_aspects[-1][0],
            "insight": insight,
        })

    return differences


def main():
    print("=" * 60)
    print("iPhone Evolution Sentiment Lens - Analysis Engine")
    print("=" * 60)

    # Load reviews
    input_path = os.path.join(os.path.dirname(__file__), "..", "data", "all_iphones_raw.csv")
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found. Run scraper.py first.")
        sys.exit(1)

    print(f"\nLoading reviews from {input_path}...")
    reviews = load_reviews(input_path)
    print(f"Loaded {len(reviews)} reviews")

    # Compute VADER sentiment if not pre-computed
    if HAS_VADER and "sentiment_score" not in reviews[0]:
        print("\nComputing VADER sentiment scores...")
        for r in reviews:
            r["sentiment_score"] = compute_vader_sentiment(r["review_text"])
            r["sentiment_label"] = label_from_score(r["sentiment_score"])

    # Compute aspect sentiment if not pre-computed
    if f"aspect_{ASPECTS[0].replace(' ', '_').lower()}" not in reviews[0]:
        print("Computing aspect-based sentiment...")
        for r in reviews:
            aspect_scores = analyze_aspect_sentiment(r["review_text"], r.get("sentiment_score", 0))
            for aspect, score in aspect_scores.items():
                key = f"aspect_{aspect.replace(' ', '_').lower()}"
                r[key] = score

    # Save analyzed reviews
    output_csv = os.path.join(os.path.dirname(__file__), "..", "data", "all_iphones_analyzed.csv")
    keys = reviews[0].keys()
    with open(output_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(reviews)
    print(f"\nSaved analyzed reviews to {output_csv}")

    # Compute model summaries
    print("\nComputing model summaries...")
    summaries = []
    for model in IPHONE_MODELS:
        summary = compute_model_summary(model, reviews)
        if summary:
            summaries.append(summary)
            print(f"  {model}: sentiment={summary['avg_sentiment']}, rating={summary['avg_rating']}, reviews={summary['review_count']}")

    # Compute insights
    print("\nComputing evolution insights...")
    insights = compute_evolution_insights(summaries)
    for ins in insights[:5]:
        print(f"  {ins['description']}")

    # Compute platform differences
    print("\nComputing platform differences...")
    platform_diffs = compute_platform_differences(summaries)

    # Save summary JSON
    summary_json = {
        "summaries": {s["model"]: s for s in summaries},
        "evolution_insights": insights,
        "platform_differences": platform_diffs,
        "total_reviews": len(reviews),
        "models_analyzed": len(summaries),
    }

    output_json = os.path.join(os.path.dirname(__file__), "..", "data", "model_comparison_summary.json")
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(summary_json, f, indent=2)
    print(f"\nSaved summary to {output_json}")

    # Print final report
    print("\n" + "=" * 60)
    print("ANALYSIS COMPLETE")
    print("=" * 60)
    print(f"Total reviews analyzed: {len(reviews)}")
    print(f"Models analyzed: {len(summaries)}")
    print(f"Evolution insights: {len(insights)}")
    print(f"Platform comparisons: {len(platform_diffs)}")

    most_loved = max(summaries, key=lambda x: x["avg_sentiment"])
    most_complained = min(summaries, key=lambda x: x["avg_sentiment"])
    print(f"\nMost loved: {most_loved['model']} ({most_loved['avg_sentiment']})")
    print(f"Most complained: {most_complained['model']} ({most_complained['avg_sentiment']})")
    print("=" * 60)


if __name__ == "__main__":
    main()
