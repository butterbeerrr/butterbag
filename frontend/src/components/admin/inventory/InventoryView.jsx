import {
  Package,
  TrendingUp,
  AlertTriangle,
  CircleAlert,
} from "lucide-react";

function InventoryView({ products = [] }) {
  // Hitung metrik secara otomatis dari array products
  const totalProducts = products.length;

  const lowStock = products.filter(
    (item) => Number(item.stock) > 0 && Number(item.stock) <= 5
  ).length;

  const outOfStock = products.filter(
    (item) => Number(item.stock) === 0
  ).length;

  // Best Sellers (bisa berdasarkan properti is_bestseller dari backend, atau kriteria lain)
  const bestSellers = products.filter(
    (item) => item.is_bestseller || Number(item.sales_count ?? 0) > 10
  ).length;

  const summaryCards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Package size={18} />,
    },
    {
      title: "Best Sellers",
      value: bestSellers,
      icon: <TrendingUp size={18} />,
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: <AlertTriangle size={18} />,
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: <CircleAlert size={18} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
      {summaryCards.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-[#E5E1DA] bg-white p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-[#6B665F]">
              {item.title}
            </span>

            <span className="text-[#6B665F]">{item.icon}</span>
          </div>

          <p className="font-['Playfair_Display',serif] text-2xl font-semibold leading-none text-black">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default InventoryView;