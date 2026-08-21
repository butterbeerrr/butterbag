import heroImage from "../../assets/hero-butterbag.png";

function Hero() {
  return (
    <section className="bg-[#F5F0E6]">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-8 md:flex-row md:gap-10">
        <div className="h-[600px] w-full overflow-hidden md:h-[550px] md:w-1/2">
         
          <img src={heroImage} alt="ButterBag collection" className="h-full w-full object-cover"/>
          
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-white md:static md:block md:w-1/2 md:px-0 md:text-left md:text-black">
          <div>
            <h1 className="font-['Playfair_Display',serif] text-4xl leading-tight md:text-6xl">
              Timeless Pieces, Made to Be Remembered.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/90 md:mx-0 md:text-neutral-600">
              Discover our curated collection of luxury handbags designed for
              the modern connoisseur.
            </p>

            <button className="mt-7 bg-white px-6 py-3 text-sm text-black md:bg-black md:text-white">
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
