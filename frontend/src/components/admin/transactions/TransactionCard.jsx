function TransactionCard({ transactions, onViewDetail }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="md:hidden">
      {transactions.map((transaction) => {
        const customerName = transaction.customer?.name || "Guest";

        const itemCount =
          transaction.details?.reduce(
            (total, detail) => total + detail.quantity,
            0
          ) || 0;

        return (
          <div
            key={transaction.id}
            className="border-b border-[#D8D0C2] p-4"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">
                  #{transaction.id}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[9px] uppercase tracking-wider ${
                    transaction.payment_status === "paid"
                      ? "bg-green-100 text-green-800"
                      : transaction.payment_status === "pending"
                      ? "bg-[#EFE1C9] text-[#675D4B]"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.payment_status}
                </span>
              </div>

              <button
                onClick={() => onViewDetail(transaction.id)}
                className="text-xl text-[#6B665F]"
              >
                ⋮
              </button>
            </div>

            {/* Customer */}
            <div className="mt-4">
              <p className="text-sm font-medium">
                {customerName}
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#6B665F]">
                  {transaction.transaction_type}
                </span>

                <span className="text-[#D8D0C2]">
                  •
                </span>

                <span className="text-xs text-[#6B665F]">
                  {itemCount} items
                </span>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-5 flex items-end justify-between">
              <p className="text-[10px] text-[#6B665F]">
                {new Date(transaction.created_at).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>

              <p className="text-sm font-semibold">
                {formatPrice(transaction.total_amount)}
              </p>
            </div>
          </div>
        );
      })}

      {transactions.length === 0 && (
        <div className="py-12 text-center text-xs text-[#6B665F]">
          No transactions found.
        </div>
      )}
    </div>
  );
}

export default TransactionCard;