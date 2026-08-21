import { Search, ChevronDown } from "lucide-react";

function UserFilters({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:max-w-sm">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B665F]"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full border border-[#D8D0C2] bg-white py-2.5 pl-10 pr-4 text-sm text-black outline-none placeholder:text-[#8B857D] focus:border-black"
        />
      </div>

      <div className="relative w-full md:w-44">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full appearance-none border border-[#D8D0C2] bg-white px-4 py-2.5 pr-10 text-sm text-black outline-none focus:border-black"
        >
          <option value="all">All Roles</option>
          <option value="cashier">Cashier</option>
          <option value="customer">Customer</option>
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B665F]"
        />
      </div>

    </div>
  );
}

export default UserFilters;