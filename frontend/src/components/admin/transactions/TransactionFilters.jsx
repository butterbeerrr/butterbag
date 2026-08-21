import { Search, ChevronDown } from "lucide-react";

function TransactionFilters({
  activeStatus,
  setActiveStatus,
  search,
  setSearch,
  dateFilter,
  setDateFilter,
}) {
  const tabs = [
    { label: "All", value: "all" },
    { label: "Paid", value: "paid" },
    { label: "Pending", value: "pending" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className="flex flex-col gap-4 border-b border-[#D8D0C2] p-4 md:flex-row md:items-center md:justify-between md:p-6">

      {/* Tabs */}
      <div className="flex gap-5 overflow-x-auto md:gap-7">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveStatus(tab.value)}
            className={`whitespace-nowrap pb-2 text-[10px] uppercase tracking-wider md:text-xs ${
              activeStatus === tab.value
                ? "border-b-2 border-black text-black"
                : "text-[#6B665F]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Date */}
      <div className="flex w-full gap-3 md:w-auto">
        
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B665F]"
          />

          <input
            type="text"
            placeholder="Search transaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-b border-[#D8D0C2] bg-transparent py-2 pl-10 pr-3 text-xs outline-none placeholder:text-[#6B665F] md:text-sm"
          />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full appearance-none border border-[#D8D0C2] bg-[#F5F0E6] px-4 py-2 pr-9 text-[10px] uppercase tracking-wider outline-none md:w-40 md:text-xs"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="month">This Month</option>
          </select>

          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B665F]"
          />
        </div>

      </div>
    </div>
  );
}

export default TransactionFilters;