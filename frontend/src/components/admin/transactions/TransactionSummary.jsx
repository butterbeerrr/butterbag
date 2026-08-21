function TransactionSummary({ transactions = [] }) {
  const total = transactions.length;

  const paid = transactions.filter(
    (transaction) => transaction.payment_status === "paid"
  ).length;

  const pending = transactions.filter(
    (transaction) => transaction.payment_status === "pending"
  ).length;

  const cancelled = transactions.filter(
    (transaction) => transaction.payment_status === "cancelled"
  ).length;

  const summary = [
    {
      title: "Total Transactions",
      value: total,
    },
    {
      title: "Paid",
      value: paid,
    },
    {
      title: "Pending",
      value: pending,
    },
    {
      title: "Cancelled",
      value: cancelled,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {summary.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-[#D8D0C2] bg-white p-4 md:p-6"
        >
          <p className="text-[10px] uppercase tracking-wider text-[#6B665F] md:text-xs">
            {item.title}
          </p>

          <p className="mt-3 font-['Playfair_Display',serif] text-xl font-semibold text-black md:text-2xl">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}

export default TransactionSummary;