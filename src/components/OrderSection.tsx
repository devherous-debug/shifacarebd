import { useState } from "react";
import { toast } from "sonner";

const OrderSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", address: "", product: "oil", quantity: "1" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন");
      return;
    }
    toast.success("আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে! শীঘ্রই আমরা আপনার সাথে যোগাযোগ করবো।");
    setForm({ name: "", phone: "", address: "", product: "oil", quantity: "1" });
  };

  return (
    <section id="order" className="py-12 px-4 bg-secondary">
      <div className="max-w-2xl mx-auto">
        <div className="bg-hero-gradient text-primary-foreground text-center py-3 rounded-t-lg">
          <h2 className="text-xl md:text-2xl font-bold">অর্ডার করুন</h2>
        </div>
        <div className="bg-card rounded-b-lg shadow-card p-6 md:p-8">
          {/* Pricing Summary */}
          <div className="text-center mb-8 pb-6 border-b border-border">
            <p className="text-muted-foreground mb-1">শিফা কেয়ার তেলের পূর্ব মূল্য:</p>
            <p className="text-price-old line-through text-2xl font-bold">৳১৮৮০ টাকা</p>
            <p className="text-price-new text-3xl font-bold mt-1">অফার মূল্য: ৳৯৮০ টাকা</p>
            <p className="text-muted-foreground text-sm mt-2">২ পিস নিলে ১৬০ টাকা ডিসকাউন্ট</p>
            <p className="text-muted-foreground text-sm">(ঢাকার ভিতরে ডেলিভারি ফ্রি, ঢাকার বাইরে কুরিয়ার)</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-1">আপনার নাম *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-input rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
                placeholder="পুরো নাম লিখুন"
              />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1">মোবাইল নম্বর *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-input rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
                placeholder="01XXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-1">সম্পূর্ণ ঠিকানা *</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-input rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
                rows={3}
                placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground font-medium mb-1">পণ্য নির্বাচন</label>
                <select
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full border border-input rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
                >
                  <option value="oil">পেইন রিলিফ অয়েল</option>
                  <option value="balm">পেইন রিলিফ বাম</option>
                  <option value="massage">বডি ম্যাসাজ অয়েল</option>
                </select>
              </div>
              <div>
                <label className="block text-foreground font-medium mb-1">পরিমাণ</label>
                <select
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  className="w-full border border-input rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-ring outline-none"
                >
                  <option value="1">১ পিস</option>
                  <option value="2">২ পিস (ডিসকাউন্ট)</option>
                  <option value="3">৩ পিস</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-opacity mt-4"
            >
              এখনই অর্ডার করুন
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
