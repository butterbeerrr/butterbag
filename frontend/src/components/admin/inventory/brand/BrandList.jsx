import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function BrandList({ brands = [], products = [], search = "", onEdit, onDelete }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  // Filter brand berdasarkan input pencarian
  const filteredBrands = brands.filter((brand) =>
    brand.name?.toLowerCase().includes(search.toLowerCase().trim())
  );

  // Hitung produk yang brand_id atau brand.id nya cocok secara dinamis
  const getProductCount = (brand) => {
    return products.filter((product) => {
      const pBrandId = product.brand_id ?? product.brand?.id;
      return String(pBrandId) === String(brand.id);
    }).length;
  };

  if (filteredBrands.length === 0) {
    return (
      <div className="rounded-xl border border-[#E5E1DA] bg-[#FBF9F5] p-10 text-center text-sm text-[#6B665F]">
        No brands found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E1DA] bg-[#FBF9F5]">
      {filteredBrands.map((brand) => {
        const count = getProductCount(brand);

        return (
          <div
            key={brand.id || brand.name}
            className="flex items-center justify-between border-b border-[#E5E1DA] p-5 last:border-0 hover:bg-[#EFE1C9]/20"
          >
            <div>
              <h3 className="font-semibold text-black">{brand.name}</h3>

              <p className="mt-1 text-xs text-[#6B665F]">
                {count} {count === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Action Menu (Edit & Delete) */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenuId(openMenuId === brand.id ? null : brand.id)
                }
                className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
                aria-label="Brand actions"
              >
                <MoreVertical size={18} />
              </button>

              {openMenuId === brand.id && (
                <ActionDropdown
                  onEdit={() => {
                    setOpenMenuId(null);
                    onEdit?.(brand);
                  }}
                  onDelete={() => {
                    setOpenMenuId(null);
                    onDelete?.(brand);
                  }}
                  onClose={() => setOpenMenuId(null)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActionDropdown({ onEdit, onDelete, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-10 z-20 w-36 rounded-lg border border-[#D8D0C2] bg-white py-1 shadow-lg"
    >
      <button
        type="button"
        onClick={onEdit}
        className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-black hover:bg-[#F5F0E6]"
      >
        <Edit2 size={14} />
        Edit Brand
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
      >
        <Trash2 size={14} />
        Delete Brand
      </button>
    </div>
  );
}

export default BrandList;