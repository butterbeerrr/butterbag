import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import ProductCard from "./ProductCard";
import StockStatus from "./StockStatus";

function ProductList({
  products,
  onEdit,
  onDelete,
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-[#E5E1DA] bg-[#FBF9F5] p-10 text-center text-sm text-[#6B665F]">
        No products found.
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-[#E5E1DA] bg-[#FBF9F5] md:block">

        <table className="w-full text-left">

          <thead className="border-b border-[#E5E1DA] bg-[#F5F3EF]">
            <tr>
              <TableHeader>Product Name</TableHeader>
              <TableHeader>Brand</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Stock</TableHeader>
              <TableHeader>Status</TableHeader>

              <th className="w-12 px-5 py-4" />
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>

        </table>

        <div className="border-t border-[#E5E1DA] px-5 py-4 text-xs text-[#6B665F]">
          Showing 1 to {products.length} entries
        </div>

      </div>

      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0, 
  }).format(number || 0);
};

function ProductRow({
  product,
  onEdit,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <tr className="border-b border-[#E5E1DA] last:border-0 hover:bg-[#EFE1C9]/20">

      <td className="px-5 py-5 font-semibold text-black">
        {product.name}
      </td>

      <td className="px-5 py-5 text-sm text-[#6B665F]">
        {product.brand?.name || "-"}
      </td>

      <td className="px-5 py-5 text-sm text-black">
        {formatRupiah(product.price)}
      </td>

      <td className="px-5 py-5 text-sm text-black">
        {product.stock}
      </td>

      <td className="px-5 py-5">
        <StockStatus stock={product.stock} />
      </td>

      <td className="relative px-5 py-5">

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
          aria-label="Product actions"
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div className="absolute right-5 top-14 z-20 w-32 overflow-hidden rounded-lg border border-[#D8D0C2] bg-white shadow-md">

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

      </td>

    </tr>
  );
}

function TableHeader({ children }) {
  return (
    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
      {children}
    </th>
  );
}

export default ProductList;