import { Save } from "lucide-react";
import { useEffect, useState } from "react";

function BrandForm({ mode = "add", brand = {}, onCancel, onSuccess }) {
  const isEdit = mode === "edit";

  const [name, setName] = useState(brand.name || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setName(brand.name || "");
    setError("");
  }, [brand]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/api/brands/${brand.id}`
        : `${import.meta.env.VITE_API_URL}/api/brands`;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save brand.");
      }

      // Ambil objek brand yang dikembalikan dari API
      const savedBrand = result.brand || result.data || result;

      // Kirim hasil ke Inventory.jsx agar state lokal di-update
      onSuccess?.(savedBrand);
    } catch (err) {
      console.error("Save brand error:", err);
      setError(err.message || "Unable to save brand.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="brand_name"
          className="text-xs font-medium uppercase tracking-wider text-[#6B665F]"
        >
          Brand Name
        </label>
        <input
          id="brand_name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter brand name"
          required
          className="mt-2 w-full border-b border-[#D8D0C2] bg-transparent py-2 text-sm outline-none focus:border-black"
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="border border-[#D8D0C2] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#6B665F] hover:bg-[#EFE1C9] disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B2B2B] disabled:opacity-50"
        >
          <Save size={14} />
          {submitting ? "Saving..." : isEdit ? "Update Brand" : "Save Brand"}
        </button>
      </div>
    </form>
  );
}

export default BrandForm;