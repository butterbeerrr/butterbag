import { ChevronDown } from "lucide-react";

function DashboardHeader() {
  return (
    <header className="border-b border-[#D8D0C2] bg-[#F5F0E6]">
      <div className="flex items-center justify-between px-4 py-4 md:px-10">

        <div>
          <h1 className="font-['Playfair_Display',serif] text-3xl font-semibold">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-[#6B665F]">
            Overview of your ButterBag store
          </p>
        </div>

        <div className="flex items-center gap-5">

          <button className="flex items-center gap-2 border-b border-[#D8D0C2] px-2 py-2 text-sm text-[#6B665F]">
            Today
            <ChevronDown size={15} />
          </button>

        </div>

      </div>
    </header>
  );
}

export default DashboardHeader;