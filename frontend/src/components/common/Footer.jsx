function Footer() {
  return (
    <footer className="bg-[#2C2926] px-6 py-5 text-center text-[#F5F0E6]">
      <h2 className="font-['Playfair_Display',serif] text-3xl">
        ButterBag
      </h2>

      <p className="mt-3 text-sm text-neutral-300">
        Timeless luxury handbags for the modern connoisseur.
      </p>

      <div className="mt-6 flex justify-center gap-6 text-sm">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>

      <p className="mt-8 text-xs text-neutral-400">
        © 2026 ButterBag. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;