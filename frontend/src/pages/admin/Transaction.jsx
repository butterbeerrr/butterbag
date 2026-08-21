import { useEffect, useState } from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import TransactionHeader from "../../components/admin/transactions/TransactionHeader";
import TransactionSummary from "../../components/admin/transactions/TransactionSummary";
import TransactionFilters from "../../components/admin/transactions/TransactionFilters";
import TransactionTable from "../../components/admin/transactions/TransactionTable";
import TransactionCard from "../../components/admin/transactions/TransactionCard";
import TransactionDetailModal from "../../components/admin/transactions/TransactionDetailModal";

function Transactions() {
  const [rawTransactions, setRawTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter States
  const [activeStatus, setActiveStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  // Modal State
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Fetch data transaksi dari Laravel
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
      }

      const data = await response.json();
      // Mengambil array dari data.transactions sesuai response controller
      setRawTransactions(data.transactions || []);
    } catch (err) {
      console.error("Fetch transactions error:", err);
      setError("Unable to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter Data Transaksi di Frontend
  const filteredTransactions = rawTransactions.filter((transaction) => {
    // 1. Filter Status (all, paid, pending, cancelled)
    if (activeStatus !== "all" && transaction.payment_status !== activeStatus) {
      return false;
    }

    // 2. Filter Search (Pencarian berdasarkan ID atau Nama Customer)
    if (search.trim()) {
      const kw = search.toLowerCase().trim();
      const matchId = String(transaction.id).includes(kw);
      const matchCustomer = transaction.customer?.name
        ?.toLowerCase()
        .includes(kw);

      if (!matchId && !matchCustomer) return false;
    }

    // 3. Filter Tanggal
    if (dateFilter !== "all" && transaction.created_at) {
      const transDate = new Date(transaction.created_at);
      const now = new Date();

      if (dateFilter === "7days") {
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        if (transDate < sevenDaysAgo) return false;
      } else if (dateFilter === "month") {
        const isSameMonth =
          transDate.getMonth() === now.getMonth() &&
          transDate.getFullYear() === now.getFullYear();
        if (!isSameMonth) return false;
      }
    }

    return true;
  });

  // Handler Buka Modal Detail Transaksi
  const handleViewDetail = (id) => {
    const found = rawTransactions.find((t) => t.id === id);
    setSelectedTransaction(found || null);
  };

  return (
    <AdminLayout>
      <TransactionHeader />

      <main className="px-4 py-6 md:px-10 md:py-8">
        {/* Ringkasan Jumlah Transaksi (Menggunakan data yang difilter) */}
        <TransactionSummary transactions={rawTransactions} />

        <div className="mt-6 rounded-xl border border-[#D8D0C2] bg-white">
          {/* Komponen Filter */}
          <TransactionFilters
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
            search={search}
            setSearch={setSearch}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          {loading ? (
            <div className="py-12 text-center text-sm text-[#6B665F]">
              Loading transactions...
            </div>
          ) : error ? (
            <div className="py-12 text-center text-sm text-red-600">
              {error}
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <TransactionTable
                transactions={filteredTransactions}
                onViewDetail={handleViewDetail}
              />

              {/* Mobile View */}
              <TransactionCard
                transactions={filteredTransactions}
                onViewDetail={handleViewDetail}
              />
            </>
          )}
        </div>
      </main>

      {/* Modal Detail Transaksi */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </AdminLayout>
  );
}

export default Transactions;