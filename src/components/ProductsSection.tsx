import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const products = [
  {
    name: "শিফা কেয়ার পেইন রিলিফ অয়েল",
    image: product1,
    oldPrice: "১৮৮০",
    newPrice: "৯৮০",
    description: "হাঁটু, কোমর ও ঘাড় ব্যথার জন্য কার্যকরী তেল।",
  },
  {
    name: "শিফা কেয়ার পেইন রিলিফ বাম",
    image: product2,
    oldPrice: "১৫০০",
    newPrice: "৮৫০",
    description: "জয়েন্ট পেইন ও মাংসপেশীর ব্যথায় দ্রুত আরাম।",
  },
  {
    name: "শিফা কেয়ার বডি ম্যাসাজ অয়েল",
    image: product3,
    oldPrice: "১২০০",
    newPrice: "৭৫০",
    description: "শরীরের ক্লান্তি দূর করে, রক্ত সঞ্চালন বৃদ্ধি করে।",
  },
];

const ProductsSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          আমাদের পণ্যসমূহ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div key={i} className="bg-card rounded-lg shadow-card overflow-hidden border border-border hover:shadow-lg transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-badge-hot text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  অফার!
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">{p.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{p.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-price-old line-through text-lg">৳{p.oldPrice}</span>
                  <span className="text-price-new font-bold text-2xl">৳{p.newPrice}</span>
                </div>
                <a
                  href="#order"
                  className="block text-center bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                >
                  অর্ডার করুন
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
