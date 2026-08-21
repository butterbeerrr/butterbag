import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, ArrowUpRight } from "lucide-react";

function SalesOverview() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("weekly");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#D8D0C2] bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-black">Sales Overview</h2>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded border border-[#D8D0C2] bg-[#F5F0E6] px-2 py-1 text-xs font-medium text-[#6B665F] outline-none"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-1.5 text-lg text-[#6B665F] transition hover:bg-[#F5F0E6] hover:text-black"
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 z-20 w-40 overflow-hidden rounded-lg border border-[#D8D0C2] bg-white shadow-md">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin/transaction");
                }}
                className="block w-full px-4 py-2.5 text-left text-xs font-medium text-[#2B2B2B] hover:bg-[#F5F0E6]"
              >
                View Transactions
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[#E5E1DA] bg-[#FBF9F5] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-[#6B665F]">
              Net Revenue
            </p>
            <TrendingUp size={18} className="text-[#6B665F]" />
          </div>
          <p className="mt-3 font-['Playfair_Display',serif] text-2xl font-semibold text-black">
            Rp 128.500.000
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-[#8A7550]">
            <ArrowUpRight size={14} /> +15.2% vs previous period
          </span>
        </div>

        <div className="rounded-lg border border-[#E5E1DA] bg-[#FBF9F5] p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-[#6B665F]">
              Average Order Value
            </p>
            <TrendingUp size={18} className="text-[#6B665F]" />
          </div>
          <p className="mt-3 font-['Playfair_Display',serif] text-2xl font-semibold text-black">
            Rp 42.800.000
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-[#8A7550]">
            <ArrowUpRight size={14} /> +4.8% vs previous period
          </span>
        </div>
      </div>
    </div>
  );
}

export default SalesOverview;