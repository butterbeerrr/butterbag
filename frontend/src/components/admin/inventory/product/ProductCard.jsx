import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import StockStatus from "./StockStatus";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number || 0);
};

function ProductCard({ product, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative rounded-xl border border-[#E5E1DA] bg-white p-5">

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-black">{product.name}</h3>

          <p className="mt-1 text-xs text-[#6B665F]">
            {product.brand?.name || "-"}
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
            aria-label="Product actions"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-30 w-32 overflow-hidden rounded-lg border border-[#D8D0C2] bg-white shadow-lg">

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(product);
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-[#2B2B2B] transition hover:bg-[#F5F0E6]"
              >
                <Pencil size={14} />
                Edit
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(product);
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-[#B85C5C] transition hover:bg-[#FDF1F1]"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[#E5E1DA] pt-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
            Price
          </p>
          <p className="mt-1 text-sm font-medium text-black">
            {formatRupiah(product.price)}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
            Stock
          </p>
          <p className="mt-1 text-sm text-black">{product.stock}</p>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
            Status
          </p>
          <div className="mt-1">
            <StockStatus stock={product.stock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;