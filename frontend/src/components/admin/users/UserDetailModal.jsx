import { X } from "lucide-react";

function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-700">
              {user.name
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">User ID</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                #{user.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Role</p>

              <span
                className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  user.role === "cashier"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role === "cashier"
                  ? "Cashier"
                  : "Customer"}
              </span>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Registered
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                {user.registered}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 text-right">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailModal;