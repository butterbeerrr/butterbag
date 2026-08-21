import { useState } from "react";
import { Menu } from "lucide-react";

import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F0E6]">

      {/* Mobile Menu */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[#D8D0C2] bg-[#F5F0E6] gap-3 px-4 md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-black hover:text-black"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <h1 className="font-['Playfair_Display',serif] text-3xl font-semibold ">ButterBag</h1>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-[280px] transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <AdminSidebar
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Content */}
      <div className="min-h-screen md:ml-[280px]">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;