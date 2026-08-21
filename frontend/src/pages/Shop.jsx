import Navbar from "../components/common/Navbar";
import ProductCard from "../components/home/ProductCard";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 bg-[#F5F0E6]">

        {/* Header */}
        <div className="mb-10 border-b border-neutral-300 pb-6">
          <h1 className="font-['Playfair_Display',serif] text-4xl">
            The Handbag Collection
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
            Discover our curated selection of luxury handbags.
          </p>

          <p className="mt-4 text-xs uppercase tracking-widest text-neutral-500">
            {products.length} Items
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          <button className="shrink-0 rounded-full bg-black px-5 py-2 text-xs uppercase tracking-wider text-white">
            All
          </button>

          <button className="shrink-0 rounded-full border border-neutral-300 px-5 py-2 text-xs uppercase tracking-wider">
            Brand
          </button>

          <button className="shrink-0 rounded-full border border-neutral-300 px-5 py-2 text-xs uppercase tracking-wider">
            Price
          </button>

          <button className="shrink-0 rounded-full border border-neutral-300 px-5 py-2 text-xs uppercase tracking-wider">
            Availability
          </button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </main>

      <Footer />
    </>
  );
}

export default Shop;