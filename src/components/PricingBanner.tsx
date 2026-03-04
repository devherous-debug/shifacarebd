const PricingBanner = () => {
  return (
    <section className="py-14 px-4 bg-primary">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <p className="text-primary-foreground text-xl md:text-2xl font-medium">
          শিফা-কেয়ার তেলের পূর্বের মূল্য:{" "}
          <span className="line-through text-destructive font-bold text-2xl md:text-3xl decoration-2">
            ১৮৮০
          </span>{" "}
          টাকা
        </p>

        <div className="relative inline-block">
          <p className="text-[hsl(var(--accent))] text-3xl md:text-5xl font-bold">
            অফার মূল্য- ৯৪০ টাকা
          </p>
          {/* Double animated curve underlines */}
          <svg
            className="w-full h-6 mt-1"
            viewBox="0 0 300 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* First curve */}
            <path
              d="M0 8 Q75 20 150 8 Q225 -4 300 8"
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="320"
              strokeDashoffset="320"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="320"
                to="0"
                dur="1s"
                fill="freeze"
                repeatCount="indefinite"
              />
            </path>
            {/* Second curve */}
            <path
              d="M0 16 Q75 28 150 16 Q225 4 300 16"
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="320"
              strokeDashoffset="320"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="320"
                to="0"
                dur="1s"
                begin="0.8s"
                fill="freeze"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        <div className="pt-4 space-y-1">
          <p className="text-primary-foreground text-lg md:text-xl font-semibold">
            ২ পিস নিলে ১৮০ টাকা ডিস্কাউন্ট!
          </p>
          <p className="text-primary-foreground/90 text-base md:text-lg">
            (এখন অর্ডার করলে ফ্রি হোম ডেলিভারি!!)
          </p>
        </div>

        <div className="pt-6">
          <a
            href="#order"
            className="inline-block bg-accent text-accent-foreground text-xl md:text-2xl font-bold px-10 py-4 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            এখনই অর্ডার করুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingBanner;
