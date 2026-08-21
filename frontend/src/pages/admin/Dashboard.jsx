import { useEffect, useState } from "react";
import { Wallet, Receipt, Package, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import SummaryCard from "../../components/admin/dashboard/SummaryCard";
import SalesOverview from "../../components/admin/dashboard/SalesOverview";
import BestSellers from "../../components/admin/dashboard/BestSellers";
import RecentTransactions from "../../components/admin/dashboard/RecentTransactions";
import QuickAction from "../../components/admin/dashboard/QuickAction";

function Dashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch semua data dari API Laravel
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [resProducts, resUsers, resTransactions] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/products`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/api/users`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/api/transactions`, { headers }),
        ]);

        const dataProducts = resProducts.ok ? await resProducts.json() : [];
        const dataUsers = resUsers.ok ? await resUsers.json() : { users: [] };
        const dataTransactions = resTransactions.ok ? await resTransactions.json() : { transactions: [] };

        setProducts(dataProducts);
        setUsers(dataUsers.users || []);
        setTransactions(dataTransactions.transactions || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Hitung Nilai Dinamis
  const totalSales = transactions
    .filter((t) => t.payment_status === "paid")
    .reduce((sum, t) => sum + Number(t.total_amount || 0), 0);

  const activeCustomers = users.filter((u) => u.role !== "admin").length;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const SUMMARY_DATA = [
    {
      title: "Total Sales",
      value: formatRupiah(totalSales),
      icon: <Wallet size={20} />,
      growth: "+12.5% from last week",
      onClick: () => navigate("/admin/transaction"),
    },
    {
      title: "Transactions",
      value: String(transactions.length),
      icon: <Receipt size={20} />,
      growth: "+8.4% from last week",
      onClick: () => navigate("/admin/transaction"),
    },
    {
      title: "Products",
      value: String(products.length),
      icon: <Package size={20} />,
      description: "Active listings",
      onClick: () => navigate("/admin/inventory"),
    },
    {
      title: "Customers",
      value: String(activeCustomers),
      icon: <Users size={20} />,
      description: "Registered profiles",
      onClick: () => navigate("/admin/users"),
    },
  ];

  return (
    <AdminLayout>
      <DashboardHeader />

      <div className="p-4 md:p-8">
        {loading ? (
          <div className="py-12 text-center text-sm text-[#6B665F]">
            Loading dashboard statistics...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {SUMMARY_DATA.map((item) => (
                <SummaryCard key={item.title} {...item} />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <SalesOverview totalSales={totalSales} totalTransactions={transactions.length} />
              </div>

              <BestSellers products={products} />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <RecentTransactions transactions={transactions.slice(0, 5)} />
              </div>

              <QuickAction />
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default Dashboard;