import BenefitsSection from "@/components/BenefitsSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import OrderSection from "@/components/OrderSection";
import PricingBanner from "@/components/PricingBanner";
import ProductsSection from "@/components/ProductsSection";
import ReviewsSection from "@/components/ReviewsSection";
import TrustCertificateSection from "@/components/TrustCertificateSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <OfferCountdownBar /> */}
      <HeroSection />
      <BenefitsSection />
      <TrustCertificateSection />
      <PricingBanner />
      <ProductsSection />
      <ReviewsSection />
      <OrderSection />
      <FooterSection />
    </div>
  );
};

export default Index;
