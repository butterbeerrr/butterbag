import { AlertTriangle, X } from "lucide-react";

function DeleteCashier({
  isOpen,
  onClose,
  cashier,
  onConfirm,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-[#F5F0E6] shadow-xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#D8D0C2] px-5 py-4 sm:px-6">

          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F9E7E7] text-[#B85C5C]">
              <AlertTriangle size={18} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-black">
                Delete Cashier
              </h2>

              <p className="mt-1 text-xs text-[#6B665F]">
                This action cannot be undone.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
            aria-label="Close"
          >
            <X size={18} />
          </button>

        </div>

        {/* Content */}
        <div className="px-5 py-6 sm:px-6">

          <p className="text-sm leading-6 text-[#4F4A44]">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-black">
              {cashier?.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-xs leading-5 text-[#6B665F]">
            The cashier account will be permanently removed.
          </p>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#D8D0C2] px-5 py-4 sm:px-6">

          <button
            type="button"
            onClick={onClose}
            className="border border-[#D8D0C2] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#6B665F] transition hover:bg-[#EFE1C9]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#B85C5C] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#9F4D4D]"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteCashier;