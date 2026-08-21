import { ChevronDown } from "lucide-react";

function DashboardHeader() {
  return (
    <header className="border-b border-[#D8D0C2] bg-[#F5F0E6]">
      <div className="flex items-center justify-between px-4 py-4 md:px-10">

        <div>
          <h1 className="font-['Playfair_Display',serif] text-3xl font-semibold">
            User Management
          </h1>

          <p className="mt-1 text-sm text-[#6B665F]">
            Manage customers and cashiers.
          </p>
        </div>

      </div>
    </header>
  );
}

export default DashboardHeader;