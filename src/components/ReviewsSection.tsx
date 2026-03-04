import { Star } from "lucide-react";

const reviews = [
  { name: "রহিমা বেগম", location: "ঢাকা", text: "শিফা কেয়ার ব্যবহার করে আমার হাঁটু ব্যথা অনেক কমেছে। আলহামদুলিল্লাহ!", rating: 5 },
  { name: "আব্দুল করিম", location: "চট্টগ্রাম", text: "কোমর ব্যথায় অনেক কষ্ট পেতাম। মাত্র ১২ দিনে অনেক আরাম পেয়েছি।", rating: 5 },
  { name: "ফাতেমা খাতুন", location: "রাজশাহী", text: "আমার শাশুড়ির জন্য কিনেছিলাম, উনি খুব খুশি। সবাইকে রেকমেন্ড করি।", rating: 5 },
  { name: "মোঃ সালাম", location: "সিলেট", text: "প্রোডাক্টের মান অসাধারণ। ডেলিভারিও খুব দ্রুত পেয়েছি।", rating: 4 },
];

const ReviewsSection = () => {
  return (
    <section className="py-12 px-4 bg-section-dark">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(var(--section-dark-foreground))" }}>
          আমাদের সন্তুষ্ট গ্রাহক
        </h2>
        <p className="text-center mb-10 opacity-80" style={{ color: "hsl(var(--section-dark-foreground))" }}>
          হাজারো গ্রাহকের বিশ্বাসের প্রতিদান
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card rounded-lg p-5 shadow-card">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={16} className={j < r.rating ? "text-accent fill-accent" : "text-border"} />
                ))}
              </div>
              <p className="text-foreground text-sm mb-4 leading-relaxed">"{r.text}"</p>
              <div className="border-t border-border pt-3">
                <p className="font-bold text-foreground text-sm">{r.name}</p>
                <p className="text-muted-foreground text-xs">{r.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
