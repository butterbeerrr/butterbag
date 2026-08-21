function TransactionDetailModal({ transaction, onClose }) {
  if (!transaction) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const customerName = transaction.customer?.name || "Guest";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-[#FBF9F5]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D8D0C2] p-4 md:p-6">
          <h2 className="font-['Playfair_Display',serif] text-xl font-semibold md:text-2xl">
            Transaction Detail
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-[#6B665F] hover:text-black"
          >
            ×
          </button>
        </div>

        <div className="space-y-6 p-4 md:p-6">

          {/* Transaction Information */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#6B665F]">
                Transaction ID
              </p>

              <p className="mt-1 text-xs md:text-sm">
                #{transaction.id}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#6B665F]">
                Type
              </p>

              <p className="mt-1 text-xs capitalize md:text-sm">
                {transaction.transaction_type}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#6B665F]">
                Status
              </p>

              <p className="mt-1 text-xs capitalize md:text-sm">
                {transaction.payment_status}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#6B665F]">
                Date
              </p>

              <p className="mt-1 text-xs md:text-sm">
                {new Date(transaction.created_at).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

          </div>

          {/* Customer */}
          <div>
            <h3 className="mb-3 text-sm font-semibold md:text-base">
              Customer Details
            </h3>

            <div className="rounded-lg border border-[#D8D0C2] bg-white p-4">

              <p className="text-sm font-medium">
                {customerName}
              </p>

              {transaction.customer ? (
                <div className="mt-2 space-y-1">

                  <p className="text-xs text-[#6B665F]">
                    {transaction.customer.email}
                  </p>

                  {transaction.customer.phone && (
                    <p className="text-xs text-[#6B665F]">
                      {transaction.customer.phone}
                    </p>
                  )}

                </div>
              ) : (
                <p className="mt-1 text-xs text-[#6B665F]">
                  Guest customer
                </p>
              )}

            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="mb-3 text-sm font-semibold md:text-base">
              Order Items
            </h3>

            <div className="overflow-hidden rounded-lg border border-[#D8D0C2]">

              {/* Table Header */}
              <div className="grid grid-cols-4 gap-2 border-b border-[#D8D0C2] bg-[#F5F3EF] p-3">
                <p className="col-span-2 text-[10px] uppercase tracking-wider text-[#6B665F]">
                  Product
                </p>

                <p className="text-center text-[10px] uppercase tracking-wider text-[#6B665F]">
                  Qty
                </p>

                <p className="text-right text-[10px] uppercase tracking-wider text-[#6B665F]">
                  Price
                </p>
              </div>

              {/* Items */}
              {transaction.details?.map((detail) => (
                <div
                  key={detail.id}
                  className="grid grid-cols-4 gap-2 border-b border-[#D8D0C2] p-3 last:border-b-0 md:p-4"
                >
                  <div className="col-span-2">
                    <p className="text-xs md:text-sm">
                      {detail.product?.name || "Product"}
                    </p>
                  </div>

                  <p className="text-center text-xs">
                    {detail.quantity}
                  </p>

                  <p className="text-right text-xs">
                    {formatPrice(detail.price)}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end">
            <div className="w-full space-y-2 md:w-1/2">

              <div className="flex justify-between text-xs text-[#6B665F] md:text-sm">
                <span>Total</span>

                <span className="font-semibold text-black">
                  {formatPrice(transaction.total_amount)}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#D8D0C2] p-4 md:p-6">

          <button
            onClick={onClose}
            className="rounded bg-black px-5 py-2 text-[10px] uppercase tracking-wider text-white md:text-xs"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default TransactionDetailModal;