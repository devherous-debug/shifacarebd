import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import PricingBanner from "@/components/PricingBanner";
import ProductsSection from "@/components/ProductsSection";
import ReviewsSection from "@/components/ReviewsSection";
import OrderSection from "@/components/OrderSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-bengali">
      <HeroSection />
      <BenefitsSection />
      <PricingBanner />
      <ProductsSection />
      <ReviewsSection />
      <OrderSection />
      <FooterSection />
    </div>
  );
};

export default Index;
