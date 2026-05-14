import { Hand } from "lucide-react";
import certificateImg from "@/assets/certificate.jpeg";

const TrustCertificateSection = () => {
  return (
    <section
      className="bg-section-dark pb-10 pt-0 md:pb-14"
      aria-labelledby="trust-banner-title"
    >
      <div className="w-full bg-accent px-4 py-3 text-center md:py-3.5">
        <p
          id="trust-banner-title"
          className="mx-auto max-w-3xl text-sm font-bold leading-snug text-accent-foreground md:text-base lg:text-lg"
        >
          ১০০% নিরাপদ ও নির্ভরযোগ্য: সরকারি লাইসেন্সপ্রাপ্ত পণ্য। নিশ্চিন্তে ব্যবহার করুন!
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-8 md:pt-10">
        <img
          src={certificateImg}
          alt="শিফা কেয়ার — সরকারি পরীক্ষাগারের সার্টিফিকেট ও বিশ্লেষণ প্রতিবেদন"
          className="w-full rounded-lg border border-primary-foreground/15 bg-card shadow-card"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="mt-8 flex justify-center px-4">
        <a
          href="#order"
          className="inline-flex items-center gap-2 rounded-lg bg-card px-8 py-3.5 text-base font-bold text-card-foreground shadow-card transition-opacity hover:opacity-90 md:text-lg"
        >
          <Hand className="size-5 shrink-0" aria-hidden />
          অর্ডার করুন
        </a>
      </div>
    </section>
  );
};

export default TrustCertificateSection;
