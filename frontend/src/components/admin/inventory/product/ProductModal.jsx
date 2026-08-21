import { X } from "lucide-react";
import ProductForm from "./ProductForm";

function ProductModal({
  isOpen,
  onClose,
  mode = "add",
  product = {},
  onSuccess,
}) {
  if (!isOpen) return null;

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="relative max-h-[90vh] w-full max-w-[900px] overflow-y-auto rounded-xl bg-[#F5F0E6] shadow-xl">

        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#D8D0C2] bg-[#F5F0E6] px-5 py-4 sm:px-6 md:px-8">
          <div>
            <h2 className="font-['Playfair_Display',serif] text-2xl font-semibold text-black sm:text-3xl">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>

            <p className="mt-1 text-sm text-[#6B665F]">
              {isEdit
                ? "Update product information"
                : "Add a new product to your inventory"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 sm:p-6 md:p-8">
          <ProductForm
            mode={mode}
            product={product}
            onCancel={onClose}
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductModal;