import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function ShopByBrands() {
    const [brands, setBrands] = useState([]);
    const brandList = useRef(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/brands`)
        .then((response) => response.json())
        .then((data) => setBrands(data))
        .catch((error) => console.log(error));
    }, []);

    const scrollBrands = (direction) => {
        if (brandList.current) {
        brandList.current.scrollBy({
            left: direction === "left" ? -250 : 250,
            behavior: "smooth",
        });
        }
    };

    return (
        <section className="bg-[#F5F0E6] px-6 py-5">
        <div className="mx-auto max-w-7xl">
            <h2 className=" font-['Playfair_Display',serif] text-3xl">Shop by Brands</h2>

            <div className="mt-10 flex items-center gap-4">
            <button onClick={() => scrollBrands("left")} className="shrink-0 text-neutral-500 transition hover:text-black"
>
                <ChevronLeft size={20} strokeWidth={1.5} />
            </button>

            <div ref={brandList} className="flex flex-1 gap-10 overflow-x-hidden">
                {brands.map((brand) => (
                <button
                    key={brand.id}
                    className="shrink-0 text-m tracking-wide text-neutral-700 transition hover:text-black"
                >
                    {brand.name}
                </button>
                ))}
            </div>

            <button
                onClick={() => scrollBrands("right")}
                className="shrink-0 text-neutral-500 transition hover:text-black"
            >
                <ChevronRight size={20} strokeWidth={1.5} />
            </button>
            </div>
        </div>
        </section>
    );
}

export default ShopByBrands;
