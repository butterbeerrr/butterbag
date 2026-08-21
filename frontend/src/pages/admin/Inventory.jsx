import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";
import InventoryHeader from "../../components/admin/inventory/InventoryHeader";
import InventoryView from "../../components/admin/inventory/InventoryView";

import ProductList from "../../components/admin/inventory/product/ProductList";
import ProductModal from "../../components/admin/inventory/product/ProductModal";
import DeleteProduct from "../../components/admin/inventory/product/DeleteProduct";

import BrandList from "../../components/admin/inventory/brand/BrandList";
import BrandModal from "../../components/admin/inventory/brand/BrandModal";
import DeleteBrand from "../../components/admin/inventory/brand/DeleteBrand";

function Inventory() {
  const [activeTab, setActiveTab] = useState("products");
  const [search, setSearch] = useState("");

  // States Data
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [productError, setProductError] = useState("");
  const [brandError, setBrandError] = useState("");

  // Modals Product State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Modals Brand State
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [brandModalMode, setBrandModalMode] = useState("add");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [deleteBrandOpen, setDeleteBrandOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  // --- HELPER UNTUK UPDATES STATE INSTAN ---
  const updateItemState = (setState, savedItem) => {
    setState((prevItems) => {
      const exists = prevItems.some((item) => String(item.id) === String(savedItem.id));
      if (exists) {
        return prevItems.map((item) => (String(item.id) === String(savedItem.id) ? savedItem : item));
      }
      return [savedItem, ...prevItems];
    });
  };

  const removeItemState = (setState, deletedId) => {
    setState((prevItems) => prevItems.filter((item) => String(item.id) !== String(deletedId)));
  };

  // --- FETCHING DATA ---
  const fetchData = async (endpoint, setData, setLoading, setError, signal) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${endpoint}?t=${Date.now()}`, {
        headers: { Accept: "application/json", "Cache-Control": "no-cache" },
        signal,
      });

      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}.`);
      const data = await response.json();
      setData(data);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error(err);
      setError(`Unable to load ${endpoint}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData("products", setProducts, setLoadingProducts, setProductError, controller.signal);
    fetchData("brands", setBrands, setLoadingBrands, setBrandError, controller.signal);

    return () => controller.abort();
  }, []);

  // --- FILTERED DATA ---
  const filteredProducts = products.filter((p) => {
    const kw = search.toLowerCase().trim();
    return p.name?.toLowerCase().includes(kw) || p.brand?.name?.toLowerCase().includes(kw);
  });

  const filteredBrands = brands.filter((b) => b.name?.toLowerCase().includes(search.toLowerCase().trim()));

  // --- HANDLERS PRODUCT ---
  const handleProductSuccess = (savedProduct) => {
    // Cari objek brand terbaru untuk dipasangkan ke objek produk
    const matchedBrand = brands.find(
      (b) => String(b.id) === String(savedProduct.brand_id)
    );

    const updatedProduct = {
      ...savedProduct,
      brand: savedProduct.brand || matchedBrand || null,
    };

    setProducts((prevProducts) => {
      const exists = prevProducts.some(
        (p) => String(p.id) === String(savedProduct.id)
      );

      if (exists) {
        return prevProducts.map((p) =>
          String(p.id) === String(savedProduct.id) ? updatedProduct : p
        );
      }

      return [updatedProduct, ...prevProducts];
    });

    setProductModalOpen(false);
  };

  const handleConfirmDeleteProduct = (deletedId) => {
    removeItemState(setProducts, deletedId);
    setDeleteModalOpen(false);
  };

  // --- HANDLERS BRAND ---
  const handleBrandSuccess = (savedBrand) => {
    // 1. Update list brand (tambah/edit)
    updateItemState(setBrands, savedBrand);

    // 2. Otomatis update nama brand di list products
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        String(product.brand_id) === String(savedBrand.id)
          ? {
              ...product,
              brand: {
                ...product.brand,
                id: savedBrand.id,
                name: savedBrand.name,
              },
            }
          : product
      )
    );

    // 3. Tutup modal
    setBrandModalOpen(false);
  };

  const handleConfirmDeleteBrand = (deletedId) => {
    removeItemState(setBrands, deletedId);
    setDeleteBrandOpen(false);
  };

  return (
    <AdminLayout>
      <InventoryHeader />

      <div className="p-4 sm:p-6 md:p-8">
        <div className="mb-6"><InventoryView  products={products}/></div>

        {/* Tab & Search Navbar */}
        <div className="mb-6 flex flex-col gap-4 border-b border-[#D8D0C2] md:flex-row md:items-end md:justify-between">
          <div className="flex gap-6">
            <Tab active={activeTab === "brands"} onClick={() => { setActiveTab("brands"); setSearch(""); }}>
              Brands
            </Tab>
            <Tab active={activeTab === "products"} onClick={() => { setActiveTab("products"); setSearch(""); }}>
              Products
            </Tab>
          </div>

          <div className="flex w-full gap-3 md:mb-2 md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={17} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#6B665F]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={activeTab === "products" ? "Search products..." : "Search brands..."}
                className="w-full border-b border-[#D8D0C2] bg-transparent py-2 pl-7 text-sm outline-none placeholder:text-[#8B857D] focus:border-black"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (activeTab === "products") {
                  setSelectedProduct(null); setProductModalMode("add"); setProductModalOpen(true);
                } else {
                  setSelectedBrand(null); setBrandModalMode("add"); setBrandModalOpen(true);
                }
              }}
              className="flex h-10 shrink-0 items-center gap-2 bg-black px-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#2B2B2B]"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">{activeTab === "products" ? "Add Product" : "Add Brand"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab View */}
        {activeTab === "products" ? (
          loadingProducts ? (
            <div className="py-12 text-center text-sm text-[#6B665F]">Loading products...</div>
          ) : productError ? (
            <div className="py-12 text-center text-sm text-red-600">{productError}</div>
          ) : (
            <ProductList
              products={filteredProducts}
              onEdit={(p) => { setSelectedProduct(p); setProductModalMode("edit"); setProductModalOpen(true); }}
              onDelete={(p) => { setProductToDelete(p); setDeleteModalOpen(true); }}
            />
          )
        ) : loadingBrands ? (
          <div className="py-12 text-center text-sm text-[#6B665F]">Loading brands...</div>
        ) : brandError ? (
          <div className="py-12 text-center text-sm text-red-600">{brandError}</div>
        ) : (
          <BrandList
            brands={filteredBrands}
            products={products}
            onEdit={(b) => { setSelectedBrand(b); setBrandModalMode("edit"); setBrandModalOpen(true); }}
            onDelete={(b) => { setBrandToDelete(b); setDeleteBrandOpen(true); }}
          />
        )}
      </div>

      {/* Product Modals */}
      <ProductModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        mode={productModalMode}
        product={selectedProduct || {}}
        onSuccess={handleProductSuccess}
      />
      <DeleteProduct
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        product={productToDelete}
        onConfirm={handleConfirmDeleteProduct}
      />

      {/* Brand Modals */}
      <BrandModal
        isOpen={brandModalOpen}
        onClose={() => setBrandModalOpen(false)}
        mode={brandModalMode}
        brand={selectedBrand || {}}
        onSuccess={handleBrandSuccess}
      />
      <DeleteBrand
        isOpen={deleteBrandOpen}
        onClose={() => setDeleteBrandOpen(false)}
        brand={brandToDelete}
        onConfirm={handleConfirmDeleteBrand}
      />
    </AdminLayout>
  );
}

function Tab({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-2 pb-3 text-xs font-semibold uppercase tracking-widest transition ${
        active ? "border-black text-black" : "border-transparent text-[#6B665F] hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

export default Inventory;