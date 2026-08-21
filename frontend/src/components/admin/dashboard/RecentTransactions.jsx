import { useNavigate } from "react-router-dom";

function RecentTransactions({ transactions = [] }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <div className="rounded-xl border border-[#D8D0C2] bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <button
          onClick={() => navigate("/admin/transaction")}
          className="text-xs font-semibold uppercase tracking-wider text-[#6B665F] hover:text-black"
        >
          View All
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-[#E5E1DA]">
              <th className="pb-3 text-xs font-medium uppercase text-[#6B665F]">Transaction ID</th>
              <th className="pb-3 text-xs font-medium uppercase text-[#6B665F]">Customer</th>
              <th className="pb-3 text-xs font-medium uppercase text-[#6B665F]">Amount</th>
              <th className="pb-3 text-xs font-medium uppercase text-[#6B665F]">Status</th>
              <th className="pb-3 text-right text-xs font-medium uppercase text-[#6B665F]">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-[#E5E1DA] last:border-0">
                <td className="py-4 text-sm font-medium">#{transaction.id}</td>
                <td className="py-4 text-sm">{transaction.customer?.name || "Guest"}</td>
                <td className="py-4 text-sm">{formatPrice(transaction.total_amount)}</td>
                <td className="py-4">
                  <span
                    className={`rounded px-2.5 py-1 text-[10px] uppercase tracking-wider ${
                      transaction.payment_status === "paid"
                        ? "bg-[#E8F0E5] text-[#53684B]"
                        : "bg-[#F5EBD5] text-[#927B4C]"
                    }`}
                  >
                    {transaction.payment_status}
                  </span>
                </td>
                <td className="py-4 text-right text-sm text-[#6B665F]">
                  {new Date(transaction.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <div className="py-8 text-center text-sm text-[#6B665F]">
            No recent transactions found.
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentTransactions;