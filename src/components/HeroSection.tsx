import heroBanner from "@/assets/hero-banner.jpg";
import { Globe, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top Banner */}
      <div className="bg-hero-gradient py-6 px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground leading-relaxed">
          ব্যথার <span className="text-accent">কষ্ট</span> থেকে মুক্তি পেতে চান?
        </h1>
        <p className="text-primary-foreground/90 mt-2 text-sm md:text-lg max-w-2xl mx-auto">
          মাত্র ১০-১৫ দিন নিয়মিত ব্যবহারে হাঁটু ব্যথা, কোমর ব্যথা, ঘাড় ব্যথা সহ সকল ব্যথার প্রাকৃতিক সমাধান পান শিফা কেয়ার থেকে!!
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative">
        <img
          src={heroBanner}
          alt="শিফা কেয়ার - মায়ের হাসি ফিরিয়ে আনুন"
          className="w-full h-[300px] md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex items-center">
          <div className="px-6 md:px-16 max-w-lg">
            <p className="text-primary-foreground text-xl md:text-3xl font-bold mb-2">ফিরিয়ে আনুন</p>
            <h2 className="text-primary-foreground text-3xl md:text-5xl font-bold leading-tight">
              মায়ের হাসি
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 text-primary-foreground text-sm">
              <a href="tel:01618109505" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={16} /> 01618-109505
              </a>
              <a href="https://shifacarebd.shop" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Globe size={16} /> www.shifacarebd.shop
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantee Bar */}
      <div className="bg-accent py-4 text-center">
        <p className="text-accent-foreground text-lg md:text-2xl font-bold">
          কাজ না হলে ১০০% মানি ব্যাক গ্যারান্টি!
        </p>
      </div>

      {/* CTA Button */}
      <div className="text-center py-6 bg-secondary flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="#order"
          className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-opacity animate-bounce-subtle"
        >
          অর্ডার করতে চাই
        </a>
        <a
          href="https://wa.me/8801618109505"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[hsl(142,70%,40%)] text-primary-foreground px-8 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          অর্ডার
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
