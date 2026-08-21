import { ImagePlus, Save } from "lucide-react";
import { useEffect, useState } from "react";

function ProductForm({
  mode = "add",
  product = {},
  onCancel,
  onSuccess,
}) {
  const isEdit = mode === "edit";

  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(product.name || "");
  const [brandId, setBrandId] = useState(product.brand_id || "");
  const [price, setPrice] = useState(product.price || "");
  const [stock, setStock] = useState(product.stock ?? "");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoadingBrands(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/brands`,
          {
            headers: { Accept: "application/json" },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load brands.");
        }

        setBrands(data);
      } catch (err) {
        console.error("Fetch brands error:", err);
        setError("Unable to load brands.");
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    setName(product.name || "");
    setBrandId(product.brand_id || "");
    setPrice(product.price || "");
    setStock(product.stock ?? "");
    setImage(null);
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      data.append("name", name);
      data.append("brand_id", brandId);
      data.append("price", price);
      data.append("stock", stock);

      if (image) {
        data.append("image", image);
      }

      if (isEdit) {
        data.append("_method", "PUT");
      }

      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/api/products/${product.id}`
        : `${import.meta.env.VITE_API_URL}/api/products`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save product.");
      }

      const rawProduct = result.product || result.data || result;

      const savedProduct = {
        ...rawProduct,
        brand:
          brands.find(
            (b) => String(b.id) === String(rawProduct.brand_id)
          ) || null,
      };
 
      onSuccess?.(savedProduct);
    } catch (err) {
      console.error("Save product error:", err);
      setError(err.message || "Unable to save product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
      <section className="rounded-xl border border-[#D8D0C2] bg-white p-5 sm:p-6 md:p-8">
        <h2 className="text-base font-semibold text-black md:text-lg">
          Basic Information
        </h2>

        <div className="mt-5 grid gap-5 md:mt-6 md:grid-cols-2 md:gap-6">
          <Input
            label="Product Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />

          <div>
            <label
              htmlFor="brand_id"
              className="text-xs font-medium uppercase tracking-wider text-[#6B665F] md:text-sm"
            >
              Brand
            </label>

            <select
              id="brand_id"
              name="brand_id"
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              required
              disabled={loadingBrands}
              className="mt-2 w-full border-b border-[#D8D0C2] bg-transparent px-0 py-2 text-sm outline-none focus:border-black md:text-base"
            >
              <option value="">
                {loadingBrands ? "Loading brands..." : "Select brand"}
              </option>

              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Price"
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            required
          />

          <Input
            label="Stock"
            name="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            min="0"
            required
          />
        </div>
      </section>

      <section className="rounded-xl border border-[#D8D0C2] bg-white p-5 sm:p-6 md:p-8">
        <h2 className="text-base font-semibold text-black md:text-lg">
          Product Image
        </h2>

        <div className="mt-5 md:mt-6">
          <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center border border-dashed border-[#D8D0C2] bg-[#FBF9F5] transition hover:border-black md:min-h-[220px]">
            <ImagePlus size={28} className="text-[#6B665F] md:size-8" />

            <p className="mt-3 text-sm font-medium md:text-base">
              {image ? image.name : "Add Product Image"}
            </p>

            <p className="mt-1 text-xs text-[#6B665F] md:text-sm">
              PNG, JPG or WEBP
            </p>

            <input
              type="file"
              name="image"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-3 pb-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="border border-[#D8D0C2] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B665F] hover:bg-[#EFE1C9] disabled:opacity-50 md:px-6 md:text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting || loadingBrands}
          className="flex items-center gap-2 bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B2B2B] disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:text-sm"
        >
          <Save size={15} />
          {submitting
            ? isEdit
              ? "Updating..."
              : "Saving..."
            : isEdit
            ? "Update Product"
            : "Save Product"}
        </button>
      </div>
    </form>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-wider text-[#6B665F] md:text-sm"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="mt-2 w-full border-b border-[#D8D0C2] bg-transparent px-0 py-2 text-sm outline-none placeholder:text-[#8B857D] focus:border-black md:text-base"
      />
    </div>
  );
}

export default ProductForm;