import { useNavigate } from "react-router-dom";

function QuickAction() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#D8D0C2] bg-white p-6">
        <h2 className="text-lg font-semibold">Quick Actions</h2>

        <div className="mt-5 space-y-3">
          <button
            onClick={() => navigate("/admin/inventory")}
            className="w-full rounded bg-black py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#2B2B2B]"
          >
            + Add Product
          </button>

          <button
            onClick={() => navigate("/admin/inventory")}
            className="w-full rounded border border-[#D8D0C2] py-3 text-xs font-semibold uppercase tracking-wider transition hover:bg-[#F5F0E6]"
          >
            Add Brand
          </button>

          <button
            onClick={() => navigate("/admin/transaction")}
            className="w-full rounded border border-[#D8D0C2] py-3 text-xs font-semibold uppercase tracking-wider transition hover:bg-[#F5F0E6]"
          >
            View Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuickAction;