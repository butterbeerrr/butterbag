import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const productList = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));

    fetch(`${import.meta.env.VITE_API_URL}/api/brands`)
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.log(error));
  }, []);

  const scrollProducts = (direction) => {
    if (productList.current) {
      productList.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#F5F0E6] px-6 py-5">
      <div className="mx-auto max-w-7xl">

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Trending Now
            </p>

            <h2 className="mt-2 font-['Playfair_Display',serif] text-3xl">
              Most Wanted Pieces
            </h2>
          </div>

          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scrollProducts("left")}
              className="rounded-full border border-neutral-300 p-2 transition hover:bg-black hover:text-white"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => scrollProducts("right")}
              className="rounded-full border border-neutral-300 p-2 transition hover:bg-black hover:text-white"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={productList}
          className="mt-8 flex gap-4 overflow-hidden md:gap-6"
        >
          {products.map((product) => {
            const brand = brands.find(
              (brand) => brand.id === product.brand_id
            );

            return (
              <div
                key={product.id}
                className="w-[calc(50%-8px)] shrink-0 md:w-[calc(25%-18px)]"
              >
                <ProductCard
                  product={product}
                  brand={brand?.name}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between md:hidden">
          <span className="text-xs text-neutral-400">
            Swipe to explore
          </span>

          <button
            onClick={() => scrollProducts("right")}
            className="flex items-center gap-2 text-sm"
          >
            Next
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-10 text-center">
          <button className="border-b border-black pb-1 text-sm tracking-wide transition hover:opacity-60">
            View All Products
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProductSection;