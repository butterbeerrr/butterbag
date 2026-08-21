function PromoBanner() {
  return (
    <section className="px-6 py-5 bg-[#F5F0E6]">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-[#D8CFC0] px-8 py-12 md:px-16 md:py-16">

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Exclusive Offer
          </p>

          <h2 className="mt-3 max-w-xl font-['Playfair_Display',serif] text-3xl leading-tight md:text-5xl">
            A Little More to Love
          </h2>

          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-700">
            Enjoy complimentary shipping on orders over Rp10.000.000.
          </p>

          <button className="mt-7 bg-black px-6 py-3 text-sm text-white transition hover:bg-neutral-800">
            Shop Collection
          </button>
        </div>

      </div>
    </section>
  );
}

export default PromoBanner;