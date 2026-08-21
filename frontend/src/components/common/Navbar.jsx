import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-neutral-200 bg-[#F5F0E6]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="font-['Playfair_Display',serif] text-2xl font-black tracking-tighter text-neutral-900 md:text-3xl"
        >
          ButterBag
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm hover:text-neutral-500"
          >
            Home
          </Link>

          <Link
            to="/shop"
            className="text-sm hover:text-neutral-500"
          >
            Shop
          </Link>

          <Link
            to="/about"
            className="text-sm hover:text-neutral-500"
          >
            About
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">

          <button type="button" className="hidden md:block">
            <Search size={21} strokeWidth={1.5} />
          </button>

          <Link to="/login" >
            <UserRound size={21} strokeWidth={1.5} />
          </Link>

          <button type="button">
            <ShoppingBag size={21} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-neutral-200 bg-white px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">

            <Link
              to="/"
              className="text-sm hover:text-neutral-500"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="text-sm hover:text-neutral-500"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>

            <Link
              to="/about"
              className="text-sm hover:text-neutral-500"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;