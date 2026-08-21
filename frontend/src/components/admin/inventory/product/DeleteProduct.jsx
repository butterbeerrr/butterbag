import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

function DeleteProduct({ isOpen, onClose, product, onConfirm }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to delete product.");
      }

      // Beri tahu parent (Inventory.jsx) ID produk yang berhasil dihapus
      onConfirm(product.id);
    } catch (err) {
      console.error("Delete product error:", err);
      setError(err.message || "Unable to delete product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-[#F5F0E6] p-6 shadow-xl">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle size={24} />
          <h3 className="text-lg font-semibold text-black">Delete Product</h3>
        </div>

        <p className="mt-3 text-sm text-[#6B665F]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-black">{product.name}</span>?
          This action cannot be undone.
        </p>

        {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="border border-[#D8D0C2] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#6B665F] hover:bg-[#EFE1C9] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={submitting}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 size={14} />
            {submitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;