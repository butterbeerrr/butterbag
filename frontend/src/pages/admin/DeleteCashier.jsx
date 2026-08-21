import { Save, X } from "lucide-react";

function CashierModal({
  isOpen,
  onClose,
  mode = "add",
  cashier = {},
  onSubmit,
}) {
  if (!isOpen) {
    return null;
  }

  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get(
        "password_confirmation"
      ),
      role: "cashier",
    };

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-xl bg-[#F5F0E6] shadow-xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#D8D0C2] px-5 py-5 sm:px-6">

          <div>
            <h2 className="font-['Playfair_Display',serif] text-2xl font-semibold text-black">
              {isEdit ? "Edit Cashier" : "Add Cashier"}
            </h2>

            <p className="mt-1 text-sm text-[#6B665F]">
              {isEdit
                ? "Update cashier information"
                : "Create a new cashier account"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
            aria-label="Close"
          >
            <X size={18} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-5 py-6 sm:px-6"
        >

          {/* Name */}
          <div>
            <label
              htmlFor="cashier-name"
              className="text-xs font-medium uppercase tracking-wider text-[#6B665F]"
            >
              Full Name
            </label>

            <input
              id="cashier-name"
              name="name"
              type="text"
              required
              defaultValue={cashier.name || ""}
              placeholder="Enter cashier name"
              className="mt-2 w-full border-b border-[#D8D0C2] bg-transparent px-0 py-2 text-sm outline-none placeholder:text-[#8B857D] focus:border-black"
            />
          </div>

          {/* Email */}
          <div className="mt-6">
            <label
              htmlFor="cashier-email"
              className="text-xs font-medium uppercase tracking-wider text-[#6B665F]"
            >
              Email
            </label>

            <input
              id="cashier-email"
              name="email"
              type="email"
              required
              defaultValue={cashier.email || ""}
              placeholder="Enter cashier email"
              className="mt-2 w-full border-b border-[#D8D0C2] bg-transparent px-0 py-2 text-sm outline-none placeholder:text-[#8B857D] focus:border-black"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label
              htmlFor="cashier-password"
              className="text-xs font-medium uppercase tracking-wider text-[#6B665F]"
            >
              {isEdit ? "New Password" : "Password"}
            </label>

            <input
              id="cashier-password"
              name="password"
              type="password"
              required={!isEdit}
              placeholder={
                isEdit
                  ? "Leave blank to keep current password"
                  : "Enter password"
              }
              className="mt-2 w-full border-b border-[#D8D0C2] bg-transparent px-0 py-2 text-sm outline-none placeholder:text-[#8B857D] focus:border-black"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-6">
            <label
              htmlFor="cashier-password-confirmation"
              className="text-xs font-medium uppercase tracking-wider text-[#6B665F]"
            >
              Confirm Password
            </label>

            <input
              id="cashier-password-confirmation"
              name="password_confirmation"
              type="password"
              required={!isEdit}
              placeholder="Confirm password"
              className="mt-2 w-full border-b border-[#D8D0C2] bg-transparent px-0 py-2 text-sm outline-none placeholder:text-[#8B857D] focus:border-black"
            />
          </div>

          {/* Actions */}
          <div className="mt-7 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="border border-[#D8D0C2] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#6B665F] transition hover:bg-[#EFE1C9]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#2B2B2B]"
            >
              <Save size={15} />

              {isEdit ? "Update Cashier" : "Add Cashier"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CashierModal;