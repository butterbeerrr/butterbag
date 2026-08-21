import { X } from "lucide-react";
import BrandForm from "./BrandForm";

function BrandModal({
  isOpen,
  onClose,
  mode = "add",
  brand = {},
  onSuccess,
}) {
  if (!isOpen) return null;

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="relative max-h-[90vh] w-full max-w-[500px] overflow-y-auto rounded-xl bg-[#F5F0E6] p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#D8D0C2] pb-4">
          <div>
            <h2 className="font-['Playfair_Display',serif] text-xl font-semibold text-black">
              {isEdit ? "Edit Brand" : "Add Brand"}
            </h2>
            <p className="mt-1 text-xs text-[#6B665F]">
              {isEdit ? "Update brand name" : "Add a new brand to inventory"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
          >
            <X size={18} />
          </button>
        </div>

        <div className="pt-4">
          <BrandForm
            mode={mode}
            brand={brand}
            onCancel={onClose}
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default BrandModal;