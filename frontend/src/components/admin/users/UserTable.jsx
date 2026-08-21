import { useState } from "react";
import {
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

function UserTable({
  users,
  onEditCashier,
  onDeleteCashier,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  const getRoleStyle = (role) => {
    switch (role) {
      case "admin":
        return "bg-[#EFE1C9] text-[#5F5140]";

      case "cashier":
        return "bg-[#E8E4DD] text-[#4F4A44]";

      case "customer":
        return "bg-[#F3F3F3] text-[#6B665F]";

      default:
        return "bg-[#F3F3F3] text-[#6B665F]";
    }
  };

  const formatRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-[#E5E1DA] bg-[#FBF9F5] p-10 text-center">
        <p className="text-sm text-[#6B665F]">
          No users found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E1DA] bg-white">

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#D8D0C2] bg-[#FBF9F5]">
              <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
                Name
              </th>

              <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
                Email
              </th>

              <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
                Role
              </th>

              <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
                Joined
              </th>

              <th className="w-16 px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-widest text-[#6B665F]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#E5E1DA] last:border-0 hover:bg-[#FBF9F5]"
              >
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-black">
                    {user.name}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-[#6B665F]">
                    {user.email}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${getRoleStyle(
                      user.role
                    )}`}
                  >
                    {formatRole(user.role)}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <p className="text-sm text-[#6B665F]">
                    {formatDate(user.created_at)}
                  </p>
                </td>

                <td className="relative px-5 py-4 text-right">
                  {user.role === "cashier" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === user.id ? null : user.id
                          )
                        }
                        className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
                        aria-label="User actions"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === user.id && (
                        <div className="absolute right-5 top-14 z-30 w-32 overflow-hidden rounded-lg border border-[#D8D0C2] bg-white text-left shadow-lg">

                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenu(null);
                              onEditCashier(user);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#2B2B2B] transition hover:bg-[#F5F0E6]"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenu(null);
                              onDeleteCashier(user);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#B85C5C] transition hover:bg-[#FDF1F1]"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>

                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="relative border-b border-[#E5E1DA] p-5 last:border-0"
          >
            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">
                <p className="text-sm font-semibold text-black">
                  {user.name}
                </p>

                <p className="mt-1 break-all text-xs text-[#6B665F]">
                  {user.email}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${getRoleStyle(
                      user.role
                    )}`}
                  >
                    {formatRole(user.role)}
                  </span>

                  <span className="text-xs text-[#8B857D]">
                    {formatDate(user.created_at)}
                  </span>
                </div>
              </div>

              {user.role === "cashier" && (
                <div className="relative shrink-0">

                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === user.id ? null : user.id
                      )
                    }
                    className="rounded-full p-2 text-[#6B665F] transition hover:bg-[#EFE1C9] hover:text-black"
                    aria-label="User actions"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === user.id && (
                    <div className="absolute right-0 top-10 z-30 w-32 overflow-hidden rounded-lg border border-[#D8D0C2] bg-white shadow-lg">

                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onEditCashier(user);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-[#2B2B2B] transition hover:bg-[#F5F0E6]"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenu(null);
                          onDeleteCashier(user);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-[#B85C5C] transition hover:bg-[#FDF1F1]"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>

                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default UserTable;