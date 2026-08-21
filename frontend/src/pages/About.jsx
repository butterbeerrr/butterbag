import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function About() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F5F0E6]">
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs  tracking-[0.25em] text-neutral-500">
              ABOUT BUTTERBAG
            </p>

            <h1 className="mt-5 font-['Playfair_Display',serif] text-5xl leading-tight md:text-7xl">
              Luxury handbagsall in one place.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
              ButterBag is a curated online store offering luxury handbags from
              some of the world's most renowned fashion houses.
            </p>
          </div>
        </section>
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
            <div className="flex aspect-[4/5] items-center justify-center bg-[#E8E1D5]">
              <span className="font-['Playfair_Display',serif] text-3xl text-neutral-500">
                ButterBag
              </span>
            </div>

            <div className="md:pl-8">
              <p className="text-xs  tracking-[0.25em] text-neutral-500">
                our concept
              </p>

              <h2 className="mt-4 font-['Playfair_Display',serif] text-4xl leading-tight md:text-5xl">
                Discover iconic bags from iconic brands.
              </h2>

              <p className="mt-6 text-sm leading-7 text-neutral-600">
                ButterBag brings together a curated selection of luxury handbags
                from renowned fashion houses around the world.
              </p>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                Instead of browsing through different stores and brands,
                acustomers can discover a variety of luxury handbags in one
                place.
              </p>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                From timeless classics to contemporary pieces, our collection is
                designed to make discovering your next handbag simple and
                enjoyable.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="text-center">
            <p className="text-xs tracking-[0.25em] text-neutral-500">
              Why ButterBag
            </p>

            <h2 className="mt-4 font-['Playfair_Display',serif] text-4xl md:text-5xl">
              One destination, many brands.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="border-t border-neutral-300 pt-6">
              <span className="text-xs text-neutral-400">01</span>

              <h3 className="mt-4 font-['Playfair_Display',serif] text-2xl">
                Curated Selection
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Explore a carefully selected range of luxury handbags from
                renowned fashion brands.
              </p>
            </div>

            <div className="border-t border-neutral-300 pt-6">
              <span className="text-xs text-neutral-400">02</span>

              <h3 className="mt-4 font-['Playfair_Display',serif] text-2xl">
                Multiple Brands
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Discover handbags from different luxury houses without having to
                browse multiple stores.
              </p>
            </div>

            <div className="border-t border-neutral-300 pt-6">
              <span className="text-xs text-neutral-400">03</span>

              <h3 className="mt-4 font-['Playfair_Display',serif] text-2xl">
                Easy to Discover
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Find your favorite brands, explore new styles, and discover your
                next luxury handbag in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="text-center">
              <p className="text-xs tracking-[0.25em] text-neutral-500">
                Our Brands
              </p>

              <h2 className="mt-4 font-['Playfair_Display',serif] text-4xl md:text-5xl">
                Explore the brands you love.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-600">
                Discover luxury handbags from some of the world's most
                recognized fashion houses.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3">
              <div className="flex h-28 items-center justify-center font-['Playfair_Display',serif] text-xl md:h-32">
                Chanel
              </div>

              <div className="flex h-28 items-center justify-center font-['Playfair_Display',serif] text-xl md:h-32">
                Dior
              </div>

              <div className="flex h-28 items-center justify-center font-['Playfair_Display',serif] text-xl md:h-32">
                Louis Vuitton
              </div>

              <div className="flex h-28 items-center justify-center font-['Playfair_Display',serif] text-xl md:h-32">
                Hermès
              </div>

              <div className="flex h-28 items-center justify-center font-['Playfair_Display',serif] text-xl md:h-32">
                Gucci
              </div>

              <div className="flex h-28 items-center justify-center font-['Playfair_Display',serif] text-xl md:h-32">
                Prada
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 text-center md:py-24">
          <p className="text-xs tracking-[0.25em] text-neutral-500">
            FIND YOUR NEXT BAG
          </p>

          <h2 className="mt-4 font-['Playfair_Display',serif] text-4xl md:text-6xl">
            Discover your next
            <br />
            timeless piece.
          </h2>

          <Link
            to="/shop"
            className="mt-8 inline-block bg-black px-7 py-3 text-sm text-white transition hover:bg-neutral-800"
          >
            Explore Collection
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;
