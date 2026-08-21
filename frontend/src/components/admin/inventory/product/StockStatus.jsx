function StockStatus({ stock }) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[#E4E2DE] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6B665F]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#747878]" />
        Out of Stock
      </span>
    );
  }

  if (stock <= 3) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-[#EFE1C9] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#675D4B]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#B38B4D]" />
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#EFE1C9] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#675D4B]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#4A6B53]" />
      In Stock
    </span>
  );
}

export default StockStatus;