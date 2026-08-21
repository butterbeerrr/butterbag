import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

function BestSellers({ products = [] }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const displayProducts = products.slice(0, 3);

  return (
    <div className="rounded-xl border border-[#D8D0C2] bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Best Sellers</h2>

        <Link
          to="/admin/inventory"
          className="text-xs uppercase tracking-wider text-[#6B665F] hover:text-black"
        >
          View All
        </Link>
      </div>

      <div className="mt-6 space-y-5">
        {displayProducts.map((product) => (
          <div key={product.id || product.name} className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#F5F0E6]">
              <ShoppingBag size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="mt-1 text-xs text-[#6B665F]">{product.brand?.name || "ButterBag"}</p>
            </div>

            <p className="text-xs font-semibold">{formatPrice(product.price)}</p>
          </div>
        ))}

        {displayProducts.length === 0 && (
          <div className="py-6 text-center text-sm text-[#6B665F]">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
}

export default BestSellers;