import { Facebook, Twitter, Youtube, Users } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-8">
          {/* Brand + About */}
          <div>
            <h3 className="text-3xl font-bold mb-3 text-[hsl(var(--accent))]">শিফা কেয়ার</h3>
            <p className="text-sm leading-relaxed opacity-90 mb-2">
              সুস্থ ও যন্ত্রণামুক্ত জীবনই প্রকৃত সুখ। আর আপনার এই পথচলায় সাথী হতে
              এলো শিফা-কেয়ার পেইন রিলিফ অয়েল।
            </p>
            <p className="text-sm leading-relaxed opacity-80">
              আমরা জানি, দীর্ঘদিনের ব্যথার যন্ত্রণা একটি জীবনকে কতটা বিষময় করে তুলতে
              পারে। তাই আপনার কষ্ট লাঘব করতে আমরা দেশজুড়ে পৌঁছে দিচ্ছি আমাদের
              বিশেষ প্রাকৃতিক ফর্মুলায় তৈরি এই পেইন রিলিফ অয়েল। এটি শুধু একটি
              সাধারণ তেল নয়, বরং আপনার হাড়ের জয়েন্ট, কোমর বা পেশীর ব্যথায়
              প্রতিদিনের সুস্থ থাকার এক বিশ্বস্ত ও কার্যকরী সঙ্গী। নিয়মিতভাবে আমরা
              সারা বাংলাদেশ এবং দেশের বাইরেও আমাদের এই বিশেষ সেবা পৌঁছে দিচ্ছি।
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Youtube, Users].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Delivery + Return Policy */}
          <div>
            <h4 className="text-xl font-bold mb-4 italic">ডেলিভারি পলিসি (Delivery Policy)</h4>
            <ul className="space-y-3 text-sm opacity-90 list-disc list-inside">
              <li><strong>দ্রুত ডেলিভারি:</strong> অর্ডার কনফার্ম করার পর আমরা নির্দিষ্ট সময়ের মধ্যেই পণ্য পৌঁছে দিই।</li>
              <li><strong>দেশজুড়ে কুরিয়ার:</strong> সারা বাংলাদেশে নির্ভরযোগ্য কুরিয়ার সার্ভিসের মাধ্যমে পণ্য পাঠানো হয়।</li>
              <li><strong>ডেলিভারি চার্জ:</strong> এলাকা ভেদে নির্ধারিত ডেলিভারি চার্জ প্রযোজ্য হবে।</li>
            </ul>

            <div className="border-t border-primary-foreground/20 my-5" />

            <h4 className="text-xl font-bold mb-4 italic">রিটার্ন পলিসি (Return Policy)</h4>
            <ul className="space-y-3 text-sm opacity-90 list-disc list-inside">
              <li><strong>পণ্য পরিবর্তন:</strong> ভুলবশত অন্য কোনো পণ্য পাঠানো হলে আমরা তা দ্রুত পরিবর্তনের ব্যবস্থা করি।</li>
              <li><strong>ক্ষতিগ্রস্ত পণ্য:</strong> ডেলিভারি পাওয়ার সময় পণ্য ক্ষতিগ্রস্ত থাকলে তৎক্ষণাৎ রিটার্ন করার সুযোগ রয়েছে।</li>
              <li><strong>আবেদনের সময়:</strong> যেকোনো সমস্যা থাকলে পণ্য পাওয়ার নির্দিষ্ট সময়ের মধ্যে আমাদের জানাতে হবে।</li>
            </ul>
          </div>

          {/* Refund Policy */}
          <div>
            <h4 className="text-xl font-bold mb-4 italic">রিফান্ড পলিসি (Refund Policy)</h4>
            <ul className="space-y-3 text-sm opacity-90 list-disc list-inside">
              <li><strong>সহজ রিফান্ড:</strong> রিটার্নকৃত পণ্যটি যাচাই ও অনুমোদন সাপেক্ষে আমরা দ্রুত রিফান্ড প্রদান করি।</li>
              <li><strong>মানি ব্যাক গ্যারান্টি:</strong> পণ্যটি কাজ না করলে নির্দিষ্ট সময়সীমার মধ্যে রিফান্ডের আবেদন করা যাবে।</li>
              <li><strong>শর্তাবলী:</strong> ব্যবহৃত পণ্যের ক্ষেত্রে রিফান্ড পলিসি প্রযোজ্য নয়।</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>© 2026 Shifa Care. All rights reserved.</p>
          <p>Designed By <span className="text-[hsl(var(--accent))] font-semibold">শিফা কেয়ার</span></p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
