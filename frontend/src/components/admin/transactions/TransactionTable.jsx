function TransactionTable({ transactions, onViewDetail }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full text-left">
        <thead className="border-b border-[#D8D0C2] bg-[#F5F3EF]">
          <tr>
            <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#6B665F]">
              Transaction ID
            </th>

            <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#6B665F]">
              Customer
            </th>

            <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#6B665F]">
              Type
            </th>

            <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#6B665F]">
              Items
            </th>

            <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#6B665F]">
              Total
            </th>

            <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#6B665F]">
              Status
            </th>

            <th className="px-6 py-4 text-xs uppercase tracking-wider text-[#6B665F]">
              Date
            </th>

            <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-[#6B665F]">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => {
            const customerName = transaction.customer?.name || "Guest";

            const itemCount =
              transaction.details?.reduce(
                (total, detail) => total + detail.quantity,
                0
              ) || 0;

            return (
              <tr
                key={transaction.id}
                className="border-b border-[#D8D0C2] transition-colors hover:bg-[#F5F0E6]/50"
              >
                <td className="px-6 py-4 text-sm font-medium">
                  #{transaction.id}
                </td>

                <td className="px-6 py-4 text-sm">
                  {customerName}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-[#EFE1C9] px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#675D4B]">
                    {transaction.transaction_type}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-[#6B665F]">
                  {itemCount} items
                </td>

                <td className="px-6 py-4 text-sm">
                  {formatPrice(transaction.total_amount)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider ${
                      transaction.payment_status === "paid"
                        ? "bg-green-100 text-green-800"
                        : transaction.payment_status === "pending"
                        ? "bg-[#EFE1C9] text-[#675D4B]"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.payment_status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-[#6B665F]">
                  {formatDate(transaction.created_at)}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onViewDetail(transaction.id)}
                    className="text-xl text-[#6B665F] transition-colors hover:text-black"
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <div className="py-12 text-center text-sm text-[#6B665F]">
          No transactions found.
        </div>
      )}
    </div>
  );
}

export default TransactionTable;