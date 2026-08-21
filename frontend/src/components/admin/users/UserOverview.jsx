import {
  Users,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";

function UserOverview({ users }) {

  const totalUsers = (users.filter((user) => user.role !=="admin")).length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  const totalCashiers = users.filter(
    (user) => user.role === "cashier"
  ).length;

  const totalCustomers = users.filter(
    (user) => user.role === "customer"
  ).length;

  const overview = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <Users size={18} />,
    },
    {
      title: "Cashiers",
      value: totalCashiers,
      icon: <ShoppingBag size={18} />,
    },
    {
      title: "Customers",
      value: totalCustomers,
      icon: <UserRound size={18} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
      {overview.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-[#E5E1DA] bg-white p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-[#6B665F]">
              {item.title}
            </span>

            <span className="text-[#6B665F]">
              {item.icon}
            </span>
          </div>

          <p className="font-['Playfair_Display',serif] text-2xl font-semibold leading-none text-black">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UserOverview;