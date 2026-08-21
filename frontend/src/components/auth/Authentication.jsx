import heroImage from "../../assets/hero-butterbag.png";

function AuthLayout({ children, title, description }) {
  return (
    <main className="min-h-screen bg-[#F5F0E6]">

      <div className="grid min-h-screen md:grid-cols-2">

        {/* Image */}
        <div className="relative hidden overflow-hidden md:block">
          <img
            src={heroImage}
            alt="ButterBag luxury handbag"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-10 pb-10 pt-32 text-white">
            <h2 className="font-['Playfair_Display',serif] text-5xl">
              Quiet Luxury.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
              Curated luxury handbags from the world's most renowned
              fashion houses.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center px-6 py-12 md:px-12">

          <div className="w-full max-w-md">

            <div className="text-center">
              <h1 className="font-['Playfair_Display',serif] text-4xl font-bold">
                ButterBag
              </h1>

              <h2 className="mt-8 font-['Playfair_Display',serif] text-3xl">
                {title}
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                {description}
              </p>
            </div>

            {children}

          </div>

        </div>

      </div>

    </main>
  );
}

export default AuthLayout;