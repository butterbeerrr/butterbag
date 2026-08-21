import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  LogOut,
  ShoppingBag,
  ChevronDown,
  X,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";

const DROPDOWN_MENUS = [
  {
    title: "Sales",
    icon: <CreditCard size={18} />,
    items: [
      { name: "Transaction", path: "/admin/transaction" },
    ],
  },
];

const BOTTOM_MENU = [
  { icon: <LogOut size={18} />, text: "Logout", closesMenu: true },
];

function AdminSidebar({ onClose }) {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const activeDropdown = DROPDOWN_MENUS.find((menu) =>
      menu.items.some((item) => item.path === location.pathname)
    );

    if (activeDropdown) {
      setOpenMenu(activeDropdown.title);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      onClose?.();
      navigate("/login");
    }
  };

  return (
    <aside className="flex h-screen w-[280px] flex-col border-r border-[#D8D0C2] bg-[#F5F0E6]">
      <div className="flex items-center justify-between px-6 py-7">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EFE1C9]">
            <ShoppingBag size={21} />
          </div>

          <div>
            <h1 className="font-['Playfair_Display',serif] text-2xl font-bold">
              ButterBag
            </h1>
            <p className="text-xs font-semibold text-[#6B665F]">Admin</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-[#6B665F] transition hover:text-black md:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2">
        <NavItem
          to="/admin/dashboard"
          icon={<LayoutDashboard size={18} />}
          text="Dashboard"
          onClick={onClose}
        />

        <NavItem
          to="/admin/inventory"
          icon={<Package size={18} />}
          text="Inventory"
          onClick={onClose}
        />

        {DROPDOWN_MENUS.map((menu) => (
          <DropdownMenu
            key={menu.title}
            title={menu.title}
            icon={menu.icon}
            items={menu.items}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            onClose={onClose}
            currentPath={location.pathname}
          />
        ))}

        <NavItem
          to="/admin/users"
          icon={<UsersRound size={18} />}
          text="User Management"
          onClick={onClose}
        />
      </nav>

      <div className="space-y-1 border-t border-[#D8D0C2] px-4 py-4">
        {BOTTOM_MENU.map(({ icon, text }) => (
          <button
            key={text}
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
          >
            {icon}
            <span>{text}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function NavItem({ to, icon, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 border-l-2 px-4 py-3 transition ${
          isActive
            ? "border-black bg-[#EFE1C9] text-black"
            : "border-transparent text-[#6B665F] hover:bg-[#EFE1C9] hover:text-black"
        }`
      }
    >
      {icon}
      <span className="text-xs font-semibold uppercase">{text}</span>
    </NavLink>
  );
}

function DropdownMenu({ title, icon, items, openMenu, setOpenMenu, onClose, currentPath }) {
  const isOpen = openMenu === title;
  const isChildActive = items.some((item) => item.path === currentPath);

  return (
    <div>
      <button
        onClick={() => setOpenMenu(isOpen ? null : title)}
        className={`flex w-full items-center justify-between border-l-2 px-4 py-3 transition ${
          isChildActive || isOpen
            ? "border-black bg-[#EFE1C9] text-black"
            : "border-transparent text-[#6B665F] hover:bg-[#EFE1C9] hover:text-black"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-xs font-semibold uppercase">{title}</span>
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="pb-2 pt-1">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `block py-2 pl-12 text-xs font-semibold uppercase transition ${
                  isActive
                    ? "text-black font-bold"
                    : "text-[#6B665F] hover:text-black"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminSidebar;